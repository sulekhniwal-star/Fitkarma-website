import { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return LOCALES.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: locale === "en" ? 1.0 : 0.9,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        hi: `${baseUrl}/hi`,
      },
    },
  }));
}

