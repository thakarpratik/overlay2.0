"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Templates", href: "/templates" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={scrolled ? "scrolled" : ""}
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(12,14,20,0.82)" : "rgba(12,14,20,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src="/layerNow_Logo.svg" alt="OverlayTool" style={{ height: 44, width: "auto" }} />
      </Link>

      <nav className="hidden md:flex" style={{ gap: 4, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: "0.82rem",
                fontWeight: 500,
                color: active ? "#fff" : "#9ca3af",
                background: active ? "rgba(255,255,255,0.06)" : "transparent",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = active ? "rgba(255,255,255,0.06)" : "transparent";
                (e.currentTarget as HTMLElement).style.color = active ? "#fff" : "#9ca3af";
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Link
          href="/tool/new"
          className="hidden sm:inline-flex"
          style={{
            padding: "7px 16px",
            borderRadius: 10,
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#fff",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          New project
        </Link>
        <Link
          href="/tool"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 600,
            padding: "8px 18px",
            borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
          }}
        >
          Open Tool
        </Link>
      </div>
    </header>
  );
}
