"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Baby,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { Enquiry, EnquiryStatus } from "@/types/enquiry";

const STATUS_CONFIG: Record<
  EnquiryStatus,
  { label: string; color: string; badge: string }
> = {
  pending: {
    label: "Pending / New Lead",
    color: "#FFD700",
    badge: "bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/30",
  },
  followed_up: {
    label: "Followed Up",
    color: "#38bdf8",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  converted: {
    label: "Converted / Booked",
    color: "#34d399",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  archived: {
    label: "Archived / Closed",
    color: "#a3a3a3",
    badge: "bg-zinc-800 text-zinc-400 border-zinc-700",
  },
};

export default function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      const json = await res.json();
      if (res.ok && json.enquiries) {
        setEnquiries(json.enquiries);
      } else {
        setStatusMsg({ type: "error", text: json.error || "Failed to load enquiries" });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Error connecting to enquiries API" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setSavingId(id);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        setStatusMsg({
          type: "success",
          text: `Status updated to "${STATUS_CONFIG[newStatus].label}" & committed to GitHub!`,
        });
      } else {
        setStatusMsg({ type: "error", text: json.error || "Failed to update status" });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network error updating status" });
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes: notesInput }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, notes: notesInput } : e))
        );
        setEditingNotesId(null);
        setStatusMsg({ type: "success", text: "Internal notes saved & committed!" });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Failed to save internal notes" });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete the enquiry from "${clientName}"?`)) return;

    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        setStatusMsg({ type: "success", text: `Enquiry from "${clientName}" deleted & committed!` });
      } else {
        const json = await res.json();
        setStatusMsg({ type: "error", text: json.error || "Failed to delete enquiry" });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network error deleting enquiry" });
    } finally {
      setSavingId(null);
    }
  };

  // Clean phone number for tel: and wa.me
  const cleanPhoneForCall = (phone: string) => phone.replace(/[^\d+]/g, "");
  const cleanPhoneForWhatsApp = (phone: string) => {
    let cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length === 10) cleaned = "91" + cleaned; // default to India code if 10 digits
    return cleaned;
  };

  const buildClientWhatsAppUrl = (enquiry: Enquiry) => {
    const cleanNum = cleanPhoneForWhatsApp(enquiry.phone);
    const msg = encodeURIComponent(
      `Hello ${enquiry.name}! This is JJ Travels following up on your enquiry for the ${enquiry.destination} package. How can we assist you with your personalized holiday arrangements?`
    );
    return `https://wa.me/${cleanNum}?text=${msg}`;
  };

  // Filter and search
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      item.destination.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = enquiries.filter((e) => e.status === "pending").length;
  const followedUpCount = enquiries.filter((e) => e.status === "followed_up").length;
  const convertedCount = enquiries.filter((e) => e.status === "converted").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
        <span className="ml-3 text-sm text-[#A3A3A3] uppercase tracking-widest font-sans">
          Loading Client Enquiries...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FFD700]">
            Concierge CRM
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase font-syne mt-1">
            Client Enquiries <span className="text-[#FFD700]">({enquiries.length})</span>
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Manage incoming inquiries, click to call, message on WhatsApp, and track conversion status.
          </p>
        </div>

        {/* Quick Counters */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-[#FFD700] text-xs font-bold">
            {pendingCount} Pending
          </span>
          <span className="px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-bold">
            {followedUpCount} Followed Up
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            {convertedCount} Converted
          </span>
        </div>
      </div>

      {/* Alert Banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs tracking-wider uppercase font-semibold ${
            statusMsg.type === "success"
              ? "bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-current hover:opacity-70">
            ✕
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-[#0A0A0A] p-4 rounded-2xl border border-white/5">
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {[
            { key: "all", label: `All Enquiries (${enquiries.length})` },
            { key: "pending", label: `Pending (${pendingCount})` },
            { key: "followed_up", label: `Followed Up (${followedUpCount})` },
            { key: "converted", label: `Converted (${convertedCount})` },
            { key: "archived", label: "Archived" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                statusFilter === tab.key
                  ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)]"
                  : "bg-white/5 text-[#A3A3A3] hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search name, phone, package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] text-xs text-white placeholder-[#737373] pl-9 pr-8 py-2.5 rounded-xl border border-white/10 focus:border-[#FFD700] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-[#737373] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredEnquiries.map((enquiry) => {
          const cfg = STATUS_CONFIG[enquiry.status] || STATUS_CONFIG.pending;
          const isSaving = savingId === enquiry.id;
          const createdDate = new Date(enquiry.createdAt);
          const formattedDate = createdDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={enquiry.id}
              className="p-5 sm:p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl hover:border-[#FFD700]/40 transition-all flex flex-col gap-4"
            >
              {/* Row 1: Client Header, Status Dropdown, and Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] font-bold font-syne text-sm shrink-0">
                    {enquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base font-syne">
                        {enquiry.name}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A3A3A3] flex items-center gap-2 mt-0.5">
                      <span>🕒 Received: {formattedDate}</span>
                    </p>
                  </div>
                </div>

                {/* Status Changer & Delete Button */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A3A3A3] hidden sm:inline">
                    Status:
                  </span>
                  <select
                    value={enquiry.status}
                    disabled={isSaving}
                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value as EnquiryStatus)}
                    className="bg-[#141414] text-white text-xs px-3 py-1.5 rounded-lg border border-white/15 focus:border-[#FFD700] focus:outline-none cursor-pointer font-semibold"
                  >
                    <option value="pending" className="bg-[#141414]">Pending / New Lead</option>
                    <option value="followed_up" className="bg-[#141414]">Followed Up</option>
                    <option value="converted" className="bg-[#141414]">Converted / Booked</option>
                    <option value="archived" className="bg-[#141414]">Archived / Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDelete(enquiry.id, enquiry.name)}
                    disabled={isSaving}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Client Info & Requested Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Phone & Click to Call */}
                <div className="p-3 bg-[#111] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] block">
                    Phone Contact
                  </span>
                  <div className="font-semibold text-white truncate">{enquiry.phone}</div>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${cleanPhoneForCall(enquiry.phone)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-[11px] uppercase tracking-wider transition-colors border border-emerald-500/30"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Click to Call</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="p-3 bg-[#111] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] block">
                    WhatsApp Chat
                  </span>
                  <div className="text-[11px] text-[#A3A3A3] truncate">Direct client message</div>
                  <div className="pt-2">
                    <a
                      href={buildClientWhatsAppUrl(enquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-bold text-[11px] uppercase tracking-wider transition-colors border border-[#25D366]/40"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Package / Destination */}
                <div className="p-3 bg-[#111] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] block">
                    Destination / Package
                  </span>
                  <div className="font-bold text-[#FFD700] truncate">
                    {enquiry.destination}
                  </div>
                  {enquiry.packageSlug && (
                    <span className="text-[10px] text-white/50 font-mono block">
                      /{enquiry.packageSlug}
                    </span>
                  )}
                </div>

                {/* Travelers & Dates */}
                <div className="p-3 bg-[#111] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] block">
                    Party &amp; Travel Date
                  </span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>👥 {enquiry.adults} Adults</span>
                    {enquiry.children && enquiry.children !== "0" && (
                      <span>• 👶 {enquiry.children} Kids</span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#A3A3A3]">
                    📅 {enquiry.preferredDate || "Dates flexible"}
                  </div>
                </div>
              </div>

              {/* Row 3: Special Request Message & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                {/* Special Request */}
                {enquiry.message ? (
                  <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                      Client Special Request / Notes:
                    </span>
                    <p className="text-white/80 italic leading-relaxed">
                      &ldquo;{enquiry.message}&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-[#141414] rounded-xl border border-white/5 text-[#737373] text-[11px]">
                    No special notes provided by client.
                  </div>
                )}

                {/* Internal Admin Follow-up Notes */}
                <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                      Internal Coordinator Notes:
                    </span>
                    {editingNotesId !== enquiry.id && (
                      <button
                        onClick={() => {
                          setEditingNotesId(enquiry.id);
                          setNotesInput(enquiry.notes || "");
                        }}
                        className="text-[10px] text-white/60 hover:text-white underline cursor-pointer"
                      >
                        {enquiry.notes ? "Edit Note" : "+ Add Note"}
                      </button>
                    )}
                  </div>

                  {editingNotesId === enquiry.id ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        rows={2}
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        placeholder="e.g. Spoke to client on phone, budget ₹3.5L, sending revised quote..."
                        className="w-full bg-[#111] text-xs text-white p-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(enquiry.id)}
                          disabled={isSaving}
                          className="px-3 py-1 rounded bg-[#FFD700] text-black text-[10px] font-bold uppercase tracking-wider"
                        >
                          Save Note
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1 text-white/60 text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/70 text-[11px] leading-relaxed">
                      {enquiry.notes || "No coordinator notes yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredEnquiries.length === 0 && (
          <div className="py-16 text-center text-[#737373] bg-[#0A0A0A] rounded-2xl border border-white/5">
            <p className="text-sm">No client enquiries found matching your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

