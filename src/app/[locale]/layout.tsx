import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isValidLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";

export const viewport: Viewport = {
  themeColor: "#0D0F12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = getMessages(locale);
  const isHindi = locale === "hi";

  return {
    title: {
      default: `${messages.brand.name} — ${messages.brand.tagline}`,
      template: `%s | ${messages.brand.name}`,
    },
    description: messages.hero.subheadline,
    keywords: [
      "FitKarma",
      "AI fitness India",
      "Indian nutrition",
      "wellness ecosystem",
      "health tracking",
      isHindi ? "भारतीय फिटनेस ऐप" : "Indian fitness app",
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        hi: "/hi",
      },
    },
    openGraph: {
      title: `${messages.brand.name} — ${messages.brand.tagline}`,
      description: messages.hero.subheadline,
      url: `/${locale}`,
      siteName: messages.brand.name,
      locale: isHindi ? "hi_IN" : "en_IN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-canvas text-fk-textPrimary" data-locale={locale}>
      {children}
    </div>
  );
}
