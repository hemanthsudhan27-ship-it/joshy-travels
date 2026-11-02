import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { packagesData, PackageDetail } from "@/data/packagesData";

interface SimilarPackagesProps {
  currentSlug: string;
}

export default function SimilarPackages({ currentSlug }: SimilarPackagesProps) {
  const others = packagesData.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-black text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                Keep Exploring
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Similar Curated <span className="text-gold font-serif italic font-normal">Journeys</span>
            </h2>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm font-semibold group self-start sm:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {others.map((item: PackageDetail) => (
            <Link
              key={item.id}
              href={`/packages/${item.slug}`}
              className="group rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/50 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-white/90 font-medium flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>{item.duration}</span>
                </div>
                <div className="absolute bottom-3 left-4 text-xs text-white/80 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-gold" />
                  <span className="truncate max-w-[240px]">{item.destination}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-gold transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 mb-4 font-light leading-relaxed">
                    {item.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Starting From</span>
                    <span className="font-heading font-bold text-sm text-gold">{item.price}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-gold group-hover:translate-x-0.5 transition-transform font-medium">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

