# Requirements: FitKarma Pre-Launch & VIP Beta Platform

## 1. Overview & Core Value

FitKarma is India's AI-powered Fitness and Wellness Ecosystem. The pre-launch website serves as the primary public touchpoint to:
1. Educate and engage Indian health seekers through a problem-first, cinematic product narrative highlighting Indian nutrition, WhatsApp logging, and offline-first privacy.
2. Recruit, validate, and atomically allocate 1,000 exclusive Phase 1 VIP founder beta seats.
3. Divert verified applicants beyond the 1,000 cap smoothly into the Phase 2 waitlist.
4. Capture high-fidelity feature demand telemetry (tracking which upcoming capabilities users desire most) to guide the founder's mobile app rollout.

---

## 2. User Stories

### US-01: Problem Discovery & Education
> As an Indian fitness enthusiast frustrated with Western apps (which fail on Indian home-cooked meals, lack katori measurements, and ignore family dining), I want to see a cinematic explanation of how FitKarma solves India-specific health challenges so that I understand why this product is uniquely built for me.

### US-02: Moat Exploration
> As a prospective user, I want to explore interactive demonstrations of FitKarma's key differentiators—WhatsApp Hinglish logging, Tadka/katori portion estimators, Daily Intelligence Package (DIP), and offline data privacy—so that I understand the value before joining the beta.

### US-03: Bilingual Access
> As a Hindi or English speaker, I want to experience the complete website, registration forms, legal notices, and transactional emails in my preferred language without broken strings or unnatural phrasing.

### US-04: Frictionless VIP Registration
> As a high-intent user, I want to apply for the 1,000 Phase 1 founder spots using only my name, email, and top feature preferences—without being forced to provide phone numbers, medical diagnoses, or sensitive personal data.

### US-05: Verified Seat Allocation
> As an applicant, I want to receive a secure, passwordless email verification link immediately upon submission so that my spot is verified and atomically claimed on a first-come, first-served basis.

### US-06: Waitlist Transparency
> As a user who registers after the 1,000 Phase 1 capacity has been claimed, I want clear confirmation that I am on the Phase 2 waitlist, with transparent updates on when the next cohort will open.

### US-07: Founder / Admin Telemetry
> As the founder/product owner, I want a secure, role-restricted dashboard showing real-time capacity, registration velocity, and a feature demand heatmap showing which capabilities applicants want most, so that I can prioritize engineering resources.

### US-08: Privacy & DPDP Compliance
> As a privacy-conscious citizen, I want explicit control over my data, separate consents for beta operations vs promotional announcements, and a straightforward self-service option to withdraw my application and erase my data.

---

## 3. Functional Requirements

### 3.1 Architecture & Core Foundation (`ARCH`)
- **ARCH-01**: Application built with Next.js App Router (TypeScript) and Tailwind CSS.
- **ARCH-02**: Decoupled from Flutter client code; interacts solely through server-side Supabase and Resend adapters.
- **ARCH-03**: Privileged operations (database writes, seat allocation, admin metrics, export) executed exclusively server-side. Zero Supabase service-role keys or email provider credentials exposed to the client.
- **ARCH-04**: Strict environment schema validation at boot using Zod, verifying all required environment variables before processing requests.

### 3.2 Bilingual Localization (`I18N`)
- **I18N-01**: Subpath-based locale routing (`/en` and `/hi`) with automated language detection and explicit language toggle in header and footer.
- **I18N-02**: 100% translation parity across all marketing copy, component states, error messages, form validation labels, and email templates.
- **I18N-03**: Clean SEO alternate hreflang tags linking English and Hindi equivalents.

