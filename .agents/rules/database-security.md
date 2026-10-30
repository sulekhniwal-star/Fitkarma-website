---
trigger: glob
globs: "*.sql, **/*.sql, **/supabase/**"
description: Database, capacity-allocation, Row Level Security and privileged-operation safeguards.
---
# FitKarma Database and Security Rules

- Every exposed table must have deliberate grants and RLS policies; test both allowed and denied access paths.
- Never expose service-role or secret keys to the browser.
- Seat allocation must run inside a single database transaction or equivalent atomic server-side operation with a row lock/advisory lock or other proven serialization mechanism.
- Phase 1 accepted registrations must never exceed 1,000, including under concurrency.
- Normalize email addresses for uniqueness; enforce uniqueness at the database level.
- Confirmation and allocation functions must be idempotent. A retry or replay cannot create another seat.
- Do not trust browser-supplied capacity, seat number, status, creation time or role.
- Keep privileged admin reads and writes out of public database policies.
- Migrations must be forward-reviewed, reproducible and tested; do not make undocumented production-only changes.
