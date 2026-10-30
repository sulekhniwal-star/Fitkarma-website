# 07 — Data Model and API Contract

This is the logical contract. The implementation agent must create tested migrations and executable API schemas; it must not treat this document as a final SQL migration.

## 1. Core entities

### `beta_phases`

- `id` UUID primary key
- `phase_key` unique text (`phase1`, `phase2`, etc.)
- `display_name`
- `capacity` integer, non-negative
- `status` enum (`draft`, `open`, `full`, `closed`)
- `opens_at`, `closes_at` nullable timestamps
- `created_at`, `updated_at`
- `created_by`, `updated_by` admin references

Guardrail: Phase 1 capacity must not exceed 1,000. Owner may increase future-phase capacity only via authorized admin action.

### `beta_applications`

- `id` UUID primary key
- `full_name` text
- `email` original display form
- `normalized_email` text with unique constraint (case-folded/trimmed)
- `email_verified_at` nullable timestamp
- `status` enum from `02_REQUIREMENTS_AND_SCOPE.md`
- `phase_id` nullable FK
- `seat_number` nullable integer; unique with phase ID where allocated
- `primary_feature_interest` controlled enum/string from approved list
- `other_feature_interest_text` nullable short text
- `device_platform` nullable enum
- `preferred_language` nullable enum (`en`, `hi`)
- `privacy_notice_version`, `privacy_accepted_at`
- `beta_terms_version`, `terms_accepted_at`
- `marketing_consent` boolean default false; `marketing_consent_at` nullable
- `application_created_at` (server timestamp), `verification_sent_at`, `email_verified_at`, `decision_at`
- `allocation_order_at` (server timestamp; populate according to owner-approved FIFO rule O-013)
- `source_campaign`/UTM fields only if approved and privacy-reviewed; do not capture arbitrary URL PII
- `withdrawn_at` nullable

Do not store medical or health information in this table.

### `email_outbox`

- `id` UUID primary key
- `application_id` nullable FK
- `phase_id` nullable FK
- `message_type` enum
- `recipient_normalized` text
- `template_key`, `locale`
- `idempotency_key` unique
- `status` (`pending`, `processing`, `sent`, `failed`, `cancelled`)
- `attempt_count`, `next_attempt_at`
- `provider_message_id` nullable
- `last_error_code` nullable (no secrets or full sensitive provider payload)
- `created_at`, `sent_at`

### `admin_users` / role claims

Use Supabase Auth identity plus an explicitly controlled server-side role assignment. Roles should be minimal, e.g. `owner`, `admin`, `support_readonly`. Do not let a user self-assign an admin role.

### `audit_events`

- `id`, `actor_user_id`, `action`, `target_type`, `target_id`, `reason` (where needed), `metadata_safe`, `created_at`
- Never store secrets, full email body, auth tokens or unnecessary personal data in metadata.

### `consent_events`

Optional normalized record of notice/terms/marketing consent versions and timestamps. The exact consent structure must be approved in the legal review.

## 2. State-transition rules

- New form submit -> `pending_email_verification`.
- Successful trusted verification + available Phase 1 capacity -> `phase1_accepted` with one seat.
- Successful trusted verification + Phase 1 full/closed -> `phase2_waitlist` (or active next phase only if its policy is explicitly configured).
- Repeated verification -> return existing state; never allocate a second seat.
- Withdrawal -> `withdrawn` with approved policy; seat release behaviour is not defined until owner/legal decision.
- Admin status change must be audited and constrained; do not allow arbitrary direct enum transitions.

## 3. Atomic Phase 1 allocation contract

Create a database function or transaction-backed server operation equivalent to:

`confirm_and_allocate_application(application_id, verified_auth_identity)`

The operation must:

1. Verify the application exists and the email identity matches the verified email.
2. Lock the Phase 1 capacity/phase row or use another proven serialization mechanism.
3. Return current status if allocation was already completed (idempotency).
4. Count/allocate under the same transaction.
5. If Phase 1 is open and accepted seats are fewer than 1,000, allocate the next unique seat and set `phase1_accepted`.
6. Otherwise set `phase2_waitlist` (subject to current waitlist policy).
7. Insert the matching email outbox job with a unique idempotency key.
8. Commit all state together.

The database constraint/transaction must make it impossible for concurrency or retries to create seat 1,001 or duplicate an existing seat. A frontend check is not acceptable.

## 4. Public API shape (illustrative contract)

### `POST /api/beta/applications`

Input:

```json
{
  "fullName": "Example Person",
  "email": "person@example.com",
  "primaryFeatureInterest": "indian_nutrition",
  "otherFeatureInterestText": null,
  "devicePlatform": "android",
  "preferredLanguage": "en",
  "privacyNoticeVersion": "v1",
  "acceptPrivacyNotice": true,
  "betaTermsVersion": "v1",
  "acceptBetaTerms": true,
  "marketingConsent": false
}
```

Response must not reveal whether an email is already registered in a way that enables enumeration. Return a generic “check your inbox” style response, with a safe correlation/request ID.

### `POST /api/beta/resend-verification`

- Rate-limited by normalized email and IP/risk signal.
- Generic response to avoid account enumeration.
- Enforces cooldown and max attempts.

### `GET /auth/confirm`

- Validate one-time Supabase Auth token/hash using the official supported verification flow.
- Redirect only to allowlisted site URLs.
- Call atomic allocation operation after identity verification.
- Never trust arbitrary `next`/redirect query parameters.

### Admin APIs

- Require server-validated authenticated admin role for every request.
- Separate read, status update, capacity update, export and email-campaign permissions.
- Log privileged actions.

## 5. Email outbox semantics

- Registration/seat status and outbox event intent commit together.
- A worker/Edge Function dispatches pending events.
- Use a stable idempotency key such as `{application_id}:{message_type}:{template_version}`.
- A provider success response marks job sent; transient failures retry with bounded backoff; permanent failures surface to admin.
- Duplicate callbacks must not send duplicate acceptances.

## 6. Seat counter

If displayed publicly:

- Count only `phase1_accepted` records.
- Label it “verified Phase 1 places claimed”.
- Do not show applicant identity or individual seat numbers.
- Cache only as a read optimisation; database remains source of truth.
- Hide or display “Phase 1 full” when 1,000 accepted places are reached.
