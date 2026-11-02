import { NextResponse } from 'next/server';
import { betaRegistrationSchema } from '@/lib/validation/beta-registration';
import { checkIpRateLimit, getClientIp } from '@/lib/security/rate-limiter';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateIdempotencyKey, dispatchOutboxBatch } from '@/lib/email/dispatcher';
import type { Database } from '@/lib/supabase/types';

export async function POST(request: Request) {
  try {
    // 1. IP Sliding Window Rate Limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkIpRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'rate_limit_exceeded',
          message: 'Too many registration requests. Please wait a few minutes before trying again.',
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // 2. Body Payload Parsing & Validation
    const rawBody = await request.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { error: 'invalid_json', message: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    const validation = betaRegistrationSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'validation_error',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 3. Anti-Bot Honeypot Trap
    // If the invisible website_url decoy field was filled by a bot scraper,
    // return a convincing fake 200 success without saving to DB or sending email.
    if (data.website_url && data.website_url.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'verification_sent',
          applicationId: 'mock-honeypot-id',
        },
        { status: 200 }
      );
    }

    const normalizedEmail = data.email.trim().toLowerCase();
    const now = new Date().toISOString();

    // 4. Check for Existing Application
    const { data: existingApp } = await supabaseAdmin
      .from('beta_applications')
      .select('id, status, seat_number')
      .eq('normalized_email', normalizedEmail)
      .maybeSingle();

    let applicationId: string;

    if (existingApp) {
      applicationId = existingApp.id;

      // If already accepted or on waitlist, return clean uniform response
      if (existingApp.status === 'phase1_accepted' || existingApp.status === 'phase2_waitlist') {
        return NextResponse.json(
          {
            success: true,
            message: 'already_registered',
            applicationId: existingApp.id,
            status: existingApp.status,
          },
          { status: 200 }
        );
      }

      // Update existing pending application
      await supabaseAdmin
        .from('beta_applications')
        .update({
          full_name: data.fullName,
          device_platform: data.devicePlatform,
          health_goals: data.healthGoals,
          feature_priorities: data.featurePriorities,
          other_feature_text: data.otherFeatureText || null,
          preferred_language: data.preferredLanguage,
          marketing_consent: data.marketingConsent,
          marketing_consent_at: data.marketingConsent ? now : null,
          verification_sent_at: now,
        })
        .eq('id', existingApp.id);
    } else {
      // 5. Insert New Application Record
      const insertPayload: Database['public']['Tables']['beta_applications']['Insert'] = {
        full_name: data.fullName,
        email: data.email,
        normalized_email: normalizedEmail,
        status: 'pending_verification',
        device_platform: data.devicePlatform,
        health_goals: data.healthGoals,
        feature_priorities: data.featurePriorities,
        other_feature_text: data.otherFeatureText || null,
        preferred_language: data.preferredLanguage,
        privacy_notice_version: data.privacyNoticeVersion,
        privacy_accepted_at: now,
        beta_terms_version: data.betaTermsVersion,
        terms_accepted_at: now,
        marketing_consent: data.marketingConsent,
        marketing_consent_at: data.marketingConsent ? now : null,
        application_created_at: now,
        verification_sent_at: now,
      };

      const { data: newApp, error: insertError } = await supabaseAdmin
        .from('beta_applications')
        .insert(insertPayload)
        .select('id')
        .single();

      if (insertError || !newApp) {
        // Safe error response avoiding DB leakage
        return NextResponse.json(
          { error: 'database_error', message: 'Unable to register application. Please try again later.' },
          { status: 500 }
        );
      }

      applicationId = newApp.id;
    }

    // 6. Queue Double Opt-In Verification Email in Outbox
    const idempotencyKey = generateIdempotencyKey(applicationId, 'verification_magic_link', `v1-${Date.now()}`);

    const outboxPayload: Database['public']['Tables']['email_outbox']['Insert'] = {
      application_id: applicationId,
      message_type: 'verification_magic_link',
      recipient_normalized: normalizedEmail,
      template_key: 'beta_verification_email',
      locale: data.preferredLanguage,
      idempotency_key: idempotencyKey,
      status: 'pending',
      next_attempt_at: now,
    };

    await supabaseAdmin.from('email_outbox').insert(outboxPayload);

    // Asynchronously dispatch pending email outbox jobs in background
    dispatchOutboxBatch(supabaseAdmin, 5).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: 'verification_sent',
        applicationId,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'internal_server_error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

