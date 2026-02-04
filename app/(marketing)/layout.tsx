'use client'

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { usePathname } from "next/navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomepage && <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
