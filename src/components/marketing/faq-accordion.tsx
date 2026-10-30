"use client";

import React, { useState } from "react";
import { Messages } from "@/i18n/get-messages";
import { ChevronDownIcon } from "@/components/ui/icons";

interface FaqAccordionProps {
  messages: Messages;
}

export function FaqAccordion({ messages }: FaqAccordionProps) {
  const { faq } = messages;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleIndex(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {faq.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {faq.title}
          </h2>
        </div>

        {/* Questions Accordion */}
        <div className="mt-14 divide-y divide-fk-border border-y border-fk-border">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div key={idx} className="py-5">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(idx)}
                    className="flex w-full items-center justify-between gap-4 text-left font-semibold text-white transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1"
                  >
                    <span className="text-sm sm:text-base">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface-2 border border-fk-border text-fk-textSecondary transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-primary border-brand-primary/40" : ""
                      }`}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="mt-3.5 pr-8 text-xs sm:text-sm text-fk-textSecondary leading-relaxed"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

