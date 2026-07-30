"use client";

import React, { useState, useEffect } from "react";
import { X, History, Calendar, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShareToken: (token: string) => void;
}

export function HistoryModal({
  isOpen,
  onClose,
  onSelectShareToken,
}: HistoryModalProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (data.success && data.history) {
        setHistory(data.history);
      }
    } catch (e) {
      console.error("History error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

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
          className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#080c14] shadow-2xl flex flex-col font-mono"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                <History className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">
                  RECENT CONFIGURATION HISTORY
                </h2>
                <p className="text-[11px] text-slate-400">
                  Stored in local SQLite database
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

          {/* Content body */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-slate-400 text-xs">
                LOADING HISTORY...
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <History className="h-8 w-8 text-slate-600 mb-2" />
                <p className="text-xs text-slate-300">
                  NO CONFIGURATIONS GENERATED YET
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:border-cyan-500/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-white text-xs">
                          {item.title}
                        </span>
                        <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 border border-cyan-500/30 uppercase">
                          {item.protocol}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-400 mb-3">
                        <div>EP: {item.endpoint}</div>
                        <div>DNS: {item.dnsProvider}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectShareToken(item.shareToken);
                          onClose();
                        }}
                        className="flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/25 transition-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>LOAD</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t border-white/[0.08] px-6 py-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-1.5 text-xs text-slate-300 hover:bg-white/10"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
