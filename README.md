# FitKarma — Pre-launch Website Specification

**Status:** Approved product direction; implementation-ready blueprint pending the open decisions in `docs/00_DECISION_REGISTER.md`.
**Document baseline:** 1.0 · **Prepared:** 30 October 2026
**Purpose:** Give Google Antigravity a durable, testable source of truth for building the FitKarma pre-launch website and Phase 1 beta-registration system.

## Approved brand and launch direction

- **Brand:** FitKarma
- **Positioning:** **India's AI-powered Fitness and Wellness Ecosystem**
- **Audience and market:** India-first; English and Hindi from launch
- **Visual direction:** Hybrid futuristic + cinematic product launch
- **Logo:** Not yet created; AI-assisted identity development is a separate brand task governed by `docs/13_LOGO_BRIEF.md`.
- **Domain:** Not purchased. Do not buy, transfer, configure billing for, or claim availability of a domain without owner approval.
- **Coding environment:** Google Antigravity
- **Website stack:** Next.js + TypeScript + Tailwind CSS + Supabase + Vercel (approved direction; exact supported versions are selected and recorded at implementation time).
- **Beta Phase 1 capacity:** 1,000 verified, accepted registrations; first-come, first-served.
- **After Phase 1 fills:** Continue accepting verified Phase 2 waitlist applications.
- **Communication channel:** Email only.
- **Beta feature commitment:** The full capability inventory in the FitKarma Master Documentation is intended to be available to beta participants through staged releases and progressive improvement. This does **not** authorize claims that every capability is live on the first public beta day. See `docs/02_REQUIREMENTS_AND_SCOPE.md`.

## Read this first

1. `AGENTS.md` — mandatory operating rules for Antigravity.
2. `docs/00_DECISION_REGISTER.md` — approved decisions, assumptions and open decisions.
3. `docs/01_PRODUCT_BRIEF.md` — product purpose and success metrics.
4. `docs/02_REQUIREMENTS_AND_SCOPE.md` — functional scope and product-feature truth rules.
5. `docs/03_SITEMAP_AND_COPY.md` — page structure and approved messaging.
6. `docs/04_DESIGN_SYSTEM.md` — visual and interaction system.
7. `docs/05_USER_FLOWS.md` — registration, verification, waitlist and admin flows.
8. `docs/06_TECHNICAL_ARCHITECTURE.md` and `docs/07_DATA_MODEL_AND_API.md` — system design and data contracts.
9. `docs/08_SECURITY_PRIVACY_AND_LEGAL.md` — privacy, security and legal review requirements.
10. `docs/09_CONTENT_SEO_AND_LOCALISATION.md` — bilingual content and discoverability.
11. `docs/10_TESTING_AND_ACCEPTANCE.md` — definition of done.
12. `docs/11_DEPLOYMENT_AND_OPERATIONS.md` — environments and operations.
13. `docs/12_IMPLEMENTATION_PLAN.md` — milestones and implementation sequence.
14. `docs/13_LOGO_BRIEF.md` and `docs/14_EMAIL_TEMPLATES.md` — brand and communication assets.
15. `antigravity/START_HERE_PROMPT.md` — initial prompt to paste into Antigravity.

## Source of truth and precedence

- The uploaded **FitKarma Master Documentation v1.0** is the source for app/product capability descriptions.
- The decisions in this website specification record the owner's website and beta-launch choices.
- Where the owner's explicit beta decision differs from the master document's former phase labels, this specification governs **website beta-program messaging and planning**. It does not silently rewrite the app architecture or technical roadmap.
- The decision register identifies all proposed details that still need owner approval.
- If two requirements conflict, stop, document the conflict and request a decision. Do not silently choose.

## Folder map

```text
FitKarma_Prelaunch_Website_Spec/
├── AGENTS.md
├── README.md
├── .env.example
├── .agents/rules/
│   ├── content-and-brand.md
│   ├── database-security.md
│   └── quality-gates.md
├── antigravity/
│   └── START_HERE_PROMPT.md
└── docs/
    ├── 00_DECISION_REGISTER.md
    ├── 01_PRODUCT_BRIEF.md
    ├── 02_REQUIREMENTS_AND_SCOPE.md
    ├── 03_SITEMAP_AND_COPY.md
    ├── 04_DESIGN_SYSTEM.md
    ├── 05_USER_FLOWS.md
    ├── 06_TECHNICAL_ARCHITECTURE.md
    ├── 07_DATA_MODEL_AND_API.md
    ├── 08_SECURITY_PRIVACY_AND_LEGAL.md
    ├── 09_CONTENT_SEO_AND_LOCALISATION.md
    ├── 10_TESTING_AND_ACCEPTANCE.md
    ├── 11_DEPLOYMENT_AND_OPERATIONS.md
    ├── 12_IMPLEMENTATION_PLAN.md
    ├── 13_LOGO_BRIEF.md
    └── 14_EMAIL_TEMPLATES.md
```

## What this package is not

This is a product and engineering blueprint, not a completed website, legal opinion, security audit, clinical validation, trademark clearance, domain purchase, or guarantee that third-party services are configured. Secrets, credentials, production data and external accounts must be supplied by the owner through secure channels and never committed to Git.
