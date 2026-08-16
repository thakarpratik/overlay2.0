import PageShell from "@/components/marketing/PageShell"

export default function Page() {
  return (
    <PageShell title="Terms" subtitle="Short and plain. You own what you make.">
      <article className="sheet">
        <h3>Use at your own risk</h3>
        <p>The bench is provided as is. You are responsible for the content you create and export.</p>
      </article>
      <article className="sheet">
        <h3>Templates</h3>
        <p>Plates are included so you can work. If we later sell templates, licensing will live here.</p>
      </article>
      <article className="sheet">
        <h3>Your pictures</h3>
        <p>You keep ownership of your images and exports. Do not use the bench to make illegal content.</p>
      </article>
      <article className="sheet">
        <h3>Changes</h3>
        <p>We may update these terms. Using the bench after a change means you accept the new copy.</p>
      </article>
    </PageShell>
  )
}
