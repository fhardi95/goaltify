"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STATS = [
  { target: 100, suffix: "K+", label: "Players" },
  { target: 28, suffix: "+", label: "Fruits Tracked" },
  { target: 99, suffix: "%", label: "Accuracy" },
  { target: 4.9, suffix: "", label: "Rating", decimal: true },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    // particle canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    }

    function init() {
      particles = [];
      const count = Math.min(120, Math.floor(canvas!.width / 14));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width, y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.4,
          opacity: Math.random() * 0.45 + 0.1,
          color: Math.random() > 0.6 ? "#00f5ff" : Math.random() > 0.5 ? "#ffd700" : "#ffffff",
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  // Counter animation
  useEffect(() => {
    const timers = STATS.map((s, i) => {
      const duration = 1600;
      const start = performance.now();
      return requestAnimationFrame(function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCounts(prev => {
          const next = [...prev];
          next[i] = s.target * eased;
          return next;
        });
        if (p < 1) requestAnimationFrame(tick);
      });
    });
    return () => timers.forEach(cancelAnimationFrame);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 5% 80px", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.38 }} />

      {/* Orbs */}
      <div style={{ position: "absolute", width: 420, height: 420, background: "var(--cyan)", borderRadius: "50%", filter: "blur(80px)", opacity: 0.07, top: "5%", left: "-120px", animation: "float1 8s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "absolute", width: 300, height: 300, background: "var(--gold)", borderRadius: "50%", filter: "blur(60px)", opacity: 0.07, top: "30%", right: "-80px", animation: "float2 10s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "absolute", width: 220, height: 220, background: "#7c3aed", borderRadius: "50%", filter: "blur(60px)", opacity: 0.08, bottom: "10%", left: "20%", animation: "float1 12s ease-in-out infinite reverse", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, width: "100%" }}>
        <div style={{ animation: "fadeUp 0.6s ease both" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 50, padding: "6px 16px", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            <span style={{ width: 6, height: 6, background: "var(--cyan)", borderRadius: "50%", animation: "pulseDot 2s infinite" }} />
            AI-Powered · Updated  2026
          </span>
        </div>

        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(2rem,6vw,4.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.4rem", animation: "fadeUp 0.6s 0.1s ease both" }}>
          <span style={{ display: "block", color: "var(--text)" }}>Blox Fruits Calculator & Value List</span>
          <span style={{ display: "block", background: "linear-gradient(90deg,var(--cyan),var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI Trade Checker</span>
        </h1>

        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: "var(--text-muted)", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.75, animation: "fadeUp 0.6s 0.2s ease both" }}>
        Use our Blox Fruits calculator to check fruit values, compare trades, and explore the latest tier list.
This AI-powered Blox Fruits trade calculator helps you find fair trades instantly using real-time values.
</p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s 0.3s ease both" }}>
          <Link href="/#ai-tool" style={{ background: "var(--cyan)", color: "var(--bg-deep)", border: "none", padding: "14px 32px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 0 30px rgba(0,245,255,0.3)", transition: "all 0.25s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(0,245,255,0.55)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,245,255,0.3)"}
          >Ask AI Now</Link>
          <Link href="/calculator" style={{ background: "transparent", color: "var(--text)", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 32px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          >Trade Calculator</Link>
          <Link href="/values" style={{ background: "transparent", color: "var(--gold)", border: "1px solid rgba(255,215,0,0.3)", padding: "14px 32px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,215,0,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >Value List</Link>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap", animation: "fadeUp 0.6s 0.4s ease both" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "2rem", fontWeight: 700, color: "var(--cyan)", display: "block" }}>
                {s.decimal ? counts[i].toFixed(1) : Math.floor(counts[i]) + s.suffix}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
