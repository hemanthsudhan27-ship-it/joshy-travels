import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export const metadata: Metadata = {
  title: "Visual Archive & Travel Moments | JJ Travels — Luxury Journeys",
  description:
    "Explore the visual archive of JJ Travels. Handpicked photography from the Swiss Alps, Amalfi Coast, Santorini caldera, Dubai horizons, and luxury private villas worldwide.",
  openGraph: {
    title: "Visual Archive & Travel Moments | JJ Travels",
    description:
      "A curated photographic window into the destinations, bespoke journeys, and 5-star handpicked stays curated by JJ Travels.",
    images: [{ url: "/images/packages/switzerland-hd.jpg" }],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero */}
        <GalleryHero />

        {/* Interactive Filterable Masonry Grid with Fullscreen Lightbox */}
        <GalleryGrid />

        {/* Bottom Banner */}
        <GalleryCTA />
      </main>

      {/* Editorial Footer */}
      <Footer variant="editorial" />
    </div>
  );
}

