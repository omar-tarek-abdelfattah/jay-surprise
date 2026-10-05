"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronRight, Heart } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const stepDurationMs = 7000;
  const progressIntervalRef = useRef<any>(null);

  // Handle auto-advancing slides
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / stepDurationMs) * 100);
      setProgress(pct);

      if (elapsed >= stepDurationMs) {
        clearInterval(progressIntervalRef.current);
        if (currentStep < 2) {
          setCurrentStep((prev) => ((prev + 1) as 0 | 1 | 2));
        }
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => ((prev + 1) as 0 | 1 | 2));
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => ((prev - 1) as 0 | 1 | 2));
    }
  };

  const handleFinish = () => {
    setIsTransitioningOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0F0D0C] text-[#F5EFEB] overflow-hidden select-none transition-all duration-700 ${isTransitioningOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        }`}
    >
      {/* Cinematic Ambient Glow & Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-black/85 via-black/25 to-black/70" />
      <div className="absolute inset-0 pointer-events-none z-20 radial-vignette opacity-70" />

      {/* Top Controls & Story Progress Bar (iOS Instagram-story aesthetic) */}
      <div className="absolute top-0 inset-x-0 z-30 pt-safe px-4 pt-4 flex flex-col gap-3">
        {/* 3-Segment Progress Bar */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-xl mx-auto">
          {[0, 1, 2].map((idx) => {
            let fillWidth = "0%";
            if (idx < currentStep) fillWidth = "100%";
            else if (idx === currentStep) fillWidth = `${progress}%`;

            return (
              <div
                key={idx}
                onClick={() => setCurrentStep(idx as 0 | 1 | 2)}
                className="h-1.5 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-white transition-all duration-75 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  style={{ width: fillWidth }}
                />
              </div>
            );
          })}
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-end max-w-xl mx-auto w-full pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFinish}
              className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white hover:bg-white/25 transition-all active:scale-95 flex items-center gap-1"
            >
              <span>Skip</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen Tap Interaction Zones (Left = Prev, Right = Next) */}
      <div className="absolute inset-0 z-20 flex">
        <div onClick={handlePrev} className="w-1/3 h-full cursor-pointer" aria-label="Previous part" />
        <div onClick={handleNext} className="w-2/3 h-full cursor-pointer" aria-label="Next part" />
      </div>

      {/* =========================================================================
          PART 1: PANORAMA PHOTO 
         ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${currentStep === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 animate-kenburns-pan will-change-transform">
            <Image
              src="/laying down.jpg"
              alt="A moment in time"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Cinematic Letterbox Bars */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

          {/* Captions */}
          <div className="absolute top-50 inset-x-0 z-30 px-6 max-w-xl mx-auto text-center flex flex-col items-center">

            <div className="flex gap-2 flex-col items-center">
              <span className="font-headline text-4xl sm:text-5xl text-white tracking-tight leading-snug drop-shadow-lg">2:46am september 5th</span>
              <span className="font-headline text-4xl sm:text-5xl text-white tracking-tight leading-snug drop-shadow-lg">2025</span>
            </div>


          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: WALKING PHOTO (Cinematic Forward Drift)
         ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${currentStep === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 animate-kenburns-walk will-change-transform">
            <Image
              src="/walking-tgthr.jpg"
              alt="Walking together"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Letterbox & Shadows */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

          {/* Captions */}
          <div className="absolute bottom-12 inset-x-0 z-30 px-6 max-w-xl mx-auto text-center flex flex-col items-center">

            <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight leading-snug drop-shadow-lg">
              3:47am september 5th
            </h2>
            <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight leading-snug drop-shadow-lg">
              2025
            </h2>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 3: WELCOME SCREEN WITH MESSAGE
         ========================================================================= */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center px-6 ${currentStep === 2 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Soft background bokeh & image overlay */}
        <div className="absolute inset-0 opacity-25 scale-110 blur-xl">
          <Image
            src="/walking-tgthr.jpg"
            alt="Atmosphere"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Glassmorphic Welcome Card */}
        <div className="relative z-30 w-full max-w-md rounded-[36px] p-7 sm:p-9 bg-black/55 backdrop-blur-2xl border border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.6)] text-center flex flex-col items-center animate-float">
          {/* Animated Heart Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E8A598] to-[#C96B5B] flex items-center justify-center shadow-[0_0_30px_rgba(232,165,152,0.6)] mb-5 animate-pulse-subtle">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>

          <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#E8A598] mb-2">
            I made this just for you.
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl text-white font-normal tracking-tight mb-4">
            Welcome, Jay
          </h1>

          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-4" />

          <p className="text-white/80 text-sm sm:text-base font-body leading-relaxed mb-6 font-light">
            I built this little website for you, it's a small gift before i go to geish. I hope you like it.
            There is a letter inside waiting for you.
          </p>

          <button
            onClick={handleFinish}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8A598] via-[#DA8778] to-[#E8A598] text-[#3B1812] font-semibold text-base shadow-[0_10px_25px_rgba(232,165,152,0.4)] hover:shadow-[0_14px_32px_rgba(232,165,152,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Open Your Surprise</span>
            <Heart className="w-5 h-5 text-[#3B1812]" />
          </button>

          <p className="text-white/40 text-xs mt-4 tracking-wide">
            Made with love for you 🤍
          </p>
        </div>
      </div>
    </div>
  );
}
