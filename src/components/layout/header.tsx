"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

interface HeaderProps {
  locale: Locale;
  messages: {
    nav: {
      features: string;
      nutrition: string;
      howItWorks: string;
      privacy: string;
      faq: string;
      joinBeta: string;
      switchLanguage: string;
    };
  };
}

export function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const targetLocale = locale === "en" ? "hi" : "en";
  const switchLabel = locale === "en" ? "हिन्दी" : "English";

  const navLinks = [
    { href: `/${locale}#features`, label: messages.nav.features },
    { href: `/${locale}#nutrition`, label: messages.nav.nutrition },
    { href: `/${locale}#how-it-works`, label: messages.nav.howItWorks },
    { href: `/${locale}#faq`, label: messages.nav.faq },
    { href: `/${locale}/privacy`, label: messages.nav.privacy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-canvas/80 border-b border-card-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <BrandLogo
            variant="horizontal"
            href={`/${locale}`}
            className="w-36 sm:w-44 md:w-52"
            priority
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-accent transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <Link
            href={`/${targetLocale}`}
            className="px-3 py-1.5 rounded-lg border border-card-border hover:border-brand-accent/50 text-xs font-semibold text-ink-muted hover:text-white transition-all flex items-center gap-1.5"
            aria-label={`Switch to ${switchLabel}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span>{switchLabel}</span>
          </Link>

          {/* Join Beta CTA */}
          <Button
            variant="primary"
            size="sm"
            href={`/${locale}#beta-card`}
          >
            {messages.nav.joinBeta}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href={`/${targetLocale}`}
            className="px-2.5 py-1 rounded-md border border-card-border text-xs font-semibold text-brand-gold"
          >
            {switchLabel}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-ink-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-card-elevated border-b border-card-border flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-medium text-ink-primary hover:text-brand-accent border-b border-card-border/40"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              href={`/${locale}#beta-card`}
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {messages.nav.joinBeta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

