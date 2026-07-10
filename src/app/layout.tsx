import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-loaded", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body-loaded", weight: ["400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: ["/brand/cover.png"],
    type: "website",
  },
  icons: { icon: "/brand/favicon-source.png", apple: "/brand/app-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
