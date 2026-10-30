"use client";

import React, { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldAlert, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Locale } from "@/i18n/config";

export default function AdminLoginPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const normEmail = email.trim().toLowerCase();
    if (!normEmail) {
      setError("Please enter your administrator email address.");
      return;
    }

    // Client-side quick check or server-side auth validation
    // For local dev / previews: set the session cookie
    startTransition(async () => {
      try {
        // Test auth by hitting /api/admin/metrics with header
        const res = await fetch("/api/admin/metrics", {
          headers: {
            Authorization: `Bearer dev-admin:${normEmail}`,
          },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(
            data.error ||
              (locale === "hi"
                ? "यह ईमेल अधिकृत ADMIN_EMAIL_ALLOWLIST में शामिल नहीं है।"
                : "This email address is not in the authorized ADMIN_EMAIL_ALLOWLIST.")
          );
          return;
        }

        // Set session cookie for 24h
        document.cookie = `fitkarma_admin_token=dev-admin:${encodeURIComponent(
          normEmail
        )}; path=/; max-age=86400; SameSite=Lax`;

        setSuccess(true);
        setTimeout(() => {
          router.push(`/${locale}/admin`);
        }, 600);
      } catch (err) {
        console.error("Login check error:", err);
        setError("Unable to authenticate. Please check server logs.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Image
              src="/brand/fitkarma-mark.svg"
              alt="FitKarma"
              width={36}
              height={36}
              priority
            />
            <span className="text-2xl font-bold tracking-tight text-white">
              Fit<span className="text-brand-green">Karma</span>
            </span>
          </div>
          <div className="inline-block px-2.5 py-1 rounded-full bg-brand-surface border border-white/10 text-xs font-semibold text-brand-accent tracking-wider uppercase mb-2">
            Operations & Governance
          </div>
          <h1 className="text-xl font-bold text-white">
            {locale === "hi" ? "ऑपरेटर लॉगिन" : "Operator Sign In"}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {locale === "hi"
              ? "केवल अधिकृत FitKarma प्रशासकों के लिए सुरक्षित पहुंच।"
              : "Authorized administrators and operations team access only."}
          </p>
        </div>

        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-3 animate-pulse" />
              <p className="text-white font-medium">
                {locale === "hi" ? "सत्यापित! कंसोल में प्रवेश हो रहा है..." : "Authorized! Loading console..."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">
                  {locale === "hi" ? "व्यवस्थापक ईमेल पता" : "Administrator Email"}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sulekhniwal@gmail.com"
                    required
                    className="w-full bg-[#0D0F12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-colors"
                  />
                  <Lock className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                <p className="text-[11px] text-brand-muted/70 mt-2">
                  {locale === "hi"
                    ? "ईमेल पर्यावरण चर ADMIN_EMAIL_ALLOWLIST से मेल खाना चाहिए।"
                    : "Email must match the server ADMIN_EMAIL_ALLOWLIST configuration."}
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-green hover:bg-brand-accent text-[#0D0F12] font-semibold text-sm transition-all shadow-lg hover:shadow-brand-green/20 disabled:opacity-60"
              >
                <span>
                  {isPending
                    ? locale === "hi"
                      ? "सत्यापन जारी..."
                      : "Verifying..."
                    : locale === "hi"
                    ? "कंसोल में प्रवेश करें"
                    : "Enter Admin Console"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-brand-muted">
          <a
            href={`/${locale}`}
            className="hover:text-white transition-colors underline underline-offset-4"
          >
            ← {locale === "hi" ? "मुख्य वेबसाइट पर वापस जाएँ" : "Back to public website"}
          </a>
        </div>
      </div>
    </div>
  );
}
