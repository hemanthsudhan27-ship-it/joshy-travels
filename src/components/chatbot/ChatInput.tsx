"use client";

import React, { useRef, useEffect } from "react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 96)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-3 py-3 border-t border-white/10 bg-black/60 backdrop-blur-sm flex-shrink-0">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask me anything about travel..."
        rows={1}
        className="flex-1 resize-none bg-white/[0.06] border border-white/10 text-white placeholder-white/30 text-sm rounded-xl px-3.5 py-2.5 font-body focus:outline-none focus:border-[#FFD700]/40 focus:bg-white/10 transition-all duration-200 disabled:opacity-50 leading-relaxed"
        aria-label="Type your travel question"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="w-9 h-9 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 hover:bg-[#e6c200] active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
      >
        {/* Send arrow icon */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-none stroke-current" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
