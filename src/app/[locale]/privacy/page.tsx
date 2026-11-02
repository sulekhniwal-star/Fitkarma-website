import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#36C96A]/10 via-[#65C94B]/5 to-transparent rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181D] border border-white/10 text-xs font-semibold text-[#36C96A] shadow-inner mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
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

        {/* DPDP Act 2023 Core Trust Summary Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17221A] to-[#12161D] border border-[#36C96A]/20 shadow-xl mb-12">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#36C96A]" />
            <span>{t('summary.title')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0 mt-0.5" />
              <span>{t('summary.point1')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0 mt-0.5" />
              <span>{t('summary.point2')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0 mt-0.5" />
              <span>{t('summary.point3')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0 mt-0.5" />
              <span>{t('summary.point4')}</span>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
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
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li>{t('s2.item1')}</li>
              <li>{t('s2.item2')}</li>
              <li>{t('s2.item3')}</li>
              <li>{t('s2.item4')}</li>
            </ul>
            <p className="text-white font-medium">{t('s2.minimizationNote')}</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              3. {t('s3.title')}
            </h3>
            <p>{t('s3.p1')}</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
              <li>{t('s3.item1')}</li>
              <li>{t('s3.item2')}</li>
              <li>{t('s3.item3')}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              4. {t('s4.title')}
            </h3>
            <p>{t('s4.p1')}</p>
          </section>

          {/* Section 5: Data Principal Rights */}
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-tight">
              5. {t('s5.title')}
            </h3>
            <p>{t('s5.p1')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#14181F] border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">
                  {t('s5.right1_title')}
                </h4>
                <p className="text-xs text-slate-400">
                  {t('s5.right1_desc')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#14181F] border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">
                  {t('s5.right2_title')}
                </h4>
                <p className="text-xs text-slate-400">
                  {t('s5.right2_desc')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#14181F] border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">
                  {t('s5.right3_title')}
                </h4>
                <p className="text-xs text-slate-400">
                  {t('s5.right3_desc')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#14181F] border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">
                  {t('s5.right4_title')}
                </h4>
                <p className="text-xs text-slate-400">
                  {t('s5.right4_desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Grievance Redressal */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#14181F] border border-white/10">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#36C96A]" />
              <span>6. {t('s6.title')}</span>
            </h3>
            <p className="text-xs">{t('s6.p1')}</p>
            <div className="text-xs font-mono text-[#36C96A] pt-1">
              Email: dpo@fitkarma.in
            </div>
          </section>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <Link href="/terms" className="text-[#36C96A] hover:underline">
            Read Beta Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}

