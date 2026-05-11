const FEATURES = [
  { icon:"🧠", title:"AI Fruit Finder", desc:"Tell the AI your playstyle and it instantly recommends the best devil fruit — PVP, PVE, or grinding." },
  { icon:"📊", title:"Live Tier List", desc:"Auto-updated after every Blox Fruits patch. Always know which fruits are S-tier and which to avoid." },
  { icon:"⚔️", title:"PVP Build Optimizer", desc:"Complete build recommendations — fruit, fighting style, sword, and stat allocation for the current meta." },
  { icon:"💱", title:"Trade Calculator", desc:"Compare trade value, demand scores, and Robux prices side-by-side. Never get scammed again." },
  { icon:"📋", title:"Value List", desc:"Real-time market values for all fruits, gamepasses, and limited items with trend indicators." },
  { icon:"🔄", title:"Patch Tracker", desc:"Every update analyzed instantly. See exactly how your fruit is affected in the latest patch." },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ position:"relative", zIndex:1, padding:"6rem 5%" }}>
      <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <span style={{ display:"inline-block", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--cyan)", background:"rgba(0,245,255,0.08)", border:"1px solid rgba(0,245,255,0.2)", padding:"4px 14px", borderRadius:50, marginBottom:"1rem" }}>Why Blox Fruits AI</span>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:700, marginBottom:"1rem" }}>
          Everything You Need to <span style={{ color:"var(--cyan)" }}>Dominate - Blox Fruits Value</span>
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", color:"var(--text-muted)", fontSize:"1rem", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>
          From beginner to top-tier PVP — our AI tools give you the edge to win every trade and every fight.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.4rem", maxWidth:1200, margin:"0 auto" }}>
        {FEATURES.map((f,i) => (
          <div key={i} style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:"2rem" }}>
            <div style={{ width:52, height:52, borderRadius:12, background:"rgba(0,245,255,0.08)", border:"1px solid rgba(0,245,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", marginBottom:"1.25rem" }}>{f.icon}</div>
            <h3 style={{ fontFamily:"'Orbitron',monospace", fontSize:"0.95rem", fontWeight:700, marginBottom:"0.6rem", letterSpacing:"0.03em" }}>{f.title}</h3>
            <p style={{ fontFamily:"'Inter',sans-serif", color:"var(--text-muted)", fontSize:"0.88rem", lineHeight:1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
