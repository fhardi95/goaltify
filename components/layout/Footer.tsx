import Link from 'next/link'

const LINKS = {
  Content: [
    { label: 'Live scores', href: '/live-scores' },
    { label: 'News', href: '/news' },
    { label: 'World Cup 2026', href: '/world-cup' },
    { label: 'Euro Championship', href: '/euros' },
  ],
  Academy: [
    { label: 'Training guides', href: '/academy/training' },
    { label: 'Dribbling skills', href: '/academy/dribbling' },
    { label: 'Tactics', href: '/academy/tactics' },
    { label: 'Fitness & nutrition', href: '/academy/fitness' },
  ],
  Tools: [
    { label: 'Metric calculators', href: '/tools/calculators' },
    { label: 'Formation builder', href: '/tools/formations' },
    { label: 'xG explainer', href: '/tools/xg' },
    { label: 'Shop', href: '/shop' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-16">
      <div className="container-site py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <span>⚽</span>
              <span>
                <span className="text-brand-400">Goal</span>
                <span className="text-white">tify</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Football news, live scores, and guides for fans everywhere.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Goaltify. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
