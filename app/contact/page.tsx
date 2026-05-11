"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = { width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none", marginBottom: "1rem" };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span><span style={{ color: "var(--cyan)" }}>Contact</span>
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Get in Touch</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Contact <span style={{ color: "var(--cyan)" }}>Us</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7 }}>Have a bug report, feature request, or business inquiry? We read every message.</p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 5%" }}>
        {/* Contact methods */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem", marginBottom: "2.5rem" }}>
          {[
            { icon: "💬", label: "Discord", val: "discord.gg/bloxfruitsai", color: "var(--cyan)" },
            { icon: "𝕏", label: "Twitter", val: "@bloxfruitsai", color: "var(--gold)" },
            { icon: "📧", label: "Email", val: "hello@bloxfruitsai.com", color: "var(--green)" },
          ].map(c => (
            <div key={c.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: c.color }}>{c.val}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {submitted ? (
          <div style={{ background: "rgba(46,213,115,0.07)", border: "1px solid rgba(46,213,115,0.25)", borderRadius: 16, padding: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", color: "var(--green)", marginBottom: "0.75rem" }}>Message Sent!</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>Thanks for reaching out. We typically respond within 24–48 hours.</p>
          </div>
        ) : (
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.95rem", color: "var(--cyan)", marginBottom: "1.5rem", letterSpacing: "0.06em" }}>SEND A MESSAGE</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Name</label>
                  <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" style={inputStyle} />
                </div>
              </div>
              <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Subject</label>
              <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} style={{ ...inputStyle }}>
                <option value="general">General Inquiry</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="value">Value List Correction</option>
                <option value="business">Business / Partnership</option>
              </select>
              <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Message</label>
              <textarea required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us what's on your mind..." style={{ ...inputStyle, minHeight: 140, resize: "vertical", marginBottom: "1.25rem" }} />
              <button type="submit" style={{ width: "100%", background: "var(--cyan)", color: "var(--bg-deep)", border: "none", borderRadius: 8, padding: "12px", fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
