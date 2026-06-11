"use client";
import { useState } from "react";
import Link from "next/link";

const POSTS = [

    {
    slug: "world-cup-predictions-picking-winner-every-game",
    title: "World Cup 2026 Predictions: Picking the Winner in Every Game",
    excerpt: "Expert predictions for every single match of the FIFA World Cup 2026. Group stage, knockouts, and final—discover who we think will lift the trophy.",
    date: "June 6, 2026",
    category: "News",
    categoryColor: "#ff4757",
    categoryBg: "rgba(255,71,87,0.08)",
    categoryBorder: "rgba(255,71,87,0.25)",
    readTime: "14 min",
    icon: "⚽",
    featured: true,
  },
  {
    slug: "lionel-messi-complete-guide-career-achievements-legacy",
    title: "Lionel Messi: The Complete Guide to Football's Greatest",
    excerpt: "Explore Lionel Messi's extraordinary career, from Barcelona legend to World Cup champion. Stats, achievements, playing style & legacy analysed.",
    date: "May 25, 2026",
    category: "News",
    categoryColor: "#ff4757",
    categoryBg: "rgba(255,71,87,0.08)",
    categoryBorder: "rgba(255,71,87,0.25)",
    readTime: "12 min",
    icon: "⚽",
    featured: true,
  },
  {
    slug: "football-strength-training-programme-2026",
    title: "Football Strength Training Programme 2026: Complete Guide",
    excerpt: "Master football strength training with our 2026 programme. Build power, speed and endurance with exercises used by Premier League pros. Start today.",
    date: "May 25, 2026",
    category: "Fitness",
    categoryColor: "#ff6b35",
    categoryBg: "rgba(255,107,53,0.08)",
    categoryBorder: "rgba(255,107,53,0.25)",
    readTime: "12 min",
    icon: "💪",
    featured: true,
  },
  {
    slug: "how-to-shoot-with-power-in-football",
    title: "How to Shoot with Power in Football: Step-by-Step Guide",
    excerpt: "Master powerful shooting in football with our comprehensive guide. Learn technique, body mechanics, training drills, and pro tips to increase shot power.",
    date: "May 25, 2026",
    category: "Training Guide",
    categoryColor: "#1db954",
    categoryBg: "rgba(29,185,84,0.08)",
    categoryBorder: "rgba(29,185,84,0.25)",
    readTime: "12 min",
    icon: "⚽",
    featured: true,
  },
  {
    slug: "best-premier-league-players-2026-complete-ranking",
    title: "Best Premier League Players 2026 — Complete Ranking",
    excerpt: "Discover the definitive ranking of the top Premier League players in 2026, from world-class superstars to emerging talents dominating England's top flight.",
    date: "May 25, 2026",
    category: "Premier League",
    categoryColor: "#3d5a99",
    categoryBg: "rgba(61,90,153,0.08)",
    categoryBorder: "rgba(61,90,153,0.25)",
    readTime: "12 min",
    icon: "⚽",
    featured: true,
  },
  {
    slug: "best-football-boots-2026-ultimate-guide",
    title: "Best Football Boots 2026: Ultimate Buyer's Guide",
    excerpt: "Discover the top football boots of 2026. Expert reviews, performance tests, and buying advice for strikers, midfielders, and defenders.",
    date: "May 25, 2026",
    category: "Training Guide",
    categoryColor: "#1db954",
    categoryBg: "rgba(29,185,84,0.08)",
    categoryBorder: "rgba(29,185,84,0.25)",
    readTime: "12 min",
    icon: "👟",
    featured: true,
  },
];

