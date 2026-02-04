import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "OverlayTool",
  description: "Create social media overlays fast."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
