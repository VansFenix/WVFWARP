"use client";

import React from "react";
import { Key, Sparkles, Shield, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

interface WarpKeySectionProps {
  mode: "free-auto" | "warp-plus-key" | "custom-keypair";
  onModeChange: (mode: "free-auto" | "warp-plus-key" | "custom-keypair") => void;
  warpPlusLicense: string;
  onLicenseChange: (val: string) => void;
  customPrivKey: string;
  onCustomPrivChange: (val: string) => void;
  customPubKey: string;
  onCustomPubChange: (val: string) => void;
  customV4: string;
  onCustomV4Change: (val: string) => void;
  customV6: string;
  onCustomV6Change: (val: string) => void;
}

export function WarpKeySection({
  mode,
  onModeChange,
  warpPlusLicense,
  onLicenseChange,
  customPrivKey,
  onCustomPrivChange,
  customPubKey,
  onCustomPubChange,
  customV4,
  onCustomV4Change,
  customV6,
  onCustomV6Change,
}: WarpKeySectionProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
          05 // WARP PROFILE & CRYPTO KEYPAIR
        </label>
        <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono font-medium text-cyan-300">
          X25519 Ready
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => onModeChange("free-auto")}
          className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
            mode === "free-auto"
              ? "border-cyan-500/60 bg-cyan-500/[0.08] shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/40"
              : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
          }`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-white text-xs">
              Free WARP Auto
            </div>
            <p className="text-[10px] text-slate-400">
              Clean generated IP & key
            </p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => onModeChange("warp-plus-key")}
          className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
            mode === "warp-plus-key"
              ? "border-blue-500/60 bg-blue-500/[0.08] shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/40"
              : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
          }`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-white text-xs">
              WARP+ License
            </div>
            <p className="text-[10px] text-slate-400">
              Attach zero-trust key
            </p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => onModeChange("custom-keypair")}
          className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
            mode === "custom-keypair"
              ? "border-purple-500/60 bg-purple-500/[0.08] shadow-lg shadow-purple-500/5 ring-1 ring-purple-500/40"
              : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
          }`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold text-white text-xs">
              Custom Keypair
            </div>
            <p className="text-[10px] text-slate-400">
              Manual private key & IP
            </p>
          </div>
        </motion.button>
      </div>

      {mode === "warp-plus-key" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-1"
        >
          <label className="block text-[11px] font-mono text-slate-400 mb-1">
            WARP+ LICENSE KEY
          </label>
          <input
            type="text"
            value={warpPlusLicense}
            onChange={(e) => onLicenseChange(e.target.value)}
            placeholder="xxxxxxxx-xxxxxxxx-xxxxxxxx"
            className="w-full rounded border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
          />
        </motion.div>
      )}

      {mode === "custom-keypair" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1"
        >
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              PRIVATE KEY (BASE64)
            </label>
            <input
              type="text"
              value={customPrivKey}
              onChange={(e) => onCustomPrivChange(e.target.value)}
              placeholder="YOUR_PRIVATE_KEY="
              className="w-full rounded border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              CLIENT IPv4 / IPv6 ADDRESS
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customV4}
                onChange={(e) => onCustomV4Change(e.target.value)}
                placeholder="172.16.0.2/32"
                className="w-1/2 rounded border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="text"
                value={customV6}
                onChange={(e) => onCustomV6Change(e.target.value)}
                placeholder="2606:4700:110:8f00::1/128"
                className="w-1/2 rounded border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
