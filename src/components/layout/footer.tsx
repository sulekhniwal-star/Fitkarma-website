import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { JaaliPattern } from "@/components/ui/indian-motifs";
import type { Locale } from "@/i18n/config";

interface FooterProps {
  locale: Locale;
  messages: {
    footer: {
      tagline: string;
      features: string;
      nutrition: string;
      howItWorks: string;
      privacyNotice: string;
      betaTerms: string;
      contact: string;
      copyright: string;
    };
  };
}

export function Footer({ locale, messages }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-canvas-subtle border-t border-card-border overflow-hidden pt-16 pb-12">
      {/* Subtle cultural backdrop watermark */}
      <JaaliPattern opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-card-border">
          {/* Brand Info Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <BrandLogo variant="horizontal" href={`/${locale}`} className="w-48 sm:w-56" />
            <p className="text-sm text-ink-muted max-w-md leading-relaxed">
              {messages.footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                Phase 1 VIP Beta • Limited to 1,000 Verified Seats
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-ink-muted">
              <li>
                <Link href={`/${locale}#features`} className="hover:text-brand-accent transition-colors">
                  {messages.footer.features}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#nutrition`} className="hover:text-brand-accent transition-colors">
                  {messages.footer.nutrition}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#how-it-works`} className="hover:text-brand-accent transition-colors">
                  {messages.footer.howItWorks}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-brand-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Legal
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-ink-muted">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-brand-accent transition-colors">
                  {messages.footer.privacyNotice}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-brand-accent transition-colors">
                  {messages.footer.betaTerms}
                </Link>
              </li>
              <li className="pt-2 text-xs text-ink-subtle">
                <span className="block font-medium text-ink-muted">Official Support:</span>
                <a
                  href="mailto:sulekhniwal@gmail.com"
                  className="text-brand-gold hover:underline"
                >
                  sulekhniwal@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Notice & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <p>
            {messages.footer.copyright.replace("{year}", currentYear.toString())}
          </p>
          <p className="text-center sm:text-right max-w-lg">
            FitKarma is an Indian health & wellness assistant. Not a medical service or clinical diagnostic tool.
          </p>
        </div>
      </div>
    </footer>
  );
}

