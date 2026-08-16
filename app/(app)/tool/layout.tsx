"use client";

import Navbar from "@/components/marketing/Navbar";

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      <Navbar />
      {children}
    </div>
  );
}
