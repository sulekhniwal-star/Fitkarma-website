import React from "react";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { ShieldCheckIcon, SparklesIcon } from "@/components/ui/icons";
import { BetaRegistrationForm } from "./beta-registration-form";

interface BetaCapacitySectionProps {
  locale: Locale;
  messages: Messages;
}

export function BetaCapacitySection({ locale, messages }: BetaCapacitySectionProps) {
  const { betaSection } = messages;

  return (
    <section id="beta" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold text-brand-primary">
          <SparklesIcon className="h-3.5 w-3.5" />
          <span>{betaSection.eyebrow}</span>
        </div>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {betaSection.heading}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-fk-textSecondary leading-relaxed">
          {betaSection.body}
        </p>

        {/* Capacity Highlights */}
        <div className="mt-8 mb-12 mx-auto max-w-lg rounded-2xl border border-fk-border bg-surface-1/80 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-fk-border/60 pb-3">
            <span className="text-xs font-medium text-fk-textSecondary">
              Phase 1 Capacity Ceiling
            </span>
            <span className="text-sm font-bold text-brand-primary font-mono">
              1,000 Verified Seats
            </span>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs font-medium text-fk-textSecondary">
              Ordering Rule
            </span>
            <span className="text-xs font-semibold text-white">
              First-Come, First-Served via Verification
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-fk-border/40 text-left">
            <p className="text-[11px] text-fk-textMuted flex items-start gap-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
              <span>{betaSection.guarantee}</span>
            </p>
          </div>
        </div>

        {/* Interactive Beta Application Form */}
        <BetaRegistrationForm locale={locale} messages={messages} />
      </div>
    </section>
  );
}
