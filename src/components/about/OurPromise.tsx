"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurPromise() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -30, scale: 1.05 },
          {
            y: 30,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden bg-black border-t border-white/10"
    >
      {/* Background Photography with Parallax: Alpine Viaduct with Scenic Train */}
      <div
        ref={imageRef}
        className="absolute -inset-10 z-0 will-change-transform"
      >
        <Image
          src="/images/about/about-viaduct-hd.jpg"
          alt="JJ Travels - Scenic Alpine Train Crossing Historic Stone Viaduct"
          fill
          priority
          className="object-cover object-right md:object-center opacity-85"
        />

        {/* Gradient Scrims: Left Black Fade for Clear Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/5 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 sm:py-24">
        <div className="max-w-xl">
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-white/80 block mb-4">
            OUR PROMISE
          </span>

          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] mb-6">
            TRAVEL BETTER.
            <br />
            <span className="text-gold font-editorial italic font-normal text-6xl sm:text-7xl md:text-8xl">
              Experience More.
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-white/85 leading-relaxed mb-10 font-normal max-w-lg">
            To bring you closer to the world with curated trips, seamless planning and experiences you&apos;ll always cherish.
          </p>

          <div>
            <Link
              href="/packages"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-black font-semibold text-sm sm:text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)] transition-all duration-300 group"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
