'use client'

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

const MARKETING_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  body { background: #050507; color: #f8fafc; font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
`

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MARKETING_CSS }} />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050507' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
