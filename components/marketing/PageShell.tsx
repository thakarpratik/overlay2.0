import Link from "next/link";

export default function PageShell({
  title,
  subtitle,
  children,
  cta
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <div style={{ background: "#0c0e14", minHeight: "calc(100vh - 72px)", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="flex flex-col gap-3">
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>{title}</h1>
          {subtitle && <p style={{ color: "#9ca3af", maxWidth: 640, lineHeight: 1.7 }}>{subtitle}</p>}
          {cta && (
            <div className="pt-2">
              <Link href={cta.href} style={{
                display: "inline-flex",
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "#fff",
                padding: "12px 20px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}>
                {cta.label}
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
