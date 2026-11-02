import { describe, it, expect } from 'vitest';
import { generateShareCopy } from '@/components/beta/SocialShareActions';

describe('Viral Social Sharing Copy Generator', () => {
  it('generates punchy VIP share copy in English', () => {
    const text = generateShareCopy(42, true, 'https://fitkarma.in/en/beta?ref=seat042', 'en');
    expect(text).toBe('Joined the FitKarma VIP Beta #042. Check it out: https://fitkarma.in/en/beta?ref=seat042');
    expect(text).toContain('FitKarma');
  });

  it('generates punchy VIP share copy in Hindi', () => {
    const text = generateShareCopy(42, true, 'https://fitkarma.in/hi/beta?ref=seat042', 'hi');
    expect(text).toBe('मैंने FitKarma VIP बीटा सीट #042 प्राप्त की है। यहाँ देखें: https://fitkarma.in/hi/beta?ref=seat042');
    expect(text).toContain('FitKarma');
  });

  it('generates Waitlist share copy in English', () => {
    const text = generateShareCopy(127, false, 'https://fitkarma.in/en/beta?ref=seat127', 'en');
    expect(text).toBe('Joined the FitKarma Phase 2 Waitlist #127. Check it out: https://fitkarma.in/en/beta?ref=seat127');
  });

  it('generates Waitlist share copy in Hindi', () => {
    const text = generateShareCopy(127, false, 'https://fitkarma.in/hi/beta?ref=seat127', 'hi');
    expect(text).toBe('मैं FitKarma चरण 2 प्रतीक्षा सूची में स्थान #127 पर हूँ। यहाँ देखें: https://fitkarma.in/hi/beta?ref=seat127');
  });
});

