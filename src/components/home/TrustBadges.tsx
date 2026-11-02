'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Lock, Award } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const t = useTranslations('home.trust');

  const badges = [
    {
      icon: ShieldCheck,
      title: t('dpdp.title'),
      desc: t('dpdp.desc'),
    },
    {
      icon: Lock,
      title: t('zeroMonetization.title'),
      desc: t('zeroMonetization.desc'),
    },
    {
      icon: Award,
      title: t('icmr.title'),
      desc: t('icmr.desc'),
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-14 px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5 hover:border-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#36C96A]/10 border border-[#36C96A]/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#36C96A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustBadges;

