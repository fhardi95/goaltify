import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FRUITS, formatValue, type Fruit } from "../../../_data/fruits-data";

interface Props { params: Promise<{ id: string }> }

// ─── STATIC PARAMS ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return FRUITS.map(f => ({ id: f.id }));
}

// ─── KEYWORD MAP ──────────────────────────────────────────────────────────────
const FRUIT_KEYWORDS: Record<string, string[]> = {
  dragon:   ["dragon fruit blox fruits","dragon blox fruits value","dragon fruit value blox fruits 2026","blox fruits dragon price","dragon fruit trade value","best fruit blox fruits dragon"],
  leopard:  ["leopard fruit blox fruits","leopard blox fruits value","leopard fruit value 2026","blox fruits leopard price","leopard pvp blox fruits","leopard fruit trade value"],
  kitsune:  ["kitsune blox fruits","kitsune fruit value","kitsune blox fruits price 2026","blox fruits kitsune trade","kitsune worth blox fruits","kitsune mythical fruit"],
  venom:    ["venom fruit blox fruits","venom blox fruits value","venom fruit price 2026","blox fruits venom trade","venom pve blox fruits","is venom good blox fruits"],
  shadow:   ["shadow fruit blox fruits","shadow blox fruits value","shadow fruit price 2026","blox fruits shadow trade","shadow umbra blox fruits","shadow fruit worth"],
  blizzard: ["blizzard fruit blox fruits","blizzard blox fruits value","blizzard fruit price 2026","blizzard elemental blox fruits","blizzard pvp blox fruits","blizzard trade value"],
  phoenix:  ["phoenix fruit blox fruits","phoenix blox fruits value","phoenix fruit price 2026","phoenix healing blox fruits","phoenix pve blox fruits","phoenix trade value"],
  thunder:  ["thunder fruit blox fruits","thunder blox fruits value","thunder fruit price 2026","thunder pvp blox fruits","thunder blox fruits trade","best elemental blox fruits"],
  magma:    ["magma fruit blox fruits","magma blox fruits value","magma fruit price 2026","magma grinding blox fruits","magma pve blox fruits","magma trade value"],
  gravity:  ["gravity fruit blox fruits","gravity blox fruits value","gravity fruit price 2026","gravity pvp blox fruits","gravity trade value blox fruits","gravity crowd control"],
  dough:    ["dough fruit blox fruits","dough blox fruits value","dough fruit price 2026","dough pvp blox fruits","dough trade value","dough blox fruits worth"],
  buddha:   ["buddha fruit blox fruits","buddha blox fruits value","buddha fruit price 2026","buddha grinding blox fruits","buddha pve blox fruits","best grinding fruit blox fruits"],
  ice:      ["ice fruit blox fruits","ice blox fruits value","ice fruit price 2026","ice elemental blox fruits","ice trade value","ice fruit worth blox fruits"],
  dark:     ["dark fruit blox fruits","dark blox fruits value","dark fruit price 2026","dark elemental blox fruits","dark trade value","dark fruit worth"],
  spider:   ["spider fruit blox fruits","spider blox fruits value","spider fruit price 2026","spider pvp blox fruits","spider trade value","spider fruit worth"],
  love:     ["love fruit blox fruits","love blox fruits value","love fruit price 2026","love pvp blox fruits","love trade value","love fruit worth blox fruits"],
  pain:     ["pain fruit blox fruits","pain blox fruits value","pain fruit price 2026","pain pvp blox fruits","pain trade value","pain fruit worth"],
  gas:      ["gas fruit blox fruits","gas blox fruits value","gas fruit price 2026","gas elemental blox fruits","gas trade value","gas fruit worth"],
  quake:    ["quake fruit blox fruits","quake blox fruits value","quake fruit price 2026","quake trade value","quake worth blox fruits","quake shockwave"],
  smoke:    ["smoke fruit blox fruits","smoke blox fruits value","smoke fruit price 2026","smoke elemental blox fruits","smoke trade value","smoke fruit worth"],
  spring:   ["spring fruit blox fruits","spring blox fruits value","spring fruit price 2026","spring trade value","spring worth blox fruits","spring natural fruit"],
  barrier:  ["barrier fruit blox fruits","barrier blox fruits value","barrier fruit price 2026","barrier trade value","barrier worth blox fruits","barrier natural fruit"],
  chop:     ["chop fruit blox fruits","chop blox fruits value","chop fruit price 2026","chop trade value","chop worth blox fruits","chop sword immunity"],
  bomb:     ["bomb fruit blox fruits","bomb blox fruits value","bomb fruit price 2026","bomb trade value","bomb worth blox fruits","bomb natural fruit"],
  spin:     ["spin fruit blox fruits","spin blox fruits value","spin fruit price 2026","spin trade value","spin worth blox fruits","spin natural fruit"],
  rocket:   ["rocket fruit blox fruits","rocket blox fruits value","rocket fruit price 2026","rocket trade value","rocket worth blox fruits","worst fruit blox fruits"],
  gp_2x:    ["2x mastery blox fruits","mastery gamepass blox fruits","blox fruits mastery gamepass value","2x mastery gamepass price","mastery gamepass worth"],
  gp_faster:["faster boats blox fruits","faster boats gamepass value","blox fruits boat gamepass","faster boats price blox fruits","boat speed gamepass worth"],
  gp_2sword:["double swords blox fruits","2x swords gamepass blox fruits","dual swords gamepass value","blox fruits sword gamepass","2 swords blox fruits price"],
};

