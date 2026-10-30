import React from "react";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Messages } from "@/i18n/get-messages";
import { SparklesIcon, ArrowRightIcon } from "@/components/ui/icons";

interface AnnouncementBannerProps {
  locale: Locale;
  messages: Messages;
}

export function AnnouncementBanner({ locale, messages }: AnnouncementBannerProps) {
  return (
    <aside
      aria-label="Announcement"
      className="relative z-40 border-b border-fk-border bg-surface-1/90 px-4 py-2 text-center text-xs text-fk-textSecondary"
    >
      <div className="mx-auto flex max-w-container items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-brand-primary border border-brand-primary/25">
          <SparklesIcon className="h-3 w-3" />
          {messages.announcement.badge}
        </span>
        <span className="text-fk-textPrimary font-normal">{messages.announcement.text}</span>
        <Link
          href={`/${locale}#beta`}
          className="inline-flex items-center gap-1 font-medium text-brand-primary hover:underline underline-offset-4"
        >
          <span>{messages.nav.joinBeta}</span>
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  );
}

