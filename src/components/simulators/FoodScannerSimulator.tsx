'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  getScannerPreset,
  type ScannerDishId,
} from '@/lib/simulators/scanner-engine';

export function FoodScannerSimulator() {
  const t = useTranslations('simulators.food_scanner');

  const [activeDish, setActiveDish] = useState<ScannerDishId>('thali');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);

  // 3D Tilt state
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const preset = getScannerPreset(activeDish);

  // Reset scan state on dish change
  const handleDishChange = (dishId: ScannerDishId) => {
    setActiveDish(dishId);
    setScanComplete(false);
    setIsScanning(false);
    setIsLogged(false);
  };

  // Trigger scan sequence
  const handleTriggerScan = () => {
    if (isScanning) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    setIsScanning(true);
    setScanComplete(false);
    setIsLogged(false);

    // 1.2s scan sweep animation
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  const handleLogMeal = () => {
    setIsLogged(true);
  };

  // 3D Pointer Tracking for realistic device tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Clamped subtle 3D tilt (max 10 degrees)
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Simulator Headline & Mode Intro */}
      <div className="text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-semibold uppercase tracking-wider text-[#10B981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          {t('badge')}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-2">
          {t('title')}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {t('subtitle')}
        </p>

        {/* Dish Selector Buttons Above Device */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 mt-5">
          {(['thali', 'dosa', 'biryani'] as ScannerDishId[]).map((id) => (
            <button
              key={id}
              onClick={() => handleDishChange(id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                activeDish === id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(`dishes.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Physical Device Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1400px] py-4 select-none"
      >
        {/* Soft Under-Device Ambient Glow */}
        <div className="absolute inset-0 max-w-[360px] mx-auto rounded-[60px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        {/* 3D Smartphone Body Chassis */}
        <div
          className="relative w-[340px] sm:w-[370px] h-[690px] rounded-[52px] p-3.5 bg-gradient-to-b from-[#2E343D] via-[#1A1E24] to-[#0E1013] border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Side Hardware Buttons */}
          {/* Volume Rockers (Left Edge) */}
          <div className="absolute -left-[3.5px] top-28 w-[3px] h-10 rounded-l bg-gray-600" />
          <div className="absolute -left-[3.5px] top-42 w-[3px] h-10 rounded-l bg-gray-600" />
          {/* Power Button (Right Edge) */}
          <div className="absolute -right-[3.5px] top-32 w-[3px] h-14 rounded-r bg-gray-600" />

          {/* Internal Screen Frame (OLED Display) */}
          <div className="relative w-full h-full rounded-[42px] bg-black overflow-hidden border border-white/10 flex flex-col justify-between">
            {/* Dynamic Glass Specular Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-60"
              style={{
                background: `linear-gradient(${
                  125 + tilt.y * 2
                }deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)`,
              }}
            />

            {/* Camera Shutter Flash */}
            {flash && (
              <div className="absolute inset-0 bg-white z-40 animate-fade-out pointer-events-none" />
            )}

            {/* Mobile Top Status Bar */}
            <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-white text-[11px] font-semibold">
              <span>09:41</span>

              {/* Dynamic Island Pill Notch */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/20 flex items-center justify-end px-2 gap-1.5 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-white/20" />
              </div>

              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span className="w-4 h-2 rounded-sm border border-white/80 p-0.5 flex items-center">
                  <span className="w-full h-full bg-white rounded-xs" />
                </span>
              </div>
            </div>

            {/* Camera Viewfinder Viewport */}
            <div className="relative flex-1 m-2 rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center">
              {/* Simulated Dish Backing Graphics */}
              <div className="absolute inset-0 flex items-center justify-center p-3">
                {activeDish === 'thali' && (
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#181a20] to-[#0d0f12] flex items-center justify-center border border-amber-900/30">
                    {/* Simulated Plate with Roti, Dal, Bhindi */}
                    <div className="w-56 h-56 rounded-full border-2 border-amber-600/30 bg-[#16181f] relative flex items-center justify-center">
                      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 shadow-md flex items-center justify-center text-[10px] font-bold text-amber-950">
                        2x Phulka
                      </div>
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-md flex items-center justify-center text-[10px] font-bold text-black">
                        Dal Tadka
                      </div>
                      <div className="absolute bottom-4 w-24 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 shadow-md flex items-center justify-center text-[10px] font-bold text-emerald-100">
                        Bhindi Masala
                      </div>
                    </div>
                  </div>
                )}

                {activeDish === 'dosa' && (
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#181a20] to-[#0d0f12] flex items-center justify-center border border-amber-900/30">
                    {/* Simulated Dosa platter */}
                    <div className="w-full h-44 rounded-2xl border border-white/10 bg-[#16181f] p-3 flex flex-col justify-between">
                      <div className="w-full h-18 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 shadow-md flex items-center justify-center text-xs font-bold text-amber-950">
                        Crispy Masala Dosa
                      </div>
                      <div className="flex justify-around items-center pt-2">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-md flex items-center justify-center text-[9px] font-bold text-black">
                          Sambar
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[9px] font-bold text-gray-800">
                          Chutney
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDish === 'biryani' && (
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#181a20] to-[#0d0f12] flex items-center justify-center border border-amber-900/30">
                    <div className="w-56 h-56 rounded-full border-2 border-amber-500/30 bg-gradient-to-br from-amber-600/30 to-orange-800/20 relative flex items-center justify-center">
                      <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-500 to-amber-600 shadow-xl flex items-center justify-center text-xs font-extrabold text-amber-950">
                        Spiced Biryani Plate
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/90 border border-white shadow-md flex items-center justify-center text-[9px] font-bold text-gray-800">
                        Raita
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Viewfinder HUD Overlays */}
              {/* Corner Viewfinder Reticles */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-emerald-400" />

              {/* Center Target Crosshair */}
              <div className="absolute w-8 h-8 rounded-full border border-white/20 flex items-center justify-center pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Top Viewfinder HUD Meta */}
              <div className="absolute top-4 inset-x-5 flex justify-between items-center text-[10px] font-mono font-semibold text-emerald-400/90 pointer-events-none">
                <span>{t('hud.status')}</span>
                <span>{t('hud.mode')}</span>
              </div>

              {/* Animated Vertical Scanning Laser Line */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-laser pointer-events-none" />
              )}

              {/* Detected Item AR Bounding Boxes */}
              {scanComplete &&
                preset.items.map((item) => (
                  <div
                    key={item.id}
                    className="absolute rounded-xl border-2 border-dashed transition-all duration-500 animate-scale-up"
                    style={{
                      top: `${item.box.topPercent}%`,
                      left: `${item.box.leftPercent}%`,
                      width: `${item.box.widthPercent}%`,
                      height: `${item.box.heightPercent}%`,
                      borderColor: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    <div
                      className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[9px] font-bold text-black tracking-tight whitespace-nowrap shadow"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.confidence}% • {t(item.nameKey)}
                    </div>
                  </div>
                ))}

              {/* In-Viewfinder Scanning Notice */}
              {isScanning && (
                <div className="absolute bottom-4 px-3 py-1.5 rounded-full bg-black/80 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 animate-pulse">
                  {t('hud.scanning')}
                </div>
              )}
            </div>

            {/* Bottom In-Phone Camera Controls / Slide-Up Sheet */}
            <div className="relative z-20 px-4 pb-4 pt-1 bg-gradient-to-t from-black via-black/90 to-transparent">
              {scanComplete ? (
                /* Bottom Slide-up Nutrition Drawer */
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3 animate-slide-up shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">
                        Recognized Indian Plate
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {t(`dishes.${activeDish}`)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-white">
                        {preset.totalMacros.calories}
                      </span>
                      <span className="text-[10px] text-[#D6A84B] font-semibold ml-0.5">kcal</span>
                    </div>
                  </div>

                  {/* Macros Strip */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className="p-1 rounded-lg bg-black/40">
                      <span className="text-gray-400 block">Protein</span>
                      <span className="font-mono font-bold text-emerald-400">{preset.totalMacros.protein}g</span>
                    </div>
                    <div className="p-1 rounded-lg bg-black/40">
                      <span className="text-gray-400 block">Carbs</span>
                      <span className="font-mono font-bold text-blue-400">{preset.totalMacros.carbs}g</span>
                    </div>
                    <div className="p-1 rounded-lg bg-black/40">
                      <span className="text-gray-400 block">Fats</span>
                      <span className="font-mono font-bold text-amber-400">{preset.totalMacros.fats}g</span>
                    </div>
                  </div>

                  {/* Add to Daily Log Action */}
                  <button
                    onClick={handleLogMeal}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isLogged
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                        : 'bg-white text-black hover:bg-gray-200 shadow'
                    }`}
                  >
                    {isLogged ? (
                      <span>{t('hud.logged_toast')}</span>
                    ) : (
                      <>
                        <span>+</span>
                        <span>{t('hud.add_to_log')}</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Camera Shutter Bar */
                <div className="flex flex-col items-center gap-2 py-1">
                  <button
                    onClick={handleTriggerScan}
                    disabled={isScanning}
                    className="group relative w-16 h-16 rounded-full border-4 border-white/40 flex items-center justify-center p-1 hover:border-white transition-all disabled:opacity-50"
                  >
                    <div className="w-full h-full rounded-full bg-white group-active:scale-95 transition-transform shadow-lg" />
                  </button>
                  <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                    {t('hud.action_scan')}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mb-2" />
          </div>
        </div>
      </div>

      {/* Illustrative Disclaimer Tag */}
      <p className="mt-4 text-xs text-gray-500 text-center max-w-md">
        {t('disclaimer')}
      </p>
    </div>
  );
}
