"use client";

import { MessageCircle, Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactInfo() {
  const whatsappUrl =
    "https://wa.me/919999999999?text=" +
    encodeURIComponent("Hello JJ Travels! I'd like to consult with your travel coordinators for an upcoming trip.");

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
          Direct Channels
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
          Speak With Our <br className="hidden sm:inline" />
          <span className="text-gold font-serif italic font-normal">Travel Coordinators</span>
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          At JJ Travels, you won&apos;t deal with impersonal call centers. You connect directly with experienced travel specialists dedicated to your itinerary from departure to safe return.
        </p>

        {/* WhatsApp Highlight Box */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-gold/15 via-gold/5 to-transparent border border-gold/40 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                  Fastest Response · WhatsApp
                </span>
              </div>
              <p className="text-white font-medium text-base mb-1">
                Chat with Joby, Akhil & Team
              </p>
              <p className="text-white/70 text-xs">
                Typical reply within 10–15 minutes during operating hours.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 text-gold group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-white transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
            <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Structural Channels List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Telephone */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
            Telephone Concierge
          </span>
          <a
            href="tel:+919999999999"
            className="text-white hover:text-gold text-base font-semibold block transition-colors"
          >
            +91 99999 99999
          </a>
          <span className="text-xs text-white/50 mt-1 block">Mon – Sat · 9 AM – 8 PM</span>
        </div>

        {/* Email */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
            Direct Email
          </span>
          <a
            href="mailto:enquiry@jjtravels.com"
            className="text-white hover:text-gold text-base font-semibold block transition-colors"
          >
            enquiry@jjtravels.com
          </a>
          <span className="text-xs text-white/50 mt-1 block">Official itinerary requests</span>
        </div>

        {/* Operating Base */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
            Hub Location
          </span>
          <span className="text-white text-base font-semibold block">
            Kerala, India
          </span>
          <span className="text-xs text-white/50 mt-1 block">Serving travelers worldwide</span>
        </div>

        {/* Support */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
            On-Trip Travelers
          </span>
          <span className="text-white text-base font-semibold block">
            24/7 Dedicated Care
          </span>
          <span className="text-xs text-white/50 mt-1 block">Round-the-clock emergency line</span>
        </div>
      </div>
    </div>
  );
}

