'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Flame, ShieldCheck, ArrowRight, Users } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface LiveCohortTickerProps {
  initialAllocated?: number;
  maxCapacity?: number;
}

export const LiveCohortTicker: React.FC<LiveCohortTickerProps> = ({
  initialAllocated = 142,
  maxCapacity = 1000,
}) => {
  const t = useTranslations('home.cohortTicker');
  const remaining = Math.max(0, maxCapacity - initialAllocated);
  const percentage = Math.min(100, Math.round((initialAllocated / maxCapacity) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#181D24] via-[#12151A] to-[#0D1014] border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Subtle corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6A84B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#36C96A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Cohort details & status */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/20 text-xs font-bold text-[#D6A84B]">
              <Flame className="w-3.5 h-3.5 text-[#D6A84B] animate-bounce" />
              <span>{t('badge')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84B] animate-ping" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('heading', { count: remaining })}
            </h3>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {t('subtext')}
            </p>

            {/* Capacity Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Users className="w-3.5 h-3.5 text-[#36C96A]" />
                  {t('allocatedLabel', { current: initialAllocated, max: maxCapacity })}
                </span>
                <span className="text-[#D6A84B] font-mono font-bold">
                  {remaining} {t('seatsLeft')}
                </span>
              </div>

              <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#36C96A] via-[#65C94B] to-[#D6A84B] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Quick Action Pill */}
          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            <Link
              href="/beta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A84B] hover:bg-[#F4D477] text-slate-950 font-bold px-7 py-3 text-sm transition-all duration-200 shadow-lg shadow-[#D6A84B]/20 hover:scale-105 cursor-pointer"
            >
              <span>{t('ctaButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#36C96A]" />
              <span>{t('atomicGuarantee')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCohortTicker;