const CATS = ["All", "Premier League", "Training Guide", "Fitness", "Tactics", "Match Report", "News"];

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
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(26,122,63,0.06),rgba(26,122,63,0.02) 60%,transparent)", borderBottom: "1px solid rgba(26,122,63,0.18)", padding: "4rem 5% 2.5rem" }}>
        <div style={{ position: "absolute", width: 500, height: 500, background: "#1a7a3f", borderRadius: "50%", filter: "blur(120px)", opacity: 0.05, top: -100, right: -100, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", fontSize: "0.8rem", color: "#7a96b8" }}>
            <Link href="/" style={{ color: "#7a96b8", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "#1db954" }}>Blog</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1db954", background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>
                Football News & Guides
              </span>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.75rem" }}>
                Goaltify <span style={{ color: "#1db954" }}>Blog</span>
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "1rem", lineHeight: 1.7 }}>
                Premier League analysis, training guides, tactics, and everything football — updated regularly.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "2rem" }}>
              {[{ num: String(POSTS.length), label: "Articles" }, { num: "May 2026", label: "Latest" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.4rem", fontWeight: 700, color: "#1db954" }}>{s.num}</div>
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
                  border: isActive ? "1px solid #1db954" : "1px solid rgba(29,185,84,0.2)",
                  fontSize: "0.82rem",
                  fontFamily: "'Rajdhani',sans-serif",
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                  background: isActive ? "#1db954" : "rgba(6,15,30,0.8)",
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
          <div style={{ background: "#060f1e", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 20, padding: "2.25rem", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#1db954,transparent)", opacity: 0.7 }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "#1db954", borderRadius: "50%", filter: "blur(100px)", opacity: 0.04, pointerEvents: "none" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center", position: "relative" }} className="featured-grid">
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "0.68rem", color: "#1db954", background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.3)", padding: "4px 12px", borderRadius: 20, letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>⭐ Featured</span>
                  <span style={{ fontSize: "0.68rem", color: featured.categoryColor, background: featured.categoryBg, border: `1px solid ${featured.categoryBorder}`, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.08em" }}>{featured.category}</span>
                </div>

                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1rem,2.8vw,1.55rem)", fontWeight: 700, marginBottom: "0.85rem", lineHeight: 1.25, color: "#e8f4ff" }}>
                  {featured.icon} {featured.title}
                </h2>

                <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: 640 }}>
                  {featured.excerpt}
                </p>

                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "#7a96b8", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ color: "#1db954" }}>📅</span> {featured.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ color: "#1db954" }}>⏱</span> {featured.readTime} read</span>
                </div>
              </div>

              <Link href={`/blog/${featured.slug}`} style={{ background: "#1db954", color: "#020810", padding: "13px 28px", borderRadius: 10, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 0 30px rgba(29,185,84,0.25)", flexShrink: 0 }}>
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
              <div style={{ flex: 1, height: 1, background: "rgba(29,185,84,0.15)" }} />
              <span style={{ fontSize: "0.75rem", color: "#7a96b8" }}>{grid.length} article{grid.length !== 1 ? "s" : ""}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
              {grid.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{ background: "#060f1e", border: "1px solid rgba(29,185,84,0.13)", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden", transition: "all 0.25s", cursor: "pointer" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(29,185,84,0.35)";
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(29,185,84,0.13)";
                      el.style.transform = "none";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${post.categoryColor},transparent)`, opacity: 0.5 }} />

                    <div style={{ marginBottom: "0.9rem" }}>
                      <span style={{ fontSize: "0.68rem", color: post.categoryColor, background: post.categoryBg, border: `1px solid ${post.categoryBorder}`, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                        {post.category}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.08rem", fontWeight: 700, color: "#e8f4ff", marginBottom: "0.65rem", lineHeight: 1.4, flex: 1 }}>
                      {post.icon} {post.title}
                    </h3>

                    <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                      {post.excerpt.length > 130 ? post.excerpt.slice(0, 130) + "..." : post.excerpt}
                    </p>

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

        {/* ── CTA ── */}
        <div style={{ marginTop: "3.5rem", background: "linear-gradient(135deg,rgba(29,185,84,0.05),rgba(26,122,63,0.03))", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 18, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Improve Your <span style={{ color: "#1db954" }}>Football Game</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.92rem", marginBottom: "1.75rem", maxWidth: 480, margin: "0 auto 1.75rem" }}>
            We publish Premier League analysis, training guides, and tactics breakdowns to help you understand and play the game better.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/academy" style={{ background: "#1db954", color: "#020810", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Visit Academy
            </Link>
            <Link href="/live-scores" style={{ background: "transparent", color: "#ffd700", border: "1px solid rgba(255,215,0,0.35)", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
              Live Scores
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
