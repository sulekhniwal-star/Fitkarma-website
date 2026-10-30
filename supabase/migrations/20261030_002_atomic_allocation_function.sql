-- ==============================================================================
-- Migration: 20261030_002_atomic_allocation_function.sql
-- Description: Atomic PostgreSQL functions for 1,000-seat allocation & waitlist
-- Invariant: Exactly 1,000 Phase 1 accepted seats. No seat 1,001. Idempotent replays.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.confirm_and_allocate_application(
    p_application_id UUID,
    p_verified_email TEXT
)
RETURNS TABLE (
    application_id UUID,
    allocated_status TEXT,
    allocated_seat_number INTEGER,
    phase_key TEXT,
    is_idempotent_replay BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_app RECORD;
    v_phase1 RECORD;
    v_phase2_id UUID;
    v_current_accepted_count INTEGER;
    v_next_seat INTEGER;
    v_norm_email TEXT;
BEGIN
    v_norm_email := lower(trim(p_verified_email));

    -- 1. Fetch and validate application
    SELECT * INTO v_app
    FROM public.beta_applications
    WHERE id = p_application_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Application not found with id: %', p_application_id;
    END IF;

    IF v_app.normalized_email != v_norm_email THEN
        RAISE EXCEPTION 'Email mismatch during verification for application id: %', p_application_id;
    END IF;

    -- 2. Idempotency Check: If already processed, return existing status
    IF v_app.status IN ('phase1_accepted', 'phase2_waitlist') THEN
        RETURN QUERY
        SELECT 
            v_app.id,
            v_app.status,
            v_app.seat_number,
            CASE WHEN v_app.status = 'phase1_accepted' THEN 'phase1' ELSE 'phase2' END,
            true AS is_idempotent_replay;
        RETURN;
    END IF;

    -- 3. Lock Phase 1 row for update (Serialization Barrier)
    SELECT * INTO v_phase1
    FROM public.beta_phases
    WHERE beta_phases.phase_key = 'phase1'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Phase 1 record not found';
    END IF;

    -- 4. Count currently accepted Phase 1 applications under transaction lock
    SELECT COUNT(*)::INTEGER INTO v_current_accepted_count
    FROM public.beta_applications
    WHERE phase_id = v_phase1.id AND status = 'phase1_accepted';

    -- 5. Allocate Phase 1 seat if capacity is available (hard ceiling 1,000)
    IF v_phase1.status = 'open' AND v_current_accepted_count < 1000 AND v_current_accepted_count < v_phase1.capacity THEN
        -- Calculate next unique seat number
        SELECT COALESCE(MAX(seat_number), 0) + 1 INTO v_next_seat
        FROM public.beta_applications
        WHERE phase_id = v_phase1.id;

        -- Update application to accepted
        UPDATE public.beta_applications
        SET 
            status = 'phase1_accepted',
            phase_id = v_phase1.id,
            seat_number = v_next_seat,
            email_verified_at = timezone('utc'::text, now()),
            allocation_order_at = timezone('utc'::text, now()),
            updated_at = timezone('utc'::text, now())
        WHERE id = v_app.id;

        -- If capacity reached, mark phase 1 as full
        IF (v_current_accepted_count + 1) >= 1000 THEN
            UPDATE public.beta_phases
            SET status = 'full', updated_at = timezone('utc'::text, now())
            WHERE id = v_phase1.id;
        END IF;

        -- Insert transactional outbox event
        INSERT INTO public.email_outbox (
            application_id,
            phase_id,
            message_type,
            recipient_email,
            template_key,
            locale,
            idempotency_key,
            status
        ) VALUES (
            v_app.id,
            v_phase1.id,
            'phase1_accepted',
            v_app.email,
            'phase1_accepted',
            v_app.preferred_language,
            v_app.id || ':phase1_accepted:v1',
            'pending'
        )
        ON CONFLICT (idempotency_key) DO NOTHING;

        -- Audit log
        INSERT INTO public.audit_events (
            actor_user_id,
            action,
            target_type,
            target_id,
            metadata_safe
        ) VALUES (
            'system',
            'seat_allocated',
            'application',
            v_app.id::text,
            jsonb_build_object(
                'seat_number', v_next_seat,
                'phase', 'phase1',
                'count_after', v_current_accepted_count + 1
            )
        );

        RETURN QUERY
        SELECT 
            v_app.id,
            'phase1_accepted'::TEXT,
            v_next_seat,
            'phase1'::TEXT,
            false AS is_idempotent_replay;
        RETURN;
    ELSE
        -- 6. Phase 1 is full or closed -> Enroll into Phase 2 Waitlist
        SELECT id INTO v_phase2_id
        FROM public.beta_phases
        WHERE beta_phases.phase_key = 'phase2';

        UPDATE public.beta_applications
        SET 
            status = 'phase2_waitlist',
            phase_id = v_phase2_id,
            seat_number = NULL,
            email_verified_at = timezone('utc'::text, now()),
            allocation_order_at = timezone('utc'::text, now()),
            updated_at = timezone('utc'::text, now())
        WHERE id = v_app.id;

        -- Insert transactional outbox event
        INSERT INTO public.email_outbox (
            application_id,
            phase_id,
            message_type,
            recipient_email,
            template_key,
            locale,
            idempotency_key,
            status
        ) VALUES (
            v_app.id,
            v_phase2_id,
            'phase2_waitlist',
            v_app.email,
            'phase2_waitlist',
            v_app.preferred_language,
            v_app.id || ':phase2_waitlist:v1',
            'pending'
        )
        ON CONFLICT (idempotency_key) DO NOTHING;

        -- Audit log
        INSERT INTO public.audit_events (
            actor_user_id,
            action,
            target_type,
            target_id,
            metadata_safe
        ) VALUES (
            'system',
            'waitlist_enrolled',
            'application',
            v_app.id::text,
            jsonb_build_object('phase', 'phase2', 'phase1_full', true)
        );

        RETURN QUERY
        SELECT 
            v_app.id,
            'phase2_waitlist'::TEXT,
            NULL::INTEGER,
            'phase2'::TEXT,
            false AS is_idempotent_replay;
        RETURN;
    END IF;
END;
$$;

-- 7. Auto-Promotion Function on Withdrawal (Decision D-029)
CREATE OR REPLACE FUNCTION public.withdraw_and_promote_application(
    p_application_id UUID,
    p_reason TEXT DEFAULT 'user_requested'
)
RETURNS TABLE (
    withdrawn_id UUID,
    promoted_id UUID,
    new_seat_number INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_app RECORD;
    v_phase1 RECORD;
    v_promotee RECORD;
    v_next_seat INTEGER;
BEGIN
    -- Lock application
    SELECT * INTO v_app
    FROM public.beta_applications
    WHERE id = p_application_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Application not found: %', p_application_id;
    END IF;

    -- Mark withdrawn
    UPDATE public.beta_applications
    SET 
        status = 'withdrawn',
        withdrawn_at = timezone('utc'::text, now()),
        updated_at = timezone('utc'::text, now())
    WHERE id = p_application_id;

    -- Audit log withdrawal
    INSERT INTO public.audit_events (
        actor_user_id,
        action,
        target_type,
        target_id,
        reason,
        metadata_safe
    ) VALUES (
        'system',
        'application_withdrawn',
        'application',
        p_application_id::text,
        p_reason,
        jsonb_build_object('previous_status', v_app.status, 'previous_seat', v_app.seat_number)
    );

    -- If the withdrawn applicant had an accepted Phase 1 seat, auto-promote earliest waitlisted
    IF v_app.status = 'phase1_accepted' THEN
        -- Lock Phase 1
        SELECT * INTO v_phase1
        FROM public.beta_phases
        WHERE beta_phases.phase_key = 'phase1'
        FOR UPDATE;

        -- Find earliest verified waitlisted applicant ordered by allocation_order_at ASC
        SELECT * INTO v_promotee
        FROM public.beta_applications
        WHERE status = 'phase2_waitlist' AND email_verified_at IS NOT NULL
        ORDER BY allocation_order_at ASC
        LIMIT 1
        FOR UPDATE;

        IF FOUND THEN
            -- Calculate next seat number
            SELECT COALESCE(MAX(seat_number), 0) + 1 INTO v_next_seat
            FROM public.beta_applications
            WHERE phase_id = v_phase1.id AND status = 'phase1_accepted';

            UPDATE public.beta_applications
            SET 
                status = 'phase1_accepted',
                phase_id = v_phase1.id,
                seat_number = v_next_seat,
                updated_at = timezone('utc'::text, now())
            WHERE id = v_promotee.id;

            -- Queue accepted email to promotee
            INSERT INTO public.email_outbox (
                application_id,
                phase_id,
                message_type,
                recipient_email,
                template_key,
                locale,
                idempotency_key,
                status
            ) VALUES (
                v_promotee.id,
                v_phase1.id,
                'phase1_accepted',
                v_promotee.email,
                'phase1_accepted',
                v_promotee.preferred_language,
                v_promotee.id || ':phase1_accepted:promoted',
                'pending'
            )
            ON CONFLICT (idempotency_key) DO NOTHING;

            -- Audit log promotion
            INSERT INTO public.audit_events (
                actor_user_id,
                action,
                target_type,
                target_id,
                metadata_safe
            ) VALUES (
                'system',
                'waitlist_promoted_to_phase1',
                'application',
                v_promotee.id::text,
                jsonb_build_object(
                    'promoted_seat', v_next_seat,
                    'promoted_from_waitlist', true,
                    'replaced_application_id', p_application_id
                )
            );

            RETURN QUERY SELECT p_application_id, v_promotee.id, v_next_seat;
            RETURN;
        END IF;
    END IF;

    RETURN QUERY SELECT p_application_id, NULL::UUID, NULL::INTEGER;
END;
$$;
