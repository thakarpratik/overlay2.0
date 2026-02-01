import "./globals.css";

export const metadata = {
  title: "OverlayTool",
  description: "Create social media overlays fast."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
