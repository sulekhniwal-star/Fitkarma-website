import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneMockup3D } from "@/components/ui/phone-mockup-3d";
import {
  JaaliPattern,
  MandalaGlow,
  KatoriIcon,
  RotiIcon,
  TadkaFlameIcon,
  ThaliIcon,
} from "@/components/ui/indian-motifs";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <div className="min-h-screen bg-canvas text-ink-primary flex flex-col justify-between selection:bg-brand-accent/30 selection:text-white">
      {/* Global Header */}
      <Header locale={locale as Locale} messages={messages} />

      <main className="flex-1 relative overflow-hidden">
        {/* Subtle Ambient Indian Jaali Watermark */}
        <JaaliPattern opacity={0.04} />

        {/* Hero Section with 3D Phone Mockup */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Ambient Radial Mandala Aura behind Hero */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
            <MandalaGlow />
          </div>

          {/* Left Column: Hero Copy & Actions */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-card-elevated border border-brand-gold/30 text-xs font-semibold tracking-wider text-brand-gold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span>{messages.announcement.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              {messages.hero.headline}
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {messages.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button variant="primary" size="lg" href={`/${locale}#beta-card`}>
                {messages.hero.primaryCta}
              </Button>
              <Button variant="gold" size="lg" href={`/${locale}#features`}>
                {messages.hero.secondaryCta}
              </Button>
            </div>

            {/* Supporting Note */}
            <p className="text-xs text-ink-subtle max-w-md mx-auto lg:mx-0">
              {messages.hero.supportingNote}
            </p>

            {/* Desi Portion Quick Preview Strip */}
            <div className="mt-8 pt-6 border-t border-card-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink-muted">
              <span className="text-white font-medium flex items-center gap-1.5">
                <KatoriIcon className="w-4 h-4 text-brand-gold" />
                <span>Katori Measures</span>
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <RotiIcon className="w-4 h-4 text-brand-gold" />
                <span>Roti Counter</span>
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <TadkaFlameIcon className="w-4 h-4 text-brand-accent" />
                <span>Tadka Oil Slider</span>
              </span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <ThaliIcon className="w-4 h-4 text-brand-gold" />
                <span>500+ Indian Dishes</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Rendered Phone Mockup with Simulated UI */}
          <div className="flex-1 flex justify-center z-10 w-full max-w-md lg:max-w-none">
            <PhoneMockup3D tiltDirection="center">
              {/* Simulated Ambient App Interface inside 3D Phone */}
              <div className="flex flex-col gap-3 py-2 text-left">
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] text-ink-subtle uppercase tracking-wider block">
                      Daily Intelligence (DIP)
                    </span>
                    <span className="text-sm font-bold text-white">Morning Brief</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent text-[10px] font-bold border border-brand-accent/30">
                    Optimal
                  </span>
                </div>

                {/* Simulated Morning Card */}
                <div className="p-3 rounded-xl bg-card-elevated border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-brand-gold flex items-center gap-1">
                      <TadkaFlameIcon className="w-3.5 h-3.5" />
                      <span>Breakfast Logged</span>
                    </span>
                    <span className="text-[10px] text-ink-subtle">Hinglish Voice</span>
                  </div>
                  <p className="text-xs text-white font-medium">
                    &quot;2 Besan Cheela + Pudina Chutney&quot;
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-muted">
                    <span>🔥 340 kcal</span>
                    <span>🥗 14g Protein</span>
                    <span>🥣 1 Katori</span>
                  </div>
                </div>

                {/* Simulated WhatsApp Conversational Bar */}
                <div className="p-2.5 rounded-xl bg-card border border-brand-accent/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] text-xs">
                      💬
                    </div>
                    <span className="text-[11px] text-white">
                      &quot;Bhai 2 roti aur dal tadka log kar de&quot;
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-accent font-semibold">Done ✓</span>
                </div>

                {/* Simulated Nutrition Ring & Progress */}
                <div className="p-3 rounded-xl bg-card-elevated border border-white/10">
                  <span className="text-[10px] text-ink-muted uppercase tracking-wider block mb-1">
                    Family Health Telemetry
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Maa & Papa Squad</span>
                    <span className="text-[11px] text-brand-gold font-bold">8,420 / 10k Steps</span>
                  </div>
                  <div className="w-full h-1.5 bg-card rounded-full mt-2 overflow-hidden">
                    <div className="w-[84%] h-full bg-gradient-to-r from-brand-accent to-brand-gold rounded-full" />
                  </div>
                </div>
              </div>
            </PhoneMockup3D>
          </div>
        </section>

        {/* Component & Token Showcase Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-card-border/60">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Design System & Reusable Primitives
            </h2>
            <p className="text-sm text-ink-muted max-w-xl mx-auto">
              Codified tokens, Indian cultural craft, and accessible UI components engineered for the FitKarma ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Rollout Statuses */}
            <Card variant="glass" withJaali>
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-brand-gold">
                Rollout Label System
              </h3>
              <p className="text-xs text-ink-muted mb-4">
                Disciplined status tagging protecting product truth without invented claims.
              </p>
              <div className="flex flex-col gap-2">
                <Badge variant="beta">In beta</Badge>
                <Badge variant="rolling">Rolling out during beta</Badge>
                <Badge variant="planned">Planned within the beta programme</Badge>
                <Badge variant="gold">Phase 1 VIP Founder</Badge>
              </div>
            </Card>

            {/* Card 2: Button Variants */}
            <Card variant="elevated">
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-brand-accent">
                Button Primitive Hierarchy
              </h3>
              <p className="text-xs text-ink-muted mb-4">
                High-contrast focus rings and hardware-accelerated transitions.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="primary" size="sm">
                  Primary Action (Emerald Glow)
                </Button>
                <Button variant="gold" size="sm">
                  VIP Action (Indian Brass Glow)
                </Button>
                <Button variant="outline" size="sm">
                  Secondary Action (Glass Outline)
                </Button>
              </div>
            </Card>

            {/* Card 3: Indian Cultural Tokens */}
            <Card variant="gold" withJaali>
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-brand-gold">
                Desi Nuance & Cultural Craft
              </h3>
              <p className="text-xs text-ink-muted mb-4">
                Engineered for Indian household portions and cooking reality.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-white">
                <div className="p-2.5 rounded-lg bg-card-elevated/80 border border-brand-gold/20 flex items-center gap-2">
                  <KatoriIcon className="w-5 h-5 text-brand-gold" />
                  <span>Katori (150ml)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-card-elevated/80 border border-brand-gold/20 flex items-center gap-2">
                  <RotiIcon className="w-5 h-5 text-brand-gold" />
                  <span>Roti Units</span>
                </div>
                <div className="p-2.5 rounded-lg bg-card-elevated/80 border border-brand-gold/20 flex items-center gap-2">
                  <TadkaFlameIcon className="w-5 h-5 text-brand-accent" />
                  <span>Tadka Slider</span>
                </div>
                <div className="p-2.5 rounded-lg bg-card-elevated/80 border border-brand-gold/20 flex items-center gap-2">
                  <ThaliIcon className="w-5 h-5 text-brand-gold" />
                  <span>Family Splitter</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer locale={locale as Locale} messages={messages} />
    </div>
  );
}
