"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/lib/utils/email";

export default function EmailGate({ heading = "Log in to the bench" }: { heading?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_email")) {
      router.replace("/tool/new");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/collect-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to subscribe");
      }

      localStorage.setItem("user_email", email);
      localStorage.setItem("email_collected_at", new Date().toISOString());
      window.dispatchEvent(new Event("overlay-email-ready"));
      router.push("/tool/new");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <form onSubmit={handleSubmit} className="sheet" style={{ width: "100%", maxWidth: 440, display: "grid", gap: 14 }}>
        <p className="home-kicker">Loops list · no password</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
          {heading}
        </h1>
        <p className="prose">
          Leave your email to open the bench. We send it to Loops so we can reach you. Your pictures stay in this browser.
        </p>
        <label>
          <span className="home-kicker">Email</span>
          <input
            className="field"
            style={{ marginTop: 6 }}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </label>
        {error && <p className="prose" style={{ color: "var(--stamp)" }}>{error}</p>}
        <button type="submit" className="btn-ink" disabled={loading}>
          {loading ? "Sending…" : "Continue to the bench"}
        </button>
      </form>
    </div>
  );
}
