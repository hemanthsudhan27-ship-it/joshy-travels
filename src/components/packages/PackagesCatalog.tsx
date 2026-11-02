"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";

export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  category: "all" | "europe" | "tropical" | "middle-east" | "honeymoon";
  categoryLabel: string;
  price: string;
  image: string;
  highlights: string[];
}

export const packagesCatalogData: PackageItem[] = [
  {
    id: "switzerland",
    slug: "switzerland-explorer",
    title: "Switzerland Explorer",
    destination: "Zermatt & Swiss Alps",
    duration: "7 Days / 6 Nights",
    category: "europe",
    categoryLabel: "Europe & Alps",
    price: "From $3,450",
    image: "/images/packages/switzerland-hd.jpg",
    highlights: ["Matterhorn View", "Glacier Express", "5★ Alpine Chalets"],
  },
  {
    id: "bali",
    slug: "bali-escape",
    title: "Bali Serenity Escape",
    destination: "Ubud & Nusa Dua, Indonesia",
    duration: "5 Days / 4 Nights",
    category: "tropical",
    categoryLabel: "Tropical & Islands",
    price: "From $1,850",
    image: "/images/packages/bali-hd.jpg",
    highlights: ["Ulun Danu Temple", "Private Pool Villa", "Yacht Charter"],
  },
  {
    id: "dubai",
    slug: "dubai-getaway",
    title: "Dubai Luxury Getaway",
    destination: "Dubai & Desert Dunes, UAE",
    duration: "4 Days / 3 Nights",
    category: "middle-east",
    categoryLabel: "Middle East & Wonders",
    price: "From $2,100",
    image: "/images/packages/dubai-hd.jpg",
    highlights: ["Burj Khalifa VIP", "Luxury Desert Safari", "Marina Cruise"],
  },
  {
    id: "amalfi",
    slug: "amalfi-coast-odyssey",
    title: "Amalfi Coast & Capri Odyssey",
    destination: "Positano & Capri, Italy",
    duration: "6 Days / 5 Nights",
    category: "honeymoon",
    categoryLabel: "Romantic & Honeymoon",
    price: "From $3,800",
    image: "/images/about/amalfi-hd.jpg",
    highlights: ["Cliffside Villa", "Capri Private Sail", "Michelin Dining"],
  },
  {
    id: "santorini",
    slug: "santorini-caldera-haven",
    title: "Santorini Caldera Haven",
    destination: "Oia & Aegean Sea, Greece",
    duration: "5 Days / 4 Nights",
    category: "honeymoon",
    categoryLabel: "Romantic & Honeymoon",
    price: "From $2,950",
    image: "/images/packages/santorini-hd.jpg",
    highlights: ["Caldera Plunge Pool", "Sunset Catamaran", "Volcanic Vineyards"],
  },
  {
    id: "alpine-rail",
    slug: "alpine-scenic-rail",
    title: "Alpine Scenic Rail & St. Moritz",
    destination: "Graubünden & St. Moritz, Switzerland",
    duration: "8 Days / 7 Nights",
    category: "europe",
    categoryLabel: "Europe & Alps",
    price: "From $4,200",
    image: "/images/about/about-viaduct-hd.jpg",
    highlights: ["Historic Viaduct Rail", "St. Moritz Heritage Stays", "Thermal Alpine Spas"],
  },
];

const filterCategories = [
  { key: "all", label: "All Collections" },
  { key: "europe", label: "Europe & Alps" },
  { key: "tropical", label: "Tropical & Islands" },
  { key: "middle-east", label: "Middle East" },
  { key: "honeymoon", label: "Romantic Escapes" },
];

export default function PackagesCatalog() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPackages =
    activeFilter === "all"
      ? packagesCatalogData
      : packagesCatalogData.filter((pkg) => pkg.category === activeFilter);

  const getWhatsappUrl = (title: string, duration: string) => {
    const msg = encodeURIComponent(
      `Hello JJ Travels, I am interested in the ${title} package (${duration}). Please share availability and customized itinerary details.`
    );
    return `https://wa.me/919999999999?text=${msg}`;
  };

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-16 no-scrollbar">
          {filterCategories.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-gold text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] scale-105"
                    : "bg-zinc-950/80 text-white/70 border border-white/10 hover:border-gold/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Packages Grid: 3 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image & Header Container */}
              <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-gold">
                    <Sparkles className="w-3 h-3 text-gold" />
                    {pkg.categoryLabel}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-wide text-white/90">
                    <Clock className="w-3 h-3 text-white/70" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Destination Kicker on bottom of image */}
                <div className="absolute bottom-4 left-6 z-10 flex items-center gap-1.5 text-xs text-white/80 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{pkg.destination}</span>
                </div>
              </Link>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <Link href={`/packages/${pkg.slug}`}>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors duration-200 mb-3 leading-tight">
                      {pkg.title}
                    </h3>
                  </Link>

                  {/* Highlights Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70 font-normal"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Price + Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/50 block">
                      Starting Price
                    </span>
                    <span className="font-display font-bold text-lg sm:text-xl text-gold">
                      {pkg.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="px-3.5 py-2 rounded-full border border-white/20 text-white text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
                    >
                      Itinerary
                    </Link>
                    <a
                      href={getWhatsappUrl(pkg.title, pkg.duration)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gold text-black text-xs font-bold hover:bg-white transition-colors"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

