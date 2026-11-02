-- ====================================================================
-- FitKarma Beta Ecosystem Database Migration
-- Version: 20261102000000_beta_schema.sql
-- Description: Core tables, RLS policies, atomic allocation & FIFO promotion
-- ====================================================================

-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Beta Cohort Phase Configuration
CREATE TABLE IF NOT EXISTS public.beta_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_key TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 1000 CHECK (capacity >= 0),
    allocated_count INTEGER NOT NULL DEFAULT 0 CHECK (allocated_count >= 0),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'full', 'closed')),
    opens_at TIMESTAMPTZ,
    closes_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed Phase 1 cohort (Guardrail: capped at exactly 1,000)
INSERT INTO public.beta_phases (phase_key, display_name, capacity, allocated_count, status)
VALUES ('phase1', 'Phase 1 VIP Beta', 1000, 0, 'open')
ON CONFLICT (phase_key) DO NOTHING;

-- 2. Beta Applications
CREATE TABLE IF NOT EXISTS public.beta_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    normalized_email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_verification' 
        CHECK (status IN ('pending_verification', 'phase1_accepted', 'phase2_waitlist', 'withdrawn')),
    phase_id UUID REFERENCES public.beta_phases(id) ON DELETE SET NULL,
    seat_number INTEGER,
    health_goals TEXT[] NOT NULL DEFAULT '{}',
    feature_priorities TEXT[] NOT NULL DEFAULT '{}',
    other_feature_text TEXT,
    device_platform TEXT NOT NULL CHECK (device_platform IN ('ios', 'android', 'both')),
    preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'hi')),
    privacy_notice_version TEXT NOT NULL DEFAULT 'v1',
    privacy_accepted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    beta_terms_version TEXT NOT NULL DEFAULT 'v1',
    terms_accepted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    marketing_consent_at TIMESTAMPTZ,
    application_created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    verification_sent_at TIMESTAMPTZ,
    email_verified_at TIMESTAMPTZ,
    allocation_order_at TIMESTAMPTZ,
    decision_at TIMESTAMPTZ,
    withdrawn_at TIMESTAMPTZ,
    CONSTRAINT uq_phase_seat UNIQUE (phase_id, seat_number)
);

-- Performance & ordering indexes
CREATE INDEX IF NOT EXISTS idx_beta_apps_normalized_email ON public.beta_applications(normalized_email);
CREATE INDEX IF NOT EXISTS idx_beta_apps_status_allocation ON public.beta_applications(status, allocation_order_at ASC);
CREATE INDEX IF NOT EXISTS idx_beta_apps_phase_seat ON public.beta_applications(phase_id, seat_number);

-- 3. Email Outbox
CREATE TABLE IF NOT EXISTS public.email_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.beta_applications(id) ON DELETE CASCADE,
    phase_id UUID REFERENCES public.beta_phases(id) ON DELETE SET NULL,
    message_type TEXT NOT NULL CHECK (message_type IN ('verification_magic_link', 'phase1_accepted', 'phase2_waitlist', 'phase1_promotion')),
    recipient_normalized TEXT NOT NULL,
    template_key TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'hi')),
    idempotency_key TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
    attempt_count INTEGER NOT NULL DEFAULT 0,
    next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    provider_message_id TEXT,
    last_error_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_outbox_pending ON public.email_outbox(status, next_attempt_at) WHERE status = 'pending';

-- 4. Audit Events
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id TEXT,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    reason TEXT,
    metadata_safe JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.beta_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- beta_phases: Public read-only for displaying aggregate availability counter
CREATE POLICY "Public can view beta cohort phases" 
ON public.beta_phases FOR SELECT 
TO anon, authenticated 
USING (true);

-- beta_applications: Anon can insert new registration forms only
CREATE POLICY "Public can register beta application" 
ON public.beta_applications FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- beta_applications: Direct public read/update/delete denied; service_role has full control
CREATE POLICY "Service role has full access to applications" 
ON public.beta_applications FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- email_outbox: Only service role can access queue
CREATE POLICY "Service role manages email outbox" 
ON public.email_outbox FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- audit_events: Only service role can insert and read audit records
CREATE POLICY "Service role manages audit events" 
ON public.audit_events FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- ====================================================================
-- STORED PROCEDURES (ATOMIC ALLOCATION & AUTO-PROMOTION)
-- ====================================================================

