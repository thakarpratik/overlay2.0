"use client";

import Link from "next/link";

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      {/* ── sticky top bar ── */}
      <header className="sticky top-0 z-40" style={{ background: 'rgba(15,17,23,0.75)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {/* logo mark */}
            <span className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>O</span>
            <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              OverlayTool
            </span>
          </Link>

          <span className="text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
            Editor
          </span>
        </div>
      </header>

      {children}
    </div>
  );
}
