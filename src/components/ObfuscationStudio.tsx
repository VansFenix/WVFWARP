"use client";

import React, { useState } from "react";
import {
  ObfuscationParams,
  DEFAULT_OBFUSCATION_PARAMS,
} from "@/lib/warp-engine";
import { Sliders, Shuffle, Sparkles, ChevronDown, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ObfuscationStudioProps {
  protocol: string;
  obf: ObfuscationParams;
  onChange: (newObf: ObfuscationParams) => void;
  mtu: number;
  onMtuChange: (val: number) => void;
  reservedBits: string;
  onReservedBitsChange: (val: string) => void;
  routingMode: "all" | "exclude-lan" | "custom-ips";
  onRoutingModeChange: (mode: "all" | "exclude-lan" | "custom-ips") => void;
}

export function ObfuscationStudio({
  protocol,
  obf,
  onChange,
  mtu,
  onMtuChange,
  reservedBits,
  onReservedBitsChange,
  routingMode,
  onRoutingModeChange,
}: ObfuscationStudioProps) {
  const [expanded, setExpanded] = useState(true);

  const isV2 = protocol === "amneziawg-2.0";
  const isAwg =
    protocol === "amneziawg-2.0" ||
    protocol === "amneziawg-1.5" ||
    protocol === "clash-meta" ||
    protocol === "sing-box" ||
    protocol === "wiresocks";

  const applyPreset = (key: string) => {
    const p = DEFAULT_OBFUSCATION_PARAMS[key];
    if (p) {
      onChange({ ...p });
    }
  };

  const randomizeHeaders = () => {
    const rInt = () => Math.floor(1000000000 + Math.random() * 1000000000);
    const rHex = () =>
      Math.floor(Math.random() * 0xffffffff)
        .toString(16)
        .padStart(8, "0");

    onChange({
      ...obf,
      h1: rInt(),
      h2: rInt(),
      h3: rInt(),
      h4: rInt(),
      i1: rHex(),
      i2: rHex(),
      i3: rHex(),
      i4: rHex(),
    });
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex cursor-pointer items-center gap-2"
        >
          <Sliders className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            04 // ANTI-DPI OBFUSCATION, MTU & JUNK PACKETS
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-slate-500 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={randomizeHeaders}
            className="flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-[11px] font-mono font-medium text-cyan-300 hover:bg-cyan-500/25 transition-all"
            title="Generate Random Magic Signatures"
          >
            <Shuffle className="h-3 w-3" />
            <span>RANDOMIZE SIGNATURES</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 overflow-hidden pt-2"
          >
            {isAwg ? (
              <>
                {/* 1. Jc / Jmin / Jmax Quick TSPU Presets Bar */}
                <div className="rounded-lg border border-white/[0.06] bg-black/30 p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      ПРЕСЕТЫ МУСОРА (jc / Jmin / Jmax):
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Нажмите для тестирования против ТСПУ
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      {
                        label: "🔥 3 / 4 / 911 (НОВЫЙ)",
                        key: "new-3-4-911",
                        color: "cyan",
                      },
                      {
                        label: "118 / 22 / 1000",
                        key: "tspu-118-22-1000",
                        color: "emerald",
                      },
                      {
                        label: "5 / 10 / 40",
                        key: "tspu-5-10-40",
                        color: "blue",
                      },
                      {
                        label: "5 / 40 / 70",
                        key: "tspu-5-40-70",
                        color: "purple",
                      },
                      {
                        label: "4 / 40 / 70",
                        key: "tspu-4-40-70",
                        color: "amber",
                      },
                      { label: "3 / 1 / 3", key: "tspu-3-1-3", color: "slate" },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={() => applyPreset(btn.key)}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Junk Packet Structure Presets (Один длинный L1 vs Несколько коротких L1, L2, L3) */}
                <div className="rounded-lg border border-white/[0.06] bg-black/30 p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-purple-300 flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      СТРУКТУРА МУСОРНЫХ ПАКЕТОВ (S1 / S2 / L-Headers):
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => applyPreset("junk-one-long-l1")}
                      className="flex flex-col items-start rounded-md border border-white/10 bg-white/[0.03] p-2 text-left hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                      <span className="text-[11px] font-mono font-bold text-purple-300">
                        📦 Один длинный L1
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Jc=1, Jmin=900, Jmax=1250, S1=150
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => applyPreset("junk-multi-short-l123")}
                      className="flex flex-col items-start rounded-md border border-white/10 bg-white/[0.03] p-2 text-left hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                      <span className="text-[11px] font-mono font-bold text-purple-300">
                        ⚡ Несколько коротких L1, L2, L3
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Jc=6, Jmin=12, Jmax=48, S1=36, S2=48
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sliders for Jc, Jmin, Jmax */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Jc */}
                  <div className="space-y-1.5 rounded-lg border border-white/[0.06] bg-black/30 p-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300">
                        Jc (Junk Packets)
                      </label>
                      <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
                        {obf.jc}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={120}
                      value={obf.jc}
                      onChange={(e) =>
                        onChange({ ...obf, jc: parseInt(e.target.value, 10) })
                      }
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Jmin */}
                  <div className="space-y-1.5 rounded-lg border border-white/[0.06] bg-black/30 p-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300">
                        Jmin (Min Bytes)
                      </label>
                      <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
                        {obf.jmin}B
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={250}
                      step={1}
                      value={obf.jmin}
                      onChange={(e) =>
                        onChange({ ...obf, jmin: parseInt(e.target.value, 10) })
                      }
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Jmax */}
                  <div className="space-y-1.5 rounded-lg border border-white/[0.06] bg-black/30 p-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300">
                        Jmax (Max Bytes)
                      </label>
                      <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
                        {obf.jmax}B
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={1350}
                      step={10}
                      value={obf.jmax}
                      onChange={(e) =>
                        onChange({ ...obf, jmax: parseInt(e.target.value, 10) })
                      }
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                {/* S1 & S2 + H1-H4 inputs */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-400">
                      S1 (Init 1)
                    </label>
                    <input
                      type="number"
                      value={obf.s1}
                      onChange={(e) =>
                        onChange({
                          ...obf,
                          s1: parseInt(e.target.value, 10) || 84,
                        })
                      }
                      className="w-full rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-400">
                      S2 (Init 2)
                    </label>
                    <input
                      type="number"
                      value={obf.s2}
                      onChange={(e) =>
                        onChange({
                          ...obf,
                          s2: parseInt(e.target.value, 10) || 54,
                        })
                      }
                      className="w-full rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-400">
                      H1 (Init Magic)
                    </label>
                    <input
                      type="number"
                      value={obf.h1}
                      onChange={(e) =>
                        onChange({
                          ...obf,
                          h1: parseInt(e.target.value, 10) || 1778114400,
                        })
                      }
                      className="w-full rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs text-cyan-300 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-400">
                      H2 (Resp Magic)
                    </label>
                    <input
                      type="number"
                      value={obf.h2}
                      onChange={(e) =>
                        onChange({
                          ...obf,
                          h2: parseInt(e.target.value, 10) || 1140023414,
                        })
                      }
                      className="w-full rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs text-cyan-300 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* AmneziaWG 2.0 Hex Signature Masks (I1 - I4) */}
                {isV2 && (
                  <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/[0.04] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        AWG 2.0 HEX SIGNATURE MASKS (I1 - I4)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                          I1 (Init)
                        </label>
                        <input
                          type="text"
                          maxLength={8}
                          value={obf.i1}
                          onChange={(e) =>
                            onChange({ ...obf, i1: e.target.value })
                          }
                          className="w-full rounded border border-cyan-500/30 bg-black/50 px-2 py-1 font-mono text-xs text-cyan-300 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                          I2 (Resp)
                        </label>
                        <input
                          type="text"
                          maxLength={8}
                          value={obf.i2}
                          onChange={(e) =>
                            onChange({ ...obf, i2: e.target.value })
                          }
                          className="w-full rounded border border-cyan-500/30 bg-black/50 px-2 py-1 font-mono text-xs text-cyan-300 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                          I3 (Cookie)
                        </label>
                        <input
                          type="text"
                          maxLength={8}
                          value={obf.i3}
                          onChange={(e) =>
                            onChange({ ...obf, i3: e.target.value })
                          }
                          className="w-full rounded border border-cyan-500/30 bg-black/50 px-2 py-1 font-mono text-xs text-cyan-300 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5">
                          I4 (Data)
                        </label>
                        <input
                          type="text"
                          maxLength={8}
                          value={obf.i4}
                          onChange={(e) =>
                            onChange({ ...obf, i4: e.target.value })
                          }
                          className="w-full rounded border border-cyan-500/30 bg-black/50 px-2 py-1 font-mono text-xs text-cyan-300 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-xs font-mono text-slate-400">
                Standard WireGuard mode does not include AWG junk packet
                obfuscation headers.
              </div>
            )}

            {/* MTU Presets & Reserved Bits & Split Tunneling */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2 border-t border-white/[0.06]">
              {/* MTU with Quick Buttons */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono text-slate-400">
                    MTU (PACKET SIZE)
                  </label>
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {mtu}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {[1280, 1340, 1360, 1420, 1500].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => onMtuChange(m)}
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] transition-all ${
                        mtu === m
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-white/[0.05] text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={mtu}
                  onChange={(e) =>
                    onMtuChange(parseInt(e.target.value, 10) || 1280)
                  }
                  className="w-full rounded border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  WARP RESERVED BITS
                </label>
                <input
                  type="text"
                  value={reservedBits}
                  onChange={(e) => onReservedBitsChange(e.target.value)}
                  placeholder="[0, 0, 0]"
                  className="w-full rounded border border-white/10 bg-black/50 px-2.5 py-1.5 font-mono text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  TUNNEL ROUTING
                </label>
                <select
                  value={routingMode}
                  onChange={(e) => onRoutingModeChange(e.target.value as any)}
                  className="w-full rounded border border-white/10 bg-black/50 px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">Route All Traffic (::/0)</option>
                  <option value="exclude-lan">Split LAN (Exclude Local)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
