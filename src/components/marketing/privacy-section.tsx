import React from "react";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { ShieldCheckIcon, ArrowRightIcon } from "@/components/ui/icons";

interface PrivacySectionProps {
  locale: Locale;
  messages: Messages;
}

export function PrivacySection({ locale, messages }: PrivacySectionProps) {
  const { privacySection } = messages;

  return (
    <section id="privacy" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border bg-surface-1/20">
      <div className="mx-auto max-w-container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {privacySection.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {privacySection.title}
          </h2>
          <p className="mt-4 text-base text-fk-textSecondary leading-relaxed">
            {privacySection.description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacySection.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-fk-border bg-surface-1/60 p-6 flex flex-col justify-between transition-colors hover:border-fk-borderHover"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 border border-fk-border text-brand-primary mb-4">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm text-fk-textSecondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}#privacy`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-primary hover:underline underline-offset-4"
          >
            <span>{privacySection.readNotice}</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

