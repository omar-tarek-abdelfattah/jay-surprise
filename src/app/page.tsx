"use client";

import React, { useState } from "react";
import {
  Search,
  Home,
  User,
  Pen,
  Wand2,
  Boxes,
  Tag,
  Trash2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Sliders,
  Type,
  Palette,
} from "lucide-react";

export default function DesignSystemPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "search" | "profile">("home");
  const [searchQuery, setSearchQuery] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const palettes = [
    {
      name: "Primary",
      hex: "#E8A598",
      colorClass: "bg-[#E8A598]",
      textDark: "#613B35",
      shades: [
        "#1F0C08",
        "#3B1812",
        "#5E261D",
        "#83382B",
        "#A84F40",
        "#C96B5B",
        "#DA8778",
        "#E8A598",
        "#F2C5BC",
        "#FCE8E4",
        "#FFFFFF",
      ],
    },
    {
      name: "Secondary",
      hex: "#7EA0B7",
      colorClass: "bg-[#7EA0B7]",
      textDark: "#1F313E",
      shades: [
        "#0D1820",
        "#1B2F3E",
        "#2C4A5F",
        "#3F6782",
        "#5684A4",
        "#6E97B5",
        "#7EA0B7",
        "#9CBBCE",
        "#BDD5E2",
        "#DEEBF2",
        "#FFFFFF",
      ],
    },
    {
      name: "Tertiary",
      hex: "#D8E2DC",
      colorClass: "bg-[#D8E2DC]",
      textDark: "#2F3B35",
      shades: [
        "#141A17",
        "#242E29",
        "#36453D",
        "#4B5F54",
        "#657F71",
        "#84A090",
        "#A7BEB1",
        "#D8E2DC",
        "#E7EFEA",
        "#F3F7F5",
        "#FFFFFF",
      ],
    },
    {
      name: "Neutral",
      hex: "#C5BAAF",
      colorClass: "bg-[#C5BAAF]",
      textDark: "#37322D",
      shades: [
        "#191614",
        "#2E2925",
        "#463F39",
        "#615750",
        "#7F736A",
        "#A09388",
        "#C5BAAF",
        "#D5CCC3",
        "#E5DFD9",
        "#F3EFEB",
        "#FFFFFF",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#EFE8E1] px-4 py-8 md:px-8 lg:px-12 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl">
        {/* Top Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DDD5] text-xs font-semibold text-[#5C3833] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tailwind CSS & Google Fonts Configured
            </div>
            <h1 className="font-headline text-3xl md:text-5xl text-[#2B2320] tracking-tight">
              Design System Palette
            </h1>
            <p className="font-body text-[#6A5E57] text-sm md:text-base mt-1">
              Featuring <span className="font-semibold text-[#2B2320]">Playfair Display</span> for headlines,{" "}
              <span className="font-semibold text-[#2B2320]">Plus Jakarta Sans</span> for body and labels, with custom color ramps.
            </p>
          </div>

          {copiedCode && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#613B35] text-[#F9ECE7] text-xs font-medium shadow-md transition-all">
              <Check className="w-3.5 h-3.5" /> Copied {copiedCode} to clipboard
            </div>
          )}
        </div>

        {/* The Exact Design System Grid from Reference Image */}
        <div className="bg-[#FAF6F1] p-6 md:p-8 rounded-[36px] shadow-sm border border-[#E7DFD5]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* COLUMN 1: COLOR PALETTES */}
            <div className="flex flex-col gap-4 justify-between">
              {palettes.map((item) => (
                <div
                  key={item.name}
                  onClick={() => copyToClipboard(item.hex)}
                  className="group cursor-pointer rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                  style={{ backgroundColor: item.hex }}
                  title="Click to copy hex"
                >
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-semibold text-[#2C211E] tracking-wide">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#2C211E] uppercase flex items-center gap-1 opacity-90 group-hover:opacity-100">
                      {item.hex}
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>

                  {/* Gradient Steps Bar */}
                  <div className="h-6 w-full rounded-md flex overflow-hidden shadow-inner">
                    {item.shades.map((shade, i) => (
                      <div
                        key={i}
                        className="flex-1 h-full"
                        style={{ backgroundColor: shade }}
                        title={shade}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN 2: TYPOGRAPHY HIERARCHY */}
            <div className="flex flex-col gap-4">
              {/* Headline */}
              <div className="flex-1 bg-[#F4EDE5] rounded-3xl p-6 flex flex-col justify-between border border-[#EDE4DB]">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-[#6B5E57]">Headline</span>
                  <span className="text-xs font-headline italic text-[#7C6E67]">
                    Playfair Display
                  </span>
                </div>
                <div className="my-auto py-2 text-center">
                  <span className="font-headline text-6xl md:text-7xl text-[#1E1714] tracking-normal select-none">
                    Aa
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8C7E77] text-right">
                  font-headline
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 bg-[#F4EDE5] rounded-3xl p-6 flex flex-col justify-between border border-[#EDE4DB]">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-[#6B5E57]">Body</span>
                  <span className="text-xs font-body text-[#7C6E67]">
                    Plus Jakarta Sans
                  </span>
                </div>
                <div className="my-auto py-2 text-center">
                  <span className="font-body font-semibold text-6xl md:text-7xl text-[#2C2420] tracking-tight select-none">
                    Aa
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8C7E77] text-right">
                  font-body
                </div>
              </div>

              {/* Label */}
              <div className="flex-1 bg-[#F4EDE5] rounded-3xl p-6 flex flex-col justify-between border border-[#EDE4DB]">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-[#6B5E57]">Label</span>
                  <span className="text-xs font-body text-[#7C6E67]">
                    Plus Jakarta Sans
                  </span>
                </div>
                <div className="my-auto py-2 text-center">
                  <span className="font-label font-bold text-5xl md:text-6xl text-[#3A302B] tracking-tight select-none">
                    Aa
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8C7E77] text-right">
                  font-label
                </div>
              </div>
            </div>

            {/* COLUMN 3: BUTTONS & ACCENTS */}
            <div className="flex flex-col gap-4">
              {/* Button Variations */}
              <div className="bg-[#F4EDE5] rounded-3xl p-5 border border-[#EDE4DB]">
                <div className="grid grid-cols-2 gap-2.5">
                  <button className="w-full py-2.5 px-3 rounded-full bg-[#613B35] text-[#FAF2EE] text-xs font-medium hover:bg-[#52302A] transition-all duration-150 shadow-sm active:scale-95 text-center">
                    Primary
                  </button>
                  <button className="w-full py-2.5 px-3 rounded-full bg-[#EDE3DA] text-[#4A3D36] text-xs font-medium hover:bg-[#E3D7CC] transition-all duration-150 shadow-sm active:scale-95 text-center">
                    Secondary
                  </button>
                  <button className="w-full py-2.5 px-3 rounded-full bg-[#272320] text-[#FAF6F2] text-xs font-medium hover:bg-[#1A1715] transition-all duration-150 shadow-sm active:scale-95 text-center">
                    Inverted
                  </button>
                  <button className="w-full py-2.5 px-3 rounded-full bg-transparent border border-[#3C322C] text-[#3C322C] text-xs font-medium hover:bg-[#ECE4DC] transition-all duration-150 shadow-sm active:scale-95 text-center">
                    Outlined
                  </button>
                </div>
              </div>

              {/* Progress/Line Indicator Bars */}
              <div className="bg-[#F4EDE5] rounded-3xl p-6 border border-[#EDE4DB] flex flex-col justify-center gap-3">
                <div className="w-full h-1.5 rounded-full bg-[#EADFD6] overflow-hidden">
                  <div className="h-full w-2/3 bg-[#7A3A30] rounded-full"></div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EADFD6] overflow-hidden">
                  <div className="h-full w-3/4 bg-[#3E5C6F] rounded-full"></div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EADFD6] overflow-hidden">
                  <div className="h-full w-1/2 bg-[#313C36] rounded-full"></div>
                </div>
              </div>

              {/* Icon & Label Badges */}
              <div className="grid grid-cols-2 gap-3 flex-1 items-stretch">
                <div className="bg-[#F4EDE5] rounded-3xl p-4 border border-[#EDE4DB] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#9EB6A9] flex items-center justify-center text-[#27352D] shadow-sm hover:rotate-12 transition-transform duration-200 cursor-pointer">
                    <Pen className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-[#F4EDE5] rounded-3xl p-4 border border-[#EDE4DB] flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8A598] text-[#5C2E25] font-semibold text-xs shadow-sm hover:brightness-95 transition cursor-pointer">
                    <Pen className="w-3.5 h-3.5" />
                    <span>Label</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 4: CONTROLS & NAVIGATION */}
            <div className="flex flex-col gap-4 justify-between">
              {/* Search Bar */}
              <div className="bg-[#F4EDE5] rounded-3xl p-6 border border-[#EDE4DB] flex items-center">
                <div className="w-full relative flex items-center">
                  <Search className="w-4 h-4 text-[#8C7F78] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full py-2.5 pl-10 pr-4 text-xs rounded-full bg-transparent border border-[#CDC1B6] text-[#2C2420] placeholder-[#8C7F78] focus:outline-none focus:ring-2 focus:ring-[#7EA0B7]"
                  />
                </div>
              </div>

              {/* Floating Tab Dock */}
              <div className="bg-[#F4EDE5] rounded-3xl p-5 border border-[#EDE4DB] flex items-center justify-center">
                <div className="inline-flex items-center gap-5 px-5 py-2.5 rounded-full bg-[#EADFD5] shadow-inner">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeTab === "home"
                        ? "bg-[#613B35] text-[#FAF3EF] shadow-sm"
                        : "text-[#6B5F58] hover:text-[#2E2724]"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("search")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeTab === "search"
                        ? "bg-[#613B35] text-[#FAF3EF] shadow-sm"
                        : "text-[#6B5F58] hover:text-[#2E2724]"
                    }`}
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeTab === "profile"
                        ? "bg-[#613B35] text-[#FAF3EF] shadow-sm"
                        : "text-[#6B5F58] hover:text-[#2E2724]"
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Circle Icons */}
              <div className="bg-[#F4EDE5] rounded-3xl p-6 border border-[#EDE4DB] flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 rounded-full bg-[#6E3C33] text-[#F7ECE8] flex items-center justify-center hover:scale-110 active:scale-95 transition duration-150 shadow-sm"
                    title="Magic Wand"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-[#345367] text-[#EDF4F8] flex items-center justify-center hover:scale-110 active:scale-95 transition duration-150 shadow-sm"
                    title="Categories"
                  >
                    <Boxes className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-[#3B4D45] text-[#EDF4F0] flex items-center justify-center hover:scale-110 active:scale-95 transition duration-150 shadow-sm"
                    title="Tags"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-[#9E2A2B] text-[#FDF2F2] flex items-center justify-center hover:scale-110 active:scale-95 transition duration-150 shadow-sm"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Reference Code Guide for the Developer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF6F1] p-5 rounded-2xl border border-[#E7DFD5] flex items-start gap-4">
            <div className="p-3 bg-[#E8A598]/20 text-[#613B35] rounded-xl">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#27211E]">Typography Classes</h3>
              <p className="text-xs text-[#73665E] mt-1 leading-relaxed">
                Use <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#57342F] font-mono text-[11px]">font-headline</code> (Playfair Display) or{" "}
                <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#57342F] font-mono text-[11px]">font-body</code> /{" "}
                <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#57342F] font-mono text-[11px]">font-label</code> (Plus Jakarta Sans).
              </p>
            </div>
          </div>

          <div className="bg-[#FAF6F1] p-5 rounded-2xl border border-[#E7DFD5] flex items-start gap-4">
            <div className="p-3 bg-[#7EA0B7]/20 text-[#304C5F] rounded-xl">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#27211E]">Palette Utility Classes</h3>
              <p className="text-xs text-[#73665E] mt-1 leading-relaxed">
                Use <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#2B4455] font-mono text-[11px]">bg-primary</code>,{" "}
                <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#2B4455] font-mono text-[11px]">text-secondary</code>,{" "}
                <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#2B4455] font-mono text-[11px]">bg-tertiary</code>, and{" "}
                <code className="bg-[#EDE3DA] px-1.5 py-0.5 rounded text-[#2B4455] font-mono text-[11px]">bg-neutral-main</code> with 50-950 scale steps.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
