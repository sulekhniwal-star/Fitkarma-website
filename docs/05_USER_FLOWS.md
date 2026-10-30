# 05 — User Flows

## 1. Beta application journey

1. Visitor chooses English or Hindi.
2. Visitor reads what FitKarma is, the beta programme explanation and privacy information.
3. Visitor clicks “Join beta”.
4. Form asks for name, email, one primary feature priority, and optional device/language fields.
5. Visitor accepts the displayed beta terms and privacy notice; optional promotional consent is separate and off by default.
6. Server validates input, rate-limits, checks bot controls and creates a pending verification record. This does not consume a seat.
7. System sends a one-time email verification link/code.
8. User verifies email.
9. Trusted server/database transaction checks current phase status and available capacity.
10. If Phase 1 is open and has fewer than 1,000 accepted entries, allocate the next sequential Phase 1 seat.
11. Otherwise create a Phase 2 waitlist entry.
12. Send exactly one appropriate confirmation email.
13. Provide a safe status link or confirmation page without exposing other applicants.

## 2. First-come, first-served rule

**Proposed rule pending owner approval (Decision O-013):** allocate in the order that the server/database successfully verifies email and commits the seat. This prevents unverified addresses from holding places. Do not use when the user first opened the form, a browser timestamp or a client-supplied seat number. If the owner instead wants FIFO by initial application submission time, the system must define a verification deadline and reservation/expiry policy before implementation.

When two or more verified users arrive concurrently, the database serializes allocation so each receives a distinct seat and the accepted count never exceeds capacity. The exact transaction/locking implementation must be tested under concurrent load.

## 3. Phase 1 is full

- The Phase 1 CTA remains available but its label/context changes to explain Phase 1 is full and Phase 2 applications are open.
- New verified applicants become `phase2_waitlist`.
- Do not claim “beta access confirmed” to waitlisted users.
- Show a truthful status page: “You're on the Phase 2 waitlist.”
- Admin can update future phase settings without deploying code.

## 4. Phase 2 opens

1. Owner creates/activates Phase 2 and sets its capacity or open/closed state.
2. Owner reviews Phase 2 invitation email in preview.
3. System sends the Phase 2 registration/waitlist link to Phase 1 accepted users.
4. Email includes a shareable link recipients may forward. The link must not reveal a personal email, seat ID or private token.
5. Phase 1 users are not silently re-registered or moved to another status.
6. Phase 2 applications follow their own capacity and first-come-first-served rules if approved for that phase.
7. Campaign sends are rate-controlled, logged and resumable; no send occurs until explicitly approved.

## 5. Email verification edge cases

- Expired link: show a clear expired state and allow a rate-limited resend.
- Reused link: do not allocate another seat; show current status safely.
- Duplicate email with casing/spacing differences: normalize and deduplicate.
- Email provider failure: keep application pending, show retry/resend instructions and expose an admin operational event.
- Applicant changes email: create a new verification flow; do not transfer a seat without a verified, audited process.
- Withdrawal: mark withdrawn or delete according to approved retention/legal policy; release a Phase 1 seat only under a documented rule. Seat release/reallocation behaviour is an OPEN decision and must not be invented.

## 6. Admin workflow

- Admin signs in using an approved account and MFA.
- Dashboard shows Phase 1 capacity, accepted count, pending verification count, Phase 2 waitlist count, email delivery metrics and feature-priority aggregates.
- Admin can search/filter applications by status, date and feature priority.
- Admin can view an individual application only with role permission.
- Admin can update phase open/closed state and capacity with validation; Phase 1 accepted records cannot exceed the hard cap of 1,000.
- Admin can export only the minimum necessary fields; export action records actor, timestamp, scope and purpose.
- Admin can preview and request approval for a Phase 2 email campaign. Sending requires a separate confirmation step and is logged.
- All admin actions that change status, capacity, role or export data are audited.

## 7. Privacy/withdrawal journey

A visible privacy contact and documented request path must let applicants ask to withdraw or request deletion. Do not promise instant erasure if legal retention, audit or security records may need a separate lawful treatment. Legal owner must approve the exact process and response timeline.
