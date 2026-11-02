import { getTranslations } from 'next-intl/server';
import { InteractiveFeatureShowcase } from '@/components/features/InteractiveFeatureShowcase';
import { CompleteFeaturesBento } from '@/components/features/CompleteFeaturesBento';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features.hero' });

  return {
    title: `${t('title')} — FitKarma Features`,
    description: t('subtitle'),
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features.hero' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#D6A84B]/15 via-emerald-500/10 to-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
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

        {/* 1. Split-Screen Interactive Feature Showcase with Sticky Left Simulator */}
        <InteractiveFeatureShowcase />

        {/* 2. Complete Health OS Ecosystem Bento Grid Matrix */}
        <CompleteFeaturesBento />

        {/* 3. Bottom VIP Beta CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#16191E] to-amber-950/30 border border-white/10 text-center space-y-4 shadow-2xl">
          <span className="text-xs font-mono font-bold text-[#D6A84B] uppercase tracking-wider block">
            {common('exclusiveCohort')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to experience health intelligence built for India?
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Reserve one of the strictly capped 1,000 Phase 1 founding member seats with verified instant status.
          </p>
          <div className="pt-2">
            <Link
              href="/beta"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D6A84B] to-[#F59E0B] hover:brightness-110 text-black font-bold text-sm tracking-tight shadow-xl shadow-[#D6A84B]/20 transition-all cursor-pointer"
            >
              <span>{common('primaryCta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

