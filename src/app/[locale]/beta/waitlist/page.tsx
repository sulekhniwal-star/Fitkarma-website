import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { WaitlistPass3D } from '@/components/beta/WaitlistPass3D';
import { SocialShareActions } from '@/components/beta/SocialShareActions';
import { Clock, Shield, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Phase 2 Priority Waitlist — FitKarma',
    description: 'Track your live queue position on the FitKarma Phase 2 Waitlist with automatic FIFO promotion.',
  };
}

export default async function BetaWaitlistPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { locale } = await params;
  const { id: appId } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'beta.waitlist' });

  let fullName = 'Waitlisted Applicant';
  let queuePosition = 127;
  let registeredDate = new Date().toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (appId) {
    const { data: app } = await supabaseAdmin
      .from('beta_applications')
      .select('full_name, allocation_order_at, application_created_at')
      .eq('id', appId)
      .maybeSingle();

    if (app) {
      fullName = app.full_name;
      const rawDate = app.allocation_order_at || app.application_created_at;
      if (rawDate) {
        registeredDate = new Date(rawDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        // Compute actual waitlist rank (count of verified waitlist applications earlier than this one)
        const { count } = await supabaseAdmin
          .from('beta_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'phase2_waitlist')
          .lte('allocation_order_at', rawDate);

        if (count && count > 0) {
          queuePosition = count;
        }
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#3B82F6]/20 via-[#60A5FA]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <Clock className="w-3.5 h-3.5" />
          <span>Phase 2 Queue</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
          {t('title')}
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8">
          {t('subtitle')}
        </p>

        {/* 3D WebGL Floating Pass Stage */}
        <WaitlistPass3D
          fullName={fullName}
          waitlistPosition={queuePosition}
          date={registeredDate}
        />

        {/* Viral Sharing Buttons */}
        <SocialShareActions seatOrPosition={queuePosition} isVip={false} />

        {/* FIFO Promotion Notice */}
        <div className="mt-12 w-full max-w-lg bg-[#14181D]/80 border border-white/10 rounded-2xl p-6 text-left">
          <h3 className="text-sm font-bold text-[#60A5FA] uppercase tracking-wider mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>{locale === 'hi' ? 'स्वचालित पदोन्नति कैसे काम करती है' : 'How Auto-Promotion Works'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
            {t('promotion_notice')}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield className="w-4 h-4 text-[#36C96A]" />
            <span>DPDP Act Compliant · Strict FIFO verified order</span>
          </div>
        </div>
      </div>
    </main>
  );
}

