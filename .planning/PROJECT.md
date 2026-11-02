# FitKarma Pre-Launch Website & Beta Registration Platform

## What This Is

FitKarma's pre-launch marketing website and VIP beta-registration platform. It introduces India's AI-powered Fitness and Wellness Ecosystem through a cinematic, problem-first narrative, showcases its core product moats (WhatsApp AI logging, deep Indian nutrition, offline resilience, and family health), and securely recruits, validates, and manages the initial cohort of 1,000 Phase 1 beta testers while gathering critical feature-demand telemetry for the founder.

## Core Value

Convert high-intent Indian health seekers into 1,000 verified Phase 1 VIP beta testers via an atomic, frictionless registration and verification engine, while measuring feature demand to guide mobile app rollout.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Problem-First Cinematic Landing Page**: Engaging hero and narrative demonstrating why Western fitness apps fail in India (unrealistic calorie counting, lack of home-cooked/katori measurements, ignorance of festival fasting and family meals), transitioning into FitKarma's solution.
- [ ] **3D Rendered Mockups & Cinematic Visual Depth**: Floating 3D perspective device mockups with rim lighting, glass reflections, and interactive tilt, presenting FitKarma's interface with premium cinematic polish (clearly labeled illustrative previews).
- [ ] **Indian Cultural Nuance & Craft**: Deep Indian aesthetic touches including warm brass and turmeric gold accents (`#D6A84B`), subtle jaali/mandala geometric backdrop textures, Indian culinary portion units (katoris, rotis, tadka oil slider), and Hinglish conversational voice waveforms.
- [ ] **Product Moat Feature Showcase**: Interactive bento-grid highlighting WhatsApp voice/text logging in Hinglish, Indian nutrition (katori/tadka/roti and family recipe splitter), Daily Intelligence Package (DIP), offline-first privacy (SQLCipher & DPDP compliance), and Family Care.
- [ ] **Bilingual Localization (English & Hindi)**: Full parity across all UI strings, form states, error messages, and transactional emails in English (`/en`) and Hindi (`/hi`) with natural phrasing.
- [ ] **VIP Invitation Card Registration Experience**: High-conversion, mobile-optimized registration card emphasizing exclusivity of the 1,000 founder seats with a live remaining capacity indicator and zero friction (name, email, top feature priorities, optional platform & language).
- [ ] **Atomic Server-Side Seat Allocation**: Atomic Postgres RPC transaction (`claim_beta_seat`) strictly enforcing the 1,000 Phase 1 cap on verified emails, auto-diverting subsequent verified registrants to the Phase 2 waitlist with idempotent processing.
- [ ] **Passwordless Verification & Resend Pipeline**: Magic link / OTP email verification via Supabase Auth and Resend transactional email adapter with local development sink, rate limiting, and cooldown timers.
- [ ] **Admin Analytics & Feature Demand Heatmap**: Role-protected admin dashboard (MFA & allowlist) displaying real-time registration counts, capacity gauges, feature demand heatmaps (tracking which capabilities applicants want most), platform split, and auditable data export.
- [ ] **DPDP Act 2025 & Privacy Compliance**: Strict data minimization (no phone number, clinical data, or weight collected), explicit consent separation (essential beta notices vs optional updates), and audited cascading withdrawal/erasure.

### Out of Scope

- Mobile app client code modifications — the website is decoupled from the Flutter codebase; mobile architecture is untouched.
- Direct phone OTP, SMS, or WhatsApp registration notifications — beta communication is strictly email-only (Resend) for pre-launch.
- Public pricing, paid subscriptions, or payment gateways — commercial plans (Karma Pro / Razorpay) belong to the app launch phase.
- App store badges or fabricated launch dates — no false claims; statuses are strictly labeled as `In beta`, `Rolling out during beta`, or `Planned within the beta programme`.
- Fabricated social proof, testimonials, clinical claims, or fake app screenshots — all visuals must be clearly labeled illustrative previews.

## Context

- FitKarma is an India-first Health Operating System designed for Flutter/Dart, featuring local SQLCipher encryption, Supabase backend, and WhatsApp conversational logging.
- The pre-launch platform serves as the initial public touchpoint and market validation mechanism ahead of public app store deployment.
- Technical architecture adheres to Next.js App Router (TypeScript), Tailwind CSS, Supabase (Postgres with RLS, Auth, Edge Functions), and Resend.
- All pre-launch architectural and policy decisions (D-001 through D-029) are formally recorded in `docs/00_DECISION_REGISTER.md`.

## Constraints

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS, Supabase, Resend, Vercel — mandated by decision D-005.
- **Capacity**: Phase 1 cap is strictly 1,000 accepted registrations, enforced at the database transaction level — mandated by D-010.
- **Language**: English and Hindi from day one — mandated by D-006.
- **Data Minimization**: Strictly no phone numbers, health biometrics, diagnosis, or precise location collected on the website form — mandated by D-018 / DPDP Act 2025.
- **Security & Authorization**: Privileged operations (allocation, admin stats, exports) are strictly server-side with RLS; secret keys are never exposed to the client.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + Supabase + Resend | Fast edge delivery, atomic database transactions, server-side secrets isolation, and reliable email delivery | ✓ Good |
| Problem-First Hero Narrative | Directly addresses the frustration Indian users feel with Western fitness trackers to establish an immediate product hook | ✓ Good |
| VIP Founder Invitation Card UI | Creates high intent and urgency around the 1,000 Phase 1 founder spots with a live remaining counter | ✓ Good |
| Feature Demand Heatmap in Admin Hub | Empowers the founder to see exactly which mobile features (WhatsApp logging, Tadka slider, Family sharing) users desire most | ✓ Good |
| Fine Granularity (8–12 Phases) | Structured, incremental delivery allowing thorough verification and testing at each milestone | ✓ Good |

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
