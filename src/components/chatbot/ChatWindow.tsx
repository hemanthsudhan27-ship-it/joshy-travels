"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage, { WhatsAppCTA } from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import { ChatMessage as ChatMessageType } from "@/lib/chatbot/chatbot-types";
import { matchFAQ, findFAQByQuestion } from "@/lib/chatbot/matcher";
import {
  generateMessageId,
  typingDelay,
  FALLBACK_RESPONSE,
  GREETING_MESSAGE,
} from "@/lib/chatbot/chatbot-utils";
import { useScrollLock } from "@/lib/scroll-lock";

interface ChatWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWindow({ onClose, onMinimize }: ChatWindowProps) {
  // Lock background website scrolling while chatbot is open; restore on close
  useScrollLock(true, "chatbot");

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [lastAnswerHadWhatsapp, setLastAnswerHadWhatsapp] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const initialized = useRef(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Track if user is scrolled near bottom
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceToBottom <= 80;
  }, []);

  // Scroll to bottom (only when user is near bottom, or when forced by user action)
  const scrollToBottom = useCallback((force = false) => {
    if (force || isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    const isUserAction = lastMsg?.role === "user";
    scrollToBottom(isUserAction);
  }, [messages, isTyping, scrollToBottom]);

  // Send initial greeting once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const greeting: ChatMessageType = {
      id: generateMessageId(),
      role: "assistant",
      text: GREETING_MESSAGE,
      timestamp: new Date(),
      followUps: [],
    };
    setMessages([greeting]);
  }, []);

  /** Append a user message and trigger an assistant reply */
  const handleSend = useCallback(
    (text: string) => {
      const userText = text.trim();
      if (!userText || isTyping) return;

      setShowSuggestions(false);
      setLastAnswerHadWhatsapp(false);
      setInputValue("");

      // Add user message
      const userMsg: ChatMessageType = {
        id: generateMessageId(),
        role: "user",
        text: userText,
        timestamp: new Date(),
      };

      // Add typing indicator
      const typingMsg: ChatMessageType = {
        id: generateMessageId(),
        role: "assistant",
        text: "",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, userMsg, typingMsg]);
      setIsTyping(true);

      // Match FAQ
      const result = matchFAQ(userText);
      const delay = result.isFallback ? 900 : typingDelay(result.faq?.answer ?? "");

      setTimeout(() => {
        setMessages((prev) => {
          // Remove typing indicator
          const withoutTyping = prev.filter((m) => !m.isTyping);

          const assistantMsg: ChatMessageType = {
            id: generateMessageId(),
            role: "assistant",
            text: result.isFallback ? FALLBACK_RESPONSE : result.faq!.answer,
            timestamp: new Date(),
            followUps: result.isFallback ? [] : (result.faq?.followUps ?? []),
          };
          return [...withoutTyping, assistantMsg];
        });

        setIsTyping(false);
        setLastAnswerHadWhatsapp(
          result.isFallback || (result.faq?.whatsappRedirect ?? false)
        );
      }, delay);
    },
    [isTyping]
  );

  const handleSuggestionClick = useCallback(
    (question: string) => {
      if (isTyping) return;
      setShowSuggestions(false);
      setLastAnswerHadWhatsapp(false);

      const userMsg: ChatMessageType = {
        id: generateMessageId(),
        role: "user",
        text: question,
        timestamp: new Date(),
      };
      const typingMsg: ChatMessageType = {
        id: generateMessageId(),
        role: "assistant",
        text: "",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, userMsg, typingMsg]);
      setIsTyping(true);

      const result = findFAQByQuestion(question);
      const delay = typingDelay(result.faq?.answer ?? FALLBACK_RESPONSE);

      setTimeout(() => {
        setMessages((prev) => {
          const withoutTyping = prev.filter((m) => !m.isTyping);
          const assistantMsg: ChatMessageType = {
            id: generateMessageId(),
            role: "assistant",
            text: result.isFallback ? FALLBACK_RESPONSE : result.faq!.answer,
            timestamp: new Date(),
            followUps: result.isFallback ? [] : (result.faq?.followUps ?? []),
          };
          return [...withoutTyping, assistantMsg];
        });
        setIsTyping(false);
        setLastAnswerHadWhatsapp(
          result.isFallback || (result.faq?.whatsappRedirect ?? false)
        );
      }, delay);
    },
    [isTyping]
  );

  return (
    <div
      className="
        fixed bottom-24 right-4 z-[9998]
        w-[calc(100vw-2rem)] max-w-sm
        sm:right-6 sm:w-96
        h-[min(580px,calc(100dvh-7rem))]
        max-h-[calc(100dvh-7rem)]
        flex flex-col
        bg-black/95 backdrop-blur-xl
        border border-white/10
        rounded-2xl shadow-2xl
        animate-in fade-in slide-in-from-bottom-4 duration-300
        overflow-hidden
      "
      role="dialog"
      aria-label="Joshy Travel Assistant Chat"
      aria-modal="true"
      data-lenis-prevent="true"
    >
      {/* 1. CHATBOT HEADER — Fixed within chatbot layout */}
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />

      {/* 2. CHATBOT MESSAGE AREA — Independent scroll container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        data-lenis-prevent="true"
        className="
          flex-1 min-h-0
          overflow-y-auto overflow-x-hidden
          overscroll-contain
          px-3 pt-4 pb-2
          scroll-smooth
        "
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
        }}
        tabIndex={0}
        aria-label="Conversation history"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSuggestionClick={handleSuggestionClick}
          />
        ))}

        {/* WhatsApp CTA shown after relevant answers */}
        {lastAnswerHadWhatsapp && !isTyping && (
          <div className="flex justify-start mb-3 pl-9 animate-in fade-in duration-300">
            <WhatsAppCTA />
          </div>
        )}

        {/* Bottom sentinel for scroll calculations */}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions (shown until first user interaction) */}
      {showSuggestions && !isTyping && (
        <div
          data-lenis-prevent="true"
          className="flex-shrink-0 border-t border-white/5 pt-2 max-h-36 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <SuggestedQuestions onSelect={handleSuggestionClick} />
        </div>
      )}

      {/* 3. CHATBOT INPUT AREA — Fixed at the bottom of chatbot container */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={() => handleSend(inputValue)}
        disabled={isTyping}
      />
    </div>
  );
}
