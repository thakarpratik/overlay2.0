import PageShell from "@/components/marketing/PageShell"

const PROSE = { fontSize: '.9rem', color: '#94a3b8', lineHeight: 1.75, fontFamily: "'DM Sans', system-ui, sans-serif" }
const H3 = { fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: 8 }

export default function Page() {
  return (
    <PageShell title="Privacy Policy" subtitle="Short placeholder — replace with your real policy before going live.">
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { h: "Image storage", p: "Your images are stored locally in your browser using IndexedDB. They are never uploaded to any server." },
          { h: "No tracking", p: "We do not use cookies, analytics scripts, or any third-party tracking on this tool." },
          { h: "Email collection", p: "If you enter your email to access the tool, it is used only to notify you of updates. We do not sell or share it." },
          { h: "Future changes", p: "If accounts or analytics are added later, this page will be updated to describe what data is collected and why." },
        ].map(({ h, p }) => (
          <div key={h} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '22px 20px' }}>
            <h3 style={H3}>{h}</h3>
            <p style={PROSE}>{p}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
