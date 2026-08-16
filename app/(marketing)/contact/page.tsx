"use client"

import { useState } from "react"
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus("error")
        setError(data.error || "Could not send message.")
        return
      }
      setStatus("sent")
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setStatus("error")
      setError("Could not send message.")
    }
  }

  return (
    <PageShell title="Contact" subtitle="Drop a note — we'll get back to you.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, maxWidth: 860 }}>
        <form onSubmit={onSubmit} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: 20 }}>Send a message</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input style={INPUT_STYLE} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <input style={INPUT_STYLE} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <textarea style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: 120 }} rows={5} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required
              onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button type="submit" disabled={status === "sending"} style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff', fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600, fontSize: '.875rem', padding: '11px',
              borderRadius: 999, border: 'none', cursor: status === "sending" ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,.3)', transition: 'opacity .2s',
              opacity: status === "sending" ? 0.65 : 1,
            }}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p style={{ fontSize: '.8rem', color: '#22c55e', fontFamily: "'DM Sans', system-ui, sans-serif" }}>Message sent. We’ll get back to you soon.</p>
            )}
            {error && (
              <p style={{ fontSize: '.8rem', color: '#f87171', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{error}</p>
            )}
          </div>
        </form>

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
        </div>
      </div>
    </PageShell>
  )
}
