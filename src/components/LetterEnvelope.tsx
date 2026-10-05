"use client";

import React, { useState } from "react";
import { Heart, Sparkles, X, RotateCcw, ChevronDown } from "lucide-react";

interface LetterEnvelopeProps {
  onEnvelopeOpened?: () => void;
  isPlayingMusic?: boolean;
}

export default function LetterEnvelope({ onEnvelopeOpened, isPlayingMusic }: LetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterUnfolded, setIsLetterUnfolded] = useState(false);
  const handleOpenEnvelope = () => {
    if (!isOpen) {
      // 1. Open envelope flap
      setIsOpen(true);
      if (onEnvelopeOpened) onEnvelopeOpened();

      // 2. Slide out and unfold letter
      setTimeout(() => {
        setIsLetterUnfolded(true);
      }, 700);
    } else {
      // Toggle unfold
      setIsLetterUnfolded(true);
    }
  };

  const handleCloseLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLetterUnfolded(false);
  };

  const handleFoldBackEnvelope = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLetterUnfolded(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container with 3D Perspective */}
      <div className="relative w-full max-w-sm sm:max-w-md perspective-1000 my-4">
        {/* =========================================================================
            THE ENVELOPE (Physical layered look)
           ========================================================================= */}
        <div
          onClick={handleOpenEnvelope}
          className={`relative w-full h-64 sm:h-72 rounded-3xl cursor-pointer transition-all duration-500 group select-none ${isOpen ? "shadow-[0_20px_50px_rgba(100,50,40,0.15)]" : "shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:scale-[1.01]"
            }`}
          style={{
            background: "linear-gradient(135deg, #F9F4EE 0%, #EFE8E1 100%)",
            border: "1px solid rgba(220, 205, 195, 0.8)",
          }}
        >
          {/* Subtle paper grain and ambient inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-black/5 via-transparent to-white/40 pointer-events-none" />

          {/* Envelope Back Interior Pocket (where paper sits) */}
          <div className="absolute inset-x-4 top-4 bottom-4 rounded-2xl bg-[#E6DDD3] border border-[#D5C7B8] overflow-hidden flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-[#9E9084] font-medium font-body flex items-center gap-1.5 opacity-60">
              <Sparkles className="w-3.5 h-3.5 text-[#C96B5B]" />
              A Letter Written From The Heart
            </span>
          </div>

          {/* =========================================================================
              THE LETTER PAPER SLIDING UP
             ========================================================================= */}
          <div
            className={`absolute inset-x-6 top-6 bg-[#FCFBF8] rounded-2xl p-5 border border-[#E3DACF] shadow-lg transition-all duration-700 ease-out flex flex-col justify-between ${isOpen
              ? "-translate-y-24 sm:-translate-y-28 scale-100 opacity-100 z-20"
              : "translate-y-2 scale-95 opacity-80 z-0"
              }`}
            style={{
              height: "220px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
            }}
          >
            {/* Letter peek lines */}
            <div>
              <div className="flex items-center justify-between border-b border-[#EFE8DF] pb-2 mb-3">
                <span className="font-headline italic text-sm text-[#83382B]">For Jay, with love</span>
                <span className="text-[11px] font-mono text-[#A89B8F]">Always & Forever</span>
              </div>
              <p className="font-headline text-lg sm:text-xl text-[#3B1812] leading-snug line-clamp-3">
                "There are rare people who make the whole world feel warmer just by existing. You are that person to me..."
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-[#83382B] underline underline-offset-4 flex items-center gap-0.5">
                Read Letter <ChevronDown className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Envelope Front Left & Right Triangles (Pockets) */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 overflow-hidden">
            {/* Bottom Flap */}
            <div
              className="absolute inset-x-0 bottom-0 h-40 bg-[#F4EDE4] border-t border-[#E2D5C7]"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 50% 25%)",
                filter: "drop-shadow(0 -4px 6px rgba(0,0,0,0.03))",
              }}
            />
            {/* Left Flap */}
            <div
              className="absolute left-0 inset-y-0 w-44 bg-[#EFE8DF] border-r border-[#E0D2C4]"
              style={{
                clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
                opacity: 0.85,
              }}
            />
            {/* Right Flap */}
            <div
              className="absolute right-0 inset-y-0 w-44 bg-[#ECE4DA] border-l border-[#DFD1C2]"
              style={{
                clipPath: "polygon(100% 0%, 100% 100%, 0% 50%)",
                opacity: 0.85,
              }}
            />
          </div>

          {/* =========================================================================
              ENVELOPE TOP FOLDING FLAP (3D Perspective Flip)
             ========================================================================= */}
          <div
            className={`absolute top-0 inset-x-0 h-36 origin-top transition-transform duration-700 ease-in-out pointer-events-none ${isOpen ? "rotate-x-180 z-0" : "rotate-x-0 z-30"
              }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Outer Flap Facing User */}
            <div
              className="absolute inset-0 bg-[#F7F0E8] border-b border-[#D8CABE]"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.08))",
              }}
            />
          </div>

          {/* =========================================================================
              WAX SEAL WITH MONOGRAM (Breaks/Hides when opened)
             ========================================================================= */}
          <div
            className={`absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 flex flex-col items-center ${isOpen
              ? "scale-0 opacity-0 pointer-events-none"
              : "scale-100 opacity-100 group-hover:scale-105"
              }`}
          >
            {/* Wax Seal Disk */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#933E30] via-[#83382B] to-[#5E261D] shadow-[0_6px_16px_rgba(94,38,29,0.45)] flex items-center justify-center border border-[#B85949] cursor-pointer">
              {/* Outer beaded ring effect */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#DA8778]/40 pointer-events-none" />

              {/* Heart Monogram */}
              <Heart className="w-6 h-6 text-[#F9EBE7] fill-[#F9EBE7] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-pulse" />
            </div>

            {/* Glowing Instruction Tag */}
            <div className="mt-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#E8A598]/40 text-[11px] font-semibold text-[#613B35] tracking-wide uppercase whitespace-nowrap animate-bounce flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-[#B85949]" />
              Tap to open letter
            </div>
          </div>
        </div>

        {/* Envelope Actions when opened */}
        {isOpen && !isLetterUnfolded && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsLetterUnfolded(true)}
              className="px-5 py-2 rounded-full bg-[#613B35] text-white text-xs font-semibold shadow-md hover:bg-[#83382B] transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Unfold Full Letter</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFoldBackEnvelope}
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-[#613B35] border border-[#E7DFD5] text-xs font-medium shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fold Back</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          FULL UNFOLDED LETTER MODAL (Deckle-edge Parchment Style)
         ========================================================================= */}
      {isLetterUnfolded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[88vh] bg-[#FAF7F2] rounded-[32px] p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.4)] border border-[#EADBCC] flex flex-col overflow-hidden animate-scaleUp">

            {/* Header controls inside letter */}
            <div className="flex items-center justify-between border-b border-[#EADCCE] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A598]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#8A796F]">
                  Handcrafted Note • October 2026
                </span>
              </div>

              <div className="flex items-center gap-2">


                <button
                  onClick={handleCloseLetter}
                  className="p-1.5 rounded-full bg-[#EFE8DF] hover:bg-[#E5DDD4] text-[#613B35] transition-all"
                  aria-label="Close letter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Letter Content */}
            <div className="overflow-y-auto pr-2 space-y-5 text-[#2B2320] font-body text-sm sm:text-base leading-relaxed no-scrollbar">
              <div className="text-center my-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#A84F40] font-semibold">
                  To My Favorite Person In The World
                </span>
                <h2 className="font-headline text-2xl sm:text-3xl font-normal text-[#2A1D1A] mt-1">
                  Hi Janjoona,
                </h2>
                <div className="w-16 h-[1.5px] bg-[#E8A598] mx-auto mt-3" />
              </div>

              <p className="font-headline italic text-lg sm:text-xl text-[#613B35] leading-relaxed text-center px-2">
                I have no idea why this feels like a farewell, but I know it's not. I really wanted to give you something nice to remember me when I go for geish
              </p>

              <p>
                I dont know how to start, it's not a farewell, I'm not disappering for good. I will be back inshallah but I wanted to tell you a bunch of stuff before I go to markaz tadreeb/geish so I don't feel like I left without saying what I want. I also hope that you don't view this as too much or like there'll be anything new, I just wanted to make you happy with this surprise (yala ya sety aho consider it shwayet hanan ;))
              </p>

              <p>
                I wanna start with apologizing that I made our whole dynamic awkward or if I repelled you by liking you, but you made so much sense to me and I was just happy as long as you were there. I guess you just don't want that and I did understand it a while ago even if it took me so much power and endurance to do so. it HURT me bad and it propably still does.
              </p>

              <p>
                and no matter how YOU feel about me I still love and I will keep loving you <span className="underline">the same way I think you love me</span>. That's why I'd HATE for you to experience even 1% of the pain that I felt (wasn't your fault). So please keep your standards high and don't be in the situation I was in, don't accept anything or anyone less than me lol, law keda konty tb2y m3aya w khalas lmao.
                All jokes aside, just TAKE CARE
              </p>

              <p>
                I also want you to remember me, not for ruining something good because of my feelings, but that I was willing to be there and do anything no matter how far I was, and that I tried to be always there for you. And remember my promise that I will remain there for you as long as I live, no matter what the future holds for us. I am NOT like those who gave up on you and I NEVER will be
              </p>

              <p>This is just a temporary goodbye, I will be back, Wish me luck. I will have a small zarayer phone and I will call you nd mama from. But please allow me to take the first week in with my own thoughts and on my own, I will call you when I think the time is right.</p>


              <div className="bg-[#F2ECE3] rounded-2xl p-4 border border-[#E3DACF] my-4">
                <p className="font-headline text-[#5E261D] italic text-base sm:text-lg mb-1">
                  Take care and I love you, family. More than you'd ever think  <Heart className="inline" />
                </p>
              </div>

              <div className="pt-4 border-t border-[#EADCCE] flex flex-col items-end">
                <span className="text-xs uppercase tracking-widest text-[#8A796F]">Yours</span>
                <span className="font-headline italic text-2xl text-[#83382B] mt-1">O🤍</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-2 border-t border-[#EADCCE] flex items-center justify-between">
              <button
                onClick={handleFoldBackEnvelope}
                className="text-xs text-[#8A796F] hover:text-[#613B35] underline underline-offset-4 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Fold back into envelope</span>
              </button>

              <button
                onClick={handleCloseLetter}
                className="px-5 py-2 rounded-full bg-[#613B35] text-white text-xs font-semibold shadow hover:bg-[#83382B] transition-all"
              >
                Back to Surprise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
