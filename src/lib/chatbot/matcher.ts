// ============================================================
// Joshy Travels — CHATBOT INTENT MATCHER
// Keyword scoring with category weighting & confidence threshold
// ============================================================

import { FAQEntry, MatchResult } from "./chatbot-types";
import { faqData } from "./faq-data";

/** Minimum confidence score to return a match (0-100) */
const CONFIDENCE_THRESHOLD = 25;

/** Bonus applied when the category of a keyword match aligns  */
const CATEGORY_BONUS = 10;

/** Penalty applied for very short queries that could match many things */
const SHORT_QUERY_PENALTY = 5;

/**
 * Normalize a string: lowercase, strip punctuation, collapse whitespace.
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")   // strip punctuation
    .replace(/\s+/g, " ")        // collapse whitespace
    .trim();
}

/**
 * Tokenize a normalized string into unique words, filtering stop words.
 */
const STOP_WORDS = new Set([
  "i", "me", "my", "we", "you", "your", "it", "is", "are", "am",
  "do", "does", "did", "can", "could", "would", "will", "should",
  "have", "has", "the", "a", "an", "to", "of", "in", "on", "for",
  "with", "at", "by", "from", "about", "and", "or", "but", "not",
  "what", "how", "which", "where", "when", "who", "why", "that",
  "this", "there", "please", "help", "want", "need", "get", "tell",
  "know", "just", "also", "any", "some", "so", "if", "be", "as"
]);

function tokenize(normalized: string): string[] {
  return normalized
    .split(" ")
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Score a single FAQ entry against the user's normalized input + tokens.
 */
function scoreEntry(faq: FAQEntry, normalized: string, tokens: string[]): number {
  let score = 0;

  for (const keyword of faq.keywords) {
    const normalizedKeyword = normalizeText(keyword);

    // Exact multi-word phrase match — highest value
    if (normalized.includes(normalizedKeyword)) {
      const keywordWordCount = normalizedKeyword.split(" ").length;
      // Longer phrases earn more (up to 40 pts)
      score += Math.min(10 + keywordWordCount * 8, 40);
      continue;
    }

    // Individual keyword tokens match
    const keywordTokens = tokenize(normalizedKeyword);
    let tokenMatchCount = 0;
    for (const kt of keywordTokens) {
      if (tokens.includes(kt)) {
        tokenMatchCount++;
        score += 8; // Per-token match
      }
      // Partial stem match (e.g. "customis" matches "customise"/"customise")
      else if (tokens.some((t) => t.startsWith(kt.slice(0, Math.min(kt.length - 1, 6))) && kt.length > 4)) {
        score += 4;
      }
    }

    // Bonus for matching most of a multi-word keyword phrase
    if (keywordTokens.length > 1 && tokenMatchCount >= keywordTokens.length - 1) {
      score += 6;
    }
  }

  // Short query penalty: single-token queries can produce noisy matches
  if (tokens.length === 1) {
    score = Math.max(0, score - SHORT_QUERY_PENALTY);
  }

  // Category bonus: check if any token aligns strongly with the faq's category
  const categoryWords: Record<string, string[]> = {
    visa: ["visa", "passport", "immigration"],
    flights: ["flight", "fly", "airline", "air", "ticket"],
    hotels: ["hotel", "accommodation", "stay", "resort", "room"],
    honeymoon: ["honeymoon", "romantic", "couple", "wedding"],
    family: ["family", "kids", "children", "parents"],
    group: ["group", "corporate", "team", "colleagues", "bulk"],
    domestic: ["domestic", "india", "kerala", "rajasthan", "goa"],
    international: ["international", "abroad", "foreign", "bali", "dubai", "switzerland"],
    contact: ["contact", "whatsapp", "call", "phone", "email"],
    booking: ["book", "booking", "reserve", "enquiry", "enquire", "pay", "cancel"],
  };
  const catWords = categoryWords[faq.category] ?? [];
  if (tokens.some((t) => catWords.includes(t))) {
    score += CATEGORY_BONUS;
  }

  return score;
}

/**
 * Find the best-matching FAQ entry for a given user input.
 * Returns a MatchResult with the FAQ and confidence score.
 */
export function matchFAQ(userInput: string): MatchResult {
  if (!userInput.trim()) {
    return { faq: null, score: 0, isFallback: true };
  }

  const normalized = normalizeText(userInput);
  const tokens = tokenize(normalized);

  if (tokens.length === 0) {
    return { faq: null, score: 0, isFallback: true };
  }

  let bestScore = 0;
  let bestFAQ: FAQEntry | null = null;

  for (const faq of faqData) {
    const score = scoreEntry(faq, normalized, tokens);
    if (score > bestScore) {
      bestScore = score;
      bestFAQ = faq;
    }
  }

  if (bestScore < CONFIDENCE_THRESHOLD || bestFAQ === null) {
    return { faq: null, score: bestScore, isFallback: true };
  }

  return { faq: bestFAQ, score: bestScore, isFallback: false };
}

/**
 * Find an FAQ by its display question text (for suggested question clicks).
 */
export function findFAQByQuestion(question: string): MatchResult {
  const normalized = normalizeText(question);
  const direct = faqData.find((f) => normalizeText(f.question) === normalized);
  if (direct) return { faq: direct, score: 100, isFallback: false };
  // Fall back to keyword matching
  return matchFAQ(question);
}

