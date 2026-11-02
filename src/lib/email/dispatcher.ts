import { render } from '@react-email/render';
import React from 'react';
import { sendEmail, EmailDispatchResult } from './resend';
import { BetaVerificationEmail } from '@/emails/BetaVerificationEmail';
import { BetaAcceptedEmail } from '@/emails/BetaAcceptedEmail';
import { BetaWaitlistEmail } from '@/emails/BetaWaitlistEmail';
import { BetaPromotedEmail } from '@/emails/BetaPromotedEmail';
import type { Database, OutboxMessageType, PreferredLanguage, OutboxStatus } from '@/lib/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export function generateIdempotencyKey(
  applicationId: string,
  messageType: OutboxMessageType | string,
  version = 'v1'
): string {
  return `${version}:${applicationId}:${messageType}`;
}

export interface RenderTemplateOptions {
  messageType: OutboxMessageType;
  locale: PreferredLanguage;
  fullName: string;
  verificationUrl?: string;
  seatNumber?: number;
  waitlistPosition?: number;
  passUrl?: string;
  referralUrl?: string;
}

export async function renderEmailTemplate(options: RenderTemplateOptions): Promise<{ subject: string; html: string }> {
  const { messageType, locale, fullName } = options;
  const isHindi = locale === 'hi';

  switch (messageType) {
    case 'verification_magic_link': {
      const verificationUrl = options.verificationUrl || 'https://fitkarma.in/auth/verify';
      const subject = isHindi
        ? 'FitKarma VIP बीटा के लिए अपना ईमेल सत्यापित करें'
        : 'Verify your email for FitKarma VIP Beta';
      const element = React.createElement(BetaVerificationEmail, { fullName, verificationUrl, locale });
      const html = await render(element);
      return { subject, html };
    }

    case 'phase1_accepted': {
      const seatNumber = options.seatNumber || 1;
      const formattedSeat = `#${String(seatNumber).padStart(3, '0')}`;
      const passUrl = options.passUrl || `https://fitkarma.in/beta/pass?seat=${seatNumber}`;
      const subject = isHindi
        ? `बधाई हो! आप FitKarma VIP बीटा में शामिल हैं (सीट ${formattedSeat})`
        : `You're in! Welcome to FitKarma VIP Beta (Seat ${formattedSeat})`;
      const element = React.createElement(BetaAcceptedEmail, { fullName, seatNumber, passUrl, locale });
      const html = await render(element);
      return { subject, html };
    }

    case 'phase2_waitlist': {
      const waitlistPosition = options.waitlistPosition || 1;
      const referralUrl = options.referralUrl || 'https://fitkarma.in/beta';
      const subject = isHindi
        ? `आप FitKarma Phase 2 प्रतीक्षा सूची में हैं (स्थान #${waitlistPosition})`
        : `You're on the FitKarma Phase 2 Waitlist (Position #${waitlistPosition})`;
      const element = React.createElement(BetaWaitlistEmail, { fullName, waitlistPosition, referralUrl, locale });
      const html = await render(element);
      return { subject, html };
    }

    case 'phase1_promotion': {
      const seatNumber = options.seatNumber || 1;
      const formattedSeat = `#${String(seatNumber).padStart(3, '0')}`;
      const passUrl = options.passUrl || `https://fitkarma.in/beta/pass?seat=${seatNumber}`;
      const subject = isHindi
        ? `शुभ समाचार! आपको FitKarma VIP बीटा में पदोन्नत किया गया है (सीट ${formattedSeat})`
        : `Great news! You've been promoted to FitKarma VIP Beta (Seat ${formattedSeat})`;
      const element = React.createElement(BetaPromotedEmail, { fullName, seatNumber, passUrl, locale });
      const html = await render(element);
      return { subject, html };
    }

    default:
      throw new Error(`Unsupported email message type: ${messageType}`);
  }
}

/**
 * Sanitizes external error objects into safe, non-sensitive error code strings.
 * Never dumps raw HTTP headers, auth tokens, or stack traces into audit/outbox records.
 */
