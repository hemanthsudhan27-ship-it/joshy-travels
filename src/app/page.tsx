import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ServiceShortcuts from "@/components/home/ServiceShortcuts";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import ServicesSneakPeek from "@/components/home/ServicesSneakPeek";
import AboutSection from "@/components/home/AboutSection";
import GallerySneakPeek from "@/components/home/GallerySneakPeek";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main className="flex-1">
        {/* 2.1 Hero Section with Ambient Glow */}
        <Hero />

        {/* 2.2 Quick Category Shortcuts Bar */}
        <ServiceShortcuts />

        {/* 2.3 Handpicked Featured Tour Packages */}
        <FeaturedPackages />

        {/* 2.4 Concierge Capabilities & Services Sneak Peek */}
        <ServicesSneakPeek />

        {/* 2.5 About JJ Travels Editorial Narrative */}
        <AboutSection />

        {/* 2.6 Visual Archive & Gallery Moments Sneak Peek */}
        <GallerySneakPeek />
      </main>

      {/* 3. Global Luxury Footer */}
      <Footer />
    </div>
  );
}
