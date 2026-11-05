import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us | Joshy Travels — Bespoke Journeys & Concierge Coordination",
  description:
    "Get in touch with Joshy Travels (Joshy Tours & Travels). Direct WhatsApp concierge with our coordinators Joby, Akhil, and team for bespoke tour packages, flights, hotels, and visa assistance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <ContactHero />

        {/* 2-Column Contact Info + Bespoke Inquiry Form */}
        <section className="py-12 sm:py-16 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Direct Channels & Coordinators (5 cols) */}
              <div className="lg:col-span-5">
                <ContactInfo />
              </div>

              {/* Right Column: Interactive Bespoke Inquiry Form (7 cols) */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <ContactFAQ />
      </main>

      {/* Editorial Footer */}
      <Footer variant="editorial" />
    </div>
  );
}

