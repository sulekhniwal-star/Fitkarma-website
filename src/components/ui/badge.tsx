import React from "react";

export type BadgeVariant =
  | "beta"
  | "rolling"
  | "planned"
  | "gold"
  | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({
  variant = "beta",
  children,
  className = "",
  dot = true,
}: BadgeProps) {
  const variantStyles = {
    beta: "bg-brand-accent/15 text-brand-accent border-brand-accent/30",
    rolling: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    planned: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    gold: "bg-brand-gold/15 text-brand-gold border-brand-gold/30 shadow-[0_0_15px_-3px_rgba(214,168,75,0.25)]",
    neutral: "bg-card-elevated text-ink-muted border-card-border",
  };

  const dotColorStyles = {
    beta: "bg-brand-accent animate-pulse",
    rolling: "bg-blue-400",
    planned: "bg-purple-400",
    gold: "bg-brand-gold animate-pulse",
    neutral: "bg-ink-subtle",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase select-none ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColorStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

