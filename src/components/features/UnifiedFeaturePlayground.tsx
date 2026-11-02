'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import {
  type FeatureKey,
  type FeatureCategory,
  FEATURE_GUIDES,
} from '@/lib/features/feature-definitions';
import { FeatureSimulators } from '@/components/simulators/FeatureSimulators';
import {
  Compass,
  ChevronDown,
  ArrowRight,
  Layers,
} from 'lucide-react';

export function UnifiedFeaturePlayground() {
  const locale = useLocale();
  const isHindi = locale === 'hi';

  const [activeFeature, setActiveFeature] = useState<FeatureKey>('meal_sandbox');

  const guide = FEATURE_GUIDES[activeFeature];

  // Category labels for grouped select
  const categoryLabels: Record<FeatureCategory, { en: string; hi: string }> = {
    nutrition: { en: '1. Indian Nutrition & Portions', hi: '1. भारतीय पोषण व कटोरी माप' },
    logging: { en: '2. Zero-Friction Logging (WhatsApp & Vision)', hi: '2. सुगम लॉगिंग (व्हाट्सएप व विज़न)' },
    metabolic: { en: '3. Metabolic Intelligence & Health Rails', hi: '3. मेटाबोलिक व स्वास्थ्य' },
    family: { en: '4. Family & Women’s Health', hi: '4. परिवार व महिला स्वास्थ्य' },
    privacy: { en: '5. Data Sovereignty & DPDP Compliance', hi: '5. डेटा संप्रभुता (DPDP)' },
  };

  const getStatusBadge = (status: 'p0' | 'p1' | 'p2') => {
    if (status === 'p0') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          {isHindi ? 'P0 • बीटा परीक्षण में' : 'P0 • In Beta Testing'}
        </span>
      );
    }
    if (status === 'p1') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D6A84B]/15 text-[#D6A84B] border border-[#D6A84B]/30">
          {isHindi ? 'P1 • रोलआउट जारी' : 'P1 • Rolling Out'}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
        {isHindi ? 'P2 • रोडमैप' : 'P2 • Planned'}
      </span>
    );
  };

  return (
    <div className="w-full relative space-y-8">
      {/* ======================================================== */}
      {/* SINGLE UNIFIED DROPDOWN SELECTOR (CONTROLS BOTH SIDES)    */}
      {/* ======================================================== */}
      <div className="flex flex-col items-center justify-center space-y-2.5 max-w-xl mx-auto">
        <label
          htmlFor="unified-feature-select"
          className="text-xs font-mono font-bold text-[#D6A84B] uppercase tracking-wider flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>
            {isHindi ? 'फीचर व सिमुलेटर का चयन करें:' : 'Select Feature & Simulator to Explore:'}
          </span>
        </label>

        <div className="relative w-full">
          <select
            id="unified-feature-select"
            value={activeFeature}
            onChange={(e) => setActiveFeature(e.target.value as FeatureKey)}
            className="w-full appearance-none px-5 py-3.5 pr-11 rounded-2xl bg-[#16191E] border-2 border-[#D6A84B]/50 text-sm sm:text-base font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-[#D6A84B] shadow-[0_10px_35px_rgba(214,168,75,0.15)] cursor-pointer transition-all hover:border-[#D6A84B]"
          >
            {(['nutrition', 'logging', 'metabolic', 'family', 'privacy'] as FeatureCategory[]).map(
              (category) => (
                <optgroup
                  key={category}
                  label={isHindi ? categoryLabels[category].hi : categoryLabels[category].en}
                  className="bg-[#12151B] text-[#D6A84B] font-bold"
                >
                  {Object.values(FEATURE_GUIDES)
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        className="bg-[#16191E] text-white py-1 font-medium"
                      >
                        {isHindi ? item.titleHi : item.titleEn}
                      </option>
                    ))}
                </optgroup>
              )
            )}
          </select>
          <ChevronDown className="w-5 h-5 text-[#D6A84B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2-COLUMN SPLIT: LEFT (GUIDE) | RIGHT (STICKY SIMULATOR)   */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: IN-DEPTH FEATURE GUIDE */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#14181E] border border-white/10 shadow-2xl space-y-6">
            {/* Guide Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#D6A84B] uppercase tracking-wider">
                  {isHindi ? guide.tagHi : guide.tagEn} • {isHindi ? guide.badgeHi : guide.badgeEn}
                </span>
                {getStatusBadge(guide.status)}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isHindi ? guide.titleHi : guide.titleEn}
              </h2>

              <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed">
                {isHindi ? guide.overviewHi : guide.overviewEn}
              </p>
            </div>

            {/* Why This Matters for India */}
            <div className="p-4 rounded-2xl bg-[#D6A84B]/10 border border-[#D6A84B]/20 space-y-1">
              <span className="text-xs font-bold text-[#D6A84B] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {isHindi ? 'भारत के लिए यह क्यों महत्वपूर्ण है:' : 'Why This Matters for India:'}
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">
                {isHindi ? guide.whyIndiaFirstHi : guide.whyIndiaFirstEn}
              </p>
            </div>

            {/* Step-by-Step Usage Guide */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                {isHindi ? 'चरण-दर-चरण उपयोग मार्गदर्शिका:' : 'Step-by-Step How-To Guide:'}
              </span>

              {guide.steps.map((step) => (
                <div key={step.stepNumber} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-xl bg-white/10 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-white/15">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isHindi ? step.titleHi : step.titleEn}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hint pointing to simulator on right */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>
                {isHindi
                  ? 'दाएं सिम्युलेटर में इसे तुरंत टेस्ट करें'
                  : 'Test this live in the simulator to your right'}
              </span>
              <ArrowRight className="w-4 h-4 animate-pulse shrink-0" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY SIMULATOR CONTROLLED BY THE SAME DROPDOWN */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 z-20 space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-4">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {isHindi ? 'लाइव सिमुलेटर' : 'Live Interactive Simulator'}
                </span>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {isHindi ? guide.titleHi : guide.titleEn}
              </span>
            </div>

            {/* Active Simulation View */}
            <div className="transition-all duration-300">
              <FeatureSimulators featureKey={activeFeature} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
