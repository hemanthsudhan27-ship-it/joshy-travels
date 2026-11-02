import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackagesHero from "@/components/packages/PackagesHero";
import PackagesCatalog from "@/components/packages/PackagesCatalog";
import CustomTripBanner from "@/components/packages/CustomTripBanner";

export const metadata: Metadata = {
  title: "Tour Packages | JJ Travels - Handpicked Luxury Experiences",
  description:
    "Explore handpicked luxury tour packages across Switzerland, Bali, Dubai, the Amalfi Coast, and Santorini. All-inclusive bespoke holiday curations.",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main className="flex-1">
        {/* 2.1 Hero Section */}
        <PackagesHero />

        {/* 2.2 Interactive Filterable Packages Catalog */}
        <div id="catalog">
          <PackagesCatalog />
        </div>

        {/* 2.3 Custom Bespoke Journey Banner */}
        <CustomTripBanner />
      </main>

      {/* 3. Global Footer */}
      <Footer variant="editorial" />
    </div>
  );
}

