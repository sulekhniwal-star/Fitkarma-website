import { env } from "@/lib/env";
import { getServerSupabase, inMemoryStore } from "@/lib/supabase/server";

export interface AdminAuthResult {
  isAuthenticated: boolean;
  email: string | null;
  error?: string;
}

/**
 * Returns the parsed list of authorized admin emails.
 */
export function getAdminAllowlist(): string[] {
  const raw = env.ADMIN_EMAIL_ALLOWLIST || "sulekhniwal@gmail.com";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

/**
 * Checks whether a given email address is in the admin allowlist.
 */
export function isEmailInAdminAllowlist(email: string): boolean {
  if (!email) return false;
  const allowlist = getAdminAllowlist();
  return allowlist.includes(email.trim().toLowerCase());
}

/**
 * Verifies if an incoming HTTP request is from an authenticated administrator.
 * Supports Supabase Auth session tokens, session cookies, and local development admin bearer tokens.
 */
export async function verifyAdminRequest(request: Request): Promise<AdminAuthResult> {
  const authHeader = request.headers.get("authorization");
  const cookieHeader = request.headers.get("cookie") || "";

  // 1. Check Bearer Token in Authorization header
  let token: string | null = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  // 2. Extract session cookie if header wasn't provided
  if (!token && cookieHeader) {
    const match = cookieHeader.match(/fitkarma_admin_token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1].trim());
    }
  }

  if (!token) {
    return { isAuthenticated: false, email: null, error: "No authentication credentials provided" };
  }

  // 3. Development / Test mock bypass check
  // Allows testing or preview mode with an allowlisted email prefix or dev key
  if (token.startsWith("dev-admin:") || token.startsWith("mock-admin:")) {
    const email = token.split(":")[1]?.trim().toLowerCase();
    if (email && isEmailInAdminAllowlist(email)) {
      return { isAuthenticated: true, email };
    }
    return { isAuthenticated: false, email: null, error: "Dev token email is not allowlisted" };
  }

  // 4. Supabase Auth Verification (Production / Live Supabase)
  const supabase = getServerSupabase();
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user || !user.email) {
        return { isAuthenticated: false, email: null, error: "Invalid Supabase session" };
      }

      if (!isEmailInAdminAllowlist(user.email)) {
        return { isAuthenticated: false, email: user.email, error: "User is not in the admin allowlist" };
      }

      return { isAuthenticated: true, email: user.email };
    } catch (err) {
      console.error("Supabase auth verification failed:", err);
      return { isAuthenticated: false, email: null, error: "Auth verification exception" };
    }
  }

  // 5. In-Memory dev fallback when Supabase is not configured
  // If the token matches the primary admin email directly
  const allowlist = getAdminAllowlist();
  if (allowlist.includes(token.toLowerCase())) {
    return { isAuthenticated: true, email: token.toLowerCase() };
  }

  return { isAuthenticated: false, email: null, error: "Unauthorized admin access" };
}

/**
 * Records an immutable audit event for administrative actions.
 */
export async function logAdminAction(params: {
  actorUserId: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  reason?: string | null;
  metadataSafe?: Record<string, unknown>;
}): Promise<void> {
  const supabase = getServerSupabase();

  if (supabase) {
    try {
      await supabase.from("audit_events").insert({
        actor_user_id: params.actorUserId,
        action: params.action,
        target_type: params.targetType,
        target_id: params.targetId || null,
        reason: params.reason || null,
        metadata_safe: (params.metadataSafe || {}) as unknown as import("@/lib/supabase/database.types").Json,
      });
    } catch (err) {
      console.error("Failed to write to audit_events in Supabase:", err);
    }
  } else {
    // Development / test in-memory logging
    inMemoryStore.auditEvents.push({
      action: params.action,
      targetId: params.targetId || "system",
      metadata: {
        actorUserId: params.actorUserId,
        targetType: params.targetType,
        reason: params.reason,
        ...(params.metadataSafe || {}),
        timestamp: new Date().toISOString(),
      },
    });
  }
}
