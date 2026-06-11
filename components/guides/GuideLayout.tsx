import Link from "next/link";
import type { ReactNode } from "react";

interface GuideLayoutProps {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  breadcrumb: { label: string; href: string }[];
  children: ReactNode;
  readTime?: string;
  updatedDate?: string;
}

export default function GuideLayout({ tag, title, titleHighlight, description, breadcrumb, children, readTime = "8 min read", updatedDate = "April 2025" }: GuideLayoutProps) {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "var(--cyan)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.03, pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ opacity: 0.4 }}>/</span>
                {i === breadcrumb.length - 1
                  ? <span style={{ color: "var(--cyan)" }}>{b.label}</span>
                  : <Link href={b.href} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{b.label}</Link>
                }
              </span>
            ))}
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>{tag}</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
            {title} <span style={{ color: "var(--cyan)" }}>{titleHighlight}</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 680, marginBottom: "1.5rem" }}>{description}</p>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "var(--cyan)" }}>⏱</span> {readTime}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "var(--cyan)" }}>📅</span> Updated {updatedDate}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%", display: "inline-block" }} /> Live
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 5%", fontFamily: "'Inter',sans-serif" }}>
        {children}
      </div>

      {/* Related guides */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>RELATED GUIDES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.75rem" }}>
            {[
              { label: "PVP Builds 2025", href: "/guides/pvp-builds", icon: "⚔️" },
              { label: "Best Grinding Routes", href: "/guides/grinding-routes", icon: "🗺️" },
              { label: "Fruit Rankings", href: "/guides/fruit-rankings", icon: "📊" },
              { label: "Race Guide", href: "/guides/race-guide", icon: "🏁" },
              { label: "Beginner Guide", href: "/guides/beginner-guide", icon: "🎮" },
            ].map(g => (
              <Link key={g.href} href={g.href} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", textDecoration: "none", color: "var(--text-muted)", fontSize: "0.88rem", transition: "all 0.2s" }}>
                <span>{g.icon}</span> {g.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
