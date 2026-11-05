import { Compass, Sparkles, Clock, ShieldCheck } from "lucide-react";

interface PillarItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const pillars: PillarItem[] = [
  {
    icon: Compass,
    title: "Tailored Itineraries",
    description:
      "Every itinerary is custom designed around your passions, timing, and travel preferences. No cookie-cutter packages.",
  },
  {
    icon: Sparkles,
    title: "Handpicked Luxury Stays",
    description:
      "We partner exclusively with vetted 5-star properties, heritage estates, and private beachfront villas worldwide.",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Concierge",
    description:
      "A personal travel manager remains on call around the clock throughout your journey to ensure effortless peace of mind.",
  },
  {
    icon: ShieldCheck,
    title: "Seamless Visa & Transit",
    description:
      "From expedited visa documentation to private airport tarmac transfers and chartered flights, every transition is frictionless.",
  },
];

export default function PillarsSection() {
  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
            PILLARS OF EXCELLENCE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Why Discerning Travellers Choose <span className="text-gold">Joshy Travels</span>
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-black border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-gold transition-colors duration-200">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gold/80 font-semibold tracking-wider uppercase">
                  <span>Standard of Care</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

