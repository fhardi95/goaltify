const REVIEWS = [
  { stars:5, text:"BloxFruitsAI completely changed how I play. Went from getting destroyed to winning almost every fight after following the Dragon build guide.", name:"XSlayer99", sub:"PVP Main · Level 2550", initials:"XS", c1:"0,245,255" },
  { stars:5, text:"The trade calculator saved me from multiple bad trades. It shows you exactly how much each side is worth — no more getting scammed.", name:"FruitKingBX", sub:"Trader · Level 2100", initials:"FK", c1:"255,215,0" },
  { stars:5, text:"Value list is always accurate and updates fast after patches. I don't waste Robux on bad fruits anymore. Best free tool out there.", name:"DevilFruitCollector", sub:"Collector · Level 2300", initials:"DF", c1:"46,213,115" },
];

export default function ReviewsSection() {
  return (
    <section style={{ position:"relative", zIndex:1, padding:"6rem 5%" }}>
      <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <span style={{ display:"inline-block", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--cyan)", background:"rgba(0,245,255,0.08)", border:"1px solid rgba(0,245,255,0.2)", padding:"4px 14px", borderRadius:50, marginBottom:"1rem" }}>Player Reviews</span>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:700 }}>What Players <span style={{ color:"var(--cyan)" }}>Say</span></h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.4rem", maxWidth:1100, margin:"0 auto" }}>
        {REVIEWS.map((r,i) => (
          <div key={i} style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:"1.75rem" }}>
            <div style={{ color:"var(--gold)", fontSize:"0.9rem", letterSpacing:2, marginBottom:"1rem" }}>{"★".repeat(r.stars)}</div>
            <p style={{ fontFamily:"'Inter',sans-serif", color:"var(--text-muted)", fontSize:"0.9rem", lineHeight:1.7, marginBottom:"1.25rem", fontStyle:"italic" }}>&ldquo;{r.text}&rdquo;</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`rgba(${r.c1},0.1)`, border:`1px solid rgba(${r.c1},0.3)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.73rem", fontWeight:700, color:`rgb(${r.c1})`, flexShrink:0 }}>{r.initials}</div>
              <div>
                <span style={{ display:"block", fontSize:"0.9rem", fontWeight:600 }}>{r.name}</span>
                <span style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{r.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
