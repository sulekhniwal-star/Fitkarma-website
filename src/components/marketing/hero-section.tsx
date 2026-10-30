import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { SparklesIcon, ArrowRightIcon, ShieldCheckIcon } from "@/components/ui/icons";

interface HeroSectionProps {
  locale: Locale;
  messages: Messages;
}

export function HeroSection({ locale, messages }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
      {/* Background radial ambient lights */}
      <div
        className="pointer-events-none absolute -top-48 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 h-[350px] w-[350px] rounded-full bg-brand-gold/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-fk-border bg-surface-1/80 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-primary shadow-inner">
          <SparklesIcon className="h-3.5 w-3.5 text-brand-primary" />
          <span>{messages.hero.eyebrow}</span>
        </div>

        {/* Primary Headline */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
          {messages.hero.headline}
        </h1>

        {/* Approved Positioning Statement */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fk-textSecondary sm:text-lg">
          {messages.hero.subheadline}
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href={`/${locale}#beta`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-canvas shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/95 hover:shadow-brand-primary/35 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <span>{messages.hero.primaryCta}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <Link
            href={`/${locale}#features`}
            className="inline-flex w-full items-center justify-center rounded-full border border-fk-border bg-surface-1/60 px-7 py-4 text-sm font-medium text-white transition-all hover:border-fk-borderHover hover:bg-surface-1 sm:w-auto"
          >
            {messages.hero.secondaryCta}
          </Link>
        </div>

        {/* Supporting Capacity Note */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface-1/40 border border-fk-border/60 px-4 py-1.5 text-xs text-fk-textMuted">
          <ShieldCheckIcon className="h-4 w-4 text-brand-gold flex-shrink-0" />
          <span>{messages.hero.supportingNote}</span>
        </div>

        {/* Illustrative Product Composition */}
        <div className="mt-16 rounded-2xl border border-fk-border bg-gradient-to-b from-surface-1/80 via-surface-1/40 to-surface-2/30 p-6 sm:p-12 shadow-2xl backdrop-blur-sm">
          <div className="relative mx-auto flex max-w-2xl flex-col items-center justify-center py-6">
            <Image
              src="/brand/fitkarma-primary-dark.svg"
              alt="FitKarma — India's AI-powered Fitness and Wellness Ecosystem"
              width={640}
              height={170}
              priority
              className="h-auto w-full max-w-lg opacity-95 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            />
            <div className="mt-8 flex items-center gap-2">
              <span className="rounded-md border border-fk-border bg-surface-2/80 px-3 py-1 text-[11px] font-semibold text-brand-accent tracking-wider uppercase">
                Illustrative Preview · Beta Release Candidate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

