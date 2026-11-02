export default function ServicesValues() {
  return (
    <section className="relative z-10 bg-black py-24 sm:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Overline */}
        <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-12 sm:mb-16">
          OUR COMMITMENT
        </span>

        {/* Spacious 2-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Core Value 01 */}
          <div className="flex flex-col justify-between p-8 sm:p-12 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-gold/40 transition-colors duration-300">
            <div>
              <span className="font-display text-xs font-semibold tracking-widest text-gold block mb-6">
                01 &nbsp;/&nbsp; INTEGRITY
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6">
                Trust &amp;{" "}
                <span className="text-gold font-editorial italic font-normal">
                  Reliability
                </span>
              </h3>
            </div>
            <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed font-normal">
              Travel planning built on transparency, dependable assistance and attention to every detail.
            </p>
          </div>

          {/* Core Value 02 */}
          <div className="flex flex-col justify-between p-8 sm:p-12 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-gold/40 transition-colors duration-300">
            <div>
              <span className="font-display text-xs font-semibold tracking-widest text-gold block mb-6">
                02 &nbsp;/&nbsp; INDIVIDUALITY
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6">
                Personalized{" "}
                <span className="text-gold font-editorial italic font-normal">
                  Experiences
                </span>
              </h3>
            </div>
            <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed font-normal">
              Every traveller is different. We focus on understanding individual preferences and creating journeys that feel personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

