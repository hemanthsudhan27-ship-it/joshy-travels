import { Star, CheckCircle, Quote } from "lucide-react";
import reviewsJson from "@/data/reviews.json";

export interface ReviewItem {
  id: string;
  author: string;
  journey: string;
  rating: number;
  quote: string;
  location?: string;
  date?: string;
  verified?: boolean;
}

export default function ReviewsList() {
  const reviews: ReviewItem[] = reviewsJson as ReviewItem[];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };
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

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative p-8 sm:p-10 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-gold/50 shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: 5 Gold Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-gold/30 group-hover:text-gold/60 transition-colors duration-300" />
                </div>

                {/* Journey Kicker */}
                <span className="text-[11px] font-semibold tracking-wider text-gold uppercase block mb-3">
                  {review.journey}
                </span>

                {/* Review Paragraph */}
                <p className="font-body text-base sm:text-lg text-white/85 leading-relaxed font-normal mb-8">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-black border border-gold/60 flex items-center justify-center font-display font-bold text-gold text-sm group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    {getInitials(review.author)}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors duration-200">
                      {review.author}
                    </h3>
                    <p className="text-xs text-white/60 font-medium">
                      {review.location || "Verified Guest"}
                    </p>
                  </div>
                </div>

                {/* Verified Traveller Badge */}
                {review.verified !== false && (
                  <div className="flex items-center gap-1.5 text-xs text-gold/90 font-medium shrink-0">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

