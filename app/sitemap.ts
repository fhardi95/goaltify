import type { MetadataRoute } from "next";
import { getAllSlugs } from "./_data/blog-data";
import { getAllWikiSlugs } from "./_data/wiki-data";
import { FRUITS } from "./_data/fruits-data";

const BASE_URL = "https://www.bloxfruitsai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── CORE PAGES ──────────────────────────────────────────────────────────────
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/values`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // ── FRUIT VALUE PAGES ────────────────────────────────────────────────────────
  const fruitRoutes: MetadataRoute.Sitemap = FRUITS.map(fruit => ({
    url: `${BASE_URL}/values/fruits/${fruit.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.92,
  }));

  // ── WIKI ─────────────────────────────────────────────────────────────────────
  const wikiIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/wiki`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.92,
    },
  ];

  const wikiRoutes: MetadataRoute.Sitemap = getAllWikiSlugs().map(slug => ({
    url: `${BASE_URL}/wiki/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  // ── GUIDES ───────────────────────────────────────────────────────────────────
  const guideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/guides/pvp-builds`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/guides/fruit-rankings`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/guides/grinding-routes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/guides/race-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/guides/beginner-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];

  // ── BLOG ─────────────────────────────────────────────────────────────────────
  const blogIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.75,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllSlugs().map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── COMPANY ──────────────────────────────────────────────────────────────────
  const companyRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2025-04-22"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2025-04-22"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2025-04-22"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      lastModified: new Date("2025-04-22"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [
    ...coreRoutes,
    ...fruitRoutes,
    ...wikiIndexRoute,
    ...wikiRoutes,
    ...guideRoutes,
    ...blogIndexRoute,
    ...blogRoutes,
    ...companyRoutes,
  ];
}
