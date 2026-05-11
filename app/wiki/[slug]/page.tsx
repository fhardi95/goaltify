import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWikiFruit, getAllWikiSlugs, WIKI_FRUITS, type WikiFruit } from "../../_data/wiki-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllWikiSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fruit = getWikiFruit(slug);
  if (!fruit) return { title: "Fruit Not Found" };

  // Title: max ~60 chars to stay under 580px (Google truncation limit)
  // "Dough Value 2026 — Moves, Trade & Tier | BloxFruitsAI" = 54 chars ✓
  const metaTitle = `${fruit.name} Value 2026 — Moves, Trade & Tier | BloxFruitsAI`;

  // Description: max ~155 chars to stay under 1000px (Google truncation limit)
  // Fruit name appears once to keep length safe for longer names
  // "Dough trade value, Robux price, all moves and best builds for Blox Fruits 2026. Is it worth trading? Full guide updated weekly." = 128 chars ✓
  const metaDesc = `${fruit.name} trade value, Robux price, all moves and best builds for Blox Fruits 2026. Is it worth trading? Full guide updated weekly.`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: `https://www.bloxfruitsai.com/wiki/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://www.bloxfruitsai.com/wiki/${slug}`,
      type: "article",
    },
  };
}

const TIER_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  S: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.35)" },
  A: { bg: "rgba(0,245,255,0.09)", color: "#00f5ff", border: "rgba(0,245,255,0.28)" },
  B: { bg: "rgba(46,213,115,0.09)", color: "#2ed573", border: "rgba(46,213,115,0.28)" },
  C: { bg: "rgba(255,165,2,0.09)", color: "#ffa502", border: "rgba(255,165,2,0.28)" },
  D: { bg: "rgba(255,71,87,0.08)", color: "#ff4757", border: "rgba(255,71,87,0.2)" },
};

function RatingBadge({ label, value }: { label: string; value: string }) {
  const ts = TIER_STYLES[value] || TIER_STYLES.B;
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "0.85rem 1rem", textAlign: "center" }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.62rem", color: "#7a96b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.4rem", fontWeight: 900, ...ts, borderRadius: 8, padding: "4px 12px", display: "inline-block", border: `1px solid ${ts.border}` }}>{value}</div>
    </div>
  );
}

