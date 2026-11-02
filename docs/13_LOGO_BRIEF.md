# 13 — Approved Brand Identity and Asset System

## 1. Status

**APPROVED & INTEGRATED:** The official FitKarma vector brand identity suite is complete and stored in repository directory `FitKarma-Logo/`.

## 2. Core Identity & Color Tokens

- **Brand:** `FitKarma` (exact capitalization)
- **Primary Positioning:** `India's AI-powered Fitness and Wellness Ecosystem`
- **Visual Character:** Intelligent, grounded, premium, India-first, future-facing motion aesthetic.
- **Color Tokens:**
  - Deep Dark Canvas: `#0D0F12`
  - Emerald Green: `#36C96A` / `#16A34A`
  - Vibrant Karma Glow Accent: `#65C94B` / `#A3E635`
  - Premium Gold (Turmeric/Ayurveda Accent): `#D6A84B`
  - Light Surface: `#F8FAFC`

## 3. Approved Asset Inventory (`FitKarma-Logo/`)

The repository contains scalable vector (SVG) and raster (PNG) assets ready for web, mobile, and social cards:

| File | Type | Description / Usage |
|---|---|---|
| `svg/fitkarma-primary-dark.svg` | SVG | Horizontal logo with positioning line for dark backgrounds (navbar / footer). |
| `svg/fitkarma-primary-light.svg` | SVG | Horizontal logo with positioning line for light backgrounds. |
| `svg/fitkarma-wordmark-dark.svg` | SVG | Compact horizontal wordmark without tagline for condensed headers. |
| `svg/fitkarma-wordmark-light.svg` | SVG | Compact light wordmark. |
| `svg/fitkarma-mark.svg` | SVG | Standalone transparent running-figure symbol / favicon. |
| `svg/fitkarma-app-icon-dark.svg` | SVG | App launcher icon on dark background. |
| `svg/fitkarma-app-icon-light.svg` | SVG | App launcher icon on light background. |
| `svg/fitkarma-monochrome-*.svg` | SVG | Monochrome single-color variants for print or high-contrast stamps. |
| `png/...` | PNG | Corresponding raster assets for OpenGraph cards, web manifests, and previews. |

## 4. Implementation Guidelines

- In Next.js, copy or symlink assets from `FitKarma-Logo/svg/` into `public/brand/`.
- Use `fitkarma-mark.svg` as the primary favicon and browser icon in `app/icon.svg`.
- The floating dynamic glass pill navbar uses `fitkarma-wordmark-dark.svg` or `fitkarma-mark.svg` with dynamic hover glow.
- When generating the VIP Beta Pass card, embed `fitkarma-mark.svg` as a holographic watermark.

## 5. Trademark Clearance & Legal Verification Checklist

Before public launch or commercial marketing:
- **Similarity & Trademark Clearance:** Conduct formal trademark availability searches across Indian IP databases (Controller General of Patents, Designs and Trade Marks) for wordmark `FitKarma` and device mark in Classes 9 (computer software/apps) and 44 (health and wellness).
- **Distinctiveness Verification:** Ensure the stylized running-figure geometry does not conflict with existing registered athletic, healthcare, or consumer fitness trademarks.
- **Production Asset Hardening:** Convert all SVG text elements into outlined bezier vector paths so fonts do not rely on local system font rendering.
- **Final Owner Sign-Off:** The legal entity owner must sign off on the trademark filing strategy and final vector outlines.
