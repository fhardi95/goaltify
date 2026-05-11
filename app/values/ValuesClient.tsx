"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FRUITS, TIERS, formatValue, type FruitTier, type FruitCategory } from "../_data/fruits-data";

const TIER_STYLES: Record<FruitTier, { bg: string; color: string; border: string }> = {
  S: { bg: "rgba(255,215,0,0.12)", color: "var(--gold)", border: "rgba(255,215,0,0.4)" },
  A: { bg: "rgba(0,245,255,0.1)", color: "var(--cyan)", border: "rgba(0,245,255,0.3)" },
  B: { bg: "rgba(46,213,115,0.1)", color: "var(--green)", border: "rgba(46,213,115,0.3)" },
  C: { bg: "rgba(255,165,2,0.1)", color: "#ffa502", border: "rgba(255,165,2,0.3)" },
  D: { bg: "rgba(255,71,87,0.08)", color: "var(--red)", border: "rgba(255,71,87,0.2)" },
};

const RARITY_COLORS: Record<string, string> = {
  Mythical: "#ff6b9d",
  Legendary: "var(--gold)",
  Rare: "var(--cyan)",
  Uncommon: "var(--green)",
  Common: "var(--text-muted)",
};

function DemandBar({ val }: { val: number }) {
  const color = val >= 8 ? "var(--green)" : val >= 5 ? "var(--orange)" : "var(--red)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${val * 10}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: "0.78rem", fontWeight: 600, color, minWidth: 20 }}>{val}</span>
    </div>
  );
}

