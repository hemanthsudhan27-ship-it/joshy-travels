"use client";

import React from "react";
import { INITIAL_SUGGESTIONS } from "@/lib/chatbot/faq-data";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pb-3 flex-shrink-0">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-body font-semibold mb-2">
        Suggested Questions
      </p>
      <div className="flex flex-col gap-1.5">
        {INITIAL_SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="text-left text-xs px-3.5 py-2.5 rounded-xl border border-white/10 text-white/70 bg-white/[0.04] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/40 hover:text-white transition-all duration-200 font-body"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

