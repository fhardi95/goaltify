"use client";
import { useState } from "react";
import Link from "next/link";

const POSTS = [
  {
    slug: "best-pvp-fruit-blox-fruits-2026",
    title: "Best PVP Fruit in Blox Fruits 2026 — Full Tier List & Top Combos",
    excerpt: "Tiger, Kitsune, Dragon, and Dough lead the PVP meta in Blox Fruits Update 31. We rank every top-tier fruit by damage, mobility, combo potential, and skill floor — so you can stop losing fights and start winning them.",
    date: "May 10, 2026",
    category: "Fruit Guide",
    categoryColor: "#ff4757",
    categoryBg: "rgba(255,71,87,0.08)",
    categoryBorder: "rgba(255,71,87,0.25)",
    readTime: "9 min",
    icon: "⚔️",
    featured: true,
  },
  {
    slug: "blox-fruits-awakening-guide-2026",
    title: "Blox Fruits Awakening Guide 2026 — How to Awaken Every Fruit Fast",
    excerpt: "Awakening your fruit is the single biggest power upgrade in Blox Fruits. Full Fragment cost table, fastest farming routes, move priority order, and V4 awakening explained.",
    date: "May 10, 2026",
    category: "Grinding",
    categoryColor: "#a855f7",
    categoryBg: "rgba(168,85,247,0.08)",
    categoryBorder: "rgba(168,85,247,0.25)",
    readTime: "10 min",
    icon: "✨",
    featured: true,
  },
  {
    slug: "patch-analysis",
    title: "Patch Analysis — Dough Buffed, Ice Nerfed, Kitsune S-Tier",
    excerpt: "The latest Blox Fruits update reshuffled the meta. Dough returns to A-tier with a significant hitbox buff.",
    date: "April 22, 2026",
    category: "Patch Notes",
    categoryColor: "#00f5ff",
    categoryBg: "rgba(0,245,255,0.08)",
    categoryBorder: "rgba(0,245,255,0.2)",
    readTime: "5 min",
    icon: "🔄",
    featured: true,
  },
  {
    slug: "kitsune-complete-guide",
    title: "Kitsune Fruit Complete Guide 2026 — Is It Worth It?",
    excerpt: "Kitsune is the newest mythical Beast fruit in Blox Fruits. We break down every move, damage output, and how it compares to Dragon and Leopard in both PVP and PVE.",
    date: "April 18, 2026",
    category: "Fruit Guide",
    categoryColor: "#ffd700",
    categoryBg: "rgba(255,215,0,0.08)",
    categoryBorder: "rgba(255,215,0,0.25)",
    readTime: "8 min",
    icon: "🦊",
    featured: false,
  },
  {
    slug: "trade-calculator-launch",
    title: "We Launched the BloxFruits Trade Calculator",
    excerpt: "Our new AI-powered trade calculator is live. Add up to 4 items on each side and get an instant verdict — Fair, Overpay, or Underpay. Never get scammed on a trade again.",
    date: "April 10, 2026",
    category: "Feature",
    categoryColor: "#ff6b9d",
    categoryBg: "rgba(255,107,157,0.08)",
    categoryBorder: "rgba(255,107,157,0.25)",
    readTime: "3 min",
    icon: "💱",
    featured: false,
  },
  {
    slug: "best-grinding-setup",
    title: "The Best Grinding Setup — Castle on the Sea",
    excerpt: "Castle on the Sea is now the undisputed #1 XP spot for endgame players. With Dragon or Kitsune you can hit 2.5M+ XP per hour. Here's the complete route breakdown.",
    date: "April 5, 2026",
    category: "Grinding",
    categoryColor: "#2ed573",
    categoryBg: "rgba(46,213,115,0.08)",
    categoryBorder: "rgba(46,213,115,0.25)",
    readTime: "7 min",
    icon: "🏰",
    featured: false,
  },
  {
    slug: "race-v4-tier-list",
    title: "Race V4 Tier List — Which Race is Best ?",
    excerpt: "With all six races now having V4 awakenings available, we rank every race based on PVP impact, PVE utility, and which fruit builds they pair best with.",
    date: "March 28, 2026",
    category: "Race Guide",
    categoryColor: "#a855f7",
    categoryBg: "rgba(168,85,247,0.08)",
    categoryBorder: "rgba(168,85,247,0.25)",
    readTime: "6 min",
    icon: "🏁",
    featured: false,
  },
  {
    slug: "blox-fruits-trading-tips",
    title: "10 Trading Tips Every Blox Fruits Player Should Know",
    excerpt: "Trading is one of the most complex parts of Blox Fruits. These 10 tips — from understanding demand vs value to knowing when to hold vs sell — will make you a better trader immediately.",
    date: "March 20, 2026",
    category: "Trading",
    categoryColor: "#ffa502",
    categoryBg: "rgba(255,165,2,0.08)",
    categoryBorder: "rgba(255,165,2,0.25)",
    readTime: "9 min",
    icon: "💡",
    featured: false,
  },
    {
    slug: "blox-fruits-eggs-guide",
    title: "Blox Fruits Eggs — Complete Guide to All 24 Easter Eggs",
    excerpt: "Everything you need to know about Blox Fruits eggs in 2026. All 24 Easter Egg locations, five rarity tiers, Candy Egg rewards, the Celestial Egg boss fight.",
    date: "April 28, 2026",
    category: "Event Guide",
    categoryColor: "#ff6b9d",
    categoryBg: "rgba(255,107,157,0.08)",
    categoryBorder: "rgba(255,107,157,0.25)",
    readTime: "10 min",
    icon: "🥚",
    featured: true,
  },
  {
    slug: "blox-fruits-codes",
    title: "All Blox Fruits Codes 2026 — Working Codes for 2x EXP",
    excerpt: "Every working Blox Fruits code for 2026, verified and updated daily. Redeem free 2x EXP boosts, stat resets, Beli, and titles. Includes how to redeem codes",
    date: "April 28, 2026",
    category: "Codes",
    categoryColor: "#2ed573",
    categoryBg: "rgba(46,213,115,0.08)",
    categoryBorder: "rgba(46,213,115,0.25)",
    readTime: "7 min",
    icon: "🎁",
    featured: true,
  },
    {
    slug: "blox-fruits-trade-calculator-complete-guide",
    title: "Blox Fruits Trade Calculator — The Complete Trading Guide (2026)",
    excerpt: "Don't get scammed on your next trade. Our complete Blox Fruits trade calculator guide breaks down how fruit values work, which fruits are worth the most in 2026",
    date: "April 30, 2026",
    category: "Codes",
    categoryColor: "#2ed573",
    categoryBg: "rgba(46,213,115,0.08)",
    categoryBorder: "rgba(46,213,115,0.25)",
    readTime: "9 min",
    icon: "🎁",
    featured: true,
  },
      {
    slug: "blox-fruit-trade-value-guide",
    title: "Blox Fruit Trade Value Guide – Complete Tier List & Trading Tips",
    excerpt: "Find the exact value of every fruit in Blox Fruits. Updated tier list for Sea 3, best fruits to trade, V4 explained, and how to avoid getting scammed in every deal.",
    date: "May 2, 2026",
    category: "Codes",
    categoryColor: "#2ed573",
    categoryBg: "rgba(46,213,115,0.08)",
    categoryBorder: "rgba(46,213,115,0.25)",
    readTime: "9 min",
    icon: "🎁",
    featured: true,
  },
];

