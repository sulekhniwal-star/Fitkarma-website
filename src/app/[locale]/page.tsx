import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('hero');
  const common = useTranslations('common');

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#36C96A]/10 via-[#65C94B]/15 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181D] border border-white/10 text-xs font-semibold text-[#65C94B] shadow-inner mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('eyebrow')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#36C96A] animate-pulse" />
        </div>

        {/* Central visual anchor */}
        <div className="mb-6 flex justify-center">
          <div className="relative group p-4 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-2xl backdrop-blur-md">
            <FitKarmaMark size={72} className="drop-shadow-[0_0_24px_rgba(54,201,106,0.35)] transition-transform duration-300 group-hover:scale-105" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          {t('headingPart1')}{' '}
          <span className="bg-gradient-to-r from-[#36C96A] via-[#65C94B] to-[#D6A84B] bg-clip-text text-transparent">
            {t('headingHighlight')}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {t('description')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <Link
            href="/beta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#36C96A] hover:bg-[#65C94B] text-slate-950 font-bold px-8 py-3.5 text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#36C96A]/25 hover:shadow-[#36C96A]/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t('ctaButton')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#14181D] hover:bg-[#1B2228] border border-white/10 text-white font-semibold px-7 py-3.5 text-sm sm:text-base transition-all duration-200 hover:border-white/20 cursor-pointer"
          >
            <span>{t('exploreButton')}</span>
          </Link>
        </div>

        {/* Exclusivity Trust Indicator */}
        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[#D6A84B] font-semibold">
            <Flame className="w-4 h-4 text-[#D6A84B]" />
            <span>{common('exclusiveCohort')}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#36C96A]" />
            <span>DPDP Act 2025 Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

