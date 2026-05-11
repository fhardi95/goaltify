import Link from "next/link";
export default function CTASection() {
  return (
    <section style={{ position:"relative", zIndex:1, padding:"4rem 5% 6rem" }}>
      <div style={{ background:"linear-gradient(135deg,rgba(0,245,255,0.06),rgba(255,215,0,0.04))", border:"1px solid rgba(0,245,255,0.2)", borderRadius:24, padding:"4rem 3rem", textAlign:"center", maxWidth:900, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:"clamp(1.5rem,3vw,2.4rem)", fontWeight:900, marginBottom:"1rem" }}>
          Ready to <span style={{ color:"var(--cyan)" }}>Dominate</span> Blox Fruits?
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", color:"var(--text-muted)", fontSize:"1rem", marginBottom:"2rem" }}>
          Join 100,000+ players using AI to find the best fruits, builds, and strategies.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/#ai-tool" style={{ background:"var(--cyan)", color:"var(--bg-deep)", padding:"14px 32px", borderRadius:8, fontFamily:"'Rajdhani',sans-serif", fontSize:"1rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none", boxShadow:"0 0 28px rgba(0,245,255,0.3)" }}>Try AI Free</Link>
          <Link href="/calculator" style={{ background:"transparent", color:"var(--gold)", border:"1px solid rgba(255,215,0,0.35)", padding:"14px 32px", borderRadius:8, fontFamily:"'Rajdhani',sans-serif", fontSize:"1rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }}>Trade Calculator</Link>
          <Link href="/values" style={{ background:"transparent", color:"var(--text)", border:"1px solid rgba(255,255,255,0.2)", padding:"14px 32px", borderRadius:8, fontFamily:"'Rajdhani',sans-serif", fontSize:"1rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }}>Value List</Link>
        </div>
      </div>
    </section>
  );
}
