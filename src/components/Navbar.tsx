"use client";

import React from "react";
import {
  Shield,
  Radio,
  BookOpen,
  History,
  Sliders,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  onOpenPresets: () => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  onOpenHistory,
  onOpenGuide,
  onOpenPresets,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#05070d]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Minimalist Logo */}
        <motion.div
          onClick={() => onTabChange("generator")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 shadow-lg shadow-cyan-500/5">
            <Shield className="h-4.5 w-4.5 text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-400 text-[8px] font-black text-slate-950">
              W
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-wider text-white font-mono">
                WVF<span className="text-cyan-400">WARP</span>
              </span>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-300">
                2.5
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Anti-DPI • AmneziaWG • Wiresocks • Clash
            </p>
          </div>
        </motion.div>

        {/* Minimalist Center Nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
          <button
            onClick={() => onTabChange("generator")}
            className="relative rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-white"
          >
            {activeTab === "generator" && (
              <motion.div
                layoutId="nav-bubble"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              Studio
            </span>
          </button>

          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            DPI Presets
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-purple-400" />
            Guide & Clients
          </button>
        </nav>

        {/* Right Status / Action Controls */}
        <div className="flex items-center gap-2">
          {/* Animated DPI Shield active pulse */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>SHIELD ACTIVE</span>
          </div>

          {/* Minimalist History button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all"
            title="Recent Configurations"
          >
            <History className="h-3.5 w-3.5 text-cyan-400" />
            <span>History</span>
          </motion.button>
        </div>
      </div>

      {/* Minimalist Mobile nav bar */}
      <div className="flex md:hidden items-center justify-around border-t border-white/[0.06] bg-[#05070d] px-2 py-2">
        <button
          onClick={() => onTabChange("generator")}
          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === "generator"
              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
              : "text-slate-400"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Studio
        </button>
        <button
          onClick={onOpenPresets}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400"
        >
          <Radio className="h-3.5 w-3.5 text-cyan-400" />
          Presets
        </button>
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400"
        >
          <BookOpen className="h-3.5 w-3.5 text-purple-400" />
          Guide
        </button>
      </div>
    </header>
  );
}
