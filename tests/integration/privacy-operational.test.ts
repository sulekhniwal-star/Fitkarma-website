import { test, describe, beforeEach } from "node:test";
import assert from "node:assert";
import { inMemoryStore } from "../../src/lib/supabase/server";
import { POST as resendVerification } from "../../src/app/api/beta/resend-verification/route";
import { POST as withdrawApplication } from "../../src/app/api/beta/withdraw/route";
import { redactPII, maskEmail } from "../../src/lib/monitoring";

describe("FitKarma Privacy, Legal & Operational Hardening Integration Tests", () => {
  beforeEach(() => {
    inMemoryStore.reset();
  });

  test("1. Resend verification rate limiting and enumeration safety", async () => {
    // Seed an unverified application
    inMemoryStore.createApplication({
      fullName: "Kavita Rao",
      email: "kavita@example.com",
      primaryFeatureInterests: ["indian_nutrition"],
      preferredLanguage: "en",
    });

    // 1st resend attempt -> 200 OK
    const req1 = new Request("http://localhost:3000/api/beta/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "kavita@example.com" }),
    });
    const res1 = await resendVerification(req1);
    assert.strictEqual(res1.status, 200);
    const json1 = await res1.json();
    assert.strictEqual(json1.success, true);

    // Immediate 2nd attempt -> 429 Cooldown
    const req2 = new Request("http://localhost:3000/api/beta/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "kavita@example.com" }),
    });
    const res2 = await resendVerification(req2);
    assert.strictEqual(res2.status, 429, "Immediate resend must be rate-limited");
    const json2 = await res2.json();
    assert.ok(json2.cooldownRemainingSeconds > 0);

    // Enumeration protection: Unknown email still returns generic success
    const reqUnknown = new Request("http://localhost:3000/api/beta/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "unknown_person@example.com" }),
    });
    const resUnknown = await resendVerification(reqUnknown);
    assert.strictEqual(resUnknown.status, 200);
    const jsonUnknown = await resUnknown.json();
    assert.strictEqual(jsonUnknown.success, true);
  });

  test("2. User withdrawal authorization & Decision D-029 auto-promotion", async () => {
    // 1. Create Accepted User
    const { application: app1 } = inMemoryStore.createApplication({
      fullName: "Ananya Iyer",
      email: "ananya@example.com",
      primaryFeatureInterests: ["indian_nutrition"],
      preferredLanguage: "hi",
    });
    await inMemoryStore.confirmAndAllocate(app1.id, app1.email);

    // Lower capacity to 1
    inMemoryStore.phases.get("phase1")!.capacity = 1;

    // 2. Create Waitlisted User
    const { application: app2 } = inMemoryStore.createApplication({
      fullName: "Rohan Verma",
      email: "rohan@example.com",
      primaryFeatureInterests: ["daily_intelligence_package"],
      preferredLanguage: "en",
    });
    const alloc2 = await inMemoryStore.confirmAndAllocate(app2.id, app2.email);
    assert.strictEqual(alloc2.status, "phase2_waitlist");

    // 3. Unauthorized withdrawal attempt with wrong email -> 403
    const reqUnauthorized = new Request("http://localhost:3000/api/beta/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: app1.id,
        email: "wrong_email@example.com",
      }),
    });
    const resUnauthorized = await withdrawApplication(reqUnauthorized);
    assert.strictEqual(resUnauthorized.status, 403, "Mismatched email must be blocked");

    // 4. Authorized withdrawal by user
    const reqWithdraw = new Request("http://localhost:3000/api/beta/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: app1.id,
        email: "ananya@example.com",
        reason: "User requested deletion under DPDP",
      }),
    });
    const resWithdraw = await withdrawApplication(reqWithdraw);
    assert.strictEqual(resWithdraw.status, 200);

    // 5. Verify App 1 is withdrawn
    const updatedApp1 = inMemoryStore.applications.get(app1.id);
    assert.strictEqual(updatedApp1?.status, "withdrawn");

    // 6. Verify App 2 was auto-promoted into Phase 1 (Decision D-029)
    const updatedApp2 = inMemoryStore.applications.get(app2.id);
    assert.strictEqual(
      updatedApp2?.status,
      "phase1_accepted",
      "Waitlist applicant must be auto-promoted to Phase 1"
    );
    assert.ok(updatedApp2?.seatNumber !== null);
  });

  test("3. PII redaction and telemetry sanitization", () => {
    // Test email masking
    const masked = maskEmail("aarav.sharma@example.com");
    assert.strictEqual(masked, "a***a@example.com");

    // Test recursive object sanitization
    const rawPayload = {
      fullName: "Aarav Sharma",
      email: "aarav@example.com",
      password: "supersecretpassword",
      meta: {
        token: "abcdef123456",
        description: "User registered with aarav@example.com on Android",
      },
      tags: ["active", "user:aarav@example.com"],
    };

    const sanitized = redactPII(rawPayload);

    assert.strictEqual(sanitized.fullName, "[REDACTED]");
    assert.strictEqual(sanitized.email, "a***v@example.com");
    assert.strictEqual(sanitized.password, "[REDACTED]");
    assert.strictEqual(sanitized.meta.token, "[REDACTED]");
    assert.strictEqual(
      sanitized.meta.description,
      "User registered with [REDACTED_EMAIL] on Android"
    );
    assert.strictEqual(sanitized.tags[1], "user:[REDACTED_EMAIL]");
  });
});
