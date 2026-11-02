'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';
import {
  Sparkles,
  RotateCcw,
  SunMedium,
  UtensilsCrossed,
  HeartPulse,
  Flame,
  CheckCircle2,
  Scan,
  ShieldCheck,
  ChevronRight,
  Battery,
  Wifi,
} from 'lucide-react';

export const CinematicLaunchDevice: React.FC = () => {
  const t = useTranslations('home.launchDevice');
  const [launchStage, setLaunchStage] = useState<'booting' | 'initializing' | 'revealing' | 'active'>('booting');
  const [activeTab, setActiveTab] = useState<'dip' | 'food' | 'family'>('dip');
  const [rotiCount, setRotiCount] = useState<number>(2);
  const [hasGhee, setHasGhee] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger cinematic launch sequence
  const startLaunchSequence = () => {
    setLaunchStage('booting');
    const timer1 = setTimeout(() => setLaunchStage('initializing'), 800);
    const timer2 = setTimeout(() => setLaunchStage('revealing'), 1800);
    const timer3 = setTimeout(() => setLaunchStage('active'), 2600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLaunchStage('active');
      return;
    }
    const cleanup = startLaunchSequence();
    return cleanup;
  }, []);

  // 3D cursor tracking for realistic hardware perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || launchStage !== 'active') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotateY = ((x - centerX) / centerX) * 9;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Quick calories calculation for in-device interactive preview
  const quickCalories = 240 + rotiCount * (hasGhee ? 125 : 80);

  return (
    <div className="relative w-full py-6 flex flex-col items-center">
      {/* Studio Volumetric Glow Backdrops */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#36C96A]/20 via-[#65C94B]/10 to-[#D6A84B]/15 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"
        style={{
          opacity: launchStage === 'booting' ? 0.3 : 0.85,
          transform: `translate(-50%, -50%) scale(${launchStage === 'booting' ? 0.8 : 1.05})`,
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Device Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1200px] cursor-grab active:cursor-grabbing transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Physical Smartphone Chassis */}
        <div
          className={`relative w-[310px] sm:w-[350px] h-[640px] sm:h-[680px] rounded-[48px] p-3 bg-gradient-to-b from-[#2A313A] via-[#1A1F26] to-[#0F1318] border-[3px] border-[#3F4A57] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(54,201,106,0.15)] transition-all duration-700 ${
            launchStage === 'booting'
              ? 'translate-y-6 scale-95 opacity-60'
              : 'translate-y-0 scale-100 opacity-100'
          }`}
        >
          {/* Outer edge buttons simulation */}
          <div className="absolute -left-[5px] top-24 w-[3px] h-8 bg-[#4B5768] rounded-l" />
          <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-[#4B5768] rounded-l" />
          <div className="absolute -left-[5px] top-52 w-[3px] h-12 bg-[#4B5768] rounded-l" />
          <div className="absolute -right-[5px] top-32 w-[3px] h-16 bg-[#4B5768] rounded-r" />

          {/* OLED Screen Bezel & Panel */}
          <div className="relative w-full h-full rounded-[40px] bg-[#0A0D11] overflow-hidden flex flex-col border border-white/5 shadow-inner">
            {/* Dynamic Glass Specular Sheen (sweeps during reveal) */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-transform duration-1000 z-40 ${
                launchStage === 'revealing'
                  ? 'translate-x-full translate-y-full opacity-100'
                  : launchStage === 'active'
                  ? 'translate-x-[200%] opacity-0'
                  : '-translate-x-full opacity-0'
              }`}
            />

            {/* Hardware Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3 py-1 bg-black rounded-full border border-white/10 w-28 h-6 shadow-md transition-all">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F26] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
              </div>
              {launchStage === 'active' && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#36C96A] animate-pulse" />
                  <span className="text-[9px] font-medium text-emerald-400">DIP 07:00</span>
                </div>
              )}
              <div className="w-2 h-2 rounded-full bg-[#1A1F26]" />
            </div>

            {/* Status Bar */}
            <div className="w-full pt-3 px-6 pb-1 flex items-center justify-between text-[10px] text-slate-400 z-30 font-medium">
              <span>09:41</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-[#36C96A]" />
              </div>
            </div>

            {/* --- SCREEN CONTENT BASED ON LAUNCH STAGE --- */}

            {/* 1. BOOTING & INITIALIZING SCREEN */}
            {launchStage !== 'active' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-20 relative">
                <div className="relative mb-6">
                  <div
                    className={`p-5 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/15 transition-all duration-700 ${
                      launchStage === 'initializing' || launchStage === 'revealing'
                        ? 'scale-110 shadow-[0_0_35px_rgba(54,201,106,0.5)]'
                        : 'scale-90 opacity-40'
                    }`}
                  >
                    <FitKarmaMark size={56} className="drop-shadow-[0_0_15px_rgba(54,201,106,0.6)]" />
                  </div>
                  <div className="absolute -inset-2 rounded-3xl border border-[#36C96A]/30 animate-ping opacity-40" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#36C96A]/10 border border-[#36C96A]/20 text-[11px] font-semibold text-[#36C96A]">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <span>{t('bootingBadge')}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm tracking-tight">
                    FitKarma Health OS
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                    {t('bootingSubtitle')}
                  </p>
                </div>

                {/* Progress Loader bar */}
                <div className="w-36 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#36C96A] via-[#65C94B] to-[#D6A84B] transition-all duration-1000 ease-out"
                    style={{
                      width:
                        launchStage === 'booting'
                          ? '25%'
                          : launchStage === 'initializing'
                          ? '75%'
                          : '100%',
                    }}
                  />
                </div>
              </div>
            )}

            {/* 2. ACTIVE REVEALED APP INTERFACE */}
            {launchStage === 'active' && (
              <div className="flex-1 flex flex-col px-4 pt-1 pb-3 overflow-y-auto no-scrollbar z-20 animate-fadeIn">
                {/* User Greeting & Karma Ring Header */}
                <div className="flex items-center justify-between pb-3 pt-1 border-b border-white/5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#36C96A]">
                      {t('greetingsPill')}
                    </span>
                    <h3 className="text-white font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                      <span>Rohan Sharma</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 font-mono border border-amber-400/20">
                        VIP #042
                      </span>
                    </h3>
                  </div>

                  {/* Circular Karma Score Ring */}
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#16201A] to-[#12161C] border border-[#36C96A]/30 shadow-[0_0_12px_rgba(54,201,106,0.2)]">
                    <div className="text-center">
                      <span className="text-[12px] font-black text-white leading-none block">88</span>
                      <span className="text-[7px] font-bold text-[#36C96A] uppercase leading-none block">Karma</span>
                    </div>
                  </div>
                </div>

                {/* In-Device Interactive Feature Switcher */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/5 my-2.5">
                  <button
                    onClick={() => setActiveTab('dip')}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                      activeTab === 'dip'
                        ? 'bg-[#36C96A] text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabs.dip')}
                  </button>
                  <button
                    onClick={() => setActiveTab('food')}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                      activeTab === 'food'
                        ? 'bg-[#36C96A] text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabs.food')}
                  </button>
                  <button
                    onClick={() => setActiveTab('family')}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                      activeTab === 'family'
                        ? 'bg-[#36C96A] text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabs.family')}
                  </button>
                </div>

                {/* Tab 1: Daily Intelligence Package (DIP) */}
                {activeTab === 'dip' && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-[#16211A] to-[#101418] border border-[#36C96A]/20">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#36C96A] mb-1">
                        <span className="flex items-center gap-1">
                          <SunMedium className="w-3 h-3" />
                          07:00 Morning Readiness
                        </span>
                        <span className="text-white/60">Sleep 8.2 hrs</span>
                      </div>
                      <p className="text-[11px] text-slate-200 leading-snug font-medium">
                        Recovery is prime today. Glucose response optimal for a hearty Indian breakfast.
                      </p>
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Recommended:</span>
                        <span className="text-[#A3E635] font-semibold">Moong Dal Chilla + Mint Chutney</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] text-slate-400 block uppercase">Resting HR</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                          <HeartPulse className="w-3 h-3 text-rose-400" />
                          58 bpm
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] text-slate-400 block uppercase">Post-Meal Spike</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Flat Curve
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Interactive Food Logging (Roti + Ghee + Katori) */}
                {activeTab === 'food' && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <div className="p-3 rounded-2xl bg-[#141920] border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                          <UtensilsCrossed className="w-3 h-3 text-[#36C96A]" />
                          Ghar Ka Khana
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#36C96A]">
                          {quickCalories} kcal
                        </span>
                      </div>

                      {/* Roti count stepper */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <span className="text-[11px] text-slate-300 font-medium">Phulka / Roti</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setRotiCount(Math.max(1, rotiCount - 1))}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-white font-mono w-4 text-center">
                            {rotiCount}
                          </span>
                          <button
                            onClick={() => setRotiCount(Math.min(6, rotiCount + 1))}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Desi Ghee toggle */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <span className="text-[11px] text-slate-300 font-medium">Desi Ghee Layer</span>
                        <button
                          onClick={() => setHasGhee(!hasGhee)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            hasGhee
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {hasGhee ? 'Applied (+45 kcal)' : 'Dry'}
                        </button>
                      </div>

                      {/* Fixed Katori portion */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5 text-[11px] text-slate-400">
                        <span>Yellow Dal Tadka</span>
                        <span className="text-slate-300 font-mono">1.0 Katori (150ml)</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#36C96A]/10 border border-[#36C96A]/20 flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Scan className="w-3.5 h-3.5 text-[#36C96A]" />
                        <span>AI Camera Scanning Ready</span>
                      </span>
                      <span className="text-[#36C96A] font-bold flex items-center gap-0.5">
                        Test <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Family Care Circles */}
                {activeTab === 'family' && (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-white">Maa (Mother)</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Normal
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Post-dinner walk goal completed (3,420 steps). Resting vitals nominal.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-white">Papa (Father)</span>
                        <span className="text-amber-300 font-semibold flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Hydration Nudge
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        2.1L consumed today. Evening warm water prompt sent via WhatsApp.
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[9px] text-slate-400 text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#36C96A]" />
                      <span>Zero medical broking • DPDP Act 2025 compliant</span>
                    </div>
                  </div>
                )}

                {/* Bottom App Navigation Bar simulation */}
                <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-around text-slate-400">
                  <div className="text-center text-[#36C96A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#36C96A] mx-auto mb-0.5" />
                    <span className="text-[9px] font-bold">Today</span>
                  </div>
                  <div className="text-center text-slate-400 hover:text-white cursor-pointer">
                    <span className="text-[9px] font-medium">Log</span>
                  </div>
                  <div className="text-center text-slate-400 hover:text-white cursor-pointer">
                    <span className="text-[9px] font-medium">Family</span>
                  </div>
                  <div className="text-center text-slate-400 hover:text-white cursor-pointer">
                    <span className="text-[9px] font-medium">Karma</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Replay Trigger Button */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={startLaunchSequence}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <RotateCcw className="w-3 h-3 text-[#36C96A]" />
          <span>{t('replayButton')}</span>
        </button>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          {t('interactiveHint')}
        </span>
      </div>
    </div>
  );
};

export default CinematicLaunchDevice;

