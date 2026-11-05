"use client";

import React, { useMemo } from "react";
import { MessageSquare, ExternalLink } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/lib/chatbot/chatbot-types";
import { parseBoldMarkdown, buildChatbotWhatsAppUrl, formatTime } from "@/lib/chatbot/chatbot-utils";

interface ChatMessageProps {
  message: ChatMessageType;
  onSuggestionClick: (q: string) => void;
}

/** Render one line of text, honoring **bold** markdown segments */
function RichLine({ line }: { line: string }) {
  const segments = parseBoldMarkdown(line);
  return (
    <>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-bold">
            {seg.text}
          </strong>
        ) : (
          <React.Fragment key={i}>{seg.text}</React.Fragment>
        )
      )}
    </>
  );
}

export default function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";
  const lines = useMemo(() => message.text.split("\n"), [message.text]);

  return (
    <div
      className={`flex w-full mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {/* Avatar — assistant only */}
      {isAssistant && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FFD700] flex items-center justify-center mr-2 mt-0.5 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
        </div>
      )}

      <div className={`flex flex-col max-w-[82%] ${isAssistant ? "items-start" : "items-end"}`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed font-body shadow-sm ${
            isAssistant
              ? "bg-white/[0.07] text-white border border-white/10 rounded-tl-sm"
              : "bg-[#FFD700] text-black font-semibold rounded-tr-sm"
          }`}
        >
          {message.isTyping ? (
            /* Typing dots */
            <div className="flex items-center gap-1 py-0.5 px-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {lines.map((line, i) => (
                <p key={i} className={line === "" ? "h-2" : ""}>
                  {line !== "" && <RichLine line={line} />}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {!message.isTyping && (
          <span className="text-[10px] text-white/30 mt-1 px-1">
            {formatTime(message.timestamp)}
          </span>
        )}

        {/* WhatsApp CTA — assistant messages that have whatsapp redirect */}
        {isAssistant && !message.isTyping && message.followUps === undefined && (
          // Minimal inline — no followups on this msg
          null
        )}

        {/* Follow-up suggestions */}
        {isAssistant && !message.isTyping && message.followUps && message.followUps.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-2 w-full">
            {message.followUps.map((q) => (
              <button
                key={q}
                onClick={() => onSuggestionClick(q)}
                className="text-left text-xs px-3 py-2 rounded-xl border border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/15 hover:border-[#FFD700]/60 transition-all duration-200 font-body font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Standalone WhatsApp CTA button used inside the chat window */
export function WhatsAppCTA({ message }: { message?: string }) {
  return (
    <a
      href={buildChatbotWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors duration-200 shadow-md"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Chat on WhatsApp
      <ExternalLink className="w-3 h-3 opacity-70" />
    </a>
  );
}
