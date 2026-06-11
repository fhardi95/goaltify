import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const BASE_TOPICS = [
  // 🔥 High priority — highest search volume
  `Best Premier League players — complete ranking`,
  `How to improve at football — complete beginner guide`,
  `Best football formations — tactics explained`,
  `How to shoot with power in football — step by step`,
  `Premier League top scorers — golden boot race`,
  `How to take a free kick like a pro — technique guide`,
  `Best football training drills for beginners`,
  `How to dribble past defenders — 5 essential skills`,
  `Champions League — full guide and predictions`,
  `4-3-3 formation explained — strengths, weaknesses and how to play it`,

  // High priority — medium volume
  `How to build stamina for football — complete fitness plan`,
  `Best football boots — buyer's guide and top picks`,
  `How to read the game in football — tactical awareness guide`,
  `Premier League fixtures — key dates and biggest matches`,
  `How to score more goals — 10 proven tips for strikers`,
  `Best football diets — what pro players eat to perform`,
  `How to become a better goalkeeper — complete guide`,
  `Pressing in football explained — gegenpressing vs high press`,
  `How to improve your first touch in football — drill guide`,
  `Football warm up routine — what pros do before a match`,

  // Medium priority — evergreen
  `How to strength train for football — full programme`,
  `Best football YouTube channels — learn from the pros`,
  `How to master the stepover — tutorial for beginners`,
  `Football nutrition guide — pre-match, during, and recovery meals`,
  `How to improve passing accuracy — drills and techniques`,
  `Best football documentaries — ranked and reviewed`,
  `How to recover faster after a football match`,
  `Football set piece tactics — corners, free kicks, and throw-ins`,
  `How to nutmeg in football — when and how to do it`,
  `Best sports psychology tips for footballers`,
  `How to build a weekly football training plan`,
  `Cardio for footballers — best workouts to boost match fitness`,
  `How to defend set pieces — zonal vs man-marking explained`,
  `Counter-pressing explained — Klopp, Guardiola, and the art of the press`,
  `Football speed training drills — get faster on the pitch`,
  `How to analyse a football match — tactical breakdown guide`,
  `Best Premier League goals of the season — top 10`,
  `How to deal with injury as a footballer — recovery guide`,
  `Football mental fitness — how to stay focused under pressure`,
  `4-4-2 formation guide — is it still relevant in modern football`,
];

const ARTICLE_SYSTEM_PROMPT = `You are the AI content manager for goaltify.com — a Next.js football website targeting 1 million monthly Google visits and AdSense revenue.

SITE: goaltify.com | Pages: /, /blog, /live-scores, /academy, /tools
NICHE: Football — Premier League, Champions League, World Cup, training guides, tactics, fitness
OWNER: Based in Manchester, UK — use UK English (football not soccer, colour not color, etc.)

BLOGPOST JSON FORMAT — output ONLY this JSON, no markdown fences, no explanation:
{
  "slug": "article-slug-here",
  "title": "Article Title Here",
  "excerpt": "155 char max SEO excerpt.",
  "date": "USE_CURRENT_DATE",
  "dateISO": "USE_CURRENT_DATE_ISO",
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

CATEGORY OPTIONS:
- "Premier League" → "#3d5a99"
- "Champions League" → "#ffd700"  
- "Training Guide" → "#1db954"
- "Tactics" → "#00b4d8"
- "Fitness" → "#ff6b35"
- "News" → "#ff4757"
- "World Cup" → "#a855f7"
- "Match Report" → "#ffa502"

SEO RULES:
- Title must be under 60 characters
- Minimum 20 content sections
- Use UK English throughout
- Include internal links to goaltify.com/live-scores, /academy, /tools in paragraph text
- Output ONLY raw JSON starting with { and ending with }`;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

async function getGithubFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();
  return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

