# FitKarma Pre-Launch Website & Beta Ecosystem

## What This Is

The official pre-launch web platform for **FitKarma** — India's AI-powered Fitness and Wellness Ecosystem. It introduces the product vision to Indian users, demonstrates core differentiators through interactive simulators (Indian Meal Sandbox with roti/katori sliders, Daily Intelligence Package preview, AI food scanner), and orchestrates a high-converting, strictly capped 1,000-seat VIP Beta Pass onboarding flow with automatic Phase 2 waitlist transitions and an MFA-protected admin console.

## Core Value

Deliver an immersive, culturally attuned pre-launch experience that authentically communicates FitKarma's India-first health intelligence while atomically managing the 1,000-seat VIP Beta cohort with high-trust social verification assets.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] High-impact multi-page website (`/`, `/features`, `/about`, `/beta`, `/faq`, `/privacy`, `/terms`) in Next.js App Router with Tailwind CSS and Framer Motion.
- [ ] 3D WebGL interactive centerpiece: Floating 'Karma Ring' with cursor physics, particle dynamics, and graceful CSS/SVG fallback for lower-spec devices.
- [ ] Three dedicated interactive simulator sections: Indian Meal Sandbox (roti/katori sliders & regional thali presets), Daily Intelligence Package (DIP) preview widget, and AI Food Scanner interactive demo.
- [ ] Frictionless Beta registration flow collecting Name, Email, Health Goals, Platform, and Feature Priorities with honeypot & server-side sliding window rate limiting.
- [ ] Supabase PostgreSQL database schema with atomic FIFO quota decrement stopping Phase 1 acceptance at exactly 1,000 verified spots.
- [ ] Double opt-in email verification and lifecycle email dispatch via Resend using branded React Email templates.
- [ ] Dynamic downloadable VIP Beta Pass card generator with seat number badge, custom QR/referral link, and 1-click WhatsApp/X share triggers.
- [ ] Seamless automatic Phase 2 waitlist allocation once Phase 1 fills, including auto-promotion logic if seats are relinquished.
- [ ] Full bilingual support (English and Hindi) with type-safe routing via `next-intl` (`/en`, `/hi`) and floating locale toggle.
- [ ] Ambient UI sound design (SFX for hovers, clicks, pass creation) with persistent navbar sound mute/unmute toggle.
- [ ] MFA-protected Admin Console for real-time registration audits, cohort management, capacity override, and CSV export.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Native mobile app functionality (iOS/Android Flutter apps) — This project is the pre-launch web platform and beta gate, not the mobile app itself.
- Production clinical diagnosis, biometric curing claims, or unverified medical promises — Health claims are strictly lifestyle and preventive, kept separate from traditional wellness.
- SMS or WhatsApp OTP verification — All beta communication is strictly email-only to maximize deliverability and avoid carrier gateway dependencies.
- Public social networking / user profiles — Beta participants interact via their private VIP pass and waitlist, not a social feed.

## Context

FitKarma addresses the unique metabolic, nutritional, and cultural health landscape of India. The pre-launch platform serves as the public launchpad to validate demand, educate users on differentiating features (Indian household portions, Daily Intelligence Package, offline-first logging, connected health platforms), and capture high-intent beta cohorts. The codebase is developed within Google Antigravity, governed by strict brand and content rules (`.agents/rules/content-and-brand.md`), verified vector brand assets (`FitKarma-Logo/`), and the master specification in `docs/`.

## Constraints

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS, Supabase (Postgres & Auth), Resend, next-intl.
- **Data Security & Privacy**: Digital Personal Data Protection (DPDP) Act compliance, strict data minimization (no phone numbers or sensitive medical metrics on public forms), allowlisted admin access with MFA.
- **Capacity**: Hard database-enforced atomic allocation ensuring Phase 1 never exceeds 1,000 accepted registrations under race conditions.
- **Language**: English and Hindi coverage required for all visible UI strings, email templates, and error states.
- **Performance**: High visual fidelity with automatic hardware/FPS detection scaling particle count, falling back smoothly to lightweight CSS glowing gradient on lower-end devices.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Brand is FitKarma | Exact approved spelling across all metadata and UI | ✓ Good |
| Positioning: "India's AI-powered Fitness and Wellness Ecosystem" | Approved primary positioning statement | ✓ Good |
| Next.js App Router + TypeScript + Tailwind CSS | Industry standard for SSR/SSG, SEO, and developer velocity | ✓ Good |
| Supabase (Postgres + Auth) | Atomic row-level locking for the 1,000 seat quota and secure MFA admin auth | ✓ Good |
| Resend + React Email | High Indian inbox deliverability and type-safe transactional templates | ✓ Good |
| Bilingual next-intl (/en, /hi) | SEO-friendly localized subpaths with verified type-safe translations | ✓ Good |
| 3D WebGL Karma Ring with CSS fallback | Visual punch on desktop/high-end devices without penalizing lower-bandwidth mobile devices | ✓ Good |
| Dynamic Downloadable VIP Beta Pass Card | High viral potential for organic sharing on WhatsApp and X | ✓ Good |
| Three Interactive Simulators | Demonstrates product depth (Meal Sandbox, DIP, Scanner) beyond simple marketing copy | ✓ Good |
| Email-Only Beta Communications | Simpler operations, lower friction, zero reliance on SMS delivery issues | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-11-02 after initialization*
