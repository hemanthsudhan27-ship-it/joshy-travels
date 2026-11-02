import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Calendar, Users, ChevronRight, Sparkles } from "lucide-react";
import { PackageDetail } from "@/data/packagesData";

interface PackageHeroProps {
  pkg: PackageDetail;
}

export default function PackageHero({ pkg }: PackageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-black text-white">
      {/* Background Hero Image with dark gradient scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60 font-medium">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link href="/packages" className="hover:text-gold transition-colors">
            Tour Packages
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-gold truncate max-w-[200px] sm:max-w-none">{pkg.title}</span>
        </nav>

        {/* Eyebrow & Category */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs uppercase tracking-wider text-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {pkg.categoryLabel}
          </span>
          <span className="text-white/40 text-xs">·</span>
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{pkg.destination}</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          {pkg.title}
        </h1>

        {/* Atmosphere Quote */}
        <p className="mt-5 text-base sm:text-xl font-serif italic text-white/85 max-w-3xl leading-relaxed">
          &ldquo;{pkg.atmosphereQuote}&rdquo;
        </p>

        {/* Quick Facts Strip */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/50 block">Duration</span>
              <span className="text-sm sm:text-base font-semibold text-white">{pkg.duration}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/50 block">Best Season</span>
              <span className="text-sm sm:text-base font-semibold text-white">{pkg.bestTimeToVisit.split("(")[0]}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/50 block">Travel Style</span>
              <span className="text-sm sm:text-base font-semibold text-white">{pkg.groupStyle.split("&")[0]}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <span className="text-xs font-bold font-mono">$</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gold block font-semibold">Starting From</span>
              <span className="text-sm sm:text-base font-bold text-white font-heading">
                {pkg.price} <span className="text-xs font-normal text-white/60">/ guest</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

