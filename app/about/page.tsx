import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Blox Fruits AI",
  description: "Learn about BloxFruitsAI.com — the AI-powered platform built for Roblox Blox Fruits players. Our mission, team, and story.",
  alternates: { canonical: "https://www.bloxfruitsai.com/about" },
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span><span style={{ color: "var(--cyan)" }}>About Us</span>
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Our Story</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, marginBottom: "1rem" }}>
            About <span style={{ color: "var(--cyan)" }}>BloxFruitsAI</span>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 5%", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {[{ val: "100K+", label: "Monthly Players" }, { val: "28+", label: "Fruits Tracked" }, { val: "4.9★", label: "User Rating" }, { val: "2025", label: "Updated" }].map(s => (
            <div key={s.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.5rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {[
          { title: "Our Mission", content: "BloxFruitsAI was built with one goal: give every Blox Fruits player — from beginner to veteran — access to the same quality information that top players use. We believe no one should lose a trade or waste Robux on a bad fruit because of missing information. Our AI tools level the playing field for everyone, completely free." },
          { title: "What We Build", content: "We build AI-powered tools that update in real-time after every Blox Fruits patch. Our tier list, trade calculator, value list, and build guides are computed using actual game data, community trading history, and performance analytics — not opinions or guesswork. When the game changes, our tools change with it automatically." },
          { title: "Why We Do It", content: "We're Blox Fruits players ourselves. We got scammed on bad trades, spent hours researching meta builds, and wasted Robux on fruits that turned out to be garbage. BloxFruitsAI exists so that never happens to anyone else. We built the tools we wished existed when we started playing." },
          { title: "Not Affiliated with Roblox", content: "BloxFruitsAI.com is an independent fan site. We are not affiliated with, endorsed by, or connected to Roblox Corporation or the Blox Fruits development team. All game content, fruit names, and mechanics belong to their respective owners." },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--cyan)", marginBottom: "0.85rem", paddingBottom: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{s.title}</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>{s.content}</p>
          </div>
        ))}

        <div style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.06),rgba(255,215,0,0.03))", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Get in Touch</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>Have a suggestion, found a bug, or want to work with us?</p>
          <Link href="/contact" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
