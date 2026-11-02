import Image from "next/image";
import { Star, MapPin, Sparkles } from "lucide-react";
import { AccommodationFeature } from "@/data/packagesData";

interface PackageAccommodationsProps {
  accommodations: AccommodationFeature[];
}

export default function PackageAccommodations({
  accommodations,
}: PackageAccommodationsProps) {
  if (!accommodations || accommodations.length === 0) return null;

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-gold" />
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
          Handpicked Stays
        </span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8">
        Featured Accommodations
      </h2>

      <div className="space-y-6">
        {accommodations.map((hotel, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden"
          >
            {/* Image (5 cols) */}
            <div className="relative aspect-[16/10] md:col-span-5 rounded-lg overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-semibold text-gold flex items-center gap-1 border border-white/10">
                <Star className="w-3 h-3 fill-gold text-gold" />
                <span>{hotel.rating}</span>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block mb-1">
                  {hotel.type}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/50 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{hotel.location}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  {hotel.description}
                </p>
              </div>

              {/* Amenities tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {hotel.amenities.map((amenity, aIdx) => (
                  <span
                    key={aIdx}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/70 border border-white/5"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-gold" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

