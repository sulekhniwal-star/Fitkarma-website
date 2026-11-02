import React from "react";
import { JaaliPattern } from "./indian-motifs";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "elevated" | "gold";
  withJaali?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "glass",
  withJaali = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    glass:
      "bg-card/70 backdrop-blur-xl border border-card-border hover:border-brand-accent/40 shadow-xl transition-all duration-300",
    elevated:
      "bg-card-elevated/90 backdrop-blur-2xl border border-card-borderHover shadow-2xl hover:border-brand-accent/50 transition-all duration-300",
    gold:
      "bg-card/85 backdrop-blur-xl border border-brand-gold/30 hover:border-brand-gold/60 shadow-glow-gold-subtle transition-all duration-300",
  };

  return (
    <div
      className={`relative rounded-2xl p-6 overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {withJaali && <JaaliPattern opacity={0.04} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

