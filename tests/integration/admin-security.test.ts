import { test, describe, beforeEach } from "node:test";
import assert from "node:assert";
import { inMemoryStore } from "../../src/lib/supabase/server";
import { isEmailInAdminAllowlist, verifyAdminRequest } from "../../src/lib/auth/admin";
import { GET as getMetrics } from "../../src/app/api/admin/metrics/route";
import { GET as getApplicants } from "../../src/app/api/admin/applicants/route";
import { PATCH as updateApplicant } from "../../src/app/api/admin/applicants/[id]/route";
import { GET as exportApplicants } from "../../src/app/api/admin/export/route";
import { POST as previewCampaign } from "../../src/app/api/admin/campaigns/preview/route";
import { POST as dispatchCampaign } from "../../src/app/api/admin/campaigns/dispatch/route";

describe("FitKarma Admin Security & Operations Integration Tests", () => {
  beforeEach(() => {
    inMemoryStore.reset();
  });

  test("1. Admin Allowlist enforcement", () => {
    assert.strictEqual(
      isEmailInAdminAllowlist("sulekhniwal@gmail.com"),
      true,
      "Official admin email must be allowed"
    );
    assert.strictEqual(
      isEmailInAdminAllowlist("SULEKHNIWAL@GMAIL.COM"),
      true,
      "Allowlist check must be case-insensitive"
    );
    assert.strictEqual(
      isEmailInAdminAllowlist("attacker@example.com"),
      false,
      "Unauthorized email must be rejected"
    );
    assert.strictEqual(
      isEmailInAdminAllowlist(""),
      false,
      "Empty email must be rejected"
    );
  });

  test("2. Non-admin request blocking (401 Unauthorized)", async () => {
    // Request with no credentials
    const req1 = new Request("http://localhost:3000/api/admin/metrics");
    const res1 = await getMetrics(req1);
    assert.strictEqual(res1.status, 401, "Unauthenticated request must return 401");

    // Request with un-allowlisted admin header
    const req2 = new Request("http://localhost:3000/api/admin/metrics", {
      headers: { Authorization: "Bearer dev-admin:intruder@unknown.com" },
    });
    const res2 = await getMetrics(req2);
    assert.strictEqual(res2.status, 401, "Intruder email must return 401");
  });

  test("3. Authorized admin access & metrics aggregates", async () => {
    // Seed test applications
    const { application: app1 } = inMemoryStore.createApplication({
      fullName: "Priya Sharma",
      email: "priya@example.com",
      primaryFeatureInterests: ["indian_nutrition", "daily_intelligence"],
      preferredLanguage: "hi",
      devicePlatform: "android",
    });
    await inMemoryStore.confirmAndAllocate(app1.id, app1.email);

    const req = new Request("http://localhost:3000/api/admin/metrics", {
      headers: { Authorization: "Bearer dev-admin:sulekhniwal@gmail.com" },
    });
    const res = await getMetrics(req);
    assert.strictEqual(res.status, 200, "Authorized admin must receive 200 OK");

    const json = await res.json();
    assert.strictEqual(json.metrics.phase1Accepted, 1);
    assert.strictEqual(json.metrics.phase1Capacity, 1000);
    assert.strictEqual(json.metrics.languageCounts.hi, 1);
    assert.strictEqual(json.metrics.platformCounts.android, 1);
  });

  test("4. Guarded CSV export requires justification and records immutable audit event", async () => {
    // Attempt export without reason -> must fail 400
    const reqWithoutReason = new Request("http://localhost:3000/api/admin/export", {
      headers: { Authorization: "Bearer dev-admin:sulekhniwal@gmail.com" },
    });
    const resFail = await exportApplicants(reqWithoutReason);
    assert.strictEqual(resFail.status, 400, "Export without audit reason must fail");

    // Export with legitimate reason -> must succeed and log audit event
    const reqWithReason = new Request(
      "http://localhost:3000/api/admin/export?reason=Weekly+Capacity+Review",
      {
        headers: { Authorization: "Bearer dev-admin:sulekhniwal@gmail.com" },
      }
    );
    const resSuccess = await exportApplicants(reqWithReason);
    assert.strictEqual(resSuccess.status, 200);
    assert.strictEqual(
      resSuccess.headers.get("content-type")?.includes("text/csv"),
      true
    );

    // Verify audit event was logged
    const auditEvents = inMemoryStore.auditEvents;
    const exportEvent = auditEvents.find((e) => e.action === "applicants_exported");
    assert.ok(exportEvent, "applicants_exported audit event must be present");
    assert.strictEqual(
      (exportEvent.metadata as Record<string, unknown>).reason,
      "Weekly Capacity Review"
    );
  });

  test("5. Status change withdrawal with Decision D-029 auto-promotion & audit logging", async () => {
    // Fill 1 seat, and 1 waitlist
    // App 1: Phase 1
    const { application: app1 } = inMemoryStore.createApplication({
      fullName: "User One",
      email: "user1@example.com",
      primaryFeatureInterests: ["indian_nutrition"],
      preferredLanguage: "en",
    });
    await inMemoryStore.confirmAndAllocate(app1.id, app1.email);

    // Lower capacity temporarily to 1 to simulate full phase
    inMemoryStore.phases.get("phase1")!.capacity = 1;

    // App 2: Enters waitlist
    const { application: app2 } = inMemoryStore.createApplication({
      fullName: "User Two",
      email: "user2@example.com",
      primaryFeatureInterests: ["ai_coach"],
      preferredLanguage: "en",
    });
    const alloc2 = await inMemoryStore.confirmAndAllocate(app2.id, app2.email);
    assert.strictEqual(alloc2.status, "phase2_waitlist");

    // Admin withdraws App 1
    const req = new Request(`http://localhost:3000/api/admin/applicants/${app1.id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer dev-admin:sulekhniwal@gmail.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "withdraw",
        reason: "User requested deletion under DPDP",
      }),
    });

    const res = await updateApplicant(req, {
      params: Promise.resolve({ id: app1.id }),
    });
    assert.strictEqual(res.status, 200);

    const json = await res.json();
    assert.strictEqual(json.result.withdrawnId, app1.id);
    assert.strictEqual(
      json.result.promotedId,
      app2.id,
      "App 2 must be auto-promoted into Phase 1"
    );

    // Check updated status in store
    const updatedApp2 = inMemoryStore.applications.get(app2.id);
    assert.strictEqual(updatedApp2?.status, "phase1_accepted");

    // Check audit event
    const withdrawAudit = inMemoryStore.auditEvents.find(
      (e) => e.action === "applicant_withdrawn"
    );
    assert.ok(withdrawAudit, "applicant_withdrawn audit event must be logged");
  });

  test("6. Phase 2 campaign preview & safety dry-run protection", async () => {
    // Preview endpoint
    const previewReq = new Request(
      "http://localhost:3000/api/admin/campaigns/preview",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer dev-admin:sulekhniwal@gmail.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignType: "phase2_invitation" }),
      }
    );
    const previewRes = await previewCampaign(previewReq);
    assert.strictEqual(previewRes.status, 200);
    const previewJson = await previewRes.json();
    assert.ok(previewJson.previewEnglish.subject);
    assert.ok(previewJson.previewHindi.subject);

    // Accidental unconfirmed live dispatch must be rejected (Safety invariant)
    const accidentalReq = new Request(
      "http://localhost:3000/api/admin/campaigns/dispatch",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer dev-admin:sulekhniwal@gmail.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignType: "phase2_invitation",
          dryRun: false,
          confirmed: false, // NOT confirmed
        }),
      }
    );
    const accidentalRes = await dispatchCampaign(accidentalReq);
    assert.strictEqual(
      accidentalRes.status,
      400,
      "Unconfirmed live dispatch must be strictly rejected"
    );

    // Dry-run simulation must succeed without enqueuing emails
    const dryRunReq = new Request(
      "http://localhost:3000/api/admin/campaigns/dispatch",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer dev-admin:sulekhniwal@gmail.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignType: "phase2_invitation",
          dryRun: true,
        }),
      }
    );
    const dryRunRes = await dispatchCampaign(dryRunReq);
    assert.strictEqual(dryRunRes.status, 200);
    const dryRunJson = await dryRunRes.json();
    assert.strictEqual(dryRunJson.dryRun, true);
  });
});
