import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export default function FaqPage() {
  const t = useTranslations('faq');
  const common = useTranslations('common');

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#36C96A]/10 via-[#65C94B]/10 to-transparent rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181D] border border-white/10 text-xs font-semibold text-[#65C94B] shadow-inner mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('eyebrow')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t('headingPart1')}{' '}
            <span className="bg-gradient-to-r from-[#36C96A] via-[#65C94B] to-[#D6A84B] bg-clip-text text-transparent">
              {t('headingHighlight')}
            </span>
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('subtext')}
          </p>
        </div>

        {/* Accordion Component */}
        <FaqAccordion />

        {/* Still Have Questions Card */}
        <div className="mt-16 p-8 rounded-3xl bg-[#13171D] border border-white/10 text-center space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-[#36C96A]/10 border border-[#36C96A]/20 flex items-center justify-center mx-auto text-[#36C96A]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {t('supportCard.title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {t('supportCard.desc')}
          </p>
          <div className="pt-2">
            <Link
              href="/beta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#36C96A] hover:bg-[#65C94B] text-slate-950 font-bold px-7 py-3 text-sm transition-all duration-200 shadow-md shadow-[#36C96A]/20 hover:scale-105 cursor-pointer"
            >
              <span>{common('primaryCta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

