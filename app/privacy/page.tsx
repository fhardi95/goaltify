import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Goaltify privacy policy — how we collect, use, and protect your data under GDPR.',
  robots: { index: true, follow: false },
}

export default function PrivacyPage() {
  const updated = '10 May 2026'

  return (
    <div className="container-site py-10 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-1">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {updated}</p>

      <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300">

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Who we are</h2>
          <p>
            Goaltify ("<strong>we</strong>", "<strong>us</strong>") operates goaltify.com, a football news,
            live scores, and guides website. We are committed to protecting your personal data in line with
            the UK GDPR and EU GDPR.
          </p>
          <p className="mt-2">Contact: <a href="mailto:privacy@goaltify.com" className="text-brand-400 hover:underline">privacy@goaltify.com</a></p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. What data we collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Essential cookies</strong> — session identifiers, security tokens. No personal data.</li>
            <li><strong>Analytics</strong> (only with your consent) — anonymised page views via Google Analytics 4. IP addresses are anonymised.</li>
            <li><strong>Newsletter</strong> — your email address if you subscribe, stored securely.</li>
            <li><strong>Contact forms</strong> — name and email when you contact us.</li>
          </ul>
          <p className="mt-2 text-sm">We do <strong>not</strong> sell your data. We do <strong>not</strong> collect sensitive personal data.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Cookies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">Cookie</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-medium">Purpose</th>
                  <th className="text-left py-2 text-gray-400 font-medium">Consent needed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr><td className="py-2 pr-4">goaltify_cookie_consent</td><td className="pr-4">Stores your cookie preference</td><td>No (essential)</td></tr>
                <tr><td className="py-2 pr-4">_ga, _ga_*</td><td className="pr-4">Google Analytics 4 — anonymised traffic stats</td><td>Yes</td></tr>
                <tr><td className="py-2 pr-4">_gads</td><td className="pr-4">Google AdSense — advertising</td><td>Yes</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Your rights (GDPR)</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Access</strong> — request a copy of data we hold about you.</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate data.</li>
            <li><strong>Erasure</strong> — ask us to delete your data ("right to be forgotten").</li>
            <li><strong>Withdraw consent</strong> — change cookie preferences at any time using the banner.</li>
            <li><strong>Complain</strong> — you have the right to lodge a complaint with the ICO (UK) at ico.org.uk.</li>
          </ul>
          <p className="mt-2 text-sm">To exercise any right, email <a href="mailto:privacy@goaltify.com" className="text-brand-400 hover:underline">privacy@goaltify.com</a>. We respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Third-party services</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>API-Football</strong> (api-sports.io) — provides live scores. No user data is shared.</li>
            <li><strong>NewsAPI</strong> — provides news headlines. No user data is shared.</li>
            <li><strong>Google Analytics 4</strong> — analytics (consent required). Data processed by Google LLC.</li>
            <li><strong>Vercel</strong> — hosting. May log IP addresses for security (legitimate interest).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Data retention</h2>
          <p className="text-sm">Analytics data is retained for 14 months (Google Analytics default). Newsletter emails are held until you unsubscribe. Contact form data is deleted after 12 months.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Changes to this policy</h2>
          <p className="text-sm">We may update this policy. Material changes will be flagged via the cookie banner. The "last updated" date at the top always reflects the current version.</p>
        </section>

      </div>
    </div>
  )
}
