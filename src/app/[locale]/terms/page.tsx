import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { FileText, ArrowLeft, AlertCircle } from "lucide-react";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BetaTermsPage({ params }: TermsPageProps) {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold text-brand-accent tracking-wider uppercase mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>FitKarma Beta Agreement • v1.0.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {isHindi ? "बीटा कार्यक्रम नियम एवं शर्तें" : "Beta Programme Terms of Service"}
          </h1>
          <p className="text-sm text-brand-muted">
            {isHindi
              ? "अंतिम अद्यतन: 30 अक्टूबर 2026 • संस्करण: v1.0.0"
              : "Last updated: 30 October 2026 • Version: v1.0.0"}
          </p>
        </div>

        {/* Terms Body */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1: Nature of the Beta Programme */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">01.</span>
              <span>{isHindi ? "बीटा कार्यक्रम का स्वरूप एवं दायरा" : "1. Nature of the Beta Programme"}</span>
            </h2>
            <p>
              {isHindi
                ? "FitKarma बीटा कार्यक्रम एक पूर्व-लॉन्च तकनीकी परीक्षण कार्यक्रम है। Phase 1 में आवेदन करना और भाग लेना पूर्णतः निःशुल्क है। इसके लिए किसी अग्रिम भुगतान, क्रेडिट कार्ड या वाणिज्यिक सदस्यता की आवश्यकता नहीं है।"
                : "The FitKarma Beta Programme is a pre-release testing initiative. Applying for and participating in Phase 1 is completely free of charge. No upfront fee, payment card, or subscription purchase is required."}
            </p>
            <p>
              {isHindi
                ? "वाणिज्यिक योजनाएँ (जैसे Yogi Free और Karma Pro) केवल आधिकारिक सार्वजनिक लॉन्च के बाद ही शुरू की जाएँगी। बीटा प्रतिभागियों को विशेष पूर्व-अभिगम शर्तों का लाभ मिलेगा।"
                : "Commercial subscription plans (such as Yogi Free and Karma Pro) will only be introduced during subsequent launch phases. Verified beta participants will receive advance notice of official commercial terms."}
            </p>
          </section>

          {/* Section 2: Staged Capability Rollout */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">02.</span>
              <span>{isHindi ? "चरणबद्ध सुविधाओं का विकास (Staged Delivery)" : "2. Progressive Capability Rollout"}</span>
            </h2>
            <p>
              {isHindi
                ? "मास्टर दस्तावेज़ में वर्णित सभी क्षमताएँ (भारतीय पोषण, डेली इंटेलिजेंस, हेल्थ कनेक्ट/एप्पल हेल्थ एकीकरण, परिवार कल्याण) बीटा कार्यक्रम का हिस्सा हैं। यद्यपि, स्थिरता, सटीकता और सुरक्षा सुनिश्चित करने के लिए सुविधाओं को विभिन्न चरणों में सक्रिय किया जाएगा।"
                : "The complete feature inventory documented in the FitKarma specifications is intended for beta testers. However, capabilities are rolled out in staged releases to ensure precision, stability, and safety. Participation does not imply that every feature is active on day one."}
            </p>
            <div className="p-4 rounded-xl bg-[#14181D] border border-white/10 text-xs text-brand-muted">
              {isHindi
                ? "सुविधाओं की स्थिति 'In beta', 'Rolling out during beta', या 'Planned within the beta programme' के रूप में स्पष्ट रूप से चिह्नित रहेगी।"
                : "Features are transparently designated as 'In beta', 'Rolling out during beta', or 'Planned within the beta programme' in all release communications."}
            </div>
          </section>

          {/* Section 3: Non-Clinical Wellness Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">03.</span>
              <span>{isHindi ? "गैर-चिकित्सीय स्वास्थ्य परामर्श अस्वीकरण" : "3. Non-Clinical Wellness Disclaimer"}</span>
            </h2>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>{isHindi ? "महत्वपूर्ण चिकित्सीय अस्वीकरण: " : "Important Medical Disclaimer: "}</strong>
                {isHindi
                  ? "FitKarma एक जीवनशैली, पोषण एवं वेलनेस इंटेलिजेंस सहायक है। यह कोई नैदानिक (क्लिनिकल) या चिकित्सा सेवा नहीं है। FitKarma किसी बीमारी या चिकित्सा स्थिति का निदान, उपचार या रोकथाम नहीं करता है। किसी भी आहार या व्यायाम परिवर्तन से पूर्व प्रमाणित चिकित्सक से परामर्श अवश्य लें।"
                  : "FitKarma is an everyday fitness, nutrition, and wellness intelligence assistant. It is NOT a clinical, medical, or diagnostic service. FitKarma does not diagnose, treat, cure, or prevent any illness or medical condition. You must always consult a certified healthcare professional before making major dietary or physical activity changes."}
              </div>
            </div>
            <p className="text-xs text-brand-muted">
              {isHindi
                ? "आयुर्वेद और पारंपरिक जीवनशैली मार्गदर्शन केवल एक सांस्कृतिक वेलनेस संदर्भ के रूप में प्रस्तुत किए जाते हैं, नैदानिक निदान के रूप में नहीं।"
                : "Traditional Indian nutrition and Ayurvedic concepts are presented as cultural lifestyle recommendations, not as clinical therapy."}
            </p>
          </section>

          {/* Section 4: Capacity & Allocation Invariant */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">04.</span>
              <span>{isHindi ? "सीट आवंटन एवं FIFO नियम" : "4. Seat Allocation & Waitlist Policy"}</span>
            </h2>
            <p>
              {isHindi
                ? "Phase 1 में अधिकतम 1,000 स्वीकृत सीटें उपलब्ध हैं। आवंटन केवल सफल ईमेल सत्यापन के समय पर आधारित है (First-Come, First-Served)।"
                : "Phase 1 is strictly capped at a maximum of 1,000 verified accepted seats. Allocation ordering is determined solely by successful email verification time."}
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
              <li>{isHindi ? "1,000 सीटें पूरी होने के बाद सत्यापित आवेदक स्वचालित रूप से Phase 2 प्रतीक्षा सूची में जोड़े जाते हैं।" : "Once 1,000 verified places are filled, subsequent verified signups automatically enter the Phase 2 waitlist."}</li>
              <li>{isHindi ? "यदि कोई Phase 1 प्रतिभागी अपनी सीट वापस लेता है, तो Decision D-029 के अनुसार प्रतीक्षा सूची के सबसे पहले आवेदक को स्वतः पदोन्नत किया जाता है।" : "If a Phase 1 participant withdraws their seat, the earliest verified waitlist participant is automatically promoted (Decision D-029)."}</li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property & Feedback */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">05.</span>
              <span>{isHindi ? "बौद्धिक संपदा एवं आपकी प्रतिक्रिया" : "5. Intellectual Property & Feedback"}</span>
            </h2>
            <p>
              {isHindi
                ? "FitKarma के सभी ट्रेडमार्क, लोगो, सॉफ़्टवेयर कोड, डिज़ाइन और एल्गोरिदम FitKarma Technologies Private Limited की अनन्य बौद्धिक संपदा हैं।"
                : "All trademarks, logos, visual assets, software architecture, algorithms, and documentation are the exclusive intellectual property of FitKarma Technologies Private Limited."}
            </p>
            <p>
              {isHindi
                ? "बीटा परीक्षण के दौरान आपके द्वारा प्रदान किए गए सुझाव या फीडबैक का उपयोग FitKarma को बेहतर बनाने के लिए बिना किसी रॉयल्टी या दायित्व के किया जा सकता है।"
                : "Any suggestions, bug reports, or product feedback provided by you during the beta programme may be freely incorporated to improve the service without royalty or obligation."}
            </p>
          </section>

          {/* Section 6: Termination & Revocation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-brand-green font-mono">06.</span>
              <span>{isHindi ? "सीट वापसी एवं समाप्ति" : "6. Seat Revocation & Voluntary Withdrawal"}</span>
            </h2>
            <p>
              {isHindi
                ? "आप किसी भी समय sulekhniwal@gmail.com पर ईमेल भेजकर अपना बीटा आवेदन वापस ले सकते हैं। हम बॉट गतिविधि, धोखाधड़ी या नियमों के उल्लंघन की स्थिति में किसी भी सीट को निरस्त करने का अधिकार सुरक्षित रखते हैं।"
                : "You may withdraw your beta application or request deletion at any time by contacting sulekhniwal@gmail.com. We reserve the right to revoke beta seats in cases of abuse, bot automation, or violation of these terms."}
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            © {new Date().getFullYear()} FitKarma Technologies Private Limited.
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors underline underline-offset-4">
              {isHindi ? "गोपनीयता नीति" : "Privacy Notice"}
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
