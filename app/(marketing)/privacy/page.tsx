import PageShell from "@/components/marketing/PageShell";

export default function Page() {
  return (
    <PageShell title="Privacy" subtitle="How OverlayTool handles images, email, and analytics.">
      <div className="space-y-4 text-sm" style={{ color: "#9ca3af", maxWidth: 680 }}>
        <div className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p>Your project images are stored locally in your browser using IndexedDB. They are not uploaded to OverlayTool servers.</p>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p>We use Google Analytics (gtag, measurement ID G-WSYW9TRG0H) and Vercel Analytics to understand traffic and product usage. These services may set cookies or collect device and page-view data.</p>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p>If you send a contact message, we process your name, email, and message so we can reply. We do not sell that information.</p>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "rgba(30,32,42,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p>Editor settings such as layers, brand kit, and the current image index are saved in your browser (localStorage) so your work survives a refresh.</p>
        </div>
      </div>
    </PageShell>
  );
}
