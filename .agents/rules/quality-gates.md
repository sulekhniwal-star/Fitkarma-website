---
trigger: model_decision
description: Apply when planning implementation, changing UI, adding features, or declaring tasks and releases complete.
---
# FitKarma Quality Gates

- Read the relevant spec and quote its acceptance criteria in the task plan.
- Implement one milestone or approved microtask at a time.
- Include loading, empty, success, validation, network-error and retry states.
- Test English and Hindi; test desktop, tablet and mobile widths.
- Respect keyboard-only navigation, screen-reader semantics, reduced motion and color contrast.
- Run lint, type-check, relevant unit/integration tests and production build.
- For registration changes, include duplicate, expired verification, resend, replay, concurrency, capacity-full and email-provider-failure tests.
- Do not report a test as passed if it was not run. List skipped checks and residual risks.
