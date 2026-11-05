"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Eye } from "lucide-react";
import defaultGalleryData from "@/data/gallery.json";

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: string;
  categoryLabel: string;
  image: string;
  aspect: string;
  description: string;
  packageSlug?: string;
}

export default function GallerySneakPeek() {
  const [items, setItems] = useState<GalleryItem[]>(
    (defaultGalleryData as GalleryItem[]).slice(0, 5)
  );

  // Live client-side sync with admin CMS updates
  useEffect(() => {
    async function loadFresh() {
      try {
        const res = await fetch("/api/admin/gallery");
        if (res.ok) {
          const json = await res.json();
          if (json.items && Array.isArray(json.items) && json.items.length > 0) {
            setItems(json.items.slice(0, 5));
          }
        }
      } catch {
        // Fallback to static gallery.json
      }
    }
    loadFresh();
  }, []);

  if (!items || items.length === 0) return null;

  const mainItem = items[0];
  const secondaryItems = items.slice(1, 5);

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-bold text-gold">
                VISUAL ARCHIVE &amp; MOMENTS
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight uppercase">
              Glimpses of
              <br />
              <span className="text-gold font-editorial italic font-normal lowercase text-4xl sm:text-5xl md:text-6xl tracking-normal">
                <span className="capitalize">Extraordinary</span> Escapes.
              </span>
            </h2>

            <p className="font-body text-sm sm:text-base text-white/70 mt-4 leading-relaxed font-light">
              Real destinations, iconic skylines, and tranquil cliffside havens curated for our travelers. Every picture tells the story of an unforgettable journey.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 group self-start lg:self-end shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]"
          >
            <span>View Full Gallery ({defaultGalleryData.length}+ Photos)</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric Luxury Gallery Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Hero Card (Left, spans 7 cols) */}
          {mainItem && (
            <Link
              href="/gallery"
              className="lg:col-span-7 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[540px] bg-zinc-950 border border-white/10 hover:border-gold/50 shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <Image
                src={mainItem.image}
                alt={mainItem.title}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

              {/* Top Badges */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold/40 text-[11px] font-semibold tracking-wider uppercase text-gold">
                  <Sparkles className="w-3 h-3 text-gold" />
                  {mainItem.categoryLabel}
                </span>

                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{mainItem.location}</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors duration-200 mb-2 leading-tight">
                  {mainItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 font-light max-w-xl line-clamp-2 leading-relaxed">
                  {mainItem.description}
                </p>
              </div>
            </Link>
          )}

          {/* Right Column: 4 Grid Cards (spans 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryItems.map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-white/10 hover:border-gold/50 shadow-xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top Location Kicker */}
                <div className="relative z-10 p-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white/90">
                    <MapPin className="w-3 h-3 text-gold" />
                    <span className="truncate max-w-[150px]">{item.location}</span>
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4">
                  <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-gold transition-colors duration-200 line-clamp-1 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-mono block mt-0.5">
                    {item.categoryLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

