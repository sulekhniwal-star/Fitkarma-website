'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Utensils, Clock, MessageSquare, Shield, ArrowRight } from 'lucide-react';

export const PillarsPreview: React.FC = () => {
  const t = useTranslations('home.pillars');

  const pillars = [
    {
      id: 'nutrition',
      icon: Utensils,
      badgeColor: 'border-[#36C96A]/30 text-[#36C96A] bg-[#36C96A]/10',
      title: t('nutrition.title'),
      desc: t('nutrition.desc'),
      status: t('nutrition.status'),
      tag: 'Pillar 01',
    },
    {
      id: 'dip',
      icon: Clock,
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      title: t('dip.title'),
      desc: t('dip.desc'),
      status: t('dip.status'),
      tag: 'Pillar 02',
    },
    {
      id: 'interfaces',
      icon: MessageSquare,
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      title: t('interfaces.title'),
      desc: t('interfaces.desc'),
      status: t('interfaces.status'),
      tag: 'Pillar 03',
    },
    {
      id: 'privacy',
      icon: Shield,
      badgeColor: 'border-[#D6A84B]/30 text-[#D6A84B] bg-[#D6A84B]/10',
      title: t('privacy.title'),
      desc: t('privacy.desc'),
      status: t('privacy.status'),
      tag: 'Pillar 04',
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#36C96A] block mb-2">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('heading')}
          </h2>
        </div>

        <Link
          href="/features"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#36C96A] hover:text-[#65C94B] transition-colors group cursor-pointer"
        >
          <span>{t('viewAllFeatures')}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((pillar) => {
          const IconComponent = pillar.icon;
          return (
            <Link
              key={pillar.id}
              href="/features"
              className="group relative p-6 sm:p-7 rounded-3xl bg-[#13171D] hover:bg-[#181E26] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-[#36C96A]" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${pillar.badgeColor}`}>
                    {pillar.status}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  {pillar.tag}
                </span>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#36C96A] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                <span>{t('interactiveSimHint')}</span>
                <ArrowRight className="w-4 h-4 text-[#36C96A] -translate-x-1 group-hover:translate-x-0 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PillarsPreview;

