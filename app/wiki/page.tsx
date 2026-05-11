import type { Metadata } from "next";
import WikiClient from "./WikiClient";

export const metadata: Metadata = {
  title: "Blox Fruits Wiki — All Fruits, Moves & Trade Values 2026",
  description:
    "Complete Blox Fruits wiki with every devil fruit, all moves, tier ratings, PVP and PVE scores, trade values, and best builds. Updated after every patch.",
  alternates: { canonical: "https://www.bloxfruitsai.com/wiki" },
  openGraph: {
    title: "Blox Fruits Wiki — All Fruits, Moves & Trade Values 2026",
    description:
      "Complete Blox Fruits wiki with every devil fruit, all moves, tier ratings, PVP and PVE scores, trade values, and best builds.",
    url: "https://www.bloxfruitsai.com/wiki",
    type: "website",
  },
};

export default function WikiPage() {
  return <WikiClient />;
}
