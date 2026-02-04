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
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0c0e14' }}>
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/layerNow_Logo.svg" 
            alt="OverlayTool" 
            style={{ height: 60, width: 'auto', margin: '0 auto' }}
          />
        </div>

        {/* Card */}
        <div 
          className="rounded-3xl p-8 shadow-2xl"
          style={{ 
            background: 'rgba(30,32,42,0.6)', 
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h1 
            className="text-3xl font-bold text-center mb-3"
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#ffffff'
            }}
          >
            Get Started Free
          </h1>
          
          <p className="text-center mb-8" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            Enter your email to start creating beautiful overlays
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '1rem'
                }}
              />
              {error && (
                <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                fontSize: '1rem',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Please wait...' : 'Continue to Tool →'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs" style={{ color: '#6b7280' }}>
            No credit card required. Start creating instantly.
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {['No Tracking', 'Instant Export', 'Free Forever'].map((feature) => (
            <div key={feature}>
              <p className="text-sm font-medium" style={{ color: '#ffffff' }}>✓</p>
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
