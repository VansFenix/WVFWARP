"use client";

import React, { useState } from "react";
import { DNS_PROVIDERS, DnsProvider } from "@/lib/warp-engine";
import { Check, ShieldAlert, Sparkles, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface DnsSelectorProps {
  selectedId: string;
  onSelect: (providerId: string) => void;
  customDns: string;
  onCustomDnsChange: (val: string) => void;
}

export function DnsSelector({
  selectedId,
  onSelect,
  customDns,
  onCustomDnsChange,
}: DnsSelectorProps) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "tier1-tspu" | "standard"
  >("tier1-tspu");

  const filteredProviders = DNS_PROVIDERS.filter((dns) => {
    if (activeFilter === "tier1-tspu") return dns.category === "tier1-tspu";
    if (activeFilter === "standard") return dns.category !== "tier1-tspu";
    return true;
  });

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
            02 // DNS CASCADE & TIER-1 TRANSIT
          </label>
          <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
            Smart DNS + Tier-1 транзит против ТСПУ: трафик размазывается по планете
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-lg p-0.5 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setActiveFilter("tier1-tspu")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeFilter === "tier1-tspu"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🔥 TIER-1 ТСПУ (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("standard")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeFilter === "standard"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            STANDARD DNS
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeFilter === "all"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ALL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProviders.map((dns: DnsProvider) => {
          const isSelected = selectedId === dns.id;
          const isCustom = dns.id === "custom";
          const isTier1 = dns.category === "tier1-tspu";

          return (
            <motion.div
              key={dns.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(dns.id)}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition-all ${
                isSelected
                  ? "border-emerald-500/70 bg-emerald-500/[0.09] shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/40"
                  : isTier1
                  ? "border-cyan-500/30 bg-cyan-500/[0.03] hover:border-cyan-500/50 hover:bg-cyan-500/[0.06]"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {isTier1 && (
                      <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                        TIER-1 ANTI-TSPU
                      </span>
                    )}
                    <span className="font-semibold text-white text-xs">
                      {dns.name}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-slate-950"
                    >
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </motion.div>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                  {dns.tagline}
                </p>

                {!isCustom ? (
                  <div className="flex flex-wrap gap-1">
                    {dns.servers.map((ip) => (
                      <span
                        key={ip}
                        className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-emerald-300"
                      >
                        {ip}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  >
                    <input
                      type="text"
                      value={customDns}
                      onChange={(e) => onCustomDnsChange(e.target.value)}
                      placeholder="e.g. 1.1.1.1, 8.8.8.8"
                      className="w-full rounded-lg border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
