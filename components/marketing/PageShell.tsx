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
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-neutral-50" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-neutral-600 max-w-2xl">{subtitle}</p>}
          {cta && (
            <div className="pt-2">
              <Link href={cta.href} className="inline-flex rounded-xl bg-black text-white px-5 py-3 hover:opacity-90 transition">
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
