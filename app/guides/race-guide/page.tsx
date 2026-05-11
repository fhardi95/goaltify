import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, TierCard } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Blox Fruits Race Guide 2026 — Best Race Tier List & Awakenings",
  description: "Complete Blox Fruits race guide for 2026. Best race tier list, V4 awakening requirements, and which race pairs best with every devil fruit build.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides/race-guide" },
};

const RACES = [
  { name: "Cyborg", v1: "Enhanced defense and chest laser beam ability.", v2: "Improved laser and energy shield passive.", v3: "Full cyborg suit with mechanical wings and superior damage resistance.", v4: "Machine mode: massive defense buff, energy cannon, near-invulnerability for 30 seconds.", bestWith: "Venom, Dragon", icon: "🤖" },
  { name: "Ghoul", v1: "Life steal on every hit — great for sustain.", v2: "Enhanced life steal rate + speed boost at night.", v3: "Reaper form with scythe ability and AoE steal.", v4: "Death mode: amplified life steal, fear aura, massive damage at low HP.", bestWith: "Dragon, Dough", icon: "👻" },
  { name: "Human", v1: "Basic stats, no special passive.", v2: "+5% damage and movement speed.", v3: "+10% overall stats boost.", v4: "Sniper specialization: massive ranged damage boost, immunity to knockback.", bestWith: "Any / PVP builds", icon: "👤" },
  { name: "Angel", v1: "Glide and flight abilities unlocked earlier.", v2: "Holy blast attack and speed enhancement.", v3: "Full angel wings with healing aura for nearby allies.", v4: "Seraphim mode: divine beam, flight speed doubled, party-wide heal.", bestWith: "Phoenix, Blizzard", icon: "😇" },
  { name: "Rabbit", v1: "Fastest base movement speed in the game.", v2: "Enhanced speed + quick-dash ability.", v3: "Speed amplification makes you nearly uncatchable.", v4: "Flash mode: teleport-level speed, immunity to slow effects, afterimage dashes.", bestWith: "Leopard, Thunder", icon: "🐰" },
  { name: "Shark", v1: "Water immunity — can swim at full speed.", v2: "Swim speed + water attack damage boost.", v3: "Underwater combat advantage + torpedo dash.", v4: "Leviathan form: devastating water AoE, full water immunity, sea beast summon.", bestWith: "Blizzard, Magma", icon: "🦈" },
];

export default function RaceGuidePage() {
  return (
    <GuideLayout
      tag="Race Guide · All V4 Awakenings"
      title="Race Guide &"
      titleHighlight="V4 Awakenings"
      description="Every race in Blox Fruits ranked and explained — from V1 to V4 awakening. Discover which race pairs best with your devil fruit build and how to unlock V4 efficiently."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Race Guide", href: "/guides/race-guide" }]}
      readTime="11 min read"
    >
      <GuideSection title="Race Tier List 2026" icon="🏆" accent="gold">
        <TierCard tier="S" label="Best Races" items={[
          { emoji: "🤖", name: "Cyborg V4", note: "Machine mode is the best defensive racial in the game. Essential for tanky PVP builds." },
          { emoji: "🐰", name: "Rabbit V4", note: "Flash mode speed is unmatched. Pairs perfectly with mobility fruits like Leopard and Thunder." },
        ]} />
        <TierCard tier="A" label="Excellent" items={[
          { emoji: "👻", name: "Ghoul V4", note: "Death mode life steal at low HP can completely turn fights. Pairs great with Dragon." },
          { emoji: "🦈", name: "Shark V4", note: "Leviathan form AoE is massive. Best for sea-based content and team PVP." },
        ]} />
        <TierCard tier="B" label="Good" items={[
          { emoji: "😇", name: "Angel V4", note: "Seraphim healing is great for team play. Less impactful in solo PVP." },
          { emoji: "👤", name: "Human V4", note: "Sniper damage boost is niche. Good for specific ranged builds but outclassed overall." },
        ]} />
      </GuideSection>

      <GuideSection title="All Races — V1 to V4 Breakdown" icon="📖">
        <InfoBox type="info">V4 awakening requires completing the Musketeer Island race trial — a timed obstacle course unique to each race. You must be at least Level 2000 to attempt it.</InfoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {RACES.map(r => (
            <div key={r.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(0,245,255,0.04)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700 }}>{r.name}</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 20, padding: "3px 12px" }}>Best with: {r.bestWith}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 0 }}>
                {([["V1", r.v1], ["V2", r.v2], ["V3", r.v3], ["V4 ★", r.v4]] as [string, string][]).map(([v, desc], i) => (
                  <div key={v} style={{ padding: "0.85rem 1rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 700, color: v.includes("4") ? "var(--gold)" : "var(--cyan)", marginBottom: 4 }}>{v}</div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="How to Unlock V4" icon="🔓" accent="cyan">
        <InfoBox type="warning">V4 requires Level 2000+ and completing your race-specific trial on Musketeer Island. Each race trial is different — Rabbit is a speed course, Shark requires underwater combat, etc.</InfoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {[
            { step: "Reach Level 2000+", desc: "V4 trials are locked until you hit the level threshold. Grind to max first." },
            { step: "Visit Musketeer Island", desc: "Located in Sea 3. Talk to the NPC matching your race to start the trial." },
            { step: "Complete the race trial", desc: "Each trial has a 3-minute time limit. Practice the route before attempting for real." },
            { step: "Collect the awakening item", desc: "After completion you receive the V4 core item. Equip it to permanently unlock V4." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 700, color: "var(--cyan)", flexShrink: 0 }}>{i + 1}</div>
              <div><div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: 2 }}>{s.step}</div><div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{s.desc}</div></div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Race + Fruit Pairing Guide" icon="🍎" accent="green">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0.75rem" }}>
          {[
            { race: "🤖 Cyborg", fruit: "Venom / Dragon", reason: "Machine mode + Venom pools = near-unkillable in PVP. Dragon's mobility + Cyborg defense is the current #1 PVP combo." },
            { race: "🐰 Rabbit", fruit: "Leopard / Thunder", reason: "Flash speed + Leopard speed = literally the fastest player in any server. Great for hit-and-run tactics." },
            { race: "👻 Ghoul", fruit: "Dragon / Dough", reason: "Life steal extends your survivability dramatically. Best for players who like aggressive, brawling playstyles." },
            { race: "🦈 Shark", fruit: "Blizzard / Magma", reason: "Water immunity + elemental fruits makes you dominant in ocean areas and Sea 3 content." },
            { race: "😇 Angel", fruit: "Phoenix / Blizzard", reason: "Healing aura + Phoenix passive regen makes you nearly impossible to kill in team fights." },
            { race: "👤 Human", fruit: "Any PVP fruit", reason: "Sniper mode damage is universal. Good budget choice if you haven&apos;t unlocked other races yet." },
          ].map(p => (
            <div key={p.race} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 4 }}>{p.race}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--gold)", marginBottom: 6 }}>+ {p.fruit}</div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{p.reason}</p>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
