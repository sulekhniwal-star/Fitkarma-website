import { NextResponse } from "next/server";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";
import { logAdminAction } from "@/lib/auth/admin";

export async function POST(request: Request) {
  let body: { applicationId?: string; email?: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { applicationId, email, reason = "Voluntary user withdrawal" } = body;

  if (!applicationId || !email) {
    return NextResponse.json(
      { error: "Both applicationId and registered email are required to authorize withdrawal." },
      { status: 400 }
    );
  }

  const normEmail = email.trim().toLowerCase();
  const supabase = getServerSupabase();

  if (supabase) {
    try {
      // 1. Verify ownership
      const { data: app, error: fetchErr } = await supabase
        .from("beta_applications")
        .select("id, email, status")
        .eq("id", applicationId)
        .maybeSingle();

      if (fetchErr || !app) {
        return NextResponse.json({ error: "Application not found" }, { status: 404 });
      }

      if (app.email.toLowerCase() !== normEmail) {
        return NextResponse.json({ error: "Email does not match application record" }, { status: 403 });
      }

      if (app.status === "withdrawn") {
        return NextResponse.json({ success: true, message: "Application is already withdrawn." });
      }

      // 2. Execute atomic withdrawal and waitlist promotion (Decision D-029)
      const { data: rpcData, error: rpcErr } = await supabase.rpc("withdraw_and_promote_application", {
        p_application_id: applicationId,
        p_reason: reason,
      });

      if (rpcErr) throw rpcErr;

      await logAdminAction({
        actorUserId: normEmail,
        action: "applicant_self_withdrawn",
        targetType: "beta_application",
        targetId: applicationId,
        reason,
        metadataSafe: { rpcResult: rpcData },
      });

      return NextResponse.json({
        success: true,
        message: "Your application has been withdrawn.",
      });
    } catch (err) {
      console.error("User withdrawal error in Supabase:", err);
      return NextResponse.json({ error: "Failed to process withdrawal" }, { status: 500 });
    }
  }

  // In-memory dev/test fallback
  try {
    const app = inMemoryStore.applications.get(applicationId);
    if (!app) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (app.normalizedEmail !== normEmail) {
      return NextResponse.json({ error: "Email does not match application record" }, { status: 403 });
    }

    if (app.status === "withdrawn") {
      return NextResponse.json({ success: true, message: "Application is already withdrawn." });
    }

    const res = await inMemoryStore.withdrawAndPromote(applicationId);

    await logAdminAction({
      actorUserId: normEmail,
      action: "applicant_self_withdrawn",
      targetType: "beta_application",
      targetId: applicationId,
      reason,
      metadataSafe: { ...res },
    });

    return NextResponse.json({
      success: true,
      message: "Your application has been withdrawn.",
      result: res,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Withdrawal failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
