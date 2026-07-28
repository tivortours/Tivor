import type { Metadata } from "next";
import { Cormorant_Garamond, Proza_Libre } from "next/font/google";
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
// Homepage hero image, cropped to the 1200x630 size link-preview crawlers
// (WhatsApp, Facebook, Twitter/X, etc.) expect for og:image.
const ogImage =
  "https://cdn.sanity.io/images/gu0rp0dy/production/cec85d7c134d3427653e49671f16155001b7369e-4096x2730.jpg?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  metadataBase: new URL("https://tivortours.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://tivortours.com",
    siteName: "TIVOR",
    images: [{ url: ogImage, width: 1200, height: 630 }],
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
      <body className="overflow-x-hidden">
        <BrowserScaleShell>
          <LuxuryAnimations />
          {children}
        </BrowserScaleShell>
        <div id="modal-root" />
      </body>
    </html>
  );
}
