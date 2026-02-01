"use client";

import Link from "next/link";

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold">OverlayTool</Link>
          <div className="text-sm text-neutral-600">Editor</div>
        </div>
      </header>
      {children}
    </div>
  );
}
