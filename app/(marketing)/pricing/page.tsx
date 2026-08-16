import Link from "next/link"
import PageShell from "@/components/marketing/PageShell"

export default function Page() {
  return (
    <PageShell
      title="What it costs"
      subtitle="The bench is free. Paid tiers are listed for when we turn them on. Today everything listed under Free already ships."
      cta={{ label: "Open the bench", href: "/tool" }}
    >
      <table className="price-table">
        <thead>
          <tr>
            <th>Bench</th>
            <th>Free</th>
            <th>Creator</th>
            <th>Shop</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td className="amt">$0</td>
            <td className="amt">$9</td>
            <td className="amt">$29</td>
          </tr>
          <tr>
            <td>Plates</td>
            <td>All templates</td>
            <td>All templates</td>
            <td>All templates</td>
          </tr>
          <tr>
            <td>Export</td>
            <td>PNG</td>
            <td>PNG + ZIP</td>
            <td>PNG + ZIP</td>
          </tr>
          <tr>
            <td>Canvas</td>
            <td>2:3 · 1000×1500</td>
            <td>2:3 · 1000×1500</td>
            <td>2:3 · 1000×1500</td>
          </tr>
          <tr>
            <td>Brand kit</td>
            <td>In session</td>
            <td>Saved presets</td>
            <td>Shared kits</td>
          </tr>
          <tr>
            <td></td>
            <td><Link href="/tool" className="btn-ink">Start</Link></td>
            <td><Link href="/tool" className="btn-ghost">Soon</Link></td>
            <td><Link href="/contact" className="btn-ghost">Write us</Link></td>
          </tr>
        </tbody>
      </table>
      <p className="prose" style={{ marginTop: 28 }}>
        Stripe is not live yet. ZIP export already works on the free bench.
      </p>
    </PageShell>
  )
}
