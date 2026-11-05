export default function GalleryHero() {
  return (
    <section className="relative pt-36 pb-14 sm:pt-44 sm:pb-18 overflow-hidden bg-black text-white">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gold/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Joshy Travels &nbsp;·&nbsp; Visual Archive
          </span>
        </div>

        {/* Display Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl">
          Capturing{" "}
          <span className="text-gold font-serif italic font-normal">Moments</span> That
          Stay Forever.
        </h1>

        {/* Supporting Narrative */}
        <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
          From the silence of eternal Swiss peaks and cliffside Mediterranean balconies to golden Arabian dunes — explore the living horizons and authentic stays curated by our team.
        </p>

        {/* Quick Badges Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">
              12
            </span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">
              Curated Moments
            </span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">
              5★
            </span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">
              Handpicked Stays
            </span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">
              100%
            </span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">
              Verified Locations
            </span>
          </div>
          <div>
            <span className="text-gold font-heading text-xl sm:text-2xl font-bold block">
              Direct
            </span>
            <span className="text-xs text-white/60 tracking-wider uppercase mt-1 block">
              Concierge Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

