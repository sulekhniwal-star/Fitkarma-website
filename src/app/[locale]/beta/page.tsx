import { getTranslations } from 'next-intl/server';
import { RegistrationWizard } from '@/components/beta/RegistrationWizard';
import { Sparkles, Shield, Users } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beta.hero' });

  return {
    title: `${t('title')} — FitKarma VIP Beta`,
    description: t('subtitle'),
  };
}

export default async function BetaRegistrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beta.hero' });

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#36C96A]/15 to-[#D6A84B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-3/4 right-1/4 w-[400px] h-[300px] bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          {/* VIP Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/30 text-[#D6A84B] text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(214,168,75,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {t('title')}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Quick Metrics Pill */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#36C96A]" />
              <span>Phase 1 VIP: <strong>1,000 Seats</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#36C96A]" />
              <span>DPDP Act Compliant</span>
            </div>
          </div>
        </div>

        {/* 2-Step Registration Wizard */}
        <RegistrationWizard />
      </div>
    </main>
  );
}
