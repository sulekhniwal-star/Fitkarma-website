import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateIdempotencyKey,
  sanitizeErrorCode,
  renderEmailTemplate,
} from '@/lib/email/dispatcher';
import { sendEmail, mockEmailSink } from '@/lib/email/resend';

describe('Transactional Email Outbox Dispatcher', () => {
  beforeEach(() => {
    // Clear in-memory mock sink before each test
    mockEmailSink.length = 0;
  });

  it('generates consistent idempotency keys', () => {
    const key1 = generateIdempotencyKey('app-1234', 'phase1_accepted');
    expect(key1).toBe('v1:app-1234:phase1_accepted');

    const key2 = generateIdempotencyKey('app-9999', 'verification_magic_link', 'v2');
    expect(key2).toBe('v2:app-9999:verification_magic_link');
  });

  it('sanitizes error codes and masks sensitive strings', () => {
    expect(sanitizeErrorCode('Rate limit exceeded: 429')).toBe('Rate_limit_exceeded__429');
    expect(sanitizeErrorCode(new Error('Rate limit reached'))).toBe('rate_limit_exceeded');
    expect(sanitizeErrorCode(new Error('Network timeout after 10000ms'))).toBe('network_timeout');
    expect(sanitizeErrorCode(new Error('Invalid recipient email address'))).toBe('invalid_recipient_address');
    expect(sanitizeErrorCode({ code: 'RESEND_UNAUTHORIZED' })).toBe('RESEND_UNAUTHORIZED');
  });

  it('renders all four email templates with proper subjects in English and Hindi', async () => {
    const types = [
      'verification_magic_link',
      'phase1_accepted',
      'phase2_waitlist',
      'phase1_promotion',
    ] as const;

    for (const type of types) {
      // English render
      const en = await renderEmailTemplate({
        messageType: type,
        locale: 'en',
        fullName: 'Test User',
        seatNumber: 10,
        waitlistPosition: 25,
      });
      expect(en.subject).toBeTruthy();
      expect(en.html).toContain('FitKarma');

      // Hindi render
      const hi = await renderEmailTemplate({
        messageType: type,
        locale: 'hi',
        fullName: 'परीक्षण उपयोगकर्ता',
        seatNumber: 10,
        waitlistPosition: 25,
      });
      expect(hi.subject).toBeTruthy();
      expect(hi.html).toContain('FitKarma');
    }
  });

  it('safely captures emails in mock sink when RESEND_API_KEY is not set', async () => {
    const dispatchResult = await sendEmail({
      to: 'beta.tester@fitkarma.in',
      subject: 'Test Subject',
      html: '<h1>FitKarma Test</h1>',
    });

    expect(dispatchResult.success).toBe(true);
    expect(dispatchResult.isMock).toBe(true);
    expect(mockEmailSink.length).toBe(1);
    expect(mockEmailSink[0].to).toBe('beta.tester@fitkarma.in');
    expect(mockEmailSink[0].subject).toBe('Test Subject');
  });
});

