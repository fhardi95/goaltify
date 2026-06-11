"use client";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TaskType =
  | "auto_publish"
  | "write_article"
  | "keywords"
  | "match_report"
  | "seo_audit"
  | "content_calendar"
  | "meta_tags"
  | "tactics_article";

type PublishStatus = "idle" | "publishing" | "success" | "error";

interface ParsedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColor: string;
  readTime: string;
  icon: string;
  author: string;
  featured: boolean;
  content: unknown[];
}

interface AgentMessage {
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  task?: TaskType;
  codeBlock?: string;
  codeLabel?: string;
  parsedPost?: ParsedPost | null;
}

interface Task {
  id: TaskType;
  label: string;
  icon: string;
  description: string;
  prompt: string;
  color: string;
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

const TASKS: Task[] = [
  {
    id: "write_article",
    label: "Write SEO Article",
    icon: "✍️",
    description: "Generate a full football article ready to publish",
    color: "#1db954",
    prompt:
      "Write a new SEO-optimised article for goaltify.com. Choose the highest-traffic football topic not yet covered on the site. Output ONLY a valid JSON object (no markdown fences, no explanation) matching the BlogPost format exactly, so it can be auto-published. Use today's date: May 25, 2026 (dateISO: 2026-05-25).",
  },
  {
    id: "keywords",
    label: "Keyword Research",
    icon: "🔍",
    description: "Find low-competition football keywords to target",
    color: "#ffd700",
    prompt:
      "Do keyword research for goaltify.com. Find 15 high-traffic, low-competition football search queries perfect for a site trying to reach 1 million monthly Google views. Focus on Premier League, World Cup, training guides, and tactics. Group by intent (Informational / Commercial) and difficulty (Easy / Medium). Format as a markdown table.",
  },
  {
    id: "match_report",
    label: "Match Report Article",
    icon: "📋",
    description: "Write a tactical match analysis article",
    color: "#00b4d8",
    prompt:
      "Write a detailed tactical match report / analysis article for goaltify.com about a recent high-profile Premier League or Champions League match. Output ONLY a valid JSON object matching the BlogPost format exactly, so it can be auto-published. Include formation breakdown, key moments, player ratings, and tactical insights.",
  },
  {
    id: "seo_audit",
    label: "SEO Audit",
    icon: "📊",
    description: "Get a prioritised SEO improvement plan",
    color: "#ff6b35",
    prompt:
      "Perform a detailed SEO audit for goaltify.com. Pages: /, /blog, /live-scores, /academy, /tools. Niche: football news, scores, training guides. Goal: 1 million monthly Google visits and AdSense revenue. Give a prioritised action list: Quick Wins (this week), Medium Term (this month), Long Term (3+ months). Be specific.",
  },
  {
    id: "content_calendar",
    label: "Content Calendar",
    icon: "📅",
    description: "Generate a 30-day football publishing schedule",
    color: "#a855f7",
    prompt:
      "Create a 30-day content calendar for goaltify.com targeting 1 million monthly views. For each article: title, target keyword, monthly search volume (estimated), competition (Easy/Medium/Hard), content type, publish date. Format as a markdown table. Prioritise articles a new site can rank for within 90 days.",
  },
  {
    id: "meta_tags",
    label: "Generate Meta Tags",
    icon: "🏷️",
    description: "Optimised title & description for every page",
    color: "#ff4757",
    prompt:
      "Generate optimised SEO meta tags for all pages on goaltify.com: home, /blog, /live-scores, /academy, /tools, and the 5 most important blog articles. Title tag max 60 chars. Meta description max 155 chars. Format as a markdown table with columns: Page, Title Tag, Meta Description, Notes.",
  },
  {
    id: "tactics_article",
    label: "Tactics Deep Dive",
    icon: "🎯",
    description: "Write an in-depth tactical analysis article",
    color: "#ffa502",
    prompt:
      "Write a detailed football tactics article for goaltify.com — pick the most searched tactical topic (formation, pressing system, set pieces, etc). Output ONLY a valid JSON object matching the BlogPost format exactly, so it can be auto-published. Cover: history, how it works, examples from top clubs, how to implement, pros/cons.",
  },
];

// ─── Auto-publish topics ──────────────────────────────────────────────────────
const now = new Date();
const MONTH_YEAR = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
const YEAR = now.getFullYear();

const AUTO_TOPICS = [
  // 🔥 High priority — highest search volume
  `Best Premier League players ${YEAR} — complete ranking`,
  `How to improve at football — complete beginner guide ${YEAR}`,
  `Best football formations ${YEAR} — tactics explained`,
  `How to shoot with power in football — step by step guide`,
  `Premier League top scorers ${YEAR} — golden boot race`,
  `How to take a free kick like a pro — technique guide`,
  `Best football training drills for beginners ${YEAR}`,
  `How to dribble past defenders — 5 essential skills`,
  `World Cup ${YEAR} — everything you need to know`,
  `Champions League ${YEAR} — full guide and predictions`,

  // High priority — medium volume
  `4-3-3 formation explained — strengths, weaknesses and how to play it`,
  `How to build stamina for football — complete fitness plan`,
  `Best football boots ${YEAR} — buyer's guide and top picks`,
  `How to read the game in football — tactical awareness guide`,
  `Premier League fixtures ${YEAR} — key dates and biggest matches`,
  `How to score more goals — 10 proven tips for strikers`,
  `Best football diets — what pro players eat to perform`,
  `How to become a better goalkeeper — complete guide ${YEAR}`,
  `Pressing in football explained — gegenpressing vs high press`,
  `How to improve your first touch in football — drill guide`,

  // Medium priority — evergreen content
  `Football warm up routine — what pros do before a match`,
  `How to strength train for football ${YEAR} — full programme`,
  `Best football YouTube channels ${YEAR} — learn from the pros`,
  `How to master the stepover — tutorial for beginners`,
  `Football nutrition guide — pre-match, during, and recovery meals`,
  `How to improve passing accuracy — drills and techniques`,
  `Best football documentaries ${YEAR} — ranked and reviewed`,
  `How to recover faster after a football match ${YEAR}`,
  `Football set piece tactics — corners, free kicks, and throw-ins`,
  `How to nutmeg in football — when and how to do it`,
  `Best football podcasts ${YEAR} — top shows for fans and players`,
  `How to build a weekly football training plan ${YEAR}`,
  `Cardio for footballers — best workouts to boost match fitness`,
  `How to defend set pieces — zonal vs man-marking explained`,
  `Best sports psychology tips for footballers ${YEAR}`,
  `How to deal with injury as a footballer — recovery guide`,
  `Counter-pressing explained — Klopp, Guardiola, and the art of the press`,
  `Football speed training drills ${YEAR} — get faster on the pitch`,
  `How to analyse a football match — tactical breakdown guide`,
  `Best Premier League goals ${YEAR} — ${MONTH_YEAR} top 10`,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tryParsePost(text: string): ParsedPost | null {
  try {
    const stripped = text
      .replace(/^```json\s*/m, "")
      .replace(/^```\s*/m, "")
      .replace(/```\s*$/m, "")
      .trim();
    const start = stripped.indexOf("{");
    const end = stripped.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    const obj = JSON.parse(stripped.slice(start, end + 1));
    if (obj.slug && obj.title && Array.isArray(obj.content)) return obj as ParsedPost;
    return null;
  } catch {
    return null;
  }
}

function extractCodeBlock(text: string): { prose: string; code: string; label: string } | null {
  const match = text.match(/```(\w*)\n([\s\S]*?)```/);
  if (!match) return null;
  return {
    label: match[1] || "code",
    code: match[2],
    prose: text.replace(/```[\s\S]*?```/, "").trim(),
  };
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const AGENT_SECRET = process.env.NEXT_PUBLIC_AGENT_SECRET || "";

const ARTICLE_SYSTEM_PROMPT = `You are the AI content manager for goaltify.com — a Next.js football website targeting 1 million monthly Google visits and AdSense revenue.

SITE: goaltify.com | Pages: /, /blog, /live-scores, /academy, /tools
NICHE: Football — Premier League, Champions League, World Cup, training guides, tactics, fitness
STACK: Next.js 15, TypeScript, Tailwind, deployed on Vercel
OWNER: Based in Manchester, UK — use UK English (football not soccer, colour not color, etc.)
BRAND COLOUR: #1a7a3f (Goaltify green)

BLOGPOST JSON FORMAT (when writing articles, output ONLY this JSON, no markdown fences):
{
  "slug": "article-slug-here",
  "title": "Article Title Here",
  "excerpt": "155 char max SEO excerpt.",
  "date": "May 25, 2026",
  "dateISO": "2026-05-25",
  "category": "Category Name",
  "categoryColor": "#1db954",
  "readTime": "X min",
  "icon": "⚽",
  "author": "Goaltify Team",
  "featured": false,
  "content": [
    { "type": "paragraph", "text": "..." },
    { "type": "heading", "text": "..." },
    { "type": "subheading", "text": "..." },
    { "type": "tip", "text": "..." },
    { "type": "warning", "text": "..." },
    { "type": "info", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "table", "headers": ["Col1","Col2"], "rows": [["r1c1","r1c2"]] },
    { "type": "tierrow", "tier": "S", "tierColor": "#ff4757", "label": "World Class", "fruits": ["Erling Haaland"] },
    { "type": "divider" }
  ]
}

CATEGORY OPTIONS (use one of these):
- "Premier League" → "#3d5a99"
- "Champions League" → "#ffd700"
- "Training Guide" → "#1db954"
- "Tactics" → "#00b4d8"
- "Fitness" → "#ff6b35"
- "News" → "#ff4757"
- "World Cup" → "#a855f7"
- "Match Report" → "#ffa502"

SEO RULES:
- Title must be under 60 characters (site appends " | Goaltify")
- Minimum 20 content sections for a comprehensive article
- Use UK English throughout

GOALS:
- Every article targets a specific keyword with high monthly search volume
- Articles should be 1,500–2,500 words (many content sections)
- Include internal links to goaltify.com/live-scores, /academy, /tools in paragraph text
- High RPM = target UK/US search audiences
- For article tasks: output ONLY the raw JSON object with NO markdown fences, NO backticks, NO explanation. Start your response with { and end with }`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentClient() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: "system",
      content:
        "⚽ Goaltify Content Agent is online.\n\nI can write full SEO football articles and publish them directly to your site — no copy-pasting needed. Pick a task or type a custom instruction.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [publishStatus, setPublishStatus] = useState<Record<number, PublishStatus>>({});
  const [publishResult, setPublishResult] = useState<Record<number, string>>({});
  const [articleCount, setArticleCount] = useState(0);
  const [autoPublishing, setAutoPublishing] = useState(false);
  const [autoProgress, setAutoProgress] = useState<{ current: number; total: number; log: string[] }>({ current: 0, total: 3, log: [] });
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, autoProgress.log]);

  // Load current article count on mount
  useEffect(() => {
    fetch("/api/publish", { headers: { "x-agent-secret": AGENT_SECRET } })
      .then((r) => r.json())
      .then((d) => { if (d.count) setArticleCount(d.count); })
      .catch(() => {});
  }, []);

  // ── Auto-publish 3 articles ───────────────────────────────────────────────

  async function autoPublish() {
    if (autoPublishing || loading) return;
    setAutoPublishing(true);
    setAutoProgress({ current: 0, total: 3, log: [] });

    const addLog = (msg: string) =>
      setAutoProgress((prev) => ({ ...prev, log: [...prev.log, msg] }));

    // Pick 3 random unique topics
    const shuffled = [...AUTO_TOPICS].sort(() => Math.random() - 0.5).slice(0, 3);

    for (let i = 0; i < 3; i++) {
      const topic = shuffled[i];
      setAutoProgress((prev) => ({ ...prev, current: i + 1 }));
      addLog(`📝 Article ${i + 1}/3: Generating "${topic.split("—")[0].trim()}"...`);

      try {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-5",
            max_tokens: 8000,
            system: ARTICLE_SYSTEM_PROMPT,
            messages: [{ role: "user", content: `Write a complete SEO-optimised article for goaltify.com about: ${topic}. Use today's date: ${MONTH_YEAR} (year: ${YEAR}). All dates in the article must use ${MONTH_YEAR}. Output ONLY raw JSON starting with { and ending with }.` }],
          }),
        });

