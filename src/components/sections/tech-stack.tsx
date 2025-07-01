"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiSupabase,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiDocker,
  SiVercel,
  SiFramer,
  SiRadixui,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { variants, scrollVariants } from "@/lib/motion-tokens";

const technologies = [
  {
    name: "React 19",
    icon: SiReact,
    color: "#61DAFB",
    description: "Frontend framework",
    category: "Frontend",
    size: "medium", // Equalizado para simetria
    featured: true,
  },
  {
    name: "Next.js 15",
    icon: SiNextdotjs,
    color: "adaptive", // Sistema adaptativo para light/dark
    description: "Full-stack framework",
    category: "Frontend",
    size: "medium", // Equalizado para simetria
    featured: true,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    description: "Type safety",
    category: "Language",
    size: "medium",
    featured: true,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first CSS",
    category: "Styling",
    size: "medium",
    featured: true,
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    color: "#0055FF",
    description: "Animations",
    category: "Animation",
    size: "medium",
    featured: true,
  },
  {
    name: "Radix UI",
    icon: SiRadixui,
    color: "#6366F1",
    description: "Components",
    category: "UI",
    size: "small",
    featured: false,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#68D391",
    description: "Runtime",
    category: "Backend",
    size: "small",
    featured: false,
  },
  {
    name: "Supabase",
    icon: SiSupabase,
    color: "#3ECF8E",
    description: "Database & Auth",
    category: "Backend",
    size: "medium",
    featured: true,
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "#A78BFA",
    description: "ORM",
    category: "Database",
    size: "small",
    featured: false,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4F46E5",
    description: "Database",
    category: "Database",
    size: "small",
    featured: false,
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#0EA5E9",
    description: "Containerization",
    category: "DevOps",
    size: "small",
    featured: false,
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#374151",
    description: "Deployment",
    category: "DevOps",
    size: "small",
    featured: false,
  },
  {
    name: "AWS",
    icon: FaAws,
    color: "#FF9900",
    description: "Cloud services",
    category: "Cloud",
    size: "small",
    featured: false,
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  const featuredTech = technologies.filter((tech) => tech.featured);
  const otherTech = technologies.filter((tech) => !tech.featured);

  return (
    <motion.section ref={ref} className="relative container mx-auto px-4 py-24">
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-accent/5" />
        {/* Subtle geometric pattern instead of pixelated gradients */}
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
      {/* Header */}
      <motion.div
        variants={scrollVariants.slideUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Tecnologias 2025
          </span>
        </motion.div>

        <h2 className="text-fluid-2xl font-bold mb-6 gradient-text">
          Tech Stack Moderno
        </h2>
        <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
          Ferramentas e tecnologias que uso para criar experiências digitais
          excepcionais
        </p>
      </motion.div>

      {/* Featured Technologies - Symmetric Grid */}
      <motion.div
        variants={variants.staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
      >
        {featuredTech.map((tech) => {
          const Icon = tech.icon;

          // Sistema adaptativo de cores para light/dark mode
          const getAdaptiveColor = (color: string) => {
            if (color === "adaptive") {
              return "hsl(var(--foreground))"; // Usa a cor do tema atual
            }
            return color;
          };

          return (
            <motion.div
              key={tech.name}
              variants={variants.staggerItem}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl p-6 glass border min-h-[160px] hover:shadow-xl transition-all duration-300"
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background:
                    tech.color === "adaptive"
                      ? `linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--primary) / 0.2) 100%)`
                      : `linear-gradient(135deg, ${tech.color}20 0%, ${tech.color}40 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.4 }}
                    className="p-3 rounded-xl glass"
                  >
                    <Icon
                      size={tech.size === "large" ? 32 : 28}
                      style={{ color: getAdaptiveColor(tech.color) }}
                      className="transition-all duration-300 group-hover:drop-shadow-lg"
                    />
                  </motion.div>

                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {tech.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {tech.description}
                  </p>
                </div>
              </div>

              {/* Hover effect border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-300"
                style={{
                  boxShadow:
                    tech.color === "adaptive"
                      ? `0 0 30px hsl(var(--primary) / 0.2)`
                      : `0 0 30px ${tech.color}20`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Other Technologies - Compact Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="space-y-6"
      >
        <h3 className="text-center text-lg font-semibold text-muted-foreground">
          Outras Tecnologias
        </h3>

        <motion.div
          variants={variants.staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {otherTech.map((tech) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                variants={variants.staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-col items-center p-4 rounded-xl glass border hover:border-primary/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 p-2 rounded-lg bg-background/50 backdrop-blur-sm"
                >
                  <Icon
                    size={24}
                    style={{
                      color: tech.color,
                      filter: "contrast(1.1) saturate(1.2)",
                    }}
                    className="transition-all duration-300 group-hover:drop-shadow-md"
                  />
                </motion.div>

                <h4 className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                  {tech.name}
                </h4>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {tech.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 bg-gradient-primary rounded-full"
          />
          <span className="text-sm font-medium">
            Sempre explorando novas tecnologias
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
