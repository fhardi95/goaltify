import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Blox Fruits Guides 2026 — Builds PVP, Farm, Tier Lists & Plus",
  description: "Complete Blox Fruits guides for 2026: best PVP builds, farming routes, fruit tier lists, race guides, and beginner tutorials — updated after every patch.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides" },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
