import { describe, it, expect } from 'vitest';
import { render } from '@react-email/render';
import React from 'react';
import { BetaVerificationEmail } from '@/emails/BetaVerificationEmail';
import { BetaAcceptedEmail } from '@/emails/BetaAcceptedEmail';
import { BetaWaitlistEmail } from '@/emails/BetaWaitlistEmail';
import { BetaPromotedEmail } from '@/emails/BetaPromotedEmail';

describe('React Email Templates Rendering & Brand Token Consistency', () => {
  it('renders BetaVerificationEmail in English and Hindi', async () => {
    // English render
    const htmlEn = await render(
      React.createElement(BetaVerificationEmail, {
        fullName: 'Aarav Sharma',
        verificationUrl: 'https://fitkarma.in/auth/verify?token=test1234',
        locale: 'en',
      })
    );
    expect(htmlEn).toContain('Aarav Sharma');
    expect(htmlEn).toContain('https://fitkarma.in/auth/verify?token=test1234');
    expect(htmlEn).toContain('Verify Email &amp; Claim Seat');
    expect(htmlEn).toContain('FitKarma');
    expect(htmlEn).not.toContain('undefined');
    expect(htmlEn).not.toContain('NaN');

    // Hindi render
    const htmlHi = await render(
      React.createElement(BetaVerificationEmail, {
        fullName: 'आरव शर्मा',
        verificationUrl: 'https://fitkarma.in/auth/verify?token=test1234',
        locale: 'hi',
      })
    );
    expect(htmlHi).toContain('आरव शर्मा');
    expect(htmlHi).toContain('ईमेल सत्यापित करें और सीट सुरक्षित करें');
    expect(htmlHi).toContain('भारत का AI-संचालित फिटनेस और वेलनेस इकोसिस्टम');
  });

  it('renders BetaAcceptedEmail with correct VIP seat badge formatting in English and Hindi', async () => {
    // English render with seat number 42 -> #042
    const htmlEn = await render(
      React.createElement(BetaAcceptedEmail, {
        fullName: 'Priya Patel',
        seatNumber: 42,
        passUrl: 'https://fitkarma.in/beta/pass/042',
        locale: 'en',
      })
    );
    expect(htmlEn).toContain('Priya Patel');
    expect(htmlEn).toContain('#042');
    expect(htmlEn).toContain('View &amp; Download VIP Beta Pass');
    expect(htmlEn).toContain('FitKarma');
    expect(htmlEn).not.toContain('undefined');

    // Hindi render
    const htmlHi = await render(
      React.createElement(BetaAcceptedEmail, {
        fullName: 'प्रिया पटेल',
        seatNumber: 7,
        passUrl: 'https://fitkarma.in/beta/pass/007',
        locale: 'hi',
      })
    );
    expect(htmlHi).toContain('#007');
    expect(htmlHi).toContain('प्रिया पटेल');
    expect(htmlHi).toContain('अपना डिजिटल VIP पास देखें और डाउनलोड करें');
  });

  it('renders BetaWaitlistEmail with queue position and referral invite in English and Hindi', async () => {
    // English render
    const htmlEn = await render(
      React.createElement(BetaWaitlistEmail, {
        fullName: 'Rohan Verma',
        waitlistPosition: 153,
        referralUrl: 'https://fitkarma.in/beta?ref=rohan153',
        locale: 'en',
      })
    );
    expect(htmlEn).toContain('Rohan Verma');
    expect(htmlEn).toContain('#153');
    expect(htmlEn).toContain('Phase 2 Waitlist');
    expect(htmlEn).toContain('Check Live Queue Position');
    expect(htmlEn).not.toContain('undefined');

    // Hindi render
    const htmlHi = await render(
      React.createElement(BetaWaitlistEmail, {
        fullName: 'रोहन वर्मा',
        waitlistPosition: 89,
        referralUrl: 'https://fitkarma.in/beta?ref=rohan89',
        locale: 'hi',
      })
    );
    expect(htmlHi).toContain('#89');
    expect(htmlHi).toContain('रोहन वर्मा');
    expect(htmlHi).toContain('अपनी कतार स्थिति देखें');
  });

  it('renders BetaPromotedEmail with reassigned seat badge in English and Hindi', async () => {
    // English render
    const htmlEn = await render(
      React.createElement(BetaPromotedEmail, {
        fullName: 'Vikram Mehta',
        seatNumber: 15,
        passUrl: 'https://fitkarma.in/beta/pass/015',
        locale: 'en',
      })
    );
    expect(htmlEn).toContain('Vikram Mehta');
    expect(htmlEn).toContain('#015');
    expect(htmlEn).toContain('Promoted from Waitlist');
    expect(htmlEn).toContain('Claim Your VIP Beta Pass');
    expect(htmlEn).not.toContain('undefined');

    // Hindi render
    const htmlHi = await render(
      React.createElement(BetaPromotedEmail, {
        fullName: 'विक्रम मेहता',
        seatNumber: 15,
        passUrl: 'https://fitkarma.in/beta/pass/015',
        locale: 'hi',
      })
    );
    expect(htmlHi).toContain('विक्रम मेहता');
    expect(htmlHi).toContain('#015');
    expect(htmlHi).toContain('शुभ समाचार');
  });

  it('verifies exact brand name spelling and color token integrity across all templates', async () => {
    const templates = [
      await render(React.createElement(BetaVerificationEmail, { fullName: 'Test', verificationUrl: 'https://test' })),
      await render(React.createElement(BetaAcceptedEmail, { fullName: 'Test', seatNumber: 1, passUrl: 'https://test' })),
      await render(React.createElement(BetaWaitlistEmail, { fullName: 'Test', waitlistPosition: 1, referralUrl: 'https://test' })),
      await render(React.createElement(BetaPromotedEmail, { fullName: 'Test', seatNumber: 1, passUrl: 'https://test' })),
    ];

    for (const html of templates) {
      // Must use exact brand spelling FitKarma
      expect(html).toContain('FitKarma');
      expect(html).not.toMatch(/Fit\s+Karma/i);
      // Dark theme background #0D0F12
      expect(html).toContain('#0D0F12');
      // DPDP Act compliance note
      expect(html).toContain('DPDP Act Compliant');
    }
  });
});