        const data = await res.json();

        // Handle API errors
        if (!res.ok || data.error || !data.content) {
          const errMsg =
            typeof data.error === "string"
              ? data.error
              : data.error?.error?.message ?? data.error?.message ?? JSON.stringify(data.error) ?? "no content returned";
          addLog(`⚠️ Article ${i + 1} — API error: ${errMsg}`);
          continue;
        }

        const text = data.content
          ?.filter((b: { type: string }) => b.type === "text")
          .map((b: { text: string }) => b.text)
          .join("\n") ?? "";

        if (!text) {
          addLog(`⚠️ Article ${i + 1} — empty response from AI`);
          continue;
        }

        // Robust JSON extraction: strip fences, find outermost { }
        let post: Record<string, unknown> | null = null;
        try {
          const stripped = text
            .replace(/^```json\s*/m, "")
            .replace(/^```\s*/m, "")
            .replace(/```\s*$/m, "")
            .trim();

          // Find the first { and last } to extract JSON even if there's surrounding text
          const start = stripped.indexOf("{");
          const end = stripped.lastIndexOf("}");
          if (start !== -1 && end !== -1 && end > start) {
            post = JSON.parse(stripped.slice(start, end + 1));
          }
        } catch (parseErr) {
          addLog(`⚠️ Article ${i + 1} — JSON parse error: ${String(parseErr).slice(0, 80)}`);
          continue;
        }

        if (!post || !post.slug || !post.title || !Array.isArray(post.content)) {
          addLog(`⚠️ Article ${i + 1} — invalid structure (missing slug/title/content)`);
          continue;
        }
        addLog(`✅ Generated: "${post.title}" — publishing to GitHub...`);

        const pubRes = await fetch("/api/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-agent-secret": AGENT_SECRET,
          },
          body: JSON.stringify({ post }),
        });

        const pubData = await pubRes.json();

        if (!pubRes.ok) {
          addLog(`⚠️ Publish failed: ${pubData.error}`);
        } else {
          addLog(`🚀 Published! → goaltify.com/blog/${post.slug}`);
          setArticleCount((c) => c + 1);
        }
      } catch (err) {
        addLog(`❌ Error on article ${i + 1}: ${String(err)}`);
      }

      if (i < 2) {
        addLog(`⏳ Waiting 10 seconds before next article...`);
        await new Promise((r) => setTimeout(r, 10000));
      }
    }

    addLog(`🎉 Done! Vercel is deploying all 3 articles now (~2 min).`);
    setAutoPublishing(false);
  }

  // ── Send message ──────────────────────────────────────────────────────────

  async function sendMessage(userText: string, task?: TaskType) {
    if (!userText.trim() || loading) return;
    setLoading(true);

    const userMsg: AgentMessage = { role: "user", content: userText, timestamp: new Date(), task };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const newHistory = [...history, { role: "user", content: userText }];

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 8000,
          system: ARTICLE_SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      const data = await res.json();

      // Handle API errors — surface the real message instead of showing "No response."
      if (!res.ok || data.error || !data.content) {
        const errMsg =
          typeof data.error === "string"
            ? data.error
            : data.error?.error?.message ?? data.error?.message ?? JSON.stringify(data.error) ?? "Unknown API error";
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            content: `⚠️ API error: ${errMsg}`,
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
        return;
      }

      const text = data.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("\n") ?? "No response.";

      const extracted = extractCodeBlock(text);
      const parsedPost = tryParsePost(extracted?.code ?? text);

      const agentMsg: AgentMessage = {
        role: "agent",
        content: extracted ? (extracted.prose || "Here is the generated code:") : parsedPost ? `✅ Article generated: **${parsedPost.title}**\n\nReady to publish directly to your site — click **Publish Now** below.` : text,
        timestamp: new Date(),
        codeBlock: extracted?.code,
        codeLabel: extracted?.label,
        parsedPost,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setHistory([...newHistory, { role: "assistant", content: text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "⚠️ Error connecting to AI. Please check your API key and try again.", timestamp: new Date() },
      ]);
    }

    setLoading(false);
  }

  async function publishPost(msgIdx: number, post: ParsedPost) {
    setPublishStatus((prev) => ({ ...prev, [msgIdx]: "publishing" }));

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-agent-secret": AGENT_SECRET,
        },
        body: JSON.stringify({ post }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setPublishStatus((prev) => ({ ...prev, [msgIdx]: "error" }));
        setPublishResult((prev) => ({ ...prev, [msgIdx]: data.error || "Unknown error" }));
        return;
      }

      setPublishStatus((prev) => ({ ...prev, [msgIdx]: "success" }));
      setPublishResult((prev) => ({
        ...prev,
        [msgIdx]: data.deployTriggered
          ? `🚀 Published! Deploying now — live at goaltify.com/blog/${data.slug} in ~2 minutes.`
          : `✅ Saved to GitHub! Vercel will auto-deploy shortly.`,
      }));
      setArticleCount((c) => c + 1);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: data.deployTriggered
            ? `🚀 Article "${post.title}" published and deploying to goaltify.com/blog/${post.slug}`
            : `✅ Article "${post.title}" saved to GitHub.`,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setPublishStatus((prev) => ({ ...prev, [msgIdx]: "error" }));
      setPublishResult((prev) => ({ ...prev, [msgIdx]: "Network error — could not reach publish API." }));
    }
  }

  function handleTask(task: Task) {
    setActiveTask(task.id);
    sendMessage(task.prompt, task.id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function copyCode(code: string, idx: number) {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  function clearChat() {
    setMessages([
      {
        role: "system",
        content: "⚽ Goaltify Content Agent is online.\n\nChat cleared. Pick a task or type a custom instruction.",
        timestamp: new Date(),
      },
    ]);
    setHistory([]);
    setActiveTask(null);
  }

  const targetArticles = 150;
  const articlePct = Math.min(100, Math.round((articleCount / targetArticles) * 100));

  const GREEN = "#1db954";
  const GREEN_DIM = "rgba(29,185,84,0.12)";
  const GREEN_BORDER = "rgba(29,185,84,0.25)";

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", fontFamily: "'Inter',sans-serif", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(26,122,63,0.2)", background: "rgba(5,13,26,0.97)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: GREEN, boxShadow: `0 0 8px ${GREEN}`, animation: "pulseDot 2s infinite" }} />
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: GREEN, letterSpacing: "0.06em" }}>
              ⚽ CONTENT AGENT
            </h1>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>— goaltify.com</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "0.2rem" }}>
            Writes → Saves → Deploys automatically
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <div style={{ padding: "0.35rem 0.8rem", border: `1px solid ${GREEN_BORDER}`, borderRadius: 7, background: GREEN_DIM, color: GREEN, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}>
            CLAUDE SONNET 4
          </div>
          <button onClick={clearChat} style={{ padding: "0.35rem 0.8rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}>
            CLEAR
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 148px)" }}>

        {/* Sidebar */}
        <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid rgba(26,122,63,0.12)", background: "rgba(5,13,26,0.6)", overflowY: "auto", padding: "1.1rem 0.85rem" }}>

          <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", fontWeight: 700, marginBottom: "0.7rem", paddingLeft: "0.2rem" }}>QUICK TASKS</p>

          {/* ── AUTO-PUBLISH BUTTON ── */}
          <button
            onClick={autoPublish}
            disabled={autoPublishing || loading}
            style={{
              width: "100%",
              marginBottom: "0.75rem",
              padding: "0.75rem 0.8rem",
              borderRadius: 9,
              border: `1px solid ${GREEN_BORDER}`,
              background: autoPublishing ? "rgba(29,185,84,0.05)" : GREEN_DIM,
              color: GREEN,
              cursor: autoPublishing || loading ? "not-allowed" : "pointer",
              textAlign: "left",
              opacity: autoPublishing || loading ? 0.7 : 1,
              transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.2rem" }}>
              <span style={{ fontSize: "0.95rem" }}>🚀</span>
              <span style={{ fontWeight: 700, fontSize: "0.84rem", color: GREEN }}>
                {autoPublishing ? `Publishing ${autoProgress.current}/3...` : "Auto-Publish 3 Articles"}
              </span>
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(29,185,84,0.7)", lineHeight: 1.4, paddingLeft: "1.4rem" }}>
              {autoPublishing ? "Working… do not close this tab" : "Generate & publish 3 SEO articles in one click"}
            </p>
          </button>

          {/* Auto-publish progress log */}
          {autoProgress.log.length > 0 && (
            <div style={{ marginBottom: "0.75rem", padding: "0.65rem", borderRadius: 7, background: "rgba(0,0,0,0.35)", border: `1px solid ${GREEN_BORDER}`, maxHeight: 160, overflowY: "auto" }}>
              {autoProgress.log.map((line, i) => (
                <p key={i} style={{
                  fontSize: "0.63rem",
                  color: line.startsWith("❌") ? "#ff4757" : line.startsWith("⚠️") ? "#ffa502" : line.startsWith("🎉") ? "#ffd700" : GREEN,
                  lineHeight: 1.5,
                  marginBottom: "0.15rem",
                }}>{line}</p>
              ))}
            </div>
          )}

          <div style={{ height: "1px", background: "rgba(26,122,63,0.15)", marginBottom: "0.75rem" }} />

          {TASKS.map((task) => (
            <button key={task.id} onClick={() => handleTask(task)} disabled={loading || autoPublishing} style={{ width: "100%", marginBottom: "0.45rem", padding: "0.65rem 0.8rem", borderRadius: 9, border: `1px solid ${activeTask === task.id ? task.color + "44" : "rgba(255,255,255,0.07)"}`, background: activeTask === task.id ? task.color + "0f" : "rgba(5,13,26,0.8)", cursor: loading || autoPublishing ? "not-allowed" : "pointer", textAlign: "left", opacity: loading || autoPublishing ? 0.55 : 1, transition: "all 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "0.95rem" }}>{task.icon}</span>
                <span style={{ fontWeight: 700, fontSize: "0.84rem", color: activeTask === task.id ? task.color : "rgba(255,255,255,0.85)" }}>{task.label}</span>
              </div>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.4, paddingLeft: "1.4rem" }}>{task.description}</p>
            </button>
          ))}

          {/* Goal tracker */}
          <div style={{ marginTop: "1.25rem", padding: "0.9rem", borderRadius: 9, border: "1px solid rgba(29,185,84,0.15)", background: "rgba(29,185,84,0.03)" }}>
            <p style={{ fontSize: "0.65rem", color: GREEN, fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>GOAL TRACKER</p>

            <div style={{ marginBottom: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>
                <span>Articles published</span>
                <span style={{ color: GREEN }}>{articleCount} / {targetArticles}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(29,185,84,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${articlePct}%`, background: GREEN, borderRadius: 2, transition: "width 0.4s" }} />
              </div>
            </div>

