"use client";

import Link from "next/link";

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <header className="sticky top-0 z-40" style={{ background: 'rgba(5,5,7,0.82)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/layerNow_Logo.svg"
              alt="OverlayNow"
              style={{ height: 34, width: 'auto', transition: 'opacity .2s' }}
              className="group-hover:opacity-75"
            />
          </Link>

          <span style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em',
            textTransform: 'uppercase', padding: '4px 14px', borderRadius: 999,
            background: 'rgba(99,102,241,0.12)', color: '#818cf8',
            border: '1px solid rgba(99,102,241,0.22)',
          }}>
            Editor
          </span>
        </div>
      </header>

      {children}
    </div>
  );
}
