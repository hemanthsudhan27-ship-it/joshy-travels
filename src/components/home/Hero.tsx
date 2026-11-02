"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import homeData from "@/data/home.json";

export default function Hero() {
  const { hero } = homeData;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-between overflow-hidden bg-black pt-28 pb-16">
      {/* Background Photography with Depth Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-hd.jpg"
          alt="Explore the World with JJ Travels - Mountain Sunset"
          fill
          priority
          className="object-cover object-right md:object-center opacity-85 scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Gradient Scrims for Text Readability & Pure Black Fusion */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex items-center justify-between">
        <div className="max-w-2xl">
          {/* Overline Kicker */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-white/90">
              {hero.overline}
            </span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.04] uppercase text-white mb-6">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
            <br />
            <span className="text-gold">{hero.titleLine3}</span>
          </h1>

          {/* Supporting Narrative */}
          <p className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-10 font-normal">
            Curated journeys, seamless planning and unforgettable experiences across the globe.
          </p>

          {/* Primary Action Button */}
          <div>
            <Link
              href={hero.buttonHref || "/packages"}
              className="inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-gold text-black font-semibold text-sm sm:text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)] transition-all duration-300 group"
            >
              <span>{hero.buttonText}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Minimal Editorial Scroll Indicator (Right Edge) */}
        <div className="hidden lg:flex flex-col items-center gap-3 self-end mb-8 text-white/60">
          <span className="text-[11px] tracking-[0.25em] uppercase font-medium rotate-90 origin-bottom translate-y-3">
            Scroll
          </span>
          <div className="w-[1.5px] h-12 bg-white/30 relative overflow-hidden mt-6">
            <div className="w-full h-1/2 bg-gold animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

