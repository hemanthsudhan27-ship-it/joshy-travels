import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import homeData from "@/data/home.json";

export default function AboutSection() {
  const { aboutSneak } = homeData;

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-4">
              {aboutSneak.overline}
            </span>

            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              More Than
              <br />
              Just <span className="text-gold">Travel</span>
            </h2>

            <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-lg font-normal">
              {aboutSneak.paragraph}
            </p>

            <div>
              <Link
                href={aboutSneak.buttonHref || "/about"}
                className="inline-flex items-center gap-2.5 text-gold font-medium text-base hover:text-white transition-colors duration-200 group"
              >
                <span>{aboutSneak.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Signature Image Column with Diagonal Angle Cut */}
          <div className="lg:col-span-7 relative w-full">
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-2xl lg:rounded-none overflow-hidden">
              <div className="w-full h-full relative lg:clip-diagonal overflow-hidden lg:rounded-r-2xl">
                <Image
                  src={aboutSneak.image || "/images/about/amalfi-hd.jpg"}
                  alt="Joshy Travels - Amalfi Coast Scenic Cliffside Drive"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

