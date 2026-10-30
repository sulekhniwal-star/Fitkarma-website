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

## 3. SEO basics

- Unique title and meta description for each locale.
- Correct canonical and `hreflang` annotations for English/Hindi equivalents.
- XML sitemap includes only public indexable pages.
- `noindex` authentication callbacks, status pages, admin and internal preview routes.
- Open Graph/Twitter card assets after logo and OG design approval.
- Semantic HTML, fast loading and stable layout.
- Structured data only where accurate and eligible; do not fabricate product ratings, organisation addresses, reviews or offers.
- Use descriptive image alt text and modern responsive image formats.
- Avoid duplicate content between language pages; translate properly.

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
