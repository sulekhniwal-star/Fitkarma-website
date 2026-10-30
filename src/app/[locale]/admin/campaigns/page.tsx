"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import {
  Send,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { Locale } from "@/i18n/config";

interface PreviewData {
  campaignType: string;
  eligibleRecipientsCount: number;
  phase2PublicUrl: string;
  previewEnglish: { subject: string; html: string; text: string };
  previewHindi: { subject: string; html: string; text: string };
  isDryRun: boolean;
}

export default function AdminCampaignsPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isHindi = locale === "hi";

  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [activeTab, setActiveTab] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dry run and dispatch states
  const [dryRunDone, setDryRunDone] = useState<boolean>(false);
  const [dryRunReport, setDryRunReport] = useState<string | null>(null);
  const [dispatchResult, setDispatchResult] = useState<string | null>(null);

  // Live dispatch confirmation modal
  const [dispatchModalOpen, setDispatchModalOpen] = useState<boolean>(false);
  const [dispatchReason, setDispatchReason] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const fetchPreview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/campaigns/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignType: "phase2_invitation" }),
      });

      if (res.status === 401 || res.status === 403) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }

      if (!res.ok) throw new Error("Failed to load campaign preview");
      const data = await res.json();
      setPreview(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load campaign preview.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDryRun = async () => {
    setError(null);
    setDryRunReport(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/campaigns/dispatch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaignType: "phase2_invitation",
            dryRun: true,
            reason: "Admin dry run verification",
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Dry run failed");

        setDryRunDone(true);
        setDryRunReport(data.message);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Dry run failed";
        setError(message);
      }
    });
  };

  const handleLiveDispatch = async () => {
    if (!dispatchReason.trim()) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/campaigns/dispatch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaignType: "phase2_invitation",
            dryRun: false,
            confirmed: true,
            reason: dispatchReason.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Dispatch failed");

        setDispatchModalOpen(false);
        setDispatchResult(data.message);
        setDispatchReason("");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Live dispatch failed";
        setError(message);
      }
    });
  };

  const currentTemplate =
    activeTab === "en" ? preview?.previewEnglish : preview?.previewHindi;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {isHindi ? "Phase 2 आमंत्रण अभियान" : "Phase 2 Community Share Campaign"}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 text-[10px] font-semibold uppercase tracking-wider">
              Decision D-013
            </span>
          </div>
          <p className="text-sm text-brand-muted">
            {isHindi
              ? "सत्यापित Phase 1 उपयोगकर्ताओं को Phase 2 आवेदन लिंक भेजने का सुरक्षित ईमेल अभियान।"
              : "Dispatches shareable Phase 2 registration link to verified Phase 1 cohort participants."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDryRun}
            disabled={isPending || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>{isHindi ? "ड्राय रन चलाएं (Zero Email)" : "Execute Dry Run (Safe)"}</span>
          </button>

          <button
            onClick={() => setDispatchModalOpen(true)}
            disabled={isPending || !dryRunDone || preview?.eligibleRecipientsCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green hover:bg-brand-accent text-[#0D0F12] font-semibold text-xs transition-colors shadow-lg shadow-brand-green/10 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isHindi ? "अभियान शुरू करें" : "Authorize Dispatch"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {dryRunReport && (
        <div className="p-4 rounded-xl bg-brand-surface border border-brand-accent/40 text-brand-accent text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
          <span>{dryRunReport}</span>
        </div>
      )}

      {dispatchResult && (
        <div className="p-4 rounded-xl bg-brand-green/10 border border-brand-green/40 text-white text-sm flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-brand-green shrink-0" />
          <span>{dispatchResult}</span>
        </div>
      )}

      {/* Audience Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-brand-muted block uppercase tracking-wider mb-1">
            {isHindi ? "पात्र प्राप्तकर्ता" : "Target Recipients"}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">
              {preview?.eligibleRecipientsCount || 0}
            </span>
            <span className="text-xs text-brand-muted">
              {isHindi ? "सत्यापित Phase 1 सीटें" : "verified Phase 1 cohort"}
            </span>
          </div>
        </div>

        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-brand-muted block uppercase tracking-wider mb-1">
            {isHindi ? "साझा करने योग्य URL" : "Shareable Target URL"}
          </span>
          <span className="text-xs font-mono text-brand-accent break-all">
            {preview?.phase2PublicUrl || "—"}
          </span>
        </div>

        <div className="bg-[#14181D] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-brand-muted block uppercase tracking-wider mb-1">
            {isHindi ? "सुरक्षा सत्यापन स्थिति" : "Safety Verification Status"}
          </span>
          <div className="flex items-center gap-2 mt-1">
            {dryRunDone ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-green font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isHindi ? "ड्राय रन सत्यापित" : "Dry-run passed"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>{isHindi ? "ड्राय रन आवश्यक" : "Dry-run required before dispatch"}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Template Preview Section */}
      <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-brand-accent" />
            <span>{isHindi ? "टेम्पलेट लाइव पूर्वावलोकन" : "Live Email Template Preview"}</span>
          </h2>

          <div className="flex items-center gap-2 bg-[#0D0F12] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("en")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "en"
                  ? "bg-brand-green text-[#0D0F12] font-semibold"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTab("hi")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "hi"
                  ? "bg-brand-green text-[#0D0F12] font-semibold"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {currentTemplate ? (
          <div className="space-y-4">
            <div className="bg-[#0D0F12] border border-white/5 rounded-xl p-3.5 flex items-center gap-3 text-xs">
              <span className="font-semibold text-brand-muted uppercase tracking-wider shrink-0">
                Subject:
              </span>
              <span className="text-white font-medium">{currentTemplate.subject}</span>
            </div>

            <div
              className="bg-[#0D0F12] border border-white/10 rounded-xl p-6 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: currentTemplate.html }}
            />
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-brand-muted">
            {isHindi ? "पूर्वावलोकन लोड हो रहा है..." : "Loading preview..."}
          </div>
        )}
      </div>

      {/* Live Dispatch Authorization Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <Send className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">
                {isHindi ? "लाइव अभियान प्रेषण की पुष्टि" : "Confirm Production Campaign Dispatch"}
              </h3>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              {isHindi
                ? `यह क्रिया ${preview?.eligibleRecipientsCount || 0} सत्यापित Phase 1 आवेदकों को Phase 2 आवेदन लिंक के साथ ईमेल कतारबद्ध करेगी। प्रत्येक प्रेषण अपरिवर्तनीय ऑडिट लॉग में दर्ज होगा।`
                : `This action will queue campaign emails to all ${preview?.eligibleRecipientsCount || 0} verified Phase 1 cohort participants. All sends are logged with operator identity.`}
            </p>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase text-brand-muted mb-2">
                {isHindi ? "अनिवार्य ऑपरेटर अनुमोदन कारण *" : "Mandatory Operator Rationale *"}
              </label>
              <textarea
                value={dispatchReason}
                onChange={(e) => setDispatchReason(e.target.value)}
                placeholder={
                  isHindi
                    ? "उदा: Phase 2 आमंत्रण अभियान को उत्पाद प्रमुख द्वारा अनुमोदित किया गया..."
                    : "e.g., Phase 2 expansion approved by product leadership..."
                }
                rows={3}
                required
                className="w-full bg-[#0D0F12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setDispatchModalOpen(false);
                  setDispatchReason("");
                }}
                className="px-4 py-2 rounded-xl text-xs text-brand-muted hover:text-white transition-colors"
              >
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={handleLiveDispatch}
                disabled={isPending || dispatchReason.trim().length < 5}
                className="px-4 py-2 rounded-xl bg-brand-green hover:bg-brand-accent text-[#0D0F12] font-semibold text-xs transition-colors disabled:opacity-50"
              >
                {isPending
                  ? isHindi
                    ? "कतारबद्ध किया जा रहा है..."
                    : "Enqueuing..."
                  : isHindi
                  ? "अनुमोदन एवं प्रेषण"
                  : "Authorize & Dispatch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