            <div style={{ marginBottom: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>
                <span>Monthly views target</span>
                <span style={{ color: GREEN }}>0 / 1M</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(29,185,84,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "1%", background: "#ffd700", borderRadius: 2 }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>
                <span>AdSense revenue</span>
                <span style={{ color: GREEN }}>£0 / £1,500</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(29,185,84,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "1%", background: GREEN, borderRadius: 2 }} />
              </div>
            </div>
          </div>

          {/* Setup checklist */}
          <div style={{ marginTop: "1rem", padding: "0.9rem", borderRadius: 9, border: "1px solid rgba(255,165,2,0.15)", background: "rgba(255,165,2,0.04)" }}>
            <p style={{ fontSize: "0.65rem", color: "#ffa502", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.6rem" }}>SETUP CHECKLIST</p>
            {[
              { label: "ANTHROPIC_API_KEY set", done: true },
              { label: "AGENT_SECRET set", done: true },
              { label: "GITHUB_TOKEN set", done: true },
              { label: "GITHUB_REPO set", done: true },
              { label: "VERCEL_DEPLOY_HOOK set", done: false },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.75rem", color: item.done ? GREEN : "#ffa502" }}>{item.done ? "✅" : "⬜"}</span>
                <span style={{ fontSize: "0.68rem", color: item.done ? "rgba(255,255,255,0.4)" : "#ffa502" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {messages.map((msg, idx) => (
              <div key={idx}>

                {msg.role === "system" && (
                  <div style={{ textAlign: "center", padding: "0.85rem 1.25rem", background: "rgba(29,185,84,0.04)", border: "1px solid rgba(29,185,84,0.12)", borderRadius: 10, color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>
                )}

                {msg.role === "user" && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ maxWidth: "70%", background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, borderRadius: "14px 14px 4px 14px", padding: "0.7rem 1rem" }}>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.88rem", lineHeight: 1.6 }}>{msg.content}</p>
                      <p style={{ fontSize: "0.65rem", color: "rgba(29,185,84,0.5)", marginTop: "0.35rem", textAlign: "right" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}

                {msg.role === "agent" && (
                  <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 7, background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>⚽</div>
                    <div style={{ flex: 1, minWidth: 0 }}>

                      <div style={{ background: "rgba(10,20,35,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1.05rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.88rem", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</p>
                      </div>

                      {msg.codeBlock && !msg.parsedPost && (
                        <div style={{ marginTop: "0.65rem", borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0.9rem", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <span style={{ fontSize: "0.68rem", color: GREEN, fontWeight: 700, letterSpacing: "0.1em" }}>{(msg.codeLabel || "code").toUpperCase()}</span>
                            <button onClick={() => copyCode(msg.codeBlock!, idx)} style={{ padding: "0.25rem 0.7rem", borderRadius: 5, border: `1px solid ${GREEN_BORDER}`, background: copiedIdx === idx ? GREEN_DIM : "transparent", color: copiedIdx === idx ? GREEN : "rgba(255,255,255,0.5)", fontSize: "0.68rem", cursor: "pointer", fontWeight: 700, transition: "all 0.15s" }}>
                              {copiedIdx === idx ? "✓ COPIED" : "📋 COPY"}
                            </button>
                          </div>
                          <pre style={{ padding: "0.9rem", overflowX: "auto", fontSize: "0.75rem", lineHeight: 1.6, color: "#a8d8ff", fontFamily: "'Courier New',monospace", background: "#020810", maxHeight: 360, overflowY: "auto" }}>
                            {msg.codeBlock}
                          </pre>
                        </div>
                      )}

                      {msg.parsedPost && (
                        <div style={{ marginTop: "0.75rem", borderRadius: 10, border: `1px solid ${GREEN_BORDER}`, overflow: "hidden", background: "rgba(29,185,84,0.04)" }}>
                          <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid rgba(29,185,84,0.12)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                              <span style={{ fontSize: "1.1rem" }}>{msg.parsedPost.icon}</span>
                              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>{msg.parsedPost.title}</span>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                              {[
                                { label: msg.parsedPost.category, color: msg.parsedPost.categoryColor },
                                { label: msg.parsedPost.readTime + " read", color: "#7a96b8" },
                                { label: msg.parsedPost.content.length + " sections", color: "#7a96b8" },
                                { label: "/blog/" + msg.parsedPost.slug, color: "#ffd700" },
                              ].map((tag) => (
                                <span key={tag.label} style={{ fontSize: "0.68rem", padding: "0.2rem 0.55rem", borderRadius: 20, border: `1px solid ${tag.color}33`, color: tag.color }}>{tag.label}</span>
                              ))}
                            </div>
                          </div>

                          <div style={{ padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                            {(!publishStatus[idx] || publishStatus[idx] === "idle") && (
                              <>
                                <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ padding: "0.55rem 1.25rem", borderRadius: 8, border: `1px solid ${GREEN_BORDER}`, background: GREEN_DIM, color: GREEN, fontSize: "0.84rem", cursor: "pointer", fontWeight: 700, letterSpacing: "0.06em", transition: "all 0.15s" }}>
                                  🚀 PUBLISH NOW
                                </button>
                                <button onClick={() => copyCode(JSON.stringify(msg.parsedPost, null, 2), idx)} style={{ padding: "0.55rem 1rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "0.84rem", cursor: "pointer", fontWeight: 700, letterSpacing: "0.06em" }}>
                                  {copiedIdx === idx ? "✓ COPIED" : "📋 COPY JSON"}
                                </button>
                                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                                  Publish saves to GitHub and deploys automatically
                                </span>
                              </>
                            )}

                            {publishStatus[idx] === "publishing" && (
                              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <div style={{ display: "flex", gap: "4px" }}>
                                  {[0,1,2].map(i => (
                                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                  ))}
                                </div>
                                <span style={{ fontSize: "0.84rem", color: GREEN, fontWeight: 700 }}>PUBLISHING & DEPLOYING...</span>
                              </div>
                            )}

                            {publishStatus[idx] === "success" && (
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "0.84rem", color: GREEN, fontWeight: 700 }}>{publishResult[idx]}</p>
                                <a href={`/blog/${msg.parsedPost.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: "0.72rem", color: "#ffd700", textDecoration: "underline", marginTop: "0.25rem", display: "inline-block" }}>
                                  View article →
                                </a>
                              </div>
                            )}

                            {publishStatus[idx] === "error" && (
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "0.84rem", color: "#ff4757", fontWeight: 700 }}>⚠️ {publishResult[idx]}</p>
                                <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ fontSize: "0.72rem", color: GREEN, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginTop: "0.25rem" }}>
                                  Try again
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "0.35rem", paddingLeft: "0.2rem" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>⚽</div>
                <div style={{ background: "rgba(10,20,35,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1.05rem", display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid rgba(26,122,63,0.15)", padding: "0.9rem 1.25rem", background: "rgba(5,13,26,0.95)" }}>

            <div style={{ display: "flex", gap: "0.45rem", marginBottom: "0.65rem", flexWrap: "wrap" }}>
              {[
                "Write a Premier League tactics article and publish it",
                "Research the best football keywords for this month",
                "Write a training guide for beginners and publish it",
                "Give me a content calendar for the next 30 days",
              ].map((s) => (
                <button key={s} onClick={() => { setInput(s); textareaRef.current?.focus(); }} disabled={loading || autoPublishing} style={{ padding: "0.3rem 0.7rem", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", cursor: "pointer", transition: "all 0.15s", opacity: loading || autoPublishing ? 0.5 : 1 }}>
                  {s}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-end" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type an instruction… (Enter to send, Shift+Enter for new line)"
                disabled={loading || autoPublishing}
                rows={2}
                style={{ flex: 1, background: "rgba(10,20,35,0.9)", border: "1px solid rgba(26,122,63,0.25)", borderRadius: 9, padding: "0.65rem 0.9rem", color: "rgba(255,255,255,0.9)", fontSize: "0.88rem", resize: "none", outline: "none", lineHeight: 1.5 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || autoPublishing || !input.trim()}
                style={{ padding: "0.65rem 1.1rem", borderRadius: 9, border: `1px solid ${loading || autoPublishing || !input.trim() ? "rgba(255,255,255,0.1)" : GREEN_BORDER}`, background: loading || autoPublishing || !input.trim() ? "rgba(255,255,255,0.04)" : GREEN_DIM, color: loading || autoPublishing || !input.trim() ? "rgba(255,255,255,0.3)" : GREEN, cursor: loading || autoPublishing || !input.trim() ? "not-allowed" : "pointer", fontSize: "1.05rem", transition: "all 0.15s", flexShrink: 0 }}>
                {loading ? "⏳" : "➤"}
              </button>
            </div>

            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", marginTop: "0.45rem", textAlign: "center" }}>
              Articles are saved to <code style={{ color: GREEN, background: "rgba(29,185,84,0.07)", padding: "0 3px", borderRadius: 3 }}>GitHub</code> and deployed via Vercel automatically
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
