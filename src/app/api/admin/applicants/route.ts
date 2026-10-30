import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/admin";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.isAuthenticated) {
    return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "25", 10)));

  const supabase = getServerSupabase();

  if (supabase) {
    try {
      let query = supabase.from("beta_applications").select("*", { count: "exact" });

      if (status !== "all") {
        query = query.eq("status", status as import("@/lib/supabase/database.types").Database["public"]["Tables"]["beta_applications"]["Row"]["status"]);
      }

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return NextResponse.json({
        data: (data || []).map((row) => ({
          id: row.id,
          fullName: row.full_name,
          email: row.email,
          status: row.status,
          seatNumber: row.seat_number,
          primaryFeatureInterests: row.primary_feature_interests,
          devicePlatform: row.device_platform,
          preferredLanguage: row.preferred_language,
          marketingConsent: row.marketing_consent,
          emailVerifiedAt: row.email_verified_at,
          createdAt: row.created_at,
        })),
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit) || 1,
        },
      });
    } catch (err) {
      console.error("Admin applicants fetch error:", err);
      return NextResponse.json({ error: "Failed to fetch applicants" }, { status: 500 });
    }
  }

  // Development fallback
  const result = inMemoryStore.getApplicants({ status, search, page, limit });
  return NextResponse.json(result);
}
