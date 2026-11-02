import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReviewsHero from "@/components/reviews/ReviewsHero";
import ReviewsList from "@/components/reviews/ReviewsList";
import ReviewsTrustStrip from "@/components/reviews/ReviewsTrustStrip";
import ReviewsCTA from "@/components/reviews/ReviewsCTA";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | JJ Travels",
  description:
    "Read authentic reviews and verified feedback from travellers who have journeyed with Joshy Tours & Travels (JJ Travels).",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main className="flex-1">
        {/* 2.1 Hero Section */}
        <ReviewsHero />

        {/* 2.2 Featured Verified Reviews */}
        <ReviewsList />

        {/* 2.3 Trust & Reliability Strip */}
        <ReviewsTrustStrip />

        {/* 2.4 Final WhatsApp Call to Action */}
        <ReviewsCTA />
      </main>

      {/* 3. Global Footer */}
      <Footer variant="editorial" />
    </div>
  );
}

