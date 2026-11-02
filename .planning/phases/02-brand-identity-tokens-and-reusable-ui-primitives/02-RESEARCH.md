# Phase 2: Research & Technical Architecture
**Brand Identity, Tokens & Reusable UI Primitives**

## 1. Executive Summary & Objective

Phase 2 corresponds to **Milestone 1A (Brand foundation and design tokens)** defined in [`docs/12_IMPLEMENTATION_PLAN.md`](file:///f:/Fitkarma-website/docs/12_IMPLEMENTATION_PLAN.md).
The objective is to codify FitKarma's hybrid futuristic + cinematic visual design system, integrate the approved running-figure vector logo suite from `public/brand/`, engineer modern Indian cultural motifs (jaali/mandala subtle textures, brass/turmeric accents `#D6A84B`), build atomic UI primitives, and construct a lightweight, high-performance **3D perspective phone mockup primitive** (`PhoneMockup3D`).

---

## 2. Requirements & Traceability

| Requirement ID | Specification | Implementation Strategy |
|---|---|---|
| `LAND-01` | Hybrid futuristic + cinematic launch visual theme | Deep canvas `#0D0F12`, brand emerald `#65C94B`, vibrant green `#36C96A`, warm gold `#D6A84B`, dark glassmorphism, rim lighting. |
| `LAND-02` | Hero positioning: *"India's AI-powered Fitness and Wellness Ecosystem"* | Codified typography tokens, headline gradients, and brand wordmark lockups. |
| `LAND-07` | 3D Rendered Device Mockups with perspective depth | Hardware-accelerated CSS 3D transforms (`rotateX`, `rotateY`, `perspective(1200px)`), metallic bezel shadows, dynamic glass reflection, and mandatory *"Illustrative preview"* micro-badge. Respects `prefers-reduced-motion`. |
| `LAND-08` | Indian Cultural Aesthetics & Craft | Subtle ambient SVG patterns (Jaali lattice, sacred geometry mandala dot grid), authentic desi culinary icons (katori, thali, roti counter, tadka flame), and brass/turmeric gold gradient highlights. |
| `A11Y-01` | WCAG 2.1 Level AA Compliance | Contrast ratios >= 4.5:1 on `#0D0F12` canvas; visible focus rings (`:focus-visible`); semantic landmarks. |
| `A11Y-02` | Full keyboard navigation | Semantic HTML button/link primitives with explicit focus management. |
| `A11Y-03` | `prefers-reduced-motion` | 3D tilt and animation effects disabled when reduced motion is preferred. |

---

## 3. Visual System & Design Tokens

### 3.1 Color Palette
- **Canvas (Backgrounds):**
  - Base: `#0D0F12` (Deepest Obsidian)
  - Subtle: `#12161C` (Layer 1 cards and sections)
  - Elevated: `#181D25` (Modal dialogs and floating menus)
- **Brand Colors:**
  - Primary Accent: `#65C94B` (High-visibility CTA & energetic highlights)
  - Secondary Green: `#36C96A` (Gradient companion & success signals)
  - Dark Emerald: `#16A34A` (Gradient origin & deep shadow)
  - Indian Turmeric / Brass Gold: `#D6A84B` (Cultural accents, founder badges, premium touches)
  - Gold Light: `#F4D477` / Gold Deep: `#B98528` (Gold metallic gradient stops)
- **Card & Border Tokens:**
  - Card Fill: `rgba(21, 25, 33, 0.75)` (Glassmorphic translucent dark)
  - Card Border: `rgba(35, 41, 54, 0.8)` (Subtle metallic boundary)
  - Border Glow: `rgba(101, 201, 75, 0.2)` / `rgba(214, 168, 75, 0.2)`
- **Typography & Text Hierarchy:**
  - Text Primary: `#F3F4F6` (Contrast 15.6:1 against `#0D0F12`)
  - Text Muted: `#9BA3AF` (Contrast 7.2:1 against `#0D0F12`)
  - Text Subtle: `#6B7280` (Contrast 4.6:1 against `#0D0F12`)

---

## 4. Architectural Components to Build

### 4.1 BrandLogo (`src/components/ui/brand-logo.tsx`)
A flexible, responsive component utilizing the SVG files in `public/brand/`:
- `horizontal`: Full logo with running figure, "FitKarma" wordmark, and tagline ("INDIA'S AI-POWERED FITNESS AND WELLNESS ECOSYSTEM").
- `wordmark`: Compact "FitKarma" lockup for navigation bars.
- `mark`: Standalone running figure symbol with dynamic emerald/gold gradient.
- `icon`: Rounded app icon with dark background.

### 4.2 Indian Cultural Motifs (`src/components/ui/indian-motifs.tsx`)
- `JaaliPattern`: Subtle, low-opacity (4–6%) geometric lattice SVG backdrop that gives a distinct, sophisticated Indian architecture feel without visual clutter.
- `MandalaGlow`: Radial dot-grid geometric aura centered behind hero devices.
- `DesiIcons`: Vector icons for Katori, Roti Counter, Tadka Sizzle Flame, and Brass Thali.

### 4.3 3D Perspective Device Mockup (`src/components/ui/phone-mockup-3d.tsx`)
- **Structure:**
  - Outer perspective container with `preserve-3d`.
  - Realistic smartphone chassis (titanium chamfer edge, dynamic island / camera punch-hole, screen bezels).
  - Screen layer with subtle glass sheen gradient overlay.
  - Interactive mouse tilt effect via CSS custom properties `--rx` and `--ry` (with instant flatten under reduced motion).
  - Fixed compliance micro-badge: *"Illustrative preview — UI subject to evolution"*.

### 4.4 Atomic Primitives
- `Button` (`src/components/ui/button.tsx`): Variants for `glow` (primary green glow), `gold` (brass founder CTA), `outline` (glass border), `ghost`.
- `Card` (`src/components/ui/card.tsx`): Glassmorphism card container with hover border lighting and optional Indian motif watermark.
- `Badge` (`src/components/ui/badge.tsx`): Verified rollout status tags (`In beta`, `Rolling out during beta`, `Planned within the beta programme`).
- `Input` (`src/components/ui/input.tsx`): Dark glass input field with accessible label and focus ring.

### 4.5 Navigation Shell
- `Header` (`src/components/layout/header.tsx`): Sticky frosted glass bar with `BrandLogo`, nav links, locale switch, and Beta CTA.
- `Footer` (`src/components/layout/footer.tsx`): Clean multi-column footer with official contact (`sulekhniwal@gmail.com`), sitemap links, and copyright.

---

## 5. Execution Waves

- **Wave 1:** Plan 02-01 — Design Tokens, Indian Cultural Motifs & Brand Logo Component.
- **Wave 2:** Plan 02-02 — Atomic UI Primitives & 3D Perspective Phone Mockup Component.
- **Wave 3:** Plan 02-03 — Navigation Shell (Header, Footer) & Component Showcase Verification.
