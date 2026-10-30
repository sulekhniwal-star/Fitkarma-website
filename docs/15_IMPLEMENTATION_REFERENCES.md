# 15 — Official Implementation References

**Research checked:** 30 October 2026. Re-check official documentation at implementation time because product APIs and legal commencement schedules can change.

## Google Antigravity

- Rules and workspace instructions: https://antigravity.google/docs/rules/
- Agent settings and execution permissions: https://antigravity.google/docs/agent-settings

The current Antigravity documentation describes root-level `AGENTS.md`/`GEMINI.md` workspace rules and modular `.agents/rules/*.md` files with `always_on`, `model_decision`, `glob` or `manual` triggers. Keep rules concise and use modular domain rules rather than placing the complete product spec inside an always-on file. Review agent permission settings before allowing file or terminal operations.

## Next.js

- App Router: https://nextjs.org/docs/app
- Getting started: https://nextjs.org/docs/app/getting-started
- Deployment: https://nextjs.org/docs/app/getting-started/deploying

Use the current App Router documentation, supported TypeScript setup and deployment guidance. Select current stable versions only after checking compatibility.

## Supabase

- Passwordless email sign-in: https://supabase.com/docs/guides/auth/auth-email-passwordless
- Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions
- Custom SMTP: https://supabase.com/docs/guides/auth/auth-smtp

Relevant implementation notes from the current documentation:

- Supabase Auth supports email magic links and email OTP.
- Production email delivery requires a properly configured custom SMTP/provider; the built-in SMTP service is restricted and intended for testing rather than unrestricted production.
- Supabase recommends enabling RLS on exposed tables, defining grants as well as policies, and keeping service-role/secret keys server-side.
- Edge Functions can host server-side TypeScript integrations and transactional email workflows; choose the correct runtime for each operation.

## Vercel

- Deployment environments: https://vercel.com/docs/deployments/environments
- Environment variables: https://vercel.com/docs/environment-variables

Use separate Local, Preview and Production configuration. Preview deployments must use test data and test email routing, not production applicant data.

## India privacy/legal reference

- Ministry of Electronics and IT / Press Information Bureau announcement of DPDP Rules, 2025: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&lang=2&reg=48
- PIB explainer: https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156054&lang=1&reg=3

The official announcement describes the DPDP Rules, 2025 and a phased implementation timeline. Confirm the operative provisions, dates and legal obligations with Indian counsel before public data collection. This reference is not a legal opinion.
