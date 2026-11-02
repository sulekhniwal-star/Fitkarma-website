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

export interface BetaWaitlistEmailProps {
  fullName: string;
  waitlistPosition: number;
  referralUrl: string;
  locale?: 'en' | 'hi';
}

export function BetaWaitlistEmail({
  fullName = 'Future Beta Member',
  waitlistPosition = 127,
  referralUrl = 'https://fitkarma.in/beta?ref=sample',
  locale = 'en',
}: BetaWaitlistEmailProps) {
  const isHindi = locale === 'hi';
  const formattedPosition = `#${waitlistPosition}`;

  const previewText = isHindi
    ? `आप FitKarma Phase 2 प्रतीक्षा सूची में हैं (स्थान ${formattedPosition})`
    : `You're on the FitKarma Phase 2 Waitlist — Position ${formattedPosition}`;

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
              {isHindi ? `नमस्ते ${fullName},` : `Hello ${fullName},`}
            </Heading>
            <Text style={paragraphStyle}>
              {isHindi
                ? 'आपका ईमेल सत्यापित कर लिया गया है। हमारे चरण 1 के सभी 1,000 VIP बीटा स्थान भर चुके हैं। आपको आधिकारिक FitKarma चरण 2 प्रतीक्षा सूची में स्थान दिया गया है।'
                : 'Your email has been verified. All 1,000 Phase 1 VIP Beta seats have been claimed. You have been placed on the official FitKarma Phase 2 Waitlist.'}
            </Text>

            {/* Waitlist Position Badge */}
            <Section style={waitlistBadgeContainer}>
              <Text style={badgeLabel}>
                {isHindi ? 'आपकी वर्तमान प्रतीक्षा सूची स्थिति' : 'CURRENT WAITLIST POSITION'}
              </Text>
              <Text style={badgeNumber}>{formattedPosition}</Text>
              <Text style={badgeSubtext}>
                {isHindi ? 'चरण 2 कतार · स्वचालित FIFO पदोन्नति' : 'Phase 2 Queue · Automatic FIFO Promotion'}
              </Text>
            </Section>

            {/* Explanation of promotion */}
            <Section style={infoSection}>
              <Text style={infoHeading}>
                {isHindi ? 'पदोन्नति कैसे काम करती है:' : 'How Auto-Promotion Works:'}
              </Text>
              <Text style={infoItem}>
                🔄 <strong>{isHindi ? 'स्वतः पदोन्नति:' : 'Instant Seat Backfill:'}</strong> {isHindi ? 'जब भी कोई चरण 1 सदस्य नाम वापस लेता है, कतार में सबसे पहला व्यक्ति स्वतः उनकी सीट ले लेता है।' : 'Whenever an existing Phase 1 VIP member withdraws, their seat is automatically reassigned to the next verified person in queue.'}
              </Text>
              <Text style={infoItem}>
                📬 <strong>{isHindi ? 'ईमेल अलर्ट:' : 'Priority Email Alert:'}</strong> {isHindi ? 'सीट आवंटित होते ही आपको तुरंत एक पुष्टिकरण ईमेल और आपका VIP पास प्राप्त होगा।' : 'You will receive an immediate notification email with your VIP Beta Pass badge the moment a seat opens.'}
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={referralUrl}>
                {isHindi ? 'अपनी कतार स्थिति देखें' : 'Check Live Queue Position'}
              </Button>
            </Section>

            <Text style={alternativeLinkText}>
              {isHindi ? 'अपनी लाइव स्थिति देखने के लिए लिंक:' : 'Direct link to check your status:'}
            </Text>
            <Text style={urlText}>
              <Link href={referralUrl} style={linkStyle}>{referralUrl}</Link>
            </Text>
          </Section>

          <Hr style={hrStyle} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerNotice}>
              {isHindi
                ? 'FitKarma भारत के स्वास्थ्य डेटा सुरक्षा (DPDP अधिनियम) का सम्मान करता है। आपका डेटा तीसरे पक्ष को नहीं बेचा जाता है।'
                : 'FitKarma respects Indian data privacy laws (DPDP Act). Your data is never sold or shared with advertisers.'}
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

export default BetaWaitlistEmail;

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

const waitlistBadgeContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  backgroundColor: '#0D0F12',
  border: '1px solid #3B82F6',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 0 28px 0',
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
};

const badgeLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  color: '#60A5FA',
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

const infoSection: React.CSSProperties = {
  backgroundColor: '#0F1216',
  borderRadius: '10px',
  padding: '18px 20px',
  border: '1px solid #1F2937',
  margin: '0 0 28px 0',
};

const infoHeading: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#60A5FA',
  margin: '0 0 12px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const infoItem: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#D1D5DB',
  margin: '0 0 8px 0',
};

const buttonContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  margin: '28px 0 20px 0',
};

const primaryButton: React.CSSProperties = {
  backgroundColor: '#3B82F6',
  color: '#FFFFFF',
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '10px',
  display: 'inline-block',
  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
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
  color: '#60A5FA',
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

