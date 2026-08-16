import PageShell from "@/components/marketing/PageShell"

const PROSE = { fontSize: '.9rem', color: '#94a3b8', lineHeight: 1.75, fontFamily: "'DM Sans', system-ui, sans-serif" }
const H3 = { fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: 8 }

export default function Page() {
  return (
    <PageShell title="Privacy Policy" subtitle="How OverlayNow handles images, email, and analytics.">
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { h: "Image storage", p: "Your project images are stored locally in your browser using IndexedDB. They are not uploaded to OverlayNow servers." },
          { h: "Analytics", p: "We use Google Analytics (gtag, measurement ID G-WSYW9TRG0H) and Vercel Analytics to understand traffic and product usage. These services may set cookies or collect device and page-view data." },
          { h: "Email collection", p: "If you enter your email to access the tool or send a contact message, we send it to Loops so we can notify you of updates and reply. We do not sell your email." },
          { h: "Local project data", p: "Editor settings such as layers, brand kit, and the current image index are saved in your browser (localStorage) so your work survives a refresh." },
          { h: "Changes", p: "If we add accounts or change processors, this page will be updated to describe what is collected and why." },
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
