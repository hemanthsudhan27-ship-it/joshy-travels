export default function ReviewsHero() {
  return (
    <section className="pt-28 sm:pt-32 pb-6 bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-6 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                Client Stories
              </span>
            </div>
            {/* Compact Heading */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              What Our Travellers Say
            </h1>
          </div>
          {/* One-line descriptor */}
          <p className="text-sm text-white/50 font-body max-w-xs sm:text-right pb-0.5">
            Firsthand accounts from real journeys with our team.
          </p>
        </div>
        {/* Thin divider */}
        <div className="mt-6 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
