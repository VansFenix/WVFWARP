"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ProtocolSelector, ProtocolType } from "@/components/ProtocolSelector";
import { DnsSelector } from "@/components/DnsSelector";
import { EndpointScannerCard } from "@/components/EndpointScannerCard";
import { ObfuscationStudio } from "@/components/ObfuscationStudio";
import { WarpKeySection } from "@/components/WarpKeySection";
import { ConfigOutputPanel } from "@/components/ConfigOutputPanel";
import { PresetsCatalogModal } from "@/components/PresetsCatalogModal";
import { ClientGuideModal } from "@/components/ClientGuideModal";
import { HistoryModal } from "@/components/HistoryModal";
import {
  ObfuscationParams,
  DEFAULT_OBFUSCATION_PARAMS,
  GeneratedConfigPayload,
} from "@/lib/warp-engine";
import {
  Shield,
  Zap,
  Radio,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Globe,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function WvfWarpHomePage() {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState("generator");
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Generator State
  const [configTitle, setConfigTitle] = useState("");
  const [protocol, setProtocol] = useState<ProtocolType>("amneziawg-2.0");
  const [dnsProviderId, setDnsProviderId] = useState("tier1-combo-5");
  const [customDnsServers, setCustomDnsServers] = useState("1.1.1.1, 8.8.8.8");
  const [endpointId, setEndpointId] = useState("cf-ip-2");
  const [endpointAddress, setEndpointAddress] = useState("162.159.193.5");
  const [endpointPort, setEndpointPort] = useState(2408);
  const [mtu, setMtu] = useState(1280);
  const [reservedBits, setReservedBits] = useState("[0, 0, 0]");
  const [routingMode, setRoutingMode] = useState<
    "all" | "exclude-lan" | "custom-ips"
  >("all");

  // Obfuscation state
  const [obfuscation, setObfuscation] = useState<ObfuscationParams>({
    ...DEFAULT_OBFUSCATION_PARAMS["awg2.0-default"],
  });

  // WARP Account / Key mode
  const [warpKeyMode, setWarpKeyMode] = useState<
    "free-auto" | "warp-plus-key" | "custom-keypair"
  >("free-auto");
  const [warpPlusLicense, setWarpPlusLicense] = useState("");
  const [customPrivateKey, setCustomPrivateKey] = useState("");
  const [customPublicKey, setCustomPublicKey] = useState(
    "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo="
  );
  const [customClientV4, setCustomClientV4] = useState("172.16.0.2/32");
  const [customClientV6, setCustomClientV6] = useState(
    "2606:4700:110:8f00:0:0:0:1/128"
  );

  // Result state
  const [generating, setGenerating] = useState(false);
  const [resultPayload, setResultPayload] =
    useState<GeneratedConfigPayload | null>(null);

  const handleProtocolSelect = (p: ProtocolType) => {
    setProtocol(p);
    if (p === "amneziawg-1.5") {
      setObfuscation({ ...DEFAULT_OBFUSCATION_PARAMS["awg1.5-classic"] });
    } else if (p === "amneziawg-2.0") {
      setObfuscation({ ...DEFAULT_OBFUSCATION_PARAMS["awg2.0-default"] });
    }
  };

  const handleGenerateConfig = async () => {
    setGenerating(true);
    try {
      const payloadBody = {
        title:
          configTitle ||
          `WVFWARP ${protocol.toUpperCase()} Shield — ${dnsProviderId}`,
        protocol,
        dnsProviderId,
        customDnsServers,
        endpointAddress,
        endpointPort,
        mtu,
        obfuscation,
        warpKeyMode,
        warpPlusLicense,
        customPrivateKey,
        customPublicKey,
        customClientV4,
        customClientV6,
        reservedBits,
        routingMode,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      const data = await res.json();
      if (data.success) {
        setResultPayload(data);
        toast.success(
          `Generated ${data.filename} (${data.protocol}) successfully!`
        );
        setTimeout(() => {
          document
            .getElementById("preview-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        toast.error(data.error || "Failed to generate configuration");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred generating configuration");
    } finally {
      setGenerating(false);
    }
  };

  const handleApplyPreset = (
    proto: string,
    params: ObfuscationParams,
    ep: string,
    dns: string
  ) => {
    if (
      proto === "amneziawg-2.0" ||
      proto === "amneziawg-1.5" ||
      proto === "wiresocks" ||
      proto === "clash-meta" ||
      proto === "sing-box" ||
      proto === "wireguard"
    ) {
      setProtocol(proto as any);
    }
    setObfuscation({
      ...obfuscation,
      ...params,
    });
    if (ep && ep.includes(":")) {
      const [a, portStr] = ep.split(":");
      setEndpointAddress(a);
      setEndpointPort(parseInt(portStr || "2408", 10));
    }
  };

  const handleLoadFromShareToken = async (token: string) => {
    try {
      const res = await fetch(`/api/config/${token}`);
      const data = await res.json();
      if (data.success && data.payload) {
        setResultPayload(data.payload);
        toast.success("Loaded configuration from history!");
        setTimeout(() => {
          document
            .getElementById("preview-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        toast.error("Could not load configuration");
      }
    } catch (e) {
      toast.error("Failed to fetch configuration");
    }
  };

  useEffect(() => {
    handleGenerateConfig();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      <main className="flex-1">
        {/* Minimalist Dark Hero Section */}
        <section className="relative overflow-hidden border-b border-white/[0.06] pt-10 pb-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              {/* Minimalist Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-mono font-semibold text-cyan-300 mb-4 shadow-sm shadow-cyan-500/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>ANTI-DPI WARP SUITE // 2026 EDITION</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-black tracking-tight text-white sm:text-6xl font-mono"
              >
                WVF<span className="text-cyan-400">WARP</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 max-w-xl text-xs sm:text-sm text-slate-400 leading-relaxed font-mono"
              >
                Generate high-speed Cloudflare WARP tunnels for{" "}
                <span className="text-cyan-300">AmneziaWG 2.0</span>,{" "}
                <span className="text-cyan-300">AmneziaWG 1.5</span>,{" "}
                <span className="text-purple-300">Wiresocks</span>,{" "}
                <span className="text-emerald-300">Clash Meta</span>, and{" "}
                <span className="text-amber-300">Sing-Box</span> with Tier-1 Smart
                DNS cascades, clean Anycast endpoints & anti-TSPU junk headers.
              </motion.p>

              {/* Minimalist Quick Feature Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-300"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                  6 Tier-1 Smart DNS Связок
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  50+ WARP Портов (864, 859, 7103...)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 text-purple-400" />
                  Пресеты Мусора (3/4/911, 118/22/1000)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 text-amber-400" />
                  MTU 1280 - 1500
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Studio Grid */}
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Generator Configuration Controls */}
            <div className="space-y-6 lg:col-span-7">
              {/* Optional Title input */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 backdrop-blur-md">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  PROFILE NAME // LABEL (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={configTitle}
                  onChange={(e) => setConfigTitle(e.target.value)}
                  placeholder={`e.g. WVFWARP ${protocol.toUpperCase()} Shield — My Device`}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* 1. Protocol selector */}
              <ProtocolSelector
                selected={protocol}
                onSelect={handleProtocolSelect}
              />

              {/* 2. DNS selector */}
              <DnsSelector
                selectedId={dnsProviderId}
                onSelect={setDnsProviderId}
                customDns={customDnsServers}
                onCustomDnsChange={setCustomDnsServers}
              />

              {/* 3. Endpoint scanner */}
              <EndpointScannerCard
                selectedEndpointId={endpointId}
                onSelectEndpoint={(id, addr, port) => {
                  setEndpointId(id);
                  setEndpointAddress(addr);
                  setEndpointPort(port);
                }}
                customAddress={endpointAddress}
                customPort={endpointPort}
                onCustomChange={(addr, port) => {
                  setEndpointAddress(addr);
                  setEndpointPort(port);
                }}
              />

              {/* 4. Obfuscation Studio */}
              <ObfuscationStudio
                protocol={protocol}
                obf={obfuscation}
                onChange={setObfuscation}
                mtu={mtu}
                onMtuChange={setMtu}
                reservedBits={reservedBits}
                onReservedBitsChange={setReservedBits}
                routingMode={routingMode}
                onRoutingModeChange={setRoutingMode}
              />

              {/* 5. WARP Account & Keys */}
              <WarpKeySection
                mode={warpKeyMode}
                onModeChange={setWarpKeyMode}
                warpPlusLicense={warpPlusLicense}
                onLicenseChange={setWarpPlusLicense}
                customPrivKey={customPrivateKey}
                onCustomPrivChange={setCustomPrivateKey}
                customPubKey={customPublicKey}
                onCustomPubChange={setCustomPublicKey}
                customV4={customClientV4}
                onCustomV4Change={setCustomClientV4}
                customV6={customClientV6}
                onCustomV6Change={setCustomClientV6}
              />

              {/* Big Generate Button */}
              <div className="pt-1">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleGenerateConfig}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-4 text-sm font-mono font-bold text-white shadow-xl shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 transition-all"
                >
                  <Sparkles className="h-4.5 w-4.5" />
                  <span>
                    {generating
                      ? "GENERATING WARP CONFIGURATION..."
                      : `GENERATE ${protocol.toUpperCase()} SHIELD NOW`}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Right Column: Live Output Preview & QR Code */}
            <div
              id="preview-section"
              className="space-y-6 lg:col-span-5 lg:sticky lg:top-20 lg:self-start"
            >
              <ConfigOutputPanel
                payload={resultPayload}
                loading={generating}
                onGenerate={handleGenerateConfig}
              />

              {/* Smart DNS & Tier-1 TSPU Bypass Cheat Sheet Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-4 font-mono">
                <h4 className="text-xs font-bold text-cyan-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>ПОСТ-ШПАРГАЛКА: SMART DNS + TIER-1 ТРАНЗИТ</span>
                </h4>
                <p className="text-[11px] text-slate-300 mb-2 leading-relaxed font-sans">
                  Комбинация Smart DNS и тяжелого Tier-1 транзита идеальна против
                  ТСПУ. Трафик буквально размазывается по планете, лишая
                  DPI-комплексы любых шансов на фиксацию таймингов или
                  вычисление сигнатур.
                </p>
                <div className="space-y-1 text-[10px] text-slate-400 border-t border-white/10 pt-2">
                  <div>
                    🔥 <strong className="text-white">Связка 1:</strong> Comss,
                    Lumen, NTT, HE, Cogent
                  </div>
                  <div>
                    🔥 <strong className="text-white">Связка 2:</strong> Comss,
                    Arelion, Telenor, DT (Европа)
                  </div>
                  <div>
                    🔥 <strong className="text-white">Связка 5:</strong> Comss
                    Dual, NTT Japan, Lumen, Verizon, DT, Cogent (Восток-Европа
                    диссонанс)
                  </div>
                </div>
              </div>

              {/* Quick Resources Card */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                <h4 className="text-xs font-mono font-bold text-white mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                  <span>CLIENT APPS & PRESETS</span>
                </h4>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  WVFWARP works natively with AmneziaWG 2.0 / 1.5 mobile &
                  desktop clients, Wiresocks, Mihomo, and Sing-Box.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIsGuideOpen(true)}
                    className="flex items-center gap-1 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-white/10 transition-all"
                  >
                    <span>CLIENT SETUP GUIDE</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPresetsOpen(true)}
                    className="flex items-center gap-1 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1.5 text-[11px] font-mono font-semibold text-purple-300 hover:bg-white/10 transition-all"
                  >
                    <span>DPI PRESETS</span>
                    <Radio className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimalist Dark Footer */}
      <footer className="border-t border-white/[0.06] bg-[#03060c] py-6 text-center text-xs font-mono text-slate-500">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">WVFWARP // 2.5 PRO</span>
            <span>•</span>
            <span>AmneziaWG • Wiresocks • Clash Meta • Sing-Box</span>
          </div>
          <div>Cloudflare WARP Anycast • Tier-1 Smart DNS Cascades</div>
        </div>
      </footer>

      {/* Modals */}
      <PresetsCatalogModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onApplyPreset={handleApplyPreset}
      />

      <ClientGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectShareToken={handleLoadFromShareToken}
      />
    </div>
  );
}
