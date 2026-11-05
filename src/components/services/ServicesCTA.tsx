import { MessageCircle } from "lucide-react";

export default function ServicesCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello Joshy Travels, I would like to enquire about planning a customized trip."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section className="relative z-10 bg-black py-24 sm:py-36 border-t border-white/10 text-center">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-4">
            BEGIN PLANNING
          </span>

          {/* Headline */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
            Your Next Journey
            <br />
            <span className="text-gold font-editorial italic font-normal">
              Starts Here.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-lg mx-auto">
            Tell us where you want to go. We&apos;ll help you plan the rest.
          </p>

          {/* Primary WhatsApp CTA */}
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

