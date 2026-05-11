import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, TierCard, InfoBox } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Blox Fruits Rankings 2026 — Complete Devil Fruit Tier List",
  description: "Complete Blox Fruits devil fruit rankings for 2026. Every fruit ranked for PVP, PVE, grinding, and overall value. Updated after every patch with AI analysis.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides/fruit-rankings" },
};

export default function FruitRankingsPage() {
  return (
    <GuideLayout
      tag="Fruit Rankings"
      title="Devil Fruit"
      titleHighlight="Rankings 2026"
      description="Every Blox Fruits devil fruit ranked across PVP, PVE, grinding efficiency, and trade value. Updated by our AI after every patch using real game data and community performance stats."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Fruit Rankings", href: "/guides/fruit-rankings" }]}
      readTime="15 min read"
    >
      <GuideSection title="How We Rank Fruits" icon="📊">
        <p style={{ marginBottom: "1rem" }}>Our AI analyzes four dimensions for each fruit: PVP performance (damage, mobility, combos), PVE effectiveness (boss damage, AoE, sustain), grinding efficiency (XP/hr, ease of use), and trade value (demand, rarity, price stability).</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
          {[
            { label: "PVP Weight", val: "35%", color: "var(--red)" },
            { label: "PVE Weight", val: "30%", color: "var(--cyan)" },
            { label: "Grinding", val: "20%", color: "var(--green)" },
            { label: "Trade Value", val: "15%", color: "var(--gold)" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Overall Tier List — April 2026" icon="🏆" accent="gold">
        <TierCard tier="S" label="God Tier — Must Have" items={[
          { emoji: "🐉", name: "Dragon", note: "Unmatched mobility + AoE. Best all-rounder in the game. S-tier PVP and PVE." },
          { emoji: "🐆", name: "Leopard", note: "Highest burst damage in PVP. Lightning-fast combos. Hardest to master but most rewarding." },
          { emoji: "🦊", name: "Kitsune", note: "Newest mythical. Spirit fox abilities with massive AoE damage. Rising fast in meta." },
          { emoji: "☠️", name: "Venom", note: "Poison pool mechanics counter healers. Exceptional boss damage. S-tier PVE." },
          { emoji: "🌑", name: "Shadow", note: "Umbra mode transforms the kit entirely. Great combo extension and area denial." },
        ]} />
        <TierCard tier="A" label="Top Tier — Excellent Choice" items={[
          { emoji: "🥐", name: "Dough", note: "Consistent PVP pick. Fast moves, good damage, forgiving hitboxes." },
          { emoji: "❄️", name: "Blizzard", note: "Best elemental for both modes. Freeze + AoE is devastating." },
          { emoji: "🔥", name: "Phoenix", note: "Passive regen makes it the best sustain fruit. Ideal for boss farming." },
          { emoji: "⚡", name: "Thunder", note: "Speed and stuns make it great for hit-and-run PVP. High mobility." },
          { emoji: "🔔", name: "Buddha", note: "The undisputed grinding king. Massive hitbox, incredible PVE utility." },
          { emoji: "🌋", name: "Magma", note: "Floor damage is passive and devastating. Best Beli farming fruit." },
        ]} />
        <TierCard tier="B" label="Solid — Worth Using" items={[
          { emoji: "🕷️", name: "Spider", note: "Web traps for area denial. Surprisingly effective in the right hands." },
          { emoji: "💨", name: "Gas", note: "AoE gas zones pressure opponents well. Strong in team PVP." },
          { emoji: "💢", name: "Pain", note: "Damage reflection and utility make it a niche but effective pick." },
          { emoji: "🌒", name: "Dark", note: "Black hole pulls are great for combos. Decent all-round kit." },
          { emoji: "🧊", name: "Ice", note: "Reliable elemental. Good for new players learning Blox Fruits." },
        ]} />
        <TierCard tier="C" label="Average — Upgrade ASAP" items={[
          { emoji: "🌊", name: "Quake", note: "Shockwaves cover area but are very slow and predictable." },
          { emoji: "🌸", name: "Spring", note: "Bouncing kit has a learning curve but lacks depth at high level." },
          { emoji: "🛡️", name: "Barrier", note: "Shields are situationally useful but the kit is too passive overall." },
          { emoji: "💭", name: "Smoke", note: "Early game placeholder only. Replace as soon as possible." },
        ]} />
        <TierCard tier="D" label="Avoid — Do Not Use" items={[
          { emoji: "🔪", name: "Chop", note: "Sword immunity is the only redeeming quality. Extremely weak kit." },
          { emoji: "💣", name: "Bomb", note: "Mediocre damage. Completely outclassed by every other option." },
          { emoji: "🌀", name: "Spin", note: "No competitive viability whatsoever. Avoid at all costs." },
          { emoji: "🚀", name: "Rocket", note: "The weakest fruit in Blox Fruits. Only useful as vendor material." },
        ]} />
      </GuideSection>

      <GuideSection title="Best Fruits by Use Case" icon="🎯" accent="cyan">
        <InfoBox type="info">Different fruits excel in different scenarios. Use this table to find the best fruit for your specific goal.</InfoBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.75rem" }}>
          {[
            { use: "Best PVP Overall", fruits: "Dragon, Leopard, Dough", icon: "⚔️" },
            { use: "Best for Grinding", fruits: "Buddha, Magma, Dragon", icon: "🔄" },
            { use: "Best Boss Farming", fruits: "Venom, Phoenix, Buddha", icon: "👹" },
            { use: "Best for Beginners", fruits: "Ice, Magma, Phoenix", icon: "🎮" },
            { use: "Best Trade Value", fruits: "Kitsune, Dragon, Leopard", icon: "💱" },
            { use: "Best Mobility", fruits: "Leopard, Dragon, Thunder", icon: "💨" },
            { use: "Best Healing", fruits: "Phoenix, Venom (Demon)", icon: "❤️" },
            { use: "Best AoE Damage", fruits: "Dragon, Blizzard, Kitsune", icon: "💥" },
          ].map(r => (
            <div key={r.use} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.9rem 1rem" }}>
              <div style={{ fontSize: "1rem", marginBottom: 4 }}>{r.icon}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{r.use}</div>
              <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--cyan)" }}>{r.fruits}</div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Patch Notes Impact — April 2026" icon="🔄" accent="green">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { fruit: "Dough", change: "BUFF", detail: "Hitbox increased by 12%. Z move now has reduced startup lag. Back to A-tier.", color: "var(--green)" },
            { fruit: "Ice", change: "NERF", detail: "Freeze duration reduced from 2.5s to 1.8s in PVP. Still viable but less oppressive.", color: "var(--red)" },
            { fruit: "Venom", change: "BUFF", detail: "Poison pool damage increased by 15% in PVP. Pool duration extended to 8 seconds.", color: "var(--green)" },
            { fruit: "Blizzard", change: "NEUTRAL", detail: "No changes this patch. Remains solid A-tier across all modes.", color: "var(--text-muted)" },
            { fruit: "Kitsune", change: "NEW", detail: "Added in 2.1.4. Mythical Beast fruit. Already placing S-tier across PVP and PVE.", color: "var(--cyan)" },
          ].map(p => (
            <div key={p.fruit} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1rem" }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 700, color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}40`, borderRadius: 6, padding: "3px 9px", flexShrink: 0, alignSelf: "flex-start" }}>{p.change}</span>
              <div>
                <span style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}>{p.fruit}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.87rem" }}> — {p.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
