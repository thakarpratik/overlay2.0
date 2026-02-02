import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ 
      background: '#0c0e14', 
      borderTop: '1px solid rgba(255,255,255,0.07)', 
      padding: '32px 24px' 
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: 16 
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/layerNow_Logo.svg" 
            alt="OverlayTool" 
            style={{ height: 36, width: 'auto' }}
          />
        </Link>
        
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['About', 'Features', 'Pricing', 'Privacy', 'Terms', 'Contact'].map(link => (
            <Link 
              key={link} 
              href={`/${link.toLowerCase()}`} 
              style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280', 
                textDecoration: 'none', 
                transition: 'color 0.2s' 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#9ca3af')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            >
              {link}
            </Link>
          ))}
        </div>
        
        <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>
          © {new Date().getFullYear()} OverlayTool. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
