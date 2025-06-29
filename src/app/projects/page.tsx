import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllProjects } from "@/data/projects";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore os meus projetos de desenvolvimento web, aplicações React, Next.js e outras tecnologias modernas.",
  keywords: [
    "Projetos",
    "Portfolio",
    "React",
    "Next.js",
    "Web Development",
    "Carlos Bicho",
  ],
  openGraph: {
    title: "Projetos | Carlos Bicho",
    description:
      "Explore os meus projetos de desenvolvimento web, aplicações React, Next.js e outras tecnologias modernas.",
    images: [
      {
        url: "/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "Projetos - Carlos Bicho",
      },
    ],
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meus Projetos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma coleção dos meus trabalhos e projetos de desenvolvimento.
            Explore para ver minhas habilidades e experiências.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden flex flex-col h-full border-muted-foreground/20 hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{project.title}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {new Date(project.date).toLocaleDateString("pt-PT", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver detalhes
                </Link>

                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  )}

                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span className="sr-only">Live Demo</span>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
