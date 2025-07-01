"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  ImageIcon,
  Code,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "@/types/project";

interface ProjectDetailClientProps {
  project: Project;
  renderedContent?: React.ReactNode;
}

export default function ProjectDetailClient({
  project,
  renderedContent,
}: ProjectDetailClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === project.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? project.images!.length - 1 : prev - 1
      );
    }
  };

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
        <h1>{project.title} - Projeto Carlos Bicho</h1>
        <p>{project.description}</p>
        <p>Tecnologias utilizadas: {project.tags.join(", ")}</p>
        <p>
          Data de desenvolvimento: {new Date(project.date).toLocaleDateString()}
        </p>
        {project.githubUrl && <p>Código fonte: {project.githubUrl}</p>}
        {project.demoUrl && <p>Demo ao vivo: {project.demoUrl}</p>}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <MagneticButton
              strength={0.3}
              distance={30}
              className="btn-ghost-consistent px-4 py-2 rounded-lg"
            >
              <Link href="/projects" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar aos Projetos
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video w-full mb-12 overflow-hidden rounded-xl glass border"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-fluid-3xl font-bold mb-6 gradient-text">
              {project.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground glass px-3 py-2 rounded-full">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(project.date).toLocaleDateString("pt-PT", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.githubUrl && (
                  <MagneticButton
                    strength={0.4}
                    distance={30}
                    className="btn-outline-consistent px-4 py-2 rounded-lg"
                  >
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Link>
                  </MagneticButton>
                )}

                {project.demoUrl && (
                  <MagneticButton
                    strength={0.4}
                    distance={30}
                    className="px-4 py-2 rounded-lg gradient-primary text-white"
                  >
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </Link>
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <p className="text-fluid-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Project Content */}
          {renderedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <Card className="glass border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full glass border flex items-center justify-center">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-fluid-xl font-semibold">
                      Detalhes Técnicos
                    </h2>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {renderedContent}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full glass border flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-fluid-xl font-semibold">
                  Galeria de Imagens
                </h2>
              </div>

              {/* Main Image */}
              <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-xl glass border group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.images[selectedImageIndex]}
                      alt={`${project.title} - Imagem ${selectedImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass border text-sm">
                  {selectedImageIndex + 1} / {project.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {project.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? "border-primary shadow-md"
                          : "border-transparent hover:border-muted-foreground/50"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Thumbnail ${index + 1}`}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Navigation to Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <Card className="glass border">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-fluid-xl font-semibold">
                    Gostou deste Projeto?
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Explore outros projetos do meu portfolio ou entre em contacto
                  para discutir como posso ajudar com o seu próximo projeto.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton
                    strength={0.4}
                    distance={40}
                    className="btn-outline-consistent px-6 py-3 rounded-full"
                  >
                    <Link href="/projects">Ver Mais Projetos</Link>
                  </MagneticButton>
                  <MagneticButton
                    strength={0.4}
                    distance={40}
                    className="px-6 py-3 rounded-full gradient-primary text-white"
                  >
                    <Link href="/contact">Entrar em Contacto</Link>
                  </MagneticButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
