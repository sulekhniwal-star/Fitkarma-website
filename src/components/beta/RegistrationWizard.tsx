'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Apple, Smartphone, Check, Sparkles, AlertCircle, ArrowRight, ArrowLeft, Mail, RefreshCw } from 'lucide-react';

interface RegistrationFormData {
  fullName: string;
  email: string;
  devicePlatform: 'ios' | 'android' | 'both';
  healthGoals: string[];
  featurePriorities: string[];
  otherFeatureText: string;
  acceptPrivacyNotice: boolean;
  acceptBetaTerms: boolean;
  marketingConsent: boolean;
  website_url: string; // Honeypot
}

export function RegistrationWizard() {
  const t = useTranslations('beta.form');
  const locale = useLocale();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    devicePlatform: 'android',
    healthGoals: [],
    featurePriorities: [],
    otherFeatureText: '',
    acceptPrivacyNotice: false,
    acceptBetaTerms: false,
    marketingConsent: false,
    website_url: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  // Resend cooldown timer
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const goals = [
    { id: 'weight_loss', label: t('goal_weight_loss'), icon: '🥗' },
    { id: 'muscle_gain', label: t('goal_muscle_gain'), icon: '💪' },
    { id: 'gut_health', label: t('goal_gut_health'), icon: '🌿' },
    { id: 'energy', label: t('goal_energy'), icon: '⚡' },
    { id: 'habit_consistency', label: t('goal_habit_consistency'), icon: '🎯' },
  ];

  const features = [
    { id: 'indian_nutrition', label: t('feature_indian_nutrition'), icon: '🍛' },
    { id: 'dip_intelligence', label: t('feature_dip_intelligence'), icon: '🧠' },
    { id: 'photo_logging', label: t('feature_photo_logging'), icon: '📸' },
    { id: 'voice_logging', label: t('feature_voice_logging'), icon: '🎙️' },
    { id: 'health_sync', label: t('feature_health_sync'), icon: '⌚' },
    { id: 'family_wellness', label: t('feature_family_wellness'), icon: '👨‍👩‍👧' },
  ];

  function toggleGoal(id: string) {
    setFormData((prev) => {
      const exists = prev.healthGoals.includes(id);
      return {
        ...prev,
        healthGoals: exists ? prev.healthGoals.filter((g) => g !== id) : [...prev.healthGoals, id],
      };
    });
    if (errors.healthGoals) {
      setErrors((prev) => ({ ...prev, healthGoals: '' }));
    }
  }

  function toggleFeature(id: string) {
    setFormData((prev) => {
      const exists = prev.featurePriorities.includes(id);
      return {
        ...prev,
        featurePriorities: exists ? prev.featurePriorities.filter((f) => f !== id) : [...prev.featurePriorities, id],
      };
    });
  }

  function validateStep1(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = locale === 'hi' ? 'कृपया कम से कम 2 अक्षरों का नाम दर्ज करें' : 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = locale === 'hi' ? 'कृपया एक मान्य ईमेल पता दर्ज करें' : 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: Record<string, string> = {};
    if (formData.healthGoals.length === 0) {
      newErrors.healthGoals = locale === 'hi' ? 'कृपया कम से कम एक स्वास्थ्य लक्ष्य चुनें' : 'Please select at least one health goal';
    }
    if (!formData.acceptPrivacyNotice) {
      newErrors.acceptPrivacyNotice = locale === 'hi' ? 'गोपनीयता सूचना स्वीकार करना अनिवार्य है' : 'You must accept the Privacy Notice';
    }
    if (!formData.acceptBetaTerms) {
      newErrors.acceptBetaTerms = locale === 'hi' ? 'बीटा शर्तों को स्वीकार करना अनिवार्य है' : 'You must accept the Beta Terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/beta/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferredLanguage: locale === 'hi' ? 'hi' : 'en',
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({ form: locale === 'hi' ? 'बहुत सारे अनुरोध। कृपया कुछ समय प्रतीक्षा करें।' : 'Too many requests. Please wait before trying again.' });
        } else {
          setErrors({ form: resData.message || (locale === 'hi' ? 'पंजीकरण विफल रहा' : 'Registration failed') });
        }
        setSubmitting(false);
        return;
      }

      setSubmittedEmail(formData.email);
      setCooldownSeconds(60);
    } catch {
      setErrors({ form: locale === 'hi' ? 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।' : 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (cooldownSeconds > 0 || !submittedEmail || resending) return;

    setResending(true);
    setResendMessage(null);

    try {
      const response = await fetch('/api/beta/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        setCooldownSeconds(60);
        setResendMessage(locale === 'hi' ? 'सत्यापन लिंक पुनः भेजा गया!' : 'Verification link resent!');
      } else if (response.status === 429) {
        setCooldownSeconds(data.waitSeconds || 60);
      }
    } catch {
      setResendMessage(locale === 'hi' ? 'पुनः भेजने में विफल' : 'Failed to resend');
    } finally {
      setResending(false);
    }
  }

  // --- Success View ---
  if (submittedEmail) {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#14181D]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl text-center">
        <div className="w-16 h-16 bg-[#36C96A]/10 border border-[#36C96A]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-[#36C96A] animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {t('success_title')}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          {t('success_description', { email: submittedEmail })}
        </p>

        <div className="bg-[#0D0F12] border border-white/5 rounded-xl p-4 mb-6 text-xs text-gray-400">
          ⏱️ {locale === 'hi' ? 'यह सत्यापन लिंक 24 घंटे के लिए वैध है। सुरक्षा कारणों से इसका केवल एक बार उपयोग किया जा सकता है।' : 'Verification link is valid for 24 hours. Single-use only for security.'}
        </div>

        {resendMessage && (
          <div className="mb-4 text-xs font-semibold text-[#36C96A]">
            {resendMessage}
          </div>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldownSeconds > 0 || resending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:border-[#36C96A]/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
          {cooldownSeconds > 0
            ? t('resend_countdown', { seconds: cooldownSeconds })
            : t('resend_button')}
        </button>
      </div>
    );
  }

  // --- Interactive Wizard Form ---
  return (
    <div className="w-full max-w-xl mx-auto bg-[#14181D]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          <span>{step === 1 ? t('step1_title') : t('step2_title')}</span>
          <span className="text-[#36C96A]">Step {step} of 2</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#36C96A] to-[#65C94B] transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {errors.form && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Invisible Honeypot Field */}
        <input
          type="text"
          name="website_url"
          value={formData.website_url}
          onChange={(e) => setFormData((prev) => ({ ...prev, website_url: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only opacity-0 pointer-events-none absolute"
          aria-hidden="true"
        />

        {step === 1 && (
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t('name_label')} <span className="text-[#36C96A]">*</span>
              </label>
              <input
                type="text"
                placeholder={t('name_placeholder')}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                className="w-full px-4 py-3 bg-[#0D0F12] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#36C96A] transition placeholder-gray-600"
              />
              {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t('email_label')} <span className="text-[#36C96A]">*</span>
              </label>
              <input
                type="email"
                placeholder={t('email_placeholder')}
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className="w-full px-4 py-3 bg-[#0D0F12] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#36C96A] transition placeholder-gray-600"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Smartphone Platform 3-way toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t('device_label')} <span className="text-[#36C96A]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'android', label: t('device_android'), icon: Smartphone },
                  { id: 'ios', label: t('device_ios'), icon: Apple },
                  { id: 'both', label: t('device_both'), icon: Sparkles },
                ].map(({ id, label, icon: Icon }) => {
                  const isActive = formData.devicePlatform === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, devicePlatform: id as 'ios' | 'android' | 'both' }))}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition ${
                        isActive
                          ? 'bg-[#36C96A]/10 border-[#36C96A] text-white shadow-[0_0_15px_rgba(54,201,106,0.2)]'
                          : 'bg-[#0D0F12] border-white/5 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-[#36C96A]' : 'text-gray-400'}`} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#36C96A] to-[#65C94B] text-[#0D0F12] font-bold text-sm shadow-[0_4px_14px_rgba(54,201,106,0.35)] hover:brightness-110 active:scale-[0.99] transition"
            >
              <span>{t('next_button')}</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Health Goals */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t('goals_label')} <span className="text-[#36C96A]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {goals.map(({ id, label, icon }) => {
                  const isSelected = formData.healthGoals.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleGoal(id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-[#36C96A]/15 border border-[#36C96A] text-white shadow-[0_0_12px_rgba(54,201,106,0.25)]'
                          : 'bg-[#0D0F12] border border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#36C96A]" />}
                    </button>
                  );
                })}
              </div>
              {errors.healthGoals && <p className="mt-1.5 text-xs text-red-400">{errors.healthGoals}</p>}
            </div>

            {/* Feature Priorities */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                {t('features_label')}
              </label>
              <div className="flex flex-wrap gap-2">
                {features.map(({ id, label, icon }) => {
                  const isSelected = formData.featurePriorities.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleFeature(id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-[#36C96A]/15 border border-[#36C96A] text-white shadow-[0_0_12px_rgba(54,201,106,0.25)]'
                          : 'bg-[#0D0F12] border border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#36C96A]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional other routine */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                {t('other_feature_label')}
              </label>
              <input
                type="text"
                placeholder={t('other_feature_placeholder')}
                value={formData.otherFeatureText}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherFeatureText: e.target.value }))}
                className="w-full px-4 py-2.5 bg-[#0D0F12] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#36C96A] transition placeholder-gray-600"
              />
            </div>

            {/* DPDP Consents */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.acceptPrivacyNotice}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, acceptPrivacyNotice: e.target.checked }));
                    if (errors.acceptPrivacyNotice) setErrors((prev) => ({ ...prev, acceptPrivacyNotice: '' }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-700 bg-[#0D0F12] text-[#36C96A] focus:ring-0 focus:ring-offset-0 accent-[#36C96A]"
                />
                <span className="text-xs text-gray-300 leading-normal">
                  {t('privacy_consent')} <span className="text-[#36C96A]">*</span>
                </span>
              </label>
              {errors.acceptPrivacyNotice && <p className="text-xs text-red-400 ml-7">{errors.acceptPrivacyNotice}</p>}

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData((prev) => ({ ...prev, marketingConsent: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 rounded border-gray-700 bg-[#0D0F12] text-[#36C96A] focus:ring-0 focus:ring-offset-0 accent-[#36C96A]"
                />
                <span className="text-xs text-gray-400 leading-normal">
                  {t('marketing_consent')}
                </span>
              </label>
            </div>

            {/* Step 2 Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:border-white/20 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('back_button')}</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#36C96A] to-[#65C94B] text-[#0D0F12] font-bold text-sm shadow-[0_4px_14px_rgba(54,201,106,0.35)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>{t('submitting')}</span>
                ) : (
                  <>
                    <span>{t('submit_button')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

