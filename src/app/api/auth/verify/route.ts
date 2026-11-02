import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const appId = searchParams.get('appId') || searchParams.get('id');
  const email = searchParams.get('email');
  const locale = searchParams.get('locale') === 'hi' ? 'hi' : 'en';

  if (!appId || !email) {
    return NextResponse.redirect(new URL(`/${locale}/auth/verify?error=missing_parameters`, origin));
  }

  try {
    // 1. Invoke Atomic PostgreSQL Stored Procedure
    const { data, error } = await supabaseAdmin.rpc('confirm_and_allocate_application', {
      p_application_id: appId,
      p_verified_email: email,
    });

    if (error || !data) {
      return NextResponse.redirect(new URL(`/${locale}/auth/verify?error=invalid_or_expired`, origin));
    }

    // 2. Evaluate Allocation Result
    const allocation = data as {
      status: string;
      seat_number: number | null;
      phase_key: string;
      already_allocated: boolean;
    };

    if (allocation.status === 'phase1_accepted') {
      const seat = allocation.seat_number || 1;
      return NextResponse.redirect(new URL(`/${locale}/beta/pass?id=${appId}&seat=${seat}`, origin));
    }

    if (allocation.status === 'phase2_waitlist') {
      return NextResponse.redirect(new URL(`/${locale}/beta/waitlist?id=${appId}`, origin));
    }

    return NextResponse.redirect(new URL(`/${locale}/auth/verify?error=unknown_state`, origin));
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/auth/verify?error=server_error`, origin));
  }
}
