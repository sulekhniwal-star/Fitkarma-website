import { z } from 'zod';

export const betaRegistrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name cannot exceed 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase(),
  devicePlatform: z.enum(['ios', 'android', 'both'], {
    message: 'Please select a smartphone platform',
  }),
  healthGoals: z
    .array(z.string())
    .min(1, { message: 'Please select at least one health goal' }),
  featurePriorities: z.array(z.string()).default([]),
  otherFeatureText: z.string().max(250).optional().nullable(),
  preferredLanguage: z.enum(['en', 'hi']).default('en'),
  privacyNoticeVersion: z.string().default('v1'),
  acceptPrivacyNotice: z.literal(true, {
    message: 'You must accept the DPDP Privacy Notice',
  }),
  betaTermsVersion: z.string().default('v1'),
  acceptBetaTerms: z.literal(true, {
    message: 'You must accept the Beta Program Terms',
  }),
  marketingConsent: z.boolean().default(false),
  // Anti-bot honeypot field — legitimate users leave this empty
  website_url: z.string().optional().nullable(),
});

export type BetaRegistrationInput = z.infer<typeof betaRegistrationSchema>;
