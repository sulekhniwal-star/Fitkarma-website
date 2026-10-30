# FitKarma Website — Mandatory Agent Rules

You are implementing the FitKarma pre-launch website and beta-registration platform. These rules are persistent and non-negotiable.

## 1. Read before acting

- Read `README.md` and every relevant document under `docs/` before making changes.
- For a task that crosses domains, read all affected specifications, not only the file that appears most obvious.
- Treat the uploaded FitKarma Master Documentation v1.0 as the product source. Treat `docs/00_DECISION_REGISTER.md` as the approved website-decision record.
- Before coding, state the target milestone, files expected to change, and acceptance tests. Do not start an unapproved milestone.

## 2. Protect the product truth

- Brand name must be **FitKarma**.
- Primary positioning must be **India's AI-powered Fitness and Wellness Ecosystem**.
- Website languages are English and Hindi from launch.
- Visual direction is hybrid futuristic + cinematic product launch.
- Do not invent testimonials, user counts, health outcomes, clinical validation, partnerships, awards, integrations, certifications, ratings, media coverage, launch dates, prices, or product screenshots.
- Do not claim a capability is live unless the owner has confirmed it is implemented and available in the beta build. Use `In beta`, `Rolling out during beta`, or `Planned within the beta programme` as appropriate.
- The owner's intent is for the complete feature inventory in the master documentation to be covered by the beta programme through staged releases. Do not delete/de-scope an item because the earlier app document marked it P1/P2/P3 or deferred. Equally, do not imply all items are live on day one or bypass clinical, legal, supplier or integration readiness gates.
- Do not change mobile-app technology or architecture as part of this website task.

## 3. Architecture constraints

- Use Next.js App Router, TypeScript, Tailwind CSS, Supabase and Vercel unless an approved ADR changes the decision.
- Keep the website independent from the Flutter app's client code. Share only approved backend contracts and stable product content.
- Use server-side code for privileged operations. Never expose Supabase secret/service-role keys, email-provider credentials, admin tokens or other secrets to the browser.
- Use database migrations for schema changes. Do not make undocumented dashboard-only schema edits.
- Use a server-side transactional/atomic registration operation to allocate beta seats. A frontend counter, disabled button, or client-side check is not a capacity control.
- Enforce a maximum of 1,000 Phase 1 accepted registrations in the database transaction. Verified applicants after capacity is reached must go to the Phase 2 waitlist.
- Make confirmation, seat allocation and email sending idempotent. Repeated callbacks must never allocate duplicate seats or send uncontrolled duplicate emails.
- Enable least-privilege grants and Row Level Security for every exposed table. Keep admin operations server-side and role-protected.
- Use environment variables for secrets. Keep `.env.example` placeholders only; never commit `.env.local` or real credentials.

## 4. Registration and communications

- Collect only the fields approved in `docs/02_REQUIREMENTS_AND_SCOPE.md` and `docs/07_DATA_MODEL_AND_API.md`.
- No phone number, health data, diagnosis, weight, medication, date of birth or precise location is required by the marketing-site registration form.
- Verify email before counting a Phase 1 place or confirmed waitlist entry.
- First-come, first-served ordering is based on successful server-side verification/seat-allocation time, not form-open time or an untrusted client timestamp.
- Email is the only beta communication channel. Do not add WhatsApp, SMS or phone workflows.
- Keep optional marketing consent separate from essential beta service messages.
- Do not send bulk mail directly from client code. Use a server-side email service and an auditable outbox/event pattern.

## 5. Design and accessibility

- Follow `docs/04_DESIGN_SYSTEM.md`; do not freestyle a second design system.
- Build responsive mobile-first layouts and test narrow screens.
- Support keyboard navigation, visible focus, semantic landmarks, accessible labels, contrast, reduced-motion preferences and useful form error messages.
- All user-facing text must exist in English and Hindi. Do not leave untranslated strings in either locale.
- Do not use motion that blocks reading, registration, keyboard use or low-end devices.
- Use genuine product assets only when supplied. Until then, label polished UI compositions as illustrative previews; never present fabricated screenshots as real app screens.

## 6. Scope discipline

- Do not add pricing, subscriptions, app-store badges, launch dates, referral rewards, social login, analytics vendors, paid campaigns or extra integrations unless specified or approved.
- Do not buy a domain, create paid accounts, incur spend, publish production deployments, send real emails to a list, change DNS, or expose public beta invitations without explicit owner approval.
- Record material product/architecture changes in `docs/00_DECISION_REGISTER.md` and an ADR/change log before implementation.
- If a dependency, requirement, API, product availability claim or legal requirement is unclear, mark it `OPEN DECISION` and report it. Do not fabricate an answer.

## 7. Definition of done

A task is not complete because code was generated. Run relevant lint, type-check, unit, integration, accessibility and build checks. Test success and failure states. Update documentation and the implementation checklist. Report exactly what passed, failed, was not run, and what still requires owner input.
