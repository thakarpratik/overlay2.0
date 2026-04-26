"use client"

import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    style={{ color: '#94a3b8', textDecoration: 'none', fontFamily: "'DM Sans', system-ui, sans-serif" }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f8fafc'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.06)' }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(5,5,7,0.82)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/layerNow_Logo.svg" alt="OverlayNow" style={{ height: 36, width: 'auto' }} />
        </Link>

        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
          <NavLink href="/templates">Templates</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/tool/new" style={{
            padding: '7px 16px', borderRadius: 10,
            border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)',
            color: '#f8fafc', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            transition: 'background .2s',
          }} className="hidden sm:inline-flex">
            New project
          </Link>
          <Link href="/tool" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff', fontSize: '.8rem', fontWeight: 600,
            padding: '8px 18px', borderRadius: 999, textDecoration: 'none',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            boxShadow: '0 4px 16px rgba(99,102,241,.3)',
            transition: 'box-shadow .2s, transform .2s',
          }}>
            Open Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
