# 09 — Content, SEO and Localisation

## 1. Locale strategy

- Support English (`en`) and Hindi (`hi`) from the first public release.
- Use stable locale-prefixed routes such as `/en/...` and `/hi/...`.
- Default to English unless the owner approves browser-language detection. Always show an obvious manual language switch.
- Preserve the selected language when navigating between pages and the beta flow.
- Store the applicant's selected language for email preference; do not infer language from name or location.

## 2. Translation requirements

- Every visible string, validation message, form status, email and legal page must exist in both languages.
- No hard-coded UI copy inside components; use locale message files.
- Hindi copy must be reviewed by a native editor before production.
- Keep FitKarma and common technical brand terms consistent; explain AI/health terminology in simple language.
- Avoid mistranslating terms that might imply clinical diagnosis or guaranteed results.

## 3. SEO, Metadata & Multi-Page Routes

Every public route includes localized metadata, Open Graph cards, Twitter cards, and `hreflang` alternates:

| Route | English Title (`<title>`) | English Meta Description |
|---|---|---|
| `/` | FitKarma — India's AI-powered Fitness and Wellness Ecosystem | India's AI-first fitness ecosystem built for regional nutrition, household portions, and daily health intelligence. |
| `/features` | Features — FitKarma \| Built for Indian Nutrition & Everyday Health | Explore FitKarma's 6 core pillars: Indian Nutrition Engine, Daily Intelligence Package, AI Photo Logging, and more. |
| `/about` | About FitKarma \| Why India Needs a Dedicated Health Ecosystem | Learn why Western fitness trackers fail in Indian households and how FitKarma is building a modern, India-first alternative. |
| `/beta` | Join Beta \| FitKarma — Reserve Your Phase 1 Access Spot | Apply for the FitKarma Phase 1 beta. Limited to 1,000 verified places. Reserve your VIP Beta Pass today. |
| `/faq` | Frequently Asked Questions — FitKarma Beta & Tracking | Common questions regarding beta rollout, Indian food tracking accuracy, device connectivity, and data privacy. |
| `/privacy` | Privacy Notice — FitKarma \| DPDP 2025 Aligned | Learn how FitKarma respects your privacy, handles consent, and protects personal data. |
| `/terms` | Beta Programme Terms — FitKarma | Terms and conditions governing participation in the progressive FitKarma beta programme. |

### Dynamic Open Graph & Social Cards
- Implemented via Next.js `ImageResponse` (`@vercel/og`) in `app/opengraph-image.tsx`.
- Renders the approved obsidian background (`#0D0F12`), glowing emerald/amber aura, official FitKarma logo lockup, and page-specific dynamic headlines.
- `noindex, nofollow` strictly applied to `/auth/verify`, `/admin/*`, and internal preview routes.

## 4. Keyword/content themes

Use naturally, not as keyword stuffing:

- AI fitness and wellness app India
- Indian nutrition and food tracking
- Indian meal and portion tracking
- personal fitness and wellness assistant
- health and fitness tracking ecosystem
- Hindi health and wellness app

Only publish claims supported by product evidence and approved scope.

## 5. Analytics and privacy

- No non-essential analytics or advertising pixels until owner approval and legal review.
- Never include email, name, verification token or other personal data in analytics event properties or URLs.
- Prefer aggregate conversion and feature-interest reporting.
- Keep analytics consent/configuration aligned with the approved privacy notice.

## 6. Content governance

Maintain an approved content record with: key, English string, Hindi string, feature status, evidence/owner, last-reviewed date. Product availability labels should come from a controlled source so the agent cannot casually change them in a page component.
