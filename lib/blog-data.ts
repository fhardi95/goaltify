export type BlogSection = {
  title: string;
  content: string;
};

export const BLOG_POSTS = [
  {
    slug: "best-fruits",
    title: "Best Fruits in Blox Fruits",
    sections: [
      { title: "Top Tier", content: "Leopard, Dragon..." }
    ]
  }
];

export function getAllSlugs() {
  return BLOG_POSTS.map(post => post.slug);
}

export function getPost(slug: string) {
  return BLOG_POSTS.find(post => post.slug === slug);
}