import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00f5ff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloxfruitsai.com"),
  title: {
    default: "Blox Fruits Calculator Value — Best BloxFruits AI Guide",
    template: "%s",
  },
  description:
    "Blox Fruits AI is the #1 AI-powered tool for Roblox Blox Fruits players. Get real-time tier lists, instant devil fruit rankings and Trade blox Fruits Calculator Value.",
  keywords: ["blox fruits ai","blox fruits tier list","blox fruits guide","best fruits blox fruits","blox fruits trade calculator","blox fruits value list","blox fruits pvp builds","blox fruits devil fruit ranking","roblox blox fruits"],
  authors: [{ name: "BloxFruitsAI Team", url: "https://www.bloxfruitsai.com" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bloxfruitsai.com",
    siteName: "Blox Fruits AI",
    title: "Blox Fruits AI — Best AI Guide, Tier List & Fruit Finder",
    description: "The smartest AI tool for Blox Fruits players. Real-time tier lists, trade calculator, value list, and build guides — updated after every patch.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Blox Fruits AI" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bloxfruitsai",
    title: "Blox Fruits AI — Best AI Guide, Tier List & Fruit Finder",
    description: "The smartest AI tool for Blox Fruits. Real-time tier lists, trade calculator, and build guides.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.bloxfruitsai.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", url: "https://www.bloxfruitsai.com", name: "Blox Fruits AI", potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.bloxfruitsai.com/values?q={search_term_string}" }, "query-input": "required name=search_term_string" } },
    { "@type": "SoftwareApplication", name: "Blox Fruits AI", url: "https://www.bloxfruitsai.com", applicationCategory: "GameApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2847" } },
    { "@type": "Organization", name: "Blox Fruits AI", url: "https://www.bloxfruitsai.com" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
