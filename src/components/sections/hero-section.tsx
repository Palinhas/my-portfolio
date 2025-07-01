"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity, position: "relative" }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient with modern glassmorphism */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge with sparkle effect */}
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
              Portfolio 2025 • Next.js 15 • React 19
            </span>
          </motion.div>

          {/* Main title with fluid typography */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-fluid-3xl font-bold mb-6 leading-tight"
          >
            Olá, sou o{" "}
            <motion.span
              className="gradient-text relative"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Carlos Bicho
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.span>
          </motion.h1>

          {/* Subtitle with stagger effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-2 mb-12"
          >
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Desenvolvedor Full-Stack apaixonado por criar{" "}
              <motion.span
                className="text-primary font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                experiências web modernas
              </motion.span>{" "}
              e escaláveis.
            </p>
            <p className="text-fluid-base text-muted-foreground/80 max-w-2xl mx-auto">
              Especializado em React, Next.js, TypeScript e tecnologias de ponta
            </p>
          </motion.div>

          {/* Action buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <MagneticButton
              strength={0.4}
              distance={60}
              className="group relative overflow-hidden px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl"
            >
              <Link
                href="/projects"
                className="relative z-10 flex items-center gap-2"
              >
                <span>Ver Projetos</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </MagneticButton>

            <MagneticButton
              strength={0.3}
              distance={50}
              className="px-8 py-4 rounded-full glass border font-medium hover:shadow-lg"
            >
              <Link href="/contact">Vamos Conversar</Link>
            </MagneticButton>
          </motion.div>

          {/* Enhanced social links with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-4"
          >
            {[
              {
                href: "https://github.com/carlosbicho",
                icon: Github,
                label: "GitHub",
                color: "hover:text-gray-900 dark:hover:text-gray-100",
              },
              {
                href: "https://www.linkedin.com/in/carlos-bicho-596b16114",
                icon: Linkedin,
                label: "LinkedIn",
                color: "hover:text-blue-500",
              },
              {
                href: "mailto:carlosserranobicho@gmail.com",
                icon: Mail,
                label: "Email",
                color: "hover:text-red-500",
              },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <MagneticButton
                    strength={0.5}
                    distance={40}
                    className={`h-12 w-12 rounded-full glass border ${social.color} transition-colors duration-300`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
