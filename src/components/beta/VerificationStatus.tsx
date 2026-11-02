'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { FitKarmaMark } from '@/components/brand/FitKarmaMark';

export function VerificationStatus() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isHindi = locale === 'hi';

  const errorParam = searchParams.get('error');
  const appId = searchParams.get('appId') || searchParams.get('id');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'verifying' | 'error'>(errorParam ? 'error' : 'verifying');

  useEffect(() => {
    if (errorParam) {
      setStatus('error');
      return;
    }

    if (appId && email) {
      // Trigger verification API
      window.location.href = `/api/auth/verify?appId=${encodeURIComponent(appId)}&email=${encodeURIComponent(email)}&locale=${locale}`;
    }
  }, [appId, email, errorParam, locale]);

  if (status === 'error' || errorParam) {
    let errorMessage = isHindi
      ? 'सत्यापन लिंक अमान्य है या उसकी 24 घंटे की अवधि समाप्त हो चुकी है।'
      : 'This verification link is invalid or has expired after 24 hours.';

    if (errorParam === 'missing_parameters') {
      errorMessage = isHindi
        ? 'सत्यापन विवरण अनुपलब्ध हैं। कृपया अपने ईमेल में दिए गए लिंक का उपयोग करें।'
        : 'Missing verification credentials. Please click the full link in your email.';
    }

    return (
      <div className="w-full max-w-md mx-auto bg-[#14181D]/90 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-7 h-7 text-red-400" />
        </div>

        <h2 className="text-xl font-bold text-white mb-3">
          {isHindi ? 'सत्यापन विफल' : 'Verification Unsuccessful'}
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {errorMessage}
        </p>

        <Link
          href={`/${locale}/beta`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#36C96A] to-[#65C94B] text-[#0D0F12] font-bold text-sm shadow-[0_4px_14px_rgba(54,201,106,0.35)] hover:brightness-110 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'पंजीकरण पर वापस जाएं' : 'Return to Registration'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[#14181D]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
      <div className="w-16 h-16 mx-auto mb-6 relative">
        <div className="w-16 h-16 rounded-full border-2 border-[#36C96A]/20 border-t-[#36C96A] animate-spin flex items-center justify-center">
          <FitKarmaMark size={28} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">
        {isHindi ? 'ईमेल सत्यापित किया जा रहा है...' : 'Verifying Your Credentials...'}
      </h2>

      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {isHindi
          ? 'हम आपकी पहचान की पुष्टि कर रहे हैं और आपकी VIP सीट संख्या आवंटित कर रहे हैं।'
          : 'Connecting to the database engine and allocating your VIP Beta cohort seat...'}
      </p>

      <div className="inline-flex items-center gap-2 text-xs text-[#36C96A]">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>{isHindi ? 'कृपया प्रतीक्षा करें...' : 'Please do not close this window'}</span>
      </div>
    </div>
  );
}

