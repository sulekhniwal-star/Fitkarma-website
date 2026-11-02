import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);
  const targetLocale = locale === "en" ? "hi" : "en";
  const switchLabel = locale === "en" ? "हिन्दी में देखें" : "View in English";

  return (
    <main className="min-h-screen bg-canvas text-ink-primary flex flex-col justify-between p-6 md:p-12">
      <header className="flex justify-between items-center max-w-6xl mx-auto w-full py-4 border-b border-card-border">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-white">
            Fit<span className="text-brand-accent">Karma</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-glow text-brand-accent font-medium border border-brand-accent/20">
            {messages.announcement.badge}
          </span>
        </div>
        <Link
          href={`/${targetLocale}`}
          className="text-sm font-medium text-ink-muted hover:text-brand-accent transition-colors px-3 py-1.5 rounded-lg border border-card-border hover:border-brand-accent/40"
        >
          {switchLabel}
        </Link>
      </header>

      <section className="max-w-4xl mx-auto text-center my-auto py-16">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-card-elevated border border-card-border text-xs font-semibold tracking-wider text-brand-gold uppercase">
          {messages.hero.eyebrow}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
          {messages.hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-ink-muted mb-8 max-w-2xl mx-auto leading-relaxed">
          {messages.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <span className="px-8 py-3.5 rounded-xl bg-brand-accent text-canvas font-bold text-base shadow-glow hover:bg-brand-green transition-all">
            {messages.hero.primaryCta}
          </span>
          <span className="px-8 py-3.5 rounded-xl bg-card-elevated text-ink-primary font-semibold text-base border border-card-border hover:border-brand-accent/40 transition-all">
            {messages.hero.secondaryCta}
          </span>
        </div>

        <p className="text-xs text-ink-subtle mt-6">
          {messages.hero.supportingNote}
        </p>
      </section>

      <footer className="max-w-6xl mx-auto w-full pt-6 border-t border-card-border text-center text-xs text-ink-subtle">
        <p>{messages.footer.tagline} • {messages.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
      </footer>
    </main>
  );
}

