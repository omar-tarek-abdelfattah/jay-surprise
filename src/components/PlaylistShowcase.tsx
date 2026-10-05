"use client";

import React, { useState } from "react";
import { ExternalLink, Copy, Check, Heart, Sparkles, Music2 } from "lucide-react";

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/2lMqOvpd56HAxa29Ns2igA?si=9807ef8b427a4dc9";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/2lMqOvpd56HAxa29Ns2igA?utm_source=generator&si=f5efd02bd7454fbb";

export function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.52 17.305c-.218.358-.684.472-1.042.254-2.853-1.743-6.444-2.138-10.675-1.171-.41.094-.82-.164-.914-.574-.094-.41.164-.82.574-.914 4.636-1.06 8.607-.613 11.803 1.34.358.218.472.684.254 1.042zm1.472-3.272c-.274.444-.86.587-1.304.313-3.266-2.008-8.246-2.59-12.108-1.417-.5.152-1.026-.134-1.178-.634-.152-.5.134-1.026.634-1.178 4.412-1.339 9.897-.696 13.643 1.612.444.274.587.86.313 1.304zm.126-3.41c-3.916-2.325-10.374-2.54-14.126-1.401-.6.183-1.233-.162-1.416-.762-.183-.6.162-1.233.762-1.416 4.312-1.31 11.439-1.06 15.932 1.606.54.321.716 1.023.395 1.563-.321.54-1.023.716-1.547.41z" />
    </svg>
  );
}

export default function PlaylistShowcase() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SPOTIFY_PLAYLIST_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto my-6" id="spotify-playlist">
      {/* Outer iOS Glass Player Card */}
      <div className="ios-glass rounded-[32px] p-4 sm:p-5 relative overflow-hidden transition-all duration-300 border border-white/70 shadow-[0_12px_36px_rgba(43,35,32,0.08)]">
        {/* Soft atmospheric gradient glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#1DB954]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#E8A598]/25 blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#1DB954]/15 text-[#1DB954] flex items-center justify-center">
              <SpotifyIcon className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#613B35] block leading-none">
                Jay&apos;s Playlist
              </span>
              <span className="text-[10px] text-[#8F8177] font-medium block mt-0.5">
                Curated on Spotify
              </span>
            </div>
          </div>

          <a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1DB954] hover:bg-[#1AA34A] text-white transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>Open in App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Embedded Spotify IFrame */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#E7DFD5]/80 bg-[#121212]">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "16px" }}
            src={SPOTIFY_EMBED_URL}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Jay's Spotify Playlist"
            className="w-full block"
          />
        </div>

        {/* Dedication Card & Actions */}
        <div className="mt-4 pt-3.5 border-t border-[#E8DFD5] flex flex-col gap-2.5">
          <p className="text-xs text-[#7F736A] font-body italic text-center px-2">
            &ldquo;Songs that remind me of you, our walks. And other songs that are matching the vibe!&rdquo;
          </p>

          <div className="flex items-center justify-between gap-2 pt-1">


            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-full bg-[#613B35] hover:bg-[#83382B] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Music2 className="w-3.5 h-3.5" />
              <span>Full Playlist</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
