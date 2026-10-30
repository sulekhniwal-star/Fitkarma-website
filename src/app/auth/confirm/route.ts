import { NextRequest, NextResponse } from "next/server";
import { inMemoryStore, getServerSupabase } from "@/lib/supabase/server";
import { emailAdapter } from "@/lib/email/adapter";
import {
  renderPhase1AcceptedEmail,
  renderPhase2WaitlistEmail,
} from "@/lib/email/templates";
import { Locale, DEFAULT_LOCALE, isValidLocale } from "@/i18n/config";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const localeParam = searchParams.get("locale");
  const locale: Locale = isValidLocale(localeParam || "") ? (localeParam as Locale) : DEFAULT_LOCALE;

  if (!id || !token) {
    return new NextResponse("Invalid or missing verification parameters", { status: 400 });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const supabase = getServerSupabase();

  let allocationResult: {
    applicationId: string;
    status: "phase1_accepted" | "phase2_waitlist";
    seatNumber: number | null;
    phaseKey: "phase1" | "phase2";
    isIdempotentReplay: boolean;
  };

  let applicantName = "Participant";
  let applicantEmail = "";

  if (supabase) {
    // 1. Fetch application from Supabase
    interface SupabaseAppRow {
      id: string;
      full_name: string;
      email: string;
      verification_expires_at: string | null;
    }

    const { data: app, error: appError } = (await supabase
      .from("beta_applications")
      .select("*")
      .eq("id", id)
      .single()) as unknown as { data: SupabaseAppRow | null; error: Error | null };

    if (appError || !app) {
      return new NextResponse("Application not found", { status: 404 });
    }

    applicantName = app.full_name;
    applicantEmail = app.email;

    // Check expiration
    if (app.verification_expires_at && new Date() > new Date(app.verification_expires_at)) {
      const expiredUrl = request.nextUrl.clone();
      expiredUrl.pathname = `/${locale}`;
      expiredUrl.search = `?error=verification_expired`;
      return NextResponse.redirect(expiredUrl);
    }

    // Call atomic PostgreSQL function confirm_and_allocate_application
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "confirm_and_allocate_application",
      {
        p_application_id: id,
        p_verified_email: app.email,
      }
    );

    if (rpcError || !rpcResult || rpcResult.length === 0) {
      console.error("RPC allocation error:", rpcError);
      return new NextResponse("Failed to allocate beta seat", { status: 500 });
    }

    const row = rpcResult[0];
    allocationResult = {
      applicationId: row.application_id,
      status: row.allocated_status as "phase1_accepted" | "phase2_waitlist",
      seatNumber: row.allocated_seat_number,
      phaseKey: row.phase_key as "phase1" | "phase2",
      isIdempotentReplay: row.is_idempotent_replay,
    };
  } else {
    // 2. Local In-Memory Store
    const app = inMemoryStore.applications.get(id);
    if (!app) {
      return new NextResponse("Application not found", { status: 404 });
    }

    // Verify token hash
    if (app.verificationTokenHash !== tokenHash) {
      return new NextResponse("Invalid verification token", { status: 403 });
    }

    // Check expiration
    if (app.verificationExpiresAt && new Date() > app.verificationExpiresAt) {
      const expiredUrl = request.nextUrl.clone();
      expiredUrl.pathname = `/${locale}`;
      expiredUrl.search = `?error=verification_expired`;
      return NextResponse.redirect(expiredUrl);
    }

    applicantName = app.fullName;
    applicantEmail = app.email;

    allocationResult = await inMemoryStore.confirmAndAllocate(id, app.email);
  }

  // 3. Dispatch Notification Email (if not an idempotent replay)
  if (!allocationResult.isIdempotentReplay) {
    if (allocationResult.status === "phase1_accepted") {
      const emailContent = renderPhase1AcceptedEmail({
        name: applicantName,
        referenceId: `FK-P1-${String(allocationResult.seatNumber).padStart(4, "0")}`,
        locale,
      });

      await emailAdapter.send({
        to: applicantEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        messageType: "phase1_accepted",
        idempotencyKey: `${id}:phase1_accepted:v1`,
      });
    } else {
      const emailContent = renderPhase2WaitlistEmail({
        name: applicantName,
        locale,
      });

      await emailAdapter.send({
        to: applicantEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        messageType: "phase2_waitlist",
        idempotencyKey: `${id}:phase2_waitlist:v1`,
      });
    }
  }

  // 4. Redirect to status landing page
  const statusUrl = request.nextUrl.clone();
  statusUrl.pathname = `/${locale}/beta/status`;
  statusUrl.search = `?id=${allocationResult.applicationId}&status=${allocationResult.status}${
    allocationResult.seatNumber ? `&seat=${allocationResult.seatNumber}` : ""
  }`;

  return NextResponse.redirect(statusUrl);
}
