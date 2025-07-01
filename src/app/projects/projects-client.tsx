"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { variants } from "@/lib/motion-tokens";
import type { Project } from "@/types/project";

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({
  projects,
}: ProjectsPageClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="relative min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, oklch(var(--primary)) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, oklch(var(--accent)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 30px 30px",
          }}
        />
      </div>

      {/* SEO Content */}
      <div className="sr-only">
        <h1>Projetos de Carlos Bicho - Portfolio Desenvolvedor Full-Stack</h1>
        <p>
          Portfolio completo com projetos desenvolvidos em React, Next.js,
          TypeScript e tecnologias modernas. Aplicações web, dashboards, APIs e
          soluções escaláveis para diversos segmentos.
        </p>
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Tecnologias: {project.tags.join(", ")}</p>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-muted-foreground">
                Portfolio • Projetos Reais
              </span>
            </motion.div>

            <h1 className="text-fluid-3xl font-bold mb-6 gradient-text">
              Meus Projetos
            </h1>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Uma coleção dos meus trabalhos mais significativos em
              desenvolvimento web. Cada projeto representa um desafio superado e
              uma solução inovadora implementada.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={variants.staggerItem}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group"
              >
                <Card className="overflow-hidden h-full glass border hover:shadow-xl transition-all duration-500">
                  {/* Project Image */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-fluid-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground glass px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(project.date).toLocaleDateString("pt-PT", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-fluid-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="hover:bg-primary/10 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-6 bg-muted/20">
                    <div className="flex items-center justify-between w-full">
                      {/* Ver Detalhes */}
                      <MagneticButton
                        strength={0.3}
                        distance={30}
                        className="btn-outline-consistent px-4 py-2 rounded-lg font-medium"
                      >
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-2"
                        >
                          <span>Ver Detalhes</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </MagneticButton>

                      {/* Links Externos */}
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <MagneticButton
                            strength={0.4}
                            distance={25}
                            className="w-10 h-10 rounded-full glass border hover:bg-primary/10 transition-colors"
                          >
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-full h-full"
                              aria-label={`GitHub do projeto ${project.title}`}
                            >
                              <Github className="h-4 w-4" />
                            </Link>
                          </MagneticButton>
                        )}

                        {project.demoUrl && (
                          <MagneticButton
                            strength={0.4}
                            distance={25}
                            className="w-10 h-10 rounded-full glass border hover:bg-primary/10 transition-colors"
                          >
                            <Link
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-full h-full"
                              aria-label={`Demo ao vivo do projeto ${project.title}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16"
            >
              <Card className="glass border max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass border flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-fluid-xl font-semibold mb-2">
                    Projetos em Desenvolvimento
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Novos projetos estão sendo desenvolvidos e serão adicionados
                    em breve.
                  </p>
                  <MagneticButton
                    strength={0.4}
                    distance={40}
                    className="px-6 py-3 rounded-full gradient-primary text-white font-medium"
                  >
                    <Link href="/contact">Entre em Contacto</Link>
                  </MagneticButton>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
