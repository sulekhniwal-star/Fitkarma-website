import type { Locale } from "./config";
import enMessages from "../messages/en.json";
import hiMessages from "../messages/hi.json";

export type Messages = typeof enMessages;

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  hi: hiMessages as unknown as Messages,
};

export function getMessages(locale: Locale): Messages {
  return messagesMap[locale] || messagesMap.en;
}

