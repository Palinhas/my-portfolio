"use client";

import { motion, useInView } from "framer-motion"; // ← ADICIONAR useInView
import { useRef } from "react"; // ← ADICIONAR useRef

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
} from "react-icons/si";
import { FaAws } from "react-icons/fa"; // ← AWS da FontAwesome

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
];

// Container para stagger effect
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
} as const;

// Animação para cada tech icon
const techIcon = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "backOut" as const,
    },
  },
} as const;

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Anima só uma vez
    amount: 0.1, // Quando 10% está visível
    margin: "0px 0px -100px 0px", // Trigger antes de aparecer
  });

  return (
    <motion.section ref={ref} className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
        <p className="text-lg text-muted-foreground">
          Tecnologias que domino e uso no dia a dia
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={container}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto"
      >
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              variants={techIcon}
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="w-16 h-16 mb-3 flex items-center justify-center">
                <Icon
                  size={48}
                  style={{ color: tech.color }}
                  className="transition-colors duration-300"
                />
              </div>
              <span className="text-sm font-medium text-center">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
