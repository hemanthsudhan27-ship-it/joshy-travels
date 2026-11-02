import { MessageCircle } from "lucide-react";

export default function AboutCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello JJ Travels, let's plan our next journey together."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section className="relative z-10 bg-black py-24 sm:py-36 border-t border-white/10 text-center">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-4">
            BEGIN YOUR EXPERIENCE
          </span>

          {/* Headline */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight uppercase mb-6">
            Let&apos;s Plan
            <br />
            <span className="text-gold font-editorial italic font-normal lowercase text-5xl sm:text-6xl md:text-7xl">
              <span className="capitalize">Your</span> Next Journey.
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-lg mx-auto">
            Connect with our personal travel concierge to curate an extraordinary travel narrative shaped around your style.
          </p>

          {/* Primary Action Button */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gold text-black font-semibold text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_35px_rgba(255,215,0,0.35)] transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

