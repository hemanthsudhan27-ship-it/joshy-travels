"use client";

import React from "react";
import { X, Minus, Wifi } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatHeader({ onClose, onMinimize }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-black/80 backdrop-blur-sm flex-shrink-0">
      {/* Brand identity */}
      <div className="flex items-center gap-3">
        {/* Gold avatar / icon */}
        <div className="w-9 h-9 rounded-full bg-[#FFD700] flex items-center justify-center shadow-md flex-shrink-0">
          <span className="font-heading text-black font-extrabold text-sm leading-none">JT</span>
        </div>
        <div>
          <p className="text-white font-heading font-bold text-sm leading-tight">Joshy Travel Assistant</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/50 font-body">Online — ready to assist</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
          aria-label="Minimize chat window"
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat window"
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

