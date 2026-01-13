import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getWpPostBySlug, wpGetFeaturedImage } from "@/lib/wp";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getWpPostBySlug(params.slug);
  if (!post) notFound();

  const featured = wpGetFeaturedImage(post);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-sm">
        <Link className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition" href="/blog">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>

      <header className="space-y-3">
        <h1
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString()}
        </div>
      </header>

      {featured ? (
        <Card className="overflow-hidden">
          <div className="relative aspect-[16/9] bg-muted">
            <Image
              src={featured.url}
              alt={featured.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>
        </Card>
      ) : null}

      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <article
            className="wp-content space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

