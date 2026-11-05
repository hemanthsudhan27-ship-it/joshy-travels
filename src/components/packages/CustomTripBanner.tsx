import { MessageCircle, ArrowRight } from "lucide-react";

export default function CustomTripBanner() {
  const whatsappMessage = encodeURIComponent(
    "Hello Joshy Travels, I would like to design a bespoke custom itinerary for my upcoming trip."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.06)] overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
              BESPOKE TRAVEL CURATION
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6">
              Have a Specific
              <br />
              <span className="text-gold font-editorial italic font-normal">
                Destination in Mind?
              </span>
            </h2>

            <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-xl font-normal">
              Our travel designers craft completely customized itineraries shaped around your personal calendar, private aviation needs, luxury villa preferences, and VIP experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold text-black font-semibold text-sm sm:text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)] transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Plan a Custom Journey</span>
              </a>

              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base hover:border-gold hover:text-gold transition-all duration-300 group"
              >
                <span>Browse All Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

