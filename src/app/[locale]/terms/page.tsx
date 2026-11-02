import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FileText, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#36C96A]/10 via-[#D6A84B]/5 to-transparent rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181D] border border-white/10 text-xs font-semibold text-[#D6A84B] shadow-inner mb-6">
            <FileText className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t('title')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="mt-4 text-xs text-slate-400 font-mono">
            {t('lastUpdated')}
          </div>
        </div>

        {/* Essential Medical Disclaimer Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1A1815] border border-amber-500/30 shadow-xl mb-12">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{t('disclaimer.title')}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('disclaimer.text')}
          </p>
        </div>

        {/* Detailed Terms Sections */}
        <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              1. {t('s1.title')}
            </h3>
            <p>{t('s1.p1')}</p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              2. {t('s2.title')}
            </h3>
            <p>{t('s2.p1')}</p>
            <p className="text-slate-400">{t('s2.p2')}</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              3. {t('s3.title')}
            </h3>
            <p>{t('s3.p1')}</p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              4. {t('s4.title')}
            </h3>
            <p>{t('s4.p1')}</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              5. {t('s5.title')}
            </h3>
            <p>{t('s5.p1')}</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#14181F] border border-white/10">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#36C96A]" />
              <span>6. {t('s6.title')}</span>
            </h3>
            <p className="text-xs">{t('s6.p1')}</p>
          </section>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <Link href="/privacy" className="text-[#36C96A] hover:underline">
            Read Privacy Notice (DPDP) →
          </Link>
        </div>
      </div>
    </div>
  );
}

