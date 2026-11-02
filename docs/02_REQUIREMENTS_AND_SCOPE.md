# 02 — Requirements and Scope

## 1. Website requirements

### Must have for public beta launch

- Multi-page application architecture with dedicated routes:
  - `/` — Cinematic landing page with WebGL interactive background, cursor dynamics, bento highlights, and quick CTA.
  - `/features` — In-depth interactive showcase of FitKarma capabilities with live simulator widgets (katori/roti slider, DIP preview, AI scanner).
  - `/about` — Origin story, mission, and India-first wellness philosophy.
  - `/beta` — Dedicated Beta Application page with live Phase 1 capacity counter (1,000 spot ceiling) and spot reservation.
  - `/faq` — Searchable categorized FAQ.
  - `/privacy` & `/terms` — Clear privacy notice and beta programme terms pending final legal counsel review.
  - `/auth/verify` — Double opt-in OTP / magic link verification handler.
- Responsive bilingual support (English-first launch with seamless instant Hindi language toggle).
- Premium Dark Mode (Linear / Apple style) with obsidian backgrounds, glowing borders, and crisp typography.
- Interactive WebGL / Canvas background with dynamic cursor reaction and Lenis smooth momentum scrolling.
- Double opt-in email verification using Resend and Supabase Auth (magic link / OTP).
- Database-enforced atomic allocation of exactly 1,000 Phase 1 places (FIFO by email verification timestamp).
- Automatic transition to Phase 2 waitlist once 1,000 places are claimed.
- Name, email, multi-select feature priorities, and optional platform/language preference collection.
- Branded confirmation, acceptance, and waitlist transactional emails via Resend.
- Protected admin console with Supabase Auth + MFA for monitoring applications and phase capacities.

### Should have

- Live public progress indicator that displays accepted Phase 1 seats without exposing personal data. Do not show false scarcity or an unverified count.
- Feature-interest dashboard with aggregate counts.
- Export with explicit admin permission and an audit event.
- Email templates in English and Hindi.
- Phase 2 invitation campaign to Phase 1 accepted users when owner opens Phase 2.
- Shareable Phase 2 URL in that invitation email. Do not build referral rewards or a referral-tracking system without approval.

### Not approved for initial website scope

- Social login or phone OTP.
- SMS, phone calls or WhatsApp messages.
- Payments, subscriptions or pricing pages.
- Public user profiles, social feed or community forum.
- Collection of health data or uploaded health documents on the marketing site.
- Ad network integrations.
- Automated medical advice or diagnostic flows.
- Paid advertising pixels or non-essential tracking until reviewed and approved.

## 2. Beta feature inventory — include in programme narrative

The website may organise capabilities into these groups. A feature must be labelled accurately as `In beta`, `Rolling out during beta`, or `Planned within the beta programme`. The owner has selected the entire master-document feature inventory for the beta programme, but the specific status of each capability must be maintained in a version-controlled feature-status file or CMS/admin config and must not be guessed by the agent.

### A. Indian nutrition and food intelligence

- 500+ seeded regional recipes as described in the master documentation.
- Indian home-cooked meals, street food, restaurant foods, sweets and festival foods.
- Household portion units: katori, glass, spoon, piece, serving, roti count, idli count and family-recipe percentage.
- Raw-versus-cooked food context and cooking-yield multipliers.
- Tadka/tempering estimate slider for low, medium and high oil/ghee/butter estimates.
- Family Recipe Splitter using total ingredients and user-consumed percentage.
- Vegetarian protein optimisation and regional food coverage.

### B. AI and logging

- Daily Intelligence Package (DIP) contextual home experience.
- AI meal analysis.
- AI photo-based food identification and portion estimation, with uncertainty and user confirmation.
- WhatsApp text and voice logging, including Hinglish first and additional Indian languages as the roadmap expands.
- Conversational extraction, language detection, food matching, nutrition estimation and confirmation workflow.
- Dynamic/adaptive TDEE with documented methodology, confidence and overrides.

### C. Offline, devices and connected health

- Offline-first in-app logging and sync/outbox behaviour.
- Android Health Connect integration.
- Apple Health / HealthKit integration.
- Consumer wearable data through OS-level health rails.
- CGM/clinical data pipeline and advanced metabolic tracking, subject to permissions and clinical readiness.
- AQI-aware workout alternatives using a suitable source where available and permissioned.

### D. Family, social and behaviour support

- Family Care Dashboard with explicit affirmative consent, role access and revocation.
- Family health sharing and selected telemetry.
- Functional squads, corporate step challenges and family activity rings.
- Native social feed (the master document marks a custom social feed as deferred; it remains in the full capability inventory by owner direction, but must not be built or promoted without an explicit release decision).
- Karma points and partner-benefit concepts where commercially feasible.
- Family crisis-alert guardrails that never position FitKarma as an emergency medical service.
- Broader ecosystem/grocery integrations as the programme matures.

### E. Wellness and personalisation

- Ayurveda as a cultural/wellness personalisation layer, visibly separated from evidence-based medical metrics.
- Festival/fasting modes for user-selected periods; never infer religion or participation from identity.
- Women's health capabilities including cycle tracking, cycle-aware training, PCOS lifestyle tracking, symptoms, menopause and pregnancy-related functionality where appropriate and safely designed.
- Advanced recovery and preventive-longevity capabilities.

