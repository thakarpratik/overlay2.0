import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">OverlayTool</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/templates" className="hover:underline">Templates</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/tool" className="rounded-lg bg-black text-white px-3 py-1.5">Open Tool</Link>
        </nav>
      </div>
    </header>
  );
}
