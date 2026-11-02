import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "15+", label: "Years of Luxury Curation" },
  { value: "45+", label: "Handpicked Global Destinations" },
  { value: "100%", label: "Bespoke & Tailor-Made" },
];

export default function BrandStory() {
  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6">
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
              THE PHILOSOPHY
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-8">
              Every Journey is an
              <br />
              <span className="text-gold">Art Form</span>
            </h2>

            <div className="space-y-6 text-white/80 font-body text-base sm:text-lg leading-relaxed">
              <p>
                Founded on the belief that travel should be as unique as the traveller, JJ Travels designs bespoke global experiences tailored to your personal rhythm and passions.
              </p>
              <p className="text-white/70">
                Whether it is securing exclusive private villas overlooking the Amalfi Coast, curating private access to alpine sanctuaries in Switzerland, or coordinating discreet VIP transfers across Dubai, our mission is seamless elegance at every touchpoint.
              </p>
              <p className="text-white/70">
                With a dedicated 24/7 personal travel concierge assigned to every booking, you are never alone — enjoying total peace of mind from departure to return.
              </p>
            </div>

            {/* Editorial Stats Strip */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 shadow-2xl border border-white/10">
              <Image
                src="/images/about/villa-hd.jpg"
                alt="JJ Travels - Private Luxury Villa Sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs text-gold uppercase tracking-[0.2em] font-semibold block mb-1">
                  Private Villa Curation
                </span>
                <p className="text-white font-medium text-sm sm:text-base">
                  Exquisite private sanctuaries with verified luxury standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

