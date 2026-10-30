import { NextResponse } from "next/server";
import { verifyAdminRequest, logAdminAction } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  let body: {
    campaignType?: string;
    confirmed?: boolean;
    dryRun?: boolean;
    reason?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { campaignType = "phase2_invitation", confirmed = false, dryRun = true, reason = "" } = body;

  if (campaignType !== "phase2_invitation") {
    return NextResponse.json({ error: "Unsupported campaign type" }, { status: 400 });
  }

  if (!dryRun && !confirmed) {
    return NextResponse.json(
      { error: "Production campaign dispatch requires explicit confirmed=true." },
      { status: 400 }
    );
  }

  if (!dryRun && (!reason || reason.trim().length < 5)) {
    return NextResponse.json(
      { error: "Production campaign dispatch requires a valid audit reason (minimum 5 characters)." },
      { status: 400 }
    );
  }

  const supabase = getServerSupabase();
  let eligibleRecipients: Array<{ id: string; email: string; preferredLanguage: "en" | "hi" }> = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("beta_applications")
      .select("id, email, preferred_language")
      .eq("status", "phase1_accepted")
      .not("email_verified_at", "is", null);

    if (error) {
      console.error("Failed to query recipients in Supabase:", error);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    }

    eligibleRecipients = (data || []).map((r) => ({
      id: r.id,
      email: r.email,
      preferredLanguage: (r.preferred_language || "en") as "en" | "hi",
    }));
  } else {
    eligibleRecipients = Array.from(inMemoryStore.applications.values())
      .filter((a) => a.status === "phase1_accepted" && a.emailVerifiedAt !== null)
      .map((a) => ({
        id: a.id,
        email: a.email,
        preferredLanguage: a.preferredLanguage,
      }));
  }

  // If this is a dry run, perform zero side-effects and return simulation report
  if (dryRun) {
    await logAdminAction({
      actorUserId: auth.email || "admin",
      action: "campaign_dry_run_executed",
      targetType: "email_campaign",
      reason: reason || "Dry run simulation",
      metadataSafe: {
        campaignType,
        targetRecipientCount: eligibleRecipients.length,
        dryRun: true,
      },
    });

    return NextResponse.json({
      success: true,
      dryRun: true,
      message: `Dry run successful. ${eligibleRecipients.length} eligible recipients identified. Zero emails dispatched.`,
      targetCount: eligibleRecipients.length,
    });
  }

  // Live dispatch path: Enqueue idempotent outbox jobs
  let queuedCount = 0;
  if (supabase) {
    const outboxInserts = eligibleRecipients.map((rec) => ({
      application_id: rec.id,
      message_type: "phase2_invite" as const,
      recipient_email: rec.email,
      template_key: `phase2_share_invitation_${rec.preferredLanguage}`,
      locale: rec.preferredLanguage,
      idempotency_key: `${rec.id}:phase2_share_invitation:v1`,
      status: "pending" as const,
    }));

    if (outboxInserts.length > 0) {
      // Upsert to ensure idempotency
      const { error: insertError } = await supabase
        .from("email_outbox")
        .upsert(outboxInserts, { onConflict: "idempotency_key", ignoreDuplicates: true });

      if (insertError) {
        console.error("Error inserting outbox jobs in Supabase:", insertError);
        return NextResponse.json({ error: "Failed to queue campaign emails" }, { status: 500 });
      }
    }
    queuedCount = outboxInserts.length;
  } else {
    for (const rec of eligibleRecipients) {
      const idempotencyKey = `${rec.id}:phase2_share_invitation:v1`;
      const alreadyQueued = inMemoryStore.outbox.some((o) => o.idempotencyKey === idempotencyKey);
      if (!alreadyQueued) {
        inMemoryStore.outbox.push({
          id: crypto.randomUUID(),
          applicationId: rec.id,
          messageType: "phase2_share_invitation",
          recipientEmail: rec.email,
          idempotencyKey,
          status: "pending",
        });
        queuedCount++;
      }
    }
  }

  await logAdminAction({
    actorUserId: auth.email || "admin",
    action: "campaign_dispatched",
    targetType: "email_campaign",
    reason,
    metadataSafe: {
      campaignType,
      targetRecipientCount: eligibleRecipients.length,
      queuedJobsCount: queuedCount,
      dryRun: false,
    },
  });

  return NextResponse.json({
    success: true,
    dryRun: false,
    message: `Campaign dispatched successfully. ${queuedCount} email jobs enqueued.`,
    targetCount: eligibleRecipients.length,
    queuedCount,
  });
}
