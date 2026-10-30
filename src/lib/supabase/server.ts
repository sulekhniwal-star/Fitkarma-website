import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { env } from "@/lib/env";
import crypto from "crypto";

// ==============================================================================
// In-Memory Transactional Store for Local Dev & Concurrency Integration Tests
// ==============================================================================
export interface MockApplication {
  id: string;
  fullName: string;
  email: string;
  normalizedEmail: string;
  emailVerifiedAt: Date | null;
  status: "pending_email_verification" | "phase1_accepted" | "phase2_waitlist" | "withdrawn";
  phaseId: string | null;
  seatNumber: number | null;
  primaryFeatureInterests: string[];
  otherFeatureInterestText: string | null;
  devicePlatform: "android" | "ios" | "both" | "not_sure" | null;
  preferredLanguage: "en" | "hi";
  privacyNoticeVersion: string;
  privacyAcceptedAt: Date;
  betaTermsVersion: string;
  termsAcceptedAt: Date;
  marketingConsent: boolean;
  verificationTokenHash: string | null;
  verificationExpiresAt: Date | null;
  allocationOrderAt: Date | null;
  withdrawnAt: Date | null;
  createdAt: Date;
}

export class InMemoryStore {
  public phases: Map<string, { id: string; key: string; capacity: number; status: string }> = new Map([
    ["phase1", { id: "phase_1_uuid", key: "phase1", capacity: 1000, status: "open" }],
    ["phase2", { id: "phase_2_uuid", key: "phase2", capacity: 0, status: "draft" }],
  ]);

  public applications: Map<string, MockApplication> = new Map();
  public applicationsByEmail: Map<string, string> = new Map(); // normalized_email -> id
  public outbox: Array<{
    id: string;
    applicationId: string;
    messageType: string;
    recipientEmail: string;
    idempotencyKey: string;
    status: string;
  }> = [];

  public auditEvents: Array<{ action: string; targetId: string; metadata: Record<string, unknown> }> = [];

  // Mutex for serializing atomic allocations (mirrors Postgres SELECT FOR UPDATE)
  private lockPromise: Promise<void> = Promise.resolve();

  private async acquireLock(): Promise<() => void> {
    let release: () => void;
    const nextLock = new Promise<void>((resolve) => {
      release = resolve;
    });
    const currentLock = this.lockPromise;
    this.lockPromise = this.lockPromise.then(() => nextLock);
    await currentLock;
    return release!;
  }

  reset() {
    this.phases.set("phase1", { id: "phase_1_uuid", key: "phase1", capacity: 1000, status: "open" });
    this.phases.set("phase2", { id: "phase_2_uuid", key: "phase2", capacity: 0, status: "draft" });
    this.applications.clear();
    this.applicationsByEmail.clear();
    this.outbox = [];
    this.auditEvents = [];
  }

  createApplication(input: {
    fullName: string;
    email: string;
    primaryFeatureInterests: string[];
    otherFeatureInterestText?: string | null;
    devicePlatform?: "android" | "ios" | "both" | "not_sure" | null;
    preferredLanguage: "en" | "hi";
    marketingConsent?: boolean;
  }): { application: MockApplication; token: string; isDuplicate: boolean } {
    const normEmail = input.email.trim().toLowerCase();

    // Check duplicate
    const existingId = this.applicationsByEmail.get(normEmail);
    if (existingId) {
      const existing = this.applications.get(existingId)!;
      return { application: existing, token: "existing", isDuplicate: true };
    }

    const id = crypto.randomUUID();
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const app: MockApplication = {
      id,
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      normalizedEmail: normEmail,
      emailVerifiedAt: null,
      status: "pending_email_verification",
      phaseId: null,
      seatNumber: null,
      primaryFeatureInterests: input.primaryFeatureInterests,
      otherFeatureInterestText: input.otherFeatureInterestText || null,
      devicePlatform: input.devicePlatform || null,
      preferredLanguage: input.preferredLanguage || "en",
      privacyNoticeVersion: "v1.0.0",
      privacyAcceptedAt: new Date(),
      betaTermsVersion: "v1.0.0",
      termsAcceptedAt: new Date(),
      marketingConsent: !!input.marketingConsent,
      verificationTokenHash: tokenHash,
      verificationExpiresAt: expiresAt,
      allocationOrderAt: null,
      withdrawnAt: null,
      createdAt: new Date(),
    };

    this.applications.set(id, app);
    this.applicationsByEmail.set(normEmail, id);

    return { application: app, token, isDuplicate: false };
  }

