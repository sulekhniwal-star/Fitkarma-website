# 04 — UI/UX Design System

## 1. Design character

**Approved direction:** Hybrid futuristic + cinematic product launch.

The site should feel like a premium technology product launch, but approachable and human enough for everyday Indian health and wellness. Avoid a generic hospital website, bodybuilding/gym template, crypto dashboard or over-decorated neon gaming aesthetic.

## 2. Foundation

- Primary canvas inherited from FitKarma master direction: `#0D0F12` (approved source value).
- Use layered near-black/charcoal surfaces for depth.
- Suggested accent `#B7F36B` (PROPOSED; owner must approve after logo exploration).
- Supporting highlight `#64DCCB` and warm neutral `#E5B878` are optional proposed accents; use sparingly.
- Text: warm white for primary; muted slate/grey for secondary; never reduce contrast to achieve a “premium” look.
- Avoid using accent colour for large paragraphs or every control.

## 3. Typography

- Use one strong display face and one highly readable body face, with sensible system fallbacks.
- Proposed direction: Manrope or Geist for headings and Inter or Geist for body; choose one pairing after checking Hindi glyph quality, performance and licensing.
- Hindi font must render Devanagari cleanly with correct matras and line-height. Test both scripts in the actual selected font before locking it.
- Use fluid responsive type scales; do not let huge cinematic headings break on mobile.

## 4. Layout and components

- Spacious editorial composition with a clear grid.
- Bento cards for grouped features; not every section needs a card.
- Glass effects are accents, not a blanket treatment. Maintain readable contrast and restrained blur.
- Use rounded corners consistently; avoid excessive pill shapes.
- Strong whitespace and clear CTA hierarchy.
- Sticky navigation is acceptable if it does not hide content or consume too much mobile viewport.
- Product visuals should use believable app/device compositions. Until real app screenshots are supplied, use explicitly illustrative concept screens; do not fabricate real product states or claim screens are live.

## 5. Cinematic elements

- Hero may use a controlled gradient horizon, abstract orbit/energy motif, health-data-inspired linework or layered smartphone/product render.
- Use scroll reveal, depth and parallax only where they improve comprehension.
- Add spring-like micro-interactions to buttons/cards only if they remain subtle and performant.
- No forced video autoplay with sound.
- Motion must respect `prefers-reduced-motion`; provide static alternatives.
- No animation may block CTA interaction, page reading, screen-reader access or page performance.

## 6. Imagery and brand

- Do not use stock imagery that implies an actual FitKarma customer, clinician, medical result or partnership.
- Prefer custom AI-generated abstract brand visuals, carefully directed Indian food imagery, and product device mockups.
- Never depict an unverified app screen as a real screenshot. Add an “Illustrative preview” label when appropriate.
- Keep photography inclusive and culturally grounded without stereotypes.
- Logo and brand symbol are not yet approved; reserve space for a flexible wordmark and symbol. Follow `13_LOGO_BRIEF.md`.

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