async function updateGithubFile(
  token: string, repo: string, branch: string,
  filePath: string, newContent: string, sha: string, message: string
) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(newContent).toString("base64"),
      sha,
      branch,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub update failed: ${err.message}`);
  }
}

async function generateArticle(
  apiKey: string, topic: string, monthYear: string
): Promise<Record<string, unknown> | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: ARTICLE_SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `Write a complete SEO-optimised article for goaltify.com about: ${topic}. Today's date is ${monthYear}. Use this EXACT date in the "date" field and calculate the correct "dateISO" format (YYYY-MM-DD). Output ONLY raw JSON starting with { and ending with }.`,
      }],
    }),
  });

  const data = await res.json();
  const text = data.content
    ?.filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n") ?? "";

  const stripped = text
    .replace(/^```json\s*/m, "")
    .replace(/^```\s*/m, "")
    .replace(/```\s*$/m, "")
    .trim();
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    return JSON.parse(stripped.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function publishArticle(
  token: string, repo: string, branch: string, post: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { content: blogData, sha: blogDataSha } = await getGithubFile(
      token, repo, branch, "app/_data/blog-data.ts"
    );

    if (blogData.includes(`slug: "${post.slug}"`)) {
      return { success: false, error: `Slug "${post.slug}" already exists` };
    }

    const serialised = JSON.stringify(post, null, 2).replace(/"/g, '"');
    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";

    if (!blogData.includes(insertMarker)) {
      return { success: false, error: "Could not find BLOG_POSTS array" };
    }

    const updatedBlogData = blogData.replace(
      insertMarker + "\n",
      `${insertMarker}\n  ${serialised},\n`
    );

    await updateGithubFile(
      token, repo, branch,
      "app/_data/blog-data.ts",
      updatedBlogData,
      blogDataSha,
      `feat: add "${post.title}" [Daily Agent]`
    );

    // Update BlogClient.tsx
    try {
      const { content: clientContent, sha: clientSha } = await getGithubFile(
        token, repo, branch, "app/blog/BlogClient.tsx"
      );
      const clientInsertMarker = "const POSTS = [\n";

      if (clientContent.includes(clientInsertMarker)) {
        const categoryColor = (post.categoryColor as string) || "#1db954";
        const clientEntry = `  {
    slug: "${post.slug}",
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    date: "${post.date}",
    category: "${post.category}",
    categoryColor: "${categoryColor}",
    categoryBg: "${hexToRgba(categoryColor, 0.08)}",
    categoryBorder: "${hexToRgba(categoryColor, 0.25)}",
    readTime: "${post.readTime}",
    icon: "${post.icon}",
    featured: ${post.featured ? "true" : "false"},
  },\n`;

        const updatedClient = clientContent.replace(clientInsertMarker, clientInsertMarker + clientEntry);
        await updateGithubFile(
          token, repo, branch,
          "app/blog/BlogClient.tsx",
          updatedClient,
          clientSha,
          `feat: update blog list with "${post.slug}" [Daily Agent]`
        );
      }
    } catch { /* non-fatal */ }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function POST(req: NextRequest) {
  // Auth check
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!apiKey || !token || !repo) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

  const now = new Date();
  const year = now.getFullYear();
  const monthYear = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
  const AUTO_TOPICS = BASE_TOPICS.map((t) => `${t} ${year}`);

  const topic = AUTO_TOPICS[Math.floor(Math.random() * AUTO_TOPICS.length)];
  const results: { topic: string; slug?: string; success: boolean; error?: string }[] = [];

  try {
    const post = await generateArticle(apiKey, topic, monthYear);
    if (!post) {
      results.push({ topic, success: false, error: "Failed to generate article" });
    } else {
      const publishResult = await publishArticle(token, repo, branch, post);
      results.push({ topic, slug: post.slug as string, ...publishResult });
    }
  } catch (err) {
    results.push({ topic, success: false, error: err instanceof Error ? err.message : "Unknown error" });
  }

  // Trigger Vercel deploy
  let deployTriggered = false;
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook && results.some((r) => r.success)) {
    try {
      const deployRes = await fetch(deployHook, { method: "POST" });
      deployTriggered = deployRes.ok;
    } catch { /* silent */ }
  }

  return NextResponse.json({ results, deployTriggered });
}
