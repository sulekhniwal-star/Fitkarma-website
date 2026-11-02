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

export interface BetaPromotedEmailProps {
  fullName: string;
  seatNumber: number;
  passUrl: string;
  locale?: 'en' | 'hi';
}

export function BetaPromotedEmail({
  fullName = 'VIP Member',
  seatNumber = 88,
  passUrl = 'https://fitkarma.in/beta/pass/sample',
  locale = 'en',
}: BetaPromotedEmailProps) {
  const isHindi = locale === 'hi';
  const formattedSeat = `#${String(seatNumber).padStart(3, '0')}`;

  const previewText = isHindi
    ? `शुभ समाचार! आपको FitKarma VIP बीटा में पदोन्नत किया गया है (सीट ${formattedSeat})`
    : `Great news! You've been promoted to FitKarma VIP Beta — Seat ${formattedSeat}`;

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
              {isHindi ? `शुभ समाचार, ${fullName}!` : `Great News, ${fullName}!`}
            </Heading>
            <Text style={paragraphStyle}>
              {isHindi
                ? 'चरण 1 में एक स्थान रिक्त हुआ है, और हमारी स्वचालित कतार प्रणाली (FIFO) के आधार पर आपको आधिकारिक तौर पर FitKarma चरण 1 VIP बीटा में पदोन्नत किया गया है!'
                : 'A Phase 1 VIP Beta seat has opened up! Because of your priority position on our verified waitlist, you have been automatically promoted to Phase 1 accepted status.'}
            </Text>

            {/* Reassigned Seat Badge */}
            <Section style={badgeContainer}>
              <Text style={badgeLabel}>
                {isHindi ? 'आपकी नई आवंटित VIP सीट संख्या' : 'YOUR NEW ALLOCATED VIP SEAT'}
              </Text>
              <Text style={badgeNumber}>{formattedSeat}</Text>
              <Text style={badgeSubtext}>
                {isHindi ? 'प्रतीक्षा सूची से पदोन्नत · 1,000 विशेष VIP सदस्यों में शामिल' : 'Promoted from Waitlist · Verified Phase 1 Founding Member'}
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={goldButton} href={passUrl}>
                {isHindi ? 'अपना VIP बीटा पास प्राप्त करें' : 'Claim Your VIP Beta Pass'}
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
                ? 'आपकी यह VIP सीट आरक्षित कर दी गई है। किसी भी प्रश्न के लिए हमारी सहायता टीम से संपर्क करें।'
                : 'Your VIP Beta seat is now active. If you have any questions, reach out to our beta team.'}
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

export default BetaPromotedEmail;

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

