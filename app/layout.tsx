import type { Metadata } from "next";
import { Cormorant_Garamond, Proza_Libre } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { LuxuryAnimations } from "../components/LuxuryAnimations";
import { BrowserScaleShell } from "../components/BrowserScaleShell";

const cormorant = Cormorant_Garamond({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const prozaLibre = Proza_Libre({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "TIVOR — Luxury Tour Company";
const siteDescription =
  "Discover extraordinary journeys crafted exclusively for you. From hidden cultural treasures to breathtaking natural wonders.";
// TIVOR mark, used as the link-preview image for crawlers (WhatsApp,
// Facebook, Twitter/X, etc.) that read og:image.
const ogImage = "/icon.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://tivortours.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://tivortours.com",
    siteName: "TIVOR",
    images: [{ url: ogImage, width: 512, height: 512 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${prozaLibre.variable} antialiased`}
    >
      <GoogleTagManager gtmId="GTM-MCZCQWPT" />
      <body className="overflow-x-hidden">
        {/* @next/third-parties' GoogleTagManager only injects the <head>
            script — GTM's noscript <body> fallback isn't part of that
            package, so it's added directly here to match Google's full
            installation snippet. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCZCQWPT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <BrowserScaleShell>
          <LuxuryAnimations />
          {children}
        </BrowserScaleShell>
        <div id="modal-root" />
      </body>
    </html>
  );
}
