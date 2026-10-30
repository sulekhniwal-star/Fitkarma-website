import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import {
  GlobeIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const otherLocale: Locale = locale === "en" ? "hi" : "en";
  const otherLocaleLabel = locale === "en" ? "हिन्दी" : "English";

  return (
    <div className="flex min-h-screen flex-col bg-canvas selection:bg-brand-primary/25">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-fk-border bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="FitKarma Home"
          >
            <Image
              src="/brand/fitkarma-mark.svg"
              alt="FitKarma Logo"
              width={34}
              height={34}
              priority
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                Fit<span className="text-brand-primary">Karma</span>
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-fk-border bg-surface-1/60 px-3 py-1.5 text-xs font-medium text-fk-textSecondary transition-colors hover:border-fk-borderHover hover:text-white"
              aria-label={`Switch language to ${otherLocaleLabel}`}
            >
              <GlobeIcon className="h-3.5 w-3.5 text-brand-primary" />
              <span>{otherLocaleLabel}</span>
            </Link>

            <Link
              href={`/${locale}/#join`}
              className="rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-canvas transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {messages.nav.joinBeta}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          {/* Subtle background ambient glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-fk-border bg-surface-1/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-primary">
              <SparklesIcon className="h-3.5 w-3.5 text-brand-primary" />
              <span>{messages.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {messages.hero.headline}
            </h1>

            {/* Subheadline / Approved Positioning */}
            <p className="mt-6 text-base leading-relaxed text-fk-textSecondary sm:text-lg">
              {messages.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={`/${locale}/#join`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-semibold text-canvas shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/95 sm:w-auto"
              >
                <span>{messages.hero.primaryCta}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/#features`}
                className="inline-flex w-full items-center justify-center rounded-full border border-fk-border bg-surface-1/50 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-fk-borderHover hover:bg-surface-1 sm:w-auto"
              >
                {messages.hero.secondaryCta}
              </Link>
            </div>

            {/* Capacity Assurance & Supporting Note */}
            <div className="mt-8 inline-flex items-center gap-2 text-xs text-fk-textMuted">
              <ShieldCheckIcon className="h-4 w-4 text-brand-gold" />
              <span>{messages.hero.supportingNote}</span>
            </div>

            {/* Illustrative Brand Composition */}
            <div className="mt-16 rounded-2xl border border-fk-border bg-surface-1/40 p-6 sm:p-10">
              <div className="relative mx-auto flex max-w-lg flex-col items-center justify-center py-8">
                <Image
                  src="/brand/fitkarma-primary-dark.svg"
                  alt="FitKarma — India's AI-powered Fitness and Wellness Ecosystem"
                  width={560}
                  height={150}
                  className="h-auto w-full max-w-md opacity-95"
                />
                <span className="mt-6 rounded-md border border-fk-border bg-surface-2/60 px-3 py-1 text-[11px] font-medium text-fk-textMuted uppercase tracking-wider">
                  Illustrative Preview · Phase 1 Beta Foundation
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-fk-border bg-surface-1/30 py-8 text-center text-xs text-fk-textMuted">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>{messages.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-fk-textSecondary cursor-pointer">{messages.footer.privacyNotice}</span>
            <span className="hover:text-fk-textSecondary cursor-pointer">{messages.footer.betaTerms}</span>
            <span>{messages.footer.contact}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
