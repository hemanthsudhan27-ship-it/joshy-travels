export default function ContactHero() {
  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden bg-black text-white">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            JJ Travels &nbsp;·&nbsp; Get In Touch
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl">
          Let&apos;s Plan Your{" "}
          <span className="text-gold font-serif italic font-normal">Next Journey.</span>
        </h1>

        {/* Supporting description */}
        <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
          Whether you are dreaming of a bespoke international itinerary, looking for family and honeymoon packages, or require immediate flight and visa coordination — our travel coordinators are at your service.
        </p>

        {/* Quick Trust Badges Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">100%</span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">Tailored Itineraries</span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">Instant</span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">WhatsApp Assistance</span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">24 / 7</span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">On-Trip Coordination</span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">Transparent</span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">Pricing & Guidance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

