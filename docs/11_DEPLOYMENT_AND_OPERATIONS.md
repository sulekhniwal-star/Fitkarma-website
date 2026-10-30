# 11 — Deployment and Operations

## 1. Environments

| Environment | Purpose | Data/email rules |
|---|---|---|
| Local | Development | Local/test database; fake or sandbox email only. |
| Preview | Review PRs and QA | Staging database; never production applicant data; test email sink only. |
| Production | Public website and registrations | Approved domain, production Supabase, authenticated email sender, monitoring and backups. |

## 2. Pre-production requirements

- Owner has purchased/selected domain and approved registrar/DNS changes.
- Domain points to approved Vercel project.
- HTTPS verified.
- Supabase production project created separately from development.
- Database migrations reviewed and applied.
- RLS/grants and concurrency test pass.
- Production email provider and sender domain verified.
- SPF/DKIM/DMARC set and checked as appropriate.
- Privacy notice, beta terms, legal entity/contact and retention policy approved by counsel/owner.
- Admin accounts created, least-privilege roles set and MFA enabled.
- Hindi copy reviewed.
- Support email published.
- Monitoring/alerts and backup/restore verified.
- Final beta capacity and phase status approved.
- Public counter checked against database count.
- No real beta campaign sent without owner sign-off.

## 3. Domain guidance

No domain is currently purchased. Candidate ideas such as `fitkarma.in`, `fitkarma.app` and `getfitkarma.com` are brainstorming only; availability, brand conflict and trademark status have not been checked. Do not purchase or claim a candidate is available without registrar and trademark checks plus owner approval.

Use a Vercel-provided preview address during development. Keep canonical URL, redirect and auth callback settings environment-specific so switching to a purchased domain is controlled.

## 4. CI/CD

- Git repository with protected production branch.
- Pull request review and automated checks.
- Lint, type-check, unit/integration tests, migration checks and production build.
- Preview deployment for each change, using staging/test secrets only.
- Production deployment only after approved review and release checklist.
- Database migrations should be backward-compatible where possible; use expand/contract for risky changes.
- Keep rollback steps documented; database rollback may require a forward fix rather than destructive reversal.

## 5. Secrets/configuration

- Maintain `.env.example` with variable names only.
- Store secrets in the hosting/provider secret store.
- Rotate credentials if exposed; do not paste them into agent conversations or commits.
- Separate local, preview and production keys.
- Restrict who can see production secrets.

## 6. Operational dashboard

Minimum admin metrics:

- Phase 1 capacity and accepted count
- Remaining Phase 1 places
- Pending verification applications
- Phase 2 waitlist count
- Feature-priority distribution
- Email outbox pending/sent/failed count
- Recent admin actions

Avoid displaying unnecessary personal data on summary screens.

## 7. Incident response

Document an owner contact, on-call decision-maker, email provider support route, database restore process, secret rotation, access revocation, security incident log and communication approval. Do not state that incident response is mature until it is rehearsed.

## 8. Public launch switch

The site can be deployed privately/previewed without accepting real applications. Public collection must remain disabled until the owner approves legal copy, sender setup, database security, capacity test, support contact and production domain. Use a controlled feature flag/config (`REGISTRATION_OPEN`) and phase state in the database, not a code-only boolean.
