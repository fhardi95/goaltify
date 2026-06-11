import { cookies } from "next/headers";
import AgentClient from "./AgentClient";
import { login } from "./actions";

export const metadata = { robots: "noindex" };

export default async function AgentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const authed = cookieStore.get("agent_authed")?.value === "1";
  if (authed) return <AgentClient />;

  const params = await searchParams;

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ padding: "2rem", borderRadius: 12, border: "1px solid rgba(26,122,63,0.3)", background: "rgba(5,13,26,0.95)", width: 320, textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚽</div>
        <h1 style={{ color: "#1db954", fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>AGENT ACCESS</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>goaltify.com</p>
        <form action={login}>
          <input
            type="password"
            name="pw"
            placeholder="Enter password"
            autoFocus
            style={{ width: "100%", padding: "0.65rem 0.9rem", borderRadius: 8, border: "1px solid rgba(26,122,63,0.3)", background: "rgba(0,0,0,0.4)", color: "white", fontSize: "0.9rem", marginBottom: "0.75rem", boxSizing: "border-box", outline: "none" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.65rem", borderRadius: 8, border: "1px solid rgba(26,122,63,0.5)", background: "rgba(26,122,63,0.15)", color: "#1db954", fontSize: "0.9rem", cursor: "pointer", fontWeight: 700 }}>
            ENTER
          </button>
        </form>
        {params.error && (
          <p style={{ color: "#ff4757", fontSize: "0.75rem", marginTop: "0.75rem" }}>❌ Wrong password</p>
        )}
      </div>
    </div>
  );
}
