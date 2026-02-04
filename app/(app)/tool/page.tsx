"use client";

import Link from "next/link";

export default function ToolDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">

      {/* ── header row ── */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
            Dashboard
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: '#6b7280' }}>
            Manage and create overlay projects.
          </p>
        </div>

        <Link href="/tool/new"
          className="inline-flex items-center gap-2 rounded-full text-white text-sm font-semibold px-5 py-2.5 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" /><line x1="1" y1="7" x2="13" y2="7" />
          </svg>
          New project
        </Link>
      </div>

      {/* ── empty-state card ── */}
      <div className="mt-8 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
        style={{ background: 'rgba(30,32,42,0.45)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', minHeight: '320px' }}>

        {/* icon ring */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>

        <h2 className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          No projects yet
        </h2>
        <p className="mt-1.5 text-sm max-w-xs" style={{ color: '#6b7280' }}>
          Create your first overlay project — upload images, pick a template, and start editing.
        </p>

        <Link href="/tool/new"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full text-sm font-medium px-5 py-2.5 transition-all duration-200"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" /><line x1="1" y1="7" x2="13" y2="7" />
          </svg>
          Create a project
        </Link>
      </div>
    </div>
  );
}
