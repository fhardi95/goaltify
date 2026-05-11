export type FruitTier = 'S' | 'A' | 'B' | 'C' | 'D';
export type FruitType = 'Natural' | 'Elemental' | 'Beast';
export type FruitCategory = 'Fruit' | 'Gamepass' | 'Limited';

export interface Fruit {
  id: string;
  name: string;
  emoji: string;
  tier: FruitTier;
  type: FruitType;
  category: FruitCategory;
  value: number;
  permanentValue: number;
  demand: number; // 1-10
  price: number; // Robux approx
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical';
  trend: 'up' | 'down' | 'stable';
  pvp: number; // 1-10
  pve: number; // 1-10
  description: string;
}

export const FRUITS: Fruit[] = [
  // S TIER
  { id: 'dragon', name: 'Dragon', emoji: '🐉', tier: 'S', type: 'Beast', category: 'Fruit', value: 6500000, permanentValue: 2299, demand: 10, price: 2299, rarity: 'Mythical', trend: 'stable', pvp: 10, pve: 9, description: 'Top-tier Beast fruit with incredible mobility and massive AoE damage. King of PVP meta.' },
  { id: 'leopard', name: 'Leopard', emoji: '🐆', tier: 'S', type: 'Beast', category: 'Fruit', value: 5800000, permanentValue: 2099, demand: 10, price: 2099, rarity: 'Mythical', trend: 'up', pvp: 10, pve: 8, description: 'Fastest fruit in the game. Insane burst damage and unmatched mobility for skilled players.' },
  { id: 'venom', name: 'Venom', emoji: '☠️', tier: 'S', type: 'Natural', category: 'Fruit', value: 5200000, permanentValue: 1999, demand: 9, price: 1999, rarity: 'Mythical', trend: 'stable', pvp: 9, pve: 10, description: 'Poison pools dominate PVE. Counters healers in PVP. Exceptional boss damage output.' },
  { id: 'shadow', name: 'Shadow', emoji: '🌑', tier: 'S', type: 'Natural', category: 'Fruit', value: 4800000, permanentValue: 1799, demand: 9, price: 1799, rarity: 'Legendary', trend: 'up', pvp: 9, pve: 9, description: 'Umbra mode transforms combat style. Incredible combo potential and area denial.' },
  { id: 'kitsune', name: 'Kitsune', emoji: '🦊', tier: 'S', type: 'Beast', category: 'Fruit', value: 7200000, permanentValue: 2499, demand: 10, price: 2499, rarity: 'Mythical', trend: 'up', pvp: 9, pve: 10, description: 'Newest mythical addition. Spirit fox abilities with stunning visual effects and high damage.' },
  // A TIER
  { id: 'blizzard', name: 'Blizzard', emoji: '❄️', tier: 'A', type: 'Elemental', category: 'Fruit', value: 2800000, permanentValue: 1499, demand: 8, price: 1499, rarity: 'Legendary', trend: 'stable', pvp: 8, pve: 8, description: 'Freezing AoE and massive range. One of the best Elemental fruits for both modes.' },
  { id: 'phoenix', name: 'Phoenix', emoji: '🔥', tier: 'A', type: 'Beast', category: 'Fruit', value: 2400000, permanentValue: 1399, demand: 8, price: 1399, rarity: 'Legendary', trend: 'stable', pvp: 7, pve: 9, description: 'Passive regeneration makes this the best sustain fruit. Ideal for long fights.' },
  { id: 'thunder', name: 'Thunder', emoji: '⚡', tier: 'A', type: 'Elemental', category: 'Fruit', value: 2200000, permanentValue: 1299, demand: 8, price: 1299, rarity: 'Legendary', trend: 'up', pvp: 8, pve: 7, description: 'Lightning speed and stun combos. Excellent mobility tool in PVP situations.' },
  { id: 'magma', name: 'Magma', emoji: '🌋', tier: 'A', type: 'Elemental', category: 'Fruit', value: 1850000, permanentValue: 1099, demand: 7, price: 1099, rarity: 'Rare', trend: 'stable', pvp: 7, pve: 9, description: 'Top grinding fruit. Magma floor deals continuous damage — great for boss raids.' },
  { id: 'gravity', name: 'Gravity', emoji: '🌀', tier: 'A', type: 'Natural', category: 'Fruit', value: 1750000, permanentValue: 999, demand: 7, price: 999, rarity: 'Rare', trend: 'down', pvp: 8, pve: 7, description: 'Crowd control king. Float mechanic and multi-target pulls are excellent in team fights.' },
  { id: 'dough', name: 'Dough', emoji: '🥐', tier: 'A', type: 'Natural', category: 'Fruit', value: 2600000, permanentValue: 1449, demand: 9, price: 1449, rarity: 'Legendary', trend: 'stable', pvp: 9, pve: 7, description: 'Incredibly consistent PVP fruit. Fast combos and good damage scaling throughout.' },
  { id: 'buddha', name: 'Buddha', emoji: '🔔', tier: 'A', type: 'Beast', category: 'Fruit', value: 1500000, permanentValue: 850, demand: 8, price: 850, rarity: 'Rare', trend: 'stable', pvp: 6, pve: 10, description: 'The ultimate grinding fruit. Massive hitbox and defense make it unstoppable for PVE.' },
  // B TIER
  { id: 'ice', name: 'Ice', emoji: '🧊', tier: 'B', type: 'Elemental', category: 'Fruit', value: 950000, permanentValue: 699, demand: 6, price: 699, rarity: 'Uncommon', trend: 'stable', pvp: 6, pve: 7, description: 'Reliable Elemental fruit with good freeze utility. Solid choice for new players.' },
  { id: 'dark', name: 'Dark', emoji: '🌒', tier: 'B', type: 'Elemental', category: 'Fruit', value: 850000, permanentValue: 599, demand: 6, price: 599, rarity: 'Uncommon', trend: 'down', pvp: 6, pve: 6, description: 'Black hole moves provide some crowd control. Decent but outclassed by newer fruits.' },
  { id: 'spider', name: 'Spider', emoji: '🕷️', tier: 'B', type: 'Natural', category: 'Fruit', value: 1100000, permanentValue: 749, demand: 7, price: 749, rarity: 'Rare', trend: 'up', pvp: 7, pve: 6, description: 'Web traps and area denial make this surprisingly effective in experienced hands.' },
  { id: 'love', name: 'Love', emoji: '💘', tier: 'B', type: 'Natural', category: 'Fruit', value: 800000, permanentValue: 549, demand: 5, price: 549, rarity: 'Uncommon', trend: 'stable', pvp: 6, pve: 5, description: 'Charm abilities can turn fights. Niche but effective with the right setup.' },
  { id: 'pain', name: 'Pain', emoji: '💢', tier: 'B', type: 'Natural', category: 'Fruit', value: 1200000, permanentValue: 799, demand: 7, price: 799, rarity: 'Rare', trend: 'up', pvp: 7, pve: 7, description: 'Reflects damage and provides strong utility. Underrated by most players.' },
  { id: 'gas', name: 'Gas', emoji: '💨', tier: 'B', type: 'Elemental', category: 'Fruit', value: 1050000, permanentValue: 749, demand: 6, price: 749, rarity: 'Uncommon', trend: 'up', pvp: 7, pve: 6, description: 'Area denial and poison zones. Strong in confined spaces and team PVP.' },
  // C TIER
  { id: 'quake', name: 'Quake', emoji: '🌊', tier: 'C', type: 'Natural', category: 'Fruit', value: 480000, permanentValue: 349, demand: 4, price: 349, rarity: 'Uncommon', trend: 'stable', pvp: 5, pve: 5, description: 'Shockwave attacks cover area but are slow and predictable. Average performance.' },
  { id: 'smoke', name: 'Smoke', emoji: '💭', tier: 'C', type: 'Elemental', category: 'Fruit', value: 180000, permanentValue: 199, demand: 3, price: 199, rarity: 'Common', trend: 'down', pvp: 4, pve: 4, description: 'Early game fruit. Loses effectiveness quickly. Replace as soon as possible.' },
  { id: 'spring', name: 'Spring', emoji: '🌸', tier: 'C', type: 'Natural', category: 'Fruit', value: 350000, permanentValue: 279, demand: 4, price: 279, rarity: 'Uncommon', trend: 'stable', pvp: 5, pve: 4, description: 'Bouncing attacks are tricky but the overall kit lacks depth compared to higher tier options.' },
  { id: 'barrier', name: 'Barrier', emoji: '🛡️', tier: 'C', type: 'Natural', category: 'Fruit', value: 260000, permanentValue: 229, demand: 3, price: 229, rarity: 'Uncommon', trend: 'down', pvp: 4, pve: 5, description: 'Shields are nice but the offensive kit is too weak to compete in current meta.' },
  // D TIER
  { id: 'chop', name: 'Chop', emoji: '🔪', tier: 'D', type: 'Natural', category: 'Fruit', value: 30000, permanentValue: 50, demand: 1, price: 50, rarity: 'Common', trend: 'stable', pvp: 2, pve: 2, description: 'Sword immunity is its only redeeming quality. Very weak overall.' },
  { id: 'bomb', name: 'Bomb', emoji: '💣', tier: 'D', type: 'Natural', category: 'Fruit', value: 20000, permanentValue: 30, demand: 1, price: 30, rarity: 'Common', trend: 'stable', pvp: 2, pve: 2, description: 'Explosions deal mediocre damage. Completely outclassed by every other option.' },
  { id: 'spin', name: 'Spin', emoji: '🌀', tier: 'D', type: 'Natural', category: 'Fruit', value: 18000, permanentValue: 25, demand: 1, price: 25, rarity: 'Common', trend: 'stable', pvp: 1, pve: 2, description: 'Avoid at all costs. Only useful in the very early game as a placeholder.' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', tier: 'D', type: 'Natural', category: 'Fruit', value: 15000, permanentValue: 20, demand: 1, price: 20, rarity: 'Common', trend: 'stable', pvp: 1, pve: 1, description: 'The worst fruit in the game. No competitive use whatsoever.' },
  // GAMEPASSES
  { id: 'gp_2x', name: '2x Mastery', emoji: '⚡', tier: 'A', type: 'Natural', category: 'Gamepass', value: 800000, permanentValue: 499, demand: 7, price: 499, rarity: 'Rare', trend: 'stable', pvp: 0, pve: 0, description: 'Doubles mastery gain speed. Essential for players who want to unlock moves faster.' },
  { id: 'gp_faster', name: 'Faster Boats', emoji: '🚤', tier: 'B', type: 'Natural', category: 'Gamepass', value: 250000, permanentValue: 199, demand: 4, price: 199, rarity: 'Uncommon', trend: 'stable', pvp: 0, pve: 0, description: 'Speeds up boat travel across seas. Useful for early-game traversal and quests.' },
  { id: 'gp_2sword', name: '2x Swords', emoji: '⚔️', tier: 'B', type: 'Natural', category: 'Gamepass', value: 350000, permanentValue: 249, demand: 5, price: 249, rarity: 'Uncommon', trend: 'stable', pvp: 0, pve: 0, description: 'Equip two swords simultaneously for unique dual-wield combos.' },
];

export const TIERS = ['S', 'A', 'B', 'C', 'D'] as const;

export function formatValue(v: number): string {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
  return v.toString();
}
