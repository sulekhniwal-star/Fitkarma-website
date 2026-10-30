import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { inMemoryStore } from "../../src/lib/supabase/server";

describe("FitKarma Phase 1 Beta — Concurrency & Capacity Integration Test", () => {
  before(() => {
    inMemoryStore.reset();
  });

  it("should handle 1,050 concurrent verifications with exactly 1,000 Phase 1 seats and 50 waitlist entries", async () => {
    const totalApplicants = 1050;
    const applicantIds: string[] = [];
    const applicantEmails: string[] = [];

    // 1. Create 1,050 pending applications
    for (let i = 1; i <= totalApplicants; i++) {
      const email = `applicant_${i}@test.fitkarma.in`;
      const res = inMemoryStore.createApplication({
        fullName: `Applicant ${i}`,
        email,
        primaryFeatureInterests: ["indian_food_db", "daily_intelligence_package"],
        preferredLanguage: i % 2 === 0 ? "en" : "hi",
        marketingConsent: false,
      });

      assert.equal(res.isDuplicate, false);
      assert.equal(res.application.status, "pending_email_verification");
      applicantIds.push(res.application.id);
      applicantEmails.push(email);
    }

    assert.equal(applicantIds.length, 1050);

    // 2. Concurrently verify and allocate all 1,050 applicants in parallel
    const allocationPromises = applicantIds.map((id, index) =>
      inMemoryStore.confirmAndAllocate(id, applicantEmails[index])
    );

    const results = await Promise.all(allocationPromises);
    assert.equal(results.length, 1050);

    // 3. Analyze results
    const accepted = results.filter((r) => r.status === "phase1_accepted");
    const waitlisted = results.filter((r) => r.status === "phase2_waitlist");

    // Invariant Assertions
    assert.equal(
      accepted.length,
      1000,
      `CRITICAL FAILURE: Expected exactly 1,000 accepted Phase 1 applicants, got ${accepted.length}`
    );

    assert.equal(
      waitlisted.length,
      50,
      `CRITICAL FAILURE: Expected exactly 50 waitlisted applicants, got ${waitlisted.length}`
    );

    // 4. Verify seat uniqueness and range [1, 1000]
    const seatNumbers = accepted.map((a) => a.seatNumber);
    const uniqueSeats = new Set(seatNumbers);

    assert.equal(
      uniqueSeats.size,
      1000,
      `Duplicate seat numbers detected! Expected 1,000 unique seats, got ${uniqueSeats.size}`
    );

    assert.equal(seatNumbers.includes(0), false, "Seat number 0 is invalid");
    assert.equal(seatNumbers.includes(1001), false, "Seat 1,001 was allocated in violation of capacity limit!");

    for (let seat = 1; seat <= 1000; seat++) {
      assert.equal(
        uniqueSeats.has(seat),
        true,
        `Missing sequential seat number: ${seat}`
      );
    }

    // 5. Verify Phase 1 status has transitioned to full
    const phase1 = inMemoryStore.phases.get("phase1");
    assert.equal(phase1?.status, "full");

    console.log("✅ 1,050 concurrent allocations passed: exactly 1,000 accepted (seats 1-1000), 50 waitlisted.");
  });

  it("should be strictly idempotent under verification replays", async () => {
    const apps = Array.from(inMemoryStore.applications.values());
    const initialOutboxCount = inMemoryStore.outbox.length;

    // Pick 50 accepted and 20 waitlisted apps to replay
    const testReplays = [...apps.slice(0, 50), ...apps.slice(1000, 1020)];

    for (const app of testReplays) {
      const originalStatus = app.status;
      const originalSeat = app.seatNumber;

      const replayResult = await inMemoryStore.confirmAndAllocate(app.id, app.email);

      assert.equal(replayResult.isIdempotentReplay, true, "Replay was not flagged as idempotent!");
      assert.equal(replayResult.status, originalStatus, "Status changed during replay!");
      assert.equal(replayResult.seatNumber, originalSeat, "Seat number changed during replay!");
    }

    // Ensure no new duplicate outbox events were inserted
    assert.equal(
      inMemoryStore.outbox.length,
      initialOutboxCount,
      "Duplicate email outbox events were created during replays!"
    );

    console.log("✅ Idempotent replays passed: zero seat drift, zero duplicate email outbox jobs.");
  });

  it("should enforce email normalization and duplicate rejection", () => {
    const rawEmail = "Test.User+Beta@Example.COM";
    const res1 = inMemoryStore.createApplication({
      fullName: "Test User",
      email: rawEmail,
      primaryFeatureInterests: ["indian_food_db"],
      preferredLanguage: "en",
    });

    assert.equal(res1.isDuplicate, false);
    assert.equal(res1.application.normalizedEmail, "test.user+beta@example.com");

    // Second submission with whitespace and different casing
    const res2 = inMemoryStore.createApplication({
      fullName: "Test User Duplicate",
      email: "  TEST.USER+BETA@EXAMPLE.COM  ",
      primaryFeatureInterests: ["womens_health"],
      preferredLanguage: "hi",
    });

    assert.equal(res2.isDuplicate, true);
    assert.equal(res2.application.id, res1.application.id);

    console.log("✅ Email normalization & deduplication passed.");
  });

  it("should auto-promote the earliest waitlisted applicant when a Phase 1 seat is withdrawn (Decision D-029)", async () => {
    // Find an accepted Phase 1 application
    const acceptedApp = Array.from(inMemoryStore.applications.values()).find(
      (a) => a.status === "phase1_accepted" && a.seatNumber === 42
    );

    assert.ok(acceptedApp, "Could not find accepted application with seat 42");

    // Find the earliest waitlisted applicant before withdrawal
    const waitlistedBefore = Array.from(inMemoryStore.applications.values())
      .filter((a) => a.status === "phase2_waitlist")
      .sort((a, b) => (a.allocationOrderAt?.getTime() || 0) - (b.allocationOrderAt?.getTime() || 0));

    assert.ok(waitlistedBefore.length > 0, "No waitlisted applicants available");
    const expectedPromotee = waitlistedBefore[0];

    // Withdraw application
    const promoResult = await inMemoryStore.withdrawAndPromote(acceptedApp.id);

    assert.equal(promoResult.withdrawnId, acceptedApp.id);
    assert.equal(promoResult.promotedId, expectedPromotee.id);
    assert.ok(promoResult.newSeatNumber !== null);

    // Verify withdrawn application status
    const withdrawnApp = inMemoryStore.applications.get(acceptedApp.id);
    assert.equal(withdrawnApp?.status, "withdrawn");

    // Verify promoted applicant status
    const promotedApp = inMemoryStore.applications.get(expectedPromotee.id);
    assert.equal(promotedApp?.status, "phase1_accepted");
    assert.equal(promotedApp?.seatNumber, promoResult.newSeatNumber);

    // Verify promo outbox event was queued
    const promoOutbox = inMemoryStore.outbox.find(
      (job) => job.applicationId === expectedPromotee.id && job.messageType === "phase1_accepted"
    );
    assert.ok(promoOutbox, "Promotion email notification was not queued in outbox!");

    console.log("✅ Decision D-029 Auto-promotion passed: earliest waitlist entry promoted upon withdrawal.");
  });
});

