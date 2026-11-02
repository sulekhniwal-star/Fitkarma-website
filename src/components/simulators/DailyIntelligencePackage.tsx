'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  getDipPulse,
  type DipTimeOfDay,
} from '@/lib/simulators/dip-engine';

export function DailyIntelligencePackage() {
  const t = useTranslations('simulators.dip');
  const [activePeriod, setActivePeriod] = useState<DipTimeOfDay>('morning');
  const [completedAction, setCompletedAction] = useState<Record<string, boolean>>({});

  const pulse = getDipPulse(activePeriod);

  const handleActionClick = (periodKey: string) => {
    setCompletedAction((prev) => ({
      ...prev,
      [periodKey]: !prev[periodKey],
    }));
  };

  const isCurrentActionCompleted = !!completedAction[activePeriod];

  return (
    <div
      className="relative w-full rounded-3xl border border-white/10 bg-[#12151B]/85 backdrop-blur-xl p-6 md:p-8 shadow-2xl transition-all duration-500 overflow-hidden"
      style={{
        boxShadow: `0 0 60px -15px ${pulse.glowColor}`,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700 opacity-60"
        style={{ backgroundColor: pulse.glowColor }}
      />

      {/* Header & Status Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {t('badge')}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-2">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Time Tabs */}
        <div className="inline-flex flex-wrap p-1 rounded-2xl bg-black/40 border border-white/10 self-start md:self-auto">
          {(['morning', 'midday', 'evening'] as DipTimeOfDay[]).map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activePeriod === period
                  ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`periods.${period}.label`)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Pulse Showcase */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Score & Core Metrics (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                {pulse.timeString}
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {t(`periods.${activePeriod}.title`)}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {t(`periods.${activePeriod}.status`)}
            </span>
          </div>

          {/* Large Readiness Circular Gauge */}
          <div className="flex items-center gap-6 py-2">
            <div className="relative w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-white/10 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    stroke: pulse.glowColor.replace('0.25', '1.0'),
                    strokeDasharray: 251.2,
                    strokeDashoffset: 251.2 - (251.2 * pulse.recoveryScore) / 100,
                    transition: 'stroke-dashoffset 0.8s ease',
                  }}
                />
              </svg>
              <div className="text-center">
                <span className="text-2xl font-mono font-extrabold text-white">
                  {pulse.recoveryScore}
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1">%</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-300">
                {t('metrics.karma_score')}
              </span>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {t(`periods.${activePeriod}.status`)}
              </p>
            </div>
          </div>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
            {pulse.metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center"
              >
                <span className="text-[10px] text-gray-400 block truncate">
                  {t(metric.labelKey)}
                </span>
                <div className="mt-1">
                  <span
                    className="font-mono font-bold text-sm"
                    style={{ color: metric.accentColor }}
                  >
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-[9px] text-gray-500 ml-0.5">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Contextual Nudge & Interactive Action (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Circadian Insight Card */}
          <div className="p-6 rounded-2xl bg-black/30 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D6A84B]">
              <span>⚡</span>
              <span>CIRCADIAN INTELLIGENCE PULSE</span>
            </div>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              {t(`periods.${activePeriod}.insight`)}
            </p>
          </div>

          {/* Action Recommendation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Actionable Optimization
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                ✓ Personalized to your rhythm
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t(`periods.${activePeriod}.action`)}
            </p>

            <button
              onClick={() => handleActionClick(activePeriod)}
              className={`w-full py-3 px-4 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                isCurrentActionCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
            >
              {isCurrentActionCompleted ? (
                <>
                  <span>✓</span>
                  <span>Action Logged in Daily Rhythm</span>
                </>
              ) : (
                <>
                  <span>✦</span>
                  <span>Simulate Action Completion</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Regulatory/Brand Disclaimer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/5 text-[11px] text-gray-500 text-center">
        {t('disclaimer')}
      </div>
    </div>
  );
}

