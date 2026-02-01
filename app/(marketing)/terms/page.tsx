import PageShell from "@/components/marketing/PageShell";

export default function Page() {
  return (
    <PageShell title="Terms" subtitle="Short placeholder. Replace with your real terms.">
      <div className="rounded-2xl soft-border bg-white shadow-sm p-6 space-y-4 text-sm text-neutral-700">
        <p>This tool is provided “as is”. You are responsible for content you create and export.</p>
        <p>Templates are included for demo purposes. Add licensing details here if you sell templates.</p>
      </div>
    </PageShell>
  );
}
