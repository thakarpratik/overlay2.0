import PageShell from "@/components/marketing/PageShell";

export default function Page() {
  return (
    <PageShell
      title="About"
      subtitle="OverlayTool is a lightweight editor focused on one thing: making great-looking overlays fast."
      cta={{ label: "Browse templates", href: "/templates" }}
    >
      <div className="rounded-2xl soft-border bg-white shadow-sm p-6 space-y-3 text-neutral-700">
        <p>
          The goal is a simple workflow for creators: choose a template, apply your brand kit, export in batches, and post.
        </p>
        <p>
          MVP is 2:3 (1000×1500) — perfect for pins and vertical formats. Next iterations can add more sizes, brand presets,
          and better template management.
        </p>
      </div>
    </PageShell>
  );
}
