import type { Metadata } from "next";
import { Syne, Manrope, Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jjtravels.com"),
  title: "JJ Travels | Curated Journeys & Luxury Travel Experiences",
  description:
    "Explore the world with JJ Travels. Bespoke luxury tour packages, flight ticketing, premium hotel booking, and visa assistance worldwide.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${cormorant.variable} bg-black text-white antialiased`}
    >
      <body className="min-h-screen bg-black text-white selection:bg-[#FFD700] selection:text-black font-body">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
