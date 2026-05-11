"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "ai" | "user"; text: string };

const QA: Record<string, string> = {
  pvp: "For PVP in 2025, **Dragon** is the clear #1 pick — incredible mobility, massive AoE, versatile at all ranges. **Leopard** is #2 for players who master its combos. Pair either with Electric/Death Step + Ken Haki V2. If you want budget S-tier, **Dough** is still meta.",
  boss: "Best boss setup: **Buddha** fruit + Superhuman fighting style + Gravity Blade. Buddha's massive hitbox lets you hit everything without precision. Bring a teammate with a healing fruit for Phase 2. Dragon also works great solo for most World 3 bosses.",
  grind: "Fastest XP route at 2400+: **Castle on the Sea** (Buddha fruit recommended) → Elite Pirates at Skull Palace → rotate to Haunted Castle. With Dragon or Blizzard you can clear full areas in under 90 seconds. Keep Auto-Haki ON always.",
  trade: "Use the **Trade Calculator** to check any trade. In general: Dragon > Leopard > Kitsune > Venom > Dough for trade value. Never trade an S-tier for 2 A-tiers unless one has very high demand. Permanent fruits are worth significantly more.",
  default: "Great question! Based on the current 2025 meta, **Dragon, Leopard, and Kitsune** dominate S-tier. For grinding, **Buddha** is the best value. Want a specific build guide? Tell me your fruit and playstyle — PVP, PVE, or grinding! 🎮",
};

function getReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("pvp") || m.includes("best fruit") || m.includes("ranked")) return QA.pvp;
  if (m.includes("boss") || m.includes("raid") || m.includes("farm boss")) return QA.boss;
  if (m.includes("grind") || m.includes("level") || m.includes("xp") || m.includes("fast")) return QA.grind;
  if (m.includes("trade") || m.includes("calculator") || m.includes("worth") || m.includes("value")) return QA.trade;
  return QA.default;
}

function renderText(txt: string) {
  return txt.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--cyan)">$1</strong>');
}

export default function AIChatSection() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "ai", text: "Hey! I'm your Blox Fruits AI. Ask me about fruits, builds, boss strategies, or trade values. 🍎" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight); }, [msgs]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: "ai", text: getReply(msg) }]);
      setTyping(false);
    }, 700);
  }

  return (
    <section id="ai-tool" style={{ position: "relative", zIndex: 1, padding: "6rem 5%", background: "radial-gradient(ellipse at center,rgba(0,245,255,0.04) 0%,transparent 70%)" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Live AI Tool</span>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Ask the <span style={{ color: "var(--cyan)" }}>AI</span> Anything
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1rem", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Instant answers about fruits, builds, bosses, trades, and meta strategies.</p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.5rem", background: "rgba(0,245,255,0.05)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", animation: "pulseDot 2s infinite" }} />
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", color: "var(--cyan)", letterSpacing: "0.05em" }}>BLOXFRUITS AI · ONLINE</span>
        </div>
        <div ref={bodyRef} style={{ padding: "1.5rem", minHeight: 280, maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.role === "user" ? "row-reverse" : "row", animation: "fadeUp 0.35s ease both" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, background: m.role === "ai" ? "rgba(0,245,255,0.12)" : "rgba(255,215,0,0.1)", border: m.role === "ai" ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,215,0,0.2)", color: m.role === "ai" ? "var(--cyan)" : "var(--gold)" }}>{m.role === "ai" ? "AI" : "YOU"}</div>
              <div style={{ background: m.role === "user" ? "rgba(255,215,0,0.07)" : "var(--bg-card2)", border: m.role === "user" ? "1px solid rgba(255,215,0,0.15)" : "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", lineHeight: 1.65, maxWidth: "80%" }} dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.3)", color: "var(--cyan)" }}>AI</div>
              <div style={{ background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ display: "flex", gap: 4 }}>{[0,1,2].map(j => <span key={j} style={{ width: 6, height: 6, background: "var(--cyan)", borderRadius: "50%", opacity: 0.5, animation: `pulseDot 0.8s ${j*0.2}s infinite` }} />)}</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: "0.5rem 1.5rem 0" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "0.4rem" }}>
            {["Best PVP fruit?","Fastest grind route","Trade value help","Best boss setup"].map(q => (
              <button key={q} onClick={() => send(q)} style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 20, padding: "5px 14px", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", color: "var(--cyan)", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.14)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.06)"}
              >{q}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: "0.75rem 1.5rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", gap: 10, marginTop: "0.5rem" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about fruits, builds, trades..." style={{ flex: 1, background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }} />
          <button onClick={() => send()} style={{ background: "var(--cyan)", border: "none", borderRadius: 10, padding: "10px 18px", color: "var(--bg-deep)", fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s" }}>SEND</button>
        </div>
      </div>
    </section>
  );
}
