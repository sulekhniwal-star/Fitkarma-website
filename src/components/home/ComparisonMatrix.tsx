'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, X, Shield, Sparkles } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const t = useTranslations('home.comparison');

  const rows = [
    {
      key: 'portions',
      westernTitle: t('rows.portions.westernTitle'),
      westernDesc: t('rows.portions.westernDesc'),
      fkTitle: t('rows.portions.fkTitle'),
      fkDesc: t('rows.portions.fkDesc'),
    },
    {
      key: 'logging',
      westernTitle: t('rows.logging.westernTitle'),
      westernDesc: t('rows.logging.westernDesc'),
      fkTitle: t('rows.logging.fkTitle'),
      fkDesc: t('rows.logging.fkDesc'),
    },
    {
      key: 'pulses',
      westernTitle: t('rows.pulses.westernTitle'),
      westernDesc: t('rows.pulses.westernDesc'),
      fkTitle: t('rows.pulses.fkTitle'),
      fkDesc: t('rows.pulses.fkDesc'),
    },
    {
      key: 'family',
      westernTitle: t('rows.family.westernTitle'),
      westernDesc: t('rows.family.westernDesc'),
      fkTitle: t('rows.family.fkTitle'),
      fkDesc: t('rows.family.fkDesc'),
    },
    {
      key: 'privacy',
      westernTitle: t('rows.privacy.westernTitle'),
      westernDesc: t('rows.privacy.westernDesc'),
      fkTitle: t('rows.privacy.fkTitle'),
      fkDesc: t('rows.privacy.fkDesc'),
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#36C96A]/10 border border-[#36C96A]/20 text-xs font-bold text-[#36C96A] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('badge')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {t('heading')}
        </h2>
        <p className="text-base text-slate-300 leading-relaxed">
          {t('subtext')}
        </p>
      </div>

      {/* Comparison Table / Grid */}
      <div className="rounded-3xl border border-white/10 bg-[#12151A] overflow-hidden shadow-2xl">
        {/* Table Column Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10 bg-[#161B22]">
          <div className="p-4 sm:p-6 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {t('typicalAppsHeader')}
            </span>
            <h3 className="text-lg font-bold text-slate-300">
              Generic Western Trackers
            </h3>
          </div>
          <div className="p-4 sm:p-6 text-center md:text-left bg-gradient-to-r from-[#16211A] to-[#121920]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#36C96A] block mb-1">
              {t('fitkarmaHeader')}
            </span>
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>FitKarma India-First Health OS</span>
              <span className="w-2 h-2 rounded-full bg-[#36C96A] animate-pulse" />
            </h3>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {rows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-1 md:grid-cols-2 hover:bg-white/[0.015] transition-colors"
            >
              {/* Typical Apps Side */}
              <div className="p-5 sm:p-6 md:border-r border-white/10 flex items-start gap-3.5 opacity-80">
                <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">
                    {row.westernTitle}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {row.westernDesc}
                  </p>
                </div>
              </div>

              {/* FitKarma Side */}
              <div className="p-5 sm:p-6 bg-[#36C96A]/[0.02] flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#36C96A]/20 border border-[#36C96A]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(54,201,106,0.3)]">
                  <Check className="w-3.5 h-3.5 text-[#36C96A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                    <span>{row.fkTitle}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {row.fkDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;

