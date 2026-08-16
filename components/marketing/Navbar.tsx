"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Method" },
  { href: "/pricing", label: "Cost" },
  { href: "/about", label: "About" },
];

function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="OverlayNow home">
      Overlay<span>Now</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Wordmark />

        <nav className="site-nav" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/tool/new" className="btn-ghost hidden sm:inline-flex">New plate</Link>
          <Link href="/tool" className="btn-ink">Open the bench</Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <Link href="/tool/new" onClick={() => setOpen(false)}>New plate</Link>
        </nav>
      )}
    </header>
  );
}
