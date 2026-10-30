# 12 — Implementation Plan and Agent Work Units

## Milestone 0 — Repository and readiness

**Goal:** establish a safe, reproducible foundation before visual feature work.

Tasks:
- Create Next.js App Router + TypeScript + Tailwind project using current stable compatible versions.
- Commit lockfile and document selected versions.
- Install/verify formatting, linting and type checks.
- Create environment variable schema and `.env.example`.
- Establish local, preview and production environment separation.
- Add locale routing/message files for English/Hindi.
- Add Antigravity `AGENTS.md` and modular rules.

Acceptance: app boots, both locales render, type-check/lint/build pass, no real secret committed.

## Milestone 1 — Brand foundation and landing page

Tasks:
- Create central design tokens and reusable components.
- Integrate approved wordmark/logo assets when available; use text lockup placeholder until then.
- Build responsive nav, hero, feature bento grid, India nutrition section, how-it-works, privacy overview, beta section, FAQs and footer.
- Create illustrative product visuals with explicit labels.
- Add metadata, SEO, sitemap and locale alternates.

Acceptance: design direction matches specification; all visible copy appears in English/Hindi; no invented claims; mobile and accessibility checks pass.

## Milestone 2 — Beta application and email verification

Tasks:
- Implement controlled registration schema and server validation.
- Create database migrations for phases, applications, outbox and audit events.
- Configure Supabase Auth email magic link/OTP with production callback allowlist.
- Implement generic application response, verification and resend cooldown.
- Build atomic allocation transaction with hard Phase 1 cap 1,000.
- Implement Phase 2 waitlist state.
- Implement email adapter and local/test email sink.
- Add idempotency and concurrency tests.

Acceptance: all registration/capacity tests in `10_TESTING_AND_ACCEPTANCE.md` pass.

## Milestone 3 — Admin console

Tasks:
- Implement admin authentication/role checks and MFA requirement.
- Build capacity, phase state and aggregate feature-interest views.
- Build applicant filtering and least-privilege detail views.
- Build audited capacity/status controls and guarded export.
- Build email preview/campaign approval with dry-run mode.

Acceptance: non-admin cannot access data; admin actions are audited; no production campaign can be sent accidentally.

## Milestone 4 — Privacy/legal/operational hardening

Tasks:
- Finalise legal entity/contact details and reviewed privacy/terms copy.
- Add retention/deletion processes to the approved policy.
- Configure production mail sender and authentication records.
- Configure monitoring, alerting, backup and restore.
- Complete security, accessibility and performance review.
- Complete final Hindi native review.

Acceptance: owner/counsel checklists complete; no unresolved launch blocker.

## Milestone 5 — Controlled production launch

Tasks:
- Deploy behind registration-closed flag.
- Verify domain, HTTPS, callbacks, email delivery, admin roles and production database.
- Owner confirms Phase 1 capacity = 1,000 and Phase 1 open state.
- Owner approves public registration switch.
- Monitor verification conversion, delivery errors, capacity and abuse signals.

Acceptance: owner-approved go-live report and successful smoke tests.

## Milestone 6 — Phase 2 activation

Tasks:
- Owner sets Phase 2 capacity/status and approved invite URL.
- Preview English/Hindi email to Phase 1 users.
- Confirm no duplicate sends and no sensitive token in shareable link.
- Owner approves campaign; dispatch with rate controls and resumability.
- Measure Phase 2 registrations and feature-interest distribution.

Acceptance: invitation email sent once per eligible Phase 1 recipient; link works; phase state/capacity reflected accurately.

## Agent execution policy

- Start each milestone with a file/change plan.
- Work in small tasks; do not generate the whole site in one uncontrolled pass.
- At each task end, run the required checks and update the task checklist.
- Stop if an `OPEN` decision blocks correctness or legal safety.
- No domain purchase, paid subscription, real production email, DNS change or public registration opening without explicit owner approval.
