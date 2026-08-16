import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div>
          <p className="home-kicker">Print shop for social pictures</p>
          <h1>Words<br />on pictures.</h1>
          <p className="lede">
            Drop a photo. Stamp a line. Export a 2:3 plate. The file never leaves this browser.
          </p>
          <div className="home-actions">
            <Link href="/tool" className="btn-ink btn-lg">Open the bench</Link>
            <Link href="/templates" className="btn-ghost btn-lg">See the plates</Link>
          </div>
        </div>

        <figure className="print" aria-label="Sample overlay on a photograph">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
            alt="Sunlit mountain ridge used as a sample photograph"
          />
          <figcaption className="print-caption">
            <strong>Leave before<br />the light dies.</strong>
            <em>OverlayNow · 1000 × 1500</em>
          </figcaption>
        </figure>
      </section>

      <section className="impo" aria-label="How it works">
        <div className="impo-row">
          <article className="impo-cell">
            <div className="impo-num">01</div>
            <h2>Lay the stock</h2>
            <p>Upload up to sixty pictures. They sit in IndexedDB on this machine. No cloud tray.</p>
          </article>
          <article className="impo-cell">
            <div className="impo-num">02</div>
            <h2>Ink the type</h2>
            <p>Pick a plate, drag the type, set a brand once. Apply it to one layer or the whole stack.</p>
          </article>
          <article className="impo-cell">
            <div className="impo-num">03</div>
            <h2>Pull the print</h2>
            <p>PNG for one frame. ZIP for the run. Same 2:3 canvas every time, ready for vertical posts.</p>
          </article>
        </div>
      </section>

      <section className="band">
        <div className="band-inner">
          <h2>Forty plates. Zero account tax on the work.</h2>
          <p>The bench is free. Email is how we say hello, not how we hold your pictures hostage.</p>
          <Link href="/tool/new" className="btn-ink">Start a plate</Link>
        </div>
      </section>
    </>
  );
}
