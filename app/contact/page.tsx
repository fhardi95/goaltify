import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Goaltify',
  description: 'Get in touch with the Goaltify team — editorial, partnerships, advertising and general enquiries.',
}

export default function ContactPage() {
  return (
    <div className="container-site py-10 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-2">Contact us</h1>
      <p className="text-gray-400 text-sm mb-8">We'd love to hear from you. Use the email addresses below or fill in the form.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'General enquiries', email: 'hello@goaltify.com', icon: '💬' },
          { label: 'Editorial & tips', email: 'news@goaltify.com', icon: '📰' },
          { label: 'Advertising & partnerships', email: 'partnerships@goaltify.com', icon: '🤝' },
          { label: 'Privacy & data', email: 'privacy@goaltify.com', icon: '🔒' },
        ].map(c => (
          <div key={c.email} className="card p-4">
            <p className="text-lg mb-1">{c.icon}</p>
            <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
            <a href={`mailto:${c.email}`} className="text-sm text-brand-400 hover:underline">{c.email}</a>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="text-base font-semibold text-white mb-4">Send a message</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Name</label>
            <input type="text" placeholder="Your name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Message</label>
            <textarea rows={4} placeholder="Your message..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 resize-none" />
          </div>
          <button className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors">
            Send message
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-3">We aim to respond within 48 hours.</p>
      </div>
    </div>
  )
}
