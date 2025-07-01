import { getAllPosts } from "@/lib/mdx";
import HeroSection from "@/components/sections/hero-section";
import TechStack from "@/components/sections/tech-stack";
import RecentBlogPosts from "@/components/sections/recent-blog-posts";
import FeaturedProjects from "@/components/sections/featured-projects";
import CTASection from "@/components/sections/cta-section";
import { PersonSchema, WebsiteSchema } from "@/components/schema-markup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carlos Bicho - Desenvolvedor Full-Stack | Portfolio",
  description:
    "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack especializado em React, Next.js, TypeScript e tecnologias modernas. Explore meus projetos e experiência.",
  keywords: [
    "Carlos Bicho",
    "Portfolio",
    "Desenvolvedor Full-Stack",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Frontend",
    "Backend",
    "Web Development",
    "Portugal",
  ],
  openGraph: {
    title: "Carlos Bicho - Desenvolvedor Full-Stack | Portfolio",
    description:
      "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack especializado em React, Next.js, TypeScript e tecnologias modernas.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Bicho - Portfolio Homepage",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calosbicho.pt";

  return (
    <>
      <PersonSchema
        name="Carlos Bicho"
        jobTitle="Desenvolvedor Full-Stack"
        url={siteUrl}
        image={`${siteUrl}/profile-image.jpg`}
        email="carlosserranobicho@gmail.com"
        sameAs={[
          "https://github.com/carlosbicho",
          "https://www.linkedin.com/in/carlos-bicho-596b16114",
        ]}
      />
      <WebsiteSchema url={siteUrl} name="Carlos Bicho - Portfolio" />

      <div className="relative min-h-screen">
        <HeroSection />
        <TechStack />
        <RecentBlogPosts posts={recentPosts} />
        <FeaturedProjects />
        <CTASection />
      </div>
    </>
  );
}
