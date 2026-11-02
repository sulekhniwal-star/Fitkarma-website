import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="border-t border-white/10 bg-[#0A0D10] py-12 px-4 sm:px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <FitKarmaMark size={24} />
          <span>{t('copyright')}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="hover:text-slate-200 transition-colors">
            {t('terms')}
          </Link>
          <Link href="/faq" className="hover:text-slate-200 transition-colors">
            {nav('faq')}
          </Link>
        </div>

        <div className="text-slate-400 font-medium">
          {t('tagline')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

