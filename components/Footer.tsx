import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,245,255,0.13)", padding: "3rem 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <Link href="/" style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: "#00f5ff", display: "block", marginBottom: "1rem", textDecoration: "none" }}>
              BLOXFRUITS<span style={{ color: "#ffd700" }}>AI</span>
            </Link>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              The smartest AI-powered companion for Roblox Blox Fruits players. Real-time tier lists, trade calculator, and build guides — updated after every patch.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["𝕏","Twitter"],["⊕","Discord"],["▶","YouTube"],["♪","TikTok"]].map(([icon, label]) => (
                <a key={label} href="#" aria-label={label} style={{ width: 36, height: 36, border: "1px solid rgba(0,245,255,0.13)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#7a96b8", textDecoration: "none" }}>{icon}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a96b8", marginBottom: "1rem", fontWeight: 600 }}>Tools</h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "AI Fruit Finder", href: "/#ai-tool" },
                { label: "Tier List", href: "/#tier-list" },
                { label: "Value List", href: "/values" },
                { label: "Trade Calculator", href: "/calculator" },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <Link href={l.href} style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.88rem" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a96b8", marginBottom: "1rem", fontWeight: 600 }}>Guides</h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "PVP Builds 2026", href: "/guides/pvp-builds" },
                { label: "Grinding Routes", href: "/guides/grinding-routes" },
                { label: "Fruit Rankings", href: "/guides/fruit-rankings" },
                { label: "Race Guide", href: "/guides/race-guide" },
                { label: "Beginner Guide", href: "/guides/beginner-guide" },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <Link href={l.href} style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.88rem" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a96b8", marginBottom: "1rem", fontWeight: 600 }}>Company</h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "Wiki", href: "/wiki" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Use", href: "/terms-of-use" },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <Link href={l.href} style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.88rem" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,245,255,0.13)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.8rem" }}>© 2026 BloxFruitsAI.com · Not affiliated with Roblox Corporation</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy-policy" style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.8rem" }}>Privacy Policy</Link>
            <Link href="/terms-of-use" style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.8rem" }}>Terms of Use</Link>
          </div>
        </div>
      </div>
      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        @media(max-width:900px){ .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px){ .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