### 3.3 Visual Identity & Landing Page (`LAND`)
- **LAND-01**: Hybrid futuristic + cinematic launch visual theme using the approved brand color palette (#0D0F12 canvas, #65C94B accent, #36C96A secondary green, #D6A84B gold).
- **LAND-02**: Hero section delivering the primary positioning: *"India's AI-powered Fitness and Wellness Ecosystem"* with high-contrast CTA and live remaining founder seats counter.
- **LAND-03**: Problem-Solution narrative contrasting Western tracker friction (calories, ounces, generic recipes) with FitKarma's India-native design (katoris, tadka oil slider, regional recipes).
- **LAND-04**: Bento Grid feature showcase presenting core moats:
  - WhatsApp Voice & Text Logging in Hinglish
  - Deep Indian Nutrition & Family Recipe Splitter
  - Daily Intelligence Package (DIP) contextual feed
  - Offline-First Resilience (SQLCipher on-device vault)
  - Family Care Sharing
- **LAND-05**: Rollout status labels strictly restricted to approved tags: `In beta`, `Rolling out during beta`, or `Planned within the beta programme`. Zero claims of unvalidated live features.
- **LAND-06**: Trust strip, How It Works timeline, FAQ accordion, and footer with legal and contact links (`sulekhniwal@gmail.com`).
- **LAND-07**: **3D Rendered Device Mockups & Depth**: CSS 3D perspective floating phone frames with dynamic rim-lighting, metallic chamfer edges, and interactive tilt, showcasing app screens (Hinglish voice logging, Katori portion picker, DIP home feed) with explicit *"Illustrative preview"* micro-badges.
- **LAND-08**: **Indian Cultural Aesthetics & Craft**: Purposeful Indian visual language incorporating warm brass and turmeric gold accents (`#D6A84B`), subtle jaali/mandala lattice ambient textures, Indian household culinary portion units (katoris, rotis, tadka oil slider), and Hinglish audio waveforms.

### 3.4 Beta Registration & Capacity Control (`REG`)
- **REG-01**: Form collects strictly approved fields: `full_name` (required), `email` (required), `primary_feature_interest` (required single-select or multi-select), optional `device_platform` (Android/iOS/Both/Not sure), optional `preferred_language` (English/Hindi), and optional `other_feature_interest_text` (max 250 chars).
- **REG-02**: Absolutely no phone number, weight, age, health diagnosis, medication, or precise location collected.
- **REG-03**: Honeypot field and client/server rate limiting to repel automated abuse.
- **REG-04**: Explicit checkbox separation: essential beta communication & terms acceptance (mandatory) vs optional product announcements (optional).

### 3.5 Atomic Seat Allocation Engine (`ALLOC`)
- **ALLOC-01**: Server-side PostgreSQL atomic transaction (`claim_beta_seat`) executing seat allocation upon successful email verification callback.
- **ALLOC-02**: Hard cap of strictly 1,000 accepted Phase 1 applicants. Verified applicant #1,001+ automatically assigned status `phase2_waitlist`.
- **ALLOC-03**: FIFO allocation order governed by verified timestamp (`email_verified_at`), not form submission timestamp.
- **ALLOC-04**: Idempotent verification handler—re-clicking magic link returns existing status without modifying capacity or duplicating records.
- **ALLOC-05**: Auto-promotion trigger: If a Phase 1 accepted applicant withdraws, the earliest verified Phase 2 waitlist applicant is automatically promoted to Phase 1.

### 3.6 Transactional Email Pipeline (`EMAIL`)
- **EMAIL-01**: Resend transactional email integration with local dev sink fallback (logging to console/file when `EMAIL_DEV_SINK=true`).
- **EMAIL-02**: Send verification email containing secure magic link / OTP with 15-minute expiration and 60-second resend cooldown timer.
- **EMAIL-03**: Send bilingual Phase 1 Accepted welcome email containing VIP founder badge confirmation, date-neutral onboarding notice, and unique reference ID.
- **EMAIL-04**: Send bilingual Phase 2 Waitlist confirmation email indicating queue standing and notice of Phase 2 cohort opening.
- **EMAIL-05**: Outbox pattern / event log ensuring auditable delivery and preventing duplicate sends.

### 3.7 Admin Analytics & Telemetry Hub (`ADMIN`)
- **ADMIN-01**: Route-protected admin dashboard (`/admin`) guarded by Supabase Auth with strict `ADMIN_EMAIL_ALLOWLIST` checking and MFA requirement.
- **ADMIN-02**: Real-time capacity gauge showing Phase 1 filled (X/1,000), Phase 2 waitlist count, and verification conversion rate.
- **ADMIN-03**: Feature Demand Heatmap visualizing aggregate demand across all 15 survey categories.
- **ADMIN-04**: Filterable applicant table with status controls (`withdrawn`, `rejected_abuse`) and least-privilege masked PII.
- **ADMIN-05**: Audited CSV export logging administrator identity, timestamp, and purpose.
- **ADMIN-06**: Phase 2 email campaign preview and dry-run dispatch controls.

### 3.8 Privacy & DPDP Act 2025 Compliance (`PRIV`)
- **PRIV-01**: Standalone Privacy Notice (`/privacy`) and Beta Terms (`/terms`) with explicit version tracking (`privacy_notice_version`, `beta_terms_version`).
- **PRIV-02**: Self-service applicant withdrawal / erasure endpoint ("Erase my existence") with cascading anonymization and audit receipt.
- **PRIV-03**: Zero third-party ad pixels or trackers; privacy-friendly analytics with zero PII payload.
- **PRIV-04**: Row Level Security (RLS) enabled on all Supabase tables with least-privilege policy grants.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Reliability
- **PERF-01**: Core Web Vitals targets: LCP < 2.0s, INP < 100ms, CLS < 0.05 on standard 4G Indian mobile devices.
- **PERF-02**: Static asset optimization with modern WebP/SVG formats and Next.js Image caching.
- **PERF-03**: Edge caching for static marketing routes; serverless execution for registration and auth callbacks.

### 4.2 Security & Integrity
- **SEC-01**: OWASP ASVS Level 1 compliance; strict CSP, HSTS, X-Content-Type-Options, and Referrer-Policy headers.
- **SEC-02**: Server-side input validation and sanitization via Zod on all API endpoints.
- **SEC-03**: Constant-time comparison for tokens and hashes where applicable; parameter binding on all SQL queries.

### 4.3 Accessibility & Design
- **A11Y-01**: WCAG 2.1 Level AA compliance, including minimum 4.5:1 text contrast on dark canvas.
- **A11Y-02**: Full keyboard navigation support with visible focus rings on interactive elements.
- **A11Y-03**: Respects user's `prefers-reduced-motion` settings across all animations.

---

## 5. Traceability Matrix

| Requirement | Phase | Primary Components / Files |
|-------------|-------|----------------------------|
| ARCH-01..04 | Phase 1 | `src/app/layout.tsx`, `src/lib/env.ts`, `next.config.ts` |
| I18N-01..03 | Phase 1 | `src/middleware.ts`, `src/i18n/`, `src/messages/{en,hi}.json` |
| LAND-01..02, LAND-08 | Phase 2 | `src/app/globals.css`, `tailwind.config.ts`, `src/components/ui/` |
| LAND-03..07 | Phase 3 | `src/components/marketing/`, `src/config/features.ts` |
| ALLOC-01..05| Phase 4 | `supabase/migrations/`, `src/lib/supabase/` |
| REG-01..04  | Phase 5 | `src/components/marketing/beta-registration-form.tsx`, `src/app/api/beta/` |
| EMAIL-01..05| Phase 5 | `src/lib/email/adapter.ts`, `src/lib/email/templates.ts` |
| ADMIN-01..06| Phase 6 | `src/app/[locale]/admin/`, `src/lib/auth/admin.ts` |
| PRIV-01..04 | Phase 7 | `src/app/[locale]/privacy/`, `src/app/[locale]/terms/`, `src/app/api/beta/withdraw/` |
| Operational | Phase 8 | Vercel configs, registration pause flag, smoke test suite |

---

## 6. Definition of Done

A phase or feature is marked DONE only when:
1. TypeScript compilation (`pnpm tsc --noEmit`) passes with zero errors.
2. Linter (`pnpm eslint`) passes without warnings or errors.
3. Automated integration and unit tests pass for the changed subsystem.
4. Both English (`/en`) and Hindi (`/hi`) render correctly without untranslated strings.
5. Mobile viewport responsiveness and keyboard accessibility are verified.
6. Documentation and `.planning/` state artifacts are updated to reflect the completed state.

