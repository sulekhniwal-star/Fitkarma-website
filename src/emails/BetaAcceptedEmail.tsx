import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components';

export interface BetaAcceptedEmailProps {
  fullName: string;
  seatNumber: number;
  passUrl: string;
  locale?: 'en' | 'hi';
}

export function BetaAcceptedEmail({
  fullName = 'VIP Early Adopter',
  seatNumber = 42,
  passUrl = 'https://fitkarma.in/beta/pass/sample',
  locale = 'en',
}: BetaAcceptedEmailProps) {
  const isHindi = locale === 'hi';
  const formattedSeat = `#${String(seatNumber).padStart(3, '0')}`;

  const previewText = isHindi
    ? `बधाई हो! आप FitKarma VIP बीटा में शामिल हैं (सीट ${formattedSeat})`
    : `You're in! Welcome to FitKarma VIP Beta — Seat ${formattedSeat}`;

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={brandLogo}>Fit<span style={{ color: '#36C96A' }}>Karma</span></Text>
            <Text style={brandTagline}>
              {isHindi ? "भारत का AI-संचालित फिटनेस और वेलनेस इकोसिस्टम" : "India's AI-Powered Fitness and Wellness Ecosystem"}
            </Text>
          </Section>

          {/* Main Card */}
          <Section style={cardSection}>
            <Heading style={headingStyle}>
              {isHindi ? `बधाई हो, ${fullName}!` : `Welcome to the Inner Circle, ${fullName}!`}
            </Heading>
            <Text style={paragraphStyle}>
              {isHindi
                ? 'आपका ईमेल सफलतापूर्वक सत्यापित हो गया है। आप भारत के पहले AI-संचालित समग्र स्वास्थ्य इकोसिस्टम के शीर्ष 1,000 सदस्यों में से एक बन गए हैं।'
                : 'Your email has been verified and your Phase 1 VIP Beta seat is officially confirmed. You are one of only 1,000 founding members across India.'}
            </Text>

            {/* VIP Seat Badge Showcase */}
            <Section style={badgeContainer}>
              <Text style={badgeLabel}>
                {isHindi ? 'आपकी आधिकारिक VIP सीट संख्या' : 'YOUR OFFICIAL VIP SEAT BADGE'}
              </Text>
              <Text style={badgeNumber}>{formattedSeat}</Text>
              <Text style={badgeSubtext}>
                {isHindi ? 'चरण 1 संस्थापक सदस्य · 1,000 में से' : 'Phase 1 Founding Member · Strictly Capped at 1,000'}
              </Text>
            </Section>

            {/* Privileges */}
            <Section style={perksSection}>
              <Text style={perksHeading}>
                {isHindi ? 'आपके प्रारंभिक सदस्य विशेषाधिकार:' : 'Your VIP Beta Privileges:'}
              </Text>
              <Text style={perkItem}>
                ✨ <strong>{isHindi ? 'भारतीय पोषण AI:' : 'Indian Nutrition AI:'}</strong> {isHindi ? 'रोटी, कटोरी और थाली के सटीक मैक्रोज़' : 'Precise home-cooked meal macros & regional thalis'}
              </Text>
              <Text style={perkItem}>
                ⚡ <strong>{isHindi ? 'दैनिक बुद्धिमत्ता पैकेज:' : 'Daily Intelligence Package:'}</strong> {isHindi ? 'प्रातःकालीन तत्परता स्कोर और वास्तविक समय सुझाव' : 'Morning readiness scores & actionable meal nudges'}
              </Text>
              <Text style={perkItem}>
                🔒 <strong>{isHindi ? 'DPDP अनुपालन गोपनीयता:' : 'DPDP-Compliant Privacy:'}</strong> {isHindi ? 'पूर्ण डेटा संप्रभुता और शून्य विज्ञापन' : 'Full data sovereignty with zero third-party ads'}
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={goldButton} href={passUrl}>
                {isHindi ? 'अपना डिजिटल VIP पास देखें और डाउनलोड करें' : 'View & Download VIP Beta Pass'}
              </Button>
            </Section>

            <Text style={alternativeLinkText}>
              {isHindi ? 'या सीधे इस लिंक से अपना पास देखें:' : 'Or access your pass directly at:'}
            </Text>
            <Text style={urlText}>
              <Link href={passUrl} style={linkStyle}>{passUrl}</Link>
            </Text>
          </Section>

          <Hr style={hrStyle} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerNotice}>
              {isHindi
                ? 'यह सीट आपके सत्यापित ईमेल से जुड़ी है। यदि आप इसे छोड़ना चाहते हैं, तो आप पास पृष्ठ से किसी भी समय नाम वापस ले सकते हैं।'
                : 'This VIP seat is tied to your verified email. You can view, save, or withdraw your reservation at any time from your pass page.'}
            </Text>
            <Text style={copyrightText}>
              © {new Date().getFullYear()} FitKarma Technologies Pvt. Ltd. DPDP Act Compliant.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default BetaAcceptedEmail;

