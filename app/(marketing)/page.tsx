import Link from "next/link";

const FEATURES = [
  { title: "Template Library", desc: "Home, Food, Quotes, Wellness, Business, Fashion — ready to customize." },
  { title: "Brand Kit", desc: "Set your font + colors once. Apply to selected layers or everything." },
  { title: "Text Controls", desc: "Line-height, letter-spacing, shadow & outline for real social-ready headlines." },
  { title: "Batch Export", desc: "Export current PNG or ZIP all images (full resolution)." }
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-neutral-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Social-ready overlays in minutes
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                Create scroll-stopping overlays for any platform.
              </h1>
              <p className="mt-4 text-neutral-600 text-lg">
                Use templates, apply your brand kit, and export in batches. Great for Pinterest, Instagram posts, Reels covers, TikTok covers, ads, and blog graphics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/tool" className="rounded-xl bg-black text-white px-5 py-3">Open the tool</Link>
                <Link href="/templates" className="rounded-xl border bg-white px-5 py-3">Browse templates</Link>
              </div>
              <div className="mt-6 text-xs text-neutral-500">
                MVP: 2:3 (1000×1500). More sizes + brand presets next.
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border bg-white shadow-sm p-4">
                <div className="rounded-2xl bg-neutral-100 aspect-[2/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,.22),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,.18),transparent_55%),linear-gradient(135deg,rgba(0,0,0,.06),rgba(0,0,0,.01))]" />
                  <div className="absolute inset-x-8 bottom-10 rounded-2xl bg-white/85 backdrop-blur border p-5">
                    <div className="text-4xl font-black leading-none">15</div>
                    <div className="mt-2 text-2xl font-extrabold leading-tight">Warm & cozy<br/>living room ideas</div>
                    <div className="mt-3 text-sm text-neutral-600">Template + brand kit + export</div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -inset-6 rounded-[40px] bg-gradient-to-r from-indigo-100 via-pink-100 to-emerald-100 blur-2xl opacity-70" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">What you get</h2>
        <p className="mt-2 text-neutral-600">A clean Canva-like workflow that stays fast.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="font-medium">{f.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Ready to ship content faster?</h3>
            <p className="mt-2 text-neutral-600">Open the tool and export your next batch.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tool/new" className="rounded-xl bg-black text-white px-5 py-3">Start a project</Link>
            <Link href="/templates" className="rounded-xl border bg-white px-5 py-3">Pick a template</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
