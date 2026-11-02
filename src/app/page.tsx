import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ServiceShortcuts from "@/components/home/ServiceShortcuts";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main className="flex-1">
        {/* 2.1 Hero Section */}
        <Hero />

        {/* 2.2 Service Shortcuts Bar */}
        <ServiceShortcuts />

        {/* 2.3 Featured Packages */}
        <FeaturedPackages />

        {/* 2.4 About Us Editorial Split */}
        <AboutSection />
      </main>

      {/* 3. Footer & WhatsApp Final CTA */}
      <Footer />
    </div>
  );
}
