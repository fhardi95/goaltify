"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/values", label: "Values" },
    { href: "/calculator", label: "Calculator" },
    { href: "/guides/pvp-builds", label: "Guides" },
    { href: "/wiki", label: "Wiki" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (!base) return false;
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%", height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(2,8,16,0.97)" : "rgba(2,8,16,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,245,255,0.12)",
        transition: "background 0.3s",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, border: "2px solid var(--cyan)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: "rgba(0,245,255,0.08)" }}>🍎</div>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: "var(--cyan)", letterSpacing: "0.04em" }}>
            BLOXFRUITS<span style={{ color: "var(--gold)" }}>AI</span>
          </span>
        </Link>

        <div className="desktop-links" style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              color: isActive(l.href) ? "var(--cyan)" : "var(--text-muted)",
              textDecoration: "none", fontSize: "0.88rem", fontWeight: 500,
              letterSpacing: "0.07em", textTransform: "uppercase",
              transition: "color 0.2s",
              borderBottom: isActive(l.href) ? "1px solid var(--cyan)" : "1px solid transparent",
              paddingBottom: 2,
            }}>{l.label}</Link>
          ))}
          <Link href="/calculator" style={{
            background: "transparent", border: "1px solid var(--cyan)", color: "var(--cyan)",
            padding: "8px 20px", borderRadius: 6, fontFamily: "'Rajdhani',sans-serif",
            fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", transition: "all 0.25s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--cyan)"; (e.currentTarget as HTMLElement).style.color = "var(--bg-deep)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
          >Try Free</Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="hamburger"
          style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 4, background: "none", border: "none" }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 24, height: 2, background: "var(--cyan)", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "var(--cyan)", borderRadius: 2, transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "var(--cyan)", borderRadius: 2, transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
          background: "rgba(2,8,16,0.98)", borderBottom: "1px solid var(--border)",
          padding: "1.25rem 5%", display: "flex", flexDirection: "column", gap: "0.25rem",
        }}>
          {[...links, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(l.href) ? "var(--cyan)" : "var(--text-muted)", textDecoration: "none", fontSize: "1rem", fontWeight: 500, padding: "0.65rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.04em" }}
            >{l.label}</Link>
          ))}
          <Link href="/calculator" onClick={() => setMobileOpen(false)} style={{ marginTop: "0.75rem", display: "block", textAlign: "center", background: "var(--cyan)", color: "var(--bg-deep)", padding: "12px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            Try Free →
          </Link>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .desktop-links{display:none!important}
          .hamburger{display:flex!important}
        }
      `}</style>
    </>
  );
}
