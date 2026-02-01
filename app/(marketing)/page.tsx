'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/* ─────────────────────────────────────────────
   Animated counter hook
   ───────────────────────────────────────────── */
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return count
}

/* ─────────────────────────────────────────────
   Stat pill
   ───────────────────────────────────────────── */
function StatPill({ value, unit, label }: { value: number; unit: string; label: string }) {
  const num = useCounter(value)
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {num}<span style={{ color: '#818cf8' }}>{unit}</span>
      </span>
      <span className="text-xs uppercase tracking-widest mt-1" style={{ color: '#6b7280' }}>{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Feature card
   ───────────────────────────────────────────── */
function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group relative rounded-2xl p-5 cursor-default"
      style={{ background: 'rgba(30,32,42,0.55)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(14px)' }}>
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg,#6366f1,#ec4899,#22c55e)' }} />
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h3>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Benefits data
   ───────────────────────────────────────────── */
const BENEFITS = [
  {
    num: '01', title: 'Stop the scroll',
    desc: 'Bold text on eye-catching images grabs attention instantly. Overlaid text makes your content stand out in the first 200ms.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>),
  },
  {
    num: '02', title: 'Communicate instantly',
    desc: 'A quote, a price, a headline — text overlays deliver the core message before anyone clicks. No caption needed.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
  },
  {
    num: '03', title: 'Build brand recognition',
    desc: 'Consistent fonts, colours, and layouts trains your audience to recognise your brand at a glance — no logo required.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>),
  },
  {
    num: '04', title: 'Boost engagement & saves',
    desc: 'Posts with text overlays get saved and shared more — people bookmark useful quotes, recipes, and tips.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  },
  {
    num: '05', title: 'Works on every platform',
    desc: 'Pinterest, Instagram, blogs, email — text over image performs well everywhere without platform-specific tricks.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  },
  {
    num: '06', title: 'Save hours every week',
    desc: 'Templates and brand kits let you go from idea to polished post in under a minute — not 20 minutes in a bloated editor.',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>),
  },
]

/* ─────────────────────────────────────────────
   Gallery data + card
   ───────────────────────────────────────────── */
const GALLERY_ITEMS = [
  { bg: 'linear-gradient(145deg, #f97316 0%, #dc2626 50%, #991b1b 100%)', text: 'The Perfect\nGranola Recipe', sub: '5 ingredients · 20 min', accent: 'rgba(255,255,255,0.15)' },
  { bg: 'linear-gradient(160deg, #0d9488 0%, #0f766e 40%, #134e4a 100%)', text: '"Start before\nyou feel ready."', sub: '— Daily Motivation', accent: 'rgba(255,255,255,0.1)' },
  { bg: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)', text: 'Top 5 Hidden\nGems in Bali', sub: 'Travel · Indonesia', accent: 'rgba(255,255,255,0.12)' },
  { bg: 'linear-gradient(170deg, #1e293b 0%, #0f172a 100%)', text: 'NEW\nCollection', sub: 'Spring 2026 · Shop Now', accent: 'rgba(99,102,241,0.3)' },
  { bg: 'linear-gradient(150deg, #fb7185 0%, #e11d48 60%, #be123c 100%)', text: '10 Morning\nHabits That\nChange Everything', sub: 'Wellness · Lifestyle', accent: 'rgba(255,255,255,0.12)' },
  { bg: 'linear-gradient(140deg, #16a34a 0%, #166534 50%, #14532d 100%)', text: 'Easy Meal\nPrep Guide', sub: '7 days · Under $50', accent: 'rgba(255,255,255,0.1)' },
]

function GalleryCard({ item }: { item: typeof GALLERY_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false)
  const lines = item.text.split('\n')
  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        aspectRatio: '2/3', background: item.bg,
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl pointer-events-none" style={{ height: '55%', background: item.accent }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: '120px', height: '120px', top: '-30px', right: '-30px', background: 'rgba(255,255,255,0.06)' }} />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {lines.map((line, i) => (
          <div key={i} className="font-bold leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: lines.length > 2 ? '1.15rem' : '1.4rem', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{line}</div>
        ))}
        <div className="mt-2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>{item.sub}</div>
      </div>
      <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold"
        style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', backdropFilter: 'blur(6px)' }}>
        Use this style →
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Icons
   ───────────────────────────────────────────── */
const IconResize = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>)
const IconType = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>)
const IconShield = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>)

/* ─────────────────────────────────────────────
   Section label reusable
   ───────────────────────────────────────────── */
