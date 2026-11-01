import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { ShieldCheck, Mail, ArrowLeft, Lock, Database, Clock } from "lucide-react";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyNoticePage({ params }: PrivacyPageProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === "hi" ? "hi" : "en";
  const isHindi = locale === "hi";

  return (
    <div className="min-h-screen bg-[#0D0F12] text-white font-sans selection:bg-brand-green selection:text-[#0D0F12]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/85 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Image
              src="/brand/fitkarma-mark.svg"
              alt="FitKarma"
              width={28}
              height={28}
              priority
            />
            <span className="font-bold text-lg tracking-tight text-white">
              Fit<span className="text-brand-green">Karma</span>
            </span>
          </Link>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isHindi ? "मुख्य पृष्ठ पर लौटें" : "Back to Home"}</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        {/* Document Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green tracking-wider uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection (DPDP) Notice • v1.0.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {isHindi ? "गोपनीयता नीति एवं सूचना" : "Privacy Notice & Data Protection"}
          </h1>
          <p className="text-sm text-brand-muted">
            {isHindi
              ? "अंतिम अद्यतन: 30 अक्टूबर 2026 • संस्करण: v1.0.0"
              : "Last updated: 30 October 2026 • Version: v1.0.0"}
          </p>
        </div>

        {/* Notice Body */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1: Who We Are */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">01.</span>
              <span>{isHindi ? "डेटा नियंत्रक (Data Fiduciary)" : "1. Who is Collecting Your Information"}</span>
            </h2>
            <p>
              {isHindi
                ? "यह गोपनीयता सूचना FitKarma Technologies Private Limited (पंजीकृत कार्यालय: बैंगलोर, कर्नाटक, भारत) द्वारा जारी की गई है। हम भारत के डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) नियमों के तहत आपके व्यक्तिगत डेटा के लिए उत्तरदायी डेटा फिड्यूशरी हैं।"
                : "This Privacy Notice is issued by FitKarma Technologies Private Limited (registered office: Bangalore, Karnataka, India). We act as the Data Fiduciary responsible for processing your personal data in connection with the FitKarma pre-launch beta programme."}
            </p>
            <div className="p-4 rounded-xl bg-[#14181D] border border-white/10 text-xs text-brand-muted flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-green shrink-0" />
              <span>
                {isHindi
                  ? "गोपनीयता एवं शिकायत अधिकारी: sulekhniwal@gmail.com"
                  : "Privacy & Grievance Contact: sulekhniwal@gmail.com"}
              </span>
            </div>
          </section>

          {/* Section 2: Data Minimisation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">02.</span>
              <span>{isHindi ? "डेटा न्यूनीकरण का सिद्धांत" : "2. Strict Data Minimisation"}</span>
            </h2>
            <p>
              {isHindi
                ? "हम केवल वही जानकारी एकत्र करते हैं जो आपके बीटा आवेदन को सत्यापित करने, सीट आवंटित करने और ईमेल द्वारा संचार करने के लिए अनिवार्य है:"
                : "We collect only what is strictly necessary to verify your beta application, allocate a seat, and communicate via email:"}
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li><strong>{isHindi ? "पूरा नाम: " : "Full Name: "}</strong>{isHindi ? "व्यक्तिगत पहचान एवं संवाद के लिए।" : "To address you personally."}</li>
              <li><strong>{isHindi ? "ईमेल पता: " : "Email Address: "}</strong>{isHindi ? "सत्यापन एवं आवश्यक बीटा सूचनाओं का एकमात्र माध्यम।" : "Our sole communication channel for verification and service notices."}</li>
              <li><strong>{isHindi ? "प्राथमिक रुचियाँ: " : "Feature Priorities: "}</strong>{isHindi ? "यह समझने के लिए कि आप कौन सी सुविधाओं को सबसे पहले चाहते हैं।" : "To gauge aggregate demand for features under development."}</li>
              <li><strong>{isHindi ? "डिवाइस प्लेटफ़ॉर्म एवं भाषा (वैकल्पिक): " : "Device Platform & Language (Optional): "}</strong>{isHindi ? "Android/iOS और हिन्दी/अंग्रेजी अनुकूलन हेतु।" : "To ensure build compatibility and language preference."}</li>
            </ul>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isHindi
                  ? "हम विपणन वेबसाइट पर कोई भी फ़ोन नंबर, चिकित्सा इतिहास, स्वास्थ्य निदान, बायोमेट्रिक डेटा या सटीक लोकेशन एकत्र नहीं करते हैं।"
                  : "We do NOT collect phone numbers, health records, medical diagnoses, biometric data, or precise geolocation on this pre-launch marketing site."}
              </span>
            </div>
          </section>

          {/* Section 3: Purpose of Processing */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">03.</span>
              <span>{isHindi ? "डेटा प्रसंस्करण का उद्देश्य" : "3. Purpose of Processing"}</span>
            </h2>
            <p>
              {isHindi
                ? "आपकी व्यक्तिगत जानकारी का उपयोग केवल निम्नलिखित निर्दिष्ट उद्देश्यों के लिए किया जाता है:"
                : "Your personal data is processed solely for the following specified purposes:"}
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-300">
              <li>{isHindi ? "बीटा आवेदन स्वीकार करना और एकमुश्त ईमेल सत्यापन लिंक भेजना।" : "Receiving beta registrations and dispatching one-time verification tokens."}</li>
              <li>{isHindi ? "Phase 1 में 1,000 सत्यापित स्थानों का पारदर्शी एवं स्वचालित आवंटन (FIFO)।" : "Enforcing the 1,000-seat Phase 1 atomic capacity invariant (FIFO order)."}</li>
              <li>{isHindi ? "Phase 1 भर जाने के बाद Phase 2 प्रतीक्षा सूची का संचालन।" : "Operating the Phase 2 waitlist once Phase 1 capacity is reached."}</li>
              <li>{isHindi ? "बीटा एक्सेस शुरू होने पर आवश्यक सेवा सूचनाएँ भेजना।" : "Sending essential onboarding notices when beta builds become available."}</li>
              <li>{isHindi ? "अपरिवर्तनीय सुरक्षा ऑडिट और बॉट-रोधी सुरक्षा की समीक्षा।" : "Security auditing, abuse mitigation, and bot mitigation."}</li>
            </ol>
            <p className="text-xs text-brand-muted">
              {isHindi
                ? "वैकल्पिक प्रचार सम्मति को आवश्यक बीटा सेवा संदेशों से पूरी तरह अलग रखा गया है। प्रचार संदेशों के लिए आपकी स्पष्ट और स्वैच्छिक सहमति आवश्यक है।"
                : "Optional marketing communications are strictly segregated from essential beta transactional notices. Marketing consent is never pre-ticked."}
            </p>
          </section>

          {/* Section 4: Third-Party Subprocessors */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">04.</span>
              <span>{isHindi ? "डेटा प्रोसेसर एवं सेवा प्रदाता" : "4. Subprocessors & Infrastructure"}</span>
            </h2>
            <p>
              {isHindi
                ? "हम आपकी जानकारी को किसी तृतीय पक्ष को बेचते नहीं हैं। सेवा संचालन हेतु हम निम्नलिखित अनुबंध-बद्ध सेवा प्रदाताओं का उपयोग करते हैं:"
                : "We do not sell your personal data. We engage vetted technology subprocessors under strict data protection agreements:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#14181D] border border-white/5">
                <span className="text-xs font-bold text-white block mb-1">Supabase</span>
                <span className="text-[11px] text-brand-muted">{isHindi ? "डेटाबेस, RLS सुरक्षा एवं प्रमाणीकरण" : "Encrypted database, RLS & Auth"}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14181D] border border-white/5">
                <span className="text-xs font-bold text-white block mb-1">Resend</span>
                <span className="text-[11px] text-brand-muted">{isHindi ? "लेन-देन संबंधी सत्यापन ईमेल" : "Transactional email delivery"}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14181D] border border-white/5">
                <span className="text-xs font-bold text-white block mb-1">Vercel</span>
                <span className="text-[11px] text-brand-muted">{isHindi ? "एज होस्टिंग और वेब इंफ्रास्ट्रक्चर" : "Edge hosting & HTTPS delivery"}</span>
              </div>
            </div>
          </section>

          {/* Section 5: Retention & Deletion Schedule */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">05.</span>
              <span>{isHindi ? "डेटा संरक्षण एवं विलोपन नीति" : "5. Retention & Deletion Schedule"}</span>
            </h2>
            <div className="space-y-2">
              <div className="p-4 rounded-xl bg-[#14181D] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{isHindi ? "अपुष्ट आवेदन (Unverified Applications)" : "Unverified Applications"}</span>
                </div>
                <p className="text-xs text-brand-muted">
                  {isHindi
                    ? "ईमेल सत्यापन टोकन 24 घंटे के बाद समाप्त हो जाता है। अपुष्ट रिकॉर्ड्स को 7 दिनों के बाद स्वचालित रूप से हटा दिया जाता है।"
                    : "Verification links expire after 24 hours. Unverified draft records are purged after 7 days."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14181D] border border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <Database className="w-3.5 h-3.5 text-brand-green" />
                  <span>{isHindi ? "बीटा प्रतिभागी (Phase 1 स्वीकृत एवं Phase 2 प्रतीक्षा सूची)" : "Active Beta Participants"}</span>
                </div>
                <p className="text-xs text-brand-muted">
                  {isHindi
                    ? "सत्यापित डेटा बीटा परीक्षण की अवधि तक या उपयोगकर्ता द्वारा आवेदन वापस लेने तक सुरक्षित रखा जाता है।"
                    : "Retained for the duration of the beta programme or until a withdrawal request is processed."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: User Rights & Grievance Redressal */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">06.</span>
              <span>{isHindi ? "आपके अधिकार एवं सहमति वापसी" : "6. Your Rights & Consent Withdrawal"}</span>
            </h2>
            <p>
              {isHindi
                ? "DPDP नियमों के अंतर्गत आपको अपनी व्यक्तिगत जानकारी तक पहुँचने, उसमें सुधार करने या सहमति वापस लेने का पूर्ण अधिकार है:"
                : "Under Indian DPDP principles, you maintain full control over your personal data:"}
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>{isHindi ? "आवेदन वापस लेना या डेटा विलोपन: आप किसी भी समय sulekhniwal@gmail.com पर ईमेल भेज सकते हैं।" : "Right to withdraw your application or request complete deletion by emailing sulekhniwal@gmail.com."}</li>
              <li>{isHindi ? "Decision D-029 के तहत, यदि कोई Phase 1 प्रतिभागी अपनी सीट वापस लेता है, तो प्रतीक्षा सूची के सबसे पहले सत्यापित आवेदक को उसकी जगह स्वचालित पदोन्नत किया जाता है।" : "Under Decision D-029, withdrawing a Phase 1 seat automatically promotes the earliest verified waitlist applicant."}</li>
              <li>{isHindi ? "शिकायत निवारण: हमारे नामित शिकायत अधिकारी sulekhniwal@gmail.com 48 घंटों के भीतर आपके अनुरोध का उत्तर देंगे।" : "Grievance redressal: Requests to sulekhniwal@gmail.com receive an initial response within 48 business hours."}</li>
            </ul>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            © {new Date().getFullYear()} FitKarma Technologies Private Limited.
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors underline underline-offset-4">
              {isHindi ? "बीटा नियम व शर्तें" : "Beta Terms of Service"}
            </Link>
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {isHindi ? "मुख्य पृष्ठ" : "Home"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
