import React from "react";
import { Messages } from "@/i18n/get-messages";
import { BETA_FEATURES, FeatureItem } from "@/config/features";
import {
  UtensilsIcon,
  BrainIcon,
  ZapIcon,
  WifiOffIcon,
  HeartPulseIcon,
  UsersIcon,
} from "@/components/ui/icons";

interface FeatureBentoGridProps {
  messages: Messages;
}

export function FeatureBentoGrid({ messages }: FeatureBentoGridProps) {
  const { bento, status: statusMessages } = messages;

  const featureCards = [
    {
      featureId: "indian_nutrition",
      icon: <UtensilsIcon className="h-6 w-6 text-brand-primary" />,
      title: bento.cards.nutrition.title,
      description: bento.cards.nutrition.description,
      highlight: bento.cards.nutrition.highlight,
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      featureId: "dip_intelligence",
      icon: <BrainIcon className="h-6 w-6 text-brand-accent" />,
      title: bento.cards.dip.title,
      description: bento.cards.dip.description,
      highlight: bento.cards.dip.highlight,
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      featureId: "flexible_logging",
      icon: <ZapIcon className="h-6 w-6 text-brand-gold" />,
      title: bento.cards.logging.title,
      description: bento.cards.logging.description,
      highlight: bento.cards.logging.highlight,
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      featureId: "offline_first",
      icon: <WifiOffIcon className="h-6 w-6 text-brand-primary" />,
      title: bento.cards.offline.title,
      description: bento.cards.offline.description,
      highlight: bento.cards.offline.highlight,
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      featureId: "connected_health",
      icon: <HeartPulseIcon className="h-6 w-6 text-brand-accent" />,
      title: bento.cards.connected.title,
      description: bento.cards.connected.description,
      highlight: bento.cards.connected.highlight,
      span: "md:col-span-1 lg:col-span-1",
    },
    {
      featureId: "family_wellness",
      icon: <UsersIcon className="h-6 w-6 text-brand-gold" />,
      title: bento.cards.family.title,
      description: bento.cards.family.description,
      highlight: bento.cards.family.highlight,
      span: "md:col-span-2 lg:col-span-3",
    },
  ];

  function getStatusBadge(featureId: string) {
    const feature = BETA_FEATURES.find((f: FeatureItem) => f.id === featureId);
    if (!feature) return null;

    if (feature.status === "in_beta") {
      return (
        <span className="rounded-full bg-brand-primary/15 border border-brand-primary/30 px-2.5 py-0.5 text-[11px] font-semibold text-brand-primary">
          {statusMessages.inBeta}
        </span>
      );
    }
    if (feature.status === "rolling_out") {
      return (
        <span className="rounded-full bg-brand-gold/15 border border-brand-gold/30 px-2.5 py-0.5 text-[11px] font-semibold text-brand-gold">
          {statusMessages.rollingOut}
        </span>
      );
    }
    return (
      <span className="rounded-full bg-surface-2 border border-fk-border px-2.5 py-0.5 text-[11px] font-semibold text-fk-textMuted">
        {statusMessages.planned}
      </span>
    );
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border">
      <div className="mx-auto max-w-container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {bento.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {bento.title}
          </h2>
          <p className="mt-4 text-base text-fk-textSecondary leading-relaxed">
            {bento.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => (
            <div
              key={card.featureId}
              className={`rounded-2xl border border-fk-border bg-surface-1/50 p-7 flex flex-col justify-between transition-all duration-300 hover:border-fk-borderHover hover:bg-surface-1/80 hover:shadow-xl hover:shadow-black/40 ${card.span}`}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 border border-fk-border">
                    {card.icon}
                  </div>
                  {getStatusBadge(card.featureId)}
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-fk-textSecondary leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-fk-border/60">
                <span className="text-xs font-medium text-brand-accent tracking-wide">
                  ✦ {card.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

