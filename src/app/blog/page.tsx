import { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogPageClient from "./blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre desenvolvimento web, React, Next.js, TypeScript e as últimas tendências em tecnologia. Insights, tutoriais e experiências de Carlos Bicho, desenvolvedor full-stack em Portugal.",
  keywords: [
    "blog Carlos Bicho",
    "artigos desenvolvimento web",
    "React tutorials",
    "Next.js blog",
    "TypeScript guias",
    "desenvolvimento Portugal",
    "web development articles",
    "frontend development blog",
    "programming insights",
    "tech blog Portugal",
  ],
  openGraph: {
    title: "Blog | Carlos Bicho - Desenvolvimento Web & Tecnologia",
    description:
      "Acompanhe artigos sobre React, Next.js, TypeScript e as melhores práticas em desenvolvimento web. Insights técnicos e experiências reais.",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog - Carlos Bicho",
      },
    ],
  },
  alternates: {
    canonical: "/blog",
  },
  other: {
    "article:author": "Carlos Bicho",
    "article:section": "Technology",
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}