### F. Ecosystem and future expansion

- ABHA/ABDM expansion.
- Additional Indian languages including Tamil and Telugu.
- On-device pose estimation and other advanced analysis.
- Grocery integrations and additional data sources.
- Proprietary wearable/hardware concepts and other explicitly deferred items in the master documentation.
- Consolidated personal-health records/telemetry and clinical dossier generation where approved product scope permits.
- Biological-age estimation and other longevity-oriented indicators, with transparent methodology and uncertainty where implemented.

### G. Privacy and data-governance product capabilities

- Encrypted local storage direction (SQLCipher) and server-side row-level access controls.
- Private storage controls and transparent local-versus-cloud Data Vault view.
- User data export and cascading deletion/“Erase my existence” workflow with auditable completion receipts, subject to applicable legal retention rules.
- Consent, revocation, role-based access and auditability for family data sharing.

### H. Monetisation, rewards and commercial ecosystem (programme inventory; not a website checkout requirement)

- Configurable Yogi Free, Karma Pro and FitKarma Elite concepts from the master documentation.
- Backend-configurable pricing/entitlements rather than hard-coded commercial values.
- Razorpay and UPI payment foundation, including UPI AutoPay where approved and operational.
- Focused one-off Sachet Sprints/reports/programmes.
- Ad-supported free tier and ad-free paid experience, including the master-document AdMob scope where retained by product owner.
- Karma points connected to tangible value/partner benefits where commercially feasible.
- Premium human/clinical services as described for Elite, only after operational, clinical and legal readiness.
- The source document's indicative tier examples (Yogi Free ₹0; Karma Pro ₹149–₹199/month or around ₹1,499/year; Elite ₹1,999+/month; Sachet Sprints ₹49–₹99) are internal source context only, not approved public pricing. The source says pricing is backend-configurable; do not display these amounts on the website without explicit approval.

The website must not publish prices, promise payment features or imply paid tiers are live unless the owner approves launch readiness and the relevant terms are available. These commercial capabilities are included in the broader beta-program feature inventory by owner direction, subject to staged release and applicable platform, payment, tax, consumer-protection and advertising review.

**Important readiness gates:** The website may mention the programme intent without claiming a launch date. Clinical, CGM, pregnancy-related, women's health, family-monitoring, ABHA/ABDM, proprietary hardware and supplier-dependent capabilities require separate technical, legal, privacy and safety approvals before user access or public availability claims.

## 3. Beta registration form

### Required fields (aligned with Decision D-036)

- `full_name` — required; trimmed; reasonable length limit.
- `email` — required; normalized; valid format; unique per programme.
- `health_goals` — required multi-select array (at least 1 choice from high-level lifestyle wellness goals: *Weight Loss & Metabolism*, *Lean Muscle & Strength*, *Gut Health & Digestion*, *Daily Energy & Stamina*, *Sustained Habit Consistency*).
- `feature_priorities` — required multi-select array (choose features of interest from the approved feature inventory below).
- `privacy_notice_version` and `beta_terms_version` — stored server-side with acceptance timestamps.
- `email_verified_at` — set only by the trusted verification callback.

### Optional fields

- `device_platform`: `android` / `ios` / `both`.
- `preferred_language`: `en` / `hi`.
- `other_feature_text`: short text only when `Other` is selected; max 250 characters; warn users strictly not to enter personal medical information.

Do not collect phone number, age, date of birth, city, gender, clinical records, medications, symptoms, or diagnoses on this form.

### Feature-priority options (Multi-select)

Ask: **“Which FitKarma capabilities matter most to you?”** (Multi-select from feature directory + optional other)

1. Indian nutrition database, regional recipes and realistic household portions (katori/roti)
2. Daily Intelligence Package (DIP) and contextual health insights
3. AI meal photo recognition and instant portion analysis
4. WhatsApp text and voice-based meal logging
5. Offline-first tracking foundations
6. Google Health Connect and Apple Health platform synchronization
7. Family-aware wellness tools and Family Recipe Splitter
8. Dynamic TDEE and metabolic recovery
9. Women's cycle-aware health tracking
10. Festival/fasting modes and regional seasonal adjustments
11. Other (optional short explanation)

### 4. Registration status vocabulary

Use explicit statuses, not ambiguous booleans:

- `pending_verification`
- `phase1_accepted`
- `phase2_waitlist`
- `invited_phase2` (when Phase 2 opens and an invitation is sent)
- `withdrawn`
- `rejected_abuse` (admin-only, reason logged; do not expose internal reason publicly)

A seat count must be computed from successful Phase 1 accepted records or a transactionally maintained counter that is reconciled. Never count pending applications.

## 5. Public availability language

Approved status labels:

- **In beta:** available to at least some beta users now; owner confirms scope.
- **Rolling out during beta:** release is staged; not every user necessarily has it yet.
- **Planned within the beta programme:** intended as part of the programme but not yet available.

Prohibited without explicit evidence and approval:

- “Everything is live today.”
- “Guaranteed weight loss”, “cures”, “prevents disease”, “diagnoses”, “clinically proven” or similar medical claims.
- Exact launch dates, performance claims or availability percentages not validated by product evidence.
