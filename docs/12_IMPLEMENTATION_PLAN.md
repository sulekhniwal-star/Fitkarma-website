# 12 — Implementation Plan and Agent Work Units

## Milestone 0 — Repository, Architecture & 3D/Motion Readiness

**Goal:** Establish a high-performance, modern project architecture with 3D/WebGL and motion foundations.

Tasks:
- Initialize Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS.
- Configure Lenis smooth scrolling provider and GSAP + ScrollTrigger integration.
- Set up React Three Fiber (R3F) + `@react-three/drei` + `postprocessing` for the ambient interactive background canvas with dynamic cursor reactions.
- Configure Motion (`framer-motion`) for layout transitions and micro-interactions.
- Set up Supabase client and Resend SDK with React Email.
- Integrate official FitKarma vector logo system from `FitKarma-Logo/`.
- Establish bilingual dictionary infrastructure (`/messages/en.json`, `/messages/hi.json`) with instant locale switching.

Acceptance: Next.js 16 boots cleanly, 3D interactive canvas responds smoothly to pointer movements, smooth scroll runs at 60+ FPS, design tokens render crisp dark mode.

## Milestone 1 — Multi-Page Brand Experience & Interactive Showcase

**Goal:** Build out the dedicated multi-page experience with sleek animations, bento layouts, and interactive simulators.

Tasks:
- **Navigation & Footer:** Sticky glassmorphism header with logo lockup, page links (`/features`, `/about`, `/beta`, `/faq`), language switcher, and glow CTA.
- **Home (`/`):** Cinematic hero with 3D interactive canvas, positioning eyebrow, headline split animation, feature bento cards with hover spotlight, India nutrition preview, Daily Intelligence teaser, and waitlist progress bar.
- **Features (`/features`):** Deep-dive interactive bento page featuring:
  - Interactive Indian Food Logger widget (roti slider, katori volume selector, tadka oil calculator).
  - Live Daily Intelligence Package (DIP) simulator.
  - AI Photo Food Scanner simulator with confidence indicators.
  - Connected Health, Offline-first, and Family Wellness cards.
- **About (`/about`):** FitKarma origin story, mission, the cultural need for India-specific health intelligence, and data privacy commitments.
- **FAQ (`/faq`):** Searchable, animated accordion answering key beta, nutrition, and privacy questions.
- **Legal (`/privacy`, `/terms`):** Polished, legally compliant DPDP 2025 privacy notice and beta terms.

Acceptance: Multi-page navigation is fluid with zero layout shift, interactive simulators work flawlessly, visual punch matches the Linear/Apple dark aesthetic, and all copy is localized.

## Milestone 2 — Beta Application, Verification & Seat Allocation

**Goal:** Implement the dedicated `/beta` page with strict atomic 1,000 Phase 1 seat reservation and double opt-in verification.

Tasks:
- **Beta Page (`/beta`):** Live verified seat counter (1,000 cap), dynamic progress bar, and frictionless multi-step registration form (Name, Email, Multi-select Feature Interests, Platform preference).
- **Supabase Database Schema:** Migrations for `applications`, `phases`, `outbox`, and `audit_logs` with Row Level Security (RLS).
- **Atomic Allocation Function:** PostgreSQL function enforcing strict FIFO allocation by email verification timestamp, auto-transitioning to Phase 2 waitlist at 1,000 seats.
- **Double Opt-In Email Verification:** Resend transactional email dispatch with React Email template containing secure OTP / magic link.
- **Verification Callback (`/auth/verify`):** Confirms email, triggers atomic seat assignment, and renders personalized reservation status card.

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
