import Link from 'next/link'

const LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Templates', href: '/templates' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#050507',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '40px 24px',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 28,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/layerNow_Logo.svg" alt="OverlayNow" style={{ height: 34, width: 'auto' }} />
          </Link>

          <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontSize: '.75rem', color: '#64748b', textDecoration: 'none',
                padding: '4px 10px', borderRadius: 6,
                fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 500,
                transition: 'color .2s, background .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: '.72rem', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            © {new Date().getFullYear()} OverlayNow. All rights reserved.
          </span>
          <span style={{ fontSize: '.72rem', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            Built for creators. No account required.
          </span>
        </div>
      </div>
    </footer>
  )
}
