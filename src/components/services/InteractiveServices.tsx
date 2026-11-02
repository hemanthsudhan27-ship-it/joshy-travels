"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import servicesJson from "@/data/services.json";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

export const servicesData: ServiceItem[] = servicesJson.services as ServiceItem[];

export default function InteractiveServices() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = servicesData[activeIndex];

  const getWhatsappUrl = (title: string) => {
    const msg = encodeURIComponent(
      `Hello JJ Travels, I would like to discover more about your ${title} service.`
    );
    return `https://wa.me/919999999999?text=${msg}`;
  };

  return (
    <section className="relative z-10 bg-black py-20 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="mb-16 sm:mb-24 max-w-2xl">
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
            INTERACTIVE SERVICE DISCOVERY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Everything You Need.
            <br />
            <span className="text-gold font-editorial italic font-normal">
              One Travel Partner.
            </span>
          </h2>
        </div>

        {/* 2-Column Split: Left Index + Right Persistent Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN — SERVICE INDEX (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {servicesData.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative py-7 sm:py-8 px-4 sm:px-6 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-white/[0.03] pl-6 sm:pl-8 border-l-2 border-l-gold"
                      : "hover:bg-white/[0.015]"
                  }`}
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-5 sm:gap-7">
                    <span
                      className={`font-display text-sm sm:text-base font-semibold tracking-widest transition-colors duration-200 ${
                        isActive ? "text-gold" : "text-white/40 group-hover:text-gold"
                      }`}
                    >
                      {service.number}
                    </span>

                    <div>
                      <h3
                        className={`font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-200 ${
                          isActive ? "text-gold" : "text-white group-hover:text-gold"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/40 block mt-1">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Directional Arrow Action */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isActive
                        ? "border-gold bg-gold text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                        : "border-white/20 text-white/60 group-hover:border-gold group-hover:text-gold"
                    }`}
                  >
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive
                          ? "translate-x-0.5"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN — VISUAL EXPERIENCE (5 cols, Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-zinc-950 border border-white/10 shadow-2xl">
              {/* Dynamic Image Display with Smooth Crossfade */}
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeIndex === index
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 pointer-events-none scale-105"
                  } transition-transform duration-1000`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                  {/* Subtle dark bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>
              ))}

              {/* Bottom Card Overlay Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold block mb-2">
                  {activeService.number} &nbsp;·&nbsp; {activeService.category}
                </span>

                <h4 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  {activeService.title}
                </h4>

                <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed mb-6 max-w-md">
                  {activeService.description}
                </p>

                {/* Discover Service CTA */}
                <a
                  href={getWhatsappUrl(activeService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold text-black font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300 group"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discover Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

