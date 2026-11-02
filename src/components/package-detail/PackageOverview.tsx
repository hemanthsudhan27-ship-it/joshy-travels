import { CheckCircle2, ShieldCheck, Compass } from "lucide-react";
import { PackageDetail } from "@/data/packagesData";

interface PackageOverviewProps {
  pkg: PackageDetail;
}

export default function PackageOverview({ pkg }: PackageOverviewProps) {
  return (
    <div className="space-y-10">
      {/* Editorial Overview Text */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Journey Narrative
          </span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
          The Experience Ahead
        </h2>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light mb-6">
          {pkg.overview}
        </p>

        {/* Transfer & Accommodation specs strip */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Private Transit:</span>
              <span>{pkg.transferType}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Stay Category:</span>
              <span>{pkg.accommodationType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Journey Highlights */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Curated Inclusions
          </span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
          Signature Highlights
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pkg.highlights.map((highlight, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-colors flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm text-white/85 font-medium leading-snug">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

