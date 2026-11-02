import React from "react";
import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "horizontal" | "wordmark" | "mark" | "icon";

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  href?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant = "horizontal",
  className = "",
  href,
  priority = false,
}: BrandLogoProps) {
  let src = "/brand/fitkarma-primary-dark.svg";
  let width = 240;
  let height = 64;
  let alt = "FitKarma — India's AI-powered Fitness and Wellness Ecosystem";

  switch (variant) {
    case "wordmark":
      src = "/brand/fitkarma-wordmark-dark.svg";
      width = 160;
      height = 42;
      alt = "FitKarma Wordmark";
      break;
    case "mark":
      src = "/brand/fitkarma-mark.svg";
      width = 48;
      height = 48;
      alt = "FitKarma Energy Mark";
      break;
    case "icon":
      src = "/brand/fitkarma-app-icon-dark.svg";
      width = 56;
      height = 56;
      alt = "FitKarma App Icon";
      break;
    case "horizontal":
    default:
      src = "/brand/fitkarma-primary-dark.svg";
      width = 240;
      height = 64;
      alt = "FitKarma — India's AI-powered Fitness and Wellness Ecosystem";
      break;
  }

  const logoImage = (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      className={`h-auto w-auto object-contain transition-opacity duration-200 ${className}`}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg"
        aria-label="FitKarma Home"
      >
        {logoImage}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{logoImage}</div>;
}

