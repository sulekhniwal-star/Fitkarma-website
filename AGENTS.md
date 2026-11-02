<!-- GSD:project-start source:PROJECT.md -->
## Project

**FitKarma Pre-Launch Website & Beta Ecosystem**

The official pre-launch web platform for **FitKarma** — India's AI-powered Fitness and Wellness Ecosystem. It introduces the product vision to Indian users, demonstrates core differentiators through interactive simulators (Indian Meal Sandbox with roti/katori sliders, Daily Intelligence Package preview, AI food scanner), and orchestrates a high-converting, strictly capped 1,000-seat VIP Beta Pass onboarding flow with automatic Phase 2 waitlist transitions and an MFA-protected admin console.

**Core Value:** Deliver an immersive, culturally attuned pre-launch experience that authentically communicates FitKarma's India-first health intelligence while atomically managing the 1,000-seat VIP Beta cohort with high-trust social verification assets.

### Constraints

- **Tech Stack**: Next.js App Router, TypeScript, Tailwind CSS, Supabase (Postgres & Auth), Resend, next-intl.
- **Data Security & Privacy**: Digital Personal Data Protection (DPDP) Act compliance, strict data minimization (no phone numbers or sensitive medical metrics on public forms), allowlisted admin access with MFA.
- **Capacity**: Hard database-enforced atomic allocation ensuring Phase 1 never exceeds 1,000 accepted registrations under race conditions.
- **Language**: English and Hindi coverage required for all visible UI strings, email templates, and error states.
- **Performance**: High visual fidelity with automatic hardware/FPS detection scaling particle count, falling back smoothly to lightweight CSS glowing gradient on lower-end devices.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x / 16 (App Router) | Full-stack React framework | Industry standard for Server Components, SSR/SSG caching, edge route handlers, and SEO-friendly multi-language subpath routing. |
| React | 19.x | UI library | Core foundation for modern concurrent rendering, Server Actions, and transitions. |
| TypeScript | 5.7+ | Type safety & developer experience | Enforces strict schemas across database entities, API contracts, translation dictionaries, and props. |
| Tailwind CSS | 4.x | Utility-first styling | Rapid design token integration, dark mode styling, and minimal CSS bundle footprint. |
| Supabase | v2 | PostgreSQL database & Authentication | Managed PostgreSQL with row-level security (RLS), atomic transactions for seat allocations, and MFA-protected admin auth. |
| Resend | Latest SDK | Transactional Email Dispatch | High deliverability to Indian email providers, clean React Email templating, and reliable webhooks. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-intl | 3.x+ | Internationalization (i18n) | Subpath routing (`/en`, `/hi`), type-safe JSON translation keys, server-component friendly. |
| Framer Motion | 12.x | UI animations & micro-interactions | Page transitions, bento card hover physics, and interactive simulator slider dynamics. |
| Three.js / @react-three/fiber | Latest | 3D WebGL Canvas | Floating 'Karma Ring' visual metaphor with cursor physics and luminous particle torus. |
| @react-three/drei | Latest | Three.js helpers | Shader management, canvas utilities, and GPU capabilities probing. |
| html2canvas / satori | Latest | VIP Beta Pass Card generation | Client-side/server-side rendering of dynamic VIP Beta Pass cards for download and sharing. |
| Zod | 3.x | Schema validation | Validating form inputs, API payloads, and environment variables. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| Biome / ESLint & Prettier | Code linting and formatting | Consistent styling and static quality checks. |
| Vitest | Fast unit testing | Testing business logic, validation schemas, and atomic counter math. |
| Playwright | End-to-end testing | Verifying form submission, double opt-in, VIP pass download, and admin console flows. |
## Installation
# Core framework and database
# Motion & 3D WebGL
# Pass generation and UI utilities
# Dev dependencies
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js App Router | Vite + React SPA | Only for purely client-side dashboards; fails on SEO, OpenGraph metadata, and server actions. |
| Supabase | PlanetScale / Neon | Good alternatives, but Supabase provides integrated Auth, MFA, and Postgres RLS out of the box. |
| Resend | SendGrid / AWS SES | AWS SES is cheaper at massive scale (millions/day), but Resend provides far superior developer experience and template ergonomics. |
| Three.js / R3F | Spline | Spline is quicker for 3D designers, but R3F gives full programmatic control over cursor physics and particle count scaling. |
## What NOT to Use
| Technology | Why Avoid | What to Use Instead |
|------------|-----------|---------------------|
| Plain CSS / CSS Modules | Slower developer velocity and fragmented token management | Tailwind CSS with brand token extensions |
| Third-party heavy CMS (WordPress, Strapi) | Overkill for a pre-launch platform with fixed marketing copy | Git-backed markdown or typed JSON dictionaries |
| Unverified SMS OTP APIs | High failure rates in India (DLT scrubbing, carrier timeouts) | Passwordless magic link / OTP via email (Resend) |
| Heavy unoptimized 3D GLTF models | 20MB+ downloads kill Tier-2/Tier-3 mobile user experience | Procedural particle torus with shader-driven glow and CSS fallback |
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| ponytail | > Lazy senior dev mode: the smallest change that fully solves the task, and a reply a busy human understands in one read. Use on any coding task (writing, fixing, refactoring, reviewing, choosing dependencies) and when the user says "ponytail", "be lazy", "simplest solution", "yagni", or complains about over-engineering or bloat. Levels: lite, full (default), ultra. | `.agents/skills/ponytail/SKILL.md` |
| ponytail-audit | > Quality audit of a whole repo: bugs, security holes, what breaks under real load, risky code without tests, slow paths, and what to delete, merge or split. Ranked, each finding explained in plain English. One-shot report, changes nothing. Use for "audit this codebase", "review the whole repo", "find bloat", "what can I delete", /ponytail-audit. | `.agents/skills/ponytail-audit/SKILL.md` |
| ponytail-debt | > List every `shortcut:` comment (and older `ponytail:` ones) as a debt ledger. One-shot report, changes nothing. Use for "ponytail debt", "what did ponytail defer", "list the shortcuts", /ponytail-debt. | `.agents/skills/ponytail-debt/SKILL.md` |
| ponytail-gain | > Show ponytail's measured savings (code, cost, speed) from the benchmark. One-shot display. Use for /ponytail-gain, "what does ponytail save", "ponytail impact". | `.agents/skills/ponytail-gain/SKILL.md` |
| ponytail-help | > Quick reference for ponytail levels, skills and commands. One-shot display. Use for /ponytail-help, "ponytail help", "how do I use ponytail". | `.agents/skills/ponytail-help/SKILL.md` |
| ponytail-review | > Quality review of a change: is the logic right, is it safe, does it hold under real load, is risky code tested, is it fast enough, and is every line needed. Reads the connected code, not only the diff. Each finding is explained in plain English. Use for "review this", "code review", "review the last commit", "review my PR", "is this over-engineered", /ponytail-review. | `.agents/skills/ponytail-review/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