const mainStyle: React.CSSProperties = {
  backgroundColor: '#0D0F12',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 0',
  color: '#FFFFFF',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '0 20px',
};

const headerSection: React.CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const brandLogo: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '800',
  letterSpacing: '-0.5px',
  color: '#FFFFFF',
  margin: '0 0 6px 0',
};

const brandTagline: React.CSSProperties = {
  fontSize: '13px',
  color: '#9CA3AF',
  margin: 0,
};

const cardSection: React.CSSProperties = {
  backgroundColor: '#14181D',
  borderRadius: '16px',
  border: '1px solid #222932',
  padding: '36px 32px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '700',
  color: '#FFFFFF',
  margin: '0 0 16px 0',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#D1D5DB',
  margin: '0 0 24px 0',
};

const badgeContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  backgroundColor: '#0D0F12',
  border: '2px solid #D6A84B',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 28px 0',
  boxShadow: '0 0 20px rgba(214, 168, 75, 0.15)',
};

const badgeLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  color: '#D6A84B',
  margin: '0 0 8px 0',
};

const badgeNumber: React.CSSProperties = {
  fontSize: '44px',
  fontWeight: '900',
  letterSpacing: '-1px',
  color: '#FFFFFF',
  margin: '0 0 6px 0',
  fontFamily: 'monospace, sans-serif',
};

const badgeSubtext: React.CSSProperties = {
  fontSize: '12px',
  color: '#9CA3AF',
  margin: 0,
};

const perksSection: React.CSSProperties = {
  backgroundColor: '#0F1216',
  borderRadius: '10px',
  padding: '18px 20px',
  border: '1px solid #1F2937',
  margin: '0 0 28px 0',
};

const perksHeading: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#36C96A',
  margin: '0 0 12px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const perkItem: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#D1D5DB',
  margin: '0 0 8px 0',
};

const buttonContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  margin: '28px 0 20px 0',
};

const goldButton: React.CSSProperties = {
  backgroundColor: '#D6A84B',
  color: '#0D0F12',
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '10px',
  display: 'inline-block',
  boxShadow: '0 4px 14px rgba(214, 168, 75, 0.35)',
};

const alternativeLinkText: React.CSSProperties = {
  fontSize: '12px',
  color: '#6B7280',
  margin: '0 0 6px 0',
};

const urlText: React.CSSProperties = {
  fontSize: '12px',
  wordBreak: 'break-all' as const,
  margin: 0,
};

const linkStyle: React.CSSProperties = {
  color: '#D6A84B',
  textDecoration: 'underline',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#1F2937',
  margin: '32px 0 20px 0',
};

const footerSection: React.CSSProperties = {
  textAlign: 'center' as const,
};

const footerNotice: React.CSSProperties = {
  fontSize: '12px',
  color: '#6B7280',
  lineHeight: '18px',
  margin: '0 0 12px 0',
};

const copyrightText: React.CSSProperties = {
  fontSize: '11px',
  color: '#4B5563',
  margin: 0,
};

