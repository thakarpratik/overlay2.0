"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/marketing/Navbar";
import EmailGate from "@/components/EmailGate";

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => setAllowed(!!localStorage.getItem("user_email"));
    sync();
    window.addEventListener("overlay-email-ready", sync);
    return () => window.removeEventListener("overlay-email-ready", sync);
  }, [pathname]);

  return (
    <div className="site-wrap" style={{ background: "#1c1916" }}>
      <Navbar />
      <main id="main" className="site-main">
        {allowed === null ? (
          <div className="min-h-[50vh] flex items-center justify-center" style={{ color: "#e8e0d4" }}>
            Loading the bench…
          </div>
        ) : allowed ? (
          children
        ) : (
          <EmailGate />
        )}
      </main>
    </div>
  );
}
