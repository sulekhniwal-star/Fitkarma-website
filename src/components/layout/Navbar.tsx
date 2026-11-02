import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FitKarmaLogo } from '@/components/brand/FitKarmaLogo';
import { LanguageToggle } from './LanguageToggle';

export const Navbar: React.FC = () => {
  const t = useTranslations('nav');
  const common = useTranslations('common');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className="w-full max-w-5xl pointer-events-auto rounded-full glass-panel px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl shadow-black/60 transition-all"
        aria-label="Main Navigation"
      >
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
          <FitKarmaLogo markSize={30} />
        </Link>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-[#36C96A] transition-colors">
            {t('home')}
          </Link>
          <Link href="/features" className="hover:text-[#36C96A] transition-colors">
            {t('features')}
          </Link>
          <Link href="/about" className="hover:text-[#36C96A] transition-colors">
            {t('about')}
          </Link>
          <Link href="/beta" className="hover:text-[#36C96A] transition-colors">
            {t('beta')}
          </Link>
          <Link href="/faq" className="hover:text-[#36C96A] transition-colors">
            {t('faq')}
          </Link>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/beta"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#36C96A] hover:bg-[#65C94B] text-slate-950 font-bold px-4 py-1.5 text-xs tracking-tight transition-all shadow-md shadow-[#36C96A]/20 cursor-pointer"
          >
            {common('primaryCta')}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

