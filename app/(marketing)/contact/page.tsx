import PageShell from "@/components/marketing/PageShell";

export default function Page() {
  return (
    <PageShell title="Contact" subtitle="Drop a note. (Placeholder form — wire to email/Supabase later.)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl soft-border bg-white shadow-sm p-6">
          <div className="text-sm font-medium">Send a message</div>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-xl border px-4 py-2 text-sm" placeholder="Name" />
            <input className="w-full rounded-xl border px-4 py-2 text-sm" placeholder="Email" />
            <textarea className="w-full rounded-xl border px-4 py-2 text-sm" rows={5} placeholder="Message" />
            <button className="rounded-xl bg-black text-white px-5 py-3 text-sm hover:opacity-90 transition">Send</button>
            <div className="text-xs text-neutral-500">Hook this button to your backend later.</div>
          </div>
        </div>

        <div className="rounded-2xl soft-border bg-white shadow-sm p-6">
          <div className="text-sm font-medium">Quick links</div>
          <div className="mt-3 text-sm text-neutral-600 space-y-2">
            <div>• Templates: /templates</div>
            <div>• Tool: /tool</div>
            <div>• Pricing: /pricing</div>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 border p-4 text-sm text-neutral-600">
            Tip: If export fails in dev, check browser console for CORS/taint issues with external images.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
