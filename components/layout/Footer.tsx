import Link from 'next/link'

const LINKS = {
  Competitions: [
    { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League', href: '/competitions/premier-league' },
    { label: '🇩🇪 Bundesliga',      href: '/competitions/bundesliga' },
    { label: '🇪🇸 La Liga',         href: '/competitions/la-liga' },
    { label: '🇮🇹 Serie A',         href: '/competitions/serie-a' },
    { label: '🇫🇷 Ligue 1',         href: '/competitions/ligue-1' },
  ],
  Academy: [
    { label: 'Training guides',   href: '/academy/training' },
    { label: 'Dribbling skills',  href: '/academy/dribbling' },
    { label: 'Tactics',           href: '/academy/tactics' },
    { label: 'Fitness & nutrition', href: '/academy/fitness' },
  ],
  Tools: [
    { label: 'xG Calculator',    href: '/tools/calculators/xg-calculator' },
    { label: 'Formation builder', href: '/tools/formations' },
    { label: 'Pass accuracy',    href: '/tools/calculators/pass-accuracy-calculator' },
    { label: 'Top players',      href: '/players' },
    { label: 'Shop',             href: '/shop' },
  ],
  Goaltify: [
    { label: 'About us',    href: '/about' },
    { label: 'Contact',     href: '/contact' },
    { label: 'Newsletter',  href: '/#newsletter' },
    { label: 'Privacy',     href: '/privacy' },
    { label: 'Terms',       href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Logo + tagline */}
        <Link href="/" className="footer-logo">
          <span className="text-2xl">⚽</span>
          <span>Goal<span className="accent">tify</span></span>
        </Link>
        <p className="text-xs text-[#555] mb-6 max-w-sm leading-relaxed">
          Football news, live scores, competitions and training guides — free for fans everywhere.
          Follow every FIFA World Cup 2026 match live on Goaltify.
        </p>

        {/* Link columns */}
        <div className="footer-grid">
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section} className="footer-col">
              <h4>{section}</h4>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Goaltify. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
