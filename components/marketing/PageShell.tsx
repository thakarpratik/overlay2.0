import Link from "next/link"

export default function PageShell({
  title,
  subtitle,
  children,
  cta,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  cta?: { label: string; href: string }
}) {
  return (
    <div style={{ background: '#050507', minHeight: 'calc(100vh - 61px)' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700,
            color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>{title}</h1>

          {subtitle && (
            <p style={{
              marginTop: 14, fontSize: '1rem', color: '#94a3b8',
              maxWidth: 600, lineHeight: 1.7,
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>{subtitle}</p>
          )}

          {cta && (
            <div style={{ marginTop: 24 }}>
              <Link href={cta.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: '#fff', fontSize: '.875rem', fontWeight: 600,
                padding: '11px 26px', borderRadius: 999, textDecoration: 'none',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                boxShadow: '0 4px 20px rgba(99,102,241,.35)',
              }}>
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '48px 24px 80px' }}>
        {children}
      </div>
    </div>
  )
}
