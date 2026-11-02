import { ShieldCheck, UserCheck, Sparkles } from "lucide-react";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Transparent Planning",
    description:
      "Clear itineraries, guaranteed hotel categories, and dependable local transport with zero hidden surprises.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Coordinators",
    description:
      "Personal travel agents remain on-call throughout your entire trip to ensure comfortable and seamless execution.",
  },
  {
    icon: Sparkles,
    title: "Vetted & Safe Luxury",
    description:
      "Hand-inspected hotels, safe stays for families and school groups, and premium vehicles for complete peace of mind.",
  },
];

export default function ReviewsTrustStrip() {
  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {trustPillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col items-start pt-8 md:pt-0 ${
                  index !== 0 ? "md:pl-10" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-gold/40 flex items-center justify-center text-gold mb-6">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {item.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

