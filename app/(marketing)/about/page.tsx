import PageShell from "@/components/marketing/PageShell"

const PROSE = { fontSize: '.92rem', color: '#94a3b8', lineHeight: 1.75, fontFamily: "'DM Sans', system-ui, sans-serif" }

export default function Page() {
  return (
    <PageShell
      title="About"
      subtitle="OverlayNow is a lightweight editor focused on one thing: making great-looking overlays fast."
      cta={{ label: "Browse templates", href: "/templates" }}
    >
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 12 }}>The idea</h2>
          <p style={PROSE}>The goal is a simple workflow for creators: choose a template, apply your brand kit, export in batches, and post. No bloated editor, no sign-up, no tracking.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 12 }}>Where we are</h2>
          <p style={PROSE}>Current canvas is 2:3 (1000×1500) — perfect for Pinterest pins and vertical social formats. Next iterations will add more canvas sizes, brand presets, and an improved template management system.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 12 }}>Privacy first</h2>
          <p style={PROSE}>Your images never leave your device. Everything runs in the browser using IndexedDB — no server uploads, no analytics, no third-party tracking.</p>
        </div>
      </div>
    </PageShell>
  )
}
