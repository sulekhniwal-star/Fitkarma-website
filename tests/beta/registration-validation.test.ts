import { describe, it, expect } from 'vitest';
import { betaRegistrationSchema } from '@/lib/validation/beta-registration';

describe('Beta Registration Schema Validation', () => {
  const validPayload = {
    fullName: 'Aarav Sharma',
    email: 'AARAV.SHARMA@example.com',
    devicePlatform: 'both' as const,
    healthGoals: ['weight_loss', 'energy'],
    featurePriorities: ['indian_nutrition', 'dip_intelligence'],
    preferredLanguage: 'en' as const,
    acceptPrivacyNotice: true as const,
    acceptBetaTerms: true as const,
    marketingConsent: false,
    website_url: '',
  };

  it('validates and normalizes valid registration payloads', () => {
    const result = betaRegistrationSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('aarav.sharma@example.com');
      expect(result.data.fullName).toBe('Aarav Sharma');
      expect(result.data.devicePlatform).toBe('both');
      expect(result.data.healthGoals).toEqual(['weight_loss', 'energy']);
    }
  });

  it('rejects short or empty full names', () => {
    const result = betaRegistrationSchema.safeParse({
      ...validPayload,
      fullName: 'A',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email formats', () => {
    const result = betaRegistrationSchema.safeParse({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects submissions with zero selected health goals', () => {
    const result = betaRegistrationSchema.safeParse({
      ...validPayload,
      healthGoals: [],
    });
    expect(result.success).toBe(false);
  });

  it('strictly rejects when mandatory DPDP privacy consent is false', () => {
    const result = betaRegistrationSchema.safeParse({
      ...validPayload,
      acceptPrivacyNotice: false,
    });
    expect(result.success).toBe(false);
  });

  it('strictly rejects when mandatory beta terms consent is false', () => {
    const result = betaRegistrationSchema.safeParse({
      ...validPayload,
      acceptBetaTerms: false,
    });
    expect(result.success).toBe(false);
  });

  it('captures honeypot payload correctly for server-side bot trapping', () => {
    const botPayload = {
      ...validPayload,
      website_url: 'https://spam-bot-farm.ru/lead',
    };
    const result = betaRegistrationSchema.safeParse(botPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website_url).toBe('https://spam-bot-farm.ru/lead');
    }
  });
});
