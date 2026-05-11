"use client";
import Link from "next/link";

const TIERS = [
  { tier: "S", label: "God Tier", fruits: ["🐉 Dragon","🐆 Leopard","🦊 Kitsune","☠️ Venom","🌑 Shadow"], bg:"rgba(255,215,0,0.12)", color:"#ffd700", border:"rgba(255,215,0,0.4)" },
  { tier: "A", label: "Top Tier", fruits: ["🥐 Dough","❄️ Blizzard","🔥 Phoenix","⚡ Thunder","🌋 Magma","🔔 Buddha"], bg:"rgba(0,245,255,0.1)", color:"#00f5ff", border:"rgba(0,245,255,0.3)" },
  { tier: "B", label: "Solid",    fruits: ["🕷️ Spider","🧊 Ice","💨 Gas","💢 Pain","💘 Love","🌒 Dark"], bg:"rgba(46,213,115,0.1)", color:"#2ed573", border:"rgba(46,213,115,0.3)" },
  { tier: "C", label: "Average",  fruits: ["🌊 Quake","🌸 Spring","🛡️ Barrier","💭 Smoke"], bg:"rgba(255,165,2,0.1)", color:"#ffa502", border:"rgba(255,165,2,0.3)" },
  { tier: "D", label: "Avoid",    fruits: ["🔪 Chop","💣 Bomb","🌀 Spin","🚀 Rocket"], bg:"rgba(255,71,87,0.08)", color:"#ff4757", border:"rgba(255,71,87,0.2)" },
];

export default function TierListSection() {
  return (
    <section id="tier-list" style={{ position:"relative", zIndex:1, padding:"6rem 5%", background:"linear-gradient(180deg,transparent,rgba(0,245,255,0.02),transparent)" }}>
      <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <span style={{ display:"inline-block", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--cyan)", background:"rgba(0,245,255,0.08)", border:"1px solid rgba(0,245,255,0.2)", padding:"4px 14px", borderRadius:50, marginBottom:"1rem" }}>Updated April 2025</span>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:700, marginBottom:"1rem" }}>
          Official <span style={{ color:"var(--cyan)" }}>Tier List</span>
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", color:"var(--text-muted)", fontSize:"1rem", maxWidth:520, margin:"0 auto 2rem", lineHeight:1.7 }}>
          AI-ranked devil fruits based on damage, versatility, mobility, and PVP meta performance.
        </p>
      </div>

      <div style={{ maxWidth:920, margin:"0 auto", display:"flex", flexDirection:"column", gap:8 }}>
        {TIERS.map(t => (
          <div key={t.tier} style={{ display:"flex", alignItems:"center", gap:"1rem", background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:12, padding:"0.85rem 1.25rem", flexWrap:"wrap" }}>
            <div style={{ minWidth:48, textAlign:"center", fontFamily:"'Orbitron',monospace", fontSize:"1.1rem", fontWeight:900, padding:"6px 10px", borderRadius:8, background:t.bg, color:t.color, border:`1px solid ${t.border}` }}>{t.tier}</div>
            <span style={{ fontSize:"0.75rem", color:"var(--text-muted)", letterSpacing:"0.1em", textTransform:"uppercase", minWidth:70 }}>{t.label}</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, flex:1 }}>
              {t.fruits.map(f => (
                <span key={f} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"4px 14px", fontSize:"0.82rem", fontWeight:500 }}>{f}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
        <Link href="/values" style={{ background:"transparent", color:"var(--cyan)", border:"1px solid var(--cyan)", padding:"12px 28px", borderRadius:8, fontFamily:"'Rajdhani',sans-serif", fontSize:"0.9rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none", display:"inline-block" }}>
          View Full Value List →
        </Link>
      </div>
    </section>
  );
}
