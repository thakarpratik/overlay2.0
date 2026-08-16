import Link from "next/link";

export default function PageShell({
  title,
  subtitle,
  children,
  cta,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  cta?: { label: string; href: string }
}) {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {cta && (
          <div style={{ marginTop: 22 }}>
            <Link href={cta.href} className="btn-ink">{cta.label}</Link>
          </div>
        )}
      </header>
      <div className="page-body">{children}</div>
    </div>
  );
}
