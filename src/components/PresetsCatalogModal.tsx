"use client";

import React, { useState, useEffect } from "react";
import { ObfuscationParams } from "@/lib/warp-engine";
import {
  X,
  Radio,
  ThumbsUp,
  PlusCircle,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface PresetsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset: (
    protocol: string,
    obf: ObfuscationParams,
    endpoint: string,
    dns: string
  ) => void;
}

export function PresetsCatalogModal({
  isOpen,
  onClose,
  onApplyPreset,
}: PresetsCatalogModalProps) {
  const [presets, setPresets] = useState<any[]>([]);
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formProtocol, setFormProtocol] = useState("amneziawg-2.0");
  const [formCategory, setFormCategory] = useState("AWG-2.0");
  const [jc, setJc] = useState(7);
  const [jmin, setJmin] = useState(50);
  const [jmax, setJmax] = useState(1000);
  const [s1, setS1] = useState(84);

  const fetchPresets = async (cat: string) => {
    setLoading(true);
    try {
      const url =
        cat === "ALL" ? "/api/presets" : `/api/presets?category=${cat}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.presets) {
        setPresets(data.presets);
      }
    } catch (e) {
      console.error("Presets error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPresets(category);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmitPreset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a name for your preset");
      return;
    }

    try {
      const params = {
        jc,
        jmin,
        jmax,
        s1,
        s2: 54,
        h1: 1778114400,
        h2: 1140023414,
        h3: 1883501258,
        h4: 1346001719,
        i1: "4cfa7107",
        i2: "64fa8331",
        i3: "21b36991",
        i4: "78b301aa",
      };

      const res = await fetch("/api/presets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          category: formCategory,
          protocol: formProtocol,
          params,
          recommendedEndpoint: "162.159.193.5:2408",
          recommendedDns: "1.1.1.1, 1.0.0.1",
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Community preset published!");
        setShowCreate(false);
        setName("");
        setDescription("");
        fetchPresets(category);
      } else {
        toast.error(data.error || "Failed to publish preset");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

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
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                <Radio className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-mono">
                  DPI OBFUSCATION CATALOG
                </h2>
                <p className="text-[11px] text-slate-400">
                  Tested parameters for bypassing TSPU & network DPI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="flex items-center gap-1.5 rounded-xl bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
              >
                <PlusCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span>{showCreate ? "BROWSE" : "SHARE PRESET"}</span>
              </button>

              <button
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Categories filter tabs */}
          {!showCreate && (
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/30 px-6 py-2 overflow-x-auto">
              {["ALL", "AWG-2.0", "AWG-1.5", "STEALTH", "GAMING"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3 py-1 text-[11px] font-mono font-semibold transition-all ${
                    category === cat
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Content body */}
          <div className="flex-1 overflow-y-auto p-6">
            {showCreate ? (
              <form
                onSubmit={handleSubmitPreset}
                className="space-y-4 max-w-lg mx-auto font-mono text-xs"
              >
                <h3 className="text-sm font-bold text-white">
                  PUBLISH COMMUNITY PRESET
                </h3>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    PRESET TITLE
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. MTS / Megafon Ultra AWG"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    DESCRIPTION
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="ISP or mobile carrier this works best on..."
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      PROTOCOL
                    </label>
                    <select
                      value={formProtocol}
                      onChange={(e) => setFormProtocol(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white"
                    >
                      <option value="amneziawg-2.0">AmneziaWG 2.0</option>
                      <option value="amneziawg-1.5">AmneziaWG 1.5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      CATEGORY
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white"
                    >
                      <option value="AWG-2.0">AWG-2.0</option>
                      <option value="AWG-1.5">AWG-1.5</option>
                      <option value="STEALTH">STEALTH</option>
                      <option value="GAMING">GAMING</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                  >
                    PUBLISH PRESET
                  </button>
                </div>
              </form>
            ) : loading ? (
              <div className="flex items-center justify-center py-12 text-slate-400 text-xs font-mono">
                LOADING PRESETS...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {presets.map((p) => {
                  const params = p.params || {};
                  return (
                    <motion.div
                      key={p.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:border-cyan-500/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-white text-xs">
                            {p.name}
                          </span>
                          {p.isOfficial && (
                            <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
                              OFFICIAL
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3 leading-tight">
                          {p.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3 font-mono text-[10px]">
                          <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-cyan-300">
                            Jc={params.jc || 7}
                          </span>
                          <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-emerald-300">
                            Jmin={params.jmin || 50}
                          </span>
                          <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-blue-300">
                            Jmax={params.jmax || 1000}
                          </span>
                          <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-purple-300">
                            S1={params.s1 || 84}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <ThumbsUp className="h-3 w-3 text-cyan-400" />
                          {p.likesCount} LIKES
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            onApplyPreset(
                              p.protocol || "amneziawg-2.0",
                              params,
                              p.recommendedEndpoint || "162.159.193.5:2408",
                              p.recommendedDns || "1.1.1.1, 1.0.0.1"
                            );
                            toast.success(`Applied preset: ${p.name}`);
                            onClose();
                          }}
                          className="flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-cyan-500/25 transition-all"
                        >
                          <Check className="h-3 w-3" />
                          <span>APPLY</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
