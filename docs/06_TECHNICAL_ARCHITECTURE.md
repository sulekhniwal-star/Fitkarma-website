# 06 — Technical Architecture

## 1. Approved direction

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling:** Tailwind CSS with centralized design tokens and border-glow utilities.
- **3D & Graphics:** React Three Fiber (R3F) + `@react-three/drei` + `postprocessing` for WebGL interactive canvas background and dynamic cursor reactive particle fields.
- **Motion & UI Animations:** Motion (`framer-motion`) for buttery UI micro-interactions, layout transitions, and interactive bento cards.
- **Scroll & Storytelling:** GSAP + ScrollTrigger for pinned multi-step walkthroughs; Lenis for silky smooth momentum scrolling.
- **Backend & Database:** Supabase PostgreSQL, Row Level Security (RLS), atomic seat allocation transaction/RPC function, and Supabase Auth (double opt-in OTP / magic links).
- **Hosting:** Vercel.
- **Transactional Email:** Resend with React Email templates.
- **Bot Controls:** Honeypot + server-side rate limit.
- **Multi-Page App Structure:** Dedicated routes for `/` (Home), `/features`, `/about`, `/beta`, `/faq`, `/privacy`, `/terms`, and `/auth/verify`.

## 2. Logical architecture

```text
Browser
  ├── Next.js multi-page routes (/, /features, /about, /beta, /faq)
  ├── Public beta application form (/beta)
  └── Protected admin UI (/admin)
          │
          ▼
Next.js server actions / route handlers
  ├── Input validation & normalisation (Zod)
  ├── Edge rate limiting & honeypot validation
  ├── Supabase Auth signup (triggers verification email via Supabase Auth SMTP)
  ├── Verification callback route (/auth/verify) -> executes atomic allocation
  └── Transactional lifecycle email worker -> dispatches via Resend SDK
          │
          ├─────────────────────────────────────────────────┐
          ▼                                                 ▼
Supabase Auth                                     Supabase PostgreSQL
  ├── Passwordless OTP/Magic Link                   ├── beta_applications (applicant records)
  ├── MFA Admin Auth                                ├── beta_phases (Phase 1 cap: 1,000)
  └── Custom SMTP / Resend Hook                      ├── email_outbox (transactional jobs)
          │                                         └── audit_events (audit trail)
          ▼ (Verification Email)                            │
Resend SMTP Service                                         ▼ (Lifecycle Emails)
  └── Sends Verification OTP/Link to user         Resend SDK (Next.js Server Worker)
                                                    ├── Phase 1 Accepted + VIP Pass Email
                                                    ├── Phase 2 Waitlist Email
                                                    └── Phase 1 Promotion Email (D-029)
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
      about/page.tsx
      beta/page.tsx
      faq/page.tsx
      privacy/page.tsx
      terms/page.tsx
    auth/verify/route.ts
    api/beta/applications/route.ts
    api/beta/resend-verification/route.ts
    admin/...
  components/
    canvas/          # R3F WebGL canvas, particle fields, cursor interactions
    motion/          # GSAP ScrollTrigger wrappers, Lenis provider
    layout/          # Navbar, Footer, bilingual switcher
    marketing/       # Bento cards, Indian nutrition demo, DIP simulator
    beta/            # Live counter, spot reservation form, OTP dialog
    admin/           # Protected admin analytics & phase management
    ui/              # Buttons, inputs, dialogs, badges, glow borders
  i18n/              # Language dictionary & locale helpers
  lib/
    supabase/        # Supabase client & admin server actions
    email/           # Resend adapter & React Email templates
    rate-limit/      # Edge rate limiting & honeypot validation
  messages/
    en.json          # English copy
    hi.json          # Hindi copy
supabase/
  migrations/
  functions/
public/
  brand/             # SVGs & PNGs from FitKarma-Logo/
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

### ADR-001: Separation of Verification Auth Email and Application Lifecycle Email Dispatch

- **Status:** APPROVED (Decision D-038).
- **Context:** Supabase Auth is our engine for passwordless identity verification (one-time OTP / magic links sent to `/auth/verify`), while Resend is our transactional email provider for branded lifecycle emails (Phase 1 acceptance with VIP Beta Pass, Phase 2 waitlist, Phase 1 waitlist promotion). If application code generated and sent raw authentication links itself, it would bypass Supabase Auth rate limits, leak tokens, and duplicate auth state.
- **Decision:**
  1. **Authentication Email (OTP / Magic Link):** Handled exclusively by **Supabase Auth**. In production, Supabase Auth is configured with custom SMTP credentials pointing to Resend SMTP (or Supabase Auth Send Email Hook calling Resend API directly). The auth token/link template is managed within Supabase Auth configuration.
  2. **Application Lifecycle Emails (`phase1_accepted`, `phase2_waitlist`, `phase1_promotion`):** Handled exclusively by the **Application Server (Next.js server action / worker)** reading from `email_outbox` and dispatching through the Resend Node.js SDK using custom React Email components (`@react-email/components`).
- **Consequences:** Clear architectural separation. Next.js application code never generates, inspects, or sends raw authentication secrets. `email_outbox` is strictly dedicated to post-allocation application lifecycle notifications.
