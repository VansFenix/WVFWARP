"use client";

import React, { useState, useEffect, use } from "react";
import { ConfigOutputPanel } from "@/components/ConfigOutputPanel";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { GeneratedConfigPayload } from "@/lib/warp-engine";
import { motion } from "framer-motion";

export default function SharedConfigPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [payload, setPayload] = useState<GeneratedConfigPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadShared() {
      try {
        const res = await fetch(`/api/config/${token}`);
        const data = await res.json();
        if (data.success && data.payload) {
          setPayload(data.payload);
        } else {
          setError(data.error || "Configuration not found");
        }
      } catch (e) {
        setError("Failed to load configuration");
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      loadShared();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 font-mono">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO WVFWARP STUDIO
          </Link>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-400">
              SHARED TUNNEL PROFILE
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mb-3" />
            <p className="text-xs">LOADING SHARED WARP SHIELD...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center"
          >
            <h3 className="text-base font-bold text-white mb-2">{error}</h3>
            <p className="text-xs text-slate-400 mb-4">
              This link may have expired or the share token is invalid.
            </p>
            <Link
              href="/"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950"
            >
              CREATE NEW WVFWARP CONFIG
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-white">
                    {payload?.title}
                  </h1>
                  <p className="text-xs text-slate-400">
                    Shared via WVFWARP Anti-DPI Studio
                  </p>
                </div>
              </div>
            </div>

            <ConfigOutputPanel
              payload={payload}
              loading={false}
              onGenerate={() => {}}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
