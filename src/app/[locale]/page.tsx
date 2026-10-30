import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { Header } from "@/components/layout/header";
import { AnnouncementBanner } from "@/components/marketing/announcement-banner";
import { HeroSection } from "@/components/marketing/hero-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { ProblemSolutionSection } from "@/components/marketing/problem-solution-section";
import { FeatureBentoGrid } from "@/components/marketing/feature-bento-grid";
import { NutritionShowcase } from "@/components/marketing/nutrition-showcase";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { PrivacySection } from "@/components/marketing/privacy-section";
import { BetaCapacitySection } from "@/components/marketing/beta-capacity-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Footer } from "@/components/layout/footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col bg-canvas selection:bg-brand-primary/25 scroll-smooth">
      {/* 1. Announcement Banner */}
      <AnnouncementBanner locale={locale} messages={messages} />

      {/* 2. Top Navigation */}
      <Header locale={locale} messages={messages} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 3. Cinematic Hero */}
        <HeroSection locale={locale} messages={messages} />

        {/* 4. Trust / Positioning Strip */}
        <TrustStrip messages={messages} />

        {/* 5. Problem to Value Re-imagining */}
        <ProblemSolutionSection messages={messages} />

        {/* 6. Feature Bento Grid with Rollout Badges */}
        <FeatureBentoGrid messages={messages} />

        {/* 7. India-First Nutrition Showcase with Interactive Katori Calculator */}
        <NutritionShowcase messages={messages} />

        {/* 8. How FitKarma Works in 3 Steps */}
        <HowItWorksSection messages={messages} />

        {/* 9. Privacy by Design & India DPDP Alignment */}
        <PrivacySection locale={locale} messages={messages} />

        {/* 10. Beta Capacity Ceiling & Allocation Rule */}
        <BetaCapacitySection locale={locale} messages={messages} />

        {/* 11. FAQ Accordion */}
        <FaqAccordion messages={messages} />
      </main>

      {/* 12. Footer */}
      <Footer locale={locale} messages={messages} />
    </div>
  );
}
