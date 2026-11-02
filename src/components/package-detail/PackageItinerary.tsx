"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Bed, Utensils, Sun, Sunset, Moon } from "lucide-react";
import { ItineraryDay } from "@/data/packagesData";

interface PackageItineraryProps {
  itinerary: ItineraryDay[];
}

export default function PackageItinerary({ itinerary }: PackageItineraryProps) {
  // Set day 1 open by default
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true });

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    itinerary.forEach((d) => (all[d.day] = true));
    setOpenDays(all);
  };

  const collapseAll = () => {
    setOpenDays({});
  };

  const allExpanded = itinerary.every((d) => openDays[d.day]);

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10">
      {/* Header with expand/collapse control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              Day-By-Day Schedule
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Curated Itinerary
          </h2>
        </div>

        <button
          type="button"
          onClick={allExpanded ? collapseAll : expandAll}
          className="text-xs uppercase tracking-wider text-gold hover:text-white transition-colors self-start sm:self-auto font-medium"
        >
          {allExpanded ? "Collapse All Days" : "Expand All Days"}
        </button>
      </div>

      {/* Days Timeline Accordion */}
      <div className="space-y-4">
        {itinerary.map((dayItem) => {
          const isOpen = !!openDays[dayItem.day];
          const formattedDay = dayItem.day < 10 ? `0${dayItem.day}` : `${dayItem.day}`;

          return (
            <div
              key={dayItem.day}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-white/[0.03] border-gold/40 shadow-lg shadow-black/40"
                  : "bg-white/[0.01] border-white/10 hover:border-white/20"
              }`}
            >
              {/* Day Header Trigger */}
              <button
                type="button"
                onClick={() => toggleDay(dayItem.day)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-gold tracking-tight shrink-0">
                    Day {formattedDay}
                  </span>
                  <div className="h-6 w-px bg-white/15 hidden sm:block shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-white group-hover:text-gold transition-colors">
                      {dayItem.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-white/50">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{dayItem.location}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/60 group-hover:border-gold group-hover:text-gold transition-transform duration-300 ${
                    isOpen ? "rotate-180 border-gold text-gold" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Day Details Body */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 text-sm animate-fadeIn">
                  <p className="text-white/80 leading-relaxed font-light mb-6">
                    {dayItem.description}
                  </p>

                  {/* Morning, Afternoon, Evening breakdown */}
                  {(dayItem.morning || dayItem.afternoon || dayItem.evening) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 pt-2">
                      {dayItem.morning && (
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-1.5">
                            <Sun className="w-3.5 h-3.5" />
                            <span>Morning</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {dayItem.morning}
                          </p>
                        </div>
                      )}

                      {dayItem.afternoon && (
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-1.5">
                            <Sunset className="w-3.5 h-3.5" />
                            <span>Afternoon</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {dayItem.afternoon}
                          </p>
                        </div>
                      )}

                      {dayItem.evening && (
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-1.5">
                            <Moon className="w-3.5 h-3.5" />
                            <span>Evening</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {dayItem.evening}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Stay & Meal tags */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 text-xs text-white/60">
                    {dayItem.stay && (
                      <div className="flex items-center gap-2">
                        <Bed className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span><strong className="text-white font-medium">Stay:</strong> {dayItem.stay}</span>
                      </div>
                    )}
                    {dayItem.meals && (
                      <div className="flex items-center gap-2">
                        <Utensils className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span><strong className="text-white font-medium">Meals:</strong> {dayItem.meals}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

