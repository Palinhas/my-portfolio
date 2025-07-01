import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProjectDetailClient from "./project-detail-client";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projeto não encontrado",
    };
  }

  return {
    title: `${project.title} | Carlos Bicho - Portfolio`,
    description: `${project.description} Projeto desenvolvido com ${project.tags.slice(0, 3).join(", ")}. Veja detalhes técnicos, processo de desenvolvimento e resultados alcançados.`,
    keywords: [
      `${project.title}`,
      "Carlos Bicho projeto",
      ...project.tags,
      "portfolio desenvolvimento",
      "case study",
      "projeto React",
      "desenvolvimento web Portugal",
    ],
    openGraph: {
      title: `${project.title} | Projeto Carlos Bicho`,
      description: `${project.description} Desenvolvido com ${project.tags.slice(0, 3).join(", ")}.`,
      type: "article",
      publishedTime: project.date,
      tags: project.tags,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Projeto Carlos Bicho`,
        },
      ],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
    other: {
      "article:author": "Carlos Bicho",
      "article:section": "Portfolio",
      "article:published_time": project.date,
      "article:tag": project.tags.join(", "),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Renderizar MDX no servidor se existir conteúdo
  const renderedContent = project.content ? (
    <MDXRemote source={project.content} />
  ) : null;

  return (
    <ProjectDetailClient project={project} renderedContent={renderedContent} />
  );
}
