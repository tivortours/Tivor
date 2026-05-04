import type { Metadata } from "next";
import { Cormorant_Garamond, Proza_Libre } from "next/font/google";
import "./globals.css";
import { LuxuryAnimations } from "../components/LuxuryAnimations";

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

export const metadata: Metadata = {
  title: "TIVOR — Luxury Tour Company",
  description:
    "Discover extraordinary journeys crafted exclusively for you. From hidden cultural treasures to breathtaking natural wonders.",
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
        <LuxuryAnimations />
        {children}
      </body>
    </html>
  );
}
