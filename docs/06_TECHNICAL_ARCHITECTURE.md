# 06 — Technical Architecture

## 1. Approved direction

- **Frontend:** Next.js App Router + TypeScript.
- **Styling:** Tailwind CSS with central design tokens.
- **Backend/data:** Supabase PostgreSQL, Auth, server-side functions/Edge Functions as appropriate.
- **Hosting:** Vercel.
- **Email:** transactional provider behind an adapter (provider not yet selected).
- **Bot controls:** honeypot + server-side rate limit; add a managed challenge only after choosing/approving provider.
- **Monitoring:** structured server logs and an error-monitoring product after owner approval.

Select current stable versions at implementation time, verify compatibility with official documentation, commit lockfiles, and record chosen versions in `docs/00_DECISION_REGISTER.md` or an ADR. Do not use an old pinned version merely because a tutorial used it.

## 2. Logical architecture

```text
Browser
  ├── Next.js localized pages (/en, /hi)
  ├── Public beta application form
  └── Protected admin UI
          │
          ▼
Next.js server actions / route handlers
          ├── Input validation + normalisation
          ├── Rate limit + bot checks
          ├── Supabase Auth email verification
          ├── Privileged admin authorization
          └── Email provider adapter
                  │
                  ▼
Supabase
  ├── PostgreSQL (applications, phases, outbox, audit)
  ├── Auth (email magic link/OTP and admin auth)
  ├── RLS and database grants
  └── Transactional allocation function
                  │
                  ▼
Transactional email provider
  ├── Verification email
  ├── Phase 1 accepted email
  ├── Phase 2 waitlist email
  └── Approved Phase 2 announcement/invitation
```

## 3. Responsibilities

### Next.js

- Render indexable localized pages.
- Handle public form submission and verification return routes.
- Validate inputs server-side.
- Call a narrow database/API contract; do not place privileged keys in client bundles.
- Render admin interface only after server-side role authorization.

### Supabase

- Source of truth for applications, phase capacities and seat allocation.
- Enforce unique normalised emails and legal status transitions.
- Run a transaction to allocate a Phase 1 seat or Phase 2 waitlist status.
- Store email outbox jobs and event history.
- Enforce RLS/grants on every exposed table.
- Support passwordless email verification for applicants and protected admin authentication.

### Email provider adapter

- Expose narrow operations such as `sendVerification`, `sendApplicationAccepted`, `sendWaitlistConfirmation`, `sendPhaseInvitation`.
- Normalize provider results and error classes.
- Do not let arbitrary user-submitted text become an email HTML template.
- Persist send attempts, provider message ID, idempotency key, status and safe error code.

## 4. Security boundaries

- Public visitor: can submit one application and complete their own verification; cannot read applicant lists or arbitrary registration statuses.
- Verified applicant: may see only their own status using a secure session/token flow.
- Admin: can view/manage applicants and phases according to assigned role.
- Server/database function: only privileged path that can assign seats or change capacity.
- Service-role/secret key: server only; never in client, static assets, source maps or browser logs.

## 5. Recommended project layout

```text
src/
  app/
    [locale]/
      page.tsx
      features/page.tsx
      beta/page.tsx
      privacy/page.tsx
      terms/page.tsx
      faq/page.tsx
    auth/confirm/route.ts
    api/beta/applications/route.ts
    api/beta/resend-verification/route.ts
    admin/...
  components/
    layout/
    marketing/
    beta/
    admin/
    ui/
  i18n/
  lib/
    validation/
    supabase/
    email/
    rate-limit/
    security/
  messages/
    en.json
    hi.json
supabase/
  migrations/
  functions/
  tests/
public/
  brand/
  images/
```

The agent may adjust the exact layout to current Next.js conventions, but must preserve clear boundaries and document the change.

## 6. Environments

- Local development: local environment and non-production Supabase project.
- Preview: Vercel preview deployments connected only to staging/test data and test email sinks.
- Production: separate Supabase project, production email sender and approved domain.
- Never send real user emails from preview environments.
- Never point preview builds at production data by default.

## 7. Reliability and performance

- Use idempotency for submissions and email jobs.
- Set safe timeouts and retry policies; never retry non-idempotent seat allocation blindly.
- Use a transactional outbox: commit registration/seat state and email intent together, then dispatch email asynchronously/reliably.
- Keep registration working under low bandwidth and on mobile.
- Avoid unnecessary client JavaScript and heavy 3D effects; serve responsive images and lazy-load below-fold media.
- Public seat counter must query trusted aggregate data or a cache updated from the source of truth; never accept client count values.

## 8. Architecture decision records

Create an ADR for material changes including database provider, authentication method, email provider, rate-limit service, analytics, CMS, custom domain architecture, or changes to seat allocation semantics.
