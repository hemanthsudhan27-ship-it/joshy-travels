"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does Joshy Travels customize private itineraries?",
    answer:
      "Every custom trip begins with a 1-on-1 consultation where we learn your travel pace, preferred hotel categories, dining preferences, and specific bucket-list highlights. We then curate a personalized day-by-day itinerary with verified local partners, luxury transfers, and curated excursions before finalizing reservations.",
  },
  {
    question: "What is your booking timeline and payment structure?",
    answer:
      "For international departures and peak-season vacations, we recommend starting consultations 6–12 weeks prior to travel to secure optimal flight connections and preferred room categories. We offer transparent payment milestones: an initial deposit upon itinerary confirmation, followed by balanced stage payments as flight tickets and hotel bookings are issued.",
  },
  {
    question: "Do you handle visa documentation and flight ticket bookings?",
    answer:
      "Yes. Our end-to-end service covers international and domestic flight ticketing (including seat selection, meal requests, and baggage allowances) alongside meticulous visa assistance — including document checklists, appointment scheduling, and application guidance for Schengen, UK, US, UAE, and Asian destinations.",
  },
  {
    question: "What assistance do we receive while we are actively traveling?",
    answer:
      "You receive 24/7 dedicated concierge coordination. Our travel coordinators (including Joby, Akhil, and team) remain directly accessible via WhatsApp and telephone to manage schedule adjustments, flight notifications, hotel check-in coordination, or any on-ground requirement that may arise.",
  },
  {
    question: "Can you organize group tours, school excursions, or corporate retreats?",
    answer:
      "Yes. We specialize in group logistics with dedicated tour coordinators on-ground, safe charter transportation, verified stays, and customized group meal arrangements — maintaining the same rigorous standards of safety, quality, and hospitality experienced on our private tours.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-black text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              Common Inquiries
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked{" "}
            <span className="text-gold font-serif italic font-normal">Questions</span>
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base font-light">
            Everything you need to know about planning, booking, and traveling with Joshy Travels.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-7 flex items-center justify-between text-left group gap-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg sm:text-xl font-medium text-white group-hover:text-gold transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "border-gold bg-gold text-black rotate-180"
                        : "border-white/20 text-white/60 group-hover:border-gold group-hover:text-gold"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-8 pr-12 text-sm sm:text-base text-white/70 leading-relaxed font-light animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

