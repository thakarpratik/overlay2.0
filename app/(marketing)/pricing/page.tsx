export default function Page() {
  const tiers = [
    { name: "Free", price: "$0", bullets: ["Use templates", "Export PNG", "2:3 canvas"], cta: "Start free", primary: false },
    { name: "Creator", price: "$9/mo", bullets: ["Brand Kit presets", "Batch ZIP export", "More templates"], cta: "Upgrade", primary: true },
    { name: "Team", price: "$29/mo", bullets: ["Shared brand kits", "Workspaces", "Priority exports"], cta: "Contact", primary: false }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-2 text-neutral-600">Simple tiers (placeholder). Hook to Stripe later.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={[
              "rounded-2xl border bg-white p-6 shadow-sm",
              t.primary ? "border-black ring-2 ring-black/10" : "border-neutral-200"
            ].join(" ")}
          >
            <div className="flex items-baseline justify-between">
              <div className="font-medium">{t.name}</div>
              <div className="text-2xl font-semibold">{t.price}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              {t.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <button
              className={[
                "mt-6 w-full rounded-xl px-4 py-2 text-sm",
                t.primary ? "bg-black text-white" : "border bg-white"
              ].join(" ")}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
