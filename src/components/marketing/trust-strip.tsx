import React from "react";
import { Messages } from "@/i18n/get-messages";
import { UtensilsIcon, BrainIcon, HeartPulseIcon, UsersIcon } from "@/components/ui/icons";

interface TrustStripProps {
  messages: Messages;
}

export function TrustStrip({ messages }: TrustStripProps) {
  const icons = [
    <UtensilsIcon key="0" className="h-5 w-5 text-brand-primary" />,
    <BrainIcon key="1" className="h-5 w-5 text-brand-accent" />,
    <HeartPulseIcon key="2" className="h-5 w-5 text-brand-primary" />,
    <UsersIcon key="3" className="h-5 w-5 text-brand-gold" />,
  ];

  return (
    <section aria-label="Key Pillars" className="border-y border-fk-border bg-surface-1/40 py-8">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {messages.trustStrip.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 rounded-xl border border-fk-border/50 bg-surface-1/30 p-4 transition-colors hover:border-fk-borderHover hover:bg-surface-1/60"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-2 border border-fk-border">
                {icons[idx]}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-fk-textSecondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

