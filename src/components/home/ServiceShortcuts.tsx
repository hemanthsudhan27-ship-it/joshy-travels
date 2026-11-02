import Link from "next/link";
import { Plane, Bed, FileText, CalendarCheck } from "lucide-react";

interface ServiceShortcut {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const services: ServiceShortcut[] = [
  {
    title: "Flight Tickets",
    icon: Plane,
    href: "/services#flights",
  },
  {
    title: "Hotel Booking",
    icon: Bed,
    href: "/services#hotels",
  },
  {
    title: "Visa Assistance",
    icon: FileText,
    href: "/services#visa",
  },
  {
    title: "Custom Trips",
    icon: CalendarCheck,
    href: "/services#custom",
  },
];

export default function ServiceShortcuts() {
  return (
    <section className="relative z-20 bg-black border-y border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`group flex items-center justify-center gap-3.5 py-6 sm:py-8 px-4 transition-all duration-300 hover:bg-white/[0.02] ${
                  index % 2 === 1 ? "border-l border-white/10 md:border-l-0" : ""
                }`}
              >
                <div className="text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-white transition-colors duration-200 group-hover:text-gold tracking-wide">
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

