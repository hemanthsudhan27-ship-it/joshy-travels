"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packagesData, type PackageDetail } from "@/data/packagesData";

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<PackageDetail[]>(packagesData.slice(0, 3));

  useEffect(() => {
    async function loadFresh() {
      try {
        const res = await fetch("/api/admin/packages");
        if (res.ok) {
          const json = await res.json();
          if (json.items && Array.isArray(json.items) && json.items.length > 0) {
            setPackages(json.items.slice(0, 3));
          }
        }
      } catch {
        // Fallback
      }
    }
    loadFresh();
  }, []);

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
              FEATURED PACKAGES
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Handpicked
              <br className="hidden sm:inline" /> Experiences
            </h2>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-gold font-medium text-sm sm:text-base hover:text-white transition-colors duration-200 group self-start md:self-end"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg) => {
            const displayImage = pkg.heroImage || (pkg as any).image || "/images/packages/switzerland-hd.jpg";

            return (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 block shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Photography */}
                <Image
                  src={displayImage}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Bottom Scrim for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex items-end justify-between z-10">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-gold transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-medium mt-1">
                      {pkg.duration}
                    </p>
                  </div>

                  {/* Circular Gold Arrow CTA */}
                  <div className="w-10 h-10 rounded-full border border-gold/70 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-300 shrink-0 ml-3">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
