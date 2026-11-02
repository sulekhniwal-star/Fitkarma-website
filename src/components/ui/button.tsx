import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "gold" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand-accent text-canvas hover:bg-brand-green shadow-glow hover:shadow-[0_0_35px_-5px_rgba(101,201,75,0.5)] focus-visible:ring-brand-accent",
    gold:
      "bg-brand-gold text-canvas hover:bg-brand-goldLight shadow-glow-gold hover:shadow-[0_0_35px_-5px_rgba(214,168,75,0.5)] focus-visible:ring-brand-gold",
    outline:
      "bg-card/80 text-ink-primary border border-card-border hover:border-brand-accent/50 hover:bg-card-elevated focus-visible:ring-brand-accent",
    ghost:
      "bg-transparent text-ink-muted hover:text-white hover:bg-card/40 focus-visible:ring-brand-accent",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

