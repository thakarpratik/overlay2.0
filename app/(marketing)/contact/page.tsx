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

  const inputStyle = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    padding: "10px 14px",
    fontSize: "0.875rem",
  } as const

  return (
    <PageShell title="Contact" subtitle="Drop a note — we’ll get back to you.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form onSubmit={onSubmit} className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-sm font-medium">Send a message</div>
          <div className="mt-4 space-y-3">
            <input style={inputStyle} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <textarea style={{ ...inputStyle, minHeight: 120 }} rows={5} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
            <button type="submit" disabled={status === "sending"} className="rounded-xl text-white px-5 py-3 text-sm disabled:opacity-60" style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", width: "100%" }}>
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            {status === "sent" && <div className="text-xs" style={{ color: "#22c55e" }}>Message sent. We’ll get back to you soon.</div>}
            {error && <div className="text-xs" style={{ color: "#f87171" }}>{error}</div>}
          </div>
        </form>

        <div className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-sm font-medium">Quick links</div>
          <div className="mt-3 text-sm space-y-2" style={{ color: "#9ca3af" }}>
            <div><Link href="/templates" style={{ color: "#a5b4fc" }}>Templates</Link></div>
            <div><Link href="/tool" style={{ color: "#a5b4fc" }}>Tool</Link></div>
            <div><Link href="/pricing" style={{ color: "#a5b4fc" }}>Pricing</Link></div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
