'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { IndianMealSandbox } from '@/components/simulators/IndianMealSandbox';
import { DailyIntelligencePackage } from '@/components/simulators/DailyIntelligencePackage';
import { FoodScannerSimulator } from '@/components/simulators/FoodScannerSimulator';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export type FeatureIndex = 0 | 1 | 2;

export function InteractiveFeatureShowcase() {
  const t = useTranslations('features');
  const [activeFeature, setActiveFeature] = useState<FeatureIndex>(0);

  // References to the 3 feature cards on the right
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Scroll to a specific card when clicking navigation pills
  const scrollToCard = (index: FeatureIndex) => {
    setActiveFeature(index);
    const target = cardRefs[index].current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Intersection Observer to detect which card is currently in view as user scrolls
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute('data-feature-index');
          if (indexAttr !== null) {
            setActiveFeature(parseInt(indexAttr, 10) as FeatureIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.3,
    });

    cardRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full relative">
      {/* Quick Navigation Pill Switcher */}
      <div className="sticky top-20 z-30 flex justify-center pb-6 pointer-events-none">
        <div className="pointer-events-auto inline-flex p-1.5 rounded-2xl bg-[#12151B]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => scrollToCard(0)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFeature === 0
                ? 'bg-gradient-to-r from-[#D6A84B] to-[#F59E0B] text-black shadow-lg shadow-[#D6A84B]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_pills.nutrition')}
          </button>
          <button
            onClick={() => scrollToCard(1)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFeature === 1
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_pills.dip')}
          </button>
          <button
            onClick={() => scrollToCard(2)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFeature === 2
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_pills.scanner')}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        {/* LEFT COLUMN: FIXED / STICKY INTERACTIVE SIMULATION DEVICE (7 Cols on Desktop) */}
        <div className="lg:col-span-7 lg:sticky lg:top-36 z-20 transition-all duration-300">
          <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-2 sm:p-4 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            {/* Live Synchronized Simulation Container */}
            <div className="transition-opacity duration-300">
              {activeFeature === 0 && <IndianMealSandbox />}
              {activeFeature === 1 && <DailyIntelligencePackage />}
              {activeFeature === 2 && <FoodScannerSimulator />}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLABLE FEATURE EXPLANATION NARRATIVE (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-24 py-4">
          {/* Card 1: Indian Nutrition & Household Portions */}
          <div
            ref={cardRefs[0]}
            data-feature-index="0"
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 ${
              activeFeature === 0
                ? 'bg-[#14181E] border-[#D6A84B]/40 shadow-2xl shadow-[#D6A84B]/10 ring-1 ring-[#D6A84B]/20'
                : 'bg-black/20 border-white/5 opacity-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-[#D6A84B] uppercase tracking-wider">
                01 / 03 • {t('cards.nutrition.badge')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t('cards.nutrition.status')}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {t('cards.nutrition.title')}
            </h3>

            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              {t('cards.nutrition.description')}
            </p>

            {/* Feature Points */}
            <div className="space-y-4 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.nutrition.point1_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.nutrition.point1_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.nutrition.point2_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.nutrition.point2_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.nutrition.point3_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.nutrition.point3_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D6A84B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.nutrition.point4_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.nutrition.point4_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-[#D6A84B]/10 border border-[#D6A84B]/20 text-xs text-[#D6A84B] font-semibold flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 animate-pulse shrink-0" />
              <span>{t('cards.nutrition.interactive_hint')}</span>
            </div>
          </div>

          {/* Card 2: Daily Intelligence Package (DIP) */}
          <div
            ref={cardRefs[1]}
            data-feature-index="1"
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 ${
              activeFeature === 1
                ? 'bg-[#14181E] border-blue-500/40 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/20'
                : 'bg-black/20 border-white/5 opacity-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                02 / 03 • {t('cards.dip.badge')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t('cards.dip.status')}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {t('cards.dip.title')}
            </h3>

            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              {t('cards.dip.description')}
            </p>

            {/* Feature Points */}
            <div className="space-y-4 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.dip.point1_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.dip.point1_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.dip.point2_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.dip.point2_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.dip.point3_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.dip.point3_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.dip.point4_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.dip.point4_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 animate-pulse shrink-0" />
              <span>{t('cards.dip.interactive_hint')}</span>
            </div>
          </div>

          {/* Card 3: 3D AI Food Scanner */}
          <div
            ref={cardRefs[2]}
            data-feature-index="2"
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 ${
              activeFeature === 2
                ? 'bg-[#14181E] border-emerald-500/40 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                : 'bg-black/20 border-white/5 opacity-50'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                03 / 03 • {t('cards.scanner.badge')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t('cards.scanner.status')}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {t('cards.scanner.title')}
            </h3>

            <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              {t('cards.scanner.description')}
            </p>

            {/* Feature Points */}
            <div className="space-y-4 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.scanner.point1_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.scanner.point1_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.scanner.point2_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.scanner.point2_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.scanner.point3_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.scanner.point3_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t('cards.scanner.point4_title')}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {t('cards.scanner.point4_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 animate-pulse shrink-0" />
              <span>{t('cards.scanner.interactive_hint')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
