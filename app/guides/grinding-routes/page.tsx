import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, StepList } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Best Grinding Routes 2026 — Fastest XP & Beli Farming Guide",
  description: "Fastest Blox Fruits grinding routes for every level range in 2026. Maximize XP per hour, Beli farming, and boss drop rates with our AI-optimized route guide.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides/grinding-routes" },
};

const ROUTES = [
  { range: "Lvl 1–100", zone: "Starter Island → Jungle", fruit: "Any fruit", xp: "~45K/hr", notes: "Complete all quests before moving. Don't skip the Bandit and Gorilla spawn areas." },
  { range: "Lvl 100–300", zone: "Middle Town → Skylands", fruit: "Any / Smoke", xp: "~120K/hr", notes: "Sky Island mobs give great XP. Use ranged moves to clear faster." },
  { range: "Lvl 300–700", zone: "Barren Island → Colosseum", fruit: "Ice or Magma", xp: "~280K/hr", notes: "Magma floor clears entire spawns passively. Ice freeze chains nearby mobs." },
  { range: "Lvl 700–1200", zone: "Forgotten Island → Usoapp", fruit: "Buddha or Phoenix", xp: "~520K/hr", notes: "Buddha hitbox clears entire rooms. Stay at Usoapp village NPCs for dense spawns." },
  { range: "Lvl 1200–1800", zone: "Sea 2 — Kingdom of Rose", fruit: "Buddha / Magma", xp: "~900K/hr", notes: "Military Detective quest chain gives the best XP in Sea 2. Loop continuously." },
  { range: "Lvl 1800–2300", zone: "Sea 3 — Haunted Castle", fruit: "Buddha or Dragon", xp: "~1.8M/hr", notes: "Elite Pirates spawn is the best grind spot at this range. Dense and fast-respawning." },
  { range: "Lvl 2300–2550", zone: "Castle on the Sea", fruit: "Dragon / Kitsune", xp: "~2.5M/hr", notes: "Best endgame grind. Dragon clears the entire floor in one rotation. Fastest path to max." },
];

export default function GrindingRoutesPage() {
  return (
    <GuideLayout
      tag="Grinding Guide · All Levels"
      title="Best Grinding"
      titleHighlight="Routes 2026"
      description="Optimized XP and Beli farming routes for every level range. From starter island to max level — know exactly where to grind, what fruit to use, and which quests to chain."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Grinding Routes", href: "/guides/grinding-routes" }]}
      readTime="10 min read"
    >
      <GuideSection title="General Grinding Rules" icon="📋">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
          {[
            "Always have a quest active — no quest means no XP bonus multiplier.",
            "Keep Auto-Haki ON while grinding for passive mastery gain.",
            "Use Buddha fruit if you have it — the hitbox advantage makes all grind spots 2–3x faster.",
            "Beli drops increase with enemy level — don't grind below your level range.",
            "Server hop if your spawn point is contested — fresh servers have full enemy pools.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--cyan)", flexShrink: 0 }}>◆</span><p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{tip}</p></div>
          ))}
        </div>
        <InfoBox type="tip">The 2x Mastery gamepass makes grinding double XP towards moves. If you can afford it (499 Robux), it pays back in hours of saved grinding time.</InfoBox>
      </GuideSection>

      <GuideSection title="Level-by-Level Route Table" icon="🗺️" accent="gold">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Level Range","Zone","Best Fruit","XP/Hour","Notes"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <td style={{ padding: "12px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 700, whiteSpace: "nowrap" }}>{r.range}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{r.zone}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{r.fruit}</td>
                  <td style={{ padding: "12px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", color: "var(--green)", fontWeight: 700 }}>{r.xp}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.83rem", color: "var(--text-muted)", maxWidth: 260 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="Endgame Grind — Castle on the Sea" icon="🏰" accent="cyan">
        <InfoBox type="info">Castle on the Sea is the #1 endgame grind spot for players 2300+. With Dragon or Kitsune you can hit 2.5M+ XP per hour consistently.</InfoBox>
        <StepList steps={[
          { title: "Take the Pirate Raid quest", desc: "Located at the entrance to Castle. This quest chains the fastest and gives the highest XP per completion at this level." },
          { title: "Clear the ground floor mobs", desc: "Use Dragon's Z move (Dragon Fang) to sweep the entire entrance hallway in one rotation. Kitsune's AoE works equally well." },
          { title: "Move to upper courtyard", desc: "The Cursed Captain spawn on the upper level gives a bonus XP burst. Clear it between quest loops." },
          { title: "Chain quests without stopping", desc: "The moment your quest completes, immediately accept the next. Zero downtime between chains is the key to max XP/hr." },
          { title: "Server hop every 30–45 minutes", desc: "Server populations accumulate AFK players which reduce enemy spawn rates. Fresh servers = full spawns = faster clearing." },
        ]} />
      </GuideSection>

      <GuideSection title="Beli Farming Routes" icon="💰" accent="green">
        <p style={{ marginBottom: "1rem" }}>XP and Beli grinding routes are often different. For max Beli income:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0.75rem" }}>
          {[
            { name: "Elite Pirates (Sea 3)", beli: "~2M/hr", note: "Best Beli drop rate in the game. Use Buddha for fastest clears." },
            { name: "Darkbeard Boss", beli: "~800K run", note: "Drops fragments + high Beli. Respawns every 60 minutes." },
            { name: "Sea Beast Hunting", beli: "~1.5M/hr", note: "Spawn sea beasts with a boat and kill them with Magma or Dragon." },
            { name: "Flower quest chain", beli: "~600K/hr", note: "Low effort, can semi-AFK. Good for passive Beli while doing other things." },
          ].map(r => (
            <div key={r.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem", marginBottom: 4 }}>{r.name}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "var(--green)", fontWeight: 700, marginBottom: 6 }}>{r.beli}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{r.note}</div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Mastery Grinding Tips" icon="⭐" accent="gold">
        <p style={{ marginBottom: "1rem" }}>Mastery unlocks your fruit and fighting style moves. Here&apos;s how to grind it efficiently:</p>
        <InfoBox type="warning">Never grind mastery on enemies more than 100 levels below you — you get 1 mastery per kill instead of the full amount. Always stay in your level-appropriate zone.</InfoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {[
            "Use the 2x Mastery gamepass — it halves the time needed for all mastery grinding.",
            "Alternate between your fruit moves on every kill to spread mastery across all abilities evenly.",
            "Fighting style mastery is separate — grind it alongside your fruit, not after.",
            "At Sea 3, the Haunted Castle NPCs give the fastest mastery per hour due to their density.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--gold)", flexShrink: 0 }}>◆</span><p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{tip}</p></div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
