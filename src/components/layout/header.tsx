"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { GlobeIcon, MenuIcon, XMarkIcon } from "@/components/ui/icons";

interface HeaderProps {
  locale: Locale;
  messages: Messages;
}

export function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLocale: Locale = locale === "en" ? "hi" : "en";
  const otherLocaleLabel = locale === "en" ? "हिन्दी" : "English";

  const navLinks = [
    { href: `/${locale}#features`, label: messages.nav.features },
    { href: `/${locale}#nutrition`, label: messages.nav.nutrition },
    { href: `/${locale}#how-it-works`, label: messages.nav.howItWorks },
    { href: `/${locale}#privacy`, label: messages.nav.privacy },
    { href: `/${locale}#faq`, label: messages.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-fk-border bg-canvas/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1"
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
          <span className="text-xl font-bold tracking-tight text-white">
            Fit<span className="text-brand-primary">Karma</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-fk-textSecondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded px-1.5 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={`/${otherLocale}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-fk-border bg-surface-1/60 px-3 py-1.5 text-xs font-medium text-fk-textSecondary transition-colors hover:border-fk-borderHover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label={`Switch language to ${otherLocaleLabel}`}
          >
            <GlobeIcon className="h-3.5 w-3.5 text-brand-primary" />
            <span>{otherLocaleLabel}</span>
          </Link>

          <Link
            href={`/${locale}#beta`}
            className="rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-canvas shadow-sm shadow-brand-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {messages.nav.joinBeta}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={`/${otherLocale}`}
            className="inline-flex items-center gap-1 rounded-full border border-fk-border bg-surface-1/60 px-2.5 py-1 text-xs text-fk-textSecondary"
            aria-label={`Switch to ${otherLocaleLabel}`}
          >
            <GlobeIcon className="h-3.5 w-3.5 text-brand-primary" />
            <span>{otherLocaleLabel}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-fk-textSecondary hover:bg-surface-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-fk-border bg-surface-1/95 px-4 pb-6 pt-2 backdrop-blur-xl">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-fk-textSecondary transition-colors hover:bg-surface-2 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-3 border-t border-fk-border">
              <Link
                href={`/${locale}#beta`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-brand-primary py-2.5 text-xs font-semibold text-canvas"
              >
                {messages.nav.joinBeta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

