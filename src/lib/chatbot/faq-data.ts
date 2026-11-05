// ============================================================
// Joshy Travels — FAQ KNOWLEDGE BASE
// Rule-based, agency-verified. No invented prices or policies.
// ============================================================

import { FAQEntry } from "./chatbot-types";

export const WHATSAPP_NUMBER = "917907318843";

export const faqData: FAQEntry[] = [
  // ── GENERAL ─────────────────────────────────────────────
  {
    id: "what-is-jj-travels",
    category: "general",
    question: "What is Joshy Travels?",
    keywords: [
      "Joshy Travels", "who are you", "about jj", "about you", "what is jj",
      "tell me about", "what do you do", "travel agency", "who is jj",
      "company", "agency", "about the company"
    ],
    answer:
      "Joshy Travels is a premium travel agency specializing in bespoke domestic and international travel experiences. We curate luxury tour packages, handle flight bookings, premium hotel reservations, and provide comprehensive visa assistance — all tailored to your personal travel style.",
    followUps: [
      "What travel packages do you offer?",
      "What services do you provide?",
      "How can I contact Joshy Travels?",
    ],
  },
  {
    id: "services-overview",
    category: "general",
    question: "What services do you provide?",
    keywords: [
      "services", "what do you offer", "offerings", "what can you do",
      "help with", "provide", "available services", "what services",
      "service list", "type of services"
    ],
    answer:
      "Joshy Travels offers a comprehensive range of travel services:\n\n• **Tour Packages** — Domestic & International curated itineraries\n• **Flight Ticketing** — Domestic & international bookings\n• **Hotel Reservations** — Luxury & boutique stays\n• **Visa Assistance** — Documentation guidance & support\n• **Customized Trips** — Fully bespoke private itineraries\n• **Honeymoon Packages** — Romantic getaways designed for couples\n• **Family Holidays** — Kid-friendly, all-inclusive family trips\n• **Group Tours** — Coordinated travel for groups of all sizes",
    followUps: [
      "Do you arrange international trips?",
      "Can I customize my itinerary?",
      "Do you provide visa assistance?",
    ],
  },
  {
    id: "how-to-book",
    category: "booking",
    question: "How can I book a trip with Joshy Travels?",
    keywords: [
      "how to book", "book a trip", "booking process", "how do i book",
      "make a booking", "reserve", "get started", "begin booking",
      "book now", "place a booking", "booking enquiry", "steps to book"
    ],
    answer:
      "Booking with Joshy Travels is simple! You can:\n\n1. **WhatsApp us directly** — Send a message describing your travel plans and preferred dates\n2. **Use the Enquire button** on any package page to submit a quick enquiry form\n3. **Visit our Contact page** for all contact options\n\nOur travel specialists will respond promptly to design your perfect itinerary.",
    followUps: [
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── DOMESTIC TRAVEL ──────────────────────────────────────
  {
    id: "domestic-tours",
    category: "domestic",
    question: "Do you offer domestic tour packages?",
    keywords: [
      "domestic", "india", "indian tour", "within india", "local tour",
      "domestic tour", "india travel", "domestic package", "inside india",
      "india trip", "kerala", "rajasthan", "goa", "himalayas", "andaman"
    ],
    answer:
      "Yes! Joshy Travels offers curated domestic tour packages across India's most iconic destinations — from the backwaters of Kerala and the golden deserts of Rajasthan, to the beaches of Goa, the temples of Tamil Nadu, and the majestic Himalayas. Each itinerary is crafted to reflect the region's authentic culture and natural beauty.\n\nContact our team to discuss available domestic packages and customise an itinerary to your interests.",
    followUps: [
      "Can I customize my itinerary?",
      "Do you offer family holiday packages?",
      "How can I book a trip?",
    ],
  },

  // ── INTERNATIONAL TRAVEL ─────────────────────────────────
  {
    id: "international-tours",
    category: "international",
    question: "Do you arrange international trips?",
    keywords: [
      "international", "abroad", "overseas", "foreign", "outside india",
      "international tour", "foreign trip", "international travel",
      "international package", "bali", "switzerland", "dubai", "europe",
      "maldives", "singapore", "thailand", "usa", "uk", "italy", "france",
      "world tour", "global"
    ],
    answer:
      "Absolutely! International travel is our speciality. Joshy Travels curates premium packages to some of the world's most coveted destinations, including:\n\n• **Asia** — Bali, Singapore, Thailand, Sri Lanka, Maldives\n• **Middle East** — Dubai, Abu Dhabi\n• **Europe** — Switzerland, Italy (Amalfi Coast), France, UK\n• **And many more** — based on your dream destination\n\nEach international package includes carefully vetted accommodation, transfers, and guided experiences.",
    followUps: [
      "Do you provide visa assistance?",
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
    ],
  },
  {
    id: "packages-overview",
    category: "international",
    question: "What travel packages do you offer?",
    keywords: [
      "packages", "tour packages", "what packages", "available packages",
      "travel packages", "package list", "package details", "show packages",
      "package options", "which packages", "what trips"
    ],
    answer:
      "Joshy Travels offers a diverse range of thoughtfully curated travel packages:\n\n• **Bali Escape** — Lush tropical paradise, temples & rice terraces\n• **Switzerland Explorer** — Alpine grandeur, Matterhorn & pristine lakes\n• **Dubai Getaway** — Iconic skyline, desert safaris & luxury shopping\n• **Honeymoon Specials** — Romantic escapes for couples\n• **Family Holidays** — Fun-filled, safe & memorable family adventures\n• **Group Tours** — Shared experiences for friends or colleagues\n• **Custom Itineraries** — Fully personalised to your wishes\n\nVisit the Packages page to explore full itineraries, or enquire to discuss a bespoke trip.",
    followUps: [
      "Do you arrange international trips?",
      "Can I customize my itinerary?",
      "Do you offer honeymoon packages?",
    ],
  },

  // ── HONEYMOON ────────────────────────────────────────────
  {
    id: "honeymoon-packages",
    category: "honeymoon",
    question: "Do you offer honeymoon packages?",
    keywords: [
      "honeymoon", "honeymoon package", "couples trip", "romantic trip",
      "newly married", "wedding trip", "anniversary", "romantic getaway",
      "couples travel", "newly wed", "romance", "couple package"
    ],
    answer:
      "Yes, Joshy Travels specialises in creating unforgettable honeymoon experiences! Our romantic packages are crafted with privacy, luxury, and intimate moments in mind — from overwater bungalows in the Maldives and candlelit dinners in Santorini, to enchanting Bali temples and alpine retreats in Switzerland.\n\nEvery honeymoon package can be personalised with special touches — floral arrangements, private dinners, couples spa treatments, and more. Contact us to design your dream honeymoon.",
    followUps: [
      "Can I customize my itinerary?",
      "Do you arrange international trips?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── FAMILY HOLIDAYS ──────────────────────────────────────
  {
    id: "family-holidays",
    category: "family",
    question: "Do you have family holiday packages?",
    keywords: [
      "family", "family trip", "family holiday", "family package",
      "children", "kids", "with kids", "family travel", "family vacation",
      "parents", "grandparents", "family friendly", "school holiday"
    ],
    answer:
      "Absolutely! Joshy Travels designs family-friendly holiday packages that keep every member of the family — from little ones to grandparents — happy and comfortable. Our family packages feature:\n\n• **Kid-friendly activities** at every destination\n• **Spacious family accommodation** — suites, villas, or connecting rooms\n• **Flexible itineraries** that balance adventure and relaxation\n• **Safe, guided group tours** in each destination\n• **Practical support** — dietary needs, stroller-friendly venues, medical kit recommendations\n\nGet in touch to discuss your family's ideal holiday and we'll tailor a perfect itinerary.",
    followUps: [
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
      "How can I book a trip?",
    ],
  },

  // ── GROUP TOURS ──────────────────────────────────────────
  {
    id: "group-tours",
    category: "group",
    question: "Do you organise group tours?",
    keywords: [
      "group tour", "group travel", "group trip", "large group",
      "corporate trip", "office trip", "friends group", "team trip",
      "group booking", "bulk booking", "group package", "group discount",
      "group holiday", "colleagues"
    ],
    answer:
      "Yes! Joshy Travels has extensive experience coordinating group travel for friends, families, corporate teams, and social groups. Our group tour services include:\n\n• **Coordinated logistics** — unified bookings for flights, hotels & transport\n• **Group rates** — competitive pricing for larger groups\n• **Dedicated trip coordinator** assigned to your group\n• **Shared & private group itineraries** to suit all interests\n• **Corporate retreats & incentive trips** are also welcome\n\nFor group enquiries, please contact us directly on WhatsApp for a customised group quote.",
    followUps: [
      "Can I customize my itinerary?",
      "What travel packages do you offer?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── CUSTOMIZED TRAVEL ────────────────────────────────────
  {
    id: "custom-itinerary",
    category: "customized",
    question: "Can I customize my itinerary?",
    keywords: [
      "customize", "custom", "personalise", "bespoke", "tailor",
      "own itinerary", "specific needs", "special request", "custom trip",
      "tailored", "personalised", "flexible", "modify", "my own plan",
      "build my own", "custom package", "customised"
    ],
    answer:
      "Absolutely — customisation is at the heart of what Joshy Travels does best. Every detail of your trip can be personalised:\n\n• **Destination & route** of your choice\n• **Travel dates** that suit your schedule\n• **Accommodation style** — budget, boutique, or luxury\n• **Activities & experiences** — adventure, cultural, relaxation, or a blend\n• **Group composition** — solo, couple, family, or friends\n• **Budget range** — we work to deliver the best value for your budget\n\nSimply reach out on WhatsApp or via our Contact page with your ideas, and our travel experts will design a fully bespoke itinerary for you.",
    followUps: [
      "How can I book a trip?",
      "Do you provide visa assistance?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── FLIGHT BOOKING ───────────────────────────────────────
  {
    id: "flight-booking",
    category: "flights",
    question: "Do you book flight tickets?",
    keywords: [
      "flight", "flights", "flight ticket", "air ticket", "plane ticket",
      "flight booking", "air travel", "airline", "book flight", "fly",
      "air fare", "airfare", "flight price", "cheapest flight", "ticket"
    ],
    answer:
      "Yes, Joshy Travels provides flight ticketing services for both domestic and international routes. We help you find suitable flight options, assist with the booking process, and ensure your travel connections are seamlessly coordinated with your overall itinerary.\n\nFor flight-specific enquiries, please contact us directly on WhatsApp with your travel dates, origin, and destination.",
    followUps: [
      "Do you book hotel stays?",
      "Can I customize my itinerary?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── HOTEL RESERVATIONS ───────────────────────────────────
  {
    id: "hotel-booking",
    category: "hotels",
    question: "Do you handle hotel bookings?",
    keywords: [
      "hotel", "hotel booking", "accommodation", "stay", "resort",
      "villa", "lodge", "where to stay", "hotel reservation", "room",
      "luxury hotel", "boutique hotel", "book hotel", "hotel options"
    ],
    answer:
      "Absolutely! Joshy Travels arranges premium hotel and resort bookings at a wide range of properties — from charming boutique stays to internationally acclaimed luxury resorts. Our hotel partners offer verified quality, ensuring comfort and authenticity at your destination.\n\nAll hotels included in our packages are carefully vetted by our team. If you have a specific property in mind, let us know and we'll work to include it in your itinerary.",
    followUps: [
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
      "Do you book flight tickets?",
    ],
  },

  // ── VISA ASSISTANCE ──────────────────────────────────────
  {
    id: "visa-assistance",
    category: "visa",
    question: "Do you provide visa assistance?",
    keywords: [
      "visa", "visa assistance", "visa support", "visa help",
      "travel visa", "visa documents", "visa application", "apply visa",
      "visa process", "tourist visa", "visa requirement", "visa guidance",
      "visa fees", "visa approval", "get visa", "need visa"
    ],
    answer:
      "Yes, Joshy Travels provides visa assistance as part of our travel services. We guide you through the documentation requirements, help you prepare your application materials, and advise on the process for your chosen destination.\n\n**Please note:** Visa approval decisions are made solely by the respective country's embassy or consulate. Joshy Travels facilitates the process but cannot guarantee visa issuance.\n\nContact us early in your planning process so we can factor visa timelines into your itinerary.",
    followUps: [
      "Do you arrange international trips?",
      "Can I customize my itinerary?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },
  {
    id: "visa-guarantee",
    category: "visa",
    question: "Can you guarantee my visa will be approved?",
    keywords: [
      "guarantee visa", "visa guaranteed", "will i get visa",
      "visa rejection", "visa denied", "visa success", "visa sure",
      "visa approved", "confirm visa"
    ],
    answer:
      "No — Joshy Travels cannot guarantee visa approval. All visa decisions are made exclusively by the respective country's embassy or immigration authorities, based on the applicant's personal circumstances and documentation.\n\nWhat we can do is help you prepare a strong, complete application with all required documents, and advise you on the best practices for your destination. We always recommend applying well in advance of your planned travel dates.",
    followUps: [
      "Do you provide visa assistance?",
      "How can I contact Joshy Travels?",
      "Do you arrange international trips?",
    ],
  },

  // ── BOOKING & ENQUIRIES ──────────────────────────────────
  {
    id: "enquiry-process",
    category: "booking",
    question: "How do I make an enquiry?",
    keywords: [
      "enquiry", "enquire", "inquiry", "how to enquire", "submit enquiry",
      "make enquiry", "ask question", "get quote", "quote", "price enquiry",
      "request quote", "get information", "get info", "find out more"
    ],
    answer:
      "Making an enquiry with Joshy Travels is quick and easy:\n\n• **WhatsApp** — Message us directly for the fastest response\n• **Enquiry Form** — Click the \"Enquire\" button on any package page to submit a form\n• **Contact Page** — Visit our Contact page for all options\n\nPlease share your destination preference, travel dates, and group size, and our specialists will get back to you promptly.",
    followUps: [
      "How can I contact Joshy Travels?",
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
    ],
    whatsappRedirect: true,
  },
  {
    id: "cancellation-policy",
    category: "booking",
    question: "What is your cancellation policy?",
    keywords: [
      "cancel", "cancellation", "refund", "money back", "cancel booking",
      "cancellation policy", "refund policy", "can i cancel", "cancel trip"
    ],
    answer:
      "Cancellation and refund terms vary depending on the specific package, airlines, and hotel partners involved. For accurate details about cancellation terms applicable to your booking, please contact our team directly.\n\nWe strongly recommend discussing cancellation terms before confirming any booking, and considering travel insurance for added peace of mind.",
    followUps: [
      "How can I contact Joshy Travels?",
      "How can I book a trip?",
      "Do you provide visa assistance?",
    ],
    whatsappRedirect: true,
  },
  {
    id: "payment-methods",
    category: "booking",
    question: "What payment methods do you accept?",
    keywords: [
      "payment", "pay", "payment method", "how to pay", "bank transfer",
      "upi", "cash", "card", "credit card", "debit card", "online payment",
      "payment options", "gpay", "phonepay"
    ],
    answer:
      "For specific payment options and terms applicable to your booking, please contact our team directly on WhatsApp. Our specialists will walk you through the available payment options for your package.",
    followUps: [
      "How can I book a trip?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── CONTACT ──────────────────────────────────────────────
  {
    id: "contact-info",
    category: "contact",
    question: "How can I contact Joshy Travels?",
    keywords: [
      "contact", "reach you", "get in touch", "contact details",
      "how to contact", "phone number", "email", "whatsapp number",
      "call", "message", "speak to someone", "talk to", "support",
      "customer service", "help", "office"
    ],
    answer:
      "You can reach Joshy Travels through:\n\n• **WhatsApp** — Send us a message for the fastest response (button below)\n• **Contact Page** — Visit our Contact Us page for all details\n• **Enquiry Form** — Submit a request through any package page\n\nOur team is ready to help with any travel question you have!",
    followUps: [
      "How can I book a trip?",
      "What travel packages do you offer?",
      "What services do you provide?",
    ],
    whatsappRedirect: true,
  },
  {
    id: "whatsapp-contact",
    category: "contact",
    question: "Can I message Joshy Travels on WhatsApp?",
    keywords: [
      "whatsapp", "whatsapp message", "message on whatsapp",
      "chat on whatsapp", "wa", "wa.me", "whatsapp chat"
    ],
    answer:
      "Yes! WhatsApp is our preferred and fastest channel of communication. Click the \"Chat on WhatsApp\" button below to start a conversation with our travel specialists right away.",
    followUps: [
      "How can I book a trip?",
      "What travel packages do you offer?",
    ],
    whatsappRedirect: true,
  },

  // ── PRICING ──────────────────────────────────────────────
  {
    id: "pricing",
    category: "booking",
    question: "How much do your packages cost?",
    keywords: [
      "price", "cost", "how much", "pricing", "rates", "charges",
      "package price", "how much does it cost", "affordable", "cheap",
      "expensive", "budget", "pricing details", "cost of", "fee"
    ],
    answer:
      "Package pricing at Joshy Travels varies based on destination, travel dates, group size, accommodation preferences, and inclusions. We cater to a range of budgets and always aim to deliver exceptional value.\n\nFor a personalised quote, please contact our team on WhatsApp with your travel requirements — destination, dates, and group size — and we'll prepare a tailored proposal for you.",
    followUps: [
      "What travel packages do you offer?",
      "Can I customize my itinerary?",
      "How can I contact Joshy Travels?",
    ],
    whatsappRedirect: true,
  },

  // ── TRAVEL INSURANCE ─────────────────────────────────────
  {
    id: "travel-insurance",
    category: "general",
    question: "Do you provide travel insurance?",
    keywords: [
      "insurance", "travel insurance", "trip insurance", "coverage",
      "medical cover", "insured", "insurance policy", "protect trip"
    ],
    answer:
      "Joshy Travels recommends that all travellers obtain comprehensive travel insurance before departure. While we can advise you on what to look for in a policy, we strongly suggest consulting a registered insurance provider for travel coverage options suitable for your destination and trip type.\n\nContact our team for general guidance on what travel insurance typically covers for international journeys.",
    followUps: [
      "Do you provide visa assistance?",
      "How can I contact Joshy Travels?",
      "How can I book a trip?",
    ],
  },
];

/** Suggested questions shown at the start of the conversation */
export const INITIAL_SUGGESTIONS: string[] = [
  "What travel packages do you offer?",
  "Do you arrange international trips?",
  "Can I customize my itinerary?",
  "Do you provide visa assistance?",
  "How can I book a trip?",
];

