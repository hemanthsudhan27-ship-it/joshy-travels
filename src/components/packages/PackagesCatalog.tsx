"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { packagesData, type PackageDetail } from "@/data/packagesData";
import EnquiryModal from "@/components/common/EnquiryModal";

export type PackageItem = PackageDetail;

const filterCategories = [
  { key: "all", label: "All Collections" },
  { key: "europe", label: "Europe & Alps" },
  { key: "tropical", label: "Tropical & Islands" },
  { key: "middle-east", label: "Middle East" },
  { key: "honeymoon", label: "Romantic Escapes" },
];

export const packagesCatalogData: PackageDetail[] = packagesData;

export default function PackagesCatalog() {
  const [packages, setPackages] = useState<PackageDetail[]>(packagesData);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Modal state
  const [selectedPkg, setSelectedPkg] = useState<PackageDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Revalidate client-side on mount so any new admin changes or new packages display immediately
  useEffect(() => {
    async function loadFreshPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        if (res.ok) {
          const json = await res.json();
          if (json.items && Array.isArray(json.items) && json.items.length > 0) {
            setPackages(json.items);
          }
        }
      } catch {
        // Fallback to initial packagesData
      }
    }
    loadFreshPackages();
  }, []);

  const filteredPackages =
    activeFilter === "all"
      ? packages
      : packages.filter((pkg) => pkg.category === activeFilter);

  const handleOpenEnquiry = (pkg: PackageDetail) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative z-10 bg-black pt-10 pb-20 sm:pt-12 sm:pb-28 border-t border-white/10">
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
            {filteredPackages.map((pkg) => {
              const displayImage = pkg.heroImage || (pkg as any).image || "/images/packages/switzerland-hd.jpg";
              const displayPrice = pkg.price?.startsWith("From ") ? pkg.price : `From ${pkg.price}`;

              return (
                <div
                  key={pkg.id}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Image & Header Container */}
                  <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={displayImage}
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
                        {pkg.categoryLabel || pkg.category}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-wide text-white/90">
                        <Clock className="w-3 h-3 text-white/70" />
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Destination Kicker on bottom of image */}
                    <div className="absolute bottom-4 left-6 z-10 flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span className="truncate max-w-[280px]">{pkg.destination}</span>
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
                      {pkg.highlights && pkg.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {pkg.highlights.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/70 font-normal line-clamp-1"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Price + Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-white/50 block">
                          Starting Price
                        </span>
                        <span className="font-display font-bold text-lg sm:text-xl text-gold">
                          {displayPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="px-3.5 py-2 rounded-full border border-white/20 text-white text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
                        >
                          Itinerary
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEnquiry(pkg)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gold text-black text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                        >
                          <span>Enquire</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDestination={selectedPkg?.title}
        packageSlug={selectedPkg?.slug}
      />
    </>
  );
}
