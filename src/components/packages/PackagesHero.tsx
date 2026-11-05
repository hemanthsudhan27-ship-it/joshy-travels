import Image from "next/image";

export default function PackagesHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      {/* Background Photography with Depth Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/about-hero-hd.jpg"
          alt="Joshy Travels - Tour Packages"
          fill
          priority
          className="object-cover object-center opacity-40 scale-100"
        />

        {/* Gradient Scrims: Dark Atmospheric Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
            Joshy Travels &nbsp;/&nbsp; HANDPICKED EXPERIENCES
          </span>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-6">
            Curated Journeys,
            <br />
            <span className="text-gold font-editorial italic font-normal lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="capitalize">Unforgettable</span> Escapes.
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-normal">
            Immerse yourself in handpicked holiday itineraries. From the snowy peaks of Switzerland to the tranquil temples of Bali, every detail is crafted for effortless luxury.
          </p>
        </div>
      </div>
    </section>
  );
}

