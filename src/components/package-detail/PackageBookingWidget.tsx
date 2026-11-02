"use client";

import { useState } from "react";
import { MessageCircle, Calendar, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";
import { PackageDetail } from "@/data/packagesData";
import PackageInquiryModal from "./PackageInquiryModal";

interface PackageBookingWidgetProps {
  pkg: PackageDetail;
}

export default function PackageBookingWidget({ pkg }: PackageBookingWidgetProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello JJ Travels! I am interested in booking or customizing the "${pkg.title}" (${pkg.duration}, starting ${pkg.price}). Please share available departure dates and details.`
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <>
      {/* Desktop Sticky Sidebar Widget */}
      <div className="sticky top-28 p-7 rounded-2xl bg-zinc-950 border border-gold/40 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-white/50 block font-medium">
              Starting From
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-heading text-3xl font-bold text-gold">
                {pkg.price}
              </span>
              <span className="text-xs text-white/60">/ guest</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-gold/15 text-gold text-[11px] font-semibold border border-gold/30">
            {pkg.duration}
          </span>
        </div>

        <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
          {pkg.priceDetail}. Taxes, luxury transfers, and curated excursions included as specified.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-white transition-all duration-200 group"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Enquire on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:border-gold hover:text-gold transition-colors"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Request Custom Dates</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="space-y-2.5 pt-5 border-t border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>100% Tailored to Your Schedule</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <span>Guaranteed 5★ Handpicked Stays</span>
          </div>
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-gold shrink-0" />
            <span>Direct WhatsApp Concierge (Joby & Akhil)</span>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/15 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase text-white/50 block">From</span>
          <span className="font-heading text-lg font-bold text-gold block leading-none">
            {pkg.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-lg border border-white/20 text-white text-xs font-medium hover:border-gold"
          >
            Custom Quote
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gold text-black text-xs font-bold hover:bg-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Inquiry Modal */}
      <PackageInquiryModal
        pkg={pkg}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

