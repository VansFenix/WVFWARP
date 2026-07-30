"use client";

import React, { useState } from "react";
import {
  X,
  Smartphone,
  Monitor,
  Terminal,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientGuideModal({ isOpen, onClose }: ClientGuideModalProps) {
  const [activeClient, setActiveClient] = useState("amneziawg");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#080c14] shadow-2xl flex flex-col"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-mono">
                  CLIENT APPS & SETUP GUIDES
                </h2>
                <p className="text-[11px] text-slate-400">
                  Step-by-step instructions for AmneziaWG, Wiresocks & Clash
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Client Selection Tabs */}
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/30 px-6 py-2 overflow-x-auto">
            {[
              { id: "amneziawg", label: "AMNEZIAWG" },
              { id: "wiresocks", label: "WIRESOCKS" },
              { id: "clash", label: "CLASH META" },
              { id: "singbox", label: "SING-BOX" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveClient(tab.id)}
                className={`rounded-lg px-3 py-1 text-[11px] font-mono font-semibold transition-all ${
                  activeClient === tab.id
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-6 text-xs text-slate-300 space-y-4 font-mono">
            {activeClient === "amneziawg" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-4">
                  <h3 className="font-bold text-white text-xs mb-1">
                    WHY AMNEZIAWG 2.0 & 1.5?
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Standard WireGuard is often blocked by ISPs using Deep Packet
                    Inspection (DPI). AmneziaWG modifies handshake headers and adds
                    randomized junk packets (Jc, Jmin, Jmax, S1, S2, I1-I4) to
                    disguise your VPN connection as ordinary encrypted UDP
                    traffic.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-xs">
                      <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
                      ANDROID & iOS
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300">
                      <li>Download AmneziaWG from App Store or Play Store.</li>
                      <li>In WVFWARP, select AmneziaWG 2.0 or 1.5.</li>
                      <li>Tap QR Code and scan with your phone camera.</li>
                      <li>Activate tunnel to bypass TSPU / DPI blocks.</li>
                    </ol>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 text-xs">
                      <Monitor className="h-3.5 w-3.5 text-purple-400" />
                      WINDOWS, macOS & LINUX
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300">
                      <li>Download AmneziaWG desktop client from GitHub.</li>
                      <li>Download your generated .conf file.</li>
                      <li>Click &quot;+ Add Tunnel from file&quot; in AmneziaWG.</li>
                      <li>Connect and verify DPI bypass.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {activeClient === "wiresocks" && (
              <div className="space-y-3">
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/[0.04] p-4">
                  <h3 className="font-bold text-white text-xs mb-1">
                    WIRESOCKS (WINDOWS SPLIT-TUNNELING)
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Wiresocks lets you route only specific desktop applications
                    (Telegram, Discord, Chrome) through Cloudflare WARP while
                    keeping gaming or torrents on your direct connection.
                  </p>
                </div>
              </div>
            )}

            {activeClient === "clash" && (
              <div className="space-y-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] p-4">
                  <h3 className="font-bold text-white text-xs mb-1">
                    CLASH META / MIHOMO
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Mihomo natively supports AmneziaWG obfuscation fields inside
                    YAML! This integrates WVFWARP into proxy rules, failover
                    groups, and GeoIP routing.
                  </p>
                </div>
              </div>
            )}

            {activeClient === "singbox" && (
              <div className="space-y-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4">
                  <h3 className="font-bold text-white text-xs mb-1">
                    SING-BOX UNIVERSAL CORE
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    WVFWARP generates clean JSON outbound structures with
                    wireguard / amneziawg parameters for Sing-Box.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t border-white/[0.08] px-6 py-3">
            <button
              onClick={onClose}
              className="rounded-xl bg-cyan-500 px-5 py-1.5 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400"
            >
              CLOSE GUIDE
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
