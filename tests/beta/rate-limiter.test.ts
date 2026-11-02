import { describe, it, expect, beforeEach } from 'vitest';
import {
  checkIpRateLimit,
  checkResendCooldown,
  resetRateLimitsForTesting,
  getClientIp,
} from '@/lib/security/rate-limiter';

describe('In-Memory IP Sliding Window Rate Limiter & Cooldown', () => {
  beforeEach(() => {
    resetRateLimitsForTesting();
  });

  it('allows submissions within the configured limit and calculates remaining tokens', () => {
    const ip = '192.168.1.100';
    for (let i = 1; i <= 5; i++) {
      const res = checkIpRateLimit(ip, 5, 60000);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(5 - i);
    }

    // 6th request from same IP is throttled
    const blocked = checkIpRateLimit(ip, 5, 60000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('maintains distinct rate limit counters across different IP addresses', () => {
    const ipA = '10.0.0.1';
    const ipB = '10.0.0.2';

    // Exhaust IP A
    for (let i = 0; i < 5; i++) {
      checkIpRateLimit(ipA, 5);
    }
    expect(checkIpRateLimit(ipA, 5).allowed).toBe(false);

    // IP B is still allowed
    expect(checkIpRateLimit(ipB, 5).allowed).toBe(true);
  });

  it('enforces a 60-second cooldown timer on verification email resends', () => {
    const email = 'user@fitkarma.in';

    // First request initiates cooldown
    const first = checkResendCooldown(email, 60000);
    expect(first.allowed).toBe(true);
    expect(first.waitSeconds).toBe(0);

    // Immediate second request is blocked with remaining seconds
    const second = checkResendCooldown(email, 60000);
    expect(second.allowed).toBe(false);
    expect(second.waitSeconds).toBeGreaterThanOrEqual(59);
    expect(second.waitSeconds).toBeLessThanOrEqual(60);
  });

  it('extracts client IP from proxy headers accurately', () => {
    const req1 = new Request('https://fitkarma.in/api/beta/applications', {
      headers: { 'x-forwarded-for': '203.0.113.195, 70.41.3.18' },
    });
    expect(getClientIp(req1)).toBe('203.0.113.195');

    const req2 = new Request('https://fitkarma.in/api/beta/applications', {
      headers: { 'x-real-ip': '198.51.100.10' },
    });
    expect(getClientIp(req2)).toBe('198.51.100.10');

    const req3 = new Request('https://fitkarma.in/api/beta/applications');
    expect(getClientIp(req3)).toBe('127.0.0.1');
  });
});
