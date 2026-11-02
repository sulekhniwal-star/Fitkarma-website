"use client";

import React, { useState, useRef, useEffect } from "react";

interface PhoneMockup3DProps {
  children: React.ReactNode;
  tiltDirection?: "left" | "right" | "center";
  className?: string;
  badgeLabel?: string;
}

export function PhoneMockup3D({
  children,
  tiltDirection = "center",
  className = "",
  badgeLabel = "Illustrative preview — UI subject to evolution",
}: PhoneMockup3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial tilt based on orientation prop
  const getBaseRotation = (direction: "left" | "right" | "center") => {
    switch (direction) {
      case "left":
        return { x: 6, y: -8 };
      case "right":
        return { x: 6, y: 8 };
      case "center":
      default:
        return { x: 4, y: 0 };
    }
  };

  const baseRotation = getBaseRotation(tiltDirection);

  useEffect(() => {
    setRotation(getBaseRotation(tiltDirection));
  }, [tiltDirection]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle interactive tilt range: -7 to +7 deg
    const rotateY = ((x - centerX) / centerX) * 8 + baseRotation.y;
    const rotateX = -((y - centerY) / centerY) * 8 + baseRotation.x;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation(baseRotation);
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Perspective Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="perspective-container relative p-4 transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
      >
        {/* Phone Chassis */}
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[300px] sm:w-[320px] md:w-[340px] h-[610px] sm:h-[650px] md:h-[680px] rounded-[48px] p-3.5 bg-gradient-to-b from-[#2A313C] via-[#12161E] to-[#0A0D12] shadow-device-3d border border-[#3A4352]/70 transition-transform duration-150"
        >
          {/* Metallic Edge Chamfer Rim */}
          <div className="absolute inset-0 rounded-[48px] ring-1 ring-white/15 pointer-events-none" />

          {/* Side Buttons Simulated */}
          <div className="absolute -left-[3px] top-[110px] w-[3px] h-[28px] bg-[#3A4352] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[148px] w-[3px] h-[48px] bg-[#3A4352] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[204px] w-[3px] h-[48px] bg-[#3A4352] rounded-l-sm" />
          <div className="absolute -right-[3px] top-[140px] w-[3px] h-[68px] bg-[#3A4352] rounded-r-sm" />

          {/* Inner Screen Bezel */}
          <div className="relative w-full h-full rounded-[38px] bg-[#0D0F12] overflow-hidden border border-black/80 flex flex-col justify-between">
            {/* Top Status Bar & Dynamic Island */}
            <div className="relative z-30 pt-3 px-6 flex justify-between items-center text-[11px] font-semibold text-white/70">
              <span>9:41</span>
              {/* Dynamic Island Notch */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-end px-2 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-accent/70" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span>5G</span>
                <span className="w-4 h-2.5 rounded-sm border border-white/60 flex items-center p-0.5">
                  <span className="w-full h-full bg-white/90 rounded-2xs" />
                </span>
              </div>
            </div>

            {/* Screen Content Slot */}
            <div className="relative z-20 flex-1 overflow-y-auto px-4 py-2 scrollbar-none">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-30 pb-2 pt-1 flex justify-center">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Glass Sheen Gradient Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-60"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mandatory Illustrative Preview Label Badge */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/90 border border-card-border text-[11px] font-medium text-ink-subtle">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
        <span>{badgeLabel}</span>
      </div>
    </div>
  );
}
