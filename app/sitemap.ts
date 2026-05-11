import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.goaltify.com'

// Static pages with their priorities and change frequencies
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/live-scores`,
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/news`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/world-cup`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/euros`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/academy`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/academy/dribbling`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/academy/training`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/academy/tactics`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/academy/fitness`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/tools`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/tools/calculators`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/tools/formations`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/shop`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/newsletter`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/privacy`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
]

// Academy guides — these get individual URLs for SEO
const ACADEMY_GUIDES = [
  'how-to-dribble-past-a-defender',
  'stepover-tutorial',
  'how-to-nutmeg',
  'first-touch-drills',
  'how-to-shoot-with-power',
  'how-to-take-a-free-kick',
].map(slug => ({
  url: `${BASE_URL}/academy/dribbling/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

const TRAINING_GUIDES = [
  'pre-match-warm-up-routine',
  'speed-training-drills',
  'injury-prevention-for-footballers',
  'football-diet-plan',
  'strength-training-for-footballers',
].map(slug => ({
  url: `${BASE_URL}/academy/training/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

const TACTICS_GUIDES = [
  '4-3-3-formation-guide',
  'high-press-explained',
  'how-to-defend-set-pieces',
  '4-4-2-formation-guide',
  'tiki-taka-explained',
  'counter-pressing-gegenpressing',
].map(slug => ({
  url: `${BASE_URL}/academy/tactics/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}))

const TOOL_PAGES = [
  'xg-calculator',
  'pass-accuracy-calculator',
  'sprint-speed-converter',
  'football-metric-glossary',
].map(slug => ({
  url: `${BASE_URL}/tools/calculators/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}))

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES,
    ...ACADEMY_GUIDES,
    ...TRAINING_GUIDES,
    ...TACTICS_GUIDES,
    ...TOOL_PAGES,
  ]
}
