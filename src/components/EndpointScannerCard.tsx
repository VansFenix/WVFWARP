"use client";

import React, { useState, useEffect } from "react";
import {
  ENDPOINT_OPTIONS,
  EndpointOption,
  WARP_CUSTOM_PORTS,
} from "@/lib/warp-engine";
import { Zap, RefreshCw, Check, Globe, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EndpointScannerProps {
  selectedEndpointId: string;
  onSelectEndpoint: (id: string, address: string, port: number) => void;
  customAddress: string;
  customPort: number;
  onCustomChange: (addr: string, port: number) => void;
}

export function EndpointScannerCard({
  selectedEndpointId,
  onSelectEndpoint,
  customAddress,
  customPort,
  onCustomChange,
}: EndpointScannerProps) {
  const [latencies, setLatencies] = useState<Record<string, number>>({});
  const [loadingPing, setLoadingPing] = useState(false);
  const [showPortDrawer, setShowPortDrawer] = useState(false);
  const [selectedPort, setSelectedPort] = useState(2408);

  const runPingTest = async () => {
    setLoadingPing(true);
    try {
      const res = await fetch("/api/ping-endpoint");
      const data = await res.json();
      if (data.success && data.endpoints) {
        const map: Record<string, number> = {};
        data.endpoints.forEach((ep: any) => {
          map[ep.id] = ep.pingMs;
        });
        setLatencies(map);
      }
    } catch (e) {
      console.error("Ping error", e);
    } finally {
      setLoadingPing(false);
    }
  };

  useEffect(() => {
    runPingTest();
  }, []);

  const handleSelectWarpPort = (port: number) => {
    setSelectedPort(port);
    onSelectEndpoint(
      "cf-domain-default",
      "engage.cloudflareclient.com",
      port
    );
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
            03 // CLEAN ANYCAST & WARP PORT SELECTOR
          </label>
          <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
            engage.cloudflareclient.com:[PORT] — 50+ протестированных портов
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPortDrawer(!showPortDrawer)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-mono transition-all ${
              showPortDrawer
                ? "border-cyan-500 bg-cyan-500/20 text-cyan-300 font-bold"
                : "border-white/[0.08] bg-white/[0.03] text-cyan-400 hover:bg-white/[0.06]"
            }`}
          >
            <Shield className="h-3 w-3" />
            <span>
              {showPortDrawer
                ? "СКРЫТЬ ПОРТЫ"
                : `ВЫБРАТЬ ПОРТ WARP (${selectedPort})`}
            </span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={runPingTest}
            disabled={loadingPing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-cyan-400 hover:border-cyan-500/40 hover:bg-white/[0.06] disabled:opacity-50 transition-all"
          >
            <RefreshCw
              className={`h-3 w-3 ${loadingPing ? "animate-spin" : ""}`}
            />
            {loadingPing ? "PING..." : "TEST PING"}
          </motion.button>
        </div>
      </div>

      {/* 50+ WARP Ports Picker Drawer */}
      <AnimatePresence>
        {showPortDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-3 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-cyan-300">
                engage.cloudflareclient.com:[PORT] — выберите проверенный порт:
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Все порты поддерживают обход ТСПУ / DPI
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {WARP_CUSTOM_PORTS.map((port) => {
                const isSelected = selectedPort === port;
                return (
                  <button
                    key={port}
                    type="button"
                    onClick={() => handleSelectWarpPort(port)}
                    className={`rounded px-2 py-0.5 font-mono text-xs transition-all ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/50"
                        : "bg-black/50 text-slate-300 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-300"
                    }`}
                  >
                    :{port}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {ENDPOINT_OPTIONS.map((ep: EndpointOption) => {
          const isSelected = selectedEndpointId === ep.id;
          const ping = latencies[ep.id];
          const isCustom = ep.id === "custom-endpoint";

          return (
            <motion.div
              key={ep.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                if (!isCustom) {
                  onSelectEndpoint(ep.id, ep.address, ep.port);
                } else {
                  onSelectEndpoint(ep.id, customAddress, customPort);
                }
              }}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-3 transition-all ${
                isSelected
                  ? "border-cyan-500/60 bg-cyan-500/[0.08] shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/40"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-300">
                    {ep.badge}
                  </span>
                  {ping !== undefined ? (
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-semibold ${
                        ping < 22
                          ? "bg-cyan-500/15 text-cyan-300"
                          : ping < 30
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-blue-500/15 text-blue-300"
                      }`}
                    >
                      <Zap className="h-2 w-2" />
                      {ping}ms
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">
                      ---
                    </span>
                  )}
                </div>

                <div className="font-mono text-xs text-cyan-300 mb-1 font-semibold break-all">
                  {ep.label}
                </div>

                <p className="text-[11px] text-slate-400 leading-tight mb-1">
                  {ep.description}
                </p>

                {isCustom && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 space-y-1"
                  >
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={customAddress}
                        onChange={(e) =>
                          onCustomChange(e.target.value, customPort)
                        }
                        placeholder="IP Address / Domain"
                        className="w-full rounded border border-white/15 bg-black/40 px-2 py-1 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        value={customPort}
                        onChange={(e) =>
                          onCustomChange(
                            customAddress,
                            parseInt(e.target.value, 10) || 2408
                          )
                        }
                        placeholder="Port"
                        className="w-16 rounded border border-white/15 bg-black/40 px-2 py-1 font-mono text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
                >
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
