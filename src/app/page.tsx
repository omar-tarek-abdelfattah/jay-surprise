"use client";

import React, { useState, useEffect } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import MessageView from "@/components/MessageView";
import GalleryView from "@/components/GalleryView";
import BottomIslandNav from "@/components/BottomIslandNav";
import { Sparkles, Heart } from "lucide-react";

export default function JaySurprisePage() {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"message" | "gallery">("message");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#83382B] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#2A2320] flex flex-col relative selection:bg-[#E8A598]/40 overflow-x-hidden">
      {/* =========================================================================
          PART 1, 2, 3: CINEMATIC INTRO OVERLAY
         ========================================================================= */}
      {!hasSeenIntro && (
        <CinematicIntro onComplete={() => setHasSeenIntro(true)} />
      )}

      {/* =========================================================================
          ACTUAL WEBSITE (Optimized for iPhone, responsive for iPad & Desktop)
         ========================================================================= */}
      <div className="flex-1 flex flex-col w-full">
        {/* Subtle Top App Header Bar */}
        <header className="w-full pt-safe px-4 pt-3 pb-2 flex items-center justify-between max-w-xl mx-auto border-b border-[#E8DFD5]/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A598] animate-pulse" />
            <span className="font-headline text-base sm:text-lg tracking-tight font-medium text-[#3B1812]">
              Jay&apos;s
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHasSeenIntro(false)}
              className="px-3 py-1 rounded-full bg-white/70 hover:bg-white text-[11px] font-medium text-[#613B35] border border-[#E7DFD5] transition-all shadow-sm active:scale-95 flex items-center gap-1"
            >
              <span>Replay Intro</span>
            </button>
          </div>
        </header>

        {/* Main Body Content based on Active Tab */}
        <div className="flex-1 w-full pt-2">
          {activeTab === "message" ? <MessageView /> : <GalleryView />}
        </div>

        {/* Floating iOS Glass Island Bottom Navigation */}
        <BottomIslandNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onReplayIntro={() => setHasSeenIntro(false)}
        />
      </div>
    </main>
  );
}
