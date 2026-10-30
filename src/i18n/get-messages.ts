import { Locale, DEFAULT_LOCALE } from "./config";
import en from "../messages/en.json";
import hi from "../messages/hi.json";

const messagesMap: Record<Locale, typeof en> = {
  en,
  hi,
};

export type Messages = typeof en;

export function getMessages(locale: string): Messages {
  if (locale === "hi") {
    return messagesMap.hi;
  }
  return messagesMap[DEFAULT_LOCALE];
}

