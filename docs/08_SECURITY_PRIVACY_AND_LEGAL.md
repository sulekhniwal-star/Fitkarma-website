# 08 — Security, Privacy and Legal Readiness

**Important:** This is an engineering checklist, not legal advice or a declaration that FitKarma is legally compliant. The public website must not display “DPDP compliant” or similar certification-style claims without a documented legal assessment and evidence.

## 1. Data minimisation

The beta website needs only enough information to verify an applicant, allocate a place, understand feature interest and communicate by email:

- Name
- Email address
- One selected feature priority
- Optional device platform and preferred language
- Notice/terms/consent versions and timestamps
- Application and delivery status metadata

Do not collect health or medical information on the marketing site. Do not request phone numbers because the approved communication channel is email only.

## 2. Notice, purpose and consent

Before submit, provide a clear, standalone privacy notice that explains in simple language:

- Who is collecting the information (legal entity/contact details must be supplied).
- The specific purposes: beta application, email verification, seat allocation, waitlist operation, essential beta communications and aggregate feature-interest analysis.
- Which fields are required and which are optional.
- Whether service providers process data and for what purpose.
- Retention/deletion approach.
- How to withdraw consent, withdraw an application or request applicable data rights.
- How to contact the privacy contact/grievance channel as legally applicable.

Keep optional promotional/newsletter consent separate from essential beta service emails. Do not pre-tick optional consent. A beta applicant must not be forced to consent to unrelated marketing to secure a beta seat.

Capture the version of the notice and terms accepted, the timestamp and a minimal audit record. Legal counsel must review exact language and implementation against the current India legal commencement schedule.

## 3. India DPDP context

The Government of India notified the Digital Personal Data Protection Rules, 2025 in November 2025 and announced a phased implementation timeline. The team must verify the current commencement/transition provisions and applicable obligations at the date of launch; do not infer that every provision has the same effective date. Obtain Indian legal review before public collection.

Official reference starting points:
- PIB, Ministry of Electronics and IT, notification of DPDP Rules, 2025: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&lang=2&reg=48
- PIB explainer: https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=156054&lang=1&reg=3
- Digital Personal Data Protection Act, 2023 and applicable rules/notifications should be checked on official Government of India sources before launch.

## 4. Security controls

- HTTPS everywhere in production.
- Supabase RLS and least-privilege table grants.
- No service-role/secret credentials in client bundles, source maps or logs.
- Server-side validation using a schema library; repeat all validation on the server.
- Normalize email before uniqueness checks.
- Rate-limit application and resend endpoints.
- Add honeypot or approved bot mitigation.
- Protect against CSRF where relevant to the chosen route/session model; use secure cookies and safe redirect allowlists.
- Avoid user-controlled HTML in pages or email templates; escape all applicant-entered text.
- Apply security headers and a restrictive Content Security Policy compatible with the actual site.
- Use short-lived one-time verification links and prevent replay.
- Protect admin access with MFA, allowlisted admins and least privilege.
- Audit capacity changes, exports, role changes, status overrides and campaign sends.
- Redact personal data from application logs, error monitoring and analytics.
- Keep backups and test restoration; document retention and deletion exceptions.

## 5. Database exposure

- Public clients must not list `beta_applications` or read individual records.
- Restrict insert/update paths to the approved server-side operation or narrowly scoped public operation.
- Use RLS and explicit grants; policy definitions do not automatically revoke table grants.
- Keep privileged tables in a non-public schema where practical.
- Test unauthorised reads/writes and anonymous access.
- Never let the browser choose `status`, `seat_number`, `phase_id`, `role`, `email_verified_at` or server timestamps.

## 6. Email safety

- Use a verified sending domain and provider with production delivery configuration.
- Configure SPF, DKIM and DMARC as appropriate for the chosen sender domain.
- Use signed/one-time links with allowlisted redirects.
- Do not include sensitive personal data in email subject lines.
- Include a safe support/privacy contact.
- Log delivery status and provider IDs, not auth tokens or full provider payloads.
- Use test inboxes in development and preview environments.
- Provide an unsubscribe mechanism for optional promotional communications. Essential beta service messages must be distinguished from promotions and handled under counsel-approved policy.

## 7. Sensitive product feature safeguards

The app master document includes health, family, menstrual-cycle, pregnancy-related, CGM and clinical-adjacent capabilities. The pre-launch website should not collect these data. Before those capabilities are exposed in the app, the product team must complete domain-specific privacy/security/safety review, consent and access controls, deletion paths, source/uncertainty presentation and appropriate legal/clinical review. Ayurveda must be represented as a cultural/wellness layer, not as evidence-based diagnosis or treatment.

## 8. Retention and deletion

A specific retention schedule is an OPEN legal/product decision. Propose retention by data category (unverified application, accepted beta participant, waitlist, audit/security log, email event) and obtain owner/counsel approval before launch. Build deletion/export capabilities to the approved policy; do not invent retention periods or promise immediate deletion when a lawful exception applies.

## 9. Incident readiness

Document contact/escalation, provider compromise steps, key rotation, database backup restoration, access revocation, incident log and legal notification assessment. Do not claim the organisation has a formal incident programme until implemented and tested.