  // Mirrors confirm_and_allocate_application SQL function
  async confirmAndAllocate(
    applicationId: string,
    verifiedEmail: string
  ): Promise<{
    applicationId: string;
    status: "phase1_accepted" | "phase2_waitlist";
    seatNumber: number | null;
    phaseKey: "phase1" | "phase2";
    isIdempotentReplay: boolean;
  }> {
    const release = await this.acquireLock();
    try {
      const app = this.applications.get(applicationId);
      if (!app) {
        throw new Error(`Application not found: ${applicationId}`);
      }

      if (app.normalizedEmail !== verifiedEmail.trim().toLowerCase()) {
        throw new Error("Email mismatch during verification");
      }

      // Idempotency: If already allocated, return existing
      if (app.status === "phase1_accepted" || app.status === "phase2_waitlist") {
        return {
          applicationId: app.id,
          status: app.status,
          seatNumber: app.seatNumber,
          phaseKey: app.status === "phase1_accepted" ? "phase1" : "phase2",
          isIdempotentReplay: true,
        };
      }

      const phase1 = this.phases.get("phase1")!;
      // Count current accepted Phase 1 applications
      const acceptedPhase1Apps = Array.from(this.applications.values()).filter(
        (a) => a.status === "phase1_accepted"
      );
      const currentAcceptedCount = acceptedPhase1Apps.length;

      // Hard ceiling of 1,000 accepted Phase 1 spots
      if (phase1.status === "open" && currentAcceptedCount < 1000 && currentAcceptedCount < phase1.capacity) {
        // Calculate sequential next seat
        const maxSeat = acceptedPhase1Apps.reduce((max, a) => Math.max(max, a.seatNumber || 0), 0);
        const nextSeat = maxSeat + 1;

        app.status = "phase1_accepted";
        app.phaseId = phase1.id;
        app.seatNumber = nextSeat;
        app.emailVerifiedAt = new Date();
        app.allocationOrderAt = new Date();

        if (currentAcceptedCount + 1 >= 1000) {
          phase1.status = "full";
        }

        // Add outbox event with idempotency key
        const idempotencyKey = `${app.id}:phase1_accepted:v1`;
        this.outbox.push({
          id: crypto.randomUUID(),
          applicationId: app.id,
          messageType: "phase1_accepted",
          recipientEmail: app.email,
          idempotencyKey,
          status: "pending",
        });

        this.auditEvents.push({
          action: "seat_allocated",
          targetId: app.id,
          metadata: { seatNumber: nextSeat, phase: "phase1" },
        });

        return {
          applicationId: app.id,
          status: "phase1_accepted",
          seatNumber: nextSeat,
          phaseKey: "phase1",
          isIdempotentReplay: false,
        };
      } else {
        // Phase 1 is full or closed -> waitlist
        const phase2 = this.phases.get("phase2")!;
        app.status = "phase2_waitlist";
        app.phaseId = phase2.id;
        app.seatNumber = null;
        app.emailVerifiedAt = new Date();
        app.allocationOrderAt = new Date();

        const idempotencyKey = `${app.id}:phase2_waitlist:v1`;
        this.outbox.push({
          id: crypto.randomUUID(),
          applicationId: app.id,
          messageType: "phase2_waitlist",
          recipientEmail: app.email,
          idempotencyKey,
          status: "pending",
        });

        this.auditEvents.push({
          action: "waitlist_enrolled",
          targetId: app.id,
          metadata: { phase: "phase2" },
        });

        return {
          applicationId: app.id,
          status: "phase2_waitlist",
          seatNumber: null,
          phaseKey: "phase2",
          isIdempotentReplay: false,
        };
      }
    } finally {
      release();
    }
  }

  // Auto-promote waitlist on withdrawal (Decision D-029)
  async withdrawAndPromote(applicationId: string): Promise<{
    withdrawnId: string;
    promotedId: string | null;
    newSeatNumber: number | null;
  }> {
    const release = await this.acquireLock();
    try {
      const app = this.applications.get(applicationId);
      if (!app) throw new Error("Application not found");

      const previousStatus = app.status;
      app.status = "withdrawn";
      app.withdrawnAt = new Date();

      if (previousStatus === "phase1_accepted") {
        // Find earliest verified waitlisted applicant ordered by allocationOrderAt ASC
        const waitlisted = Array.from(this.applications.values())
          .filter((a) => a.status === "phase2_waitlist" && a.emailVerifiedAt !== null)
          .sort((a, b) => (a.allocationOrderAt?.getTime() || 0) - (b.allocationOrderAt?.getTime() || 0));

        if (waitlisted.length > 0) {
          const promotee = waitlisted[0];
          const phase1 = this.phases.get("phase1")!;

          const currentPhase1 = Array.from(this.applications.values()).filter(
            (a) => a.status === "phase1_accepted"
          );
          const maxSeat = currentPhase1.reduce((max, a) => Math.max(max, a.seatNumber || 0), 0);
          const nextSeat = maxSeat + 1;

          promotee.status = "phase1_accepted";
          promotee.phaseId = phase1.id;
          promotee.seatNumber = nextSeat;

          this.outbox.push({
            id: crypto.randomUUID(),
            applicationId: promotee.id,
            messageType: "phase1_accepted",
            recipientEmail: promotee.email,
            idempotencyKey: `${promotee.id}:phase1_accepted:promoted`,
            status: "pending",
          });

          return {
            withdrawnId: applicationId,
            promotedId: promotee.id,
            newSeatNumber: nextSeat,
          };
        }
      }

      return { withdrawnId: applicationId, promotedId: null, newSeatNumber: null };
    } finally {
      release();
    }
  }
}

export const inMemoryStore = new InMemoryStore();

// ==============================================================================
// Server-Side Supabase Client (Protected Service Role)
// ==============================================================================
export function getServerSupabase(): SupabaseClient<Database> | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url.includes("placeholder") || !key || key.includes("placeholder")) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
