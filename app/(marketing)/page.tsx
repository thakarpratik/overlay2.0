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
   Stat pill (dark)
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
   Feature card — dark glass
   ───────────────────────────────────────────── */
function Feature({
  title, desc, icon, delay,
}: { title: string; desc: string; icon: React.ReactNode; delay: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="group relative rounded-2xl p-7 cursor-default"
      style={{
        background: 'rgba(30,32,42,0.55)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(14px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }}
    >
      {/* rainbow top-edge on hover */}
      <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg,#6366f1,#ec4899,#22c55e)' }} />

      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-base tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SVG icons
   ───────────────────────────────────────────── */
const IconResize = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)
const IconType = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
)
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
)

/* ─────────────────────────────────────────────
   Homepage
   ───────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="relative" style={{ background: '#0f1117' }}>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', background: '#0f1117' }}>
        {/* Aurora — boosted saturation for dark bg */}
        <div className="aurora -z-10" style={{
          background: [
            'radial-gradient(circle at 18% 22%, rgba(99,102,241,0.45), transparent 52%)',
            'radial-gradient(circle at 78% 28%, rgba(236,72,153,0.32), transparent 55%)',
            'radial-gradient(circle at 58% 75%, rgba(34,197,94,0.26), transparent 56%)',
            'radial-gradient(circle at 28% 68%, rgba(14,165,233,0.30), transparent 56%)',
          ].join(', ')
        }} />
        <div className="grain -z-10" style={{ opacity: 0.06 }} />

        {/* extra ambient orbs */}
        <div className="absolute rounded-full pointer-events-none" style={{ width: '520px', height: '520px', top: '-12%', right: '-10%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: '360px', height: '360px', bottom: '8%', left: '-8%', background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)', filter: 'blur(32px)' }} />

        {/* ─── content ─── */}
        <div className="mx-auto max-w-6xl px-6 flex flex-col justify-center" style={{ minHeight: '100vh' }}>

          {/* headline */}
          <h1 className="leading-none tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', maxWidth: '780px' }}>
            Image Overlay Tool
            <br />
            <span className="italic" style={{ color: '#818cf8' }}>Built for Creators</span>
          </h1>

          {/* sub */}
          <p className="mt-6 text-lg max-w-xl leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'system-ui, sans-serif' }}>
            A fast, privacy-first overlay editor built for creators who publish daily — no bloat, no tracking, no compromise.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link href="/tool"
              className="group inline-flex items-center gap-2 rounded-full text-white text-sm font-semibold px-7 py-3.5 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>
              Open Tool
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link href="#features"
              className="inline-flex items-center rounded-full text-sm font-medium px-6 py-3.5 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#d1d5db', background: 'rgba(255,255,255,0.04)' }}>
              Learn more
            </Link>
          </div>

          {/* stats bar */}
          <div className="mt-14" style={{ maxWidth: '420px' }}>
            <div className="flex justify-between gap-8 rounded-2xl px-6 py-5"
              style={{ background: 'rgba(20,22,30,0.7)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <StatPill value={3} unit="s" label="Avg export" />
              <div className="w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <StatPill value={0} unit="KB" label="Tracking" />
              <div className="w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <StatPill value={100} unit="%" label="Private" />
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce" style={{ opacity: 0.25 }}>
          <span className="text-xs tracking-widest uppercase" style={{ color: '#6b7280' }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6b7280" strokeWidth="1.5">
            <path d="M8 3v10M4 9l4 4 4-4" />
          </svg>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section id="features" className="relative py-24 overflow-hidden" style={{ background: '#0f1117' }}>
        {/* subtle top fade from hero */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(15,17,23,0.6), transparent)' }} />

        <div className="mx-auto max-w-6xl px-6 relative">

          {/* section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#6366f1' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6366f1' }}>What's inside</span>
          </div>

          {/* section headline */}
          <h2 className="tracking-tight mb-12 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', maxWidth: '520px' }}>
            Everything you need — nothing you don't.
          </h2>

          {/* 3-col grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<IconResize />} title="Fluid resizing"
              desc="Drag, stretch, and squeeze overlays freely on all sides with pixel-perfect control." delay={0} />
            <Feature icon={<IconType />} title="Font control"
              desc="Choose fonts, sizes, alignment, and spacing precisely. Your brand, your way." delay={120} />
            <Feature icon={<IconShield />} title="Analytics-safe"
              desc="No tracking pixels. Zero telemetry. Your data stays in your browser, full stop." delay={240} />
          </div>

          {/* bottom CTA strip */}
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl px-7 py-6"
            style={{ background: 'rgba(30,32,42,0.6)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}>
            <div>
              <p className="font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Ready to create your first overlay?
              </p>
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
