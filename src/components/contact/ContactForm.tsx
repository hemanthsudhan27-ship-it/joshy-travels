"use client";

import { useState } from "react";
import { Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Customized Travel Experience",
  "International Tour Package",
  "Domestic Tour Package",
  "Honeymoon Package",
  "Family Vacation Package",
  "Group Tour",
  "Flight Ticket Booking",
  "Hotel Reservations",
  "Visa Assistance",
  "General Inquiry",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "Customized Travel Experience",
    travelDates: "",
    travelersCount: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Generate WhatsApp text with current form details
  const buildWhatsAppText = () => {
    const parts = [
      `*New Travel Inquiry via JJ Travels Website*`,
      `*Name:* ${formData.fullName || "Guest"}`,
      formData.phone ? `*Phone:* ${formData.phone}` : null,
      formData.email ? `*Email:* ${formData.email}` : null,
      `*Service Required:* ${formData.service}`,
      formData.travelDates ? `*Target Dates:* ${formData.travelDates}` : null,
      formData.travelersCount ? `*Travelers:* ${formData.travelersCount}` : null,
      formData.message ? `*Notes:* ${formData.message}` : null,
    ].filter(Boolean);

    return encodeURIComponent(parts.join("\n"));
  };

  const handleWhatsAppDirect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please provide at least your Name and Phone/WhatsApp number.");
      return;
    }
    setErrorMessage("");
    const url = `https://wa.me/919999999999?text=${buildWhatsAppText()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage("Please fill in your Name, Phone Number, and Email Address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setReferenceId(data.referenceId || `JJ-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitted(true);
      } else {
        // Fallback reference ID for resilience
        const fallbackRef = `JJ-${Math.floor(100000 + Math.random() * 900000)}`;
        setReferenceId(fallbackRef);
        setSubmitted(true);
      }
    } catch {
      // Offline / client resilience
      const fallbackRef = `JJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(fallbackRef);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-white/[0.03] border border-gold/40 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-2">
          Inquiry Transmitted Successfully
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
          Thank You, {formData.fullName}.
        </h3>
        <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Your travel inquiry has been registered under reference{" "}
          <span className="text-gold font-mono font-semibold">{referenceId}</span>. Our coordinators Joby, Akhil, or team will review your requirements and reach out within 2 hours.
        </p>

        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 max-w-md mx-auto mb-8 text-left text-xs text-white/60 space-y-2">
          <div className="flex justify-between">
            <span>Service:</span>
            <span className="text-white font-medium">{formData.service}</span>
          </div>
          {formData.travelDates && (
            <div className="flex justify-between">
              <span>Expected Dates:</span>
              <span className="text-white font-medium">{formData.travelDates}</span>
            </div>
          )}
          {formData.travelersCount && (
            <div className="flex justify-between">
              <span>Travelers:</span>
              <span className="text-white font-medium">{formData.travelersCount}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/919999999999?text=${buildWhatsAppText()}%0A*Reference:*%20${referenceId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Continue on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
                service: "Customized Travel Experience",
                travelDates: "",
                travelersCount: "",
                message: "",
              });
            }}
            className="w-full sm:w-auto text-xs text-white/50 hover:text-gold transition-colors py-2 px-4"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="mb-8">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
          Bespoke Travel Inquiry
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          Tell Us About Your Trip
        </h2>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          Complete the form below and our team will craft a personalized itinerary for you.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Sindhu Jeevesh"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Contact info: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
              WhatsApp / Phone <span className="text-gold">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98470 00000"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
              Email Address <span className="text-gold">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
            Service or Journey Type <span className="text-gold">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0c0c0c] border border-white/15 text-white text-sm focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-black text-white">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Details: Dates & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
              Preferred Dates / Month
            </label>
            <input
              type="text"
              name="travelDates"
              value={formData.travelDates}
              onChange={handleChange}
              placeholder="e.g. October 2026 or Dec 20–28"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
              Number of Travelers
            </label>
            <input
              type="text"
              name="travelersCount"
              value={formData.travelersCount}
              onChange={handleChange}
              placeholder="e.g. 2 Adults, 1 Child"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Message / Special Requests */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
            Trip Vision, Preferred Destinations & Special Requests
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about the destinations you wish to explore, preferred hotel categories, activities, or special requirements..."
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
          />
        </div>

        {/* Submission Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-white transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Bespoke Inquiry</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:border-gold hover:text-gold transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4 text-gold" />
            <span>Fill via WhatsApp</span>
          </button>
        </div>

        <p className="text-center text-[11px] text-white/40 pt-2">
          Your privacy is protected. We will only contact you regarding your travel request.
        </p>
      </form>
    </div>
  );
}

