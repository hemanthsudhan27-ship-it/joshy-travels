// ============================================================
// Joshy Travels — CHATBOT UTILITY HELPERS
// ============================================================

import { WHATSAPP_NUMBER } from "./faq-data";

/**
 * Generate a unique message ID.
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Build a WhatsApp click-to-chat URL with a prefilled message.
 */
export function buildChatbotWhatsAppUrl(customMessage?: string): string {
  const message =
    customMessage ??
    "Hello Joshy Travels, I need assistance with a travel enquiry.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Simulate a natural typing delay (ms) based on response length.
 */
export function typingDelay(responseText: string): number {
  const wordCount = responseText.split(" ").length;
  // 40–1200ms range
  return Math.min(400 + wordCount * 15, 1200);
}

/**
 * Format a Date as a friendly time string (e.g. "2:34 PM").
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Convert assistant answer text with **bold** markdown to React-renderable
 * segments. Returns an array of { text, bold } segments.
 */
export function parseBoldMarkdown(
  text: string
): Array<{ text: string; bold: boolean }> {
  const segments: Array<{ text: string; bold: boolean }> = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }

  return segments;
}

/** Fallback message when no FAQ match is found */
export const FALLBACK_RESPONSE =
  "I'm sorry, I couldn't find a reliable answer to that question. Our travel specialists can help you directly — please reach out on WhatsApp or visit our Contact page.";

/** Initial greeting message */
export const GREETING_MESSAGE =
  "Hello! 👋 Welcome to Joshy Travels. I'm your travel assistant, here to help with questions about our packages, services, visa assistance, and more.\n\nWhat would you like to know?";

