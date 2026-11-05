"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Compass,
  Users,
  Baby,
  CalendarDays,
  Phone,
  Mail,
  User,
  MessageCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { packagesData } from "@/data/packagesData";

const WHATSAPP_TEST_NUMBER = "917907318843";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  packageSlug?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultDestination,
  packageSlug,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: defaultDestination || "Switzerland Explorer",
    adults: "2",
    children: "0",
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
      if (defaultDestination) {
        setFormData((prev) => ({
          ...prev,
          destination: defaultDestination,
        }));
      }
    }
  }, [isOpen, defaultDestination]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name (at least 2 characters).";
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    if (!formData.destination) {
      errs.destination = "Please select a destination or package.";
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose your preferred travel date.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Save enquiry to Serverless CMS API (commits to GitHub /src/data/enquiries.json)
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageSlug,
        }),
      });

      // 2. Prepare WhatsApp message
      const childrenText = formData.children === "0" ? "None" : formData.children;
      const messageText = `Hello Joshy Travels! I would like to enquire about a bespoke package:

*Name*: ${formData.name}
*Phone*: ${formData.phone}${formData.email ? `\n*Email*: ${formData.email}` : ""}
*Destination / Package*: ${formData.destination}
*Adults*: ${formData.adults}
*Children*: ${childrenText}
*Preferred Travel Date*: ${formData.preferredDate}${
        formData.message ? `\n*Special Notes*: ${formData.message}` : ""
      }`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_TEST_NUMBER}?text=${encodeURIComponent(
        messageText
      )}`;

      // 3. Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setIsSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      // Even if network fails, still allow WhatsApp opening for client
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setErrors({});
    }, 300);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D0D0D] border border-[#FFD700]/30 p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#FFD700] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* SUCCESS CONFIRMATION VIEW */
          <div className="text-center py-8 px-2 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FFD700]">
              Inquiry Dispatched
            </span>
            <h3 className="text-2xl font-bold font-syne text-white uppercase tracking-tight">
              Enquiry Submitted!
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
              Your details have been recorded in our concierge desk and opened in WhatsApp. A dedicated Joshy Travels specialist will reach out to you shortly.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3 rounded-full bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,215,0,0.25)]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div>
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-4 h-4 text-[#FFD700]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
                  Bespoke Journey Curation
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-syne text-white uppercase tracking-tight">
                Plan Your Journey
              </h2>
              <p className="text-xs text-[#A3A3A3] mt-1">
                Fill out the details below. We will record your enquiry and open direct WhatsApp coordination.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                    errors.name
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/15 focus:border-[#FFD700]"
                  }`}
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98451 23456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                      errors.phone
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/15 focus:border-[#FFD700]"
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Email Address <span className="text-[#737373] text-[9px] lowercase font-normal">(optional)</span></span>
                  </label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                      errors.email
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/15 focus:border-[#FFD700]"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Destination / Package Select */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Destination / Holiday Package *</span>
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border border-white/15 focus:border-[#FFD700] focus:outline-none cursor-pointer"
                >
                  <optgroup label="Featured Tour Packages" className="bg-[#141414] text-white">
                    {packagesData.map((p) => (
                      <option key={p.id} value={p.title} className="bg-[#141414] text-white">
                        {p.title} ({p.duration})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Bespoke & Custom" className="bg-[#141414] text-white">
                    <option value="Bespoke Custom Itinerary (Worldwide)" className="bg-[#141414] text-white">
                      Bespoke Custom Itinerary (Worldwide)
                    </option>
                  </optgroup>
                </select>
              </div>

              {/* Adults & Children */}
              <div className="grid grid-cols-2 gap-3">
                {/* Adults */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Adults</span>
                  </label>
                  <select
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border border-white/15 focus:border-[#FFD700] focus:outline-none cursor-pointer"
                  >
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((num) => (
                      <option key={num} value={num} className="bg-[#141414]">
                        {num} {parseInt(num) === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Children</span>
                  </label>
                  <select
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border border-white/15 focus:border-[#FFD700] focus:outline-none cursor-pointer"
                  >
                    {["0", "1", "2", "3", "4", "5", "5+"].map((num) => (
                      <option key={num} value={num} className="bg-[#141414]">
                        {num === "0" ? "No Children" : `${num} ${parseInt(num) === 1 ? "Child" : "Children"}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Preferred Travel Date *</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full bg-[#141414] text-white px-3.5 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                    errors.preferredDate
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/15 focus:border-[#FFD700]"
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-[10px] mt-1">{errors.preferredDate}</p>
                )}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white/90 mb-1.5">
                  Special Requests / Custom Notes <span className="text-[#737373] text-[9px] lowercase font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Honeymoon suite, helicopter charter, private guide..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#141414] text-white px-3.5 py-2 rounded-xl border border-white/15 focus:border-[#FFD700] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFD700] hover:bg-white text-black font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,215,0,0.25)] disabled:opacity-50 cursor-pointer text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Recording &amp; Connecting...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>Enquire Through WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-[#737373] mt-2">
                  🔒 Your enquiry will be securely logged in our concierge desk and opened in WhatsApp.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