// ─── FRUIT LORE / USE CASE ────────────────────────────────────────────────────
const FRUIT_LORE: Record<string, { bestFor: string; comboPotential: string; howToGet: string; pros: string[]; cons: string[] }> = {
  dragon:   { bestFor: "PVP, PVE, Grinding", comboPotential: "S-tier — Dragon Talon into Death Step chains are some of the highest damage combos in the game", howToGet: "Blox Fruit Dealer (2,299 Robux permanent) or random world spawn in Sea 3", pros: ["Best all-round fruit in the game","Massive AoE clears entire rooms","Excellent flight and mobility","Top-tier PVP and PVE performance"], cons: ["Very expensive to obtain","High mastery requirement for awakening","Awakening costs many fragments"] },
  leopard:  { bestFor: "PVP, Speed Runs", comboPotential: "S-tier — Fastest fruit combos in the game. Claw dash into CDK M1s is devastating", howToGet: "Blox Fruit Dealer (2,099 Robux permanent) or random world spawn in Sea 3", pros: ["Fastest fruit in the game","Highest burst damage ceiling","Excellent for skilled PVP players","Great mobility and escape tools"], cons: ["Very high skill ceiling","Weak in PVE compared to Dragon","Expensive","Not beginner friendly"] },
  kitsune:  { bestFor: "PVP, PVE, Boss Raids", comboPotential: "S-tier — Spirit Form doubles all damage. Fox Hunt tracking makes escaping nearly impossible", howToGet: "Blox Fruit Dealer (2,499 Robux permanent) — highest price in the game", pros: ["Highest trade value in the game","Excellent in both PVP and PVE","Spirit Form ultimate is game-changing","Strong tracking moves"], cons: ["Most expensive fruit","New so some combos not fully optimized","High fragment cost to awaken"] },
  venom:    { bestFor: "PVE, Boss Raids, Anti-Heal PVP", comboPotential: "A-tier — Venom pool combos and Demon form make sustained fights very winnable", howToGet: "Blox Fruit Dealer (1,999 Robux permanent) or random world spawn", pros: ["Best PVE fruit after Buddha","Counters healers in PVP with poison pools","Excellent boss damage","Demon form is very powerful"], cons: ["Slower PVP style","Pools can be walked out of by fast fruits","Requires positioning"] },
  shadow:   { bestFor: "PVP, Combo Play", comboPotential: "S-tier — Umbra mode with Death Step creates some of the most stylish and damaging combos", howToGet: "Blox Fruit Dealer (1,799 Robux permanent) or random world spawn in Sea 3", pros: ["Umbra mode completely changes the kit","Excellent combo potential","Great area denial","High skill ceiling rewards"], cons: ["Complex kit to master","Umbra meter requires management","Weaker without awakening"] },
  blizzard: { bestFor: "PVP, PVE, Grinding", comboPotential: "A-tier — Freeze chains into Z move are reliable combo starters against most opponents", howToGet: "Blox Fruit Dealer (1,499 Robux permanent) or random world spawn", pros: ["Best Elemental fruit overall","Freeze utility is very strong","Good AoE for grinding","Solid in both modes"], cons: ["Freeze duration was nerfed","Less mobile than Beast fruits","Elemental immunity doesn't help in PVP"] },
  phoenix:  { bestFor: "PVE, Healing, Boss Raids", comboPotential: "B-tier — Phoenix is not a combo fruit. Its value is passive regen and sustain, not burst damage", howToGet: "Blox Fruit Dealer (1,399 Robux permanent) or random world spawn", pros: ["Passive HP regeneration is exceptional","Best sustain fruit in the game","Great for boss farming","Full Beast awakening flight"], cons: ["Low PVP damage output","Not competitive in meta PVP","Expensive for a support fruit"] },
  thunder:  { bestFor: "PVP, Mobility", comboPotential: "A-tier — Lightning speed combined with stun moves creates reliable combo openings", howToGet: "Blox Fruit Dealer (1,299 Robux permanent) or random world spawn", pros: ["Very fast movement speed","Good stun utility for combos","Reliable in PVP at all levels","Decent PVE performance"], cons: ["Not top-tier in either mode","Outclassed by Dragon for PVP","Elemental type limits some interactions"] },
  magma:    { bestFor: "Grinding, PVE, Beli Farming", comboPotential: "B-tier — Magma floor is passive AoE but the active moves are slow for PVP combos", howToGet: "Blox Fruit Dealer (1,099 Robux permanent) or random world spawn", pros: ["Best grinding fruit after Buddha","Magma floor is passive continuous damage","Great for Sea Beast farming","Excellent Beli farming tool"], cons: ["Slow move animations","Poor PVP performance","Predictable and easy to dodge"] },
  gravity:  { bestFor: "PVP, Team Fights, Crowd Control", comboPotential: "A-tier — Float mechanic and multi-target pull creates massive team fight control", howToGet: "Blox Fruit Dealer (999 Robux permanent) or random world spawn", pros: ["Best crowd control fruit","Float mechanic is very unique","Excellent in team PVP","Strong combo setups with pulls"], cons: ["Nerfed in recent patches","Slower pace than top PVP fruits","Requires team synergy to shine"] },
  dough:    { bestFor: "PVP, Consistent Meta Play", comboPotential: "A-tier — After the April 2026 buff, Dough Z into X is one of the most consistent combo starters", howToGet: "Blox Fruit Dealer (1,449 Robux permanent) or random world spawn", pros: ["Very consistent PVP kit","Good damage scaling","High demand makes it easy to trade","Reliable combo sequences"], cons: ["Outclassed by Dragon at top level","Requires awakening to compete","Slower than Leopard"] },
  buddha:   { bestFor: "Grinding, PVE, Mastery Farming", comboPotential: "D-tier PVP — Buddha is not meant for PVP. Its massive hitbox and defense make it S-tier for grinding", howToGet: "Blox Fruit Dealer (850 Robux permanent) or random world spawn", pros: ["Best grinding fruit in the game","Massive hitbox hits everything nearby","High defense reduces grinding damage","Excellent for mastery grinding"], cons: ["Very weak in PVP","Lacks mobility","Not competitive outside PVE"] },
  ice:      { bestFor: "Beginners, PVE, Early Game", comboPotential: "B-tier — Freeze is useful but the 2026 nerf to PVP duration makes it less reliable for combo extensions", howToGet: "Blox Fruit Dealer (699 Robux permanent) or random world spawn", pros: ["Good beginner fruit","Freeze utility is solid","Affordable price","Elemental immunity useful in PVE"], cons: ["PVP freeze duration nerfed in 2026","Outclassed quickly","Limited mobility"] },
  dark:     { bestFor: "Early Game, PVE", comboPotential: "C-tier — Black hole has some crowd control but the overall kit is outdated and slow", howToGet: "Blox Fruit Dealer (599 Robux permanent) or random world spawn", pros: ["Black hole crowd control is unique","Affordable","Elemental immunity in PVE","Decent early game option"], cons: ["Heavily outclassed by modern fruits","Slow move animations","Low trade value","Not recommended for late game"] },
  spider:   { bestFor: "PVP, Area Denial", comboPotential: "B-tier — Web traps used correctly create effective area denial and combo opportunities for skilled players", howToGet: "Blox Fruit Dealer (749 Robux permanent) or random world spawn", pros: ["Unique web trapping mechanic","Area denial is effective when used well","Surprisingly strong in the right hands","Rising trend in trade value"], cons: ["High skill requirement","Not beginner friendly","Struggles against mobile fruits"] },
  love:     { bestFor: "Niche PVP, Support", comboPotential: "C-tier — Charm ability is situationally useful but inconsistent in competitive PVP", howToGet: "Blox Fruit Dealer (549 Robux permanent) or random world spawn", pros: ["Unique charm mechanic","Can turn fights situationally","Interesting playstyle","Affordable"], cons: ["Very niche kit","Low demand","Inconsistent in PVP","Not recommended for grinding"] },
  pain:     { bestFor: "PVP, Counter Play", comboPotential: "B-tier — Damage reflection is a unique defensive mechanic that punishes aggressive opponents", howToGet: "Blox Fruit Dealer (799 Robux permanent) or random world spawn", pros: ["Unique damage reflection mechanic","Strong utility kit","Underrated by most players","Rising trend"], cons: ["Complex kit to use effectively","Reflection has a cooldown","Not top-tier in raw damage"] },
  gas:      { bestFor: "Team PVP, Area Denial", comboPotential: "B-tier — Gas zones applied correctly force opponents into unfavorable positions in confined spaces", howToGet: "Blox Fruit Dealer (749 Robux permanent) or random world spawn", pros: ["Strong area denial kit","Effective in team PVP","Gas zones stack damage over time","Rising value trend"], cons: ["Weak in open area PVP","Less effective against mobile opponents","Situational performance"] },
  quake:    { bestFor: "Casual PVP, Early Game", comboPotential: "C-tier — Shockwave attacks cover area but are slow and predictable against any experienced player", howToGet: "Blox Fruit Dealer (349 Robux permanent) or random world spawn", pros: ["Good AoE coverage","Affordable price point","Decent for casual play","Natural type has some utility"], cons: ["Very slow move animations","Easy to dodge","Weak in competitive PVP","Should be replaced at mid game"] },
  smoke:    { bestFor: "Early Game Only", comboPotential: "D-tier — No meaningful combo potential. Smoke should be replaced immediately upon reaching Sea 2", howToGet: "Blox Fruit Dealer (199 Robux permanent) or random world spawn — very common", pros: ["Very cheap to obtain","Elemental immunity useful early","Decent starter fruit"], cons: ["Completely outclassed at any level","No late game viability","Should be replaced ASAP","Lowest tier viable fruit"] },
  spring:   { bestFor: "Casual Play, Learning", comboPotential: "C-tier — Bouncing mechanics are unique but unpredictable. Difficult to use consistently in actual PVP", howToGet: "Blox Fruit Dealer (279 Robux permanent) or random world spawn", pros: ["Unique bouncing mechanic","Affordable","Interesting playstyle to learn","Decent AoE"], cons: ["Kit lacks depth for competitive play","Bouncing is unpredictable","Low trade demand","Should be upgraded at mid-game"] },
  barrier:  { bestFor: "Defensive Play, Early PVE", comboPotential: "D-tier — Shields are situationally useful but the offensive kit is too passive and slow to compete", howToGet: "Blox Fruit Dealer (229 Robux permanent) or random world spawn", pros: ["Shield mechanic is unique","Provides some defensive utility","Affordable","Natural type"], cons: ["Offensive kit is too weak","Falling trade value","Not competitive in any meta","Should be replaced quickly"] },
  chop:     { bestFor: "Sword Builds Only (Sword Immunity)", comboPotential: "F-tier — Chop has no offensive combo potential whatsoever. Its only use is the sword immunity passive", howToGet: "Blox Fruit Dealer (50 Robux permanent) or random world spawn — extremely common", pros: ["Sword immunity is useful vs sword mains","Very cheap","Easy to get"], cons: ["Worst offensive kit in the game","No competitive use","Replace immediately","No grinding utility"] },
  bomb:     { bestFor: "Nothing — Immediately Replace", comboPotential: "F-tier — No viable combo potential. Explosions deal poor damage with bad hitboxes", howToGet: "Blox Fruit Dealer (30 Robux permanent) or random world spawn — very common", pros: ["Very cheap","Easy to find"], cons: ["Mediocre damage at all stages","No competitive use","Completely outclassed","No reason to use past level 50"] },
  spin:     { bestFor: "Nothing — Immediately Replace", comboPotential: "F-tier — Spin has no combo potential and no use case past the very earliest levels of the game", howToGet: "Blox Fruit Dealer (25 Robux permanent) or random world spawn — extremely common", pros: ["Extremely cheap","Easy to find as starter"], cons: ["No competitive viability","Worst tier fruit","No grinding utility","Replace on day one"] },
  rocket:   { bestFor: "Nothing — Worst Fruit in Game", comboPotential: "F-tier — Rocket has no PVP combo potential and no grinding utility. It is widely considered the worst fruit", howToGet: "Blox Fruit Dealer (20 Robux permanent) or random world spawn — the most common fruit", pros: ["Cheapest fruit available"], cons: ["Widely considered the worst fruit","No competitive use whatsoever","No reason to keep it","Replace immediately with any other fruit"] },
  gp_2x:    { bestFor: "Mastery Grinding, Efficiency", comboPotential: "N/A — Gamepass item, not used in combat", howToGet: "Robux shop (499 Robux) — permanent gamepass, buy once and keep forever", pros: ["Doubles all mastery gain permanently","Huge time saver for all moves","Worth it for active players","Applies to sword, fighting style, and fruit mastery"], cons: ["Robux cost upfront","Less valuable if you don't grind often","Not tradeable in-game"] },
  gp_faster:{ bestFor: "Sea Travel, Quest Speed", comboPotential: "N/A — Gamepass item, not used in combat", howToGet: "Robux shop (199 Robux) — permanent gamepass", pros: ["Faster sea travel saves significant time","Good quality of life upgrade","Cheap gamepass price","Permanent benefit"], cons: ["Less useful in Sea 3 where teleports exist","Situational value late game","Not tradeable in-game"] },
  gp_2sword:{ bestFor: "Dual Sword Builds, PVP Style", comboPotential: "B-tier — Dual sword M1s with CDK create unique combo opportunities not possible with single sword", howToGet: "Robux shop (249 Robux) — permanent gamepass", pros: ["Unique dual wield mechanic","Opens new build possibilities","Good for specific PVP styles","Fun and stylish playstyle"], cons: ["Requires two good swords","More complex to use effectively","Not tradeable in-game","Meta swords still outperform"] },
};

