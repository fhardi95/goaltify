import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

async function getFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

async function updateFile(
  token: string,
  repo: string,
  branch: string,
  filePath: string,
  newContent: string,
  sha: string,
  message: string
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
  return res.json();
}

// GET — return article count
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ count: 0 });
  }

  try {
    const { content } = await getFile(token, repo, branch, "app/_data/blog-data.ts");
    const matches = content.match(/slug:/g);
    return NextResponse.json({ count: matches ? matches.length : 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

// POST — publish article to GitHub
export async function POST(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN or GITHUB_REPO not set in environment variables." },
      { status: 500 }
    );
  }

  try {
    const { post } = await req.json();

    if (!post?.slug || !post?.title || !post?.content) {
      return NextResponse.json(
        { error: "Invalid post — slug, title, and content are required." },
        { status: 400 }
      );
    }

    // ── Read blog-data.ts ────────────────────────────────────────────────────
    const { content: blogData, sha: blogDataSha } = await getFile(
      token, repo, branch, "app/_data/blog-data.ts"
    );

    // Check for duplicate slug
    if (blogData.includes(`slug: "${post.slug}"`)) {
      return NextResponse.json(
        { error: `Slug "${post.slug}" already exists in blog-data.ts` },
        { status: 409 }
      );
    }

    const serialised = JSON.stringify(post, null, 2).replace(/"/g, '"');
    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";

    if (!blogData.includes(insertMarker)) {
      return NextResponse.json(
        { error: "Could not find BLOG_POSTS array in blog-data.ts" },
        { status: 500 }
      );
    }

    const updatedBlogData = blogData.replace(
      insertMarker + "\n",
      `${insertMarker}\n  ${serialised},\n`
    );

    await updateFile(
      token, repo, branch,
      "app/_data/blog-data.ts",
      updatedBlogData,
      blogDataSha,
      `feat: add "${post.title}" [Goaltify Agent]`
    );

    // ── Update BlogClient.tsx ────────────────────────────────────────────────
    try {
      const { content: clientContent, sha: clientSha } = await getFile(
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
        await updateFile(
          token, repo, branch,
          "app/blog/BlogClient.tsx",
          updatedClient,
          clientSha,
          `feat: update blog list with "${post.slug}" [Goaltify Agent]`
        );
      }
    } catch {
      // BlogClient update is non-fatal — blog-data.ts is the source of truth
      console.warn("Could not update BlogClient.tsx — continuing");
    }

    // ── Trigger Vercel deploy ────────────────────────────────────────────────
    let deployTriggered = false;
    const deployHook = process.env.VERCEL_DEPLOY_HOOK;
    if (deployHook) {
      try {
        const deployRes = await fetch(deployHook, { method: "POST" });
        deployTriggered = deployRes.ok;
      } catch { /* silent */ }
    }

    return NextResponse.json({
      success: true,
      slug: post.slug,
      deployTriggered,
    });
  } catch (err) {
    console.error("Publish error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
