import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import InteractiveServices from "@/components/services/InteractiveServices";
import ServicesValues from "@/components/services/ServicesValues";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services | Joshy Travels - Travel, Made Simple",
  description:
    "Everything you need, one travel partner. Explore Joshy Travels' 9 specialized services: domestic & international packages, honeymoons, custom trips, flights, stays, and visas.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* SECTION 01 — NAVIGATION */}
      <Navbar />

      {/* MAIN LANDMARK */}
      <main className="flex-1">
        {/* SECTION 01 — INTRODUCTION */}
        <ServicesHero />

        {/* SECTION 02 — INTERACTIVE SERVICE DISCOVERY */}
        <InteractiveServices />

        {/* SECTION 04 — CORE VALUES */}
        <ServicesValues />

        {/* SECTION 05 — FINAL CALL TO ACTION */}
        <ServicesCTA />
      </main>

      {/* SECTION 06 — FOOTER */}
      <Footer variant="editorial" />
    </div>
  );
}
