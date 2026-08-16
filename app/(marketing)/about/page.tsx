import PageShell from "@/components/marketing/PageShell"

export default function Page() {
  return (
    <PageShell
      title="About the shop"
      subtitle="OverlayNow exists to put type on pictures without a bloated editor."
      cta={{ label: "Browse plates", href: "/templates" }}
    >
      <article className="sheet">
        <h2>The job</h2>
        <p>Choose a plate, set your ink, export a run, post. The canvas is 2:3 (1000×1500) because that is the shape of a vertical post.</p>
      </article>
      <article className="sheet">
        <h2>Where we are</h2>
        <p>The bench runs in the browser. Next cuts: more canvas sizes, saved brand presets, a calmer template shelf.</p>
      </article>
      <article className="sheet">
        <h2>Your stock</h2>
        <p>Pictures stay in IndexedDB. We use Google Analytics and Vercel Analytics on the site. Email goes to Loops if you leave one.</p>
      </article>
    </PageShell>
  )
}
