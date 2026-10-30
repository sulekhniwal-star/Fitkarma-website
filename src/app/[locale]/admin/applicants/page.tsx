"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  Download,
  UserX,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Locale } from "@/i18n/config";

interface Applicant {
  id: string;
  fullName: string;
  email: string;
  status: "pending_email_verification" | "phase1_accepted" | "phase2_waitlist" | "withdrawn";
  seatNumber: number | null;
  primaryFeatureInterests: string[] | null;
  devicePlatform: string | null;
  preferredLanguage: string | null;
  marketingConsent: boolean;
  emailVerifiedAt: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminApplicantsPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isHindi = locale === "hi";

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 25, total: 0, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal states for withdrawal and export
  const [withdrawingApp, setWithdrawingApp] = useState<Applicant | null>(null);
  const [withdrawReason, setWithdrawReason] = useState<string>("");
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportReason, setExportReason] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const fetchApplicants = async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "25",
        status: statusFilter,
        search,
      });

      const res = await fetch(`/api/admin/applicants?${query.toString()}`);
      if (res.status === 401 || res.status === 403) {
        window.location.href = `/${locale}/admin/login`;
        return;
      }
      if (!res.ok) throw new Error("Failed to load applicants");

      const data = await res.json();
      setApplicants(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 25, total: 0, totalPages: 1 });
    } catch (err) {
      console.error(err);
      setActionMessage({ type: "error", text: "Unable to retrieve applicants." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplicants(1);
  };

  const handleWithdrawConfirm = () => {
    if (!withdrawingApp || !withdrawReason.trim()) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/applicants/${withdrawingApp.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "withdraw",
            reason: withdrawReason.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Withdrawal failed");

        let msg = isHindi
          ? `आवेदक (${withdrawingApp.fullName}) को वापस ले लिया गया है।`
          : `Applicant (${withdrawingApp.fullName}) was withdrawn.`;

        if (data.result?.promotedId) {
          msg += isHindi
            ? ` प्रतीक्षा सूची से आवेदक को सीट संख्या #${data.result.newSeatNumber} में स्वतः पदोन्नत किया गया (D-029)।`
            : ` Waitlisted applicant was auto-promoted to seat #${data.result.newSeatNumber} (Decision D-029).`;
        }

        setActionMessage({ type: "success", text: msg });
        setWithdrawingApp(null);
        setWithdrawReason("");
        fetchApplicants(pagination.page);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Withdrawal failed";
        setActionMessage({ type: "error", text: message });
      }
    });
  };

  const handleExportConfirm = () => {
    if (!exportReason.trim()) return;

    const query = new URLSearchParams({
      reason: exportReason.trim(),
      status: statusFilter,
    });

    window.open(`/api/admin/export?${query.toString()}`, "_blank");
    setExportModalOpen(false);
    setExportReason("");
    setActionMessage({
      type: "success",
      text: isHindi
        ? "डेटा निर्यात शुरू किया गया और सुरक्षा ऑडिट लॉग दर्ज किया गया।"
        : "Export initiated and logged in immutable audit records.",
    });
  };

  const getStatusBadge = (status: string, seatNumber: number | null) => {
    switch (status) {
      case "phase1_accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-green/20 text-brand-green border border-brand-green/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Phase 1 #{seatNumber}</span>
          </span>
        );
      case "phase2_waitlist":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Flame className="w-3 h-3" />
            <span>Waitlist</span>
          </span>
        );
      case "pending_email_verification":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-brand-muted border border-white/10">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      case "withdrawn":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-950/40 text-red-400 border border-red-500/30">
            <UserX className="w-3 h-3" />
            <span>Withdrawn</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isHindi ? "बीटा आवेदक एवं क्षमता प्रबंधन" : "Beta Applicants & Capacity"}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {isHindi
              ? "सीट आवंटन देखें, फ़िल्टर करें और सुरक्षा ऑडिट के साथ सीटें प्रबंधित करें।"
              : "Review allocated seats, enforce least-privilege, and manage waitlists with audit trails."}
          </p>
        </div>

        <button
          onClick={() => setExportModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
        >
          <Download className="w-4 h-4 text-brand-accent" />
          <span>{isHindi ? "सुरक्षित निर्यात (CSV)" : "Guarded Export (CSV)"}</span>
        </button>
      </div>

      {/* Notifications */}
      {actionMessage && (
        <div
          className={`p-4 rounded-xl text-sm flex items-start gap-3 ${
            actionMessage.type === "success"
              ? "bg-brand-green/10 border border-brand-green/30 text-white"
              : "bg-red-950/40 border border-red-500/30 text-red-200"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
          {[
            { id: "all", label: isHindi ? "सभी" : "All" },
            { id: "phase1_accepted", label: isHindi ? "Phase 1 स्वीकृत" : "Phase 1 Accepted" },
            { id: "phase2_waitlist", label: isHindi ? "Phase 2 प्रतीक्षा सूची" : "Waitlist" },
            { id: "pending_email_verification", label: isHindi ? "लंबित सत्यापन" : "Pending" },
            { id: "withdrawn", label: isHindi ? "वापस लिए गए" : "Withdrawn" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-brand-green text-[#0D0F12] font-semibold"
                  : "bg-white/5 text-brand-muted hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isHindi ? "नाम, ईमेल या सीट # से खोजें..." : "Search name, email, seat #..."
              }
              className="w-full bg-[#14181D] border border-white/10 rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-green"
            />
            <Search className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors"
          >
            {isHindi ? "खोजें" : "Search"}
          </button>
        </form>
      </div>

      {/* Applicants Table */}
      <div className="bg-[#14181D] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D0F12] border-b border-white/10 text-brand-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">{isHindi ? "स्थिति / सीट" : "Status / Seat"}</th>
                <th className="py-3 px-4">{isHindi ? "आवेदक" : "Applicant"}</th>
                <th className="py-3 px-4">{isHindi ? "प्राथमिक रुचियाँ" : "Feature Priorities"}</th>
                <th className="py-3 px-4">{isHindi ? "डिवाइस / भाषा" : "Platform / Lang"}</th>
                <th className="py-3 px-4">{isHindi ? "पंजीकरण समय" : "Applied At"}</th>
                <th className="py-3 px-4 text-right">{isHindi ? "कार्रवाई" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-brand-muted">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-brand-muted">
                    {isHindi ? "डेटा लोड हो रहा है..." : "Loading applicants..."}
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-brand-muted">
                    {isHindi ? "कोई आवेदक नहीं मिला।" : "No applicants found for this filter."}
                  </td>
                </tr>
              ) : (
                applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {getStatusBadge(app.status, app.seatNumber)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{app.fullName}</div>
                      <div className="text-[11px] text-brand-muted font-mono">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">
                      {app.primaryFeatureInterests && app.primaryFeatureInterests.length > 0 ? (
                        <span className="text-[11px] text-brand-accent">
                          {app.primaryFeatureInterests.join(", ")}
                        </span>
                      ) : (
                        <span className="text-[11px] text-brand-muted/50">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 uppercase font-mono text-[11px]">
                      {app.devicePlatform || "—"} / {app.preferredLanguage || "en"}
                    </td>
                    <td className="py-3.5 px-4 text-[11px]">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {app.status !== "withdrawn" && (
                        <button
                          onClick={() => setWithdrawingApp(app)}
                          className="px-2.5 py-1 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/20 transition-colors"
                        >
                          {isHindi ? "सीट वापस लें" : "Withdraw"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-brand-muted">
          <div>
            {isHindi ? "कुल आवेदक: " : "Total records: "}
            <span className="font-semibold text-white">{pagination.total}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>
              {isHindi ? "पृष्ठ " : "Page "}
              <span className="font-semibold text-white">{pagination.page}</span> /{" "}
              {pagination.totalPages}
            </span>

            <button
              onClick={() => fetchApplicants(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => fetchApplicants(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal Confirmation Modal with Mandatory Reason */}
      {withdrawingApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">
                {isHindi ? "सीट वापस लेने की पुष्टि" : "Confirm Seat Withdrawal"}
              </h3>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              {isHindi
                ? `क्या आप वाकई ${withdrawingApp.fullName} (${withdrawingApp.email}) की सीट वापस लेना चाहते हैं? यदि यह Phase 1 सीट है, तो Decision D-029 के अनुसार प्रतीक्षा सूची से सबसे पहले सत्यापित आवेदक को स्वतः पदोन्नत किया जाएगा।`
                : `Are you sure you want to withdraw ${withdrawingApp.fullName} (${withdrawingApp.email})? If this is a Phase 1 seat, Decision D-029 will automatically promote the earliest verified waitlist applicant.`}
            </p>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase text-brand-muted mb-2">
                {isHindi ? "अनिवार्य ऑडिट कारण (Reason)" : "Mandatory Audit Rationale *"}
              </label>
              <textarea
                value={withdrawReason}
                onChange={(e) => setWithdrawReason(e.target.value)}
                placeholder={
                  isHindi
                    ? "उदा: उपयोगकर्ता ने sulekhniwal@gmail.com पर ईमेल से अनुरोध किया..."
                    : "e.g., User requested withdrawal via support email..."
                }
                rows={3}
                required
                className="w-full bg-[#0D0F12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setWithdrawingApp(null);
                  setWithdrawReason("");
                }}
                className="px-4 py-2 rounded-xl text-xs text-brand-muted hover:text-white transition-colors"
              >
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={handleWithdrawConfirm}
                disabled={isPending || withdrawReason.trim().length < 5}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors disabled:opacity-50"
              >
                {isPending
                  ? isHindi
                    ? "प्रक्रिया जारी..."
                    : "Processing..."
                  : isHindi
                  ? "वापस लें और पदोन्नत करें"
                  : "Withdraw & Promote"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Export Confirmation Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-brand-accent mb-4">
              <Download className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">
                {isHindi ? "सुरक्षित डेटा निर्यात (CSV)" : "Guarded Data Export (CSV)"}
              </h3>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              {isHindi
                ? "यह क्रिया सभी फ़िल्टर किए गए आवेदकों का निर्यात करेगी। सुरक्षा और DPDP नियमों के तहत, प्रत्येक डेटा निर्यात को व्यवस्थापक पहचान और कारण के साथ ऑडिट लॉग में दर्ज किया जाता है।"
                : "This action exports applicant data. Under DPDP rules, every administrative data export is logged to immutable audit records with operator identity and justification."}
            </p>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase text-brand-muted mb-2">
                {isHindi ? "अनिवार्य निर्यात कारण (Business Justification) *" : "Business Justification *"}
              </label>
              <input
                type="text"
                value={exportReason}
                onChange={(e) => setExportReason(e.target.value)}
                placeholder={
                  isHindi
                    ? "उदा: Phase 1 ऑनबोर्डिंग क्षमता समीक्षा..."
                    : "e.g., Weekly cohort capacity review..."
                }
                required
                className="w-full bg-[#0D0F12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setExportModalOpen(false);
                  setExportReason("");
                }}
                className="px-4 py-2 rounded-xl text-xs text-brand-muted hover:text-white transition-colors"
              >
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                onClick={handleExportConfirm}
                disabled={exportReason.trim().length < 5}
                className="px-4 py-2 rounded-xl bg-brand-green hover:bg-brand-accent text-[#0D0F12] font-semibold text-xs transition-colors disabled:opacity-50"
              >
                {isHindi ? "निर्यात करें और लॉग करें" : "Authorize & Export"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