function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-6" style={{ background: color }} />
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color }}>{children}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Homepage
   ───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative" style={{ background: '#0f1117' }}>

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden" style={{ background: '#0f1117', paddingTop: '80px', paddingBottom: '56px' }}>
        <div className="aurora -z-10" style={{
          background: [
            'radial-gradient(circle at 18% 22%, rgba(99,102,241,0.45), transparent 52%)',
            'radial-gradient(circle at 78% 28%, rgba(236,72,153,0.32), transparent 55%)',
            'radial-gradient(circle at 58% 75%, rgba(34,197,94,0.26), transparent 56%)',
            'radial-gradient(circle at 28% 68%, rgba(14,165,233,0.30), transparent 56%)',
          ].join(', ')
        }} />
        <div className="grain -z-10" style={{ opacity: 0.06 }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: '520px', height: '520px', top: '-12%', right: '-10%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: '360px', height: '360px', bottom: '8%', left: '-8%', background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)', filter: 'blur(32px)' }} />

        <div className="mx-auto max-w-6xl px-6 relative">
          <h1 className="leading-none tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', maxWidth: '780px' }}>
            Image Overlay Tool
            <br /><span className="italic" style={{ color: '#818cf8' }}>Built for Creators</span>
          </h1>

          <p className="mt-4 text-lg max-w-xl leading-relaxed" style={{ color: '#9ca3af' }}>
            A fast, privacy-first overlay editor built for creators who publish daily — no bloat, no tracking, no compromise.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link href="/tool"
              className="group inline-flex items-center gap-2 rounded-full text-white text-sm font-semibold px-7 py-3 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>
              Open Tool
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </Link>
            <Link href="#why"
              className="inline-flex items-center rounded-full text-sm font-medium px-6 py-3 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#d1d5db', background: 'rgba(255,255,255,0.04)' }}>
              Learn more
            </Link>
          </div>

          <div className="mt-8" style={{ maxWidth: '380px' }}>
            <div className="flex justify-between gap-6 rounded-xl px-5 py-4"
              style={{ background: 'rgba(20,22,30,0.7)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <StatPill value={3} unit="s" label="Avg export" />
              <div className="w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <StatPill value={0} unit="KB" label="Tracking" />
              <div className="w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <StatPill value={100} unit="%" label="Private" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHY TEXT ON IMAGES ══════ */}
      <section id="why" className="relative overflow-hidden" style={{ background: '#0f1117', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />
        <div className="mx-auto max-w-6xl px-6 relative">
          <SectionLabel color="#ec4899">Why it works</SectionLabel>
          <h2 className="tracking-tight text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', maxWidth: '520px' }}>
            Why text over images is the strongest format.
          </h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: '#6b7280' }}>
            Every top creator on Pinterest, Instagram, and blogs relies on text overlays. Here's why.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.num} className="flex gap-3 rounded-xl p-4"
                style={{ background: 'rgba(30,32,42,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="text-xs font-bold" style={{ color: '#818cf8', fontFamily: "'Playfair Display', Georgia, serif" }}>{b.num}</span>
                  <div className="mt-1.5 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                    {b.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-white tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{b.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: '#6b7280' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section id="features" className="relative overflow-hidden" style={{ background: '#0f1117', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />
        <div className="mx-auto max-w-6xl px-6 relative">
          <SectionLabel color="#6366f1">What's inside</SectionLabel>
          <h2 className="tracking-tight text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', maxWidth: '440px' }}>
            Everything you need — nothing you don't.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<IconResize />} title="Fluid resizing" desc="Drag, stretch, and squeeze overlays freely on all sides with pixel-perfect control." />
            <Feature icon={<IconType />} title="Font control" desc="Choose fonts, sizes, alignment, and spacing precisely. Your brand, your way." />
            <Feature icon={<IconShield />} title="Analytics-safe" desc="No tracking pixels. Zero telemetry. Your data stays in your browser, full stop." />
          </div>
        </div>
      </section>

      {/* ══════ RESULTS GALLERY ══════ */}
      <section className="relative overflow-hidden" style={{ background: '#0f1117', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />
        <div className="mx-auto max-w-6xl px-6 relative">
          <SectionLabel color="#22c55e">Results</SectionLabel>
          <h2 className="tracking-tight text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', maxWidth: '440px' }}>
            What creators are making.
          </h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: '#6b7280' }}>
            From recipe blogs to product launches — see the kinds of overlays you can create in seconds.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_ITEMS.map((item, i) => (<GalleryCard key={i} item={item} />))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative overflow-hidden" style={{ background: '#0f1117', paddingTop: '16px', paddingBottom: '64px' }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl px-6 py-5"
            style={{ background: 'rgba(30,32,42,0.6)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
            <div>
              <p className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Ready to create your first overlay?</p>
              <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>No account needed. Start in seconds.</p>
            </div>
            <Link href="/tool"
              className="inline-flex items-center rounded-full text-white text-sm font-semibold px-6 py-3 transition-all whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>
              Open the editor →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
