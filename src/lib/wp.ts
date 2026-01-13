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

const WP_BASE =
  (process.env.WORDPRESS_URL?.replace(/\/+$/, "") || "https://anandi14.sg-host.com") +
  "/wp-json/wp/v2";

async function wpFetch<T>(path: string, init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }) {
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

export function wpGetFeaturedImage(post: any): { url: string; alt: string; width?: number; height?: number } | null {
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
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

