import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/auth/verify/route';
import { supabaseAdmin } from '@/lib/supabase/admin';

describe('Verification Callback Route Handler', () => {
  it('redirects to error page when parameters are missing', async () => {
    const req = new Request('https://fitkarma.in/api/auth/verify');
    const res = await GET(req);
    expect(res.status).toBe(307); // NextResponse.redirect default
    expect(res.headers.get('location')).toBe('https://fitkarma.in/en/auth/verify?error=missing_parameters');
  });

  it('redirects to /beta/pass when allocated Phase 1 accepted seat', async () => {
    // Mock successful Phase 1 allocation
    const rpcSpy = vi.spyOn(supabaseAdmin, 'rpc').mockResolvedValueOnce({
      data: {
        status: 'phase1_accepted',
        seat_number: 42,
        phase_key: 'phase1',
        already_allocated: false,
      },
      error: null,
      count: null,
      status: 200,
      statusText: 'OK',
    } as any);

    const req = new Request('https://fitkarma.in/api/auth/verify?appId=test-uuid-42&email=aarav@example.com&locale=en');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://fitkarma.in/en/beta/pass?id=test-uuid-42&seat=42');
    expect(rpcSpy).toHaveBeenCalledWith('confirm_and_allocate_application', {
      p_application_id: 'test-uuid-42',
      p_verified_email: 'aarav@example.com',
    });
  });

  it('redirects to /beta/waitlist when allocated to Phase 2 waitlist', async () => {
    vi.spyOn(supabaseAdmin, 'rpc').mockResolvedValueOnce({
      data: {
        status: 'phase2_waitlist',
        seat_number: null,
        phase_key: 'phase1',
        already_allocated: false,
      },
      error: null,
      count: null,
      status: 200,
      statusText: 'OK',
    } as any);

    const req = new Request('https://fitkarma.in/api/auth/verify?appId=test-waitlist-1&email=rohan@example.com&locale=hi');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://fitkarma.in/hi/beta/waitlist?id=test-waitlist-1');
  });

  it('redirects to error view when verification fails in database', async () => {
    vi.spyOn(supabaseAdmin, 'rpc').mockResolvedValueOnce({
      data: null,
      error: { message: 'Application not found', details: '', hint: '', code: 'P0002' },
      count: null,
      status: 400,
      statusText: 'Bad Request',
    } as any);

    const req = new Request('https://fitkarma.in/api/auth/verify?appId=bad-id&email=bad@example.com');
    const res = await GET(req);

    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://fitkarma.in/en/auth/verify?error=invalid_or_expired');
  });
});
