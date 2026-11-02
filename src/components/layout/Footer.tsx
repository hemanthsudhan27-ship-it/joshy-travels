import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface FooterProps {
  variant?: "default" | "editorial";
}

export default function Footer({ variant = "default" }: FooterProps) {
  const whatsappMessage = encodeURIComponent(
    "Hello JJ Travels, I would like to plan my next journey with you."
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Reviews", href: "/reviews" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  if (variant === "editorial") {
    return (
      <footer className="relative z-10 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left: Brand Monogram + Tagline */}
            <div className="flex items-center gap-5">
              <Link href="/" className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="JJ Travels Monogram"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </Link>

              <div className="h-9 w-px bg-white/20" />

              <div>
                <span className="text-white text-base font-semibold tracking-wide block">
                  JJ Travels
                </span>
                <span className="text-white/60 text-xs tracking-wider">
                  Explore &nbsp;·&nbsp; Discover &nbsp;·&nbsp; Experience
                </span>
              </div>
            </div>

            {/* Right: Essential Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-white/80">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      {/* Signature Split Final CTA Bar (Direct Reference Replication) */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left: Brand Monogram + Statement */}
          <div className="flex items-center gap-5">
            <Link href="/" className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/logo.png"
                alt="JJ Travels Monogram"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>

            <div className="h-9 w-px bg-white/20" />

            <div className="text-white text-base sm:text-lg font-medium leading-tight tracking-wide">
              <span>Let&apos;s Plan</span>
              <br />
              <span className="text-white/80">Your Next Journey.</span>
            </div>
          </div>

          {/* Right: Solid Gold WhatsApp CTA Button */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold text-black font-semibold text-sm sm:text-base tracking-wide hover:bg-[#ffe033] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)] transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Minimal Editorial Footer Sub-Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p>&copy; 2026 JJ Travels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
