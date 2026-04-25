"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send email to newsletter service
      const response = await fetch('/api/collect-email', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }) 
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      // Store email in localStorage
      localStorage.setItem("user_email", email);
      localStorage.setItem("email_collected_at", new Date().toISOString());
      
      // Redirect to upload/new project page
      router.push("/tool/new");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#050507', position: 'relative', overflow: 'hidden', padding: '24px',
    }}>
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '35%', height: '35%', background: 'radial-gradient(ellipse, rgba(236,72,153,.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/layerNow_Logo.svg" alt="OverlayNow" style={{ height: 52, width: 'auto', margin: '0 auto' }} />
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24, padding: '36px 32px',
          backdropFilter: 'blur(20px)', boxShadow: '0 32px 80px rgba(0,0,0,.5)',
        }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc',
            textAlign: 'center', marginBottom: 10, letterSpacing: '-0.025em',
          }}>Get Started Free</h1>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '.9rem', marginBottom: 28, fontFamily: "'DM Sans', system-ui, sans-serif", lineHeight: 1.6 }}>
            Enter your email to start creating beautiful overlays
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%', padding: '13px 18px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f8fafc', fontSize: '1rem', outline: 'none',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  boxSizing: 'border-box', transition: 'border-color .2s',
                }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.6)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              {error && (
                <p style={{ marginTop: 8, fontSize: '.8rem', color: '#ef4444', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{error}</p>
              )}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff', fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600, fontSize: '1rem', borderRadius: 999,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: '0 4px 24px rgba(99,102,241,.4)',
              transition: 'opacity .2s, box-shadow .2s',
            }}>
              {loading ? 'Please wait…' : 'Continue to Tool →'}
            </button>
          </form>

          <p style={{ marginTop: 20, textAlign: 'center', fontSize: '.72rem', color: '#475569', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            No credit card required. Start creating instantly.
          </p>
        </div>

        {/* Trust row */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, textAlign: 'center' }}>
          {[['No Tracking', '#22c55e'], ['Instant Export', '#818cf8'], ['Free Forever', '#f59e0b']].map(([label, color]) => (
            <div key={label}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" style={{ margin: '0 auto 6px', display: 'block' }}><path d="M3 8l3.5 3.5L13 4"/></svg>
              <p style={{ fontSize: '.72rem', color: '#64748b', fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
