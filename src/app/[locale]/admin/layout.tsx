import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { LayoutDashboard, Users, Send, ExternalLink, Globe } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams.locale === "hi" ? "hi" : "en";
  const isHindi = locale === "hi";

  const navLinks = [
    {
      href: `/${locale}/admin`,
      label: isHindi ? "डैशबोर्ड" : "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/admin/applicants`,
      label: isHindi ? "आवेदक" : "Applicants",
      icon: Users,
    },
    {
      href: `/${locale}/admin/campaigns`,
      label: isHindi ? "अभियान" : "Campaigns",
      icon: Send,
    },
  ];

  const switchLocale: Locale = isHindi ? "en" : "hi";
  const switchLabel = isHindi ? "English" : "हिन्दी";

  return (
    <div className="min-h-screen bg-[#0D0F12] text-white flex flex-col font-sans">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#14181D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/admin`} className="flex items-center gap-2.5">
            <Image
              src="/brand/fitkarma-mark.svg"
              alt="FitKarma"
              width={28}
              height={28}
              priority
            />
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">
                Fit<span className="text-brand-green">Karma</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-accent border border-brand-green/30 tracking-wider">
                Admin
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <Link
            href={`/${switchLocale}/admin`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-muted hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-brand-accent" />
            <span>{switchLabel}</span>
          </Link>

          {/* Public site shortcut */}
          <Link
            href={`/${locale}`}
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-muted hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          >
            <span>{isHindi ? "मुख्य वेबसाइट" : "Public Site"}</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Sign Out */}
          <Link
            href={`/${locale}/admin/login`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/20 transition-colors"
          >
            {isHindi ? "लॉग आउट" : "Sign Out"}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
