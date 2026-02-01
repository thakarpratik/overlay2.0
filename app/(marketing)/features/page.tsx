import PageShell from "@/components/marketing/PageShell";

const items = [
  { title: "Template gallery", desc: "Search, categories, and preview background styles (Colorful / Neutral / Dark)." },
  { title: "Editor layers", desc: "Drag to move, resize handles, layer list, and quick selection." },
  { title: "Brand Kit", desc: "Set font + colors once, apply to selected or all layers." },
  { title: "Text styling", desc: "Line-height, letter spacing, shadow, outline for readability." },
  { title: "Export", desc: "Export current PNG or export all images as a ZIP." },
  { title: "Storage", desc: "Images saved in IndexedDB to avoid localStorage quota limits." }
];

export default function Page() {
  return (
    <PageShell
      title="Features"
      subtitle="Everything you need to create social overlays quickly — without heavy bloat."
      cta={{ label: "Open tool", href: "/tool" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl soft-border bg-white shadow-sm p-6 hover:shadow-md transition">
            <div className="font-medium">{i.title}</div>
            <div className="mt-2 text-sm text-neutral-600">{i.desc}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
