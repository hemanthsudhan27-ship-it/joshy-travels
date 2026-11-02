"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

const defaultMilestones: MilestoneItem[] = [
  {
    id: "m1",
    year: "2018",
    title: "The Genesis",
    description:
      "Founded with a singular vision: to liberate modern luxury travel from rigid itineraries, creating bespoke private journeys shaped purely around the traveller.",
  },
  {
    id: "m2",
    year: "2020",
    title: "Private Villa & Sanctuary Partnerships",
    description:
      "Established exclusive direct relationships with private Mediterranean coastal estates, Swiss Alpine chalets, and secluded island retreats.",
  },
  {
    id: "m3",
    year: "2022",
    title: "Dedicated 24/7 Concierge Network",
    description:
      "Integrated dedicated 24/7 personal travel managers for every guest, managing seamless flight clearances, private aviation, and expedited visas worldwide.",
  },
  {
    id: "m4",
    year: "2024",
    title: "Signature Global Expeditions",
    description:
      "Expanded into ultra-customized multi-continent journeys, private scenic railway charters, and curated travel narratives spanning over 45 destinations.",
  },
];

interface JourneyTimelineProps {
  milestones?: MilestoneItem[];
}

export default function JourneyTimeline({
  milestones = defaultMilestones,
}: JourneyTimelineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<string>(
    milestones[0]?.id || ""
  );

  useEffect(() => {
    if (!milestones || milestones.length === 0) return;
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Progress bar fill animation tracking scroll through section
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
          scaleY: 1,
          ease: "none",
        });
      }

      // Staggered reveal for milestones
      const items = gsap.utils.toArray<HTMLElement>(".milestone-row");
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveMilestone(milestones[index].id),
          onEnterBack: () => setActiveMilestone(milestones[index].id),
        });

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [milestones]);

  // Gracefully hide if empty
  if (!milestones || milestones.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-24 sm:py-36 border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-28">
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-semibold text-white/60 block mb-3">
            OUR JOURNEY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Milestones That{" "}
            <span className="text-gold font-editorial italic font-normal">
              Shaped Us
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track (Background) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-white/10 -translate-x-1/2" />

          {/* Active Gold Progress Fill Bar */}
          <div
            ref={progressBarRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gold -translate-x-1/2 origin-top scale-y-0 will-change-transform"
          />

          {/* Milestone Rows */}
          <div className="space-y-16 sm:space-y-24">
            {milestones.map((m, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeMilestone === m.id;

              return (
                <div
                  key={m.id}
                  className={`milestone-row relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Timeline Dot */}
                  <div
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 top-1.5 ${
                      isActive
                        ? "bg-gold border-gold scale-125 shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                        : "bg-black border-white/40"
                    }`}
                  />

                  {/* Content Card (Left or Right on desktop) */}
                  <div className="ml-14 md:ml-0 md:w-1/2 md:px-12">
                    <div
                      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "bg-zinc-950/80 border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.06)]"
                          : "bg-black/60 border-white/10"
                      } ${isEven ? "md:text-left" : "md:text-right"}`}
                    >
                      <span
                        className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight block mb-2 transition-colors duration-200 ${
                          isActive ? "text-gold" : "text-white/40"
                        }`}
                      >
                        {m.year}
                      </span>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                        {m.title}
                      </h3>

                      <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

