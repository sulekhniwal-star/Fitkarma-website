# 10 — Testing Strategy and Acceptance Criteria

## 1. Definition of done

- Product and design requirements implemented for the approved milestone.
- English and Hindi both complete.
- Mobile/tablet/desktop checked.
- Accessibility checks performed.
- Lint, type-check, unit tests and production build pass.
- Critical registration and security tests pass.
- No known blocking errors in browser console/server logs.
- Documentation and decision register updated.
- Report tests run, tests skipped, issues and owner dependencies honestly.

## 2. Marketing website & interactive tests

- Correct brand name (`FitKarma`) and approved positioning everywhere.
- All multi-page routes (`/`, `/features`, `/about`, `/beta`, `/faq`, `/privacy`, `/terms`) render without 404 or hydration mismatches.
- English/Hindi switch preserves current route and intent.
- **3D Karma Ring & WebGL Fallback:**
  - Renders 60 FPS on WebGL-enabled desktop and modern mobile devices.
  - Automatically reduces particle count or falls back to an animated CSS gradient mesh when WebGL is unsupported, disabled, or in low-power mode.
  - No uncaught WebGL context errors in browser console.
- **UI Sound Design (SFX):**
  - Mute/Unmute state toggles immediately and persists in `localStorage`.
  - Zero sound playback on initial page load without explicit user gesture/interaction.
- **Interactive Simulators (`/features`):**
  - Indian Meal Sandbox dynamically updates calories and macros as roti and katori sliders change.
  - Daily Intelligence Package preview cards toggle context correctly.
- **VIP Beta Pass Card:**
  - Accurately displays user's allocated seat number (`VIP SEAT #xxxx`).
  - PNG export produces a sharp image without clipped borders or missing typography.
  - WhatsApp and X share links generate clean URL parameters without leaking PII.
- Reduced-motion mode (`prefers-reduced-motion`) halts 3D camera sweeps and GSAP pinned sequences.
- Keyboard-only navigation and focus rings meet WCAG 2.2 AA target.
- Metadata, Open Graph images, canonical URLs, and `hreflang` tags verified.

## 3. Registration functional tests

- Valid form submission creates exactly one pending application.
- Invalid name/email/feature selection is rejected with accessible feedback.
- Normalized duplicate email does not create another applicant or seat.
- Whitespace/case variants of the same email deduplicate.
- Email verification link succeeds once.
- Expired, malformed and replayed links fail safely.
- Resend cooldown and rate limit are enforced.
- Generic responses do not enable email enumeration.
- User cannot set status, seat number, phase, verification timestamp or admin role from the browser.
- Feature priority is stored exactly as an allowed value.
- Consent versions/timestamps are recorded as specified.
- Optional marketing consent remains false unless the user explicitly checks it.
- Phone number and health information are not present in the form or schema.

## 4. Critical capacity/concurrency tests

Create a deterministic integration/load test using an isolated test database:

1. Set Phase 1 capacity to 1,000.
2. Prepare at least 1,050 distinct pending applications with valid test verification identities.
3. Verify them concurrently (burst and sustained patterns).
4. Assert exactly 1,000 have `phase1_accepted` and unique seat numbers 1–1,000.
5. Assert all remaining verified applications are `phase2_waitlist`.
6. Assert there is no duplicate seat, no seat 1,001 and no negative/over-capacity count.
7. Replay successful confirmation calls; assert accepted/waitlist status and seat number do not change and duplicate emails are not created.
8. Inject transaction failures; assert no partial seat assignment without corresponding status/outbox intent.
9. Run the same test with multiple app/server instances if supported by the test environment.

This is a release blocker. Do not rely on a visual counter or manual inspection.

## 5. Email tests

- Templates render English and Hindi.
- Verification link has approved origin and expires.
- Confirmation email matches actual status.
- Phase 2 invitation links to approved public URL and contains no personal token.
- Test/preview never mails real applicants.
- Retry does not duplicate successful messages.
- Bounce/provider failure becomes visible to admin without exposing secrets.
- Email addresses are correctly escaped and not reflected unsafely.

## 6. Admin/security tests

- Anonymous visitor cannot access admin route or APIs.
- Authenticated non-admin cannot view applicant data.
- Read-only admin cannot change capacity or send campaigns.
- Admin can only perform actions allowed by role.
- Export action is logged.
- Capacity cannot be reduced below already accepted seats.
- Phase 1 capacity cannot be set above hard cap 1,000 without an explicit, approved policy change (Phase 1 ceiling itself is fixed unless owner changes it).
- RLS and grants are tested for anon/authenticated/admin roles.
- Secrets are absent from client assets, browser logs and repository history.

## 7. Performance and reliability

- Test low-bandwidth mobile registration and graceful retry.
- Avoid layout shifts in hero/product imagery.
- Optimise images and defer noncritical motion/visual assets.
- Test server and email-provider outage states.
- Test backup restoration before production launch.

## 8. Required release evidence

Produce a release test report including commit/build identifier, environment, date, test commands, pass/fail totals, capacity-test evidence, accessibility findings, security findings, unresolved issues and owner approvals.
