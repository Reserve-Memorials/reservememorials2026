import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getWpPostBySlug,
  wpGetFeaturedImage,
  stripHtml,
  rewriteWpInternalLinks,
} from "@/lib/wp";

export const dynamic = "force-dynamic";

function estimateReadingTime(html: string): number {
  const text = stripHtml(html);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getWpPostBySlug(slug);
  } catch (error) {
    // If WordPress API fails, show 404
    console.error(`Failed to fetch blog post "${slug}":`, error);
    notFound();
  }

  if (!post) notFound();

  const featured = wpGetFeaturedImage(post);
  const readingTime = estimateReadingTime(post.content.rendered);
  const html = rewriteWpInternalLinks(post.content.rendered);

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          href="/blog"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
        <Badge variant="secondary">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          {readingTime} min read
        </Badge>
      </div>

      <header className="space-y-6">
        <div className="space-y-4">
          <h1
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </header>

      {featured ? (
        <Card className="overflow-hidden shadow-lg">
          <div className="relative aspect-[21/9] bg-muted">
            <Image
              src={featured.url}
              alt={featured.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        </Card>
      ) : null}

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-8 sm:p-12">
          <article
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </div>
    </div>
  );
}
