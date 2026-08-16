import PageShell from "@/components/marketing/PageShell"

export default function Page() {
  return (
    <PageShell title="Privacy" subtitle="What we keep, and what never leaves your machine.">
      <article className="sheet">
        <h3>Image storage</h3>
        <p>Project images stay in your browser via IndexedDB. They are not uploaded to OverlayNow servers.</p>
      </article>
      <article className="sheet">
        <h3>Analytics</h3>
        <p>We use Google Analytics (gtag, G-WSYW9TRG0H) and Vercel Analytics for traffic. They may set cookies or collect device and page-view data.</p>
      </article>
      <article className="sheet">
        <h3>Email</h3>
        <p>If you enter an email to open the bench or send a note, we send it to Loops so we can reply. We do not sell it.</p>
      </article>
      <article className="sheet">
        <h3>Local project data</h3>
        <p>Layers, brand kit, and the current frame index live in localStorage so a refresh does not wipe the plate.</p>
      </article>
    </PageShell>
  )
}
