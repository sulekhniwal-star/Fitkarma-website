# Project State: FitKarma Pre-Launch & VIP Beta Platform

## Project Overview

- **Project Name:** FitKarma Pre-Launch Marketing Website & VIP Beta Platform
- **Tagline:** India's AI-powered Fitness and Wellness Ecosystem
- **Initialized:** 2026-11-02
- **Current Milestone:** Milestone 1B / Phase 3 Preparation
- **Current Status:** Phase 2 Complete; Ready for Phase 3 (`/gsd-plan-phase 3`)

---

## Phase Progress

| Phase | Description | Status | Blockers | Notes |
|---|---|---|---|---|
| **Phase 1** | Foundation, Tooling & Locale Routing | **Complete** | None | Next.js App Router, Tailwind, i18n routing (`/en`, `/hi`), Zod env |
| **Phase 2** | Brand Identity, Tokens & Reusable UI Primitives | **Complete** | None | BrandLogo, Indian motifs (jaali/mandala/desi), 3D phone frame, Header, Footer |
| **Phase 3** | Cinematic Landing Page & Moat Storytelling | **Planned (3 Plans)** | None | Problem-solution, bento grid with 3D mockups, FAQ, SEO metadata |
| **Phase 3** | Cinematic Landing Page & Moat Storytelling | Pending | Phase 2 | Hero, problem-solution, bento grid, Hindi parity |
| **Phase 4** | Database Architecture & Atomic Seat Allocation | Pending | Phase 1 | Supabase migrations, RLS, atomic `claim_beta_seat` |
| **Phase 5** | Registration Form, Verification Flow & Email Pipeline | Pending | Phase 3, 4 | VIP card form, Resend adapter, confirmation callbacks |
| **Phase 6** | Role-Protected Admin Analytics Hub | Pending | Phase 4, 5 | MFA auth guard, capacity meter, feature heatmap |
| **Phase 7** | Privacy Compliance, Security & Operational Hardening | Pending | Phase 5, 6 | DPDP erasure ("Erase my existence"), integration tests |
| **Phase 8** | Production Verification & Controlled Launch Gates | Pending | Phase 7 | Registration gate flag, smoke checks, launch checklist |

---

## Active Configuration & Fences

- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS), Resend.
- **Language Support:** English (`/en`) and Hindi (`/hi`) from Day 1 with 100% string parity.
- **Visual & Cultural Direction:** Hybrid futuristic + cinematic product launch with 3D rendered perspective phone mockups (rim lighting, chamfered glass depth, interactive tilt) and purposeful Indian aesthetic touches (subtle jaali/mandala lattice patterns, warm brass/turmeric gold `#D6A84B` accents, and desi portion units: katoris, rotis, tadka oil slider). All mockups explicitly labeled *"Illustrative preview"*.
- **Capacity Limits:** Strictly 1,000 accepted Phase 1 applicants, enforced atomically in Postgres. Subsequent applicants diverted to Phase 2 waitlist.
- **Data Minimization:** No phone numbers, weights, medical diagnoses, or location collected on registration form.
- **Communication Channel:** Email only (Resend). No SMS, phone, or WhatsApp registration notifications.

---

## Decisions Logged

All core pre-launch architectural and policy decisions (D-001 through D-029) are formally approved and recorded in `docs/00_DECISION_REGISTER.md`.

---

## Next Action

Execute Phase 3:
```bash
/gsd-execute-phase 3
```

