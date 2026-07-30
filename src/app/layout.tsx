import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "WVFWARP — Anti-DPI WARP Config Generator (AmneziaWG 2.0, 1.5, Wiresocks, Clash)",
  description:
    "Fullstack WARP configuration studio with custom DNS selection, clean Anycast endpoints, AmneziaWG 2.0/1.5 DPI obfuscation, Wiresocks, Clash Meta YAML, and Sing-Box.",
  keywords: [
    "WVFWARP",
    "AmneziaWG",
    "AmneziaWG 2.0",
    "AmneziaWG 1.5",
    "Wiresocks",
    "Clash Meta",
    "Cloudflare WARP",
    "DPI Bypass",
    "TSPU",
    "WireGuard",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#0f172a",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#f1f5f9",
            },
          }}
        />
      </body>
    </html>
  );
}
