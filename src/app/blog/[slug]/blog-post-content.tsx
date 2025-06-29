"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { Clock } from "lucide-react";
import BlogMDXContent from "@/components/ui/blog-mdx-content";
import { BlogPost } from "@/types/blog";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* ✅ MOSTRAR EXCERPT SE EXISTIR */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-4 text-muted-foreground mb-6">
          <span>
            {formatDistance(new Date(post.date), new Date(), {
              addSuffix: true,
              locale: pt,
            })}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min de leitura</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Card>
        <CardContent className="p-8">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <BlogMDXContent source={post.mdxSource} />
          </article>
        </CardContent>
      </Card>
    </>
  );
}
