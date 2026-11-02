import React, { Suspense } from 'react';
import { VerificationStatus } from '@/components/beta/VerificationStatus';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verifying Email — FitKarma VIP Beta',
  description: 'Verifying credentials and allocating VIP Beta Pass seat number.',
};

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[300px] bg-[#36C96A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto bg-[#14181D]/90 border border-white/10 rounded-2xl p-8 text-center text-gray-400 text-sm">
              Loading verification status...
            </div>
          }
        >
          <VerificationStatus />
        </Suspense>
      </div>
    </main>
  );
}
