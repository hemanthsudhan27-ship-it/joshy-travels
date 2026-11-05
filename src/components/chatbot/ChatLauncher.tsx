"use client";

import React from "react";
import { MessageSquare, X } from "lucide-react";

interface ChatLauncherProps {
  isOpen: boolean;
  onClick: () => void;
  unread?: boolean;
}

export default function ChatLauncher({ isOpen, onClick, unread = false }: ChatLauncherProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close Joshy Travel Assistant" : "Open Joshy Travel Assistant"}
      title={isOpen ? "Close chat" : "Chat with Joshy Travels"}
      className="
        relative w-14 h-14
        rounded-full
        bg-[#FFD700]
        flex items-center justify-center
        shadow-[0_4px_24px_rgba(255,215,0,0.4)]
        hover:shadow-[0_6px_32px_rgba(255,215,0,0.55)]
        hover:scale-105
        active:scale-95
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-black
      "
    >
      {/* Icon — toggles between chat and X */}
      <div className="relative w-6 h-6">
        <MessageSquare
          className={`absolute inset-0 w-6 h-6 text-black transition-all duration-300 ${
            isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
          strokeWidth={2.5}
        />
        <X
          className={`absolute inset-0 w-6 h-6 text-black transition-all duration-300 ${
            isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
          strokeWidth={2.5}
        />
      </div>

      {/* Unread dot indicator */}
      {unread && !isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-black rounded-full animate-pulse" />
      )}
    </button>
  );
}