export default async function WikiFruitPage({ params }: Props) {
  const { slug } = await params;
  const fruit = getWikiFruit(slug);
  if (!fruit) notFound();

  const related = WIKI_FRUITS.filter(f => f.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${fruit.name} Value 2026 — Trade Price, Moves & Tier | BloxFruitsAI`,
    description: fruit.description,
    dateModified: "2026-05-06",
    author: { "@type": "Organization", name: "BloxFruitsAI Team" },
    publisher: {
      "@type": "Organization",
      name: "Blox Fruits AI",
      logo: { "@type": "ImageObject", url: "https://www.bloxfruitsai.com/logo.png" },
    },
    url: `https://www.bloxfruitsai.com/wiki/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.bloxfruitsai.com/wiki/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
      { "@type": "ListItem", position: 2, name: "Wiki", item: "https://www.bloxfruitsai.com/wiki" },
      { "@type": "ListItem", position: 3, name: `${fruit.name}`, item: `https://www.bloxfruitsai.com/wiki/${slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${fruit.name} trade value in Blox Fruits 2026?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fruit.name} has a ${fruit.tradeValue}-tier trade value in Blox Fruits 2026. ${fruit.metaNotes}`,
        },
      },
      {
        "@type": "Question",
        name: `How much does ${fruit.name} cost in Robux?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: fruit.robuxPrice
            ? `${fruit.name} costs ${fruit.robuxPrice.toLocaleString()} Robux (permanent) from the Blox Fruit Dealer in 2026.`
            : `${fruit.name} cannot be purchased directly with Robux and must be obtained through trading or random spawns.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${fruit.name} worth trading in Blox Fruits 2026?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fruit.name} is rated ${fruit.tradeValue}-tier for trade value in Blox Fruits 2026. It is best used for ${fruit.bestFor.join(", ")}. ${fruit.metaNotes}`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${fruit.name} good for PVP in Blox Fruits?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${fruit.name} has a ${fruit.pvp}-tier PVP rating in Blox Fruits 2026. It is a ${fruit.rarity} ${fruit.type} fruit rated overall ${fruit.tier}-tier.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the best builds for ${fruit.name} in Blox Fruits 2026?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: fruit.builds.map(b => `${b.name}: Use ${b.fightingStyle} fighting style with ${b.sword} sword. Stats: ${b.stats}. ${b.note}`).join(" | "),
        },
      },
    ],
  };

  const tierStyle = TIER_STYLES[fruit.tier] || TIER_STYLES.B;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div style={{ paddingTop: 70, minHeight: "100vh" }}>

        {/* ── HEADER ── */}
        <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: fruit.rarityColor, borderRadius: "50%", filter: "blur(130px)", opacity: 0.04, pointerEvents: "none" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href="/wiki" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Wiki</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "var(--cyan)" }}>{fruit.name}</span>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.68rem", color: fruit.rarityColor, background: `${fruit.rarityColor}18`, border: `1px solid ${fruit.rarityColor}40`, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>
                {fruit.rarity}
              </span>
              <span style={{ fontSize: "0.68rem", color: "#7a96b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 14px", borderRadius: 20, letterSpacing: "0.08em" }}>
                {fruit.type} Type
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                Updated {fruit.updatedDate}
              </span>
            </div>

            {/* Title + tier */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{fruit.icon}</span>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, lineHeight: 1.15, flex: 1 }}>
                {fruit.name} Value 2026 — Trade Price, Moves & Tier
              </h1>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "2rem", fontWeight: 900, padding: "10px 18px", borderRadius: 12, ...tierStyle, border: `1px solid ${tierStyle.border}`, flexShrink: 0 }}>
                {fruit.tier}
              </div>
            </div>

            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: 680 }}>
              {fruit.description}
            </p>

            {/* Best for tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.62rem", color: "#7a96b8", letterSpacing: "0.12em" }}>BEST FOR:</span>
              {fruit.bestFor.map(tag => (
                <span key={tag} style={{ fontSize: "0.72rem", color: "#00f5ff", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", padding: "4px 12px", borderRadius: 20 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 5%" }}>

          {/* Ratings grid */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="Ratings" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "0.75rem" }}>
              <RatingBadge label="PVP" value={fruit.pvp} />
              <RatingBadge label="PVE" value={fruit.pve} />
              <RatingBadge label="Grinding" value={fruit.grinding} />
              <RatingBadge label="Trade Value" value={fruit.tradeValue} />
            </div>
          </section>

          {/* How to Get + Price */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="How to Get" />
            <div style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.22)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem", display: "flex", gap: "0.9rem" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>ℹ️</span>
              <div>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#00f5ff", display: "block", marginBottom: 4 }}>NOTE</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0 }}>{fruit.howToGet}</p>
              </div>
            </div>
            {fruit.robuxPrice && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1.25rem" }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", color: "#7a96b8", letterSpacing: "0.1em" }}>ROBUX PRICE</span>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: "#00f5ff" }}>💎 {fruit.robuxPrice.toLocaleString()}</span>
                <Link href="/calculator" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#020810", background: "#00f5ff", padding: "5px 14px", borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em" }}>
                  Check Trade Value →
                </Link>
              </div>
            )}
          </section>

          {/* Strengths & Weaknesses */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="Strengths & Weaknesses" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="sw-grid">
              <div style={{ background: "rgba(46,213,115,0.05)", border: "1px solid rgba(46,213,115,0.2)", borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#2ed573", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.85rem" }}>✅ Strengths</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0 }}>
                  {fruit.strengths.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#2ed573", flexShrink: 0, fontSize: "0.75rem", marginTop: 3 }}>◆</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.6 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "rgba(255,71,87,0.05)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#ff4757", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.85rem" }}>❌ Weaknesses</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0 }}>
                  {fruit.weaknesses.map((w, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#ff4757", flexShrink: 0, fontSize: "0.75rem", marginTop: 3 }}>◆</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.6 }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Moves table */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="All Moves" />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Rajdhani',sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Key", "Move", "Type", "Damage", "Notes"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fruit.moves.map((move, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", fontWeight: 700, color: "#00f5ff", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 6, padding: "3px 8px" }}>{move.key}</span>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "0.9rem", fontWeight: 700, color: "var(--text)" }}>{move.name}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{move.type}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.85rem", color: "#ffd700", fontWeight: 600 }}>{move.damage}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 280 }}>{move.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Best Builds */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="Best Builds" />
            {fruit.builds.map((build, i) => (
              <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 14, padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", fontWeight: 700, color: "#00f5ff", letterSpacing: "0.1em", marginBottom: "1rem" }}>{build.name.toUpperCase()}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  {[
                    { label: "Fruit", value: fruit.name + " (Awakened)", icon: "🍎" },
                    { label: "Fighting Style", value: build.fightingStyle, icon: "🥊" },
                    { label: "Sword", value: build.sword, icon: "⚔️" },
                    { label: "Stats", value: build.stats, icon: "📈" },
                  ].map(f => (
                    <div key={f.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{f.icon} {f.label}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", fontFamily: "'Rajdhani',sans-serif" }}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>
                  <strong style={{ color: "var(--cyan)" }}>Notes:</strong> {build.note}
                </div>
              </div>
            ))}
          </section>

          {/* Meta Notes */}
          <section style={{ marginBottom: "3rem" }}>
            <SectionHeader label="Meta Notes" />
            <div style={{ background: "rgba(255,165,2,0.07)", border: "1px solid rgba(255,165,2,0.25)", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", gap: "0.9rem" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
              <div>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#ffa502", display: "block", marginBottom: 4 }}>CURRENT META — {fruit.updatedDate.toUpperCase()}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0 }}>{fruit.metaNotes}</p>
              </div>
            </div>
          </section>

          {/* Trade CTA */}
          <div style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.06),rgba(255,215,0,0.03))", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 16, padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                Trading {fruit.name}?
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.88rem", margin: 0 }}>
                Check if your deal is fair before you accept it.
              </p>
            </div>
            <Link href="/calculator" style={{ background: "#00f5ff", color: "#020810", padding: "12px 26px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 0 24px rgba(0,245,255,0.2)", flexShrink: 0 }}>
              Open Trade Calculator →
            </Link>
          </div>

          {/* Nav */}
          <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/wiki" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}>← All Fruits</Link>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/values" style={{ background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Value List</Link>
              <Link href="/blog" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Blog</Link>
            </div>
          </div>
        </div>

        {/* Related fruits */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 5%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>MORE FRUITS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
              {related.map(f => {
                const ts = TIER_STYLES[f.tier] || TIER_STYLES.B;
                return (
                  <Link key={f.slug} href={`/wiki/${f.slug}`} style={{ display: "block", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", textDecoration: "none", transition: "all 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                      <span style={{ fontSize: "1.6rem" }}>{f.icon}</span>
                      <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 900, padding: "4px 10px", borderRadius: 6, ...ts }}>{f.tier}</span>
                    </div>
                    <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: "0.7rem", color: f.rarityColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.rarity} · {f.type}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @media(max-width:600px){
            .sw-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.88rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.08em", margin: 0 }}>{label.toUpperCase()}</h2>
      <div style={{ flex: 1, height: 1, background: "rgba(0,245,255,0.13)" }} />
    </div>
  );
}
