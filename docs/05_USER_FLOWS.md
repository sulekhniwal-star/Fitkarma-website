# 05 — User Flows

## 1. Beta application journey

1. Visitor navigates to `/beta` (or clicks the floating navbar "Join Beta" CTA from any page).
2. Page displays the live Phase 1 status bar (e.g. `482 / 1,000 Verified Seats Claimed`) with real-time updates.
3. Form collects:
   - Full Name
   - Email address
   - Primary Health Goals (multi-select: *Weight Loss & Metabolism*, *Lean Muscle & Strength*, *Gut Health & Digestion*, *Daily Energy & Stamina*, *Sustained Habit Consistency*)
   - Device Platform (*iOS*, *Android*, *Both*)
   - Features Needed Most from Feature Inventory (multi-select: *Indian Nutrition & Household Portions*, *Daily Intelligence Package (DIP)*, *AI Photo Food Logging*, *WhatsApp Text & Voice Logging*, *Connected Health Sync*, *Family-Aware Wellness*) + optional custom "Other" text input.
4. Visitor acknowledges beta terms and privacy notice (un-ticked promotional consent separate).
5. Server validates inputs, checks honeypot/rate-limits, and inserts pending verification record.
6. System sends a one-time transactional verification code / magic link via Resend.
7. User enters the OTP or clicks the magic link (`/auth/verify`).
8. PostgreSQL atomic transaction executes `allocate_beta_seat(user_id)`:
   - If Phase 1 has `< 1,000` accepted seats, atomically assigns the next sequential seat number (`#0001` to `#1000`) with status `phase1_accepted`.
   - If Phase 1 is full (`>= 1,000`), assigns status `phase2_waitlist` with queue number.
9. **VIP Beta Pass Generation:** User is redirected to `/auth/verify` which renders their dynamic, holographic **VIP Beta Pass**:
   - Displays applicant name, allocated seat badge (e.g., `VIP SEAT #0042`), and issue date.
   - Provides a 1-click **Download Pass (PNG)** button and **Share to WhatsApp** & **Share to X** buttons with pre-filled text.
10. System sends the official confirmation email via Resend containing a digital copy of their pass.

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
