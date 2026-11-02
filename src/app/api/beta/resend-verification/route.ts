import { NextResponse } from 'next/server';
import { checkResendCooldown, getClientIp } from '@/lib/security/rate-limiter';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateIdempotencyKey, dispatchOutboxBatch } from '@/lib/email/dispatcher';
import { z } from 'zod';
import type { Database } from '@/lib/supabase/types';

const resendSchema = z.object({
  email: z.string().trim().email(),
  locale: z.enum(['en', 'hi']).default('en'),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const validation = resendSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    const { email, locale } = validation.data;
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check 60-second Cooldown
    const cooldown = checkResendCooldown(normalizedEmail, 60000);
    if (!cooldown.allowed) {
      return NextResponse.json(
        {
          error: 'cooldown_active',
          message: `Please wait ${cooldown.waitSeconds} seconds before requesting another email.`,
          waitSeconds: cooldown.waitSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Fetch Application
    const { data: app } = await supabaseAdmin
      .from('beta_applications')
      .select('id, status, preferred_language')
      .eq('normalized_email', normalizedEmail)
      .maybeSingle();

    // If application does not exist, return generic 200 to prevent enumeration
    if (!app) {
      return NextResponse.json({ success: true, message: 'verification_sent' });
    }

    // If already verified or accepted, return generic 200
    if (app.status === 'phase1_accepted' || app.status === 'phase2_waitlist') {
      return NextResponse.json({ success: true, message: 'already_verified' });
    }

    const now = new Date().toISOString();

    // 3. Queue Verification Email
    const idempotencyKey = generateIdempotencyKey(app.id, 'verification_magic_link', `resend-${Date.now()}`);

    const outboxPayload: Database['public']['Tables']['email_outbox']['Insert'] = {
      application_id: app.id,
      message_type: 'verification_magic_link',
      recipient_normalized: normalizedEmail,
      template_key: 'beta_verification_email',
      locale: locale || app.preferred_language,
      idempotency_key: idempotencyKey,
      status: 'pending',
      next_attempt_at: now,
    };

    await supabaseAdmin.from('email_outbox').insert(outboxPayload);

    // Update verification sent timestamp
    await supabaseAdmin
      .from('beta_applications')
      .update({ verification_sent_at: now })
      .eq('id', app.id);

    // Background dispatch
    dispatchOutboxBatch(supabaseAdmin, 5).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'verification_sent',
    });
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
