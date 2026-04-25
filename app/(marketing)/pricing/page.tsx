import Link from "next/link"
import PageShell from "@/components/marketing/PageShell"

const tiers = [
  {
    name: "Free",
    price: "$0",
    sub: "forever",
    bullets: ["All templates", "Export PNG", "2:3 canvas", "Local storage (no uploads)"],
    cta: "Start free",
    href: "/tool",
    primary: false,
  },
  {
    name: "Creator",
    price: "$9",
    sub: "per month",
    bullets: ["Everything in Free", "Brand Kit presets", "Batch ZIP export", "Priority support"],
    cta: "Upgrade",
    href: "/tool",
    primary: true,
    badge: "Most popular",
  },
  {
    name: "Team",
    price: "$29",
    sub: "per month",
    bullets: ["Everything in Creator", "Shared brand kits", "Workspaces", "Priority exports"],
    cta: "Contact us",
    href: "/contact",
    primary: false,
  },
]

export default function Page() {
  return (
    <PageShell title="Pricing" subtitle="Simple, transparent pricing. Start free — upgrade when you need more." cta={{ label: "Open tool", href: "/tool" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, maxWidth: 860 }}>
        {tiers.map((t) => (
          <div key={t.name} style={{
            background: t.primary ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.04)',
            border: t.primary ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: '28px 24px', position: 'relative',
            boxShadow: t.primary ? '0 0 48px rgba(99,102,241,0.12)' : 'none',
          }}>
            {t.badge && (
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: '#fff', fontSize: '.65rem', fontWeight: 700,
                padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap',
                fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}>{t.badge}</div>
            )}

            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, color: '#94a3b8', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>{t.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1 }}>{t.price}</span>
              <span style={{ fontSize: '.8rem', color: '#64748b', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{t.sub}</span>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {t.bullets.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.85rem', color: '#cbd5e1', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round"><path d="M3 8l3.5 3.5L13 4"/></svg>
                  {b}
                </li>
              ))}
            </ul>

            <Link href={t.href} style={{
              display: 'block', textAlign: 'center', padding: '11px',
              borderRadius: 999, textDecoration: 'none',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '.875rem', fontWeight: 600,
              background: t.primary ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255,255,255,0.06)',
              color: t.primary ? '#fff' : '#cbd5e1',
              border: t.primary ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: t.primary ? '0 4px 20px rgba(99,102,241,.35)' : 'none',
              transition: 'opacity .2s',
            }}>
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 24, fontSize: '.78rem', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        Stripe integration coming soon. All tiers unlock immediately on launch.
      </p>
    </PageShell>
  )
}
