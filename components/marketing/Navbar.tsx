import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition"
  >
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white text-sm">O</span>
          OverlayTool
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/templates">Templates</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/tool/new" className="hidden sm:inline-flex rounded-xl border bg-white px-4 py-2 text-sm hover:bg-neutral-50 transition">
            New project
          </Link>
          <Link href="/tool" className="inline-flex rounded-xl bg-black text-white px-4 py-2 text-sm hover:opacity-90 transition">
            Open Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
