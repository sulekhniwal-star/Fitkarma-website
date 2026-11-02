'use client';

import React, { useState, useRef } from 'react';
import { useLocale } from 'next-intl';
import {
  type FeatureKey,
  type FeatureCategory,
  FEATURE_GUIDES,
} from '@/lib/features/feature-definitions';
import { FeatureSimulators } from '@/components/simulators/FeatureSimulators';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Compass,
} from 'lucide-react';

export function UnifiedFeaturePlayground() {
  const locale = useLocale();
  const isHindi = locale === 'hi';

  const [activeFeature, setActiveFeature] = useState<FeatureKey>('meal_sandbox');
  const [activeCategory, setActiveCategory] = useState<FeatureCategory | 'all'>('all');
  const leftGuideRef = useRef<HTMLDivElement>(null);

  const guide = FEATURE_GUIDES[activeFeature];

  // Category filter keys
  const categories: { id: FeatureCategory | 'all'; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Features', labelHi: 'सभी क्षमताएँ' },
    { id: 'nutrition', labelEn: 'Indian Nutrition', labelHi: 'भारतीय पोषण' },
    { id: 'logging', labelEn: 'Zero-Friction Logging', labelHi: 'सुगम लॉगिंग' },
    { id: 'metabolic', labelEn: 'Metabolic & Health Rails', labelHi: 'मेटाबोलिक व स्वास्थ्य' },
    { id: 'family', labelEn: 'Family & Women’s Health', labelHi: 'परिवार व महिला स्वास्थ्य' },
    { id: 'privacy', labelEn: 'Data Privacy (DPDP)', labelHi: 'डेटा गोपनीयता' },
  ];

  const filteredFeatures = Object.values(FEATURE_GUIDES).filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleFeatureSelect = (key: FeatureKey) => {
    setActiveFeature(key);
    // Smooth scroll guide into view on mobile
    if (window.innerWidth < 1024 && leftGuideRef.current) {
      leftGuideRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#D6A84B] to-[#F59E0B] text-black shadow-lg shadow-[#D6A84B]/20 font-bold'
                : 'bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {isHindi ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Main Split-Screen Architecture: Left (Features & In-Depth Guide) | Right (Simulator with Dropdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: FEATURES DIRECTORY & IN-DEPTH USER GUIDE     */}
        {/* ======================================================== */}
        <div ref={leftGuideRef} className="lg:col-span-6 space-y-6">
          {/* Quick Feature Switcher Strip */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
            <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
              {isHindi ? 'सभी उपलब्ध क्षमताएँ (चुनने के लिए क्लिक करें):' : 'Available Capabilities (Click to explore):'}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {filteredFeatures.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFeatureSelect(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center gap-1.5 ${
                    activeFeature === item.id
                      ? 'bg-white/15 text-white border border-white/30 font-semibold'
                      : 'bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeFeature === item.id ? 'bg-[#D6A84B]' : 'bg-gray-600'
                    }`}
                  />
                  <span>{isHindi ? item.titleHi : item.titleEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Expanded In-Depth Feature Guide Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#14181E] border border-[#D6A84B]/30 shadow-2xl space-y-6">
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

            {/* Prompt to Interact on the Right */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>{isHindi ? 'दाएं सिम्युलेटर में इसे तुरंत टेस्ट करें' : 'Test this live in the simulator to your right'}</span>
              <ArrowRight className="w-4 h-4 animate-pulse shrink-0" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: SINGLE STICKY SIMULATOR WITH DROPDOWN       */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 z-20 space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-4">
            {/* Top Bar with Dropdown Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {isHindi ? 'लाइव सिमुलेटर' : 'Live Interactive Simulator'}
                </span>
              </div>

              {/* Feature Dropdown Selector */}
              <div className="relative flex-1 sm:max-w-xs">
                <select
                  value={activeFeature}
                  onChange={(e) => handleFeatureSelect(e.target.value as FeatureKey)}
                  className="w-full appearance-none px-4 py-2 pr-9 rounded-xl bg-[#16191E] border border-[#D6A84B]/40 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-[#D6A84B] shadow-inner cursor-pointer"
                  aria-label="Select feature to test in simulator"
                >
                  {Object.values(FEATURE_GUIDES).map((item) => (
                    <option key={item.id} value={item.id} className="bg-[#12151B] text-white py-1">
                      {isHindi ? item.titleHi : item.titleEn}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#D6A84B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Simulator Interactive Canvas */}
            <div className="transition-all duration-300">
              <FeatureSimulators featureKey={activeFeature} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
