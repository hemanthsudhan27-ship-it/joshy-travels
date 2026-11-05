// ============================================================
// JJ TRAVELS — CHATBOT TYPE DEFINITIONS
// ============================================================

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  followUps?: string[];
  isTyping?: boolean;
}

export interface FAQEntry {
  id: string;
  category: FAQCategory;
  question: string;
  keywords: string[];
  answer: string;
  followUps: string[];
  whatsappRedirect?: boolean;
}

export type FAQCategory =
  | "general"
  | "domestic"
  | "international"
  | "honeymoon"
  | "family"
  | "group"
  | "customized"
  | "flights"
  | "hotels"
  | "visa"
  | "booking"
  | "contact";

export interface MatchResult {
  faq: FAQEntry | null;
  score: number;
  isFallback: boolean;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
}