export default function ValuesClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<FruitTier | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<FruitCategory | "all">("all");
  const [sort, setSort] = useState<"value" | "demand" | "tier" | "name">("value");
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");
  const [viewStyle, setViewStyle] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    let fruits = [...FRUITS];
    if (search) fruits = fruits.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
    if (tierFilter !== "all") fruits = fruits.filter(f => f.tier === tierFilter);
    if (categoryFilter !== "all") fruits = fruits.filter(f => f.category === categoryFilter);
    fruits.sort((a, b) => {
      if (sort === "value") return (viewMode === "permanent" ? b.permanentValue - a.permanentValue : b.value - a.value);
      if (sort === "demand") return b.demand - a.demand;
      if (sort === "tier") return TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier);
      return a.name.localeCompare(b.name);
    });
    return fruits;
  }, [search, tierFilter, categoryFilter, sort, viewMode]);

  const mythicalCount = FRUITS.filter(f => f.rarity === "Mythical").length;
  const sTierCount = FRUITS.filter(f => f.tier === "S").length;
  const avgDemand = (FRUITS.reduce((s, f) => s + f.demand, 0) / FRUITS.length).toFixed(1);

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>

      {/* ── PAGE HEADER + SEO CONTENT ─────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),rgba(0,245,255,0.01) 60%,transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "var(--cyan)", borderRadius: "50%", filter: "blur(140px)", opacity: 0.03, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.85rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span aria-hidden>/</span>
            <span style={{ color: "var(--cyan)" }}>Blox Fruits Value List</span>
          </nav>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>

            {/* Left: heading block */}
            <div style={{ flex: 1, minWidth: 280, maxWidth: 700 }}>

              {/* Pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>
                <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%", display: "inline-block" }} />
                Updated Daily · 2026
              </div>

              {/* H1 — primary keyword: "blox fruit value list" 2,400/mo + "blox fruit values" 165,000/mo */}
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.5rem,3vw,2.3rem)", fontWeight: 700, marginBottom: "0.6rem", lineHeight: 1.2 }}>
                Blox Fruits <span style={{ color: "var(--cyan)" }}>Value List</span> 2026
              </h1>

              {/* H2 — secondary keyword cluster: "blox fruit values" + "blox fruit value chart" + "blox fruit prices" */}
              <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)", marginBottom: "0.85rem", lineHeight: 1.65 }}>
                Complete <strong style={{ color: "var(--text)" }}>Blox Fruits values</strong> — every devil fruit price, demand score, and tier ranking in one place. The most accurate <strong style={{ color: "var(--text)" }}>Blox Fruit value chart</strong> online, updated after every patch.
              </h2>

              {/* SEO paragraph — "blox fruit value list" + "blox fruit trading value" + "blox fruit value trade" + "blox fruit prices" + "bfv values" */}
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "0.85rem" }}>
                Our <strong style={{ color: "var(--text)" }}>Blox Fruits value list</strong> tracks real-time <strong style={{ color: "var(--text)" }}>Blox Fruit prices</strong>, demand ratings, and tier rankings for every devil fruit in the game. Whether you are looking for <strong style={{ color: "var(--text)" }}>Blox Fruit trading values</strong>, checking the worth of a permanent fruit, or comparing tiers before a trade — this is the only <strong style={{ color: "var(--text)" }}>BFV values</strong> resource you need. Filter by tier, sort by demand or value, and find exactly what every fruit is worth right now.
              </p>

              {/* Trust signals */}
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                {[
                  { icon: "📊", label: `${FRUITS.length}+ fruits tracked` },
                  { icon: "🔄", label: "Updated every patch" },
                  { icon: "⚡", label: "Demand scores live" },
                  { icon: "🆓", label: "Free forever" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span>{s.icon}</span><span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-end" }}>
              <Link href="/calculator" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "11px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
                ⚖️ Trade Calculator
              </Link>
              <Link href="/wiki" style={{ background: "transparent", color: "var(--gold)", border: "1px solid rgba(255,215,0,0.3)", padding: "11px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
                📖 Fruit Wiki
              </Link>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "right" }}>
                <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> items · Real-time prices &amp; demand
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "1rem 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: "Total Fruits", val: FRUITS.length, color: "var(--cyan)" },
            { label: "Mythical", val: mythicalCount, color: "#ff6b9d" },
            { label: "S-Tier", val: sTierCount, color: "var(--gold)" },
            { label: "Avg Demand", val: avgDemand, color: "var(--green)" },
          ].map(s => (
            <div key={s.label}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: s.color, display: "block" }}>{s.val}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>
            Showing <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> of {FRUITS.length} items
          </div>
        </div>
      </div>

      {/* ── FILTERS + FRUIT LIST ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 5%" }}>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Blox Fruits values..."
            aria-label="Search fruit values"
            style={{ flex: "1 1 200px", minWidth: 180, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }}
          />

          {/* Tier filter */}
          <div style={{ display: "flex", gap: 4 }}>
            {(["all", ...TIERS] as const).map(t => (
              <button
                key={t}
                onClick={() => setTierFilter(t as FruitTier | "all")}
                aria-label={`Filter by tier ${t}`}
                style={{ padding: "7px 12px", borderRadius: 6, border: "1px solid var(--border)", background: tierFilter === t ? "var(--cyan)" : "var(--bg-card)", color: tierFilter === t ? "var(--bg-deep)" : "var(--text-muted)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              >
                {t === "all" ? "All" : t}
              </button>
            ))}
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as FruitCategory | "all")}
            aria-label="Filter by category"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", outline: "none", cursor: "pointer" }}
          >
            <option value="all">All Categories</option>
            <option value="Fruit">Fruits</option>
            <option value="Gamepass">Gamepasses</option>
            <option value="Limited">Limiteds</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
            aria-label="Sort by"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", outline: "none", cursor: "pointer" }}
          >
            <option value="value">Sort: Value ↓</option>
            <option value="demand">Sort: Demand ↓</option>
            <option value="tier">Sort: Tier</option>
            <option value="name">Sort: Name A–Z</option>
          </select>

          {/* View mode */}
          <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {(["regular", "permanent"] as const).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{ padding: "8px 14px", background: viewMode === m ? "rgba(0,245,255,0.15)" : "transparent", color: viewMode === m ? "var(--cyan)" : "var(--text-muted)", border: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", letterSpacing: "0.04em" }}
              >
                {m === "regular" ? "Regular" : "Permanent"}
              </button>
            ))}
          </div>

          {/* Grid/Table toggle */}
          <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {(["grid", "table"] as const).map(v => (
              <button
                key={v}
                onClick={() => setViewStyle(v)}
                aria-label={`Switch to ${v} view`}
                style={{ padding: "8px 14px", background: viewStyle === v ? "rgba(0,245,255,0.15)" : "transparent", color: viewStyle === v ? "var(--cyan)" : "var(--text-muted)", border: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", cursor: "pointer" }}
              >
                {v === "grid" ? "⊞ Grid" : "☰ Table"}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID VIEW ─────────────────────────────────────────────────── */}
        {viewStyle === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
            {filtered.map(fruit => {
              const ts = TIER_STYLES[fruit.tier];
              const displayVal = viewMode === "permanent" ? fruit.permanentValue : fruit.value;
              return (
                <Link key={fruit.id} href={`/values/fruits/${fruit.id}`} style={{ textDecoration: "none", display: "block" }}>
                <article
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", position: "relative", overflow: "hidden", transition: "all 0.25s", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {/* Tier accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${ts.color},transparent)`, opacity: 0.5 }} />

                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "2rem" }}>{fruit.emoji}</span>
                      <div>
                        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{fruit.name}</div>
                        <div style={{ fontSize: "0.72rem", color: RARITY_COLORS[fruit.rarity], fontWeight: 600 }}>{fruit.rarity}</div>
                      </div>
                    </div>
                    <div style={{ ...ts, borderRadius: 7, padding: "4px 10px", fontSize: "0.85rem", fontWeight: 900, fontFamily: "'Orbitron',monospace", border: `1px solid ${ts.border}` }}>{fruit.tier}</div>
                  </div>

                  {/* Value */}
                  <div style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.8rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{viewMode === "permanent" ? "Perm Value" : "Trade Value"}</span>
                    <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)" }}>{viewMode === "permanent" ? `${displayVal.toLocaleString()} R$` : formatValue(displayVal)}</span>
                  </div>

                  {/* Demand */}
                  <div style={{ marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Demand</span>
                    </div>
                    <DemandBar val={fruit.demand} />
                  </div>

                  {/* Type & Trend */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.72rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "3px 10px", color: "var(--text-muted)" }}>{fruit.type}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: fruit.trend === "up" ? "var(--green)" : fruit.trend === "down" ? "var(--red)" : "var(--text-muted)" }}>
                      {fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable"}
                    </span>
                  </div>

                  {/* Check trade link */}
                  <div style={{ display: "flex", gap: 6, marginTop: "0.85rem" }}>
                    <span style={{ flex:1, textAlign: "center", fontSize: "0.73rem", color: "var(--cyan)", opacity: 0.8, letterSpacing: "0.04em", padding: "5px 0", background: "rgba(0,245,255,0.06)", borderRadius: 6, border: "1px solid rgba(0,245,255,0.15)" }}>
                      View Details →
                    </span>
                  </div>
                </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── TABLE VIEW ────────────────────────────────────────────────── */}
        {viewStyle === "table" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Rajdhani',sans-serif" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Fruit", "Tier", "Rarity", "Trade Value", "Perm Price (R$)", "Demand", "Type", "Trend"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((fruit, i) => {
                  const ts = TIER_STYLES[fruit.tier];
                  return (
                    <tr
                      key={fruit.id}
                      onClick={() => router.push(`/values/fruits/${fruit.id}`)}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.15s", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.04)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"}
                    >
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: "1.3rem" }}>{fruit.emoji}</span>
                          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{fruit.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ ...ts, fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 900, padding: "3px 9px", borderRadius: 6, border: `1px solid ${ts.border}` }}>{fruit.tier}</span>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "0.85rem", color: RARITY_COLORS[fruit.rarity], fontWeight: 600 }}>{fruit.rarity}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", color: "var(--cyan)", fontWeight: 700 }}>{formatValue(fruit.value)}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.88rem", color: "var(--gold)" }}>{fruit.permanentValue.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", minWidth: 120 }}><DemandBar val={fruit.demand} /></td>
                      <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "var(--text-muted)" }}>{fruit.type}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.82rem", fontWeight: 600, color: fruit.trend === "up" ? "var(--green)" : fruit.trend === "down" ? "var(--red)" : "var(--text-muted)" }}>
                        {fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable"}
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--cyan)", fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>View →</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</div>
            <p>No fruits found. Try adjusting your filters.</p>
          </div>
        )}

        {/* ── SEO CONTENT BELOW THE LIST ────────────────────────────────── */}
        <div style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "3.5rem" }}>

          {/* How values work */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.06em", marginBottom: "1rem" }}>
              How Blox Fruits Values Are Calculated
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "0.85rem" }}>
              Every fruit on this <strong style={{ color: "var(--text)" }}>Blox Fruits value list</strong> has three data points: a <strong style={{ color: "var(--text)" }}>trade value score</strong> based on community trades, a <strong style={{ color: "var(--text)" }}>permanent Robux price</strong> from the in-game dealer, and a <strong style={{ color: "var(--text)" }}>demand rating from 1–10</strong> that reflects how actively players are seeking that fruit right now. These three numbers together give you a complete picture of every fruit's true <strong style={{ color: "var(--text)" }}>Blox Fruit trading value</strong> — not just what it is worth on paper, but how easy it is to actually move in a trade.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.85 }}>
              The <strong style={{ color: "var(--text)" }}>Blox Fruit value chart</strong> updates after every major patch. When a fruit is buffed, its demand typically rises and its <strong style={{ color: "var(--text)" }}>trade value</strong> increases within 24–72 hours. When a fruit is nerfed, the opposite happens. The rising/falling/stable trend indicators on each card show you which direction a fruit is moving right now — giving you an edge as a <strong style={{ color: "var(--text)" }}>Blox Fruit trader</strong>.
            </p>
          </div>

          {/* Top fruits section — targets fruit-specific keyword cluster */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.06em", marginBottom: "1.25rem" }}>
              Highest Value Blox Fruits in 2026
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.85rem" }}>
              {[
                { emoji: "🦊", name: "Kitsune", tier: "S", note: "Highest Blox Fruit trade value in the game. S-tier PVP and PVE.", color: "var(--gold)" },
                { emoji: "🐉", name: "Dragon", tier: "S", note: "Best grinding fruit. S-tier across all game modes.", color: "var(--gold)" },
                { emoji: "🐆", name: "Leopard", tier: "S", note: "Best PVP fruit for skilled players. High permanent value.", color: "var(--gold)" },
                { emoji: "☠️", name: "Venom", tier: "S", note: "Recently buffed to S-tier. Rising Blox Fruits trading value.", color: "var(--cyan)" },
                { emoji: "🥐", name: "Dough", tier: "A", note: "Best value A-tier fruit. Hitbox buffed in April 2026.", color: "var(--cyan)" },
                { emoji: "❄️", name: "Blizzard", tier: "A", note: "Rising fast. PVP rework pushed it into strong A-tier.", color: "var(--green)" },
              ].map(f => (
                <div key={f.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.15rem", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: "1.5rem" }}>{f.emoji}</span>
                    <div>
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{f.name}</div>
                      <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 900, color: f.color }}>{f.tier}-Tier</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>{f.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ — featured snippet targets */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.06em", marginBottom: "1.25rem" }}>
              Blox Fruits Value List FAQ
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                {
                  q: "What is the most valuable fruit in Blox Fruits 2026?",
                  a: "Kitsune is currently the most valuable fruit in Blox Fruits as of 2026. It has the highest trade value, the highest demand, and S-tier performance in both PVP and PVE. Dragon is second, followed by Leopard and Venom.",
                },
                {
                  q: "What does demand mean on the Blox Fruits value list?",
                  a: "Demand (rated 1–10) measures how actively players are seeking a specific fruit right now. A fruit with a demand of 9–10 is very easy to trade away quickly. A fruit with low demand may have a high paper value but be hard to move in actual trades — making demand just as important as raw value.",
                },
                {
                  q: "What is a permanent fruit and why is it worth more?",
                  a: "A permanent (perm) fruit means you keep it even after dying or resetting — unlike regular fruits which disappear on death. Because of this guarantee, permanent fruits command a significantly higher Robux price and Blox Fruits trade value than their regular counterparts.",
                },
                {
                  q: "How often does the Blox Fruits value list update?",
                  a: "Our Blox Fruit values update daily and are recalculated within hours of any major patch. Buffs, nerfs, and new fruit releases can all impact trade value and demand rapidly. The trend indicator (Rising/Falling/Stable) on each fruit card shows the current direction.",
                },
                {
                  q: "What is BFV in Blox Fruits?",
                  a: "BFV stands for Blox Fruits Values — it refers to the community-tracked trading value system for Blox Fruits devil fruits. BFV values are what players use to determine fair trades. Our BFV value list is one of the most accurate and up-to-date sources available.",
                },
                {
                  q: "How do I check if my Blox Fruits trade is fair?",
                  a: "Use our free Blox Fruits trade calculator to check. Add the fruits on both sides of the trade and the tool instantly tells you the total value on each side, the demand score, and whether the deal is a fair trade, a W, or an L.",
                },
                {
                  q: "What is the Blox Fruit value chart?",
                  a: "The Blox Fruit value chart — like the list above — is a ranked table or grid showing every devil fruit ordered by trade value, demand, or tier. It lets you quickly compare fruit prices and find the most valuable items to trade or acquire.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", cursor: "pointer" }}
                >
                  <summary style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
                    {faq.q}
                    <span style={{ color: "var(--cyan)", flexShrink: 0, fontSize: "0.8rem" }}>▼</span>
                  </summary>
                  <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.8, marginTop: "0.85rem", marginBottom: 0 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal links CTA */}
          <div style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.05),rgba(255,215,0,0.03))", border: "1px solid rgba(0,245,255,0.18)", borderRadius: 18, padding: "2.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                More Blox Fruits Tools
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.87rem", margin: 0, lineHeight: 1.6, maxWidth: 460 }}>
                Use our <strong style={{ color: "var(--text)" }}>Blox Fruit trade calculator</strong> to verify any deal in seconds, explore the <strong style={{ color: "var(--text)" }}>fruit wiki</strong> for detailed move and build breakdowns, or read our guides to dominate every mode.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/calculator" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "11px 24px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Trade Calculator
              </Link>
              <Link href="/wiki" style={{ background: "transparent", color: "var(--gold)", border: "1px solid rgba(255,215,0,0.35)", padding: "11px 24px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Fruit Wiki
              </Link>
              <Link href="/blog" style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "11px 24px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
