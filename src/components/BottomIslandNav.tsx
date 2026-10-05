"use client";

import React from "react";
import { Mail, Image as ImageIcon, RotateCcw } from "lucide-react";
import { SpotifyIcon } from "./PlaylistShowcase";

interface BottomIslandNavProps {
  activeTab: "message" | "gallery";
  onTabChange: (tab: "message" | "gallery") => void;
  onReplayIntro: () => void;
}

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/2lMqOvpd56HAxa29Ns2igA?si=9807ef8b427a4dc9";

export default function BottomIslandNav({
  activeTab,
  onTabChange,
  onReplayIntro,
}: BottomIslandNavProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm select-none pointer-events-auto">
      {/* Floating Island Capsule */}
      <div className="ios-island rounded-full p-1.5 shadow-[0_20px_50px_rgba(40,30,25,0.22)] border border-white/60 flex items-center justify-between transition-all duration-300">
        
        {/* Main 2 Pages Navigation Buttons */}
        <div className="relative flex items-center bg-[#E8DDD2]/60 rounded-full p-1 flex-1">
          {/* Animated Background Slider Indicator */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${
              activeTab === "message" ? "left-1" : "left-[calc(50%+2px)]"
            }`}
          />

          {/* Tab 1: Message (Home) */}
          <button
            onClick={() => onTabChange("message")}
            className={`relative z-10 flex-1 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ${
              activeTab === "message" ? "text-[#5E261D]" : "text-[#7F736A] hover:text-[#2B2320]"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Message</span>
            {activeTab === "message" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A598]" />
            )}
          </button>

          {/* Tab 2: Gallery */}
          <button
            onClick={() => onTabChange("gallery")}
            className={`relative z-10 flex-1 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ${
              activeTab === "gallery" ? "text-[#5E261D]" : "text-[#7F736A] hover:text-[#2B2320]"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery</span>
            {activeTab === "gallery" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EA0B7]" />
            )}
          </button>
        </div>

        {/* Island Utilities: Spotify Shortcut & Replay Intro */}
        <div className="flex items-center gap-1.5 pl-2 pr-1">
          {/* Spotify Direct Link */}
          <a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Jay's Spotify Playlist"
            className="p-2 rounded-full bg-white/70 hover:bg-[#1DB954] text-[#1DB954] hover:text-white transition-all active:scale-90 flex items-center justify-center shadow-sm"
          >
            <SpotifyIcon className="w-4 h-4" />
          </a>

          {/* Replay Intro Button */}
          <button
            onClick={onReplayIntro}
            title="Replay Cinematic Intro"
            className="p-2 rounded-full bg-white/70 hover:bg-white text-[#613B35] transition-all active:scale-90"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
