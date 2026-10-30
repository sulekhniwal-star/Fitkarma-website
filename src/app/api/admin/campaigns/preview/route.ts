import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";
import { renderPhase2ShareInvitationEmail } from "@/lib/email/templates";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  let body: { campaignType?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const campaignType = body.campaignType || "phase2_invitation";
  if (campaignType !== "phase2_invitation") {
    return NextResponse.json({ error: "Unsupported campaign type" }, { status: 400 });
  }

  const supabase = getServerSupabase();
  let eligibleCount = 0;

  if (supabase) {
    const { count, error } = await supabase
      .from("beta_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "phase1_accepted")
      .not("email_verified_at", "is", null);

    if (error) {
      console.error("Error querying eligible recipients in Supabase:", error);
      return NextResponse.json({ error: "Query failed" }, { status: 500 });
    }
    eligibleCount = count || 0;
  } else {
    eligibleCount = Array.from(inMemoryStore.applications.values()).filter(
      (a) => a.status === "phase1_accepted" && a.emailVerifiedAt !== null
    ).length;
  }

  const phase2PublicUrl = `${env.NEXT_PUBLIC_SITE_URL}/#beta-signup`;

  const enPreview = renderPhase2ShareInvitationEmail({
    name: "Aarav Sharma",
    phase2PublicUrl,
    locale: "en",
  });

  const hiPreview = renderPhase2ShareInvitationEmail({
    name: "आरव शर्मा",
    phase2PublicUrl,
    locale: "hi",
  });

  return NextResponse.json({
    campaignType,
    eligibleRecipientsCount: eligibleCount,
    phase2PublicUrl,
    previewEnglish: enPreview,
    previewHindi: hiPreview,
    isDryRun: true,
  });
}
