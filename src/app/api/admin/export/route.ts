import { NextResponse } from "next/server";
import { verifyAdminRequest, logAdminAction } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";

function escapeCsvCell(cell: string | number | null | undefined): string {
  if (cell === null || cell === undefined) return '""';
  const str = String(cell).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const reason = (searchParams.get("reason") || "").trim();
  const statusFilter = searchParams.get("status") || "all";

  if (!reason) {
    return NextResponse.json(
      { error: "A valid audit reason is required before exporting applicant data." },
      { status: 400 }
    );
  }

  const supabase = getServerSupabase();
  let rows: Array<{
    id: string;
    fullName: string;
    email: string;
    status: string;
    seatNumber: number | null;
    primaryFeatureInterests: string[] | null;
    devicePlatform: string | null;
    preferredLanguage: string | null;
    createdAt: string;
    emailVerifiedAt: string | null;
  }> = [];

  if (supabase) {
    try {
      let query = supabase.from("beta_applications").select("*");
      if (statusFilter !== "all") {
        query = query.eq(
          "status",
          statusFilter as import("@/lib/supabase/database.types").Database["public"]["Tables"]["beta_applications"]["Row"]["status"]
        );
      }
      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      rows = (data || []).map((r) => ({
        id: r.id,
        fullName: r.full_name,
        email: r.email,
        status: r.status,
        seatNumber: r.seat_number,
        primaryFeatureInterests: r.primary_feature_interests,
        devicePlatform: r.device_platform,
        preferredLanguage: r.preferred_language,
        createdAt: r.created_at,
        emailVerifiedAt: r.email_verified_at,
      }));
    } catch (err) {
      console.error("Export query error in Supabase:", err);
      return NextResponse.json({ error: "Export query failed" }, { status: 500 });
    }
  } else {
    const res = inMemoryStore.getApplicants({ status: statusFilter, limit: 10000 });
    rows = res.data;
  }

  // Log the audit event for compliance
  await logAdminAction({
    actorUserId: auth.email || "admin",
    action: "applicants_exported",
    targetType: "beta_applications_export",
    reason,
    metadataSafe: {
      exportedRowsCount: rows.length,
      statusFilter,
      timestamp: new Date().toISOString(),
    },
  });

  // Construct CSV
  const header = [
    "Application ID",
    "Full Name",
    "Email",
    "Status",
    "Seat Number",
    "Primary Features",
    "Platform",
    "Language",
    "Created At",
    "Verified At",
  ].join(",");

  const csvLines = [header];
  for (const r of rows) {
    const line = [
      escapeCsvCell(r.id),
      escapeCsvCell(r.fullName),
      escapeCsvCell(r.email),
      escapeCsvCell(r.status),
      escapeCsvCell(r.seatNumber),
      escapeCsvCell(r.primaryFeatureInterests ? r.primaryFeatureInterests.join("; ") : ""),
      escapeCsvCell(r.devicePlatform),
      escapeCsvCell(r.preferredLanguage),
      escapeCsvCell(r.createdAt),
      escapeCsvCell(r.emailVerifiedAt),
    ].join(",");
    csvLines.push(line);
  }

  const csvContent = csvLines.join("\r\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fitkarma-beta-applicants-${Date.now()}.csv"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
