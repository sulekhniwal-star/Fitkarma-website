-- ==============================================================================
-- Migration: 20261030_001_initial_schema.sql
-- Description: Core tables, constraints, indexes, and RLS policies for FitKarma
-- Security: Least privilege access, full Row Level Security enabled.
-- ==============================================================================

-- 1. Beta Phases Table
CREATE TABLE IF NOT EXISTS public.beta_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 1000,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('draft', 'open', 'full', 'closed')),
    opens_at TIMESTAMPTZ,
    closes_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT phase1_capacity_limit CHECK (
        phase_key != 'phase1' OR (phase_key = 'phase1' AND capacity <= 1000)
    )
);

-- Seed Phase 1
INSERT INTO public.beta_phases (phase_key, display_name, capacity, status, opens_at)
VALUES ('phase1', 'FitKarma Phase 1 Beta', 1000, 'open', timezone('utc'::text, now()))
ON CONFLICT (phase_key) DO NOTHING;

-- Seed Phase 2 (Draft/Waitlist)
INSERT INTO public.beta_phases (phase_key, display_name, capacity, status)
VALUES ('phase2', 'FitKarma Phase 2 Waitlist', 0, 'draft')
ON CONFLICT (phase_key) DO NOTHING;

-- 2. Beta Applications Table
CREATE TABLE IF NOT EXISTS public.beta_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    normalized_email TEXT NOT NULL UNIQUE,
    email_verified_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending_email_verification' CHECK (
        status IN (
            'pending_email_verification',
            'phase1_accepted',
            'phase2_waitlist',
            'invited_phase2',
            'withdrawn',
            'rejected_abuse'
        )
    ),
    phase_id UUID REFERENCES public.beta_phases(id) ON DELETE SET NULL,
    seat_number INTEGER,
    primary_feature_interests TEXT[] NOT NULL DEFAULT '{}',
    other_feature_interest_text VARCHAR(250),
    device_platform TEXT CHECK (device_platform IN ('android', 'ios', 'both', 'not_sure') OR device_platform IS NULL),
    preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'hi')),
    privacy_notice_version TEXT NOT NULL DEFAULT 'v1.0.0',
    privacy_accepted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    beta_terms_version TEXT NOT NULL DEFAULT 'v1.0.0',
    terms_accepted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    marketing_consent_at TIMESTAMPTZ,
    verification_token_hash TEXT,
    verification_sent_at TIMESTAMPTZ,
    verification_expires_at TIMESTAMPTZ,
    allocation_order_at TIMESTAMPTZ,
    withdrawn_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Unique index to guarantee no duplicate seats within the same phase
CREATE UNIQUE INDEX IF NOT EXISTS idx_beta_applications_phase_seat 
ON public.beta_applications(phase_id, seat_number) 
WHERE seat_number IS NOT NULL;

-- Fast index on normalized email
CREATE INDEX IF NOT EXISTS idx_beta_applications_normalized_email 
ON public.beta_applications(normalized_email);

-- Index on verification token hash
CREATE INDEX IF NOT EXISTS idx_beta_applications_token_hash 
ON public.beta_applications(verification_token_hash) 
WHERE verification_token_hash IS NOT NULL;

-- Index on status and allocation order for FIFO query
CREATE INDEX IF NOT EXISTS idx_beta_applications_status_order 
ON public.beta_applications(status, allocation_order_at ASC);

-- 3. Email Outbox Table (Transactional Outbox Pattern)
CREATE TABLE IF NOT EXISTS public.email_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.beta_applications(id) ON DELETE CASCADE,
    phase_id UUID REFERENCES public.beta_phases(id) ON DELETE SET NULL,
    message_type TEXT NOT NULL CHECK (
        message_type IN ('verification', 'phase1_accepted', 'phase2_waitlist', 'phase2_invite')
    ),
    recipient_email TEXT NOT NULL,
    template_key TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'hi')),
    idempotency_key TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')
    ),
    attempt_count INTEGER NOT NULL DEFAULT 0,
    next_attempt_at TIMESTAMPTZ,
    provider_message_id TEXT,
    last_error_code TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_email_outbox_status_next_attempt 
ON public.email_outbox(status, next_attempt_at);

-- 4. Audit Events Table
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id TEXT NOT NULL DEFAULT 'system',
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    reason TEXT,
    metadata_safe JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_events_action_target 
ON public.audit_events(action, target_type, target_id);

-- 5. Row Level Security (RLS) & Permissions
ALTER TABLE public.beta_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beta_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Beta Phases: Public can view active phase info (capacity & status only)
CREATE POLICY "Public can read active phases"
ON public.beta_phases FOR SELECT
TO anon, authenticated
USING (status IN ('open', 'full'));

-- Beta Applications: Public cannot read arbitrary applications
-- Insert is allowed through server actions or trusted endpoint
CREATE POLICY "Service role has full access to applications"
ON public.beta_applications FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Email Outbox & Audit Events: Strictly internal to service_role
CREATE POLICY "Service role has full access to email outbox"
ON public.email_outbox FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role has full access to audit events"
ON public.audit_events FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

