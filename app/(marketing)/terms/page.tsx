import PageShell from "@/components/marketing/PageShell"

const PROSE = { fontSize: '.9rem', color: '#94a3b8', lineHeight: 1.75, fontFamily: "'DM Sans', system-ui, sans-serif" }
const H3 = { fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: 8 }

export default function Page() {
  return (
    <PageShell title="Terms of Use" subtitle="Short placeholder — replace with your real terms before going live.">
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { h: "Use at your own risk", p: 'This tool is provided "as is" without warranties of any kind. You are responsible for the content you create and export.' },
          { h: "Templates", p: "Templates are included for demo purposes. If you sell or license templates, add the appropriate licensing details here." },
          { h: "Content responsibility", p: "You retain ownership of your images and created content. Do not use the tool to create content that violates applicable laws." },
          { h: "Changes", p: "We may update these terms as the product evolves. Continued use after changes constitutes acceptance." },
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
