import "./globals.css";
import Script from "next/script";
import { Anybody, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  title: "OverlayNow",
  description: "Stamp words onto your pictures. Local, fast, 2:3 social overlays.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${figtree.variable}`}>
      <body className="min-h-screen">
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WSYW9TRG0H" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WSYW9TRG0H');
          `}
        </Script>
      </body>
    </html>
  );
}
