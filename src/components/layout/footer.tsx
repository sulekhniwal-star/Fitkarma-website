import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { GlobeIcon } from "@/components/ui/icons";

interface FooterProps {
  locale: Locale;
  messages: Messages;
}

export function Footer({ locale, messages }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const otherLocale: Locale = locale === "en" ? "hi" : "en";
  const otherLocaleLabel = locale === "en" ? "हिन्दी" : "English";

  return (
    <footer className="border-t border-fk-border bg-surface-1/40 py-16 px-4 sm:px-6 lg:px-8 text-xs text-fk-textMuted">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-fk-border/60">
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
              aria-label="FitKarma Home"
            >
              <Image
                src="/brand/fitkarma-mark.svg"
                alt="FitKarma Logo"
                width={32}
                height={32}
                className="h-7 w-7"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                Fit<span className="text-brand-primary">Karma</span>
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-fk-textSecondary max-w-sm">
              {messages.brand.tagline}
            </p>
            <p className="mt-2 text-[11px] text-fk-textMuted">
              Built with care for Indian households and everyday health routines.
            </p>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3.5">
              Explore
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}#features`} className="hover:text-white transition-colors">
                  {messages.nav.features}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#nutrition`} className="hover:text-white transition-colors">
                  {messages.nav.nutrition}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#how-it-works`} className="hover:text-white transition-colors">
                  {messages.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-white transition-colors">
                  {messages.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Contact (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3.5">
              Trust & Support
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}#privacy`} className="hover:text-white transition-colors">
                  {messages.footer.privacyNotice}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#privacy`} className="hover:text-white transition-colors">
                  {messages.footer.betaTerms}
                </Link>
              </li>
              <li className="text-fk-textSecondary pt-1">
                <span>{messages.footer.contact}</span>
              </li>
            </ul>

            {/* Language Switcher in Footer */}
            <div className="mt-5">
              <Link
                href={`/${otherLocale}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-fk-border bg-surface-2 px-3 py-1.5 text-xs text-fk-textSecondary hover:border-fk-borderHover hover:text-white transition-colors"
              >
                <GlobeIcon className="h-3.5 w-3.5 text-brand-primary" />
                <span>Switch to {otherLocaleLabel}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <p>{messages.footer.copyright.replace("{year}", currentYear.toString())}</p>
          <p className="text-fk-textMuted">
            Phase 1 Beta Programme · Maximum 1,000 Verified Places
          </p>
        </div>
      </div>
    </footer>
  );
}

