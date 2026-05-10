import Image from 'next/image'
import Link from 'next/link'
import type { NewsArticle } from '@/types'

interface Props {
  article: NewsArticle
  featured?: boolean
}

export function NewsCard({ article, featured }: Props) {
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const h = Math.floor(diff / 3_600_000)
    if (h < 1) return `${Math.floor(diff / 60_000)}m ago`
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card group flex overflow-hidden hover:border-gray-700 transition-all ${
        featured ? 'flex-col' : 'flex-row gap-3 p-3'
      }`}
    >
      {article.urlToImage && (
        <div className={`relative overflow-hidden ${
          featured ? 'h-48' : 'w-24 h-20 rounded-lg shrink-0'
        }`}>
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '96px'}
          />
        </div>
      )}

      <div className={featured ? 'p-4' : 'flex-1 min-w-0'}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs text-brand-400 font-medium">{article.source.name}</span>
          <span className="text-gray-600">·</span>
          <span className="text-xs text-gray-500">{timeAgo(article.publishedAt)}</span>
        </div>
        <h3 className={`font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-2 ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {article.title}
        </h3>
        {featured && article.description && (
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{article.description}</p>
        )}
      </div>
    </Link>
  )
}
