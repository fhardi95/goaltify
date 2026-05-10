import { buildFAQSchema } from '@/lib/seo'

interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: Props) {
  if (!faqs?.length) return null
  const schema = buildFAQSchema(faqs)

  return (
    <section className="mt-10 border-t border-gray-800 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-xl font-bold text-white mb-6">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map(({ question, answer }) => (
          <div key={question} className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-2">{question}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
