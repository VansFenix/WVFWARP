"use client";

import React from "react";
import { Shield, Cpu, Terminal, Code, FileCode, Radio, Check } from "lucide-react";
import { motion } from "framer-motion";

export type ProtocolType =
  | "amneziawg-2.0"
  | "amneziawg-1.5"
  | "wiresocks"
  | "clash-meta"
  | "wireguard"
  | "sing-box";

interface ProtocolOption {
  id: ProtocolType;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  format: string;
}

const PROTOCOLS: ProtocolOption[] = [
  {
    id: "amneziawg-2.0",
    title: "AmneziaWG 2.0",
    subtitle: "Anti-DPI with Init Signatures & random headers",
    badge: "Recommended",
    badgeColor: "cyan",
    icon: <Shield className="h-4 w-4 text-cyan-400" />,
    format: ".conf",
  },
  {
    id: "amneziawg-1.5",
    title: "AmneziaWG 1.5",
    subtitle: "Classic obfuscation for AWG 1.5 routers & clients",
    badge: "Universal",
    badgeColor: "blue",
    icon: <Cpu className="h-4 w-4 text-blue-400" />,
    format: ".conf",
  },
  {
    id: "wiresocks",
    title: "Wiresocks",
    subtitle: "Windows SOCKS5 & App Split-Tunneling bridge",
    badge: "Split-Tunnel",
    badgeColor: "purple",
    icon: <Terminal className="h-4 w-4 text-purple-400" />,
    format: ".conf",
  },
  {
    id: "clash-meta",
    title: "Clash Meta / Mihomo",
    subtitle: "Full YAML proxy-group with AWG rules & GeoIP",
    badge: "Clash YAML",
    badgeColor: "emerald",
    icon: <Code className="h-4 w-4 text-emerald-400" />,
    format: ".yaml",
  },
  {
    id: "sing-box",
    title: "Sing-Box",
    subtitle: "JSON outbound config for graphical & CLI clients",
    badge: "JSON",
    badgeColor: "amber",
    icon: <FileCode className="h-4 w-4 text-amber-400" />,
    format: ".json",
  },
  {
    id: "wireguard",
    title: "WireGuard Standard",
    subtitle: "Clean WARP config without obfuscation headers",
    badge: "Standard",
    badgeColor: "slate",
    icon: <Radio className="h-4 w-4 text-slate-400" />,
    format: ".conf",
  },
];

interface ProtocolSelectorProps {
  selected: ProtocolType;
  onSelect: (protocol: ProtocolType) => void;
}

export function ProtocolSelector({ selected, onSelect }: ProtocolSelectorProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
          01 // VPN PROTOCOL & EXPORT FORMAT
        </label>
        <span className="text-[11px] text-cyan-400 font-mono">
          All formats support DNS & clean Anycast
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PROTOCOLS.map((p) => {
          const isSelected = selected === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(p.id)}
              className={`group relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                isSelected
                  ? "border-cyan-500/60 bg-cyan-500/[0.08] shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/40"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
              }`}
            >
              {p.badge && (
                <span
                  className={`absolute right-3 top-3.5 rounded-md px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                    p.badgeColor === "cyan"
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : p.badgeColor === "blue"
                      ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                      : p.badgeColor === "purple"
                      ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                      : p.badgeColor === "emerald"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : p.badgeColor === "amber"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : "bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {p.badge}
                </span>
              )}

              <div className="mb-2 flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    isSelected
                      ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                      : "border-white/10 bg-white/[0.04] text-slate-400 group-hover:text-white"
                  }`}
                >
                  {p.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white text-xs sm:text-sm">
                    {p.title}
                  </span>
                  <span className="rounded bg-white/[0.06] px-1 py-0.5 text-[9px] font-mono text-slate-400">
                    {p.format}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 pr-4">
                {p.subtitle}
              </p>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow"
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
