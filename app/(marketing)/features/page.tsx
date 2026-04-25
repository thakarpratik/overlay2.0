"use client"

import PageShell from "@/components/marketing/PageShell"

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: '24px 22px',
  transition: 'border-color .25s, background .25s',
}

const items = [
  { title: "Template gallery", desc: "Search, categories, and preview background styles — Colorful, Neutral, or Dark.", icon: "◈", color: "#6366f1" },
  { title: "Editor layers", desc: "Drag to move, resize handles on all sides, layer panel, and quick selection.", icon: "⊞", color: "#818cf8" },
  { title: "Brand Kit", desc: "Set your font + colors once and apply them to selected or all layers instantly.", icon: "◎", color: "#ec4899" },
  { title: "Text styling", desc: "Line-height, letter spacing, shadow, and outline for maximum readability.", icon: "Aa", color: "#f59e0b" },
  { title: "Export", desc: "Export the current image as PNG or download all images as a ZIP in one click.", icon: "↓", color: "#22c55e" },
  { title: "Local storage", desc: "Images saved in IndexedDB — no upload, no server, no quota issues.", icon: "⬡", color: "#38bdf8" },
]

export default function Page() {
  return (
    <PageShell
      title="Features"
      subtitle="Everything you need to create social overlays quickly — without heavy bloat."
      cta={{ label: "Open tool", href: "/tool" }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {items.map((item) => (
          <div key={item.title} style={CARD_STYLE}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 700, color: item.color,
              background: `${item.color}18`, border: `1px solid ${item.color}30`,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}>{item.icon}</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, color: '#f8fafc', fontSize: '.95rem', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: '.83rem', color: '#94a3b8', lineHeight: 1.65, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
