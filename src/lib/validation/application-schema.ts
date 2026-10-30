import { z } from "zod";

export const FEATURE_INTEREST_OPTIONS = [
  { id: "ai_meal_analysis", labelEn: "AI meal analysis and food photo recognition", labelHi: "AI भोजन विश्लेषण और फ़ोटो पहचान" },
  { id: "indian_food_db", labelEn: "Indian food database, regional recipes and realistic portions", labelHi: "भारतीय खाद्य डेटाबेस, क्षेत्रीय व्यंजन और घरेलू माप" },
  { id: "whatsapp_logging", labelEn: "WhatsApp text and voice-based food logging", labelHi: "WhatsApp टेक्स्ट और आवाज़ से भोजन दर्ज करना" },
  { id: "offline_tracking", labelEn: "Offline-first health and nutrition tracking", labelHi: "ऑफ़लाइन-प्रथम स्वास्थ्य और पोषण ट्रैकिंग" },
  { id: "health_connect_apple_health", labelEn: "Google Health Connect and Apple Health integration", labelHi: "Google Health Connect और Apple Health से जुड़ाव" },
  { id: "daily_intelligence_package", labelEn: "Daily Intelligence Package and personalised health insights", labelHi: "दैनिक बुद्धिमत्ता पैकेज (DIP) और व्यक्तिगत मार्गदर्शन" },
  { id: "dynamic_tdee", labelEn: "Dynamic TDEE and adaptive calorie/macro goals", labelHi: "डायनेमिक TDEE और परिवर्तनीय लक्ष्य" },
  { id: "family_recipe_dashboard", labelEn: "Family Recipe Splitter and Family Care Dashboard", labelHi: "फैमिली रेसिपी स्प्लिटर और पारिवारिक देखभाल डैशबोर्ड" },
  { id: "womens_health", labelEn: "Women's health and cycle-aware wellness", labelHi: "महिला स्वास्थ्य और चक्र-सजग वेलनेस" },
  { id: "festival_fasting_aqi", labelEn: "Festival/fasting and AQI-aware recommendations", labelHi: "त्योहार, उपवास और AQI-सजग सुझाव" },
  { id: "ayurveda_lifestyle", labelEn: "Ayurveda and cultural lifestyle personalisation", labelHi: "आयुर्वेद और सांस्कृतिक जीवनशैली अनुकूलन" },
  { id: "cgm_metabolic", labelEn: "CGM, metabolic health and advanced recovery", labelHi: "CGM, मेटाबॉलिक स्वास्थ्य और रिकवरी" },
  { id: "karma_points_challenges", labelEn: "Challenges, Karma points and family wellness", labelHi: "चुनौतियाँ, कर्मा पॉइंट्स और पारिवारिक वेलनेस" },
  { id: "indian_languages", labelEn: "More Indian languages and conversational AI", labelHi: "अधिक भारतीय भाषाएँ और संवादात्मक AI" },
  { id: "other", labelEn: "Other (optional short explanation)", labelHi: "अन्य (वैकल्पिक संक्षिप्त विवरण)" },
] as const;

export type FeatureInterestId = (typeof FEATURE_INTEREST_OPTIONS)[number]["id"];

const featureIds = FEATURE_INTEREST_OPTIONS.map((f) => f.id) as [FeatureInterestId, ...FeatureInterestId[]];

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email cannot exceed 255 characters" })
    .transform((val) => val.toLowerCase()),

  primaryFeatureInterests: z
    .array(z.enum(featureIds))
    .min(1, { message: "Please select at least one feature priority" })
    .max(5, { message: "Please select at most 5 feature priorities" }),

  otherFeatureInterestText: z
    .string()
    .trim()
    .max(250, { message: "Additional text cannot exceed 250 characters" })
    .optional()
    .nullable(),

  devicePlatform: z
    .enum(["android", "ios", "both", "not_sure"])
    .optional()
    .nullable(),

  preferredLanguage: z.enum(["en", "hi"]).default("en"),

  privacyNoticeVersion: z.string().default("v1.0.0"),
  acceptPrivacyNotice: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Privacy Notice" }),
  }),

  betaTermsVersion: z.string().default("v1.0.0"),
  acceptBetaTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Beta Terms" }),
  }),

  marketingConsent: z.boolean().default(false),

  // Bot protection honeypot (should be empty)
  websiteUrl: z.string().max(0, { message: "Bot submission detected" }).optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

