import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

export default async function BetaStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string; status?: string; seat?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { status, seat } = await searchParams;
  const isHindi = locale === "hi";

  const isAccepted = status === "phase1_accepted";
  const seatNumber = seat ? parseInt(seat, 10) : null;
  const referenceCode = seatNumber
    ? `FK-P1-${String(seatNumber).padStart(4, "0")}`
    : "FK-P2-WAITLIST";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-16 text-center text-fk-textPrimary">
      {/* Glow */}
      <div
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-lg rounded-2xl border border-fk-border bg-surface-1/90 p-8 shadow-2xl backdrop-blur-md">
        {/* Status Badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary mb-6">
          <CheckIcon className="h-7 w-7" />
        </div>

        {isAccepted ? (
          <>
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
              {isHindi ? "बीटा स्थान पक्का हुआ" : "Phase 1 Beta Confirmed"}
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {isHindi ? "FitKarma Phase 1 में आपका स्वागत है" : "You're In the Phase 1 Beta"}
            </h1>
            <p className="mt-3 text-sm text-fk-textSecondary leading-relaxed">
              {isHindi
                ? "आपका ईमेल सफलतापूर्वक सत्यापित हो चुका है और Phase 1 के पहले 1,000 स्थानों में आपका स्थान सुरक्षित है।"
                : "Your email has been verified and your place is secured in the initial 1,000 Phase 1 cohort."}
            </p>

            <div className="mt-6 rounded-xl border border-fk-border bg-surface-2/80 p-4">
              <span className="text-xs text-fk-textMuted uppercase tracking-wider block">
                {isHindi ? "आपका संदर्भ नंबर" : "Your Reference Code"}
              </span>
              <span className="text-xl font-mono font-bold text-brand-primary mt-1 block">
                {referenceCode}
              </span>
            </div>

            <p className="mt-6 text-xs text-fk-textMuted leading-relaxed">
              {isHindi
                ? "बीटा एक्सेस शुरू होने पर अगले चरणों की जानकारी आपके ईमेल पर भेजी जाएगी। FitKarma की सुविधाएँ चरणों में उपलब्ध कराई जाएँगी।"
                : "We will email you with your access instructions as onboarding opens. Features will roll out progressively during the beta programme."}
            </p>
          </>
        ) : (
          <>
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
              {isHindi ? "प्रतीक्षा सूची में शामिल" : "Waitlist Placement"}
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {isHindi ? "आप Phase 2 प्रतीक्षा सूची में हैं" : "You're on the Phase 2 Waitlist"}
            </h1>
            <p className="mt-3 text-sm text-fk-textSecondary leading-relaxed">
              {isHindi
                ? "Phase 1 के 1,000 स्थान पूरे हो चुके हैं। आपका आवेदन सत्यापित हो गया है और Phase 2 प्रतीक्षा सूची में दर्ज है।"
                : "Phase 1 has reached its 1,000-seat ceiling. Your application is verified and placed on the Phase 2 waitlist."}
            </p>

            <div className="mt-6 rounded-xl border border-fk-border bg-surface-2/80 p-4">
              <span className="text-xs text-fk-textMuted uppercase tracking-wider block">
                {isHindi ? "प्रतीक्षा सूची संदर्भ" : "Waitlist Reference"}
              </span>
              <span className="text-xl font-mono font-bold text-brand-gold mt-1 block">
                {referenceCode}
              </span>
            </div>

            <p className="mt-6 text-xs text-fk-textMuted leading-relaxed">
              {isHindi
                ? "Phase 2 शुरू होते ही आपको ईमेल द्वारा सूचित किया जाएगा। आपके धैर्य के लिए धन्यवाद।"
                : "We will notify you by email as soon as Phase 2 opens. Thank you for your patience and support."}
            </p>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-fk-border">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-2.5 text-xs font-semibold text-canvas hover:bg-brand-primary/95 transition-all"
          >
            <span>{isHindi ? "मुखपृष्ठ पर लौटें" : "Return to Home"}</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
