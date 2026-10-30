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

## 2. Marketing website tests

- Correct brand name and primary positioning.
- All primary navigation and CTAs work.
- English/Hindi switch preserves page intent.
- No dead links or placeholder text in production pages.
- Feature labels match the centrally approved feature status.
- Illustrative screens are labelled accurately.
- Responsive layout at small/mobile/tablet/desktop sizes.
- Reduced-motion mode works.
- Keyboard-only navigation and screen-reader labels are usable.
- Contrast and focus indicators meet the agreed WCAG 2.2 AA target as far as tested.
- SEO metadata, canonical, `hreflang`, sitemap and robots directives are correct.

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
