'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #050507;
    --bg2:       #080a10;
    --card:      rgba(255,255,255,0.04);
    --card-hov:  rgba(255,255,255,0.07);
    --border:    rgba(255,255,255,0.08);
    --border-hov:rgba(255,255,255,0.18);
    --primary:   #6366f1;
    --primary2:  #4f46e5;
    --accent:    #818cf8;
    --pink:      #ec4899;
    --green:     #22c55e;
    --amber:     #f59e0b;
    --text:      #f8fafc;
    --muted:     #94a3b8;
    --sub:       #64748b;
    --font-h:   'Space Grotesk', system-ui, sans-serif;
    --font-b:   'DM Sans', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-b);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
  .reveal.in { opacity: 1; transform: none; }

  @keyframes slideUp { from { opacity:0; transform:translateY(44px) } to { opacity:1; transform:none } }
  .su  { opacity:0; animation: slideUp .9s cubic-bezier(.4,0,.2,1) forwards; }
  .su1 { animation-delay:.05s }
  .su2 { animation-delay:.18s }
  .su3 { animation-delay:.30s }
  .su4 { animation-delay:.44s }
  .su5 { animation-delay:.56s }

  .grad {
    background: linear-gradient(135deg, #fff 0%, #818cf8 50%, #fff 100%);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 4s linear infinite;
  }
  @keyframes gradShift { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }

  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .ticker-inner { display:flex; animation:ticker 32s linear infinite; }
  .ticker-inner:hover { animation-play-state:paused; }

  .glass {
    background: var(--card);
    border: 1px solid var(--border);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    transition: background .25s, border-color .25s, transform .3s, box-shadow .3s;
  }
  .glass:hover { background: var(--card-hov); border-color: var(--border-hov); }

  .feat-card { transition: border-color .3s, transform .3s, box-shadow .3s; }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,.5); }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--primary), var(--primary2));
    color: #fff; font-family: var(--font-h); font-size: .875rem; font-weight: 600;
    padding: 12px 28px; border-radius: 999px; text-decoration: none;
    box-shadow: 0 4px 24px rgba(99,102,241,.35);
    transition: box-shadow .25s, transform .2s;
    cursor: pointer; border: none;
  }
  .btn-primary:hover { box-shadow: 0 8px 36px rgba(99,102,241,.55); transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    color: var(--muted); font-family: var(--font-b); font-size: .875rem; font-weight: 500;
    padding: 12px 24px; border-radius: 999px; text-decoration: none;
    border: 1px solid var(--border); background: rgba(255,255,255,.03);
    transition: background .2s, color .2s, border-color .2s; cursor: pointer;
  }
  .btn-ghost:hover { background: rgba(255,255,255,.07); color: var(--text); border-color: var(--border-hov); }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 999px;
    border: 1px solid var(--border); background: rgba(255,255,255,.04);
    font-size: .7rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
    color: var(--muted); backdrop-filter: blur(10px);
  }

  .divider { width: 75%; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); margin: 0 auto; }
  .section { padding: 96px 0; position: relative; }

  @keyframes ping { 75%,100%{transform:scale(2);opacity:0} }
  .ping { animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }

  .bento-card { position:relative; overflow:hidden; }

  #progress-bar {
    position:fixed; top:0; left:0; height:2px; z-index:200;
    background: linear-gradient(90deg, var(--primary), var(--pink));
    transition: width .1s linear;
  }

  @media (min-width:768px) {
    .md-flex { display:flex !important; }
    .md-3col { grid-template-columns: repeat(3,1fr) !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal, .su, .ticker-inner, .grad { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; }
  }
`

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
}

function useReveal(ref: React.RefObject<HTMLDivElement>, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add('in'), delay); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
}

/* ─── SCROLL PROGRESS ───────────────────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setW((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="progress-bar" style={{ width: `${w}%` }} />
}

/* ─── HERO ───────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden',
      padding: '72px 24px 80px',
    }}>
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-15%', width: '55%', height: '55%', background: 'radial-gradient(ellipse, rgba(99,102,241,.14) 0%, transparent 68%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(ellipse, rgba(236,72,153,.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: '5%', width: '25%', height: '25%', background: 'radial-gradient(ellipse, rgba(129,140,248,.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .3,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
      }} />

      <div style={{ maxWidth: 860, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div className="su su1" style={{ marginBottom: 28 }}>
          <span className="badge">
            <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
              <span className="ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', opacity: .75 }} />
              <span style={{ position: 'relative', borderRadius: '50%', width: 8, height: 8, background: 'var(--green)', display: 'inline-block' }} />
            </span>
            Free to use · No account required
          </span>
        </div>

        {/* Headline */}
        <h1 className="su su2" style={{
          fontFamily: 'var(--font-h)',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.035em',
          color: 'var(--text)', marginBottom: 28,
        }}>
          Put <span className="grad">words</span> on images.<br />
          <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '88%' }}>In seconds. For free.</span>
        </h1>

        {/* Sub */}
        <p className="su su3" style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'var(--muted)',
          lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px', fontFamily: 'var(--font-b)',
        }}>
          OverlayNow is the fastest way to add text, logos, and graphics to any image — no sign-up, no bloat, just open and create.
        </p>

        {/* CTAs */}
        <div className="su su4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <Link href="/tool" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Start creating free
            <ArrowRight size={16} />
          </Link>
          <Link href="/templates" className="btn-ghost" style={{ padding: '14px 26px', fontSize: '1rem' }}>
            Browse templates
          </Link>
        </div>

        {/* Stats */}
        <div className="su su5" style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['∞', 'free exports'], ['3s', 'avg export time'], ['0', 'data collected']].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-h)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)' }}>{val}</span>
              <span style={{ fontSize: '.68rem', color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="su su5" style={{ width: '100%', maxWidth: 940, marginTop: 64, position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: 0,
          background: 'radial-gradient(ellipse, rgba(99,102,241,.25) 0%, transparent 70%)',
          filter: 'blur(40px)', zIndex: -1,
        }} />
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(99,102,241,.15)',
          background: 'var(--bg2)',
        }}>
          {/* Chrome bar */}
          <div style={{
            height: 40, background: 'rgba(255,255,255,.03)',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 7, padding: '0 16px',
          }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: .8 }} />
            ))}
          </div>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/6GY8CoLyxoE?si=rXA1JSzrhuUv9Jnb&controls=0&autoplay=1&mute=1&loop=1&playlist=6GY8CoLyxoE"
              title="OverlayNow Demo"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TICKER ─────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { text: 'Pinterest creators', color: '#e60023' },
  { text: 'Recipe bloggers', color: '#f97316' },
  { text: 'Instagram posts', color: '#ec4899' },
  { text: 'Quote graphics', color: '#818cf8' },
  { text: 'Product launches', color: '#6366f1' },
  { text: 'Travel content', color: '#22c55e' },
  { text: 'YouTube thumbnails', color: '#ef4444' },
  { text: 'Email newsletters', color: '#f59e0b' },
  { text: 'Brand overlays', color: '#a78bfa' },
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{
      overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '20px 0', background: 'var(--bg2)',
    }}>
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0 36px', flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: '.78rem', color: 'var(--muted)', fontWeight: 500, whiteSpace: 'nowrap', fontFamily: 'var(--font-b)' }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── HOW IT WORKS ───────────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Upload your image', desc: 'Drop any image — JPG, PNG, or WebP. Works instantly in your browser, no upload to server.', color: 'var(--primary)' },
  { n: '02', title: 'Add text & design', desc: 'Pick a template or start blank. Customize fonts, colors, and layout with pixel-perfect precision.', color: 'var(--pink)' },
  { n: '03', title: 'Export in one click', desc: 'Download a crisp PNG in under 3 seconds. No watermark, no compression, no sign-up required.', color: 'var(--green)' },
]

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)
  return (
    <section ref={ref} className="reveal section" style={{ background: 'var(--bg)' }}>
      <div className="divider" />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: '.7rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>How it works</span>
          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)', fontWeight: 700, color: 'var(--text)', marginTop: 10, letterSpacing: '-.025em' }}>
            Three steps to a stunning image
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr' }} className="md-3col">
          {STEPS.map((s) => <StepCard key={s.n} step={s} />)}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step }: { step: typeof STEPS[0] }) {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref, 80)
  return (
    <div ref={ref} className="reveal glass feat-card bento-card" style={{ borderRadius: 20, padding: '32px 28px' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `color-mix(in srgb, ${step.color} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-h)', fontSize: '.8rem', fontWeight: 700,
        color: step.color, marginBottom: 20, border: `1px solid color-mix(in srgb, ${step.color} 25%, transparent)`,
      }}>{step.n}</div>
      <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{step.title}</h3>
      <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{step.desc}</p>
    </div>
  )
}

