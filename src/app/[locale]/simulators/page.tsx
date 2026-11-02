import { getTranslations } from 'next-intl/server';
import { SimulatorsShowcase } from '@/components/simulators/SimulatorsShowcase';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'simulators' });

  return {
    title: `${t('title')} — FitKarma`,
    description: t('subtitle'),
  };
}

export default async function SimulatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'simulators' });

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#D6A84B]/15 via-emerald-500/10 to-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/30 text-[#D6A84B] text-xs font-semibold uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(214,168,75,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            {t('title')}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabbed Interactive Simulators Showcase */}
        <SimulatorsShowcase />
      </div>
    </main>
  );
}
