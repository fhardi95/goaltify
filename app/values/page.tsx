import type { Metadata } from "next";
import ValuesClient from "./ValuesClient";

export const metadata: Metadata = {
  title: "Blox Fruits Value List 2026 — Trade Values & Fruit Prices",
  description:
    "Complete Blox Fruits value list with every fruit trade value, Robux price, and demand score. Updated after every patch. The most accurate BFV values list in 2026.",
  alternates: { canonical: "https://www.bloxfruitsai.com/values" },
  openGraph: {
    title: "Blox Fruits Value List 2026 — Trade Values & Fruit Prices",
    description: "Every Blox Fruit trade value, Robux price, and demand score in one place. Updated after every patch.",
    url: "https://www.bloxfruitsai.com/values",
    type: "website",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
    { "@type": "ListItem", position: 2, name: "Blox Fruits Value List", item: "https://www.bloxfruitsai.com/values" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the most valuable fruit in Blox Fruits 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitsune is currently the most valuable fruit in Blox Fruits as of 2026. It has the highest trade value, the highest demand, and S-tier performance in both PVP and PVE. Dragon is second, followed by Leopard and Venom.",
      },
    },
    {
      "@type": "Question",
      name: "What does demand mean on the Blox Fruits value list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand (rated 1–10) measures how actively players are seeking a specific fruit right now. A fruit with a demand of 9–10 is very easy to trade away quickly. A fruit with low demand may have a high paper value but be hard to move in actual trades — making demand just as important as raw value.",
      },
    },
    {
      "@type": "Question",
      name: "What is a permanent fruit and why is it worth more?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A permanent (perm) fruit means you keep it even after dying or resetting — unlike regular fruits which disappear on death. Because of this guarantee, permanent fruits command a significantly higher Robux price and Blox Fruits trade value than their regular counterparts.",
      },
    },
    {
      "@type": "Question",
      name: "How often does the Blox Fruits value list update?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Blox Fruit values update daily and are recalculated within hours of any major patch. Buffs, nerfs, and new fruit releases can all impact trade value and demand rapidly.",
      },
    },
    {
      "@type": "Question",
      name: "What is BFV in Blox Fruits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BFV stands for Blox Fruits Values — it refers to the community-tracked trading value system for Blox Fruits devil fruits. BFV values are what players use to determine fair trades.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if my Blox Fruits trade is fair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the free Blox Fruits trade calculator at bloxfruitsai.com/calculator. Add the fruits on both sides of the trade and the tool instantly tells you the total value on each side and whether the deal is fair.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Blox Fruit value chart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Blox Fruit value chart is a ranked table showing every devil fruit ordered by trade value, demand, or tier. It lets you quickly compare fruit prices and find the most valuable items to trade or acquire.",
      },
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Blox Fruits Value List 2026",
  url: "https://www.bloxfruitsai.com/values",
  description: "Complete real-time trade value list for all Blox Fruits devil fruits including trade value, Robux price, demand scores, and tier rankings. Updated after every patch.",
  dateModified: "2026-05-06",
  creator: { "@type": "Organization", name: "BloxFruitsAI", url: "https://www.bloxfruitsai.com" },
  keywords: ["Blox Fruits value list", "Blox Fruits trade value", "BFV values", "Blox Fruit prices", "Blox Fruits value chart", "blox fruit trading value 2026"],
};

export default function ValuesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ValuesClient />
    </>
  );
}
