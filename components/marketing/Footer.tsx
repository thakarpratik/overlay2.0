import Link from "next/link";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Method", href: "/features" },
  { label: "Cost", href: "/pricing" },
  { label: "Templates", href: "/templates" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "Log in", href: "/start" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="wordmark" aria-label="OverlayNow home">
          Overlay<span>Now</span>
        </Link>
        <nav aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <div className="site-footer-meta">
          <span>© {new Date().getFullYear()} OverlayNow</span>
          <span>Pictures stay on your machine.</span>
        </div>
      </div>
    </footer>
  );
}
