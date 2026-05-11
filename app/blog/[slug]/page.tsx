import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs, BLOG_POSTS, type BlogSection } from "../../_data/blog-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    /* OLD: title: `${post.title} | Blox Fruits AI Blog`,*/
	 title: `${post.title}`,
    description: post.excerpt,
    alternates: { canonical: `https://www.bloxfruitsai.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.bloxfruitsai.com/blog/${slug}`,
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

function renderSection(s: BlogSection, i: number) {
  switch (s.type) {
    case "paragraph":
      return <p key={i} style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.97rem", marginBottom: "1.25rem" }}>{s.text}</p>;

    case "heading":
      return <h2 key={i} style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.15rem", fontWeight: 700, color: "var(--cyan)", marginTop: "2.25rem", marginBottom: "1rem", paddingBottom: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{s.text}</h2>;

    case "subheading":
      return <h3 key={i} style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginTop: "1.5rem", marginBottom: "0.65rem" }}>{s.text}</h3>;

    case "tip":
      return (
        <div key={i} style={{ background: "rgba(46,213,115,0.07)", border: "1px solid rgba(46,213,115,0.25)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#2ed573", display: "block", marginBottom: 4 }}>PRO TIP</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "warning":
      return (
        <div key={i} style={{ background: "rgba(255,165,2,0.07)", border: "1px solid rgba(255,165,2,0.25)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#ffa502", display: "block", marginBottom: 4 }}>WARNING</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "info":
      return (
        <div key={i} style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.22)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>ℹ️</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#00f5ff", display: "block", marginBottom: 4 }}>NOTE</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "list":
      return (
        <ul key={i} style={{ listStyle: "none", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {s.items?.map((item, j) => (
            <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 3, fontSize: "0.75rem" }}>◆</span>
              <span style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div key={i} style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Rajdhani',sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {s.headers?.map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows?.map((row, j) => (
                <tr key={j} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: j % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  {row.map((cell, k) => (
                    <td key={k} style={{ padding: "10px 14px", fontSize: "0.88rem", color: k === 0 ? "var(--text)" : "var(--text-muted)", fontWeight: k === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "tierrow": {
      const ts = TIER_STYLES[s.tier!] || TIER_STYLES.B;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.85rem 1.25rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
          <div style={{ minWidth: 48, textAlign: "center", fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, padding: "6px 10px", borderRadius: 8, ...ts }}>{s.tier}</div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 70 }}>{s.label}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
            {s.fruits?.map(f => (
              <span key={f} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: "0.82rem" }}>{f}</span>
            ))}
          </div>
        </div>
      );
    }

    case "buildcard":
      return (
        <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 14, padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
            {[
              { label: "Fruit", value: s.build?.fruit, icon: "🍎" },
              { label: "Fighting Style", value: s.build?.style, icon: "🥊" },
              { label: "Sword", value: s.build?.sword, icon: "⚔️" },
              { label: "Stats", value: s.build?.stats, icon: "📈" },
            ].map(f => (
              <div key={f.label} style={{ background: "var(--bg-card2)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{f.icon} {f.label}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--cyan)" }}>Notes:</strong> {s.build?.note}
          </div>
        </div>
      );

    case "divider":
      return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />;

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Blox Fruits AI", logo: { "@type": "ImageObject", url: "https://www.bloxfruitsai.com/logo.png" } },
    url: `https://www.bloxfruitsai.com/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.bloxfruitsai.com/blog/${slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ paddingTop: 70, minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "var(--cyan)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.03, pointerEvents: "none" }} />
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Blog</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "var(--cyan)" }}>{post.category}</span>
            </div>

            {/* Category badge */}
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}40`, padding: "4px 14px", borderRadius: 20 }}>{post.category}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                Updated {post.date}
              </span>
            </div>

            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.25rem" }}>
              {post.icon} {post.title}
            </h1>

            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{post.excerpt}</p>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: "var(--cyan)" }}>⏱</span> {post.readTime} read</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: "var(--cyan)" }}>✍️</span> {post.author}</span>
              <Link href="/blog" style={{ fontSize: "0.8rem", color: "var(--cyan)", textDecoration: "none", marginLeft: "auto" }}>← All Posts</Link>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 5%" }}>
          <div>{post.content.map((section, i) => renderSection(section, i))}</div>

          {/* Share / nav */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}>← Back to Blog</Link>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/values" style={{ background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Value List</Link>
              <Link href="/calculator" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Trade Calculator</Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>MORE FROM THE BLOG</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "block", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", textDecoration: "none", transition: "all 0.2s" }}
                >
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.6rem" }}>{p.icon}</span>
                  <div style={{ fontSize: "0.68rem", color: p.categoryColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{p.category}</div>
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.35, marginBottom: "0.5rem" }}>{p.title}</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>⏱ {p.readTime} · {p.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
