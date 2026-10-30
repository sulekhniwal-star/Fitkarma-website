import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const supabase = getServerSupabase();

  if (supabase) {
    try {
      // 1. Phase details
      const { data: phases } = await supabase.from("beta_phases").select("*");
      const phase1 = phases?.find((p) => p.phase_key === "phase1");
      const phase1Capacity = phase1?.capacity || 1000;

      // 2. Application status counts
      const { data: apps, error: appsError } = await supabase
        .from("beta_applications")
        .select("status, primary_feature_interests, device_platform, preferred_language");

      if (appsError) throw appsError;

      const appList = apps || [];
      const phase1Accepted = appList.filter((a) => a.status === "phase1_accepted").length;
      const phase2Waitlist = appList.filter((a) => a.status === "phase2_waitlist").length;
      const pendingVerification = appList.filter((a) => a.status === "pending_email_verification").length;
      const withdrawn = appList.filter((a) => a.status === "withdrawn").length;

      const featureCounts: Record<string, number> = {};
      const platformCounts: Record<string, number> = { android: 0, ios: 0, both: 0, not_sure: 0 };
      const languageCounts: Record<string, number> = { en: 0, hi: 0 };

      for (const a of appList) {
        if (Array.isArray(a.primary_feature_interests)) {
          for (const feat of a.primary_feature_interests) {
            featureCounts[feat] = (featureCounts[feat] || 0) + 1;
          }
        }
        if (a.device_platform) {
          platformCounts[a.device_platform] = (platformCounts[a.device_platform] || 0) + 1;
        }
        if (a.preferred_language) {
          languageCounts[a.preferred_language] = (languageCounts[a.preferred_language] || 0) + 1;
        }
      }

      // 3. Outbox delivery counts
      const { data: outbox } = await supabase.from("email_outbox").select("status");
      const outboxList = outbox || [];
      const outboxStats = {
        pending: outboxList.filter((o) => o.status === "pending").length,
        sent: outboxList.filter((o) => o.status === "sent").length,
        failed: outboxList.filter((o) => o.status === "failed").length,
      };

      return NextResponse.json({
        metrics: {
          phase1Accepted,
          phase1Capacity,
          phase2Waitlist,
          pendingVerification,
          withdrawn,
          totalApplications: appList.length,
          featureCounts,
          platformCounts,
          languageCounts,
          outboxStats,
        },
      });
    } catch (err) {
      console.error("Admin metrics error:", err);
      return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }
  }

  // Development / in-memory store metrics
  const metrics = inMemoryStore.getMetrics();
  return NextResponse.json({ metrics });
}
