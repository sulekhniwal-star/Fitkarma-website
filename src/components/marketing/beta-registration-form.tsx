"use client";

import React, { useState } from "react";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { FEATURE_INTEREST_OPTIONS, FeatureInterestId } from "@/lib/validation/application-schema";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

interface BetaRegistrationFormProps {
  locale: Locale;
  messages: Messages;
}

export function BetaRegistrationForm({ locale, messages: _messages }: BetaRegistrationFormProps) {
  const isHindi = locale === "hi";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureInterestId[]>([]);
  const [otherText, setOtherText] = useState("");
  const [platform, setPlatform] = useState<"android" | "ios" | "both" | "not_sure">("android");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleFeature(id: FeatureInterestId) {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      if (selectedFeatures.length >= 5) {
        setErrorMessage(
          isHindi
            ? "आप अधिकतम 5 सुविधाएँ चुन सकते हैं।"
            : "You can select up to 5 priority features."
        );
        return;
      }
      setErrorMessage(null);
      setSelectedFeatures([...selectedFeatures, id]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(isHindi ? "कृपया अपना पूरा नाम दर्ज करें।" : "Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(isHindi ? "कृपया एक मान्य ईमेल पता दर्ज करें।" : "Please enter a valid email address.");
      return;
    }

    if (selectedFeatures.length === 0) {
      setErrorMessage(
        isHindi
          ? "कृपया कम से कम एक ऐसी सुविधा चुनें जिसमें आपकी रुचि हो।"
          : "Please select at least one feature priority."
      );
      return;
    }

    if (!acceptPrivacy || !acceptTerms) {
      setErrorMessage(
        isHindi
          ? "पंजीकरण के लिए आपको गोपनीयता नीति और बीटा नियमों को स्वीकार करना होगा।"
          : "You must accept the Privacy Notice and Beta Terms to apply."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/beta/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          primaryFeatureInterests: selectedFeatures,
          otherFeatureInterestText: selectedFeatures.includes("other") ? otherText.trim() : null,
          devicePlatform: platform,
          preferredLanguage: locale,
          privacyNoticeVersion: "v1.0.0",
          acceptPrivacyNotice: true,
          betaTermsVersion: "v1.0.0",
          acceptBetaTerms: true,
          marketingConsent,
          websiteUrl: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccessMessage(data.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-fk-border bg-surface-1/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      {successMessage ? (
        <div className="py-8 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary mb-5">
            <CheckIcon className="h-7 w-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {isHindi ? "आवेदन दर्ज हुआ!" : "Application Received!"}
          </h3>
          <p className="mt-3 text-sm text-fk-textSecondary leading-relaxed max-w-md mx-auto">
            {successMessage}
          </p>
          <div className="mt-6 rounded-xl border border-fk-border bg-surface-2/80 p-4 text-xs text-fk-textMuted max-w-md mx-auto">
            {isHindi
              ? "ध्यान दें: स्थान का आवंटन 'पहले आओ, पहले पाओ' के आधार पर ईमेल सत्यापन पूरा करने के समय होता है। कृपया इनबॉक्स में सत्यापन बटन पर क्लिक करें।"
              : "Important: Phase 1 seats are allocated in real time when email verification is completed. Please click the link in your email to confirm your place."}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left border-b border-fk-border/60 pb-5">
            <h3 className="text-xl font-bold text-white">
              {isHindi ? "बीटा आवेदन पत्र" : "Apply for Beta Access"}
            </h3>
            <p className="mt-1 text-xs text-fk-textSecondary">
              {isHindi
                ? "अधिकतम 1,000 Phase 1 स्थान। सत्यापन के बाद पहले आओ, पहले पाओ के आधार पर आवंटन।"
                : "1,000 Phase 1 verified seats. Allocated first-come, first-served upon email verification."}
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Honeypot field for bot protection */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteUrl">Website URL</label>
            <input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-white mb-1.5">
                {isHindi ? "पूरा नाम" : "Full Name"} *
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isHindi ? "आपका नाम" : "e.g. Rahul Sharma"}
                className="w-full rounded-xl border border-fk-border bg-surface-2/90 px-3.5 py-2.5 text-sm text-white placeholder-fk-textMuted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white mb-1.5">
                {isHindi ? "ईमेल पता" : "Email Address"} *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isHindi ? "name@example.com" : "name@example.com"}
                className="w-full rounded-xl border border-fk-border bg-surface-2/90 px-3.5 py-2.5 text-sm text-white placeholder-fk-textMuted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-colors"
              />
            </div>
          </div>

          {/* Feature Priorities Multi-select */}
          <div className="text-left">
            <label className="block text-xs font-semibold text-white mb-1">
              {isHindi
                ? "आप FitKarma की किस सुविधा के लिए सबसे अधिक उत्सुक हैं? (1 से 5 चुनें)"
                : "Which FitKarma features are you most looking forward to? (Select 1 to 5)"} *
            </label>
            <p className="text-[11px] text-fk-textMuted mb-3">
              {isHindi
                ? "यह शोध आपके प्राथमिक हितों को समझने के लिए है। सभी सुविधाएँ चरणों में जारी की जाएँगी।"
                : "This helps prioritize our staged rollouts. Selected: " + selectedFeatures.length + "/5"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 border border-fk-border/50 rounded-xl p-3 bg-surface-2/50">
              {FEATURE_INTEREST_OPTIONS.map((opt) => {
                const isChecked = selectedFeatures.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleFeature(opt.id)}
                    className={`flex items-start gap-2.5 rounded-lg p-2 text-left transition-all border ${
                      isChecked
                        ? "bg-brand-primary/15 border-brand-primary/50 text-white"
                        : "bg-surface-1/40 border-fk-border/40 text-fk-textSecondary hover:border-fk-border hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border mt-0.5 ${
                        isChecked
                          ? "bg-brand-primary border-brand-primary text-canvas"
                          : "border-fk-border bg-surface-2"
                      }`}
                    >
                      {isChecked && <CheckIcon className="h-3 w-3" />}
                    </span>
                    <span className="text-xs leading-snug">
                      {isHindi ? opt.labelHi : opt.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedFeatures.includes("other") && (
              <div className="mt-3">
                <label htmlFor="otherText" className="block text-[11px] text-fk-textSecondary mb-1">
                  {isHindi ? "अन्य विवरण (अधिकतम 250 अक्षर)" : "Other explanation (max 250 chars)"}
                </label>
                <input
                  type="text"
                  id="otherText"
                  maxLength={250}
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder={
                    isHindi
                      ? "कृपया कोई संवेदनशील स्वास्थ्य जानकारी न लिखें"
                      : "Do not enter medical diagnoses or sensitive health details"
                  }
                  className="w-full rounded-xl border border-fk-border bg-surface-2 px-3 py-2 text-xs text-white placeholder-fk-textMuted focus:border-brand-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Device Platform */}
          <div className="text-left">
            <label className="block text-xs font-semibold text-white mb-1.5">
              {isHindi ? "पसंदीदा मोबाइल प्लेटफ़ॉर्म" : "Preferred Mobile Platform"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["android", "ios", "both"] as const).map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setPlatform(plat)}
                  className={`rounded-lg py-2 text-xs font-semibold capitalize border transition-all ${
                    platform === plat
                      ? "bg-surface-2 text-brand-primary border-brand-primary"
                      : "bg-surface-1/50 text-fk-textSecondary border-fk-border hover:border-fk-borderHover hover:text-white"
                  }`}
                >
                  {plat === "both" ? (isHindi ? "दोनों" : "Both") : plat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-3 pt-2 text-left text-xs text-fk-textSecondary border-t border-fk-border/60">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                className="mt-0.5 rounded border-fk-border bg-surface-2 text-brand-primary focus:ring-0"
              />
              <span>
                {isHindi
                  ? "मैंने FitKarma की गोपनीयता नीति पढ़ ली है और मैं सहमत हूँ।"
                  : "I have read and accept the FitKarma Privacy Notice."} *
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 rounded border-fk-border bg-surface-2 text-brand-primary focus:ring-0"
              />
              <span>
                {isHindi
                  ? "मैं FitKarma के बीटा कार्यक्रम के नियमों और शर्तों से सहमत हूँ।"
                  : "I agree to the FitKarma Beta Programme Terms."} *
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-fk-textMuted">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 rounded border-fk-border bg-surface-2 text-brand-primary focus:ring-0"
              />
              <span>
                {isHindi
                  ? "(वैकल्पिक) मुझे FitKarma की ओर से कभी-कभार नए अपडेट और जानकारियों के ईमेल भेजें।"
                  : "(Optional) Send me occasional news and updates regarding FitKarma."}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-canvas shadow-xl shadow-brand-primary/20 hover:bg-brand-primary/95 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>{isHindi ? "आवेदन भेजा जा रहा है..." : "Submitting application..."}</span>
              ) : (
                <>
                  <span>{isHindi ? "बीटा आवेदन पूरा करें" : "Complete Beta Application"}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[11px] text-fk-textMuted">
              {isHindi ? "कोई फ़ोन नंबर या स्वास्थ्य डेटा नहीं लिया जाता।" : "No phone numbers or medical data collected."}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
