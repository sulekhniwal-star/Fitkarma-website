import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation/application-schema";
import { inMemoryStore, getServerSupabase } from "@/lib/supabase/server";
import { emailAdapter } from "@/lib/email/adapter";
import { renderVerificationEmail } from "@/lib/email/templates";
import { env } from "@/lib/env";
import crypto from "crypto";

// Simple in-memory rate limiting map (IP / normalized email -> count)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, limit = 5, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    if (!checkRateLimit(`ip:${ip}`, 10, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before retrying." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 1. Validate with Zod
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot Bot Check
    if (data.websiteUrl && data.websiteUrl.length > 0) {
      // Silently return success to confuse automated bots
      return NextResponse.json({
        success: true,
        message: "Application submitted. Please check your inbox.",
      });
    }

    const supabase = getServerSupabase();
    let applicationId: string;
    let verificationToken: string;
    let isDuplicate = false;

    if (supabase) {
      // Real Supabase path
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const { data: existingApp } = (await supabase
        .from("beta_applications")
        .select("id, status")
        .eq("normalized_email", data.email)
        .maybeSingle()) as unknown as { data: { id: string; status: string } | null };

      if (existingApp) {
        isDuplicate = true;
        applicationId = existingApp.id;
        verificationToken = token;
      } else {
        const { data: newApp, error: insertError } = (await supabase
          .from("beta_applications")
          .insert({
            full_name: data.fullName,
            email: data.email,
            normalized_email: data.email,
            primary_feature_interests: data.primaryFeatureInterests,
            other_feature_interest_text: data.otherFeatureInterestText || null,
            device_platform: data.devicePlatform || null,
            preferred_language: data.preferredLanguage,
            privacy_notice_version: data.privacyNoticeVersion,
            beta_terms_version: data.betaTermsVersion,
            marketing_consent: data.marketingConsent,
            marketing_consent_at: data.marketingConsent ? new Date().toISOString() : null,
            verification_token_hash: tokenHash,
            verification_sent_at: new Date().toISOString(),
            verification_expires_at: expiresAt,
          })
          .select("id")
          .single()) as unknown as { data: { id: string } | null; error: Error | null };

        if (insertError || !newApp) {
          console.error("Supabase insert error:", insertError);
          return NextResponse.json(
            { error: "Failed to record application. Please try again." },
            { status: 500 }
          );
        }

        applicationId = newApp.id;
        verificationToken = token;
      }
    } else {
      // Local In-Memory Store path
      const result = inMemoryStore.createApplication({
        fullName: data.fullName,
        email: data.email,
        primaryFeatureInterests: data.primaryFeatureInterests,
        otherFeatureInterestText: data.otherFeatureInterestText,
        devicePlatform: data.devicePlatform,
        preferredLanguage: data.preferredLanguage,
        marketingConsent: data.marketingConsent,
      });

      applicationId = result.application.id;
      verificationToken = result.token;
      isDuplicate = result.isDuplicate;
    }

    // 3. Send Verification Email (only for new or non-duplicate pending apps)
    if (!isDuplicate) {
      const siteUrl = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const verificationUrl = `${siteUrl}/auth/confirm?id=${applicationId}&token=${verificationToken}&locale=${data.preferredLanguage}`;

      const emailContent = renderVerificationEmail({
        name: data.fullName,
        verificationUrl,
        locale: data.preferredLanguage,
      });

      await emailAdapter.send({
        to: data.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        messageType: "verification",
        idempotencyKey: `${applicationId}:verification:v1`,
      });
    }

    // 4. Return Enumeration-Safe Generic Response
    return NextResponse.json({
      success: true,
      message:
        data.preferredLanguage === "hi"
          ? "आवेदन प्राप्त हुआ। अपना स्थान सुरक्षित करने के लिए कृपया अपने ईमेल में सत्यापन लिंक देखें।"
          : "Application received. Please check your inbox and verify your email to secure your place.",
      applicationId: env.NODE_ENV === "development" ? applicationId : undefined,
    });
  } catch (error: unknown) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
