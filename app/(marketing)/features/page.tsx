import PageShell from "@/components/marketing/PageShell"

const items = [
  { title: "Template gallery", desc: "Search, categories, and three preview grounds: Colorful, Neutral, Dark." },
  { title: "Layer bench", desc: "Drag, resize on all sides, pick a layer, keep the selection chrome off the export." },
  { title: "Brand kit", desc: "One font, one ink, one plate fill. Apply to the selected layer or the whole stack." },
  { title: "Type controls", desc: "Size, weight, leading, tracking, shadow, outline. Built for type that has to sit on a photo." },
  { title: "Export", desc: "Current frame as PNG, or the whole run as a ZIP." },
  { title: "Local stock", desc: "Images live in IndexedDB. Refresh keeps your layers. Nothing is uploaded." },
]

export default function Page() {
  return (
    <PageShell
      title="The method"
      subtitle="A short bench. Upload, stamp, export. Nothing extra between you and the plate."
      cta={{ label: "Open the bench", href: "/start" }}
    >
      <div>
        {items.map((item, i) => (
          <article key={item.title} className="sheet">
            <h2>{String(i + 1).padStart(2, "0")}  {item.title}</h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
