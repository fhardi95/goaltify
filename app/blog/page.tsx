import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Goaltify Blog — Football News, Guides & Tactical Analysis",
  description: "Latest football news, Premier League analysis, training guides, and tactical breakdowns from the Goaltify team. Improve your game and stay ahead of the action.",
  alternates: { canonical: "https://www.goaltify.com/blog" },
};

export default function BlogPage() {
  return <BlogClient />;
}
