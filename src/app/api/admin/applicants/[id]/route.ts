import { NextResponse } from "next/server";
import { verifyAdminRequest, logAdminAction } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing applicant ID" }, { status: 400 });
  }

  let body: { action?: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const reason = (body.reason || "").trim();
  if (!reason) {
    return NextResponse.json({ error: "Audit reason is required for status changes" }, { status: 400 });
  }

  if (body.action !== "withdraw") {
    return NextResponse.json({ error: `Unsupported action: ${body.action}` }, { status: 400 });
  }

  const supabase = getServerSupabase();

  if (supabase) {
    try {
      // Call Postgres atomic procedure: withdraw_and_promote_application
      const { data, error } = await supabase.rpc("withdraw_and_promote_application", {
        p_application_id: id,
        p_reason: reason,
      });

      if (error) throw error;

      await logAdminAction({
        actorUserId: auth.email || "admin",
        action: "applicant_withdrawn",
        targetType: "beta_application",
        targetId: id,
        reason,
        metadataSafe: { rpcResult: data },
      });

      return NextResponse.json({
        success: true,
        message: "Applicant withdrawn and waitlist auto-promoted successfully",
        result: data,
      });
    } catch (err) {
      console.error("Error withdrawing applicant in Supabase:", err);
      return NextResponse.json({ error: "Database withdrawal failed" }, { status: 500 });
    }
  }

  // Development / In-Memory Store
  try {
    const res = await inMemoryStore.withdrawAndPromote(id);

    await logAdminAction({
      actorUserId: auth.email || "dev-admin",
      action: "applicant_withdrawn",
      targetType: "beta_application",
      targetId: id,
      reason,
      metadataSafe: { ...res },
    });

    return NextResponse.json({
      success: true,
      message: "Applicant withdrawn and waitlist auto-promoted (in-memory)",
      result: res,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Withdrawal failed";
    return NextResponse.json({ error: msg }, { status: 404 });
  }
}
