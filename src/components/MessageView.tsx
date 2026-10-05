"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Music, Calendar, Clock, Smile, Compass, Disc3 } from "lucide-react";
import LetterEnvelope from "./LetterEnvelope";
import PlaylistShowcase from "./PlaylistShowcase";

export default function MessageView() {
  const [hasOpenedLetter, setHasOpenedLetter] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 pt-2 pb-24">
      {/* Top Welcome Pill */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8A598]/20 border border-[#E8A598]/30 text-[#613B35] text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 text-[#B85949] fill-[#B85949]" />
          <span>Especially For You</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-normal text-[#2A2320]">
          Hey Jay
        </h1>
        <p className="text-xs sm:text-sm text-[#7F736A] font-body mt-1 max-w-sm">
          Tap the wax seal below to uncover your letter ;) .
        </p>
      </div>

      {/* =========================================================================
          THE LETTER ENVELOPE SECTION (Main Focus)
         ========================================================================= */}
      <div className="mb-8">
        <LetterEnvelope onEnvelopeOpened={() => setHasOpenedLetter(true)} />
      </div>

      {/* =========================================================================
          ROMANTIC QUICK COUNTERS / HIGHLIGHT CHIPS
         ========================================================================= */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="ios-glass rounded-2xl p-3.5 text-center border border-white/60 shadow-sm">
          <span className="font-headline text-xl sm:text-2xl text-[#83382B] font-semibold block">
            ∞
          </span>
          <span className="text-[11px] font-medium text-[#7F736A] uppercase tracking-wider block mt-0.5">
            Cherished Days
          </span>
        </div>

        <div className="ios-glass rounded-2xl p-3.5 text-center border border-white/60 shadow-sm">
          <span className="font-headline text-xl sm:text-2xl text-[#7EA0B7] font-semibold block">
            100%
          </span>
          <span className="text-[11px] font-medium text-[#7F736A] uppercase tracking-wider block mt-0.5">
            Pure Joy
          </span>
        </div>

        <div className="ios-glass rounded-2xl p-3.5 text-center border border-white/60 shadow-sm">
          <span className="font-headline text-xl sm:text-2xl text-[#657F71] font-semibold block">
            Always
          </span>
          <span className="text-[11px] font-medium text-[#7F736A] uppercase tracking-wider block mt-0.5">
            By Your Side
          </span>
        </div>
      </div>

      {/* =========================================================================
          THE PLAYLIST SHOWCASE SECTION
         ========================================================================= */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8A598]" />
            <h2 className="font-headline text-xl text-[#2B2320]">The Soundtrack</h2>
          </div>
        </div>

        <PlaylistShowcase />
      </div>

      {/* Bottom Love Quote Card */}
      <div className="mt-8 p-5 rounded-3xl bg-[#FAF5EE] border border-[#E7DFD5] text-center shadow-sm">
        <p className="font-headline italic text-base sm:text-lg text-[#613B35] flex items-center justify-center gap-2">
          Don't forget to check the gallery <Heart className="w-4 h-4 text-[#B85949] fill-[#B85949]" />
        </p>

      </div>
    </div>
  );
}
