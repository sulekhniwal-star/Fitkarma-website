import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { CinematicLaunchDevice } from '@/components/home/CinematicLaunchDevice';
import { LiveCohortTicker } from '@/components/home/LiveCohortTicker';
import { ComparisonMatrix } from '@/components/home/ComparisonMatrix';
import { PillarsPreview } from '@/components/home/PillarsPreview';
import { TrustBadges } from '@/components/home/TrustBadges';

export default function HomePage() {
  const t = useTranslations('hero');
  const common = useTranslations('common');

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Background radial studio glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#36C96A]/10 via-[#65C94B]/15 to-[#D6A84B]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Hero Header */}
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
            <FitKarmaMark
              size={64}
              className="drop-shadow-[0_0_24px_rgba(54,201,106,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
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

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
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
        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-400 mb-6">
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

      {/* Flagship Cinematic 3D Mobile Launch Device Reveal */}
      <CinematicLaunchDevice />

      {/* Live VIP Cohort Capacity Ticker */}
      <LiveCohortTicker initialAllocated={142} maxCapacity={1000} />

      {/* "Why India Needs FitKarma" Comparison Matrix */}
      <ComparisonMatrix />

      {/* 4-Pillar Health OS Preview */}
      <PillarsPreview />

      {/* Grounded Trust & Privacy Badges */}
      <TrustBadges />

      {/* Final Pre-Launch Beta Reservation CTA Card */}
      <div className="w-full max-w-4xl mx-auto my-12 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#1A231C] via-[#13181E] to-[#121419] border border-[#36C96A]/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D6A84B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-4 flex justify-center">
            <FitKarmaMark size={48} className="drop-shadow-[0_0_16px_rgba(54,201,106,0.4)]" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Reserve Your Place in Indian Health History
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Phase 1 is strictly capped at 1,000 accepted registrations with atomic database allocation. Once filled, subsequent applicants enter the Phase 2 waitlist.
          </p>

          <Link
            href="/beta"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#36C96A] hover:bg-[#65C94B] text-slate-950 font-bold px-8 py-3.5 text-base transition-all duration-200 shadow-xl shadow-[#36C96A]/25 hover:scale-105 cursor-pointer"
          >
            <span>{common('primaryCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
