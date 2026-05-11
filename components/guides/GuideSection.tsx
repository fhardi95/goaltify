import type { ReactNode } from "react";

interface GuideSectionProps {
  title: string;
  children: ReactNode;
  icon?: string;
  accent?: "cyan" | "gold" | "green" | "red";
}

const ACCENT_COLORS: Record<string, string> = {
  cyan: "var(--cyan)", gold: "var(--gold)", green: "var(--green)", red: "var(--red)",
};

export function GuideSection({ title, icon, accent = "cyan", children }: GuideSectionProps) {
  const color = ACCENT_COLORS[accent];
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.15rem", fontWeight: 700, color, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 10, paddingBottom: "0.75rem", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        {icon && <span style={{ fontSize: "1.1rem" }}>{icon}</span>}
        {title}
      </h2>
      <div style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>{children}</div>
    </div>
  );
}

interface TierCardProps {
  tier: "S" | "A" | "B" | "C" | "D";
  items: { name: string; emoji: string; note: string }[];
  label: string;
}

const TIER_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  S: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.35)" },
  A: { bg: "rgba(0,245,255,0.09)", color: "#00f5ff", border: "rgba(0,245,255,0.28)" },
  B: { bg: "rgba(46,213,115,0.09)", color: "#2ed573", border: "rgba(46,213,115,0.28)" },
  C: { bg: "rgba(255,165,2,0.09)", color: "#ffa502", border: "rgba(255,165,2,0.28)" },
  D: { bg: "rgba(255,71,87,0.08)", color: "#ff4757", border: "rgba(255,71,87,0.2)" },
};

export function TierCard({ tier, items, label }: TierCardProps) {
  const ts = TIER_STYLES[tier];
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.9rem 1.25rem", background: ts.bg, borderBottom: `1px solid ${ts.border}` }}>
        <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: ts.color, background: ts.bg, border: `1px solid ${ts.border}`, borderRadius: 8, padding: "4px 12px" }}>{tier}</span>
        <span style={{ fontSize: "0.8rem", color: ts.color, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ padding: "0.75rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {items.map(item => (
          <div key={item.name} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.emoji}</span>
            <div>
              <span style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}> — {item.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfoBox({ type = "tip", children }: { type?: "tip" | "warning" | "info"; children: ReactNode }) {
  const styles = {
    tip:     { bg: "rgba(46,213,115,0.07)",  border: "rgba(46,213,115,0.25)",  color: "#2ed573", icon: "💡", label: "PRO TIP" },
    warning: { bg: "rgba(255,165,2,0.07)",   border: "rgba(255,165,2,0.25)",   color: "#ffa502", icon: "⚠️", label: "WARNING" },
    info:    { bg: "rgba(0,245,255,0.07)",   border: "rgba(0,245,255,0.22)",   color: "#00f5ff", icon: "ℹ️", label: "NOTE" },
  }[type];
  return (
    <div style={{ background: styles.bg, border: `1px solid ${styles.border}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{styles.icon}</span>
      <div>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: styles.color, display: "block", marginBottom: 4 }}>{styles.label}</span>
        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{children}</div>
      </div>
    </div>
  );
}

export function BuildCard({ title, fruit, fightingStyle, sword, stats, playstyle }: { title: string; fruit: string; fightingStyle: string; sword: string; stats: string; playstyle: string }) {
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 14, padding: "1.5rem", marginBottom: "1rem" }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.95rem", fontWeight: 700, color: "var(--cyan)", marginBottom: "1rem" }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "0.75rem" }}>
        {[
          { label: "Fruit", value: fruit, icon: "🍎" },
          { label: "Fighting Style", value: fightingStyle, icon: "🥊" },
          { label: "Sword", value: sword, icon: "⚔️" },
          { label: "Stats", value: stats, icon: "📈" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--bg-card2)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "0.75rem", background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <strong style={{ color: "var(--cyan)" }}>Playstyle:</strong> {playstyle}
      </div>
    </div>
  );
}

export function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", fontWeight: 700, color: "var(--cyan)", flexShrink: 0 }}>{i + 1}</div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.95rem", marginBottom: 3 }}>{s.title}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
