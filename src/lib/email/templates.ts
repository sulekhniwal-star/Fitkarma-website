import { Locale } from "@/i18n/config";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
  locale: Locale;
}

export function renderVerificationEmail({
  name,
  verificationUrl,
  locale,
}: VerificationEmailProps): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(name || "there");
  const isHindi = locale === "hi";

  const subject = isHindi
    ? "FitKarma बीटा के लिए अपना ईमेल सत्यापित करें"
    : "Verify your email for the FitKarma beta";

  const text = isHindi
    ? `नमस्ते ${safeName},\n\nFitKarma बीटा कार्यक्रम में आवेदन करने के लिए धन्यवाद। अपना आवेदन पूरा करने के लिए नीचे दिए गए लिंक से ईमेल पता सत्यापित करें:\n\n${verificationUrl}\n\nयह लिंक व्यक्तिगत है, एक बार ही उपयोग किया जा सकता है।\n\n— FitKarma टीम`
    : `Hi ${safeName},\n\nThanks for applying to the FitKarma beta programme. Please verify your email address using the link below to complete your application:\n\n${verificationUrl}\n\nThis link is personal, one-time use and expires after the configured period.\n\n— Team FitKarma`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0D0F12; color: #F8FAFC; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: bold; color: #FFFFFF;">Fit<span style="color: #65C94B;">Karma</span></span>
      </div>
      <h1 style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 16px;">${subject}</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin-bottom: 24px;">
        ${isHindi ? `नमस्ते ${safeName},` : `Hi ${safeName},`}<br/><br/>
        ${isHindi
          ? "FitKarma बीटा कार्यक्रम में आवेदन करने के लिए धन्यवाद। अपना आवेदन पूरा करने के लिए नीचे दिए गए बटन से ईमेल पता सत्यापित करें:"
          : "Thanks for applying to the FitKarma beta programme. Please verify your email address using the button below to complete your application:"}
      </p>
      <div style="margin-bottom: 28px;">
        <a href="${verificationUrl}" style="background-color: #65C94B; color: #0D0F12; padding: 12px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 9999px; display: inline-block;">
          ${isHindi ? "मेरा ईमेल सत्यापित करें" : "Verify my email"}
        </a>
      </div>
      <p style="font-size: 13px; line-height: 1.5; color: #64748B; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
        ${isHindi
          ? "यह लिंक व्यक्तिगत है, एक बार ही उपयोग किया जा सकता है। यदि आपने यह अनुरोध नहीं किया है, तो इस ईमेल को अनदेखा कर सकते हैं।"
          : "This link is personal, one-time use and expires after 24 hours. If you did not request this, you can ignore this email."}
        <br/><br/>
        — ${isHindi ? "FitKarma टीम" : "Team FitKarma"}
      </p>
    </div>
  `;

  return { subject, html, text };
}

export interface Phase1AcceptedEmailProps {
  name: string;
  referenceId: string;
  locale: Locale;
}

export function renderPhase1AcceptedEmail({
  name,
  referenceId,
  locale,
}: Phase1AcceptedEmailProps): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(name || "there");
  const isHindi = locale === "hi";

  const subject = isHindi
    ? "आपका स्वागत है — FitKarma Phase 1 बीटा"
    : "You're in — FitKarma Phase 1 beta";

  const text = isHindi
    ? `नमस्ते ${safeName},\n\nआपका ईमेल सत्यापित हो गया है और FitKarma Phase 1 बीटा में आपका स्थान पक्का हो गया है।\n\nसंदर्भ नंबर: ${referenceId}\n\nबीटा एक्सेस शुरू होने और अगले चरणों की जानकारी हम आपको ईमेल से भेजेंगे।\n\n— FitKarma टीम`
    : `Hi ${safeName},\n\nYour email has been verified and your application has secured a place in FitKarma Phase 1 beta.\n\nYour reference: ${referenceId}\n\nWe'll email you with next steps when your beta access is ready.\n\n— Team FitKarma`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0D0F12; color: #F8FAFC; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: bold; color: #FFFFFF;">Fit<span style="color: #65C94B;">Karma</span></span>
      </div>
      <h1 style="font-size: 20px; font-weight: 700; color: #65C94B; margin-bottom: 16px;">${subject}</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin-bottom: 20px;">
        ${isHindi ? `नमस्ते ${safeName},` : `Hi ${safeName},`}<br/><br/>
        ${isHindi
          ? "आपका ईमेल सत्यापित हो गया है और FitKarma Phase 1 बीटा में आपका स्थान पक्का हो गया है।"
          : "Your email has been verified and your application has secured a place in FitKarma Phase 1 beta."}
      </p>
      <div style="background-color: #14181D; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
        <span style="font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Reference Identifier</span>
        <div style="font-size: 16px; font-weight: 700; color: #FFFFFF; font-family: monospace; margin-top: 4px;">${referenceId}</div>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin-bottom: 24px;">
        ${isHindi
          ? "बीटा एक्सेस शुरू होने और अगले चरणों की जानकारी हम आपको ईमेल से भेजेंगे। बीटा कार्यक्रम के दौरान FitKarma की सुविधाएँ चरणों में शुरू और बेहतर की जाएँगी।"
          : "We'll email you with the next steps when your beta access is ready. FitKarma capabilities will be introduced and improved in stages during the beta programme."}
      </p>
      <p style="font-size: 13px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
        — ${isHindi ? "FitKarma टीम" : "Team FitKarma"}
      </p>
    </div>
  `;

  return { subject, html, text };
}

export interface Phase2WaitlistEmailProps {
  name: string;
  locale: Locale;
}

export function renderPhase2WaitlistEmail({
  name,
  locale,
}: Phase2WaitlistEmailProps): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(name || "there");
  const isHindi = locale === "hi";

  const subject = isHindi
    ? "आप FitKarma Phase 2 प्रतीक्षा सूची में हैं"
    : "You're on the FitKarma Phase 2 waitlist";

  const text = isHindi
    ? `नमस्ते ${safeName},\n\nआपका ईमेल सत्यापित हो गया है। Phase 1 की 1,000 स्थानों की सीमा पूरी हो चुकी है, इसलिए आपका आवेदन FitKarma Phase 2 की प्रतीक्षा सूची में जोड़ दिया गया है।\n\nPhase 2 शुरू होने पर हम आपको ईमेल करेंगे।\n\n— FitKarma टीम`
    : `Hi ${safeName},\n\nYour email is verified. Phase 1 has reached its 1,000-place limit, so we've added your application to the FitKarma Phase 2 waitlist.\n\nWe'll email you when Phase 2 opens.\n\n— Team FitKarma`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0D0F12; color: #F8FAFC; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 24px; font-weight: bold; color: #FFFFFF;">Fit<span style="color: #65C94B;">Karma</span></span>
      </div>
      <h1 style="font-size: 20px; font-weight: 700; color: #D6A84B; margin-bottom: 16px;">${subject}</h1>
      <p style="font-size: 15px; line-height: 1.6; color: #94A3B8; margin-bottom: 20px;">
        ${isHindi ? `नमस्ते ${safeName},` : `Hi ${safeName},`}<br/><br/>
        ${isHindi
          ? "आपका ईमेल सत्यापित हो गया है। Phase 1 की 1,000 स्थानों की सीमा पूरी हो चुकी है, इसलिए आपका आवेदन FitKarma Phase 2 की प्रतीक्षा सूची में जोड़ दिया गया है।"
          : "Your email is verified. Phase 1 has reached its 1,000-place limit, so we've added your application to the FitKarma Phase 2 waitlist."}
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin-bottom: 24px;">
        ${isHindi
          ? "Phase 2 के आवेदन या निमंत्रण शुरू होने पर हम आपको ईमेल करेंगे। यह प्रतीक्षा सूची की पुष्टि है, Phase 1 बीटा स्थान की पुष्टि नहीं।"
          : "We'll email you when Phase 2 applications or invitations open. This is a waitlist confirmation, not a Phase 1 beta seat."}
      </p>
      <p style="font-size: 13px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
        — ${isHindi ? "FitKarma टीम" : "Team FitKarma"}
      </p>
    </div>
  `;

  return { subject, html, text };
}
