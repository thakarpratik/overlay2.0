'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

/* ─────────────────────────────────────────────
   DESIGN TOKENS (extracted from existing brand)
   ───────────────────────────────────────────── */
// Primary: #6366f1 (indigo)  Accent: #818cf8 (lighter indigo)
// Pink: #ec4899  Green: #22c55e  Orange: #f97316
// Bg dark: #0c0e14  Section: #0f1117  Card: rgba(30,32,42,0.55)
// Text: #fff  Muted: #6b7280  Sub: #9ca3af
// Font display: 'Playfair Display', Georgia, serif
// Font body: system-ui (kept lean, no extra import needed)

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
   ───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --clr-bg:        #0c0e14;
    --clr-section:   #0f1117;
    --clr-card:      rgba(30,32,42,0.55);
    --clr-border:    rgba(255,255,255,0.07);
    --clr-primary:   #6366f1;
    --clr-accent:    #818cf8;
    --clr-pink:      #ec4899;
    --clr-green:     #22c55e;
    --clr-text:      #ffffff;
    --clr-muted:     #6b7280;
    --clr-sub:       #9ca3af;
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body:    system-ui, -apple-system, sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--clr-bg); color: var(--clr-text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ── Scroll-triggered reveal ── */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── Sticky nav ── */
  .sticky-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between;
    background: rgba(12,14,20,0); backdrop-filter: blur(0px); border-bottom: 1px solid transparent;
    transition: background 0.4s, backdrop-filter 0.4s, border-color 0.4s; }
  .sticky-nav.scrolled { background: rgba(12,14,20,0.82); backdrop-filter: blur(16px); border-color: var(--clr-border); }
  
  /* ── Nav responsive ── */
  @media (min-width: 768px) {
    .md-nav-links { display: flex !important; }
    .new-project-btn { display: inline-flex !important; }
  }

  /* ── Ticker ── */
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .ticker-track { display: flex; animation: ticker 28s linear infinite; }
  .ticker-track:hover { animation-play-state: paused; }

  /* ── Hero text animate-in ── */
  @keyframes heroSlideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  .hero-line { opacity: 0; animation: heroSlideUp 0.8s cubic-bezier(.4,0,.2,1) forwards; }
  .hero-line:nth-child(1) { animation-delay: 0.1s; }
  .hero-line:nth-child(2) { animation-delay: 0.25s; }
  .hero-line:nth-child(3) { animation-delay: 0.4s; }
  .hero-line:nth-child(4) { animation-delay: 0.55s; }

  /* ── Text overlay shimmer ── */
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  .shimmer-text {
    background: linear-gradient(90deg, #fff 0%, #818cf8 40%, #fff 60%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  /* ── Feature icon glow on hover ── */
  .feature-card { transition: border-color 0.3s, transform 0.3s; }
  .feature-card:hover { border-color: rgba(99,102,241,0.35); transform: translateY(-2px); }
  .feature-icon { transition: box-shadow 0.3s; }
  .feature-card:hover .feature-icon { box-shadow: 0 0 20px rgba(99,102,241,0.3); }

  /* ── CTA button glow ── */
  .cta-btn { transition: box-shadow 0.3s, transform 0.2s; }
  .cta-btn:hover { box-shadow: 0 6px 32px rgba(99,102,241,0.5); transform: translateY(-1px); }
  .cta-btn:active { transform: translateY(0); }
`

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
   ───────────────────────────────────────────── */
function useReveal(ref: React.RefObject<HTMLDivElement>, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add('visible'), delay); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])
}

/* ─────────────────────────────────────────────
   STICKY NAV
   ───────────────────────────────────────────── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img 
          src="/layerNow_Logo.svg" 
          alt="OverlayTool" 
          style={{ height: 44, width: 'auto' }}
        />
      </Link>

      {/* Center nav links - hidden on mobile */}
      <div style={{ display: 'none', gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="md-nav-links">
        {[
          { label: 'Templates', href: '/templates' },
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 500,
            color: 'var(--clr-sub)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s'
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.target as HTMLElement).style.color = 'var(--clr-text)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = 'var(--clr-sub)' }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right CTAs */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href="/tool/new" className="new-project-btn" style={{
          display: 'none',
          padding: '7px 16px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 500,
          color: 'var(--clr-text)', textDecoration: 'none', border: '1px solid var(--clr-border)',
          background: 'rgba(255,255,255,0.03)', transition: 'background 0.2s'
        }}
          onMouseEnter={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
        >
          New project
        </Link>
        <Link href="/tool" className="cta-btn" style={{
          display: 'inline-flex',
          alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, var(--clr-primary), #4f46e5)',
          color: '#fff', fontSize: '0.8rem', fontWeight: 600, padding: '8px 18px', borderRadius: 10,
          textDecoration: 'none', boxShadow: '0 4px 20px rgba(99,102,241,0.3)'
        }}>
          Open Tool
        </Link>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      background: 'var(--clr-bg)', position: 'relative', overflow: 'hidden', paddingTop: 100, paddingBottom: 80
    }}>
      {/* Ambient gradient blobs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '45%', height: '45%', background: 'radial-gradient(ellipse, rgba(236,72,153,0.07) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(50px)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', textAlign: 'center' }}>

        {/* Centered Headline */}
        <h1 className="hero-line" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(3rem, 7vw, 6rem)', 
          lineHeight: 1.05, 
          fontWeight: 700, 
          color: 'var(--clr-text)', 
          letterSpacing: '-0.03em',
          marginBottom: 60
        }}>
          Put <span className="shimmer-text">words</span> on images.
        </h1>

        {/* Video Frame */}
        <div className="hero-line preview-pulse" style={{
          maxWidth: 900,
          margin: '0 auto',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
          background: 'var(--clr-card)',
          border: '1px solid var(--clr-border)',
          position: 'relative'
        }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/6GY8CoLyxoE?si=rXA1JSzrhuUv9Jnb&controls=0&autoplay=1&mute=1&loop=1&playlist=6GY8CoLyxoE"
              title="OverlayTool Demo"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-line" style={{ marginTop: 48, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tool" className="cta-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, var(--clr-primary), #4f46e5)',
            color: '#fff', fontSize: '0.95rem', fontWeight: 600, padding: '14px 32px', borderRadius: 999,
            textDecoration: 'none', boxShadow: '0 4px 24px rgba(99,102,241,0.35)'
          }}>
            Start creating free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </Link>
          <Link href="#showcase" style={{
            fontSize: '0.85rem', color: 'var(--clr-sub)', textDecoration: 'none', fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color 0.2s'
          }}>
            See examples <span style={{ fontSize: '0.7rem' }}>↓</span>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="hero-line" style={{ marginTop: 48, display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { val: '0', label: 'tracking' },
            { val: '3s', label: 'avg export' },
            { val: '∞', label: 'exports' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--clr-accent)' }}>{s.val}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--clr-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SOCIAL PROOF TICKER
   ───────────────────────────────────────────── */
const PROOF_ITEMS = [
  { text: 'Pinterest creators', icon: '📌' },
  { text: 'Recipe blogs', icon: '🍳' },
  { text: 'Instagram posts', icon: '📸' },
  { text: 'Motivational quotes', icon: '✨' },
  { text: 'Product launches', icon: '🚀' },
  { text: 'Travel content', icon: '✈️' },
  { text: 'Email newsletters', icon: '📧' },
  { text: 'YouTube thumbnails', icon: '▶️' },
]

function Ticker() {
  const doubled = [...PROOF_ITEMS, ...PROOF_ITEMS]
  return (
    <div style={{ overflow: 'hidden', padding: '28px 0', borderTop: '1px solid var(--clr-border)', borderBottom: '1px solid var(--clr-border)', background: 'var(--clr-section)' }}>
      <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 40px', flexShrink: 0 }}>
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--clr-sub)', fontWeight: 500, letterSpacing: '0.02em' }}>{item.text}</span>
            <span style={{ color: 'var(--clr-border)', fontSize: '0.5rem' }}>●</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   INTERACTIVE TEMPLATE SHOWCASE
   ───────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Recipes', icon: '🍳',
    items: [
      { bg: 'linear-gradient(145deg, #f97316, #dc2626 50%, #991b1b)', title: 'The Perfect\nGranola Recipe', sub: '5 ingredients · 20 min' },
      { bg: 'linear-gradient(140deg, #ea580c, #c2410c 60%, #9a3412)', title: 'Overnight\nOats', sub: '3 min · Make ahead' },
      { bg: 'linear-gradient(155deg, #ca8a04, #a16207 50%, #854d0e)', title: 'Honey Lemon\nDressing', sub: 'Homemade · 2 min' },
    ]
  },
  {
    label: 'Quotes', icon: '✨',
    items: [
      { bg: 'linear-gradient(160deg, #0d9488, #0f766e 40%, #134e4a)', title: '"Start before\nyou feel ready."', sub: '— Daily Motivation' },
      { bg: 'linear-gradient(150deg, #7c3aed, #6d28d9 50%, #4c1d95)', title: '"Do what you\ncan, with what\nyou have."', sub: '— T. Roosevelt' },
      { bg: 'linear-gradient(165deg, #1e40af, #1e3a8a 50%, #1e293b)', title: '"The only way\nis through."', sub: '— Robert Frost' },
    ]
  },
  {
    label: 'Travel', icon: '✈️',
    items: [
      { bg: 'linear-gradient(135deg, #7c3aed, #a78bfa 50%, #c4b5fd)', title: 'Top 5 Hidden\nGems in Bali', sub: 'Travel · Indonesia' },
      { bg: 'linear-gradient(140deg, #0891b2, #0e7490 50%, #155e75)', title: 'Tokyo in\n48 Hours', sub: 'Japan · Budget trip' },
      { bg: 'linear-gradient(150deg, #059669, #047857 50%, #065f46)', title: 'Amalfi Coast\nGuide', sub: 'Italy · Summer 2026' },
    ]
  },
  {
    label: 'Products', icon: '🚀',
    items: [
      { bg: 'linear-gradient(170deg, #1e293b, #0f172a)', title: 'NEW\nCollection', sub: 'Spring 2026 · Shop Now' },
      { bg: 'linear-gradient(155deg, #6366f1, #4f46e5 50%, #4338ca)', title: '50% OFF\nSummer Sale', sub: 'Limited time · Act now' },
      { bg: 'linear-gradient(145deg, #ec4899, #db2777 50%, #be185d)', title: 'Just\nDropped', sub: 'New arrivals · Shop' },
    ]
  },
]

function ShowcaseCard({ item, delay }: { item: { bg: string; title: string; sub: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref, delay)
  const lines = item.title.split('\n')

  return (
    <div ref={ref} className="reveal" style={{
      aspectRatio: '3/4', borderRadius: 18, background: item.bg, position: 'relative', overflow: 'hidden',
      cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', transition: 'transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s'
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(0,0,0,0.45)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
    >
      <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', top: -25, right: -25, background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px 20px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: lines.length > 2 ? '1rem' : '1.2rem', color: '#fff', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{line}</div>
        ))}
        <div style={{ marginTop: 8, fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.sub}</div>
      </div>
    </div>
  )
}

function Showcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)

  return (
    <section id="showcase" ref={ref} className="reveal" style={{ background: 'var(--clr-section)', padding: '100px 0 90px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '75%', height: 1, background: 'linear-gradient(90deg, transparent, var(--clr-border), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--clr-pink)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Templates</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: 'var(--clr-text)', marginTop: 8, letterSpacing: '-0.02em' }}>
              Pick a category.<br /><span style={{ color: 'var(--clr-accent)', fontStyle: 'italic' }}>See what&apos;s possible.</span>
            </h2>
          </div>
          <Link href="/tool" style={{ fontSize: '0.78rem', color: 'var(--clr-accent)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Browse all templates <span>→</span>
          </Link>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat.label} onClick={() => setActiveIdx(i)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
              background: i === activeIdx ? 'linear-gradient(135deg, var(--clr-primary), #4f46e5)' : 'rgba(30,32,42,0.6)',
              color: i === activeIdx ? '#fff' : 'var(--clr-sub)',
              boxShadow: i === activeIdx ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
              border: i === activeIdx ? 'none' : '1px solid var(--clr-border)',
              transition: 'all 0.25s ease'
            }}>
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, maxWidth: 820 }}>
          {CATEGORIES[activeIdx].items.map((item, i) => (
            <ShowcaseCard key={`${activeIdx}-${i}`} item={item} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
   ───────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Fluid resizing',
    desc: 'Drag, stretch, and squeeze overlays freely on all sides with pixel-perfect precision.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
      </svg>
    ),
    color: 'var(--clr-primary)'
  },
  {
    title: 'Full font control',
    desc: 'Choose from hundreds of fonts. Fine-tune size, weight, alignment, and letter spacing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    color: 'var(--clr-pink)'
  },
  {
    title: 'Zero tracking',
    desc: 'No telemetry. No cookies. No sign-up. Everything runs locally in your browser.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: 'var(--clr-green)'
  },
  {
    title: 'Instant export',
    desc: 'One click to download. PNG output ready for any platform — no compression, no quality loss.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    color: '#f59e0b'
  },
]

function Features() {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)

  return (
    <section ref={ref} className="reveal" style={{ background: 'var(--clr-bg)', padding: '100px 0 90px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '75%', height: 1, background: 'linear-gradient(90deg, transparent, var(--clr-border), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--clr-accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Features</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: 'var(--clr-text)', marginTop: 8, letterSpacing: '-0.02em' }}>
            Everything you need.<br /><span style={{ color: 'var(--clr-accent)', fontStyle: 'italic' }}>Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, delay }: { feature: typeof FEATURES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref, delay)

  return (
    <div ref={ref} className="reveal feature-card" style={{
      background: 'var(--clr-card)', border: '1px solid var(--clr-border)', borderRadius: 18,
      padding: '28px 24px', backdropFilter: 'blur(14px)'
    }}>
      <div className="feature-icon" style={{
        width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${feature.color}15`, color: feature.color, marginBottom: 18, transition: 'box-shadow 0.3s'
      }}>
        {feature.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--clr-text)', marginBottom: 8 }}>{feature.title}</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--clr-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FINAL CTA SECTION
   ───────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)

  return (
    <section ref={ref} className="reveal" style={{ background: 'var(--clr-section)', padding: '90px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '75%', height: 1, background: 'linear-gradient(90deg, transparent, var(--clr-border), transparent)' }} />
      {/* Glow blob */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70%', height: '80%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(30px)' }} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--clr-green)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ready?</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--clr-text)', marginTop: 12, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Create your first overlay<br /><span style={{ color: 'var(--clr-accent)', fontStyle: 'italic' }}>in under a minute.</span>
        </h2>
        <p style={{ marginTop: 16, fontSize: '0.9rem', color: 'var(--clr-muted)', maxWidth: 440, margin: '16px auto 0' }}>
          No account. No credit card. No bloated editor. Just open and start.
        </p>
        <Link href="/tool" className="cta-btn" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 36,
          background: 'linear-gradient(135deg, var(--clr-primary), #4f46e5)',
          color: '#fff', fontSize: '0.95rem', fontWeight: 600, padding: '14px 34px', borderRadius: 999,
          textDecoration: 'none', boxShadow: '0 4px 28px rgba(99,102,241,0.4)'
        }}>
          Open the editor for free
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </Link>
        <p style={{ marginTop: 18, fontSize: '0.7rem', color: 'var(--clr-muted)' }}>Works in any browser · Exports in 3 seconds</p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PAGE ROOT
   ───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background: 'var(--clr-bg)', minHeight: '100vh' }}>
      <GlobalStyles />
      <StickyNav />
      <Hero />
      <Ticker />
      <Showcase />
      <Features />
      <FinalCTA />
    </div>
  )
}
