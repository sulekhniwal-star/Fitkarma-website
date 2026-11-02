import React from "react";

interface MotifProps {
  className?: string;
  opacity?: number;
}

/**
 * Subtle Jaali geometric lattice repeating background pattern.
 * Provides authentic Indian architectural nuance without visual distraction.
 */
export function JaaliPattern({ className = "", opacity = 0.05 }: MotifProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="none"
      >
        <defs>
          <pattern
            id="fitkarma-jaali"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond jaali lattice */}
            <path
              d="M20 0 L40 20 L20 40 L0 20 Z"
              stroke="#D6A84B"
              strokeWidth="0.75"
              fill="none"
            />
            {/* Inner cultural rosette knot */}
            <circle cx="20" cy="20" r="3" stroke="#65C94B" strokeWidth="0.5" fill="none" />
            <circle cx="0" cy="0" r="2" fill="#D6A84B" />
            <circle cx="40" cy="0" r="2" fill="#D6A84B" />
            <circle cx="0" cy="40" r="2" fill="#D6A84B" />
            <circle cx="40" cy="40" r="2" fill="#D6A84B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fitkarma-jaali)" />
      </svg>
    </div>
  );
}

/**
 * Mandala ambient glow aura for background atmosphere behind hero cards and phone mockups.
 */
export function MandalaGlow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Outer blurred ambient colored aura */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-radial from-brand-accent/15 via-brand-gold/10 to-transparent blur-3xl animate-pulse" />

      {/* Geometric concentric ring aura */}
      <svg
        width="380"
        height="380"
        viewBox="0 0 380 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20 animate-[spin_120s_linear_infinite]"
      >
        <circle cx="190" cy="190" r="180" stroke="#D6A84B" strokeWidth="0.75" strokeDasharray="4 6" />
        <circle cx="190" cy="190" r="145" stroke="#65C94B" strokeWidth="0.75" strokeDasharray="2 4" />
        <circle cx="190" cy="190" r="110" stroke="#D6A84B" strokeWidth="0.5" />
        <circle cx="190" cy="190" r="75" stroke="#65C94B" strokeWidth="0.75" strokeDasharray="6 6" />
        <circle cx="190" cy="190" r="40" stroke="#D6A84B" strokeWidth="0.5" />

        {/* 12 radial rays */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="190"
            y1="40"
            x2="190"
            y2="75"
            stroke="#D6A84B"
            strokeWidth="0.75"
            transform={`rotate(${i * 30} 190 190)`}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Desi culinary & household portion vector icons
 */
export function KatoriIcon({ className = "w-5 h-5", title = "Katori" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
    >
      <title>{title}</title>
      <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 7C4 13 7.5 17 12 17C16.5 17 20 13 20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="17" rx="4.5" ry="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function RotiIcon({ className = "w-5 h-5", title = "Roti" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
    >
      <title>{title}</title>
      {/* Bottom roti */}
      <ellipse cx="12" cy="14" rx="8" ry="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Top roti */}
      <ellipse cx="12" cy="10" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Char mark speckles on roti */}
      <circle cx="9" cy="9" r="0.8" fill="currentColor" />
      <circle cx="14" cy="11" r="0.8" fill="currentColor" />
      <circle cx="15" cy="8.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TadkaFlameIcon({ className = "w-5 h-5", title = "Tadka Tempering" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
    >
      <title>{title}</title>
      {/* Sizzling tadka flame with spice drops */}
      <path
        d="M12 2C10 6 7 8 7 13C7 16.31 9.69 19 13 19C16.31 19 19 16.31 19 13C19 9.5 16 6 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C11.5 12.5 10 13.5 10 15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15C14 14 13 12.5 12 11Z"
        fill="currentColor"
      />
      {/* Spices popping */}
      <circle cx="5" cy="8" r="0.8" fill="currentColor" />
      <circle cx="19" cy="7" r="0.8" fill="currentColor" />
      <circle cx="7" cy="4" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ThaliIcon({ className = "w-5 h-5", title = "Indian Thali" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
    >
      <title>{title}</title>
      {/* Rim of the brass thali */}
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Inner baseline */}
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
      {/* 3 mini katoris inside the thali */}
      <circle cx="8" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="16" r="2.2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

