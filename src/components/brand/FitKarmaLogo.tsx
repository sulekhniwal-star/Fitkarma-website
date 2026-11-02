import React from 'react';
import { FitKarmaMark } from './FitKarmaMark';

interface FitKarmaLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'monochrome';
  showTagline?: boolean;
  markSize?: number;
}

export const FitKarmaLogo: React.FC<FitKarmaLogoProps> = ({
  className = '',
  variant = 'dark',
  showTagline = false,
  markSize = 36,
}) => {
  const isLight = variant === 'light';
  const isMono = variant === 'monochrome';

  const textPrimaryColor = isLight ? 'text-slate-900' : isMono ? 'text-white' : 'text-[#F8FAFC]';
  const textAccentColor = isMono ? 'text-white' : 'text-[#65C94B]';
  const subtitleColor = isLight ? 'text-slate-600' : 'text-[#94A3B8]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <FitKarmaMark size={markSize} />
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-bold tracking-tight leading-none">
          <span className={textPrimaryColor}>Fit</span>
          <span className={textAccentColor}>Karma</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${subtitleColor}`}>
            India's AI Health Ecosystem
          </span>
        )}
      </div>
    </div>
  );
};

export default FitKarmaLogo;

