type WPPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
};

type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

const WP_SITE =
  process.env.WORDPRESS_BLOG_CMS_URL ||
  process.env.WORDPRESS_URL ||
  "https://anandi13.sg-host.com";

const WP_BASE = `${WP_SITE.replace(/\/+$/, "")}/wp-json/wp/v2`;

function getWpSiteOrigins(): string[] {
  const origins = new Set<string>();
  const candidates = [
    process.env.WORDPRESS_BLOG_CMS_URL,
    process.env.WORDPRESS_URL,
    "https://anandi13.sg-host.com",
    "https://anandi14.sg-host.com",
  ].filter(Boolean) as string[];

  for (const c of candidates) {
    try {
      origins.add(new URL(c).origin);
    } catch {
      // ignore
    }
  }
  return Array.from(origins);
}

function mapWpPathToAppPath(pathname: string): string {
  // Keep homepage links on homepage
  if (pathname === "/" || pathname === "") return "/";

  // WP taxonomy / author pages don't have equivalents yet; point to our blog index.
  if (
    pathname.startsWith("/category/") ||
    pathname.startsWith("/tag/") ||
    pathname.startsWith("/author/")
  ) {
    return "/blog";
  }

  // If it looks like a WordPress "pretty permalink", last segment is usually the post slug.
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[segments.length - 1];
  if (!slug) return "/blog";
  return `/blog/${slug}`;
}

/**
 * WordPress content often includes absolute links back to the WordPress origin (e.g. anandi13.sg-host.com).
 * In the headless site, we want those internal links to stay on our domain and route to our Next.js blog.
 *
 * - Rewrites only <a href="..."> URLs (NOT images/src, so wp-content media keeps working).
 * - Leaves wp-content links alone (media/downloads).
 */
export function rewriteWpInternalLinks(html: string): string {
  const wpOrigins = new Set(getWpSiteOrigins());
  return html.replace(
    /(<a\b[^>]*\bhref=)(["'])(https?:\/\/[^"']+)\2/gi,
    (full, prefix: string, quote: string, href: string) => {
      try {
        const u = new URL(href);
        if (!wpOrigins.has(u.origin)) return full;
        if (u.pathname.startsWith("/wp-content/")) return full;
        if (u.pathname.startsWith("/wp-admin/")) return full;
        if (u.pathname.startsWith("/wp-json/")) return full;

        const nextPath = mapWpPathToAppPath(u.pathname);
        const rewritten = `${nextPath}${u.search}${u.hash}`;
        return `${prefix}${quote}${rewritten}${quote}`;
      } catch {
        return full;
      }
    }
  );
}

async function wpFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
) {
  const url = `${WP_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: init?.next ?? { revalidate: 300, tags: ["wp-posts"] },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WordPress fetch failed (${res.status}): ${text || url}`);
  }
  return (await res.json()) as T;
}

export async function getWpPosts(params?: { page?: number; perPage?: number }) {
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 10;
  const posts = await wpFetch<WPPost[]>(
    `/posts?status=publish&_embed=1&per_page=${perPage}&page=${page}&orderby=date&order=desc`
  );
  return posts;
}

export async function getWpPostBySlug(slug: string) {
  const posts = await wpFetch<WPPost[]>(
    `/posts?status=publish&_embed=1&slug=${encodeURIComponent(slug)}&per_page=1`
  );
  return posts[0] ?? null;
}

export function wpGetFeaturedImage(
  post: any
): { url: string; alt: string; width?: number; height?: number } | null {
  const media: WPMedia | undefined = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;
  return {
    url: media.source_url,
    alt: media.alt_text || post?.title?.rendered || "Featured image",
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
