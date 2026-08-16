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
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />
      {allowed === null ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500" />
        </div>
      ) : allowed ? (
        children
      ) : (
        <EmailGate />
      )}
    </div>
  );
}
