import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'
import { ArticleRenderer } from '@/components/blog/ArticleRenderer'
import { FAQSection } from '@/components/blog/FAQSection'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params for all articles at build time
export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return buildMetadata({
    title: article.title,
    description: article.description,
    canonical: `https://goaltify.com/news/${slug}`,
    ogImage: article.ogImage,
    ogType: 'article',
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
    keywords: article.keywords,
    faqSchema: article.faq,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const schema = buildArticleSchema({
    title: article.title,
    description: article.description,
    canonical: `https://goaltify.com/news/${slug}`,
    ogImage: article.ogImage,
    publishedAt: article.publishedAt,
    modifiedAt: article.modifiedAt,
  })

  const allArticles = getAllArticles()
  const related = allArticles
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

  return (
    <div className="container-site py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Article */}
        <div className="lg:col-span-2">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-gray-300">News</Link>
            <span>/</span>
            <span className="text-gray-400 capitalize">{article.category}</span>
          </nav>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full capitalize">
                {article.category}
              </span>
              {article.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              {article.title}
            </h1>
            <p className="text-gray-400 text-base leading-relaxed mb-4">{article.description}</p>

            <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-800 pt-4">
              <span>By <strong className="text-gray-300">{article.author}</strong></span>
              <span>·</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </time>
              {article.modifiedAt && article.modifiedAt !== article.publishedAt && (
                <>
                  <span>·</span>
                  <span>Updated {new Date(article.modifiedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </>
              )}
              <span>·</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>

          {/* Content */}
          <ArticleRenderer content={article.content} />

          {/* FAQ */}
          {article.faq && <FAQSection faqs={article.faq} />}

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-800">
              {article.tags.map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-20 space-y-4">
            <h3 className="text-sm font-semibold text-white">More {article.category}</h3>
            {related.length === 0 ? (
              <p className="text-xs text-gray-600">More articles coming soon.</p>
            ) : (
              <div className="space-y-2">
                {related.map(rel => (
                  <Link key={rel.slug} href={`/news/${rel.slug}`} className="card p-3 block hover:border-gray-700 transition-colors group">
                    <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">{rel.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{rel.readingTime} min read</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="card p-4 mt-4">
              <h3 className="text-sm font-semibold text-white mb-1">📬 Weekly football digest</h3>
              <p className="text-xs text-gray-400 mb-3">The best stories, scores and guides every Sunday.</p>
              <Link href="/newsletter" className="block text-center text-xs py-2 px-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
                Subscribe free →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