-- Function 1: confirm_and_allocate_application
CREATE OR REPLACE FUNCTION public.confirm_and_allocate_application(
    p_application_id UUID,
    p_verified_email TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_app RECORD;
    v_phase RECORD;
    v_new_seat INTEGER;
    v_normalized_email TEXT;
BEGIN
    v_normalized_email := lower(trim(p_verified_email));

    -- 1. Fetch application record
    SELECT * INTO v_app
    FROM public.beta_applications
    WHERE id = p_application_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Application not found with id %', p_application_id USING ERRCODE = 'P0002';
    END IF;

    IF v_app.normalized_email <> v_normalized_email THEN
        RAISE EXCEPTION 'Email mismatch during verification' USING ERRCODE = 'P0003';
    END IF;

    -- 2. Idempotency Check
    IF v_app.status IN ('phase1_accepted', 'phase2_waitlist') THEN
        RETURN jsonb_build_object(
            'status', v_app.status,
            'seat_number', v_app.seat_number,
            'phase_key', 'phase1',
            'already_allocated', true
        );
    END IF;

    -- 3. Lock Phase 1 row exclusively to serialize concurrent verifications
    SELECT * INTO v_phase
    FROM public.beta_phases
    WHERE phase_key = 'phase1'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Phase 1 cohort configuration not found' USING ERRCODE = 'P0004';
    END IF;

    -- 4. Allocate Phase 1 seat or transition to Phase 2 waitlist
    IF v_phase.status = 'open' AND v_phase.allocated_count < v_phase.capacity THEN
        v_new_seat := v_phase.allocated_count + 1;

        -- Update cohort allocated count
        UPDATE public.beta_phases
        SET allocated_count = v_new_seat,
            status = CASE WHEN v_new_seat >= v_phase.capacity THEN 'full' ELSE status END,
            updated_at = timezone('utc'::text, now())
        WHERE id = v_phase.id;

        -- Update application
        UPDATE public.beta_applications
        SET status = 'phase1_accepted',
            phase_id = v_phase.id,
            seat_number = v_new_seat,
            email_verified_at = coalesce(email_verified_at, timezone('utc'::text, now())),
            allocation_order_at = timezone('utc'::text, now()),
            decision_at = timezone('utc'::text, now())
        WHERE id = v_app.id;

        -- Insert outbox confirmation job
        INSERT INTO public.email_outbox (
            application_id,
            phase_id,
            message_type,
            recipient_normalized,
            template_key,
            locale,
            idempotency_key,
            status
        ) VALUES (
            v_app.id,
            v_phase.id,
            'phase1_accepted',
            v_normalized_email,
            'phase1_accepted_pass',
            v_app.preferred_language,
            'v1:' || v_app.id || ':phase1_accepted',
            'pending'
        );

        -- Audit event
        INSERT INTO public.audit_events (
            action, target_type, target_id, metadata_safe
        ) VALUES (
            'allocate_seat', 'beta_applications', v_app.id::text,
            jsonb_build_object('seat_number', v_new_seat, 'phase_key', 'phase1')
        );

        RETURN jsonb_build_object(
            'status', 'phase1_accepted',
            'seat_number', v_new_seat,
            'phase_key', 'phase1',
            'already_allocated', false
        );
    ELSE
        -- Quota full -> allocate to Phase 2 waitlist
        UPDATE public.beta_applications
        SET status = 'phase2_waitlist',
            phase_id = v_phase.id,
            seat_number = NULL,
            email_verified_at = coalesce(email_verified_at, timezone('utc'::text, now())),
            allocation_order_at = timezone('utc'::text, now()),
            decision_at = timezone('utc'::text, now())
        WHERE id = v_app.id;

        -- Insert outbox waitlist job
        INSERT INTO public.email_outbox (
            application_id,
            phase_id,
            message_type,
            recipient_normalized,
            template_key,
            locale,
            idempotency_key,
            status
        ) VALUES (
            v_app.id,
            v_phase.id,
            'phase2_waitlist',
            v_normalized_email,
            'phase2_waitlist_confirmation',
            v_app.preferred_language,
            'v1:' || v_app.id || ':phase2_waitlist',
            'pending'
        );

        -- Audit event
        INSERT INTO public.audit_events (
            action, target_type, target_id, metadata_safe
        ) VALUES (
            'place_waitlist', 'beta_applications', v_app.id::text,
            jsonb_build_object('phase_key', 'phase1', 'reason', 'capacity_exhausted')
        );

        RETURN jsonb_build_object(
            'status', 'phase2_waitlist',
            'seat_number', NULL,
            'phase_key', 'phase1',
            'already_allocated', false
        );
    END IF;
END;
$$;

-- Function 2: promote_waitlist_applicant (FIFO Auto-Promotion on Withdrawal)
CREATE OR REPLACE FUNCTION public.promote_waitlist_applicant(
    p_withdrawn_application_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_withdrawn RECORD;
    v_candidate RECORD;
    v_freed_seat INTEGER;
    v_phase_id UUID;
BEGIN
    -- 1. Lock withdrawing application
    SELECT * INTO v_withdrawn
    FROM public.beta_applications
    WHERE id = p_withdrawn_application_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Application not found with id %', p_withdrawn_application_id USING ERRCODE = 'P0002';
    END IF;

    IF v_withdrawn.status <> 'phase1_accepted' THEN
        UPDATE public.beta_applications
        SET status = 'withdrawn',
            withdrawn_at = timezone('utc'::text, now())
        WHERE id = p_withdrawn_application_id;

        RETURN jsonb_build_object('promoted', false, 'reason', 'not_phase1_seat');
    END IF;

    v_freed_seat := v_withdrawn.seat_number;
    v_phase_id := v_withdrawn.phase_id;

    -- Release seat from withdrawn application
    UPDATE public.beta_applications
    SET status = 'withdrawn',
        seat_number = NULL,
        withdrawn_at = timezone('utc'::text, now())
    WHERE id = p_withdrawn_application_id;

    -- 2. Select earliest verified waitlist applicant (FIFO)
    SELECT * INTO v_candidate
    FROM public.beta_applications
    WHERE status = 'phase2_waitlist'
    ORDER BY allocation_order_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED;

    IF NOT FOUND THEN
        -- No waitlist candidates available; decrement allocated count and reopen phase
        UPDATE public.beta_phases
        SET allocated_count = GREATEST(0, allocated_count - 1),
            status = 'open',
            updated_at = timezone('utc'::text, now())
        WHERE id = v_phase_id;

        RETURN jsonb_build_object('promoted', false, 'reason', 'no_waitlist_candidates');
    END IF;

    -- 3. Reassign vacated sequential seat to the candidate
    UPDATE public.beta_applications
    SET status = 'phase1_accepted',
        phase_id = v_phase_id,
        seat_number = v_freed_seat,
        decision_at = timezone('utc'::text, now())
    WHERE id = v_candidate.id;

    -- Queue promotion email in outbox
    INSERT INTO public.email_outbox (
        application_id,
        phase_id,
        message_type,
        recipient_normalized,
        template_key,
        locale,
        idempotency_key,
        status
    ) VALUES (
        v_candidate.id,
        v_phase_id,
        'phase1_promotion',
        v_candidate.normalized_email,
        'phase1_promotion_pass',
        v_candidate.preferred_language,
        'v1:' || v_candidate.id || ':phase1_promotion',
        'pending'
    );

    -- Log audit event
    INSERT INTO public.audit_events (
        action, target_type, target_id, metadata_safe
    ) VALUES (
        'promote_waitlist', 'beta_applications', v_candidate.id::text,
        jsonb_build_object(
            'promoted_id', v_candidate.id,
            'reassigned_seat', v_freed_seat,
            'withdrawn_id', p_withdrawn_application_id
        )
    );

    RETURN jsonb_build_object(
        'promoted', true,
        'promoted_application_id', v_candidate.id,
        'seat_number', v_freed_seat
    );
END;
$$;

