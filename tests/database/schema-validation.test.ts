import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Database Migration Schema & Stored Procedures', () => {
  const migrationPath = path.resolve(__dirname, '../../supabase/migrations/20261102000000_beta_schema.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  it('declares all required core tables with correct namespaces', () => {
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.beta_phases');
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.beta_applications');
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.email_outbox');
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.audit_events');
  });

  it('enforces critical database guardrails and constraints', () => {
    // Non-negative capacity guardrail
    expect(sql).toMatch(/capacity\s+INTEGER\s+NOT\s+NULL\s+DEFAULT\s+1000\s+CHECK\s*\(\s*capacity\s*>=\s*0\s*\)/i);
    // Non-negative allocated count
    expect(sql).toMatch(/allocated_count\s+INTEGER\s+NOT\s+NULL\s+DEFAULT\s+0\s+CHECK\s*\(\s*allocated_count\s*>=\s*0\s*\)/i);
    // Unique seat constraint per phase
    expect(sql).toContain('CONSTRAINT uq_phase_seat UNIQUE (phase_id, seat_number)');
    // Normalized email uniqueness
    expect(sql).toContain('normalized_email TEXT UNIQUE NOT NULL');
    // Idempotency key uniqueness in outbox
    expect(sql).toContain('idempotency_key TEXT UNIQUE NOT NULL');
  });

  it('enforces Row Level Security (RLS) on all tables', () => {
    expect(sql).toContain('ALTER TABLE public.beta_phases ENABLE ROW LEVEL SECURITY;');
    expect(sql).toContain('ALTER TABLE public.beta_applications ENABLE ROW LEVEL SECURITY;');
    expect(sql).toContain('ALTER TABLE public.email_outbox ENABLE ROW LEVEL SECURITY;');
    expect(sql).toContain('ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;');
  });

  it('configures proper RLS policies for anon and service role', () => {
    expect(sql).toContain('CREATE POLICY "Public can view beta cohort phases"');
    expect(sql).toContain('CREATE POLICY "Public can register beta application"');
    expect(sql).toContain('CREATE POLICY "Service role has full access to applications"');
    expect(sql).toContain('CREATE POLICY "Service role manages email outbox"');
    expect(sql).toContain('CREATE POLICY "Service role manages audit events"');
  });

  it('implements row-level locking in confirm_and_allocate_application to prevent race conditions', () => {
    expect(sql).toContain('CREATE OR REPLACE FUNCTION public.confirm_and_allocate_application');
    // Checks for SELECT ... FOR UPDATE on beta_phases
    expect(sql).toMatch(/SELECT\s+\*\s+INTO\s+v_phase\s+FROM\s+public\.beta_phases\s+WHERE\s+phase_key\s*=\s*'phase1'\s+FOR\s+UPDATE/i);
    // Checks for idempotency guard
    expect(sql).toContain("IF v_app.status IN ('phase1_accepted', 'phase2_waitlist') THEN");
    // Checks for Phase 1 accepted outbox queue
    expect(sql).toContain("'v1:' || v_app.id || ':phase1_accepted'");
    // Checks for Phase 2 waitlist outbox queue
    expect(sql).toContain("'v1:' || v_app.id || ':phase2_waitlist'");
  });

  it('implements FIFO auto-promotion in promote_waitlist_applicant upon withdrawal', () => {
    expect(sql).toContain('CREATE OR REPLACE FUNCTION public.promote_waitlist_applicant');
    // Must lock the withdrawing application
    expect(sql).toMatch(/SELECT\s+\*\s+INTO\s+v_withdrawn\s+FROM\s+public\.beta_applications\s+WHERE\s+id\s*=\s*p_withdrawn_application_id\s+FOR\s+UPDATE/i);
    // Must find earliest waitlisted applicant using FIFO and SKIP LOCKED
    expect(sql).toMatch(/SELECT\s+\*\s+INTO\s+v_candidate\s+FROM\s+public\.beta_applications\s+WHERE\s+status\s*=\s*'phase2_waitlist'\s+ORDER\s+BY\s+allocation_order_at\s+ASC\s+LIMIT\s+1\s+FOR\s+UPDATE\s+SKIP\s+LOCKED/i);
    // Must queue promotion email
    expect(sql).toContain("'v1:' || v_candidate.id || ':phase1_promotion'");
  });
});

