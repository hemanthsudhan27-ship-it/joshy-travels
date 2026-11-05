import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceEntry {
  number: string;
  title: string;
  category: string;
  slug: string;
}

const servicesList: ServiceEntry[] = [
  {
    number: "01",
    title: "Domestic Tour Packages",
    category: "Curated Escapes",
    slug: "domestic-tour-packages",
  },
  {
    number: "02",
    title: "International Tour Packages",
    category: "Global Destinations",
    slug: "international-tour-packages",
  },
  {
    number: "03",
    title: "Honeymoon Packages",
    category: "Romantic Journeys",
    slug: "honeymoon-packages",
  },
  {
    number: "04",
    title: "Family Vacation Packages",
    category: "Generational Travel",
    slug: "family-vacation-packages",
  },
  {
    number: "05",
    title: "Customized Travel Experiences",
    category: "Bespoke Curation",
    slug: "customized-travel-experiences",
  },
  {
    number: "06",
    title: "Group Tours",
    category: "Guided Expeditions",
    slug: "group-tours",
  },
  {
    number: "07",
    title: "Flight Ticket Booking",
    category: "Air Travel",
    slug: "flight-ticket-booking",
  },
  {
    number: "08",
    title: "Hotel Reservations",
    category: "Luxury Stays",
    slug: "hotel-reservations",
  },
  {
    number: "09",
    title: "Visa Assistance",
    category: "Travel Clearance",
    slug: "visa-assistance",
  },
];

export default function ServicesList() {
  const whatsappUrl = (title: string) => {
    const msg = encodeURIComponent(
      `Hello Joshy Travels, I would like to enquire about your ${title} service.`
    );
    return `https://wa.me/919999999999?text=${msg}`;
  };

  return (
    <section className="relative z-10 bg-black py-20 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
            PORTFOLIO OF SERVICES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Everything You Need.
            <br />
            <span className="text-gold font-editorial italic font-normal">
              One Travel Partner.
            </span>
          </h2>
        </div>

        {/* Structured 3x3 Grid of 9 Services with Thin Structural Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {servicesList.map((service) => (
            <a
              key={service.number}
              href={whatsappUrl(service.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 sm:p-10 border-b border-r border-white/10 transition-all duration-300 hover:bg-white/[0.02] flex flex-col justify-between min-h-[220px]"
            >
              {/* Top Row: Number & Category */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xs font-semibold tracking-widest text-white/40 group-hover:text-gold transition-colors duration-200">
                  {service.number}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/40">
                  {service.category}
                </span>
              </div>

              {/* Bottom Row: Service Title & Minimal Directional Arrow */}
              <div className="flex items-end justify-between gap-4 pt-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-gold transition-colors duration-200 tracking-tight leading-snug">
                  {service.title}
                </h3>

                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 shrink-0 mb-1">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

