# Phase 1: Research & Technical Architecture
**Foundation, Tooling & Locale Routing**

## 1. Executive Summary & Objective

Phase 1 corresponds to **Milestone 0 (Repository and Readiness)** defined in [`docs/12_IMPLEMENTATION_PLAN.md`](file:///f:/Fitkarma-website/docs/12_IMPLEMENTATION_PLAN.md).
The goal is to create a deterministic, type-safe foundation before visual and database feature work begins.
The application will be built using Next.js 15 App Router, TypeScript, Tailwind CSS, and pnpm, featuring:
- Path-based bilingual locale routing (`/en` and `/hi`).
- Zod-based runtime validation for all environment variables (`src/lib/env.ts`).
- `.env.example` with clear placeholders and zero committed secrets.
- Baseline scripts for build, lint, type-check, and smoke testing.

---

## 2. Requirements & Traceability

| Requirement ID | Specification | Implementation Strategy |
|---|---|---|
| `ARCH-01` | Next.js App Router + TypeScript + Tailwind CSS | Next.js 15.1.x with App Router, TypeScript 5.7.x, Tailwind CSS 3.4.x, React 19. |
| `ARCH-02` | Decoupled from Flutter client code | Independent web application consuming only shared contracts and content. |
| `ARCH-04` | Strict environment schema validation at boot | `src/lib/env.ts` validating public and server-side environment variables using Zod. |
| `I18N-01` | Subpath-based locale routing (`/en`, `/hi`) | Edge-compatible Next.js `middleware.ts` detecting locale, setting `x-fitkarma-locale` header, and redirecting non-prefixed paths. |
| `I18N-02` | Translation message catalogs | Type-safe JSON message bundles in `src/messages/en.json` and `src/messages/hi.json` with fallback loading. |

---

## 3. Architecture & Design Decisions

### 3.1 Next.js App Router Structure
```
src/
├── app/
│   ├── layout.tsx              # Root HTML wrapper (lang attribute dynamic or root shell)
│   ├── page.tsx                # Root redirect to /[locale]
│   ├── not-found.tsx           # Fallback 404
│   ├── globals.css             # Tailwind base and root tokens
│   └── [locale]/
│       ├── layout.tsx          # Localized layout providing metadata, font, language context
│       └── page.tsx            # Temporary smoke test landing page
├── i18n/
│   ├── config.ts               # Supported locales ('en', 'hi'), default ('en'), helper predicates
│   └── get-messages.ts         # Server-side message reader with deep property resolution
├── lib/
│   └── env.ts                  # Zod validation schema for client and server environment variables
└── messages/
    ├── en.json                 # English core message strings
    └── hi.json                 # Hindi core message strings
```

### 3.2 Environment Variable Fencing (`src/lib/env.ts`)
Must validate:
- `NEXT_PUBLIC_APP_URL`: Base marketing URL (defaults to `http://localhost:3000`).
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key.
- `SUPABASE_SERVICE_ROLE_KEY`: Privileged server-only key.
- `RESEND_API_KEY`: Transactional email API key (optional when dev sink active).
- `EMAIL_DEV_SINK`: Boolean flag (`true` in dev/test to route transactional emails to stdout/local sink).
- `ADMIN_EMAIL_ALLOWLIST`: Comma-separated admin email list.
- `BETA_REGISTRATION_PAUSED`: Boolean gate flag to pause new registrations.

### 3.3 Locale Routing Strategy (`src/middleware.ts`)
- Edge middleware intercepts incoming requests.
- Static assets (`_next`, `favicon.ico`, `brand/`, `icons/`, `robots.txt`, `sitemap.xml`) and API routes (`/api/*`, `/auth/*`) are excluded via matcher regex.
- If pathname starts with `/en` or `/hi`, it attaches `x-fitkarma-locale` header and passes through.
- If pathname lacks a locale prefix, redirects immediately to `/${DEFAULT_LOCALE}${pathname}` (preserving query parameters).

---

## 4. Dependencies & Pinned Versions

- `next`: `^15.1.7`
- `react`: `^19.0.0`
- `react-dom`: `^19.0.0`
- `tailwindcss`: `^3.4.17`
- `postcss`: `^8.5.1`
- `autoprefixer`: `^10.4.20`
- `typescript`: `^5.7.3`
- `zod`: `^4.6.6` (or `^3.24.2`)
- `@supabase/supabase-js`: `^2.118.0`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^3.0.1`
- `lucide-react`: `^0.475.0`

---

## 5. Risk Assessment & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Missing `.env.local` blocks build during CI | High | `src/lib/env.ts` provides safe fallbacks for non-secret vars in development and tests. |
| Middleware infinite redirect loops | Medium | Strict matcher regex excluding static assets and explicit prefix check before redirecting. |
| Untranslated keys or locale mismatch | Medium | Type-safe dictionary accessor with fallback to English if a key is absent in Hindi. |

---

## 6. Execution Waves

- **Wave 1:** Plan 01-01 — Project Scaffold, Tooling, Environment Schema & Dependencies.
- **Wave 2:** Plan 01-02 — Subpath Locale Routing, i18n Dictionary Engine & Base Layouts.
- **Wave 3:** Plan 01-03 — Type-Check, Build Verification & Quality Gate Sign-Off.

