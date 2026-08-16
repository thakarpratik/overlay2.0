"use client"

import { useState } from "react"
import Link from "next/link"
import PageShell from "@/components/marketing/PageShell"

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
    <PageShell title="Write us" subtitle="A short note is enough. We read them.">
      <div style={{ display: "grid", gap: 0, gridTemplateColumns: "1fr" }}>
        <form onSubmit={onSubmit} className="sheet" style={{ display: "grid", gap: 12 }}>
          <label>
            <span className="home-kicker">Name</span>
            <input className="field" style={{ marginTop: 6 }} value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            <span className="home-kicker">Email</span>
            <input className="field" style={{ marginTop: 6 }} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            <span className="home-kicker">Message</span>
            <textarea className="field" style={{ marginTop: 6, minHeight: 140 }} value={message} onChange={e => setMessage(e.target.value)} required />
          </label>
          <button type="submit" className="btn-ink" disabled={status === "sending"} style={{ justifySelf: "start" }}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {status === "sent" && <p className="prose">Sent. We’ll write back.</p>}
          {error && <p className="prose" style={{ color: "var(--stamp)" }}>{error}</p>}
        </form>
        <aside className="sheet">
          <h3>Also</h3>
          <p><Link href="/templates">Templates</Link> · <Link href="/tool">Bench</Link> · <Link href="/pricing">Cost</Link></p>
        </aside>
      </div>
    </PageShell>
  )
}
