"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import ChatLauncher from "./ChatLauncher";

// Lazy-load chat window to avoid blocking initial page render
const ChatWindow = dynamic(() => import("./ChatWindow"), {
  ssr: false,
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
    setIsOpen(false);
  }, []);

  const handleLauncherClick = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <>
      {/* Floating Launcher — fixed bottom-right */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[9999]">
        {/* Greeting tooltip — shown before first open */}
        {!isOpen && !isMinimized && (
          <div
            className="
              absolute bottom-16 right-0
              bg-black border border-white/10
              text-white text-xs font-body font-medium
              px-3 py-2 rounded-xl
              shadow-xl whitespace-nowrap
              animate-in fade-in slide-in-from-bottom-2 duration-500
              pointer-events-none
            "
            role="tooltip"
          >
            👋 Need travel help?
            {/* Arrow */}
            <span className="absolute -bottom-1.5 right-5 w-3 h-3 bg-black border-r border-b border-white/10 rotate-45 block" />
          </div>
        )}

        <ChatLauncher isOpen={isOpen} onClick={handleLauncherClick} />
      </div>

      {/* Chat Window — rendered when open (lazy) */}
      {isOpen && (
        <ChatWindow onClose={handleClose} onMinimize={handleMinimize} />
      )}
    </>
  );
}
