import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, StepList } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Blox Fruits Beginner Guide 2026 — Start Here",
  description: "New to Blox Fruits? This complete beginner guide covers everything — first fruit, stats, Haki, Sea progression, and how to reach max level efficiently in 2026.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides/beginner-guide" },
};

export default function BeginnerGuidePage() {
  return (
    <GuideLayout
      tag="Beginner Guide · Start Here"
      title="Blox Fruits"
      titleHighlight="Beginner Guide"
      description="Never played Blox Fruits before? This guide covers everything you need to know — from your very first fruit to reaching max level. Written for complete newcomers in 2026."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Beginner Guide", href: "/guides/beginner-guide" }]}
      readTime="14 min read"
    >
      <GuideSection title="What is Blox Fruits?" icon="🎮">
        <p style={{ marginBottom: "1rem" }}>Blox Fruits is a Roblox game inspired by the One Piece anime. You level up your character, eat devil fruits to gain special powers, and explore three seas filled with enemies, bosses, and other players. The goal is to reach max level (currently 2550), unlock the strongest abilities, and dominate in PVP.</p>
        <InfoBox type="info">Blox Fruits is one of the most played Roblox games ever, with billions of visits. Updates arrive regularly — our AI tier list and value list update after every patch to keep you current.</InfoBox>
      </GuideSection>

      <GuideSection title="Getting Started — First 30 Minutes" icon="🚀" accent="cyan">
        <StepList steps={[
          { title: "Choose your starting path", desc: "You start on Starter Island. Talk to the Blox Fruit Dealer to buy your first fruit. For beginners, Ice or Magma are affordable and strong early-game options." },
          { title: "Complete your first quest", desc: "Talk to the Quest Giver NPC (the exclamation mark icon). Always have a quest active — without one, you earn no XP bonus from kills." },
          { title: "Understand stats", desc: "You get stat points every level. For early game: put points into Melee (if using fighting style), Fruit (if using your devil fruit), or Defense. Don't spread them thin." },
          { title: "Eat a devil fruit", desc: "Buy one from the Blox Fruit Dealer or find one randomly spawning in the world (they appear under trees every hour). Eating gives you special powers." },
          { title: "Unlock Swords", desc: "Swords are your main M1 attack. Get the Cutlass from the Sword Dealer on Starter Island. Always have a sword equipped — M1 attacks build mastery." },
        ]} />
      </GuideSection>

      <GuideSection title="Understanding Devil Fruits" icon="🍎" accent="gold">
        <p style={{ marginBottom: "1rem" }}>Devil fruits are the core of Blox Fruits. There are three types:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { type: "Natural", desc: "Logia-type. Usually AoE and elemental. Examples: Ice, Magma, Dark. Great for beginners.", icon: "🌿", color: "var(--green)" },
            { type: "Elemental", desc: "Paramecia-type. Transformation or ability-based. Examples: Dough, Quake, Spring.", icon: "⚗️", color: "var(--cyan)" },
            { type: "Beast", desc: "Zoan-type. Transform into animals. Usually the strongest. Examples: Dragon, Leopard, Phoenix.", icon: "🦁", color: "var(--gold)" },
          ].map(t => (
            <div key={t.type} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 700, color: t.color, marginBottom: 6 }}>{t.type}</div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
        <InfoBox type="tip">For your first fruit, buy <strong>Magma</strong> from the Blox Fruit Dealer (~850K Beli). It&apos;s powerful all the way to Sea 3 and great for both grinding and PVE. It will not let you down as a starter fruit.</InfoBox>
      </GuideSection>

      <GuideSection title="Stats Allocation Guide" icon="📈" accent="cyan">
        <p style={{ marginBottom: "1rem" }}>Stat points are permanent — spend them wisely. Here&apos;s the recommended early-game allocation:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { stat: "Fruit / Blox Fruit", pct: "60%", desc: "Scales your devil fruit move damage. Max this if you use your fruit as your main damage source.", color: "var(--cyan)" },
            { stat: "Defense / Melee", pct: "25%", desc: "Increases your HP and damage reduction. Essential for survivability in Sea 2 and beyond.", color: "var(--green)" },
            { stat: "Sword", pct: "15%", desc: "Only invest here if you plan to use sword as primary. Otherwise skip entirely.", color: "var(--gold)" },
          ].map(s => (
            <div key={s.stat} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 700, color: s.color, minWidth: 48 }}>{s.pct}</div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: 2 }}>{s.stat}</div>
                <div style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <InfoBox type="warning">You can reset your stats using a stat reset item from the in-game shop. Don&apos;t stress too much early on — a reset is always available if you make a mistake.</InfoBox>
      </GuideSection>

      <GuideSection title="The Three Seas — Progression Path" icon="🗺️" accent="gold">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { sea: "Sea 1", range: "Level 1–700", color: "var(--green)", desc: "Starter island through Skylands and Colosseum. Focus on completing quests, learning your fruit moves, and getting your first sword upgrades. Don't rush — mastery here is important.", tips: ["Do every quest at least once", "Get your first fighting style from the Master of Auras", "Unlock Buso Haki before leaving Sea 1"] },
            { sea: "Sea 2", range: "Level 700–1500", color: "var(--cyan)", desc: "Kingdom of Rose and surrounding islands. Better enemies, more complex quests, and access to the first raid bosses. This is where you get serious about your build.", tips: ["Unlock Observation Haki (Ken) as soon as possible", "Complete the Colosseum quest chain for fragments", "Start farming fragments for fruit awakening"] },
            { sea: "Sea 3", range: "Level 1500–2550", color: "var(--gold)", desc: "The endgame. Haunted Castle, Castle on the Sea, and Elite Pirates. Race V4, fruit awakening V2, and PVP become the main focus. The best rewards and rarest fruits are here.", tips: ["Awaken your fruit — the difference is massive", "Get your Race V4 from Musketeer Island", "Join a crew for Elite Raid bosses"] },
          ].map(s => (
            <div key={s.sea} style={{ background: "var(--bg-card)", border: `1px solid ${s.color}30`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "0.9rem 1.25rem", background: `${s.color}08`, borderBottom: `1px solid ${s.color}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: s.color }}>{s.sea}</span>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: s.color, opacity: 0.7 }}>{s.range}</span>
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {s.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: s.color, flexShrink: 0, fontSize: "0.8rem" }}>→</span><span style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{tip}</span></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Haki — Your Most Important Upgrade" icon="✨">
        <p style={{ marginBottom: "1rem" }}>Haki is a passive ability system in Blox Fruits. It is <strong style={{ color: "var(--text)" }}>not optional</strong> — without it you cannot compete. There are two types:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { name: "Buso Haki", subtitle: "Armament", desc: "Lets your attacks hit Elemental fruit users who are otherwise immune to damage. Also boosts M1 damage by ~15% at max level. Unlock it from the Sabi NPC in Sea 1.", color: "var(--cyan)" },
            { name: "Ken Haki", subtitle: "Observation", desc: "Auto-dodges incoming attacks. Absolutely essential for PVP. At V2, you can dodge up to 8 hits in a row. Unlock from Shanks NPC in Sea 2.", color: "var(--gold)" },
          ].map(h => (
            <div key={h.name} style={{ background: "var(--bg-card)", border: `1px solid ${h.color}30`, borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 700, color: h.color, marginBottom: 2 }}>{h.name}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h.subtitle}</div>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{h.desc}</p>
            </div>
          ))}
        </div>
        <InfoBox type="tip">To level up Buso Haki, keep it activated while grinding — it levels passively as you deal damage. Ken Haki levels up by successfully dodging attacks. Both take time but pay off enormously.</InfoBox>
      </GuideSection>

      <GuideSection title="Next Steps" icon="🏆" accent="green">
        <p style={{ marginBottom: "1.25rem" }}>Now that you know the basics, here&apos;s where to go next on BloxFruitsAI:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.75rem" }}>
          {[
            { label: "View Value List", href: "/values", desc: "Know what your fruits are worth before trading.", icon: "📋" },
            { label: "Trade Calculator", href: "/calculator", desc: "Check if any trade is fair before you accept.", icon: "💱" },
            { label: "PVP Builds", href: "/guides/pvp-builds", desc: "Ready for PVP? Get the meta build.", icon: "⚔️" },
            { label: "Grinding Routes", href: "/guides/grinding-routes", desc: "Level up faster with optimized routes.", icon: "🗺️" },
          ].map(n => (
            <Link key={n.href} href={n.href} style={{ display: "block", background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 12, padding: "1rem", textDecoration: "none", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>{n.icon}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 4 }}>{n.label}</div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{n.desc}</p>
            </Link>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
