import { Check, X, ShieldAlert } from "lucide-react";

interface PackageInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export default function PackageInclusions({
  inclusions,
  exclusions,
}: PackageInclusionsProps) {
  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-gold" />
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
          Transparent Terms
        </span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8">
        Inclusions & Exclusions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Inclusions */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <h3 className="font-heading text-lg font-bold text-white">
              Included in Your Journey
            </h3>
          </div>

          <ul className="space-y-3.5">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                <div className="w-4 h-4 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <h3 className="font-heading text-lg font-bold text-white/70">
              Not Included / Discretionary
            </h3>
          </div>

          <ul className="space-y-3.5">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-white/60">
                <div className="w-4 h-4 rounded-full bg-white/5 text-white/40 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2]" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Note strip */}
      <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
        <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <p className="text-xs text-white/60 leading-relaxed">
          <strong className="text-white font-medium">Bespoke Customization Available:</strong> All inclusions can be tailored according to your personal travel requirements, flight origin, and hotel room preferences. Connect with our concierge to personalize this itinerary.
        </p>
      </div>
    </div>
  );
}

