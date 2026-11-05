"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutHero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const overlineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image Scale-In
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.12,
          duration: 2.2,
          ease: "power2.out",
        });
      }

      // Staggered Headline & Content Reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(overlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.18,
          },
          "-=0.4"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.9,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[88vh] lg:min-h-screen flex items-center justify-between overflow-hidden bg-black pt-32 pb-20"
    >
      {/* Background Photography with Golden Mountain Peak */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/images/about/about-hero-hd.jpg"
          alt="About Joshy Travels - Mountain Ridge at Sunset"
          fill
          priority
          className="object-cover object-right md:object-center opacity-85"
        />

        {/* Gradient Scrims: Left Black Fade for High Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent w-full md:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="max-w-3xl">
          {/* Overline */}
          <span
            ref={overlineRef}
            className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-white/80 block mb-6"
          >
            ABOUT &nbsp;JJ &nbsp;TRAVELS
          </span>

          {/* Large Editorial Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-8">
            <span ref={line1Ref} className="block overflow-hidden">
              THE PEOPLE
            </span>
            <span ref={line2Ref} className="block overflow-hidden">
              BEHIND YOUR
            </span>
            <span
              ref={line3Ref}
              className="block overflow-hidden text-gold font-editorial italic lowercase tracking-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold mt-1"
            >
              <span className="capitalize">Next</span> Journey.
            </span>
          </h1>

          {/* Narrative Paragraph */}
          <p
            ref={descRef}
            className="font-body text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-normal"
          >
            A travel company passionate about creating meaningful journeys, unforgettable experiences and stories that stay with you forever.
          </p>
        </div>
      </div>
    </section>
  );
}