/* ─── FEATURES BENTO ─────────────────────────────────────────────── */
function Features() {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)
  return (
    <section ref={ref} className="reveal section" style={{ background: 'var(--bg2)' }}>
      <div className="divider" />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: '.7rem', color: 'var(--pink)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>Features</span>
          <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)', fontWeight: 700, color: 'var(--text)', marginTop: 10, letterSpacing: '-.025em' }}>
            Everything you need.{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <BentoCard icon={<ResizeIcon />} color="var(--primary)" title="Pixel-perfect resizing" desc="Drag handles on all sides. Resize overlays freely without losing quality or snapping constraints." wide />
          <BentoCard icon={<FontIcon />} color="var(--pink)" title="Full font control" desc="Hundreds of fonts. Fine-tune size, weight, alignment, letter spacing — every detail yours." />
          <BentoCard icon={<ShieldIcon />} color="var(--green)" title="Zero tracking" desc="No telemetry. No cookies. No account. Everything runs locally in your browser. Period." />
          <BentoCard icon={<DownloadIcon />} color="var(--amber)" title="Instant PNG export" desc="One click. Crisp PNG output. No watermarks, no compression, no waiting." />
          <BentoCard icon={<LayersIcon />} color="var(--accent)" title="Layer management" desc="Stack text, shapes, and images. Reorder layers with a clean drag-and-drop panel." wide />
        </div>
      </div>
    </section>
  )
}

