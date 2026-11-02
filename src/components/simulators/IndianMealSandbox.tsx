'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  calculateMealMacros,
  REGIONAL_THALI_PRESETS,
  type RegionalThaliId,
  type TadkaIntensity,
  type ThaliConfig,
} from '@/lib/simulators/meal-calculator';

export function IndianMealSandbox() {
  const t = useTranslations('simulators.meal_sandbox');

  const [activeRegion, setActiveRegion] = useState<RegionalThaliId>('north');
  const [config, setConfig] = useState<ThaliConfig>(
    REGIONAL_THALI_PRESETS.north.defaultConfig
  );

  const handleRegionChange = (regionId: RegionalThaliId) => {
    setActiveRegion(regionId);
    setConfig(REGIONAL_THALI_PRESETS[regionId].defaultConfig);
  };

  const macros = useMemo(() => {
    return calculateMealMacros(activeRegion, config);
  }, [activeRegion, config]);

  const preset = REGIONAL_THALI_PRESETS[activeRegion];

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#12151B]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl transition-all">
      {/* Top Header & Regional Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/30 text-xs font-semibold uppercase tracking-wider text-[#D6A84B]">
            {t('badge')}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-2">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            {t('desc')}
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="inline-flex flex-wrap p-1 rounded-2xl bg-black/40 border border-white/10 self-start lg:self-auto">
          {(['north', 'south', 'bengali', 'western'] as RegionalThaliId[]).map((id) => (
            <button
              key={id}
              onClick={() => handleRegionChange(id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activeRegion === id
                  ? 'bg-gradient-to-r from-[#D6A84B] to-[#F59E0B] text-black font-semibold shadow-lg shadow-[#D6A84B]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`regions.${id}.title`)}
            </button>
          ))}
        </div>
      </div>

      {/* Regional Description Subtitle */}
      <div className="mt-4 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs md:text-sm text-gray-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
        <span>{t(`regions.${activeRegion}.desc`)}</span>
      </div>

      {/* Main 2-Column Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Sliders & Portion Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Roti Count */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">
                {t('controls.roti_label')}
              </label>
              <span className="text-sm font-mono font-semibold text-[#D6A84B]">
                {t('controls.roti_count', { count: config.rotiCount })}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={config.rotiCount}
              onChange={(e) =>
                setConfig({ ...config, rotiCount: parseInt(e.target.value, 10) })
              }
              className="w-full h-2 rounded-lg bg-white/10 accent-[#D6A84B] cursor-pointer"
            />
            {config.rotiCount > 0 && (
              <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hasGhee}
                  onChange={(e) =>
                    setConfig({ ...config, hasGhee: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-700 text-[#D6A84B] focus:ring-[#D6A84B] bg-black/40"
                />
                <span className="text-xs text-gray-400 select-none">
                  {t('controls.ghee_toggle')}
                </span>
              </label>
            )}
          </div>

          {/* Slider 2: Rice Serving */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">
                {t('controls.rice_label')}
              </label>
              <span className="text-sm font-mono font-semibold text-gray-300">
                {t('controls.rice_katoris', { count: config.riceKatoris })}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={0.5}
              value={config.riceKatoris}
              onChange={(e) =>
                setConfig({
                  ...config,
                  riceKatoris: parseFloat(e.target.value),
                })
              }
              className="w-full h-2 rounded-lg bg-white/10 accent-[#3B82F6] cursor-pointer"
            />
          </div>

          {/* Slider 3: Dal / Sambar Portion */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-200 block">
                  {t('controls.dal_label')}
                </label>
                <span className="text-xs text-gray-400">
                  {t(`regions.${activeRegion}.dal_name`)}
                </span>
              </div>
              <span className="text-sm font-mono font-semibold text-gray-300">
                {t('controls.dal_katoris', { count: config.dalKatoris })}
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.5}
              value={config.dalKatoris}
              onChange={(e) =>
                setConfig({ ...config, dalKatoris: parseFloat(e.target.value) })
              }
              className="w-full h-2 rounded-lg bg-white/10 accent-[#10B981] cursor-pointer"
            />
          </div>

          {/* Slider 4: Tadka Intensity */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
            <label className="text-sm font-medium text-gray-200 block">
              {t('controls.tadka_label')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['minimal', 'standard', 'rich'] as TadkaIntensity[]).map((intensity) => (
                <button
                  key={intensity}
                  type="button"
                  onClick={() =>
                    setConfig({ ...config, tadkaIntensity: intensity })
                  }
                  className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all ${
                    config.tadkaIntensity === intensity
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {t(`controls.tadka_${intensity}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Curd & Subzi Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/20 border border-white/5 cursor-pointer hover:bg-white/[0.03] transition-all">
              <input
                type="checkbox"
                checked={config.hasCurd}
                onChange={(e) =>
                  setConfig({ ...config, hasCurd: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-700 text-[#10B981] focus:ring-[#10B981] bg-black/40"
              />
              <span className="text-xs text-gray-300 font-medium">
                {t('controls.curd_label')}
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/20 border border-white/5 cursor-pointer hover:bg-white/[0.03] transition-all">
              <input
                type="checkbox"
                checked={config.hasSubzi}
                onChange={(e) =>
                  setConfig({ ...config, hasSubzi: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-700 text-[#10B981] focus:ring-[#10B981] bg-black/40"
              />
              <div>
                <span className="text-xs text-gray-300 font-medium block">
                  {t('controls.subzi_label')}
                </span>
                <span className="text-[10px] text-gray-500">
                  {t(`regions.${activeRegion}.subzi_name`)}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Live Thali Plate & Macro Breakdown (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Animated Visual Thali Plate */}
          <div className="relative aspect-square max-h-[300px] mx-auto w-full rounded-full border-4 border-amber-900/30 bg-gradient-to-b from-[#1c1f26] to-[#0d0f12] p-5 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Thali Brass Rim Sheen */}
            <div className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none" />

            {/* Central Rice Mound */}
            {config.riceKatoris > 0 && (
              <div
                className="rounded-full bg-white/90 border border-white shadow-inner flex items-center justify-center transition-all duration-300"
                style={{
                  width: `${Math.min(60 + config.riceKatoris * 25, 120)}px`,
                  height: `${Math.min(60 + config.riceKatoris * 25, 120)}px`,
                }}
              >
                <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">
                  Rice
                </span>
              </div>
            )}

            {/* Rotis Stack (Top Left) */}
            {config.rotiCount > 0 && (
              <div className="absolute top-8 left-8 flex -space-x-4">
                {Array.from({ length: Math.min(config.rotiCount, 4) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 rounded-full border border-amber-700/60 shadow-lg flex items-center justify-center transition-all ${
                      config.hasGhee
                        ? 'bg-gradient-to-br from-amber-200 to-amber-500'
                        : 'bg-gradient-to-br from-amber-100 to-amber-300'
                    }`}
                  >
                    <span className="text-[9px] font-bold text-amber-950">Roti</span>
                  </div>
                ))}
              </div>
            )}

            {/* Dal Katori (Top Right) */}
            {config.dalKatoris > 0 && (
              <div
                className="absolute top-8 right-8 rounded-full border-2 border-amber-600/40 bg-gradient-to-br from-amber-400 to-yellow-600 shadow-md flex items-center justify-center transition-all"
                style={{
                  width: `${Math.min(50 + config.dalKatoris * 14, 80)}px`,
                  height: `${Math.min(50 + config.dalKatoris * 14, 80)}px`,
                }}
              >
                <span className="text-[9px] font-bold text-black uppercase">Dal</span>
              </div>
            )}

            {/* Curd Bowl (Bottom Right) */}
            {config.hasCurd && (
              <div className="absolute bottom-8 right-10 w-12 h-12 rounded-full border-2 border-white/40 bg-white/95 shadow-md flex items-center justify-center">
                <span className="text-[9px] font-bold text-gray-700">Dahi</span>
              </div>
            )}

            {/* Subzi Bowl (Bottom Left) */}
            {config.hasSubzi && (
              <div className="absolute bottom-8 left-10 w-14 h-14 rounded-full border-2 border-emerald-600/40 bg-gradient-to-br from-emerald-600 to-green-800 shadow-md flex items-center justify-center">
                <span className="text-[9px] font-bold text-emerald-100">Subzi</span>
              </div>
            )}
          </div>

          {/* Macro Breakdown Card */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4 shadow-xl">
            {/* Total Calories Banner */}
            <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                {t('macros.total_calories')}
              </span>
              <div className="text-right">
                <span className="text-3xl font-mono font-extrabold text-white tracking-tight">
                  {macros.calories}
                </span>
                <span className="text-xs text-[#D6A84B] font-semibold ml-1">kcal</span>
              </div>
            </div>

            {/* 4 Macro Bars */}
            <div className="grid grid-cols-2 gap-3">
              {/* Protein */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{t('macros.protein')}</span>
                  <span className="font-mono font-bold text-[#10B981]">{macros.protein}g</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((macros.protein / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Net Carbs */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{t('macros.carbs')}</span>
                  <span className="font-mono font-bold text-[#3B82F6]">{macros.carbs}g</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#3B82F6] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((macros.carbs / 120) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fats */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{t('macros.fats')}</span>
                  <span className="font-mono font-bold text-[#D6A84B]">{macros.fats}g</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#D6A84B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((macros.fats / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fiber */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{t('macros.fiber')}</span>
                  <span className="font-mono font-bold text-purple-400">{macros.fiber}g</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((macros.fiber / 25) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Insight Callout */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-[#D6A84B]/10 to-transparent border border-[#D6A84B]/20 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-[#D6A84B]">
            {t('insight.title')}
          </h4>
          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
            {t('insight.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