// ─── METADATA ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const fruit = FRUITS.find(f => f.id === id);
  if (!fruit) return { title: "Fruit Not Found" };

  const isGamepass = fruit.category === "Gamepass";
  const keywords = FRUIT_KEYWORDS[id] || [`${fruit.name} blox fruits`, `${fruit.name} value`, `${fruit.name} blox fruits price`];

  // Max 55 chars / ~580px
  const seoTitle = isGamepass
    ? `${fruit.name} Gamepass Value — Blox Fruits 2026`
    : `${fruit.name} Fruit Value — Blox Fruits 2026`;

  // Max 155 chars / ~1000px
  const seoDesc = isGamepass
    ? `${fruit.name} gamepass value in Blox Fruits 2026. Current price ${fruit.permanentValue.toLocaleString()} Robux, demand ${fruit.demand}/10. Is it worth buying? Full breakdown.`
    : `${fruit.name} fruit value in Blox Fruits 2026. Trade value ${formatValue(fruit.value)}, permanent price ${fruit.permanentValue.toLocaleString()} Robux, demand ${fruit.demand}/10. Is it worth it?`;

  return {
    title: `${seoTitle} | BloxFruitsAI.com`,
    description: seoDesc,
    keywords: keywords.join(", "),
    alternates: { canonical: `https://www.bloxfruitsai.com/values/fruits/${id}` },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://www.bloxfruitsai.com/values/fruits/${id}`,
      type: "website",
      siteName: "Blox Fruits AI",
      images: [
        {
          url: `https://www.bloxfruitsai.com/og/fruits/${id}.png`,
          width: 1200,
          height: 630,
          alt: `${fruit.name} ${isGamepass ? "Gamepass" : "Fruit"} Value — Blox Fruits 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [`https://www.bloxfruitsai.com/og/fruits/${id}.png`],
    },
  };
}