const CATS = ["All", "Patch Notes", "Fruit Guide", "Grinding", "Trading", "Feature", "Race Guide", "Event Guide", "Codes", "Trading Guide"];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory);

  const featured = filtered.find(p => p.featured) || filtered[0];
  const grid = filtered.filter(p => p.slug !== featured?.slug);

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(0,245,255,0.05),rgba(0,245,255,0.02) 60%,transparent)", borderBottom: "1px solid rgba(0,245,255,0.13)", padding: "4rem 5% 2.5rem" }}>
        <div style={{ position: "absolute", width: 500, height: 500, background: "#00f5ff", borderRadius: "50%", filter: "blur(120px)", opacity: 0.04, top: -100, right: -100, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", fontSize: "0.8rem", color: "#7a96b8" }}>
            <Link href="/" style={{ color: "#7a96b8", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "#00f5ff" }}>Blog</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00f5ff", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>
                News & Guides
              </span>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.75rem" }}>
                BloxFruitsAI <span style={{ color: "#00f5ff" }}>Blog</span>
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "1rem", lineHeight: 1.7 }}>
                Patch analysis, meta guides, trading tips, and everything Blox Fruits — updated regularly.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "2rem" }}>
              {[{ num: "6", label: "Articles" }, { num: "Apr 2026", label: "Latest" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.4rem", fontWeight: 700, color: "#00f5ff" }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "#7a96b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 5%" }}>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {CATS.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 50,
                  border: isActive ? "1px solid #00f5ff" : "1px solid rgba(0,245,255,0.15)",
                  fontSize: "0.82rem",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                  background: isActive ? "#00f5ff" : "rgba(6,15,30,0.8)",
                  color: isActive ? "#020810" : "#7a96b8",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── FEATURED POST ── */}
        {featured && (
          <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 20, padding: "2.25rem", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
            {/* Top glow line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#00f5ff,transparent)", opacity: 0.7 }} />
            {/* BG glow */}
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "#00f5ff", borderRadius: "50%", filter: "blur(100px)", opacity: 0.04, pointerEvents: "none" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center", position: "relative" }} className="featured-grid">
              <div>
                {/* Badges */}
                <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", color: "#00f5ff", background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)", padding: "4px 12px", borderRadius: 20, letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>⭐ Featured</span>
                  <span style={{ fontSize: "0.68rem", color: featured.categoryColor, background: featured.categoryBg, border: `1px solid ${featured.categoryBorder}`, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.08em" }}>{featured.category}</span>
                </div>

                {/* Title */}
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1rem,2.8vw,1.55rem)", fontWeight: 700, marginBottom: "0.85rem", lineHeight: 1.25, color: "#e8f4ff" }}>
                  {featured.icon} {featured.title}
                </h2>

                {/* Excerpt */}
                <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: 640 }}>
                  {featured.excerpt}
                </p>

                {/* Meta */}
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "#7a96b8", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ color: "#00f5ff" }}>📅</span> {featured.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ color: "#00f5ff" }}>⏱</span> {featured.readTime} read</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={`/blog/${featured.slug}`} style={{ background: "#00f5ff", color: "#020810", padding: "13px 28px", borderRadius: 10, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 0 30px rgba(0,245,255,0.25)", flexShrink: 0 }}>
                Read →
              </Link>
            </div>
          </div>
        )}

        {/* ── POST GRID ── */}
        {grid.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", color: "#7a96b8", letterSpacing: "0.15em" }}>
                {activeCategory === "All" ? "ALL ARTICLES" : activeCategory.toUpperCase()}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(0,245,255,0.13)" }} />
              <span style={{ fontSize: "0.75rem", color: "#7a96b8" }}>{grid.length} article{grid.length !== 1 ? "s" : ""}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
              {grid.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden", transition: "all 0.25s", cursor: "pointer" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(0,245,255,0.32)";
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(0,245,255,0.13)";
                      el.style.transform = "none";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Coloured top line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${post.categoryColor},transparent)`, opacity: 0.5 }} />

                    {/* Category badge */}
                    <div style={{ marginBottom: "0.9rem" }}>
                      <span style={{ fontSize: "0.68rem", color: post.categoryColor, background: post.categoryBg, border: `1px solid ${post.categoryBorder}`, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.08rem", fontWeight: 700, color: "#e8f4ff", marginBottom: "0.65rem", lineHeight: 1.4, flex: 1 }}>
                      {post.icon} {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                      {post.excerpt.length > 130 ? post.excerpt.slice(0, 130) + "..." : post.excerpt}
                    </p>

                    {/* Footer */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto" }}>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "#7a96b8" }}>
                        <span>{post.date}</span>
                        <span>⏱ {post.readTime}</span>
                      </div>
                      <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: post.categoryColor, letterSpacing: "0.06em" }}>READ →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#7a96b8", fontFamily: "'Inter',sans-serif" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📭</div>
            <p>No articles in this category yet. Check back soon!</p>
          </div>
        )}

        {/* ── NEWSLETTER / CTA ── */}
        <div style={{ marginTop: "3.5rem", background: "linear-gradient(135deg,rgba(0,245,255,0.05),rgba(255,215,0,0.03))", border: "1px solid rgba(0,245,255,0.18)", borderRadius: 18, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Stay <span style={{ color: "#00f5ff" }}>Ahead of the Meta</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.92rem", marginBottom: "1.75rem", maxWidth: 480, margin: "0 auto 1.75rem" }}>
            We publish patch analysis, tier list updates, and trading guides after every Blox Fruits update.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/guides" style={{ background: "#00f5ff", color: "#020810", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              View All Guides
            </Link>
            <Link href="/values" style={{ background: "transparent", color: "#ffd700", border: "1px solid rgba(255,215,0,0.35)", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
              Value List
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width:640px){
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-grid a { display: block; text-align: center; }
        }
      `}</style>
    </div>
  );
}
