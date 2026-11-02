# 04 — UI/UX Design System

## 1. Design character

**Approved direction:** Premium Dark Mode (Linear / Apple style) with subtle obsidian gradients, glowing accents, WebGL / Canvas interactive background with dynamic cursor effects, sleek animations, and crisp typography.

The site is designed to feel like a world-class technology launch—punchy, sleek, and high-performance, while remaining culturally authentic, warm, and approachable for everyday Indian wellness. It avoids dry corporate templates, plain text grids, bodybuilding tropes, or gaudy neon overload.

## 2. Foundation & Color Palette

- **Primary canvas:** `#0D0F12` (deep obsidian).
- **Surface elevations:**
  - `surface-1`: `#14171C` (base cards)
  - `surface-2`: `#1A1E24` (elevated bento cards, modals)
  - `surface-3`: `#222730` (hover states, active controls)
- **Brand Accents:**
  - `accent-green` (Life/Vitality): `#36C96A`
  - `accent-glow` (Vibrant Karma Glow): `#65C94B`
  - `accent-gold` (Warm Turmeric/Ayurvedic nuances): `#D6A84B`
- **Text hierarchy:**
  - Primary: `#F9FAFB` (crisp white)
  - Secondary: `#9CA3AF` (muted slate)
  - Tertiary: `#6B7280` (subtle captions)
- **Glassmorphism & Borders:**
  - Default borders: `1px solid rgba(255, 255, 255, 0.08)`
  - Active / hover borders: `1px solid rgba(101, 201, 75, 0.35)` with subtle drop shadow glow (`0 0 20px rgba(101, 201, 75, 0.15)`).

## 3. Motion, 3D, and Interactive Graphics Stack

- **Smooth Momentum Scrolling:** Powered by **Lenis** (`lenis`) for buttery smooth viewport scrolling across all routes.
- **3D & WebGL Canvas Background:** Built with **React Three Fiber (R3F)**, **@react-three/drei**, and **postprocessing**. Renders an ambient, dynamic energy grid / particle field that gently reacts to pointer/cursor movements and scroll velocity.
- **Micro-Interactions & UI Transitions:** Powered by **Motion** (`framer-motion` / `motion`) for layout transitions, stagger entrances, interactive bento card tilt, magnetic buttons, and glowing border highlights.
- **Scroll Choreography:** **GSAP + ScrollTrigger** for pinned multi-step product walkthroughs, split-text headline reveals, and horizontal card sequences.
- **Interactive Product Mockups:**
  - Interactive Indian Food Logger widget (slider for roti count, katori portion selector, tadka oil slider).
  - Live Daily Intelligence Package (DIP) simulator showcasing personalized daily health insights.
  - Interactive AI Photo Food Scanner simulator with confidence indicators.

## 4. Typography

- **Headings & Display:** `Geist` or `Manrope` (bold, tight tracking, crisp modern geometric feel).
- **Body & Captions:** `Geist` or `Inter` (optimal legibility, balanced line heights).
- **Hindi (Devanagari):** High-fidelity Google font pairing (such as `Noto Sans Devanagari` or `Rozha One / Poppins`) ensuring accurate matras and conjuncts.
- Fluid responsive typography with `clamp()` to scale gracefully from mobile to 4K displays.

## 5. Brand Identity Assets

The brand system is fully integrated from the approved asset library in `FitKarma-Logo/`:
- Mark: `FitKarma-Logo/svg/fitkarma-mark.svg`
- Primary Dark: `FitKarma-Logo/svg/fitkarma-primary-dark.svg`
- Wordmark Dark: `FitKarma-Logo/svg/fitkarma-wordmark-dark.svg`
- App Icon Dark: `FitKarma-Logo/svg/fitkarma-app-icon-dark.svg`

## 7. Responsive behaviour

- Mobile-first; ensure the registration form is frictionless on a narrow device.
- Primary CTA must be visible without requiring precision hover.
- Bento grid collapses to a clear single-column card flow.
- Avoid horizontal overflow, tiny legal text, inaccessible carousels and giant sticky overlays.
- Test widths around 320, 360, 390, 768, 1024, 1280 and 1440 CSS pixels.

## 8. Accessibility requirements

- Semantic HTML and landmarks.
- Logical heading hierarchy.
- Keyboard-accessible navigation, menus, dialog and forms.
- Persistent visible focus indicators.
- Sufficient text and control contrast.
- Form fields with programmatic labels, instructions and errors.
- Status announcements for form submission and verification states.
- Meaningful alt text; decorative assets use empty alt.
- Reduced-motion mode.
- Do not rely on colour alone for statuses.
- Target WCAG 2.2 AA as the engineering acceptance target; report any known exceptions rather than claiming certification.

## 9. Design tokens

Store tokens centrally (CSS variables/Tailwind theme). Do not duplicate hex values through components. Token set should include:

- `color.canvas`, `color.surface.1`, `color.surface.2`, `color.text.primary`, `color.text.secondary`, `color.accent.primary`, `color.accent.secondary`, `color.border`, `color.success`, `color.warning`, `color.error`
- spacing scale, radius scale, shadow/elevation scale, type scale, max content width, breakpoints, motion duration/easing

Accent tokens are provisional until owner approves logo and palette.