function BentoCard({ icon, color, title, desc, wide }: { icon: React.ReactNode; color: string; title: string; desc: string; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref, 80)
  return (
    <div ref={ref} className="reveal glass feat-card bento-card" style={{
      borderRadius: 20, padding: '32px 28px',
      gridColumn: wide ? 'span 2' : undefined,
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, marginBottom: 20,
        background: `rgba(${color === 'var(--primary)' ? '99,102,241' : color === 'var(--pink)' ? '236,72,153' : color === 'var(--green)' ? '34,197,94' : color === 'var(--amber)' ? '245,158,11' : '129,140,248'},.12)`,
        border: `1px solid rgba(${color === 'var(--primary)' ? '99,102,241' : color === 'var(--pink)' ? '236,72,153' : color === 'var(--green)' ? '34,197,94' : color === 'var(--amber)' ? '245,158,11' : '129,140,248'},.2)`,
      }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}

/* ─── TEMPLATE SHOWCASE ──────────────────────────────────────────── */
const CATS = [
  {
    label: 'Recipes',
    cards: [
      { bg: 'linear-gradient(145deg,#f97316,#dc2626 50%,#991b1b)', title: 'Granola\nRecipe', sub: '5 ingredients · 20 min' },
      { bg: 'linear-gradient(140deg,#ea580c,#c2410c 60%,#9a3412)', title: 'Overnight\nOats', sub: '3 min · Make ahead' },
      { bg: 'linear-gradient(155deg,#ca8a04,#a16207 50%,#854d0e)', title: 'Lemon\nDressing', sub: 'Homemade · 2 min' },
    ],
  },
  {
    label: 'Quotes',
    cards: [
      { bg: 'linear-gradient(160deg,#0d9488,#0f766e 40%,#134e4a)', title: '"Start before\nyou feel ready."', sub: '— Daily Motivation' },
      { bg: 'linear-gradient(150deg,#7c3aed,#6d28d9 50%,#4c1d95)', title: '"Do what you\ncan, with what\nyou have."', sub: '— T. Roosevelt' },
      { bg: 'linear-gradient(165deg,#1e40af,#1e3a8a 50%,#1e293b)', title: '"The only way\nis through."', sub: '— Robert Frost' },
    ],
  },
  {
    label: 'Travel',
    cards: [
      { bg: 'linear-gradient(135deg,#7c3aed,#a78bfa 50%,#c4b5fd)', title: 'Top 5 Hidden\nGems in Bali', sub: 'Travel · Indonesia' },
      { bg: 'linear-gradient(140deg,#0891b2,#0e7490 50%,#155e75)', title: 'Tokyo in\n48 Hours', sub: 'Japan · Budget trip' },
      { bg: 'linear-gradient(150deg,#059669,#047857 50%,#065f46)', title: 'Amalfi Coast\nGuide', sub: 'Italy · Summer 2026' },
    ],
  },
  {
    label: 'Products',
    cards: [
      { bg: 'linear-gradient(170deg,#1e293b,#0f172a)', title: 'NEW\nCollection', sub: 'Spring 2026 · Shop Now' },
      { bg: 'linear-gradient(155deg,#6366f1,#4f46e5 50%,#4338ca)', title: '50% OFF\nSummer Sale', sub: 'Limited time · Act now' },
      { bg: 'linear-gradient(145deg,#ec4899,#db2777 50%,#be185d)', title: 'Just\nDropped', sub: 'New arrivals · Shop' },
    ],
  },
]

function Showcase() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)
  return (
    <section ref={ref} className="reveal section" style={{ background: 'var(--bg)' }}>
      <div className="divider" />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <span style={{ fontSize: '.7rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>Templates</span>
            <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)', fontWeight: 700, color: 'var(--text)', marginTop: 10, letterSpacing: '-.025em' }}>
              Pick a category.<br /><span style={{ color: 'var(--accent)' }}>See what&apos;s possible.</span>
            </h2>
          </div>
          <Link href="/templates" style={{ fontSize: '.8rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Browse all templates <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {CATS.map((c, i) => (
            <button key={c.label} onClick={() => setActive(i)} style={{
              padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontSize: '.8rem', fontWeight: 600,
              fontFamily: 'var(--font-h)', border: 'none',
              background: i === active ? 'linear-gradient(135deg, var(--primary), var(--primary2))' : 'rgba(255,255,255,.05)',
              color: i === active ? '#fff' : 'var(--muted)',
              boxShadow: i === active ? '0 4px 16px rgba(99,102,241,.3)' : 'none',
              outline: i !== active ? '1px solid var(--border)' : 'none',
              transition: 'all .2s',
            }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16, maxWidth: 800 }}>
          {CATS[active].cards.map((card, i) => (
            <TemplateCard key={`${active}-${i}`} card={card} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TemplateCard({ card, delay }: { card: { bg: string; title: string; sub: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref, delay)
  const lines = card.title.split('\n')
  return (
    <div ref={ref} className="reveal" style={{
      aspectRatio: '3/4', borderRadius: 18, background: card.bg,
      position: 'relative', overflow: 'hidden', cursor: 'pointer',
      boxShadow: '0 8px 32px rgba(0,0,0,.35)',
      transition: 'transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 56px rgba(0,0,0,.5)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,.35)' }}
    >
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 18px' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: lines.length > 2 ? '.9rem' : '1.05rem', color: '#fff', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,.4)' }}>{l}</div>
        ))}
        <div style={{ marginTop: 7, fontSize: '.62rem', color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>{card.sub}</div>
      </div>
    </div>
  )
}

/* ─── FINAL CTA ──────────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null!)
  useReveal(ref)
  return (
    <section ref={ref} className="reveal section" style={{ background: 'var(--bg2)' }}>
      <div className="divider" />
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 24px 0', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(99,102,241,.12) 0%, transparent 70%)', filter: 'blur(32px)', pointerEvents: 'none' }} />
        <span style={{ fontSize: '.7rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>Ready?</span>
        <h2 style={{ fontFamily: 'var(--font-h)', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 700, color: 'var(--text)', marginTop: 14, lineHeight: 1.15, letterSpacing: '-.03em' }}>
          Create your first overlay<br /><span style={{ color: 'var(--accent)' }}>in under a minute.</span>
        </h2>
        <p style={{ marginTop: 18, fontSize: '.95rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          No account. No credit card. No bloated editor.<br />Just open and start building.
        </p>
        <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tool" className="btn-primary" style={{ padding: '15px 36px', fontSize: '1rem' }}>
            Open the editor — it&apos;s free
            <ArrowRight size={16} />
          </Link>
        </div>
        <p style={{ marginTop: 20, fontSize: '.7rem', color: 'var(--sub)' }}>Works in any browser · Exports in 3 seconds · No watermarks</p>
      </div>
    </section>
  )
}

/* ─── ICONS ──────────────────────────────────────────────────────── */
function ResizeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
}
function FontIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
}
function ShieldIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function DownloadIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
function LayersIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}
function ArrowRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
}

/* ─── PAGE ROOT ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <GlobalStyles />
      <ScrollProgress />
      <Hero />
      <Ticker />
      <HowItWorks />
      <Features />
      <Showcase />
      <FinalCTA />
    </div>
  )
}
