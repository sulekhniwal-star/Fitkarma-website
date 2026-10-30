"use client";

import React, { useState } from "react";
import { Messages } from "@/i18n/get-messages";
import { UtensilsIcon, FlameIcon } from "@/components/ui/icons";

interface NutritionShowcaseProps {
  messages: Messages;
}

export function NutritionShowcase({ messages }: NutritionShowcaseProps) {
  const { nutritionShowcase } = messages;

  // Interactive demo states
  const [katoriCount, setKatoriCount] = useState<number>(1);
  const [tadkaLevel, setTadkaLevel] = useState<"light" | "medium" | "rich">("medium");

  // Approximate nutritional computation based on Indian Moong Dal benchmarks
  const baseKatoriCals = 120; // 1 katori boiled moong dal ~ 120 kcal
  const baseProtein = 8.5; // ~ 8.5g protein per katori
  const tadkaCals = tadkaLevel === "light" ? 25 : tadkaLevel === "medium" ? 45 : 90;

  const totalCalories = Math.round(katoriCount * baseKatoriCals + tadkaCals);
  const totalProtein = (katoriCount * baseProtein).toFixed(1);

  return (
    <section id="nutrition" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-fk-border bg-surface-1/30">
      <div className="mx-auto max-w-container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            {nutritionShowcase.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {nutritionShowcase.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-fk-textSecondary">
            {nutritionShowcase.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Feature Pillars (Left 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {nutritionShowcase.features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-fk-border bg-surface-1/70 p-5 transition-colors hover:border-fk-borderHover"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 border border-fk-border text-brand-primary mb-3.5">
                  <UtensilsIcon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-xs text-fk-textSecondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Katori Demo Widget (Right 5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-brand-primary/30 bg-surface-1/90 p-6 sm:p-7 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-fk-border pb-4">
              <div>
                <span className="text-[11px] font-semibold text-brand-primary uppercase tracking-wider">
                  Interactive Preview
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {nutritionShowcase.demo.dish}
                </h4>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                <FlameIcon className="h-5 w-5" />
              </div>
            </div>

            {/* Katori Selector */}
            <div className="mt-6">
              <label className="text-xs font-medium text-fk-textSecondary block mb-2">
                Portion Size (Standard Katori ~ 150ml)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0.5, 1, 2].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setKatoriCount(amount)}
                    className={`rounded-lg py-2 text-xs font-semibold border transition-all ${
                      katoriCount === amount
                        ? "bg-brand-primary text-canvas border-brand-primary shadow-sm"
                        : "bg-surface-2 text-fk-textSecondary border-fk-border hover:border-fk-borderHover hover:text-white"
                    }`}
                  >
                    {amount} {amount === 1 ? "Katori" : "Katoris"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tadka Level Selector */}
            <div className="mt-5">
              <label className="text-xs font-medium text-fk-textSecondary block mb-2">
                Tadka / Tempering Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["light", "medium", "rich"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setTadkaLevel(level)}
                    className={`rounded-lg py-2 text-xs font-semibold capitalize border transition-all ${
                      tadkaLevel === level
                        ? "bg-brand-gold text-canvas border-brand-gold shadow-sm"
                        : "bg-surface-2 text-fk-textSecondary border-fk-border hover:border-fk-borderHover hover:text-white"
                    }`}
                  >
                    {level} Tadka
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Results Display */}
            <div className="mt-6 rounded-xl border border-fk-border bg-surface-2/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-fk-textMuted uppercase tracking-wider">
                    Calculated Energy
                  </span>
                  <div className="text-2xl font-extrabold text-brand-primary">
                    ~{totalCalories} <span className="text-xs font-normal text-fk-textSecondary">kcal</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-fk-textMuted uppercase tracking-wider">
                    Plant Protein
                  </span>
                  <div className="text-2xl font-extrabold text-white">
                    ~{totalProtein} <span className="text-xs font-normal text-fk-textSecondary">g</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-fk-textMuted text-center border-t border-fk-border/50 pt-2.5">
                {nutritionShowcase.demo.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

