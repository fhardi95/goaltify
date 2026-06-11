import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Blox Fruits AI",
  description: "BloxFruitsAI.com privacy policy. Learn how we collect, use, and protect your data.",
  alternates: { canonical: "https://www.bloxfruitsai.com/privacy-policy" },
};

const SECTIONS = [
  {
    title: "Information We Collect",
    content: [
      { sub: "Usage Data", text: "We automatically collect information your browser sends when you visit BloxFruitsAI.com. This includes your IP address, browser type and version, the pages you visit, the time and date of your visit, and the time spent on pages." },
      { sub: "Cookies", text: "We use cookies and similar tracking technologies to track activity on our site and store certain preferences. Cookies are small data files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
      { sub: "No Account Required", text: "BloxFruitsAI.com does not require you to create an account or provide personal information to use our tools. The trade calculator, value list, tier list, and AI chat are all available without registration." },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      { sub: "Site Improvement", text: "We use aggregate usage data to understand which features are most valuable to our users and to improve the overall experience of BloxFruitsAI.com." },
      { sub: "Analytics", text: "We use third-party analytics services (such as Google Analytics) to collect standard internet log information and visitor behavior data. This information is processed in a way that does not identify individuals." },
      { sub: "No Data Selling", text: "We do not sell, trade, or transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, as long as they agree to keep this information confidential." },
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      { sub: "Google Analytics", text: "We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered is used to create reports about the use of our website." },
      { sub: "External Links", text: "Our site may contain links to other websites. We have no control over the content and practices of those sites and cannot accept responsibility for their respective privacy policies." },
      { sub: "Roblox", text: "BloxFruitsAI.com is not affiliated with Roblox Corporation. Any data you provide on the Roblox platform is governed by Roblox's own privacy policy, not ours." },
    ],
  },
  {
    title: "Data Security",
    content: [
      { sub: "Security Measures", text: "We implement appropriate technical and organizational measures to protect the information we collect against unauthorized access, alteration, disclosure, or destruction." },
      { sub: "No Guarantee", text: "While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security over the internet or information storage technology." },
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      { sub: "Age Restriction", text: "BloxFruitsAI.com does not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us so we can delete it." },
      { sub: "COPPA Compliance", text: "We comply with the Children's Online Privacy Protection Act (COPPA). Since our tools require no account creation, no personal data is collected from any user, including minors." },
    ],
  },
  {
    title: "Your Rights",
    content: [
      { sub: "Access & Deletion", text: "Since we do not collect personally identifiable information without your explicit input, there is generally no personal data on our end to access or delete. For any concerns, contact us at the email below." },
      { sub: "GDPR (EU Users)", text: "If you are located in the European Union, you have the right to access, rectify, or erase any personal data we hold. You also have the right to restrict or object to processing and the right to data portability." },
      { sub: "CCPA (California Users)", text: "California residents have the right to know what personal information is collected, to delete personal information, and to opt out of the sale of personal information. We do not sell personal information." },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      { sub: "Updates", text: "We may update this Privacy Policy from time to time. We will notify users of any changes by posting the new Privacy Policy on this page with an updated revision date. Changes are effective immediately upon posting." },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span><span style={{ color: "var(--cyan)" }}>Privacy Policy</span>
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Legal</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Privacy <span style={{ color: "var(--cyan)" }}>Policy</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem" }}>Last updated: April 22, 2025 · Effective: April 22, 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 5%", fontFamily: "'Inter',sans-serif" }}>
        {/* Quick nav */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>TABLE OF CONTENTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {SECTIONS.map((s, i) => (
              <a key={i} href={`#section-${i}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.88rem", display: "flex", gap: 10 }}>
                <span style={{ color: "var(--cyan)", minWidth: 20, fontFamily: "'Orbitron',monospace", fontSize: "0.72rem" }}>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
          This Privacy Policy describes how BloxFruitsAI.com (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares information when you use our website located at <span style={{ color: "var(--cyan)" }}>www.bloxfruitsai.com</span>. By using our site, you agree to the collection and use of information in accordance with this policy.
        </p>

        {SECTIONS.map((section, i) => (
          <div key={i} id={`section-${i}`} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", marginBottom: "1.25rem", paddingBottom: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", color: "var(--text-muted)", minWidth: 24 }}>{String(i + 1).padStart(2, "0")}</span>
              {section.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {section.content.map((item, j) => (
                <div key={j}>
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.4rem" }}>{item.sub}</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.92rem" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "3rem" }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", marginBottom: "0.75rem" }}>CONTACT US ABOUT THIS POLICY</div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>If you have any questions about this Privacy Policy, please contact us:</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Contact Form</Link>
            <a href="mailto:privacy@bloxfruitsai.com" style={{ background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan)", padding: "10px 22px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>privacy@bloxfruitsai.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
