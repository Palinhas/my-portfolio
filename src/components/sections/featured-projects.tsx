"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFeaturedProjects } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const, // ← ADICIONAR 'as const'
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring" as const, // ← ADICIONAR 'as const'
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  const featuredProjects = getFeaturedProjects();

  return (
    <motion.section
      ref={ref}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header com animação própria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos meus principais trabalhos e projetos recentes.
          </p>
        </motion.div>

        {/* Grid com stagger effect controlado por isInView */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // ← CORRIGIR: usar isInView
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover="hover"
              whileTap="tap"
              className="h-full"
              style={{
                borderRadius: "calc(0.5rem - 1px)",
                overflow: "hidden",
              }}
            >
              <Card className="overflow-hidden flex flex-col h-full border shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video w-full">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={`/projects/${project.slug}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Botão final com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <Button className="inline-flex items-center gap-2">
              Ver todos os projetos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
