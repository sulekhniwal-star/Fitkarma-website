import React from "react";
import { Messages } from "@/i18n/get-messages";

interface HowItWorksSectionProps {
  messages: Messages;
}

export function HowItWorksSection({ messages }: HowItWorksSectionProps) {
  const { howItWorks } = messages;

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border">
      <div className="mx-auto max-w-container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {howItWorks.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-base text-fk-textSecondary leading-relaxed">
            {howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {howItWorks.steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-fk-border bg-surface-1/40 p-8 flex flex-col justify-between relative transition-all duration-300 hover:border-fk-borderHover hover:bg-surface-1/70"
            >
              <div>
                <span className="text-4xl font-extrabold text-brand-primary/40 font-mono">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-fk-textSecondary leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-brand-primary/30" />
                <span className="text-[11px] font-medium text-fk-textMuted uppercase tracking-wider">
                  Step {idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

