import PageShell from "@/components/marketing/PageShell";

export default function Page() {
  return (
    <PageShell title="Privacy" subtitle="Short placeholder. Replace with your real policy.">
      <div className="rounded-2xl soft-border bg-white shadow-sm p-6 space-y-4 text-sm text-neutral-700">
        <p>We store images locally in your browser (IndexedDB) so you can export reliably. We do not upload your images in this MVP.</p>
        <p>If you add accounts/analytics later, update this page to describe what data is collected and why.</p>
      </div>
    </PageShell>
  );
}
