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

export interface BetaVerificationEmailProps {
  fullName: string;
  verificationUrl: string;
  locale?: 'en' | 'hi';
}

export function BetaVerificationEmail({
  fullName = 'Health Enthusiast',
  verificationUrl = 'https://fitkarma.in/auth/verify?token=sample',
  locale = 'en',
}: BetaVerificationEmailProps) {
  const isHindi = locale === 'hi';

  const previewText = isHindi
    ? 'FitKarma VIP बीटा के लिए अपना ईमेल सत्यापित करें'
    : 'Verify your email to secure your FitKarma VIP Beta seat';

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Brand Header */}
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
                ? 'FitKarma VIP बीटा प्रोग्राम में रुचि दिखाने के लिए धन्यवाद। हमारी 1,000 विशेष VIP बीटा सीटों में से अपनी सीट आरक्षित करने के लिए कृपया नीचे दिए गए बटन पर क्लिक करके अपना ईमेल सत्यापित करें:'
                : 'Thank you for signing up for the FitKarma VIP Beta. To claim your spot among our strictly capped 1,000 Phase 1 early adopters, please verify your email address below:'}
            </Text>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={verificationUrl}>
                {isHindi ? 'ईमेल सत्यापित करें और सीट सुरक्षित करें' : 'Verify Email & Claim Seat'}
              </Button>
            </Section>

            <Text style={expiryNotice}>
              {isHindi
                ? '⏱️ यह सत्यापन लिंक 24 घंटों के लिए वैध है। सुरक्षा कारणों से यह केवल एक बार उपयोग किया जा सकता है।'
                : '⏱️ This verification link is valid for 24 hours and can only be used once for security.'}
            </Text>

            <Text style={alternativeLinkText}>
              {isHindi
                ? 'यदि बटन काम नहीं करता है, तो इस लिंक को अपने ब्राउज़र में कॉपी और पेस्ट करें:'
                : 'If the button does not work, copy and paste this URL into your browser:'}
            </Text>
            <Text style={urlText}>
              <Link href={verificationUrl} style={linkStyle}>{verificationUrl}</Link>
            </Text>
          </Section>

          <Hr style={hrStyle} />

          {/* Security & Legal Footer */}
          <Section style={footerSection}>
            <Text style={footerNotice}>
              {isHindi
                ? 'यदि आपने यह अनुरोध नहीं किया था, तो कृपया इस ईमेल को अनदेखा करें। आपका ईमेल हमारे डेटाबेस में सुरक्षित रहेगा।'
                : 'If you did not request this, you can safely ignore this email. No seat will be reserved without verification.'}
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

export default BetaVerificationEmail;

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

const buttonContainer: React.CSSProperties = {
  textAlign: 'center' as const,
  margin: '28px 0',
};

const primaryButton: React.CSSProperties = {
  backgroundColor: '#36C96A',
  color: '#0D0F12',
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '10px',
  display: 'inline-block',
  boxShadow: '0 4px 14px rgba(54, 201, 106, 0.35)',
};

const expiryNotice: React.CSSProperties = {
  fontSize: '13px',
  color: '#9CA3AF',
  backgroundColor: '#0D0F12',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #1F2937',
  margin: '0 0 20px 0',
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
  color: '#36C96A',
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

