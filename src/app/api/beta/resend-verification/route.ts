import { NextResponse } from "next/server";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";
import { emailAdapter } from "@/lib/email/adapter";
import { renderVerificationEmail } from "@/lib/email/templates";
import { env } from "@/lib/env";
import crypto from "crypto";

// In-memory rate limiting map: email -> last sent timestamp
const resendCooldowns = new Map<string, number>();
const COOLDOWN_SECONDS = 60;

export async function POST(request: Request) {
  let body: { email?: string; honeypot?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot check for bots
  if (body.honeypot && body.honeypot.trim().length > 0) {
    return NextResponse.json(
      { success: true, message: "If a pending application exists, a verification link has been sent." },
      { status: 200 }
    );
  }

  const rawEmail = (body.email || "").trim().toLowerCase();
  if (!rawEmail || !rawEmail.includes("@")) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  // Check rate limit cooldown
  const now = Date.now();
  const lastSent = resendCooldowns.get(rawEmail) || 0;
  if (now - lastSent < COOLDOWN_SECONDS * 1000) {
    const waitSeconds = Math.ceil((COOLDOWN_SECONDS * 1000 - (now - lastSent)) / 1000);
    return NextResponse.json(
      {
        error: `Please wait ${waitSeconds} seconds before requesting another verification email.`,
        cooldownRemainingSeconds: waitSeconds,
      },
      { status: 429 }
    );
  }

  const supabase = getServerSupabase();

  if (supabase) {
    try {
      // Find pending application
      const { data: app } = await supabase
        .from("beta_applications")
        .select("id, full_name, email, status, preferred_language")
        .eq("normalized_email", rawEmail)
        .eq("status", "pending_email_verification")
        .maybeSingle();

      if (app) {
        // Generate new secure verification token
        const newToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(newToken).digest("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        await supabase
          .from("beta_applications")
          .update({
            verification_token_hash: tokenHash,
            verification_sent_at: new Date().toISOString(),
            verification_expires_at: expiresAt,
          })
          .eq("id", app.id);

        const verificationUrl = `${env.NEXT_PUBLIC_SITE_URL}/auth/confirm?id=${app.id}&token=${newToken}&locale=${app.preferred_language || "en"}`;

        const emailContent = renderVerificationEmail({
          name: app.full_name,
          verificationUrl,
          locale: (app.preferred_language || "en") as "en" | "hi",
        });

        await emailAdapter.send({
          to: app.email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          messageType: "verification",
          applicationId: app.id,
          idempotencyKey: `${app.id}:resend:${now}`,
        });

        resendCooldowns.set(rawEmail, now);
      }
    } catch (err) {
      console.error("Resend verification error in Supabase:", err);
    }
  } else {
    // In-memory dev/test fallback
    const appId = inMemoryStore.applicationsByEmail.get(rawEmail);
    if (appId) {
      const app = inMemoryStore.applications.get(appId);
      if (app && app.status === "pending_email_verification") {
        const newToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(newToken).digest("hex");
        app.verificationTokenHash = tokenHash;
        app.verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const verificationUrl = `${env.NEXT_PUBLIC_SITE_URL}/auth/confirm?id=${app.id}&token=${newToken}&locale=${app.preferredLanguage}`;

        const emailContent = renderVerificationEmail({
          name: app.fullName,
          verificationUrl,
          locale: app.preferredLanguage,
        });

        await emailAdapter.send({
          to: app.email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          messageType: "verification",
          applicationId: app.id,
          idempotencyKey: `${app.id}:resend:${now}`,
        });

        resendCooldowns.set(rawEmail, now);
      }
    }
  }

  // Generic enumeration-safe response
  return NextResponse.json({
    success: true,
    message: "If a pending application exists for this email address, a verification link has been sent.",
  });
}
