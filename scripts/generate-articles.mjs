#!/usr/bin/env node
/**
 * Goaltify Auto-Article Generator
 * ─────────────────────────────────
 * Uses Claude API to generate SEO-optimised football articles weekly.
 * Run via GitHub Actions or locally: node scripts/generate-articles.mjs
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '../content/articles')
const API_KEY = process.env.ANTHROPIC_API_KEY

if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not set')
  process.exit(1)
}

// ─── Target topics (add more here as the site grows) ─────────────────────────
const TOPICS = [
  {
    slug: 'how-to-dribble-past-a-defender',
    category: 'academy',
    keyword: 'how to dribble past a defender',
    title: 'How to Dribble Past a Defender: 7 Techniques Used by Elite Players',
    tags: ['dribbling', 'skills', 'training', 'beginner'],
  },
  {
    slug: 'what-is-xg-in-football',
    category: 'analytics',
    keyword: 'what is xG in football',
    title: 'What is xG in Football? Expected Goals Explained Simply',
    tags: ['xG', 'analytics', 'statistics', 'tactics'],
  },
  {
    slug: '4-3-3-formation-guide',
    category: 'tactics',
    keyword: '4-3-3 formation football guide',
    title: '4-3-3 Formation: The Complete Guide — Strengths, Weaknesses & How to Play It',
    tags: ['tactics', 'formation', '4-3-3', 'coaching'],
  },
  {
    slug: 'how-to-improve-football-fitness',
    category: 'training',
    keyword: 'how to improve football fitness',
    title: 'How to Improve Your Football Fitness: A 6-Week Training Plan',
    tags: ['fitness', 'training', 'conditioning', 'endurance'],
  },
  {
    slug: 'world-cup-2026-preview',
    category: 'news',
    keyword: 'FIFA World Cup 2026 preview',
    title: 'FIFA World Cup 2026: Everything You Need to Know',
    tags: ['World Cup', 'FIFA', '2026', 'international'],
  },
  {
    slug: 'how-to-take-a-free-kick',
    category: 'academy',
    keyword: 'how to take a free kick in football',
    title: 'How to Take a Free Kick: Technique, Power & Placement Explained',
    tags: ['free kick', 'technique', 'shooting', 'skills'],
  },
  {
    slug: 'premier-league-top-scorers-2025-26',
    category: 'news',
    keyword: 'Premier League top scorers 2025-26',
    title: 'Premier League Top Scorers 2025-26: Golden Boot Race Tracker',
    tags: ['Premier League', 'top scorers', 'Golden Boot', 'statistics'],
  },
]

// ─── Article prompt template ──────────────────────────────────────────────────
function buildPrompt(topic) {
  return `You are an expert football journalist and SEO content writer for Goaltify.com, a UK-based football blog.

Write a comprehensive, SEO-optimised article about: "${topic.keyword}"

ARTICLE REQUIREMENTS:
- Title: ${topic.title}
- Category: ${topic.category}  
- Primary keyword: "${topic.keyword}" (use in first 100 words, H1, and 2-3 times naturally)
- Minimum 1,500 words of genuine value
- UK English spelling throughout
- Write in first person occasionally ("At Goaltify, we...") for EEAT signals
- Front-load the direct answer in the first 2 paragraphs (critical for AI citation)
- Include: personal-sounding insights, specific examples, practical tips
- Link suggestions: mention "see our [related guide]" naturally 2-3 times

STRUCTURE (use these exact headers):
## [Direct answer / key takeaway — answer the question immediately]
## [Second main subtopic with secondary keyword]
## [Third main subtopic]  
## [Practical tips / step-by-step section]
## [Common mistakes to avoid]
## Conclusion

ALSO INCLUDE at the end, a FAQ section with exactly 5 questions formatted as:
FAQ_START
Q: [question using natural search phrasing]
A: [2-3 sentence answer, concise and direct]
[repeat for all 5]
FAQ_END

TONE: Authoritative but accessible. Like a knowledgeable friend who played Sunday league and also reads Opta data. Not corporate. Not AI-sounding.

OUTPUT FORMAT: Return ONLY the article body markdown (no frontmatter, no title — I'll add those). Start with the first ## heading.`
}

// ─── Parse FAQ from generated content ────────────────────────────────────────
function extractFAQ(content) {
  const match = content.match(/FAQ_START\n([\s\S]*?)\nFAQ_END/)
  if (!match) return { content, faq: [] }

  const faqRaw = match[1]
  const cleanContent = content.replace(/FAQ_START[\s\S]*?FAQ_END/, '').trim()

  const faq = []
  const pairs = faqRaw.split(/\nQ: /).filter(Boolean)
  for (const pair of pairs) {
    const [q, ...aParts] = pair.split('\nA: ')
    if (q && aParts.length) {
      faq.push({
        question: q.trim(),
        answer: aParts.join('\nA: ').trim(),
      })
    }
  }

  return { content: cleanContent, faq }
}

// ─── Write MDX file ───────────────────────────────────────────────────────────
function writeMDX(topic, content, faq) {
  const today = new Date().toISOString().split('T')[0]
  const faqYaml = faq.length
    ? `faq:\n${faq.map(f => `  -\n    question: "${f.question.replace(/"/g, "'")}"\n    answer: "${f.answer.replace(/"/g, "'")}"`).join('\n')}`
    : ''

  const frontmatter = `---
title: "${topic.title}"
description: "Comprehensive guide to ${topic.keyword}. Expert tips, techniques and analysis from Goaltify."
publishedAt: "${today}"
category: ${topic.category}
tags:
${topic.tags.map(t => `  - ${t}`).join('\n')}
keywords:
  - ${topic.keyword}
  - football
  - ${topic.tags[0]}
author: Goaltify Editorial
featured: false
${faqYaml}
---

`

  const filePath = path.join(ARTICLES_DIR, `${topic.slug}.mdx`)
  fs.writeFileSync(filePath, frontmatter + content, 'utf-8')
  console.log(`✅ Written: content/articles/${topic.slug}.mdx`)
}

// ─── Generate a single article ────────────────────────────────────────────────
async function generateArticle(topic) {
  const filePath = path.join(ARTICLES_DIR, `${topic.slug}.mdx`)

  // Skip if already exists (don't overwrite manual edits)
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping (already exists): ${topic.slug}`)
    return
  }

  console.log(`🤖 Generating: ${topic.title}`)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{ role: 'user', content: buildPrompt(topic) }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error(`❌ API error for ${topic.slug}:`, err)
    return
  }

  const data = await response.json()
  const rawContent = data.content?.[0]?.text ?? ''

  if (!rawContent) {
    console.error(`❌ Empty response for ${topic.slug}`)
    return
  }

  const { content, faq } = extractFAQ(rawContent)
  writeMDX(topic, content, faq)

  // Rate limit: 2s between requests
  await new Promise(r => setTimeout(r, 2000))
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Ensure articles directory exists
  fs.mkdirSync(ARTICLES_DIR, { recursive: true })

  console.log(`\n🚀 Goaltify Article Generator`)
  console.log(`📁 Output: content/articles/`)
  console.log(`📝 Topics: ${TOPICS.length}\n`)

  // In GitHub Actions, only generate the first 2 to save API costs
  // Run locally without limit flag to generate all
  const limit = process.argv.includes('--all') ? TOPICS.length : 2
  const topics = TOPICS.slice(0, limit)

  for (const topic of topics) {
    await generateArticle(topic)
  }

  console.log('\n✨ Done! Run `npm run dev` to see your articles at /news')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
