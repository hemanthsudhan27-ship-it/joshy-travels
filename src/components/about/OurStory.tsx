"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax & scale-in for the coastal story photograph
      if (imageWrapperRef.current) {
        gsap.from(imageWrapperRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 20%",
            scrub: 1,
          },
          y: 40,
          scale: 0.96,
          ease: "none",
        });
      }

      // Staggered reveal for story narrative
      if (textColRef.current) {
        gsap.from(textColRef.current.children, {
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 35,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-24 sm:py-36 overflow-hidden border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Signature Parallelogram Masked Image */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageWrapperRef}
              className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] will-change-transform"
            >
              <div className="w-full h-full relative lg:clip-parallelogram rounded-2xl lg:rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/about-story-hd.jpg"
                  alt="JJ Travels - Italian Coastal Cliffside Village at Sunset"
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: Narrative Story Content */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-4">
              OUR STORY
            </span>

            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Driven by a
              <br />
              Love for{" "}
              <span className="text-gold font-editorial italic font-normal">
                Travel
              </span>
            </h2>

            <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-xl font-normal">
              JJ Travels was founded with a simple belief — travel changes the way we see the world. What began as a passion for exploration has grown into a trusted travel partner for individuals, families and groups across destinations.
            </p>

            <div>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2.5 text-gold font-medium text-base hover:text-white transition-colors duration-200 group"
              >
                <span>Our Journey</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