// ─── TIER STYLES ─────────────────────────────────────────────────────────────
const TIER_STYLES: Record<string, { bg: string; color: string; border: string; label: string }> = {
  S: { bg: "rgba(255,215,0,0.12)", color: "#ffd700", border: "rgba(255,215,0,0.4)", label: "God Tier" },
  A: { bg: "rgba(0,245,255,0.1)",  color: "#00f5ff", border: "rgba(0,245,255,0.3)", label: "Top Tier" },
  B: { bg: "rgba(46,213,115,0.1)", color: "#2ed573", border: "rgba(46,213,115,0.3)", label: "Solid" },
  C: { bg: "rgba(255,165,2,0.1)",  color: "#ffa502", border: "rgba(255,165,2,0.3)", label: "Average" },
  D: { bg: "rgba(255,71,87,0.08)", color: "#ff4757", border: "rgba(255,71,87,0.2)", label: "Avoid" },
};

const RARITY_COLORS: Record<string, string> = {
  Mythical: "#ff6b9d", Legendary: "#ffd700", Rare: "#00f5ff", Uncommon: "#2ed573", Common: "#7a96b8",
};

function StatBar({ val, max = 10, color }: { val: number; max?: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${(val / max) * 100}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", fontWeight: 700, color, minWidth: 28, textAlign: "right" }}>{val}/{max}</span>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function FruitPage({ params }: Props) {
  const { id } = await params;
  const fruit = FRUITS.find(f => f.id === id);
  if (!fruit) notFound();

  const lore = FRUIT_LORE[id];
  const ts = TIER_STYLES[fruit.tier];
  const keywords = FRUIT_KEYWORDS[id] || [];
  const isGamepass = fruit.category === "Gamepass";
  const seoTitle = isGamepass
    ? `${fruit.name} Gamepass Value — Blox Fruits 2026`
    : `${fruit.name} Fruit Value — Blox Fruits 2026`;
  const seoDesc = isGamepass
    ? `${fruit.name} gamepass value in Blox Fruits 2026. Current price ${fruit.permanentValue.toLocaleString()} Robux, demand ${fruit.demand}/10.`
    : `${fruit.name} fruit value in Blox Fruits 2026. Trade value ${formatValue(fruit.value)}, permanent price ${fruit.permanentValue.toLocaleString()} Robux, demand ${fruit.demand}/10.`;

  // Related fruits — same tier, excluding current
  const related = FRUITS.filter(f => f.tier === fruit.tier && f.id !== fruit.id).slice(0, 4);

  // JSON-LD
  // Robux → USD approximation: 400 Robux ≈ $5 USD (Roblox standard rate = $0.0125 per Robux)
  const robuxToUsd = (robux: number) => (robux * 0.0125).toFixed(2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${fruit.name} ${isGamepass ? "Gamepass" : "Fruit"} — Blox Fruits`,
    description: seoDesc,
    url: `https://www.bloxfruitsai.com/values/fruits/${id}`,
    image: `https://www.bloxfruitsai.com/og/fruits/${id}.png`,
    brand: { "@type": "Brand", name: "Blox Fruits" },
    offers: {
      "@type": "Offer",
      price: robuxToUsd(fruit.permanentValue),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
        deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" } },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (fruit.pvp + fruit.pve) / 2 > 0 ? ((fruit.pvp + fruit.pve) / 2).toFixed(1) : "5",
      bestRating: "10",
      ratingCount: "500",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
      { "@type": "ListItem", position: 2, name: "Value List", item: "https://www.bloxfruitsai.com/values" },
      { "@type": "ListItem", position: 3, name: `${fruit.name} Value`, item: `https://www.bloxfruitsai.com/values/fruits/${id}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${fruit.name} worth in Blox Fruits 2026?`,
        acceptedAnswer: { "@type": "Answer", text: `${fruit.name} has a trade value of ${formatValue(fruit.value)} and a permanent Robux price of ${fruit.permanentValue.toLocaleString()} Robux as of 2026. It is a ${fruit.rarity} ${fruit.tier}-tier ${isGamepass ? "gamepass" : `${fruit.type} fruit`}.` },
      },
      {
        "@type": "Question",
        name: `Is ${fruit.name} good in Blox Fruits?`,
        acceptedAnswer: { "@type": "Answer", text: `${fruit.name} is ${fruit.tier === "S" || fruit.tier === "A" ? "one of the best" : fruit.tier === "B" ? "a solid" : fruit.tier === "C" ? "an average" : "a weak"} ${isGamepass ? "gamepass" : "fruit"} in Blox Fruits. ${lore?.bestFor ? `It is best used for: ${lore.bestFor}.` : ""} ${fruit.description}` },
      },
      {
        "@type": "Question",
        name: `How do I get ${fruit.name} in Blox Fruits?`,
        acceptedAnswer: { "@type": "Answer", text: lore?.howToGet || `${fruit.name} can be obtained from the Blox Fruit Dealer for ${fruit.permanentValue.toLocaleString()} Robux (permanent) or found as a random spawn in the game world.` },
      },
      {
        "@type": "Question",
        name: `What is ${fruit.name} demand in Blox Fruits?`,
        acceptedAnswer: { "@type": "Answer", text: `${fruit.name} has a demand of ${fruit.demand}/10 in the Blox Fruits trading community. ${fruit.demand >= 8 ? "This is very high demand — it is easy to trade away quickly." : fruit.demand >= 5 ? "This is moderate demand — tradeable with some patience." : "This is low demand — you may need to trade below value to find a buyer."}` },
      },
      {
        "@type": "Question",
        name: `Is ${fruit.name} worth buying in Blox Fruits 2026?`,
        acceptedAnswer: { "@type": "Answer", text: `${fruit.name} ${fruit.tier === "S" ? "is absolutely worth buying — it is S-tier and one of the best investments in Blox Fruits." : fruit.tier === "A" ? "is worth buying if it fits your playstyle — it is a solid A-tier choice." : fruit.tier === "B" ? "is a decent buy if you are on a budget, but consider saving for an A or S tier fruit." : "is generally not recommended as a purchase — save your Robux for a higher tier fruit."}` },
      },
      ...(lore?.comboPotential ? [{
        "@type": "Question",
        name: `What is the best combo for ${fruit.name} in Blox Fruits?`,
        acceptedAnswer: { "@type": "Answer", text: lore.comboPotential },
      }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div style={{ paddingTop: 70, minHeight: "100vh" }}>

        {/* ── HEADER ── */}
        <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),transparent)", borderBottom: "1px solid rgba(0,245,255,0.13)", padding: "2.5rem 5% 2rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 350, height: 350, background: ts.color, borderRadius: "50%", filter: "blur(100px)", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "#7a96b8", flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "#7a96b8", textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href="/values" style={{ color: "#7a96b8", textDecoration: "none" }}>Value List</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href="/values" style={{ color: "#7a96b8", textDecoration: "none" }}>{fruit.category === "Gamepass" ? "Gamepasses" : "Fruits"}</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "#00f5ff" }}>{fruit.name}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "center" }} className="fruit-header-grid">
              {/* Emoji */}
              <div style={{ width: 100, height: 100, background: ts.bg, border: `2px solid ${ts.border}`, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", flexShrink: 0 }}>
                {fruit.emoji}
              </div>

              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 900, padding: "4px 12px", borderRadius: 8, background: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}>{fruit.tier}-Tier</span>
                  <span style={{ fontSize: "0.7rem", color: RARITY_COLORS[fruit.rarity], background: `${RARITY_COLORS[fruit.rarity]}15`, border: `1px solid ${RARITY_COLORS[fruit.rarity]}40`, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{fruit.rarity}</span>
                  <span style={{ fontSize: "0.7rem", color: "#7a96b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 20 }}>{fruit.type}</span>
                  <span style={{ fontSize: "0.7rem", color: "#7a96b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 20 }}>{fruit.category}</span>
                </div>
                <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.5rem", color: "#e8f4ff" }}>
                  {fruit.name} {isGamepass ? "Gamepass" : "Fruit"}
                </h1>
                <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 580 }}>
                  {fruit.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 5%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }} className="fruit-main-grid">

            {/* LEFT COLUMN */}
            <div>

              {/* Value Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Trade Value", val: formatValue(fruit.value), color: "#00f5ff", icon: "💱" },
                  { label: "Perm Price", val: `${fruit.permanentValue.toLocaleString()} R$`, color: "#ffd700", icon: "💎" },
                  { label: "Demand", val: `${fruit.demand}/10`, color: fruit.demand >= 8 ? "#2ed573" : fruit.demand >= 5 ? "#ffa502" : "#ff4757", icon: "📈" },
                  { label: "Tier", val: `${fruit.tier} — ${ts.label}`, color: ts.color, icon: "🏆" },
                  { label: "Trend", val: fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable", color: fruit.trend === "up" ? "#2ed573" : fruit.trend === "down" ? "#ff4757" : "#7a96b8", icon: "📊" },
                ].map(card => (
                  <div key={card.label} style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 14, padding: "1.1rem 1.2rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "#7a96b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{card.icon} {card.label}</div>
                    <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: card.color, lineHeight: 1.2 }}>{card.val}</div>
                  </div>
                ))}
              </div>

              {/* Performance Ratings */}
              {!isGamepass && (
                <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>PERFORMANCE RATINGS</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#7a96b8", marginBottom: 6 }}><span>⚔️ PVP</span></div>
                      <StatBar val={fruit.pvp} color={fruit.pvp >= 8 ? "#00f5ff" : fruit.pvp >= 5 ? "#ffa502" : "#ff4757"} />
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#7a96b8", marginBottom: 6 }}><span>🏹 PVE</span></div>
                      <StatBar val={fruit.pve} color={fruit.pve >= 8 ? "#2ed573" : fruit.pve >= 5 ? "#ffa502" : "#ff4757"} />
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#7a96b8", marginBottom: 6 }}><span>📈 Demand</span></div>
                      <StatBar val={fruit.demand} color={fruit.demand >= 8 ? "#ffd700" : fruit.demand >= 5 ? "#ffa502" : "#ff4757"} />
                    </div>
                  </div>
                </div>
              )}

              {/* Pros & Cons */}
              {lore && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ background: "rgba(46,213,115,0.05)", border: "1px solid rgba(46,213,115,0.2)", borderRadius: 14, padding: "1.25rem" }}>
                    <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", color: "#2ed573", letterSpacing: "0.1em", marginBottom: "1rem" }}>✅ PROS</h2>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                      {lore.pros.map((p, i) => (
                        <li key={i} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "#7a96b8", fontFamily: "'Inter',sans-serif" }}>
                          <span style={{ color: "#2ed573", flexShrink: 0 }}>+</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background: "rgba(255,71,87,0.05)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 14, padding: "1.25rem" }}>
                    <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", color: "#ff4757", letterSpacing: "0.1em", marginBottom: "1rem" }}>❌ CONS</h2>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                      {lore.cons.map((c, i) => (
                        <li key={i} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "#7a96b8", fontFamily: "'Inter',sans-serif" }}>
                          <span style={{ color: "#ff4757", flexShrink: 0 }}>−</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* SEO Paragraph */}
              <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                  ABOUT {fruit.name.toUpperCase()} IN BLOX FRUITS 2026
                </h2>
                <div style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.92rem", lineHeight: 1.85 }}>
                  <p style={{ marginBottom: "0.85rem" }}>
                    The <strong style={{ color: "#e8f4ff" }}>{fruit.name} {isGamepass ? "Gamepass" : "fruit"}</strong> is a {fruit.rarity} {fruit.tier}-tier {isGamepass ? "gamepass" : `${fruit.type}-type devil fruit`} in Roblox Blox Fruits. {fruit.description} As of 2026, it has a trade value of <strong style={{ color: "#00f5ff" }}>{formatValue(fruit.value)}</strong> and a permanent Robux price of <strong style={{ color: "#ffd700" }}>{fruit.permanentValue.toLocaleString()} Robux</strong>, placing it in the <strong style={{ color: ts.color }}>{ts.label}</strong> category on our value list.
                  </p>
                  {lore && (
                    <p style={{ marginBottom: "0.85rem" }}>
                      {fruit.name} is best used for <strong style={{ color: "#e8f4ff" }}>{lore.bestFor}</strong>. {lore.comboPotential !== "N/A — Gamepass item, not used in combat" && `In terms of combo potential, it is rated <strong>${lore.comboPotential.split("—")[0].trim()}</strong>. `}Its current demand of <strong style={{ color: "#ffd700" }}>{fruit.demand}/10</strong> makes it {fruit.demand >= 8 ? "one of the most sought-after items in the trading community" : fruit.demand >= 5 ? "a moderately easy fruit to trade away" : "a challenging item to move in trades — consider pricing below raw value"}.
                    </p>
                  )}
                  <p>
                    {lore ? `To obtain ${fruit.name}: ${lore.howToGet}.` : `${fruit.name} can be obtained from the Blox Fruit Dealer or found as a random spawn in the game world.`} Always verify trades using the <Link href="/calculator" style={{ color: "#00f5ff", textDecoration: "none", fontWeight: 600 }}>BloxFruitsAI Trade Calculator</Link> before accepting any offer involving this fruit.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "#00f5ff", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                  FREQUENTLY ASKED QUESTIONS — {fruit.name.toUpperCase()}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    {
                      q: `What is ${fruit.name} worth in Blox Fruits 2026?`,
                      a: `${fruit.name} has a trade value of ${formatValue(fruit.value)} and a permanent Robux price of ${fruit.permanentValue.toLocaleString()} Robux. It is ${fruit.rarity} rarity and ${fruit.tier}-tier on our current value list.`,
                    },
                    {
                      q: `Is ${fruit.name} good in Blox Fruits?`,
                      a: `${fruit.name} is ${fruit.tier === "S" ? "excellent — one of the best" : fruit.tier === "A" ? "very good — a top tier" : fruit.tier === "B" ? "decent — a solid mid-tier" : fruit.tier === "C" ? "average — consider upgrading when possible" : "weak — you should replace it as soon as possible"} ${isGamepass ? "gamepass" : "fruit"}. ${lore ? `Best used for: ${lore.bestFor}.` : ""}`,
                    },
                    {
                      q: `How do I get ${fruit.name} in Blox Fruits?`,
                      a: lore?.howToGet || `${fruit.name} can be purchased from the Blox Fruit Dealer for ${fruit.permanentValue.toLocaleString()} Robux or found as a random world spawn.`,
                    },
                    {
                      q: `What is ${fruit.name} demand in Blox Fruits?`,
                      a: `${fruit.name} has a demand of ${fruit.demand}/10. ${fruit.demand >= 8 ? "Very high demand — easy to trade quickly at full value." : fruit.demand >= 5 ? "Moderate demand — tradeable with some patience." : "Low demand — you may need to trade below value to find a buyer."}`,
                    },
                    ...(lore && lore.comboPotential !== "N/A — Gamepass item, not used in combat" ? [{
                      q: `What is the best build for ${fruit.name} in Blox Fruits?`,
                      a: `${fruit.name} combo potential: ${lore.comboPotential}. Check our PVP Builds guide for full build recommendations with fighting styles and swords.`,
                    }] : []),
                    {
                      q: `Is ${fruit.name} worth buying in Blox Fruits?`,
                      a: `${fruit.name} ${fruit.tier === "S" ? `is absolutely worth it — it is S-tier and ${formatValue(fruit.value)} in trade value, making it an excellent long-term investment.` : fruit.tier === "A" ? `is worth buying if it matches your playstyle. At ${fruit.permanentValue.toLocaleString()} Robux permanent, it offers solid value for money.` : fruit.tier === "B" ? `is a decent budget option, but save up for an A or S tier fruit if possible.` : `is generally not recommended. Save your Robux for a higher tier fruit.`}`,
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: i < 5 ? "1rem" : 0 }}>
                      <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#e8f4ff", marginBottom: "0.4rem" }}>{item.q}</h3>
                      <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              {keywords.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#7a96b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Related Searches</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {keywords.map(kw => (
                      <span key={kw} style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 12px", color: "#7a96b8" }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Quick Stats */}
              <div style={{ background: "#060f1e", border: `1px solid ${ts.border}`, borderRadius: 16, padding: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", color: ts.color, letterSpacing: "0.1em", marginBottom: "1.25rem" }}>QUICK STATS</h2>
                {[
                  { label: "Trade Value", val: formatValue(fruit.value) },
                  { label: "Perm (Robux)", val: `${fruit.permanentValue.toLocaleString()} R$` },
                  { label: "Demand", val: `${fruit.demand}/10` },
                  { label: "Rarity", val: fruit.rarity },
                  { label: "Type", val: fruit.type },
                  { label: "Category", val: fruit.category },
                  { label: "Trend", val: fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable" },
                  ...(!isGamepass ? [
                    { label: "PVP Rating", val: `${fruit.pvp}/10` },
                    { label: "PVE Rating", val: `${fruit.pve}/10` },
                  ] : []),
                  ...(lore ? [{ label: "Best For", val: lore.bestFor }] : []),
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.85rem" }}>
                    <span style={{ color: "#7a96b8" }}>{s.label}</span>
                    <span style={{ color: "#e8f4ff", fontWeight: 600 }}>{s.val}</span>
                  </div>
                ))}
              </div>

              {/* CTA — Calculator */}
              <Link href={`/calculator`} style={{ display: "block", background: "linear-gradient(135deg,rgba(0,245,255,0.1),rgba(0,245,255,0.05))", border: "1px solid rgba(0,245,255,0.3)", borderRadius: 14, padding: "1.25rem", textDecoration: "none", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>💱</div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 700, color: "#00f5ff", marginBottom: 4 }}>TRADE CALCULATOR</div>
                <div style={{ fontSize: "0.8rem", color: "#7a96b8", fontFamily: "'Inter',sans-serif" }}>Check if any trade with {fruit.name} is fair</div>
              </Link>

              {/* Tier context */}
              <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 14, padding: "1.25rem" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "#7a96b8", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>TIER CONTEXT</div>
                <div style={{ fontFamily: "'Rajdhani',monospace", fontSize: "1.4rem", fontWeight: 900, color: ts.color, marginBottom: 4 }}>{fruit.tier}-Tier</div>
                <div style={{ fontSize: "0.82rem", color: "#7a96b8", fontFamily: "'Inter',sans-serif", lineHeight: 1.65 }}>
                  {fruit.tier === "S" ? `${fruit.name} is one of the best fruits in the game. S-tier means it excels in almost every situation.` : fruit.tier === "A" ? `${fruit.name} is a top-tier fruit — highly recommended for both PVP and PVE.` : fruit.tier === "B" ? `${fruit.name} is a solid mid-tier fruit. Good value but consider upgrading to A/S tier eventually.` : fruit.tier === "C" ? `${fruit.name} is average. Fine for early game but replace as soon as possible.` : `${fruit.name} is bottom tier. Replace immediately with any C-tier or higher fruit.`}
                </div>
              </div>

              {/* View all values */}
              <Link href="/values" style={{ display: "block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1rem", textDecoration: "none", textAlign: "center", color: "#7a96b8", fontSize: "0.85rem", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, letterSpacing: "0.06em" }}>
                ← Back to Full Value List
              </Link>
            </div>
          </div>

          {/* Related Fruits */}
          {related.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "#00f5ff", letterSpacing: "0.15em" }}>SIMILAR {fruit.tier}-TIER FRUITS</span>
                <div style={{ flex: 1, height: 1, background: "rgba(0,245,255,0.13)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
                {related.map(r => (
                  <Link key={r.id} href={`/values/fruits/${r.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "#060f1e", border: "1px solid rgba(0,245,255,0.13)", borderRadius: 14, padding: "1.1rem", display: "flex", gap: 12, alignItems: "center", transition: "all 0.2s" }}>
                      <span style={{ fontSize: "2rem" }}>{r.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e8f4ff", fontFamily: "'Rajdhani',sans-serif" }}>{r.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#7a96b8" }}>{formatValue(r.value)} · {r.demand}/10 demand</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .fruit-main-grid{grid-template-columns:1fr!important}
          .fruit-header-grid{grid-template-columns:auto 1fr!important}
        }
        @media(max-width:500px){
          .fruit-header-grid{grid-template-columns:1fr!important;text-align:center}
        }
      `}</style>
    </>
  );
}
