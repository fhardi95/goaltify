import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Football Shop — Kits, Boots & Training Gear',
  description: 'Shop the best football kits, boots, and training equipment. Curated picks and exclusive Goaltify merchandise. Free delivery available.',
  keywords: ['football shop', 'football kits', 'football boots', 'training equipment', 'football merchandise'],
}

// Affiliate product picks — replace hrefs with your Amazon Associates / Kitbag affiliate links
const FEATURED_PRODUCTS = [
  {
    name: 'Nike Mercurial Superfly 10',
    category: 'Boots',
    price: '£229.99',
    desc: 'The boot of choice for explosive wide players. Lightweight Flyknit upper and Zoom Air unit.',
    href: 'https://www.amazon.co.uk/s?k=Nike+Mercurial+Superfly&tag=YOUR_AFFILIATE_TAG',
    badge: 'Editor\'s pick',
    badgeColor: 'bg-brand-500/20 text-brand-400 border-brand-500/30',
    icon: '👟',
  },
  {
    name: 'Adidas Predator 24',
    category: 'Boots',
    price: '£179.99',
    desc: 'Control-focused boot with rubberised zones for pinpoint passing and shooting accuracy.',
    href: 'https://www.amazon.co.uk/s?k=Adidas+Predator+24&tag=YOUR_AFFILIATE_TAG',
    badge: null,
    badgeColor: '',
    icon: '👟',
  },
  {
    name: 'Nike Academy Training Ball',
    category: 'Equipment',
    price: '£24.99',
    desc: 'FIFA Quality Pro approved for all surfaces. Great for daily training and skill work.',
    href: 'https://www.amazon.co.uk/s?k=Nike+Academy+training+ball&tag=YOUR_AFFILIATE_TAG',
    badge: 'Best value',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: '⚽',
  },
  {
    name: 'Reusch Goalkeeper Gloves',
    category: 'Gloves',
    price: '£39.99',
    desc: 'Professional-grade latex palm with finger protection. Excellent grip in wet conditions.',
    href: 'https://www.amazon.co.uk/s?k=Reusch+goalkeeper+gloves&tag=YOUR_AFFILIATE_TAG',
    badge: null,
    badgeColor: '',
    icon: '🧤',
  },
  {
    name: 'Puma Borussia Speed Training Cone Set',
    category: 'Training',
    price: '£12.99',
    desc: '50-piece set of flat and tall cones. Essential for speed ladders, dribbling drills and agility work.',
    href: 'https://www.amazon.co.uk/s?k=football+training+cones+set&tag=YOUR_AFFILIATE_TAG',
    badge: null,
    badgeColor: '',
    icon: '🏃',
  },
  {
    name: 'Adidas Team Kit — Entrada 22',
    category: 'Kits',
    price: 'From £14.99',
    desc: 'Lightweight and breathable club kit. Available in 12 colours, customisable with names and numbers.',
    href: 'https://www.amazon.co.uk/s?k=Adidas+Entrada+22+kit&tag=YOUR_AFFILIATE_TAG',
    badge: null,
    badgeColor: '',
    icon: '👕',
  },
]

const MERCH_ITEMS = [
  { name: 'Goaltify Classic Tee', price: '£24.99', desc: 'Soft cotton with the Goaltify crest. Available S–2XL.' },
  { name: 'Goaltify Hoodie', price: '£44.99', desc: 'Heavyweight fleece in dark green. Perfect for cold training sessions.' },
  { name: 'Goaltify Training Cap', price: '£19.99', desc: 'Structured 6-panel cap with embroidered logo.' },
]

export default function ShopPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Goaltify Shop</h1>
        <p className="text-gray-400 text-sm">Curated football gear picks and exclusive Goaltify merchandise. Some links are affiliate links — we earn a small commission at no extra cost to you.</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-8">
        {['All', 'Boots', 'Kits', 'Training', 'Gloves', 'Goaltify Merch'].map(cat => (
          <button key={cat} className={`px-3 py-1.5 text-xs rounded-full transition-colors ${cat === 'All' ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured affiliate products */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">⭐ Editor's picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_PRODUCTS.map(product => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="card p-5 hover:border-gray-700 transition-colors group block"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{product.icon}</span>
                <div className="text-right">
                  {product.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium block mb-1 ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{product.category}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{product.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{product.price}</span>
                <span className="text-xs text-brand-400 font-medium">View on Amazon →</span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">* Affiliate links. As an Amazon Associate, Goaltify earns from qualifying purchases.</p>
      </section>

      {/* Goaltify branded merch (Printify POD) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">⚽ Goaltify Merch</h2>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">Print on demand · Ships worldwide</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MERCH_ITEMS.map(item => (
            <div key={item.name} className="card p-5">
              <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-4xl">⚽</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{item.price}</span>
                <button className="text-xs px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
                  Coming soon
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="card p-4 mt-4 flex items-center gap-3">
          <span className="text-2xl">📬</span>
          <div>
            <p className="text-sm font-medium text-white">Get notified when the Goaltify store launches</p>
            <p className="text-xs text-gray-500">Subscribe to our newsletter and be first to shop.</p>
          </div>
          <Link href="/newsletter" className="ml-auto shrink-0 text-xs px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
            Notify me
          </Link>
        </div>
      </section>

      {/* Kitbag affiliate */}
      <section className="card p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="text-4xl">👕</div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-1">Official club kits at Kitbag</h3>
          <p className="text-sm text-gray-400">Premier League, La Liga, Champions League — official licensed kits with personalisation. Goaltify's official kit partner.</p>
        </div>
        <a
          href="https://www.kitbag.com?ref=goaltify"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Shop Kitbag →
        </a>
      </section>
    </div>
  )
}
