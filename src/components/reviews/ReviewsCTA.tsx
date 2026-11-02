import { MessageCircle } from "lucide-react";

export default function ReviewsCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello JJ Travels, I read your client reviews and would like to plan a trip with your team."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <section className="relative z-10 bg-black py-20 sm:py-32 border-t border-white/10 text-center">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.06)]">
          <span className="text-[11px] sm:text-[13px] tracking-[0.28em] uppercase font-semibold text-gold block mb-4">
            START YOUR JOURNEY
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6">
            Ready to Experience Travel
            <br />
            <span className="text-gold font-editorial italic font-normal">
              Built on Genuine Care?
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto font-normal">
            Connect directly with our dedicated travel agents to craft a transparent, comfortable, and memorable trip.
          </p>

          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gold text-black font-semibold text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_35px_rgba(255,215,0,0.35)] transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Plan Your Trip on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

