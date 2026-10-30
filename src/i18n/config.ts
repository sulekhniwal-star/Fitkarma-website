export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, { name: string; nativeName: string }> = {
  en: {
    name: "English",
    nativeName: "English",
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी",
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

