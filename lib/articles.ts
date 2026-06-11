import fs from 'fs'
import path from 'path'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export interface ArticleFrontmatter {
  title: string
  description: string
  publishedAt: string
  modifiedAt?: string
  category: 'news' | 'academy' | 'tactics' | 'training' | 'analytics' | 'transfers'
  tags: string[]
  keywords: string[]
  author: string
  ogImage?: string
  featured?: boolean
  faq?: Array<{ question: string; answer: string }>
}

export interface Article extends ArticleFrontmatter {
  slug: string
  content: string
  readingTime: number
}

function parseFrontmatter(raw: string): { frontmatter: ArticleFrontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('Invalid frontmatter')

  const fmRaw = match[1]
  const content = match[2].trim()

  // Simple YAML parser for our controlled format
  const fm: Record<string, unknown> = {}
  let currentKey = ''
  let inArray = false
  let inFaqArray = false
  const faqItems: Array<{ question: string; answer: string }> = []
  let currentFaq: Partial<{ question: string; answer: string }> = {}

  for (const line of fmRaw.split('\n')) {
    const arrayItem = line.match(/^  - (.+)$/)
    const faqKey = line.match(/^    (question|answer): (.+)$/)
    const faqStart = line.match(/^  - $/)
    const keyVal = line.match(/^(\w+): (.+)$/)
    const arrayStart = line.match(/^(\w+):$/)

    if (faqKey && inFaqArray) {
      currentFaq[faqKey[1] as 'question' | 'answer'] = faqKey[2].replace(/^["']|["']$/g, '')
    } else if (faqStart && inFaqArray) {
      if (currentFaq.question) faqItems.push(currentFaq as { question: string; answer: string })
      currentFaq = {}
    } else if (arrayItem && inArray) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = []
      ;(fm[currentKey] as string[]).push(arrayItem[1].replace(/^["']|["']$/g, ''))
    } else if (keyVal) {
      inArray = false
      inFaqArray = false
      if (currentFaq.question) { faqItems.push(currentFaq as { question: string; answer: string }); currentFaq = {} }
      fm[keyVal[1]] = keyVal[2].replace(/^["']|["']$/g, '')
    } else if (arrayStart) {
      currentKey = arrayStart[1]
      inArray = currentKey !== 'faq'
      inFaqArray = currentKey === 'faq'
      fm[currentKey] = inFaqArray ? [] : []
    }
  }

  if (currentFaq.question) faqItems.push(currentFaq as { question: string; answer: string })
  if (inFaqArray) fm.faq = faqItems

  return { frontmatter: fm as unknown as ArticleFrontmatter, content }
}

function calcReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / 200)
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8')
      const { frontmatter, content } = parseFrontmatter(raw)
      return { ...frontmatter, slug, content, readingTime: calcReadingTime(content) }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  const fallback = path.join(ARTICLES_DIR, `${slug}.md`)
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!target) return null

  const raw = fs.readFileSync(target, 'utf-8')
  const { frontmatter, content } = parseFrontmatter(raw)
  return { ...frontmatter, slug, content, readingTime: calcReadingTime(content) }
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return getAllArticles().filter(a => a.category === category)
}

export function getFeaturedArticles(limit = 3): Article[] {
  const all = getAllArticles()
  const featured = all.filter(a => a.featured)
  return (featured.length >= limit ? featured : all).slice(0, limit)
}
