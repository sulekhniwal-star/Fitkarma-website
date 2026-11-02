'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IndianMealSandbox } from '@/components/simulators/IndianMealSandbox';
import { DailyIntelligencePackage } from '@/components/simulators/DailyIntelligencePackage';
import { FoodScannerSimulator } from '@/components/simulators/FoodScannerSimulator';

export type SimulatorTab = 'meal_sandbox' | 'dip' | 'food_scanner';

export function SimulatorsShowcase() {
  const t = useTranslations('simulators');
  const [activeTab, setActiveTab] = useState<SimulatorTab>('meal_sandbox');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Tab Switcher Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setActiveTab('meal_sandbox')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'meal_sandbox'
                ? 'bg-gradient-to-r from-[#D6A84B] to-[#F59E0B] text-black shadow-lg shadow-[#D6A84B]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('tabs.meal_sandbox')}
          </button>
          <button
            onClick={() => setActiveTab('dip')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'dip'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('tabs.dip')}
          </button>
          <button
            onClick={() => setActiveTab('food_scanner')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'food_scanner'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('tabs.food_scanner')}
          </button>
        </div>
      </div>

      {/* Active Simulator Display */}
      <div className="transition-all duration-300">
        {activeTab === 'meal_sandbox' && <IndianMealSandbox />}
        {activeTab === 'dip' && <DailyIntelligencePackage />}
        {activeTab === 'food_scanner' && <FoodScannerSimulator />}
      </div>
    </div>
  );
}

