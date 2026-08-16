"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/lib/utils/email";

export default function EmailGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        throw new Error("Failed to subscribe");
      }

      localStorage.setItem("user_email", email);
      localStorage.setItem("email_collected_at", new Date().toISOString());
      window.dispatchEvent(new Event("overlay-email-ready"));
      router.push("/tool/new");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <form onSubmit={handleSubmit} className="sheet" style={{ width: "100%", maxWidth: 440, display: "grid", gap: 14 }}>
        <p className="home-kicker">Ticket for the bench</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
          Leave an email. Then stamp.
        </h1>
        <p className="prose">Pictures stay on this machine. The email is how we find you later.</p>
        <label>
          <span className="sr-only">Email</span>
          <input
            className="field"
            type="email"
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </label>
        {error && <p className="prose" style={{ color: "var(--stamp)" }}>{error}</p>}
        <button type="submit" className="btn-ink" disabled={loading}>
          {loading ? "Please wait…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
