import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blox Fruits AI Blog — News, Guides & Patch Analysis",
  description: "Latest Blox Fruits news, patch analysis, meta updates, and in-depth guides from the BloxFruitsAI team. Stay ahead of every update.",
  alternates: { canonical: "https://www.bloxfruitsai.com/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
