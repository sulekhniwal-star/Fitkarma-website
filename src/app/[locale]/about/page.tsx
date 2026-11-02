import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  UtensilsCrossed,
  Clock,
  MessageSquare,
  Lock,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';

export default function AboutPage() {
  const t = useTranslations('about');
  const common = useTranslations('common');

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#36C96A]/10 via-[#65C94B]/10 to-[#D6A84B]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Eyebrow */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181D] border border-white/10 text-xs font-semibold text-[#65C94B] shadow-inner mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('eyebrow')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {t('headingPart1')}{' '}
            <span className="bg-gradient-to-r from-[#36C96A] via-[#65C94B] to-[#D6A84B] bg-clip-text text-transparent">
              {t('headingHighlight')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('subtext')}
          </p>
        </div>

        {/* The FitKarma Manifesto Card */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#181D24] to-[#111418] border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#36C96A]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#36C96A]/10 border border-[#36C96A]/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#36C96A]" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t('manifesto.title')}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>{t('manifesto.p1')}</p>
            <p>{t('manifesto.p2')}</p>
            <p className="text-white font-semibold pt-2">{t('manifesto.p3')}</p>
          </div>
        </div>

        {/* The 4 Architectural Pillars Deep Dive */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              {t('pillars.sectionTitle')}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              {t('pillars.sectionSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-[#14181E] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#36C96A]/10 border border-[#36C96A]/20 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-[#36C96A]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#36C96A] uppercase tracking-wider block mb-1">
                  Pillar 01
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('pillars.p1.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t('pillars.p1.desc')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-[#14181E] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  Pillar 02
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('pillars.p2.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t('pillars.p2.desc')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-[#14181E] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Pillar 03
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('pillars.p3.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t('pillars.p3.desc')}
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-[#14181E] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#D6A84B]/10 border border-[#D6A84B]/20 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-[#D6A84B]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D6A84B] uppercase tracking-wider block mb-1">
                  Pillar 04
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('pillars.p4.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t('pillars.p4.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical AI & Medical Safety Standards */}
        <div className="p-8 rounded-3xl bg-[#12151A] border border-white/10 mb-16 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('standards.badge')}</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {t('standards.title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('standards.desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0" />
              <span>{t('standards.point1')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0" />
              <span>{t('standards.point2')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0" />
              <span>{t('standards.point3')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#36C96A] shrink-0" />
              <span>{t('standards.point4')}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#1B241E] via-[#141A20] to-[#12151B] border border-[#36C96A]/20 shadow-2xl relative">
          <div className="mb-4 flex justify-center">
            <FitKarmaMark size={48} className="drop-shadow-[0_0_16px_rgba(54,201,106,0.4)]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            {t('cta.title')}
          </h3>

          <p className="text-sm text-slate-300 max-w-md mx-auto mb-8">
            {t('cta.subtitle')}
          </p>

          <Link
            href="/beta"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#36C96A] hover:bg-[#65C94B] text-slate-950 font-bold px-8 py-3.5 text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#36C96A]/25 hover:scale-105 cursor-pointer"
          >
            <span>{common('primaryCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

