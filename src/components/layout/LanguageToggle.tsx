'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export const LanguageToggle: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (nextLocale: 'en' | 'hi') => {
    if (nextLocale === locale) return;

    startTransition(() => {
      // Set the standard next-intl cookie for client persistence
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      className="inline-flex items-center rounded-full bg-[#14181D]/90 p-1 border border-white/10 text-xs font-medium backdrop-blur-md"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          locale === 'en'
            ? 'bg-[#36C96A] text-slate-950 font-bold shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSwitch('hi')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          locale === 'hi'
            ? 'bg-[#36C96A] text-slate-950 font-bold shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        हिं
      </button>
    </div>
  );
};

export default LanguageToggle;
