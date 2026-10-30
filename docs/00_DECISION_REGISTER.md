# 00 — Decision Register

**Status labels:** `APPROVED` = explicitly selected by the owner; `PROPOSED` = recommended default, not yet explicitly approved; `OPEN` = requires a decision or external input.

## Approved decisions

| ID | Decision | Status / implementation consequence |
|---|---|---|
| D-001 | Brand is FitKarma | APPROVED; exact spelling everywhere. |
| D-002 | Primary positioning: “India's AI-powered Fitness and Wellness Ecosystem” | APPROVED; use in hero/metadata. |
| D-003 | No domain purchased yet | APPROVED fact; use a preview/Vercel URL in development; do not buy or configure DNS without permission. |
| D-004 | Coding environment is Google Antigravity | APPROVED; provide root `AGENTS.md` and modular `.agents/rules/`. |
| D-005 | Website stack: Next.js + TypeScript + Tailwind CSS + Supabase + Vercel | APPROVED direction; pin versions only after compatibility check and record them. |
| D-006 | English and Hindi at launch | APPROVED; no English-only launch. |
| D-007 | Visual approach mixes hybrid futuristic and cinematic product-launch design | APPROVED. |
| D-008 | Logo does not exist yet; it will be created using AI | APPROVED intent; brief in `13_LOGO_BRIEF.md`; final mark requires owner selection and vector cleanup. |
| D-009 | Full feature inventory in FitKarma Master Documentation is intended for beta testers | APPROVED; delivered progressively, not necessarily all active on day one. Do not silently remove formerly P1/P2/P3/deferred capabilities from the beta-program inventory. |
| D-010 | Phase 1 has at most 1,000 places | APPROVED; capacity enforced server-side and in the database. |
| D-011 | Phase 1 allocation is first-come, first-served | APPROVED; ordering is by successful email verification and atomic allocation. |
| D-012 | Continue taking applications after Phase 1 fills, into Phase 2 waitlist | APPROVED. |
| D-013 | Phase 1 registrants should receive the Phase 2 link when Phase 2 opens | APPROVED; send an email with the approved Phase 2 application/waitlist link. |
| D-014 | Collect the feature a person needs most from the features being developed | APPROVED; collect multi-select choices (e.g. top 3) plus optional “Other” text (per owner decision O-012). |
| D-015 | Beta communication is email only | APPROVED; do not build SMS, phone or WhatsApp communications. |
| D-016 | Domain & Hosting Strategy | APPROVED (formerly O-001); use Vercel preview URL for development/staging; assign custom domain before production launch in Milestone 4/5. |
| D-017 | Brand Logo & Design Tokens | APPROVED (formerly O-002); approved existing vector identity suite in `public/brand/` (`fitkarma-mark.svg`, `fitkarma-primary-dark.svg`, etc.) and brand tokens (#0D0F12 canvas, #65C94B accent, #36C96A green, #D6A84B gold). |
| D-018 | Legal Entity & Contact | APPROVED (formerly O-003); use standard development placeholders ("FitKarma Technologies Private Limited", Bangalore) for dev, supply real entity details before public release in Milestone 4. |
| D-019 | DPDP 2025 Terms & Notice | APPROVED (formerly O-004); implement drafted privacy notice and terms with strict version tracking and un-ticked marketing consent, flagging for final legal review in Milestone 4. |
| D-020 | Transactional Email Provider | APPROVED (formerly O-005); select **Resend** as production transactional email provider; implement adapter supporting Resend SDK and local test sink. |
| D-021 | Admin Dashboard Authorization | APPROVED (formerly O-006); enforce `ADMIN_EMAIL_ALLOWLIST` via Supabase Auth + MFA; restrict exports to owner/admin and record audit log. |
| D-022 | Feature Rollout Status Management | APPROVED (formerly O-007); centralize feature statuses in typed `src/config/features.ts` using 3 approved labels (`In beta`, `Rolling out during beta`, `Planned within the beta programme`). |
| D-023 | Beta Access Onboarding Date Claims | APPROVED (formerly O-008); date-neutral messaging in Phase 1 accepted emails; confirm seat without promising calendar date; notify users via email when access opens. |
| D-024 | Privacy-Friendly Analytics | APPROVED (formerly O-009); use privacy-friendly analytics (e.g. Plausible or PostHog) with explicit consent banner; zero PII in event payloads. |
| D-025 | Hindi Localisation & Review | APPROVED (formerly O-010); implement natural Hindi translations in `messages/hi.json` immediately; schedule native editor verification for Milestone 4. |
| D-026 | Support Email Address | APPROVED (formerly O-011); official support contact email is `sulekhniwal@gmail.com`. |
| D-027 | Feature Priority Selection Format | APPROVED (formerly O-012); multi-select (choose multiple features, e.g. top 3) + optional "Other" text. |
| D-028 | FIFO Allocation Clock | APPROVED (formerly O-013); ordered strictly by successful email verification timestamp; seats allocated atomically upon verification. |
| D-029 | Seat Reallocation on Withdrawal | APPROVED; auto-promote waitlist: when a Phase 1 user withdraws or requests deletion, automatically promote the earliest verified Phase 2 waitlist applicant into Phase 1 accepted. |

## Proposed defaults for implementation

| ID | Proposal | Why / owner action |
|---|---|---|
| P-001 | Registration fields: name, email, feature priorities (multi-select), optional platform and language preference | Data-minimising form aligned with D-027. |
| P-002 | No phone number, city, health metrics or medical information on the public beta form | Approved in product truth. |
| P-003 | Email magic link for verification | Low-friction passwordless verification via Supabase Auth. |
| P-004 | First 1,000 successfully verified applicants become `phase1_accepted`; later verified applicants become `phase2_waitlist` | Aligned with D-010 and D-028. |
| P-005 | English default with explicit language switch; locale paths `/en` and `/hi` | Predictable URLs and indexable language pages. |
| P-006 | Use Resend behind an adapter with local fallback | Aligned with D-020. |
| P-007 | Use honeypot and server-side rate limits | Reduce automated abuse. |
| P-008 | Privacy notice acknowledgement & beta terms acceptance; optional promotional consent separate | Aligned with D-019. |
| P-009 | Admin console protected by Supabase Auth, allowlisted roles and MFA | Aligned with D-021. |
| P-010 | Website initially hosted on Vercel preview URL | Aligned with D-016. |

## Open decisions before production

*(All initial pre-launch architecture and policy decisions have been resolved and approved by the owner as of 30 October 2026. Pre-production operational items to finalize in Milestone 4/5: final legal entity registration review, native Hindi editorial pass, custom domain purchase/DNS).*

## Decision-change procedure

1. Record the decision ID, old value, new value, date and owner approval.
2. Identify affected documents, code, schema, tests and public copy.
3. Update this register before implementation.
4. Add an ADR for material architecture/data/security changes.
5. Never let an AI agent change an approved decision because it appears convenient.
