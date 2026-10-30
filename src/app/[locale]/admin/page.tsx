"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  Clock,
  MailCheck,
  Send,
  AlertTriangle,
  Flame,
  Smartphone,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Locale } from "@/i18n/config";
import { FEATURE_INTEREST_OPTIONS } from "@/lib/validation/application-schema";

interface AdminMetrics {
  phase1Accepted: number;
  phase1Capacity: number;
  phase2Waitlist: number;
  pendingVerification: number;
  withdrawn: number;
  totalApplications: number;
  featureCounts: Record<string, number>;
  platformCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  outboxStats: {
    pending: number;
    sent: number;
    failed: number;
  };
}

export default function AdminDashboardPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isHindi = locale === "hi";

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/metrics");
      if (res.status === 401 || res.status === 403) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load metrics");
      }
      const data = await res.json();
      setMetrics(data.metrics);
    } catch (err: unknown) {
      console.error(err);
      setError("Unable to connect to administrative metrics service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phase1Accepted = metrics?.phase1Accepted || 0;
  const phase1Capacity = metrics?.phase1Capacity || 1000;
  const capacityPercent = Math.min(100, Math.round((phase1Accepted / phase1Capacity) * 100));

  // Match feature keys to friendly labels
  const featureLabelMap: Record<string, string> = {};
  for (const f of FEATURE_INTEREST_OPTIONS) {
    featureLabelMap[f.id] = isHindi ? f.labelHi : f.labelEn;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isHindi ? "बीटा क्षमता एवं संचालन डैशबोर्ड" : "Beta Capacity & Operations"}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {isHindi
              ? "Phase 1 सीमा (1,000 सीटें), Phase 2 प्रतीक्षा सूची और प्राथमिक सुविधाओं की मांग।"
              : "Phase 1 invariant ceiling (1,000 seats), Phase 2 waitlist, and feature interest."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{isHindi ? "ताज़ा करें" : "Refresh"}</span>
          </button>

          <Link
            href={`/${locale}/admin/campaigns`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green hover:bg-brand-accent text-[#0D0F12] font-semibold text-xs transition-colors shadow-lg shadow-brand-green/10"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isHindi ? "Phase 2 अभियान" : "Phase 2 Campaign"}</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Phase 1 Capacity Card */}
        <div className="bg-[#14181D] border border-brand-green/30 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
              {isHindi ? "Phase 1 स्वीकृत" : "Phase 1 Accepted"}
            </span>
            <CheckCircle className="w-5 h-5 text-brand-green" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{phase1Accepted}</span>
            <span className="text-xs text-brand-muted">/ {phase1Capacity} {isHindi ? "सीटें" : "seats"}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-[#0D0F12] rounded-full h-2 mt-4 overflow-hidden border border-white/5">
            <div
              className="bg-brand-green h-full rounded-full transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-brand-muted mt-2">
            <span>{capacityPercent}% {isHindi ? "भर चुका है" : "allocated"}</span>
            <span>{Math.max(0, phase1Capacity - phase1Accepted)} {isHindi ? "स्थान शेष" : "remaining"}</span>
          </div>
        </div>

        {/* Phase 2 Waitlist */}
        <div className="bg-[#14181D] border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {isHindi ? "Phase 2 प्रतीक्षा सूची" : "Phase 2 Waitlist"}
            </span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {metrics?.phase2Waitlist || 0}
            </span>
            <span className="text-xs text-brand-muted">{isHindi ? "सत्यापित आवेदक" : "verified users"}</span>
          </div>
          <p className="text-[11px] text-brand-muted mt-4">
            {isHindi
              ? "Phase 1 पूर्ण होने के बाद FIFO क्रम में पंजीकृत"
              : "Queued in strict FIFO order after Phase 1 limit"}
          </p>
        </div>

        {/* Pending Verification */}
        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {isHindi ? "लंबित सत्यापन" : "Pending Verification"}
            </span>
            <Clock className="w-5 h-5 text-brand-muted" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {metrics?.pendingVerification || 0}
            </span>
            <span className="text-xs text-brand-muted">{isHindi ? "अपुष्ट ईमेल" : "unverified"}</span>
          </div>
          <p className="text-[11px] text-brand-muted mt-4">
            {isHindi
              ? "लिंक भेजा गया; सीट केवल सत्यापन के बाद आवंटित होगी"
              : "Token sent; holds zero capacity until verified"}
          </p>
        </div>

        {/* Total Applications */}
        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {isHindi ? "कुल आवेदन" : "Total Submissions"}
            </span>
            <Users className="w-5 h-5 text-brand-muted" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {metrics?.totalApplications || 0}
            </span>
            <span className="text-xs text-brand-muted">
              ({metrics?.withdrawn || 0} {isHindi ? "वापस लिए" : "withdrawn"})
            </span>
          </div>
          <p className="text-[11px] text-brand-muted mt-4">
            {isHindi ? "कुल प्राप्त आवेदन" : "Total lifetime registrations"}
          </p>
        </div>
      </div>

      {/* Outbox Delivery Health & System Stats */}
      <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <MailCheck className="w-4 h-4 text-brand-green" />
            <span>{isHindi ? "ईमेल आउटबॉक्स स्थिति" : "Email Outbox Dispatch Status"}</span>
          </h2>
          <span className="text-xs text-brand-muted">
            {isHindi ? "अपरिवर्तनीय संदेश कतार" : "Auditable transactional outbox"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="bg-[#0D0F12] border border-white/5 rounded-xl p-4 text-center">
            <span className="text-xs text-brand-muted block mb-1">
              {isHindi ? "सफल प्रेषित" : "Successfully Sent"}
            </span>
            <span className="text-xl font-bold text-brand-green">
              {metrics?.outboxStats.sent || 0}
            </span>
          </div>

          <div className="bg-[#0D0F12] border border-white/5 rounded-xl p-4 text-center">
            <span className="text-xs text-brand-muted block mb-1">
              {isHindi ? "प्रक्रिया में" : "Pending Queue"}
            </span>
            <span className="text-xl font-bold text-amber-400">
              {metrics?.outboxStats.pending || 0}
            </span>
          </div>

          <div className="bg-[#0D0F12] border border-white/5 rounded-xl p-4 text-center">
            <span className="text-xs text-brand-muted block mb-1">
              {isHindi ? "विफल" : "Failed / Retry"}
            </span>
            <span className="text-xl font-bold text-red-400">
              {metrics?.outboxStats.failed || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Aggregate Feature Demand Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#14181D] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
            {isHindi ? "प्राथमिक सुविधाओं की मांग" : "Feature Demand Distribution"}
          </h2>
          <p className="text-xs text-brand-muted mb-6">
            {isHindi
              ? "आवेदकों द्वारा चुनी गई मुख्य रुचियाँ (बिना किसी व्यक्तिगत पहचान के)"
              : "Aggregate priorities selected during registration without exposing applicant PII."}
          </p>

          <div className="space-y-4">
            {metrics?.featureCounts &&
            Object.keys(metrics.featureCounts).length > 0 ? (
              Object.entries(metrics.featureCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([featKey, count]) => {
                  const label = featureLabelMap[featKey] || featKey;
                  const total = metrics.totalApplications || 1;
                  const pct = Math.round((count / total) * 100);

                  return (
                    <div key={featKey} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">{label}</span>
                        <span className="text-brand-muted">
                          {count} {isHindi ? "वोट" : "votes"} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#0D0F12] rounded-full h-2 overflow-hidden border border-white/5">
                        <div
                          className="bg-brand-accent h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-xs text-brand-muted py-6 text-center">
                {isHindi ? "कोई सुविधा डेटा उपलब्ध नहीं है।" : "No feature demand votes recorded yet."}
              </p>
            )}
          </div>
        </div>

        {/* Platform & Language Distribution */}
        <div className="space-y-6">
          <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-accent" />
              <span>{isHindi ? "डिवाइस प्लेटफ़ॉर्म" : "Device Platform"}</span>
            </h2>
            <div className="space-y-3">
              {metrics?.platformCounts &&
                Object.entries(metrics.platformCounts).map(([platform, count]) => (
                  <div key={platform} className="flex justify-between items-center text-xs">
                    <span className="text-brand-muted uppercase font-mono">{platform}</span>
                    <span className="text-white font-bold">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-accent" />
              <span>{isHindi ? "पसंदीदा भाषा" : "Preferred Language"}</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-muted">English (en)</span>
                <span className="text-white font-bold">{metrics?.languageCounts.en || 0}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-muted">हिन्दी (hi)</span>
                <span className="text-white font-bold">{metrics?.languageCounts.hi || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Link
          href={`/${locale}/admin/applicants`}
          className="p-5 rounded-2xl bg-[#14181D] border border-white/10 hover:border-brand-green/40 transition-all group flex items-center justify-between"
        >
          <div>
            <h3 className="font-semibold text-white group-hover:text-brand-green transition-colors text-sm">
              {isHindi ? "आवेदक तालिका एवं क्षमता प्रबंधन →" : "Applicant Roster & Capacity →"}
            </h3>
            <p className="text-xs text-brand-muted mt-1">
              {isHindi
                ? "सीट आवंटन देखें, फ़िल्टर करें और सुरक्षित CSV निर्यात करें।"
                : "Search applicants, withdraw seats with auto-promotion, and export CSV."}
            </p>
          </div>
          <Users className="w-5 h-5 text-brand-muted group-hover:text-brand-green transition-colors" />
        </Link>

        <Link
          href={`/${locale}/admin/campaigns`}
          className="p-5 rounded-2xl bg-[#14181D] border border-white/10 hover:border-brand-accent/40 transition-all group flex items-center justify-between"
        >
          <div>
            <h3 className="font-semibold text-white group-hover:text-brand-accent transition-colors text-sm">
              {isHindi ? "Phase 2 आमंत्रण अभियान →" : "Phase 2 Community Share Campaign →"}
            </h3>
            <p className="text-xs text-brand-muted mt-1">
              {isHindi
                ? "अंग्रेजी व हिन्दी टेम्पलेट पूर्वावलोकन और ड्राय रन परीक्षण।"
                : "Preview bilingual share templates and test with dry-run mode."}
            </p>
          </div>
          <Send className="w-5 h-5 text-brand-muted group-hover:text-brand-accent transition-colors" />
        </Link>
      </div>
    </div>
  );
}
