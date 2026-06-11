"use client";
import { useState } from "react";

const FAQS = [
  { q: "What is Blox Fruits AI?", a: "Blox Fruits AI is an intelligent, AI-powered platform for Roblox Blox Fruits players. It provides real-time tier lists, personalized build recommendations, live trade calculator, devil fruit value list, and boss fight strategies — all updated automatically after every game patch." },
  { q: "What is the best fruit in Blox Fruits in 2025?", a: "As of April 2025, Dragon, Leopard, and Kitsune hold the S-tier top spots. Dragon excels in both PVP and PVE. Leopard dominates PVP with speed and burst damage. Kitsune is the newest mythical with the highest current value. Our AI tier list updates after every patch." },
  { q: "How does the Trade Calculator work?", a: "Add fruits to both sides of the trade. The calculator shows total value, total Robux price, and average demand for each side. A verdict instantly tells you if the trade is Fair, an Overpay, or an Underpay — so you never get scammed again." },
  { q: "Is Blox Fruits AI free to use?", a: "Yes! Blox Fruits AI is completely free. The tier list, trade calculator, value list, and AI chat are all available at no cost." },
  { q: "How often is the value list updated?", a: "Our value list is updated daily and recalculated within hours of any Blox Fruits patch. We analyze patch notes, community trades, and demand data to keep values accurate." },
  { q: "Does the site work on mobile?", a: "Yes! BloxFruitsAI.com is fully responsive — it works perfectly on phone, tablet, and PC browsers with no app download required." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ position: "relative", zIndex: 1, padding: "6rem 5%" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Common Questions</span>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 700 }}>Frequently Asked <span style={{ color: "var(--cyan)" }}>Questions</span></h2>
      </div>
      <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: `1px solid ${open === i ? "rgba(0,245,255,0.3)" : "var(--border)"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: "none", border: "none", color: open === i ? "var(--cyan)" : "var(--text)", fontSize: "1rem", fontWeight: 600, fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.02em", textAlign: "left", gap: "1rem" }}>
              <span>{f.q}</span>
              <span style={{ width: 24, height: 24, border: "1px solid var(--border)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", flexShrink: 0, transition: "all 0.25s", transform: open === i ? "rotate(45deg)" : "none", color: open === i ? "var(--cyan)" : "var(--text-muted)", borderColor: open === i ? "var(--cyan)" : "var(--border)", background: open === i ? "rgba(0,245,255,0.08)" : "transparent" }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.35s ease", padding: open === i ? "0 1.5rem 1.25rem" : "0 1.5rem" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
