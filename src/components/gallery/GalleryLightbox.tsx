"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { GalleryItem } from "@/data/galleryData";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = currentIndex !== null;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Joshy Travels! I saw the photo "${currentItem.title}" in your gallery (${currentItem.location}) and would like to enquire about planning a journey here.`
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white animate-fadeIn"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-gold text-sm tracking-widest">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <span className="text-white/30 text-xs">·</span>
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{currentItem.location}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-gold transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-4 overflow-hidden">
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Photograph */}
        <div className="relative max-h-[70vh] sm:max-h-[75vh] w-full max-w-5xl h-full flex items-center justify-center">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Information & Action Bar */}
      <div className="px-6 py-5 border-t border-white/10 bg-black/80 backdrop-blur-md z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
              {currentItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              {currentItem.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentItem.packageSlug && (
              <Link
                href={`/packages/${currentItem.packageSlug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                <span>View Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-black text-xs font-bold hover:bg-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enquire About This</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

