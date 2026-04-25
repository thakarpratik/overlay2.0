"use client"

import Link from "next/link"
import PageShell from "@/components/marketing/PageShell"

const INPUT_STYLE = {
  width: '100%', padding: '11px 16px', borderRadius: 10,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#f8fafc', fontSize: '.875rem', outline: 'none',
  fontFamily: "'DM Sans', system-ui, sans-serif",
  boxSizing: 'border-box' as const,
  transition: 'border-color .2s',
}

export default function Page() {
  return (
    <PageShell title="Contact" subtitle="Drop a note — we'll get back to you.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, maxWidth: 860 }}>
        {/* Form */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 20 }}>Send a message</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input style={INPUT_STYLE} placeholder="Name"
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input style={INPUT_STYLE} type="email" placeholder="Email"
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <textarea style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: 120 }} rows={5} placeholder="Message"
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff', fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600, fontSize: '.875rem', padding: '11px',
              borderRadius: 999, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,.3)', transition: 'opacity .2s',
            }}>
              Send message
            </button>
            <p style={{ fontSize: '.72rem', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>Wire this to your backend when ready.</p>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 14 }}>Quick links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Templates', '/templates'], ['Open Tool', '/tool'], ['Pricing', '/pricing'], ['Features', '/features']].map(([label, href]) => (
                <Link key={href} href={href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '.83rem', color: '#94a3b8', fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: 'background .2s, color .2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#f8fafc' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}
                >
                  {label}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 14, padding: '18px 20px' }}>
            <p style={{ fontSize: '.8rem', color: '#818cf8', lineHeight: 1.6, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              <strong style={{ color: '#a5b4fc' }}>Dev tip:</strong> If export fails, check the browser console for CORS/taint issues with external image URLs.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
