'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Share2, Copy, Check } from 'lucide-react';

export interface SocialShareActionsProps {
  seatOrPosition: number;
  isVip?: boolean;
  referralCode?: string;
}

export function generateShareCopy(
  seatOrPosition: number,
  isVip = true,
  referralUrl = 'https://fitkarma.in/beta',
  locale: 'en' | 'hi' = 'en'
): string {
  const isHindi = locale === 'hi';
  const badge = isVip
    ? `#${String(seatOrPosition).padStart(3, '0')}`
    : `#${seatOrPosition}`;

  if (isHindi) {
    return isVip
      ? `मैंने FitKarma VIP बीटा सीट ${badge} प्राप्त की है। यहाँ देखें: ${referralUrl}`
      : `मैं FitKarma चरण 2 प्रतीक्षा सूची में स्थान ${badge} पर हूँ। यहाँ देखें: ${referralUrl}`;
  }

  return isVip
    ? `Joined the FitKarma VIP Beta ${badge}. Check it out: ${referralUrl}`
    : `Joined the FitKarma Phase 2 Waitlist ${badge}. Check it out: ${referralUrl}`;
}

export function SocialShareActions({
  seatOrPosition,
  isVip = true,
  referralCode,
}: SocialShareActionsProps) {
  const t = useTranslations('beta.pass');
  const locale = useLocale() as 'en' | 'hi';

  const [copied, setCopied] = useState(false);

  // Construct referral URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fitkarma.in';
  const refParam = referralCode || `seat${String(seatOrPosition).padStart(3, '0')}`;
  const referralUrl = `${origin}/${locale}/beta?ref=${refParam}`;

  const shareText = generateShareCopy(seatOrPosition, isVip, referralUrl, locale);
  const encodedText = encodeURIComponent(shareText);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  async function handleCopy() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(referralUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = referralUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy error
    }
  }

  return (
    <div className="w-full max-w-sm mt-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-[#36C96A]" />
          <span>Share Your Pass</span>
        </span>
        {copied && (
          <span className="text-xs text-[#36C96A] font-medium flex items-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{t('copied_toast')}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp Share Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition active:scale-95 text-center"
        >
          <span>WhatsApp</span>
        </a>

        {/* X (Twitter) Share Button */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-bold transition active:scale-95 text-center"
        >
          <span>X / Twitter</span>
        </a>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-gray-300 hover:text-white text-xs font-bold transition active:scale-95 text-center"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
}