export function sanitizeErrorCode(error: unknown): string {
  if (typeof error === 'string') {
    return error.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  }
  if (error && typeof error === 'object') {
    const err = error as { code?: string; name?: string; message?: string };
    if (err.code) return String(err.code).substring(0, 50);
    if (err.message) {
      // Map common error phrases to stable enum-like strings
      const msg = err.message.toLowerCase();
      if (msg.includes('rate limit')) return 'rate_limit_exceeded';
      if (msg.includes('timeout')) return 'network_timeout';
      if (msg.includes('invalid') && msg.includes('email')) return 'invalid_recipient_address';
      if (msg.includes('unauthorized') || msg.includes('auth')) return 'provider_auth_error';
    }
    if (err.name && err.name !== 'Error') return String(err.name).substring(0, 50);
    return 'dispatch_failure';
  }
  return 'unknown_error';
}

export interface DispatchOutboxResult {
  processed: number;
  sent: number;
  failed: number;
}

interface OutboxJobRecord {
  id: string;
  application_id: string | null;
  phase_id: string | null;
  message_type: OutboxMessageType;
  recipient_normalized: string;
  template_key: string;
  locale: PreferredLanguage;
  idempotency_key: string;
  status: OutboxStatus;
  attempt_count: number;
  next_attempt_at: string;
  provider_message_id: string | null;
  last_error_code: string | null;
  created_at: string;
  sent_at: string | null;
  beta_applications?: {
    full_name?: string;
    seat_number?: number | null;
  } | null;
}

/**
 * Processes pending items from the email_outbox table.
 */
export async function dispatchOutboxBatch(
  supabase: SupabaseClient<Database>,
  limit = 10
): Promise<DispatchOutboxResult> {
  const now = new Date().toISOString();

  // 1. Fetch pending outbox jobs
  const { data: rawJobs, error: fetchError } = await supabase
    .from('email_outbox')
    .select('*, beta_applications(full_name, seat_number)')
    .eq('status', 'pending')
    .lte('next_attempt_at', now)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (fetchError || !rawJobs || rawJobs.length === 0) {
    return { processed: 0, sent: 0, failed: 0 };
  }

  const jobs = rawJobs as unknown as OutboxJobRecord[];
  let sentCount = 0;
  let failedCount = 0;

  for (const job of jobs) {
    // 2. Mark job processing
    await supabase
      .from('email_outbox')
      .update({ status: 'processing' as OutboxStatus })
      .eq('id', job.id);

    try {
      const appData = job.beta_applications;
      const fullName = appData?.full_name || 'Member';
      const seatNumber = appData?.seat_number ?? undefined;

      // 3. Render HTML template
      const { subject, html } = await renderEmailTemplate({
        messageType: job.message_type,
        locale: job.locale,
        fullName,
        seatNumber,
      });

      // 4. Send email
      const result: EmailDispatchResult = await sendEmail({
        to: job.recipient_normalized,
        subject,
        html,
      });

      if (result.success) {
        // Mark sent
        await supabase
          .from('email_outbox')
          .update({
            status: 'sent' as OutboxStatus,
            sent_at: new Date().toISOString(),
            provider_message_id: result.messageId || null,
          })
          .eq('id', job.id);

        sentCount++;
      } else {
        // Handle failure with retry backoff
        const newAttemptCount = (job.attempt_count || 0) + 1;
        const isPermanent = newAttemptCount >= 3;
        const nextAttemptMinutes = newAttemptCount * 5;
        const nextAttemptDate = new Date(Date.now() + nextAttemptMinutes * 60 * 1000).toISOString();

        await supabase
          .from('email_outbox')
          .update({
            status: (isPermanent ? 'failed' : 'pending') as OutboxStatus,
            attempt_count: newAttemptCount,
            next_attempt_at: nextAttemptDate,
            last_error_code: sanitizeErrorCode(result.errorCode),
          })
          .eq('id', job.id);

        failedCount++;
      }
    } catch (err: unknown) {
      const newAttemptCount = (job.attempt_count || 0) + 1;
      await supabase
        .from('email_outbox')
        .update({
          status: (newAttemptCount >= 3 ? 'failed' : 'pending') as OutboxStatus,
          attempt_count: newAttemptCount,
          last_error_code: sanitizeErrorCode(err),
        })
        .eq('id', job.id);

      failedCount++;
    }
  }

  return {
    processed: jobs.length,
    sent: sentCount,
    failed: failedCount,
  };
}
