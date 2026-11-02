import servicesJson from "@/data/services.json";

export default function ServicesHero() {
  const { hero } = servicesJson;

  return (
    <section className="relative bg-black pt-36 sm:pt-44 pb-20 sm:pb-28 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
            {hero.overline}
          </span>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-8">
            {hero.titlePrefix}
            <br />
            <span className="text-gold font-editorial italic font-normal lowercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="capitalize">{hero.titleAccent.replace(/\.$/, "")}</span>.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed font-normal">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}

