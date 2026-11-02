import { Star, CheckCircle, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  author: string;
  initials: string;
  journeyType: string;
  reviewText: string;
  rating: number;
  highlightKicker: string;
}

export const realReviews: TestimonialItem[] = [
  {
    id: "review-1",
    author: "Sindhu Jeevesh",
    initials: "SJ",
    journeyType: "Luxury Stay & Sunset Balcony",
    highlightKicker: "EXCELLENT COORDINATION AS USUAL",
    reviewText:
      "Overall a very good experience. Good ambience. Neat and clean luxury space. Experience a very beautiful sunset from the balcony. Very friendly crew. Beautiful interior. Bed rooms gives you a luxury hotel feeling. Thank you Joshi and team to give for an excellent cordination as usal.",
    rating: 5,
  },
  {
    id: "review-2",
    author: "Ashwin Babu",
    initials: "AB",
    journeyType: "Hyderabad Heritage Tour",
    highlightKicker: "METICULOUS PLANNING & CONSTANT SUPPORT",
    reviewText:
      "I recently completed a tour of Hyderabad with Joshy Tours and Travels, and it was an outstanding experience from start to finish. A special thanks to our travel agents, Joby and Akhil, for their meticulous planning and constant support throughout the trip. Everything—from the itinerary to the local transport—was handled seamlessly. They made sure we covered all the major landmarks like Charminar and Golconda Fort while also keeping the schedule comfortable. If you’re looking for a reliable agency that truly cares about its clients' experience, I highly recommend Joshy Tours. Looking forward to the next one.",
    rating: 5,
  },
  {
    id: "review-3",
    author: "Dr. Lakshmi S Kumar",
    initials: "LK",
    journeyType: "Loyola Coorg Group Expedition",
    highlightKicker: "RESPONSIBLE COORDINATION & SAFE STAYS",
    reviewText:
      "The Coorg trip for loyola 5th and 6th was really exciting and warming. The stay and food were safe .Also the site seeing were amazing . I would recommend your service with utmost care for all . The co-ordinators and teachers were very much responsible .Thank you so much.🙏🤩",
    rating: 5,
  },
];

export default function ReviewsList() {
  return (
    <section className="relative z-10 bg-black py-20 sm:py-28 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Client Words,{" "}
            <span className="text-gold font-editorial italic font-normal">
              Shared Trust
            </span>
          </h2>
        </div>

        {/* 3 Prominent Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {realReviews.map((review) => (
            <div
              key={review.id}
              className="group relative p-8 sm:p-10 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: 5 Gold Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-gold/30 group-hover:text-gold/60 transition-colors duration-300" />
                </div>

                {/* Highlight Kicker */}
                <span className="text-[11px] font-semibold tracking-wider text-gold uppercase block mb-3">
                  {review.highlightKicker}
                </span>

                {/* Review Paragraph */}
                <p className="font-body text-base sm:text-lg text-white/85 leading-relaxed font-normal mb-8">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              {/* Bottom Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-black border border-gold/60 flex items-center justify-center font-display font-bold text-gold text-sm group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    {review.initials}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors duration-200">
                      {review.author}
                    </h3>
                    <p className="text-xs text-white/60 font-medium">
                      {review.journeyType}
                    </p>
                  </div>
                </div>

                {/* Verified Traveller Badge */}
                <div className="flex items-center gap-1.5 text-xs text-gold/90 font-medium shrink-0">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  <span className="hidden sm:inline">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

