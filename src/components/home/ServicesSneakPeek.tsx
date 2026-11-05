"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Plane, Hotel, Compass, FileCheck, ShieldCheck } from "lucide-react";
import defaultServicesData from "@/data/services.json";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

export default function ServicesSneakPeek() {
  const [services, setServices] = useState<ServiceItem[]>(
    defaultServicesData.services.slice(0, 4)
  );

  // Live client-side sync so changes made in admin panel reflect immediately
  useEffect(() => {
    async function loadFresh() {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok) {
          const json = await res.json();
          if (json.services && Array.isArray(json.services) && json.services.length > 0) {
            setServices(json.services.slice(0, 4));
          }
        }
      } catch {
        // Fallback to static services.json
      }
    }
    loadFresh();
  }, []);

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-bold text-gold">
                CONCIERGE CAPABILITIES &amp; SERVICES
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight uppercase">
              Crafted for the
              <br />
              <span className="text-gold font-editorial italic font-normal lowercase text-4xl sm:text-5xl md:text-6xl tracking-normal">
                <span className="capitalize">Discerning</span> Traveler.
              </span>
            </h2>

            <p className="font-body text-sm sm:text-base text-white/70 mt-4 leading-relaxed font-light">
              From private aviation and 5-star alpine chalets to effortless worldwide visa coordination, we handle every detail so your journey is absolute perfection.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 group self-start lg:self-end shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]"
          >
            <span>Explore All 9 Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Flagship Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {services.map((svc) => (
            <Link
              key={svc.id}
              href="/services"
              className="group relative rounded-2xl overflow-hidden bg-zinc-950/90 border border-white/10 hover:border-gold/50 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
            >
              {/* Image Thumbnail with Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Number Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-gold/30 text-gold font-mono font-bold text-xs">
                  {svc.number}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white/80 font-medium uppercase tracking-wider">
                  {svc.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-gold transition-colors duration-200 mb-2.5 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed font-light line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-gold group-hover:text-white transition-colors">
                  <span className="uppercase tracking-wider text-[11px]">View Service</span>
                  <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Value Reassurance Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">100% Bespoke Planning</h4>
              <p className="text-xs text-white/60 mt-0.5">Customized to your exact pace and aesthetic</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">Direct Concierge Care</h4>
              <p className="text-xs text-white/60 mt-0.5">24/7 WhatsApp coordination with coordinators</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">End-to-End Handling</h4>
              <p className="text-xs text-white/60 mt-0.5">Flights, 5★ stays, luxury transfers &amp; visas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
