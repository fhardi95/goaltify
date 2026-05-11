const STEPS = [
  { num: "01", icon: "🎮", title: "Tell Us Your Style", desc: "PVP grinder, boss hunter, or casual? The AI personalizes everything for your playstyle." },
  { num: "02", icon: "🤖", title: "AI Analyzes the Meta", desc: "We process thousands of matches and patch notes in real-time to compute optimal builds." },
  { num: "03", icon: "⚡", title: "Get Instant Results", desc: "Receive a complete, actionable guide in seconds. No guessing — just the best strategy." },
  { num: "04", icon: "🏆", title: "Dominate the Server", desc: "Join 100K+ players who already use Blox Fruits AI to climb to the top of every server." },
];

export default function HowItWorksSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "6rem 5%" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Simple & Fast</span>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 700 }}>How It <span style={{ color: "var(--cyan)" }}>Works</span></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2rem", maxWidth: 1000, margin: "0 auto" }}>
        {STEPS.map(s => (
          <div key={s.num} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "3rem", fontWeight: 900, color: "rgba(0,245,255,0.12)", lineHeight: 1, display: "block", marginBottom: "1rem" }}>{s.num}</span>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 1.25rem" }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.7rem", letterSpacing: "0.04em" }}>{s.title}</h3>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
