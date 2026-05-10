import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Goaltify terms of use — rules for using goaltify.com.',
  robots: { index: true, follow: false },
}

export default function TermsPage() {
  return (
    <div className="container-site py-10 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-1">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: 10 May 2026</p>
      <div className="space-y-6 text-sm text-gray-300">
        <section>
          <h2 className="text-base font-semibold text-white mb-2">1. Acceptance of terms</h2>
          <p>By accessing goaltify.com you agree to these terms. If you do not agree, please do not use the site.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">2. Content</h2>
          <p>All content on Goaltify is for informational purposes only. We make no warranties about accuracy of live scores, statistics or news articles. Football data is sourced from third-party APIs and may occasionally contain errors.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">3. Affiliate links</h2>
          <p>Some links on Goaltify (particularly in the Shop section) are affiliate links. We earn a small commission when you purchase through these links at no extra cost to you. We only recommend products we genuinely believe are good value.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">4. Intellectual property</h2>
          <p>All original written content, tools, and design on Goaltify is owned by Goaltify and may not be reproduced without permission. Football data and statistics are sourced from licensed third-party providers.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">5. Limitation of liability</h2>
          <p>Goaltify is not liable for any loss or damage arising from use of the site, including inaccurate scores or statistics.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">6. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-white mb-2">7. Contact</h2>
          <p>Questions? Email <a href="mailto:hello@goaltify.com" className="text-brand-400 hover:underline">hello@goaltify.com</a></p>
        </section>
      </div>
    </div>
  )
}
