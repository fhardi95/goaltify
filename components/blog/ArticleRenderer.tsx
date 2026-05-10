import Link from 'next/link'

interface Props {
  content: string
}

// Lightweight markdown-to-HTML renderer for our article format
// Handles: headers, bold, italic, links, lists, blockquotes, code, paragraphs
function renderMarkdown(md: string): string {
  return md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="bg-gray-800 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code class="language-${lang} text-gray-200">${code.trim()}</code></pre>`
    )
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-brand-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-white mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3 border-b border-gray-800 pb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-brand-500 pl-4 my-4 text-gray-400 italic">$1</blockquote>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-gray-300">$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-400 hover:text-brand-300 underline underline-offset-2">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="flex gap-2 items-start"><span class="text-brand-400 mt-1 shrink-0">•</span><span>$1</span></li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="flex gap-2 items-start text-gray-300"><span>$1</span></li>')
    // Wrap list items
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="space-y-2 my-4 text-gray-300">$&</ul>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-gray-800 my-8" />')
    // Paragraphs — wrap non-tag lines
    .replace(/^(?!<[a-z]).+$/gm, '<p class="text-gray-300 leading-relaxed my-3">$&</p>')
    // Clean up empty paragraphs
    .replace(/<p[^>]*>\s*<\/p>/g, '')
}

export function ArticleRenderer({ content }: Props) {
  const html = renderMarkdown(content)

  return (
    <article
      className="article-body max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
