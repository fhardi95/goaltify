import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — Blox Fruits AI",
  description: "Terms of Use for BloxFruitsAI.com. Read our terms and conditions for using our AI-powered Blox Fruits tools and services.",
  alternates: { canonical: "https://www.bloxfruitsai.com/terms-of-use" },
};

const TERMS = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using BloxFruitsAI.com, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service. These Terms of Use apply to all visitors, users, and others who access or use the site.",
  },
  {
    title: "Description of Service",
    content: "BloxFruitsAI.com provides AI-powered tools for Roblox Blox Fruits players, including but not limited to: a real-time tier list, trade calculator, value list, build guides, and an AI chat assistant. These tools are provided for informational and entertainment purposes only. We are an independent fan site and are not affiliated with Roblox Corporation or the Blox Fruits development team.",
  },
  {
    title: "Use License",
    content: "Permission is granted to temporarily access the materials on BloxFruitsAI.com for personal, non-commercial use only. This is the grant of a license, not a transfer of title. Under this license you may not: modify or copy the materials; use the materials for any commercial purpose or public display; remove any copyright or proprietary notations from the materials; or transfer the materials to another person.",
  },
  {
    title: "Disclaimer of Warranties",
    content: "The materials on BloxFruitsAI.com are provided on an 'as is' basis. BloxFruitsAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. BloxFruitsAI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website.",
  },
  {
    title: "Value List Accuracy",
    content: "The fruit values, demand scores, and trade evaluations provided by BloxFruitsAI.com are estimates based on community trading data and AI analysis. They are not guarantees of actual trade outcomes. Market values in Blox Fruits fluctuate constantly based on patches, player demand, and game updates. We update our data regularly but cannot guarantee real-time accuracy at all times. Always use your own judgment when trading.",
  },
  {
    title: "Limitations of Liability",
    content: "In no event shall BloxFruitsAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data, profit, or due to business interruption) arising out of the use or inability to use the materials on BloxFruitsAI.com, even if BloxFruitsAI or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
  },
  {
    title: "Third-Party Content and Links",
    content: "BloxFruitsAI.com may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any link does not imply endorsement by BloxFruitsAI of the site.",
  },
  {
    title: "Intellectual Property",
    content: "The BloxFruitsAI.com name, logo, website design, AI tools, and original written content are the intellectual property of BloxFruitsAI. All Blox Fruits game content, including fruit names, images, mechanics, and related media, are the property of Roblox Corporation and the Blox Fruits development team. We use this content under fair use for informational and fan community purposes.",
  },
  {
    title: "User Conduct",
    content: "You agree not to use BloxFruitsAI.com to: scrape or automatically collect data in bulk without permission; attempt to reverse-engineer our AI models or value algorithms; submit false or misleading information through our contact forms; engage in any activity that could damage, disable, or impair the functioning of our services; or violate any applicable local, national, or international law or regulation.",
  },
  {
    title: "Modifications to Terms",
    content: "BloxFruitsAI reserves the right to modify these terms at any time. We will indicate the date these terms were last revised at the top of this page. Your continued use of the site after any changes constitutes your acceptance of the new Terms of Use.",
  },
  {
    title: "Governing Law",
    content: "These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of the applicable territory. If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions.",
  },
];

export default function TermsOfUsePage() {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span><span style={{ color: "var(--cyan)" }}>Terms of Use</span>
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Legal</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Terms of <span style={{ color: "var(--cyan)" }}>Use</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem" }}>Last updated: April 22, 2025 · Effective: April 22, 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 5%", fontFamily: "'Inter',sans-serif" }}>
        {/* Quick nav */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>TABLE OF CONTENTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 2rem" }}>
            {TERMS.map((s, i) => (
              <a key={i} href={`#term-${i}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.83rem", display: "flex", gap: 8 }}>
                <span style={{ color: "var(--cyan)", minWidth: 20, fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(255,165,2,0.07)", border: "1px solid rgba(255,165,2,0.25)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "2.5rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ flexShrink: 0 }}>⚠️</span>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
            <strong style={{ color: "#ffa502" }}>IMPORTANT:</strong> Please read these Terms of Use carefully before using BloxFruitsAI.com. By using our service, you agree to these terms. If you do not agree, please do not use the site.
          </p>
        </div>

        {TERMS.map((term, i) => (
          <div key={i} id={`term-${i}`} style={{ marginBottom: "2.25rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)", marginBottom: "0.85rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", color: "var(--text-muted)", minWidth: 24 }}>{String(i + 1).padStart(2, "0")}</span>
              {term.title}
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.92rem" }}>{term.content}</p>
          </div>
        ))}

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", marginBottom: "0.4rem" }}>QUESTIONS ABOUT THESE TERMS?</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Contact us at legal@bloxfruitsai.com</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/contact" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Contact Us</Link>
            <Link href="/privacy-policy" style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
