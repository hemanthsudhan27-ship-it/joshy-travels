import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function GalleryCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello Joshy Travels! I was exploring your photo gallery and would like to plan a bespoke journey inspired by these destinations."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section className="relative py-20 sm:py-28 bg-black text-white border-t border-white/10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            Begin Your Story
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Ready to Step Into the{" "}
          <span className="text-gold font-serif italic font-normal">Frame?</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Every photograph in our archive represents a real itinerary meticulously planned for our guests. Let our coordinators bring your travel dreams to life.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold text-black font-semibold text-sm hover:bg-white transition-all duration-300 group"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Consult on WhatsApp</span>
          </a>

          <Link
            href="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:border-gold hover:text-gold transition-colors"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

