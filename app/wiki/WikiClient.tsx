"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { WIKI_FRUITS, TIER_ORDER, type FruitType, type FruitTier } from "../_data/wiki-data";

const TIER_META: Record<FruitTier, { label: string; color: string; bg: string; border: string }> = {
  S: { label: "God Tier", color: "#ffd700", bg: "rgba(255,215,0,0.08)", border: "rgba(255,215,0,0.3)" },
  A: { label: "Top Tier", color: "#00f5ff", bg: "rgba(0,245,255,0.07)", border: "rgba(0,245,255,0.25)" },
  B: { label: "Solid", color: "#2ed573", bg: "rgba(46,213,115,0.07)", border: "rgba(46,213,115,0.25)" },
  C: { label: "Average", color: "#ffa502", bg: "rgba(255,165,2,0.07)", border: "rgba(255,165,2,0.25)" },
  D: { label: "Avoid", color: "#ff4757", bg: "rgba(255,71,87,0.07)", border: "rgba(255,71,87,0.25)" },
};

const TYPES: (FruitType | "All")[] = ["All", "Beast", "Elemental", "Natural"];

export default function WikiClient() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<FruitType | "All">("All");
  const [activeTier, setActiveTier] = useState<FruitTier | "All">("All");

  const filtered = useMemo(() => {
    return WIKI_FRUITS.filter(f => {
      const matchSearch =
        search === "" ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.type.toLowerCase().includes(search.toLowerCase());
      const matchType = activeType === "All" || f.type === activeType;
      const matchTier = activeTier === "All" || f.tier === activeTier;
      return matchSearch && matchType && matchTier;
    });
  }, [search, activeType, activeTier]);

  const grouped = useMemo(() => {
    return TIER_ORDER.map(tier => ({
      tier,
      fruits: filtered.filter(f => f.tier === tier),
    })).filter(g => g.fruits.length > 0);
  }, [filtered]);

  const btnBase: React.CSSProperties = {
    padding: "7px 18px",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontFamily: "'Rajdhani',sans-serif",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    border: "1px solid rgba(0,245,255,0.2)",
    background: "transparent",
    color: "#7a96b8",
    transition: "all 0.2s",
  };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(0,245,255,0.05),rgba(0,245,255,0.02) 60%,transparent)", borderBottom: "1px solid rgba(0,245,255,0.13)", padding: "4rem 5% 2.5rem" }}>
        <div style={{ position: "absolute", width: 600, height: 600, background: "#00f5ff", borderRadius: "50%", filter: "blur(140px)", opacity: 0.04, top: -150, right: -150, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", fontSize: "0.8rem", color: "#7a96b8" }}>
            <Link href="/" style={{ color: "#7a96b8", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "#00f5ff" }}>Wiki</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", color: "#00f5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.65rem" }}>
                📖 Blox Fruits Wiki
              </div>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "0.65rem" }}>
                All Devil Fruits
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.92rem", maxWidth: 520 }}>
                Every fruit ranked, rated, and analyzed. Moves, builds, trade values, and meta notes — updated after every patch.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/calculator" style={{ background: "#00f5ff", color: "#020810", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                Trade Calculator
              </Link>
              <Link href="/values" style={{ background: "transparent", color: "#ffd700", border: "1px solid rgba(255,215,0,0.35)", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Value List
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {[
              { label: "Fruits", value: WIKI_FRUITS.length + "+" },
              { label: "S-Tier", value: WIKI_FRUITS.filter(f => f.tier === "S").length.toString() },
              { label: "Updated", value: "Apr 2026" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.3rem", fontWeight: 900, color: "#00f5ff" }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#7a96b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 420, marginBottom: "1.5rem" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#7a96b8", fontSize: "0.9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search fruits..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 10, padding: "11px 14px 11px 40px", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#e8f4ff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", color: "#7a96b8", letterSpacing: "0.12em", alignSelf: "center", marginRight: 4 }}>TYPE</span>
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{
                  ...btnBase,
                  ...(activeType === t ? { background: "#00f5ff", color: "#020810", border: "1px solid #00f5ff" } : {}),
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", color: "#7a96b8", letterSpacing: "0.12em", alignSelf: "center", marginRight: 4 }}>TIER</span>
            {(["All", ...TIER_ORDER] as (FruitTier | "All")[]).map(t => {
              const meta = t !== "All" ? TIER_META[t] : null;
              const isActive = activeTier === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTier(t)}
                  style={{
                    ...btnBase,
                    ...(isActive && meta ? { background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` } : {}),
                    ...(isActive && !meta ? { background: "#00f5ff", color: "#020810", border: "1px solid #00f5ff" } : {}),
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 5%" }}>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#7a96b8", fontFamily: "'Inter',sans-serif" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No fruits found. Try a different search or filter.</p>
          </div>
        )}

        {grouped.map(({ tier, fruits }) => {
          const meta = TIER_META[tier];
          return (
            <div key={tier} style={{ marginBottom: "3rem" }}>
              {/* Tier header */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ minWidth: 52, textAlign: "center", fontFamily: "'Orbitron',monospace", fontSize: "1.3rem", fontWeight: 900, padding: "8px 12px", borderRadius: 10, background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                  {tier}
                </div>
                <div>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 700, color: meta.color }}>{meta.label}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#7a96b8" }}>{fruits.length} fruit{fruits.length !== 1 ? "s" : ""}</div>
                </div>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${meta.border},transparent)` }} />
              </div>

              {/* Fruit cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
                {fruits.map(fruit => (
                  <Link key={fruit.slug} href={`/wiki/${fruit.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 16, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem", position: "relative", overflow: "hidden", transition: "all 0.25s", cursor: "pointer", height: "100%", boxSizing: "border-box" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = meta.border;
                        el.style.transform = "translateY(-4px)";
                        el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.35)`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(0,245,255,0.13)";
                        el.style.transform = "none";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {/* Top tier line */}
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${meta.color},transparent)`, opacity: 0.6 }} />

                      {/* Header row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <div style={{ fontSize: "2.2rem", lineHeight: 1 }}>{fruit.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "#e8f4ff", marginBottom: 3 }}>{fruit.name}</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: "0.65rem", color: fruit.rarityColor, background: `${fruit.rarityColor}18`, border: `1px solid ${fruit.rarityColor}40`, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>{fruit.rarity}</span>
                            <span style={{ fontSize: "0.65rem", color: "#7a96b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 9px", borderRadius: 20, letterSpacing: "0.08em" }}>{fruit.type}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "center", fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, padding: "6px 10px", borderRadius: 8, background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`, flexShrink: 0 }}>
                          {tier}
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.83rem", lineHeight: 1.65, margin: 0 }}>
                        {fruit.description.length > 120 ? fruit.description.slice(0, 120) + "..." : fruit.description}
                      </p>

                      {/* Rating row */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem" }}>
                        {(["pvp", "pve", "grinding", "tradeValue"] as const).map(key => {
                          const label = key === "tradeValue" ? "Trade" : key.toUpperCase();
                          const val = fruit[key] as FruitTier;
                          const vm = TIER_META[val];
                          return (
                            <div key={key} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.6rem", color: "#7a96b8", letterSpacing: "0.1em", marginBottom: 3 }}>{label}</div>
                              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 900, color: vm.color }}>{val}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price + CTA row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto" }}>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#7a96b8" }}>
                          {fruit.robuxPrice ? (
                            <span><span style={{ color: "#00f5ff" }}>💎</span> {fruit.robuxPrice.toLocaleString()} Robux</span>
                          ) : (
                            <span>Trade only</span>
                          )}
                        </div>
                        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: meta.color, letterSpacing: "0.06em" }}>VIEW WIKI →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div style={{ marginTop: "2rem", background: "linear-gradient(135deg,rgba(0,245,255,0.05),rgba(255,215,0,0.03))", border: "1px solid rgba(0,245,255,0.18)", borderRadius: 18, padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1rem,2.5vw,1.4rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Ready to <span style={{ color: "#00f5ff" }}>Trade Smarter?</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.9rem", marginBottom: "1.75rem", maxWidth: 440, margin: "0 auto 1.75rem" }}>
            Use our AI-powered trade calculator to verify any deal before you accept it.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/calculator" style={{ background: "#00f5ff", color: "#020810", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Trade Calculator
            </Link>
            <Link href="/values" style={{ background: "transparent", color: "#ffd700", border: "1px solid rgba(255,215,0,0.35)", padding: "12px 28px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
              Value List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
