export default function ServicesHero() {
  return (
    <section className="relative bg-black pt-36 sm:pt-44 pb-20 sm:pb-28 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
            WHAT WE OFFER
          </span>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-8">
            Travel, Made
            <br />
            <span className="text-gold font-editorial italic font-normal lowercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="capitalize">Simple</span>.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed font-normal">
            From carefully planned holidays to flights, stays and personalized travel experiences, we bring everything together to make your journey seamless.
          </p>
        </div>
      </div>
    </section>
  );
}

