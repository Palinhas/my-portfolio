import { Metadata } from "next";
import { getAllProjects } from "@/data/projects";
import ProjectsPageClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore meu portfolio de desenvolvimento web com projetos em React, Next.js, TypeScript e tecnologias modernas. Veja aplicações completas, APIs, dashboards e soluções inovadoras criadas por Carlos Bicho.",
  keywords: [
    "projetos Carlos Bicho",
    "portfolio desenvolvedor",
    "React projetos",
    "Next.js aplicações",
    "TypeScript desenvolvimento",
    "web applications Portugal",
    "full-stack projetos",
    "dashboard desenvolvimento",
    "API development",
    "portfolio programador",
  ],
  openGraph: {
    title: "Projetos | Carlos Bicho - Portfolio Desenvolvedor Full-Stack",
    description:
      "Descubra projetos reais desenvolvidos com React, Next.js e TypeScript. Aplicações modernas, performantes e escaláveis criadas por Carlos Bicho.",
    images: [
      {
        url: "/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio de Projetos - Carlos Bicho",
      },
    ],
  },
  alternates: {
    canonical: "/projects",
  },
  other: {
    "article:author": "Carlos Bicho",
    "article:section": "Portfolio",
  },
};

export default async function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsPageClient projects={projects} />;
}
