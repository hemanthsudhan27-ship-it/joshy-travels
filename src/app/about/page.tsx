import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import CoreValues from "@/components/about/CoreValues";
import OurPromise from "@/components/about/OurPromise";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Joshy Travels - The People Behind Your Next Journey",
  description:
    "A travel company passionate about creating meaningful journeys, unforgettable experiences and stories that stay with you forever.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main className="flex-1">
        {/* SECTION 01 — CINEMATIC OPENING */}
        <AboutHero />

        {/* SECTION 02 — OUR STORY */}
        <OurStory />

        {/* SECTION 03 — OUR JOURNEY (INTERACTIVE TIMELINE) */}
        <JourneyTimeline />

        {/* SECTION 04 — OUR CORE VALUES */}
        <CoreValues />

        {/* SECTION 05 — OUR PROMISE */}
        <OurPromise />

        {/* SECTION 06 — FINAL CTA */}
        <AboutCTA />
      </main>

      {/* SHARED FOOTER */}
      <Footer variant="editorial" />
    </div>
  );
}
