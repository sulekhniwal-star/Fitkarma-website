import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { VipPass3D } from '@/components/beta/VipPass3D';
import { SocialShareActions } from '@/components/beta/SocialShareActions';
import { Sparkles, Shield, Award } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Your Official VIP Beta Pass — FitKarma',
    description: 'Claimed official Phase 1 VIP Beta Pass. Founding member of India\'s AI health ecosystem.',
  };
}

export default async function BetaPassPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string; seat?: string }>;
}) {
  const { locale } = await params;
  const { id: appId, seat: seatParam } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'beta.pass' });

  let fullName = 'VIP Founding Member';
  let seatNumber = parseInt(seatParam || '42', 10);
  let verifiedDate = new Date().toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (appId) {
    const { data: app } = await supabaseAdmin
      .from('beta_applications')
      .select('full_name, seat_number, allocation_order_at, email_verified_at')
      .eq('id', appId)
      .maybeSingle();

    if (app) {
      fullName = app.full_name;
      if (app.seat_number) seatNumber = app.seat_number;
      const rawDate = app.allocation_order_at || app.email_verified_at;
      if (rawDate) {
        verifiedDate = new Date(rawDate).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#D6A84B]/20 via-[#36C96A]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* VIP Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6A84B]/10 border border-[#D6A84B]/30 text-[#D6A84B] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(214,168,75,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('founding_badge')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
          {locale === 'hi' ? 'आपका आधिकारिक VIP बीटा पास' : 'Your VIP Beta Pass is Live'}
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8">
          {locale === 'hi'
            ? 'बधाई हो! आपकी सीट आरक्षित कर दी गई है। अपने पास को 3D में देखें, घुमाएं और डाउनलोड करें।'
            : 'Welcome to the inner circle. Drag to inspect your pass in 3D or download for sharing.'}
        </p>

        {/* 3D WebGL Floating Pass Stage */}
        <VipPass3D
          fullName={fullName}
          seatNumber={seatNumber}
          date={verifiedDate}
        />

        {/* Viral Sharing Buttons */}
        <SocialShareActions seatOrPosition={seatNumber} isVip={true} />

        {/* Privileges Overview */}
        <div className="mt-12 w-full max-w-lg bg-[#14181D]/80 border border-white/10 rounded-2xl p-6 text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D6A84B]" />
            <span>{locale === 'hi' ? 'संस्थापक सदस्य विशेषाधिकार' : 'VIP Member Privileges'}</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-[#36C96A] font-bold">✓</span>
              <span>{locale === 'hi' ? 'प्रारंभिक AI भोजन स्कैनर और भारतीय पोषण ट्रैकर तक पहली पहुँच' : 'Guaranteed first access to Indian Nutrition AI & Food Scanner'}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#36C96A] font-bold">✓</span>
              <span>{locale === 'hi' ? 'आजीवन संस्थापक सदस्य बैज और प्राथमिक सुविधा अनुरोध' : 'Lifetime Founding Member profile badge & priority feature roadmap requests'}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#36C96A] font-bold">✓</span>
              <span>{locale === 'hi' ? 'DPDP अधिनियम के तहत 100% डेटा संप्रभुता और गोपनीयता' : 'Zero third-party advertising & full data sovereignty'}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

