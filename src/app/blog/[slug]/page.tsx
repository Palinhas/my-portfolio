import { Suspense } from "react";
import { getPostContent } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogPostContent from "./blog-post-content";

// ✅ SERVER COMPONENT (sem "use client")
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Blog
        </Link>

        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostContent post={post} />
        </Suspense>
      </div>
    </div>
  );
}

// ✅ LOADING SKELETON
function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
      <div className="h-12 bg-muted rounded w-2/3 mb-6"></div>
      <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
      <div className="h-96 bg-muted rounded"></div>
    </div>
  );
}
