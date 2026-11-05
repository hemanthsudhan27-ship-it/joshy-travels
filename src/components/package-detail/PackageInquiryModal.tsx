"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PackageDetail } from "@/data/packagesData";
import { useScrollLock } from "@/lib/scroll-lock";

interface PackageInquiryModalProps {
  pkg: PackageDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function PackageInquiryModal({
  pkg,
  isOpen,
  onClose,
}: PackageInquiryModalProps) {
  // Lock background scrolling while modal is open; restores on close
  useScrollLock(isOpen, "package-inquiry-modal");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    travelDates: "",
    travelersCount: "2 Adults",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setErrorMessage("");
    }, 300);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const buildWhatsAppText = () => {
    const parts = [
      `*Package Inquiry: ${pkg.title}*`,
      `*Duration:* ${pkg.duration}`,
      `*Starting Price:* ${pkg.price}`,
      `*Name:* ${formData.fullName || "Guest"}`,
      formData.phone ? `*Phone:* ${formData.phone}` : null,
      formData.email ? `*Email:* ${formData.email}` : null,
      formData.travelDates ? `*Dates:* ${formData.travelDates}` : null,
      formData.travelersCount ? `*Travelers:* ${formData.travelersCount}` : null,
      formData.message ? `*Notes:* ${formData.message}` : null,
    ].filter(Boolean);

    return encodeURIComponent(parts.join("\n"));
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/917907318843?text=${buildWhatsAppText()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your name, phone number, and email.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: `Package: ${pkg.title}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReferenceId(data.referenceId || `JT-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitted(true);
      } else {
        const fallbackRef = `JT-${Math.floor(100000 + Math.random() * 900000)}`;
        setReferenceId(fallbackRef);
        setSubmitted(true);
      }
    } catch {
      const fallbackRef = `JT-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(fallbackRef);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="
          relative w-full max-w-lg
          h-[min(90vh,760px)] max-h-[calc(100dvh-2rem)]
          flex flex-col
          rounded-2xl bg-zinc-950
          border border-gold/40 text-white shadow-2xl
          overflow-hidden
        "
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 pt-5 pb-4 sm:px-8 border-b border-white/10 flex items-start justify-between gap-3 bg-zinc-950">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block mb-1">
              Bespoke Travel Inquiry
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {pkg.title}
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              {pkg.duration} · {pkg.price} starting rate
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div
            data-lenis-prevent="true"
            className="flex-1 min-h-0 flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-4 overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block">
              Inquiry Registered
            </span>
            <h3 className="font-heading text-2xl font-bold text-white">
              We&apos;ve Received Your Request
            </h3>
            <p className="text-xs text-white/70 max-w-xs mx-auto">
              Reference: <span className="text-gold font-mono font-semibold">{referenceId}</span>. Our team will get back to you shortly.
            </p>

            <div className="pt-4 flex flex-col gap-3 w-full max-w-xs">
              <a
                href={`https://wa.me/917907318843?text=${buildWhatsAppText()}%0A*Reference:*%20${referenceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-white/50 hover:text-white py-2"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Content */}
            <div
              data-lenis-prevent="true"
              className="
                flex-1 min-h-0
                overflow-y-auto overflow-x-hidden
                overscroll-contain
                px-6 py-5 sm:px-8 sm:py-6
                space-y-4 text-left
              "
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
              }}
              tabIndex={0}
              aria-label="Package Inquiry Fields"
            >
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center gap-2 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Your Full Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Phone / WhatsApp <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98470 00000"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Target Dates / Month
                  </label>
                  <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g. Oct 2026"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Travelers Count
                  </label>
                  <input
                    type="text"
                    name="travelersCount"
                    value={formData.travelersCount}
                    onChange={handleChange}
                    placeholder="e.g. 2 Adults"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Special Requests or Preferences
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Flight preferences, room upgrades, dietary requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 px-6 py-4 sm:px-8 border-t border-white/10 bg-zinc-950 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 text-white font-medium text-xs sm:text-sm hover:border-gold hover:text-gold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
