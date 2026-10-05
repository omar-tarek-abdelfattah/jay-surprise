"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Share2,
  Film,
  Maximize2,
} from "lucide-react";

export interface MediaItem {
  id: string;
  type: "photo" | "video";
  title: string;
  subtitle?: string;
  date: string;
  location: string;
  src: string;
  caption: string;
  isPanorama?: boolean;
}

interface MediaLightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation (Arrow keys + Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  if (!currentItem) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl select-none animate-fadeIn p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Lightbox Modal Shell */}
      <div
        className="relative w-full max-w-4xl h-[86vh] sm:h-[88vh] max-h-[900px] flex flex-col bg-[#161312] text-[#F5EFEB] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_25px_90px_rgba(0,0,0,0.85)] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Navigation Bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E8A598] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-white/70">
              {currentIndex + 1} of {items.length}
            </span>
            {currentItem.type === "video" && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-[#7EA0B7] font-semibold flex items-center gap-1">
                <Film className="w-3 h-3" /> Video
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all active:scale-95 ml-1"
              aria-label="Close photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Media Display Viewport */}
        <div className="relative flex-1 min-h-0 w-full bg-black flex items-center justify-center overflow-hidden group">
          {currentItem.type === "photo" ? (
            <div className="relative w-full h-full">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                priority
                className="object-contain select-none p-2 sm:p-4"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                key={currentItem.src}
                controls
                autoPlay
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source src={currentItem.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Previous / Next Arrow Controls */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/15 transition-all active:scale-90 shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/15 transition-all active:scale-90 shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption, Date & Location Drawer */}
        <div className="flex-shrink-0 p-4 sm:p-6 overflow-y-auto no-scrollbar bg-gradient-to-b from-[#1C1816] to-[#12100F] border-t border-white/10 max-h-[30vh] sm:max-h-[32vh]">
          {/* Metadata Badges: Date & Location */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5 text-xs text-white/80">
            {currentItem.date && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#E8A598]" />
                {currentItem.date}
              </span>
            )}
            {currentItem.location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 font-body text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#7EA0B7]" />
                {currentItem.location}
              </span>
            )}
          </div>

          {/* Title */}
          {currentItem.title && (
            <h3 className="font-headline text-xl sm:text-2xl text-white font-medium mb-1">
              {currentItem.title}
            </h3>
          )}

          {/* Caption */}
          {currentItem.caption && (
            <div className="mt-2 text-white/85 text-xs sm:text-sm font-body font-light leading-relaxed whitespace-pre-line bg-white/5 rounded-2xl p-3.5 sm:p-4 border border-white/5">
              {currentItem.caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
