import Link from "next/link";
import { getWpPosts, stripHtml, wpGetFeaturedImage } from "@/lib/wp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  let posts: Awaited<ReturnType<typeof getWpPosts>> = [];
  let error: string | null = null;

  try {
    posts = await getWpPosts({ perPage: 12, page: 1 });
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load blog posts";
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[18]" />
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Badge className="w-fit" variant="secondary">
            Blog
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Stories, guidance, and inspiration.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Helpful articles on memorial design, materials, timelines, and
            planning—written to be clear, kind, and practical.
          </p>
        </div>
      </section>

      {error ? (
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="text-sm font-medium">
              Blog temporarily unavailable
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn’t load posts from WordPress. This is usually caused by
              WordPress being offline or blocking requests.
            </p>
            <div className="mt-3 rounded-md border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
              {error}
            </div>
          </CardContent>
        </Card>
      ) : posts.length === 0 ? (
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="text-sm font-medium">No posts published yet</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Once you publish posts in WordPress, they’ll automatically appear
              here.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: confirm posts are{" "}
              <span className="font-medium">Published</span> (not Draft/Private)
              in WordPress.
            </p>
          </CardContent>
        </Card>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, index) => {
            const featured = wpGetFeaturedImage(p);
            const excerpt = stripHtml(p.excerpt?.rendered ?? "");
            return (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group-hover:border-primary/30">
                  {featured ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={featured.url}
                        alt={featured.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-80 transition-opacity group-hover:opacity-60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                          {new Date(p.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 via-accent/10 to-chart-4/10 flex items-center justify-center">
                      <div className="text-4xl opacity-20">📝</div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                          {new Date(p.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="space-y-3 pb-3">
                    <CardTitle
                      className="text-xl leading-snug line-clamp-2 transition-colors group-hover:text-primary"
                      dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                    />
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}
