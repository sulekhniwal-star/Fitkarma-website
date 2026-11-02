# Phase 3: Research & Technical Architecture
**Cinematic Landing Page & Moat Storytelling**

## 1. Executive Summary & Objective

Phase 3 corresponds to **Milestone 1B (Brand foundation and landing page)** in [`docs/12_IMPLEMENTATION_PLAN.md`](file:///f:/Fitkarma-website/docs/12_IMPLEMENTATION_PLAN.md).
The goal is to deliver a cinematic, problem-first marketing homepage that:
- Establishes FitKarma's approved positioning: *"India's AI-powered Fitness and Wellness Ecosystem"*.
- Demonstrates why Western calorie-counters fail in India (rigid grams, foreign dishes, solitary tracking).
- Highlights FitKarma's core differentiators (WhatsApp Hinglish logging, Indian nutrition intelligence, DIP, SQLCipher offline vault, Family Care).
- Employs interactive 3D perspective phone frames with dynamic rim lighting.
- Uses disciplined rollout labels (`In beta`, `Rolling out during beta`, `Planned within the beta programme`) with zero invented claims.
- Provides 100% bilingual parity in English (`/en`) and Hindi (`/hi`).

---

## 2. Requirements & Traceability

| Requirement ID | Specification | Implementation Strategy |
|---|---|---|
| `LAND-02` | Hero positioning: *"India's AI-powered Fitness and Wellness Ecosystem"* | High-contrast headline, eyebrow badge, VIP founder CTA, and live capacity badge. |
| `LAND-03` | Problem-Solution narrative | Section contrasting Western friction (unrealistic calories, kitchen scales) with FitKarma's India-native design (katori, roti, tadka slider, family meals). |
| `LAND-04` | Bento Grid showcasing core moats | Interactive bento cards with 3D depth highlighting WhatsApp Hinglish logging, Indian nutrition, DIP, SQLCipher offline vault, and Family Care. |
| `LAND-05` | Rollout status labels | Typed status registry (`src/config/features.ts`) strictly using `In beta`, `Rolling out during beta`, or `Planned within the beta programme`. Zero claims of unvalidated live features. |
| `LAND-06` | Trust strip, How It Works, FAQ accordion, footer | Credibility markers, 3-step registration walkthrough, accessible FAQ disclosure accordion, and footer with legal and contact links (`sulekhniwal@gmail.com`). |
| `LAND-07` | 3D Rendered Device Mockups with depth | `PhoneMockup3D` primitive utilized in Hero and Bento Grid with realistic metallic bezel, dynamic sheen, interactive tilt, and permanent *"Illustrative preview"* micro-badge. |
| `LAND-08` | Indian Cultural Aesthetics & Craft | Warm brass/turmeric accents (`#D6A84B`), subtle jaali/mandala lattice ambient textures, desi portion units (katoris, rotis, tadka oil slider), and Hinglish audio waveforms. |
| `I18N-03` | SEO alternate hreflang tags | Canonical tags and alternate language tags in Next.js metadata. |
| `PERF-01` | Core Web Vitals targets | LCP < 2.0s, CLS < 0.05, INP < 100ms via static rendering (SSG), lightweight SVGs, and zero heavy external 3D libraries. |
| `PERF-02` | Static asset optimization | Next.js Image optimization, WebP/SVG vector graphics, and CSS hardware-accelerated transforms. |

---

## 3. Component Architecture & Section Hierarchy

```
src/
├── config/
│   └── features.ts              # Typed catalog of capabilities with approved rollout labels
├── components/
│   └── marketing/
│       ├── hero-section.tsx             # Cinematic hero with 3D device mockup
│       ├── trust-strip.tsx              # 4 key credibility pillars
│       ├── problem-solution-section.tsx # Western trackers vs FitKarma India-native
│       ├── feature-bento-grid.tsx       # 6 bento cards with 3D perspective frames
│       ├── nutrition-showcase.tsx       # Interactive katori/roti/tadka visualizer
│       ├── how-it-works-section.tsx     # 3-step verification roadmap
│       └── faq-accordion.tsx            # Accessible disclosure accordion (10 questions)
└── app/
    ├── sitemap.ts               # XML sitemap generator with bilingual paths
    └── robots.ts                # Search crawler instructions
```

---

## 4. Feature Status Governance (`src/config/features.ts`)

Per `docs/00_DECISION_REGISTER.md` (D-022) and `docs/02_REQUIREMENTS_AND_SCOPE.md`, capabilities are strictly categorized into 3 states:
- `in_beta`: Available to Phase 1 beta cohort (e.g. Indian food database, katori measures, basic logging).
- `rolling_out`: Scheduled for staged release during beta (e.g. WhatsApp Hinglish voice logging, Daily Intelligence Package, offline sync).
- `planned`: Planned within the beta programme roadmap (e.g. Health Connect/Apple Health sync, Family Care Dashboard, Cycle-aware training).

---

## 5. Execution Waves

- **Wave 1:** Plan 03-01 — Narrative Storytelling, Problem-Solution, Nutrition Showcase & Feature Registry.
- **Wave 2:** Plan 03-02 — Feature Bento Grid with 3D Depth, How It Works & FAQ Accordion.
- **Wave 3:** Plan 03-03 — Homepage Integration, SEO Metadata (`sitemap.ts`, `robots.ts`) & Quality Verification.
