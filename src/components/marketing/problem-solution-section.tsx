import React from "react";
import { Messages } from "@/i18n/get-messages";
import { CheckIcon, XMarkIcon } from "@/components/ui/icons";

interface ProblemSolutionProps {
  messages: Messages;
}

export function ProblemSolutionSection({ messages }: ProblemSolutionProps) {
  const { problemSolution } = messages;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-fk-border">
      <div className="mx-auto max-w-container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {problemSolution.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {problemSolution.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-fk-textSecondary">
            {problemSolution.description}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Traditional Apps Card */}
          <div className="rounded-2xl border border-red-500/20 bg-surface-1/40 p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <XMarkIcon className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold text-white">
                {problemSolution.traditionalTitle}
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-fk-textSecondary">
              {problemSolution.traditionalItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-red-400/80">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FitKarma Ecosystem Card */}
          <div className="rounded-2xl border border-brand-primary/30 bg-gradient-to-b from-brand-primary/10 via-surface-1/60 to-surface-1/80 p-6 sm:p-8 relative shadow-lg shadow-brand-primary/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary">
                <CheckIcon className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold text-white">
                {problemSolution.fitkarmaTitle}
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-fk-textPrimary">
              {problemSolution.fitkarmaItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-brand-primary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

