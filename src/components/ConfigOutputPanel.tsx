"use client";

import React, { useState } from "react";
import { GeneratedConfigPayload } from "@/lib/warp-engine";
import {
  Copy,
  Download,
  QrCode,
  Share2,
  Check,
  Smartphone,
  Terminal,
  Shield,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ConfigOutputPanelProps {
  payload: GeneratedConfigPayload | null;
  loading: boolean;
  onGenerate: () => void;
}

export function ConfigOutputPanel({
  payload,
  loading,
  onGenerate,
}: ConfigOutputPanelProps) {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!payload) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-8 text-center sm:p-12 backdrop-blur-md"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 border border-cyan-500/20 shadow-inner">
          <Shield className="h-6 w-6 animate-pulse" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">
          WVFWARP Studio Ready
        </h3>
        <p className="max-w-xs text-xs text-slate-400 mb-6 leading-relaxed">
          Select your protocol, DNS server, and clean Anycast endpoint on the
          left, then click generate.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 transition-all"
        >
          {loading ? "GENERATING..." : "GENERATE NOW"}
        </motion.button>
      </motion.div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(payload.configText);
    setCopied(true);
    toast.success("Configuration copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([payload.configText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = payload.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${payload.filename}`);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${payload.shareToken}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#090d16]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl"
    >
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 uppercase">
              <Shield className="h-3 w-3" />
              {payload.protocol}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              DNS: {payload.dnsString}
            </span>
          </div>
          <h3 className="mt-1 text-sm font-extrabold text-white">
            {payload.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* QR Code button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setShowQr(true)}
            className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all"
            title="QR Code"
          >
            <QrCode className="h-3.5 w-3.5 text-cyan-400" />
            <span>QR</span>
          </motion.button>

          {/* Copy button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-cyan-400" />
                <span>COPY</span>
              </>
            )}
          </motion.button>

          {/* Share button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all"
          >
            <Share2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>SHARE</span>
          </motion.button>

          {/* Download button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>DOWNLOAD</span>
          </motion.button>
        </div>
      </div>

      {/* QR Code Popup Modal with Framer Motion */}
      <AnimatePresence>
        {showQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowQr(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#070b14] p-6 text-center shadow-2xl max-w-sm w-full"
            >
              <button
                onClick={() => setShowQr(false)}
                className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <h4 className="text-sm font-bold text-white mb-1">
                Scan with AmneziaWG / WireGuard
              </h4>
              <p className="text-[11px] text-slate-400 mb-4">
                Open AmneziaWG app on your phone & select Add Tunnel from QR
              </p>
              <div className="rounded-2xl bg-white p-4 shadow-xl">
                <QRCodeSVG
                  value={payload.qrContent}
                  size={190}
                  level="M"
                  includeMargin={true}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowQr(false)}
                className="mt-5 rounded-xl border border-white/10 bg-white/5 px-6 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10"
              >
                Close QR
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Dark Terminal Preview */}
      <div className="relative rounded-xl border border-white/[0.08] bg-[#03060c] overflow-hidden">
        {/* Minimal Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-500/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[11px] text-slate-400">
              {payload.filename}
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan-400/80">
            {payload.protocol}
          </span>
        </div>

        <pre className="max-h-72 overflow-x-auto overflow-y-auto p-4 font-mono text-[11px] leading-relaxed text-cyan-300/90">
          {payload.configText}
        </pre>
      </div>

      {/* Minimalist Connection Instructions */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
        <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
          <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
          <span>Setup Instructions</span>
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300 font-mono">
          {payload.instructions.map((step, idx) => (
            <li key={idx} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
