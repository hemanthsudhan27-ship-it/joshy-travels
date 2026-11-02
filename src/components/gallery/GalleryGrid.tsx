"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Maximize2, Sparkles } from "lucide-react";
import { galleryData, GalleryItem } from "@/data/galleryData";
import GalleryLightbox from "./GalleryLightbox";

const CATEGORIES = [
  { key: "all", label: "All Moments" },
  { key: "europe", label: "Alps & Europe" },
  { key: "oceans", label: "Oceans & Coastal" },
  { key: "middle-east", label: "Middle East" },
  { key: "stays", label: "Luxury Stays" },
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <section className="py-12 sm:py-16 bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gold text-black shadow-lg shadow-gold/20"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-gold/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item: GalleryItem, idx: number) => {
            // Determine aspect ratio class based on item specification
            const aspectClass =
              item.aspect === "tall"
                ? "aspect-[3/4]"
                : item.aspect === "wide"
                ? "aspect-[16/10]"
                : "aspect-[4/3]";

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-gold/60 shadow-xl transition-all duration-500 cursor-pointer ${aspectClass} flex flex-col justify-end`}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-wider uppercase text-gold">
                    <Sparkles className="w-2.5 h-2.5 text-gold" />
                    {item.categoryLabel}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/60 group-hover:text-gold group-hover:border-gold transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="relative z-10 p-5 sm:p-6 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 mt-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}

