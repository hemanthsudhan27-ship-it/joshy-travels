import Image from "next/image";

export default function ReviewsHero() {
  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      {/* Background Photography with Dark Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/villa-hd.jpg"
          alt="JJ Travels - Client Testimonials"
          fill
          priority
          className="object-cover object-center opacity-30 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
            CLIENT STORIES &nbsp;/&nbsp; VOICES OF TRUST
          </span>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-6">
            Real Journeys,
            <br />
            <span className="text-gold font-editorial italic font-normal lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="capitalize">Authentic</span> Words.
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-normal">
            Read firsthand accounts from travellers, couples, and groups who entrust their journeys to our meticulous care, personal coordination, and verified luxury hospitality.
          </p>
        </div>
      </div>
    </section>
  );
}

