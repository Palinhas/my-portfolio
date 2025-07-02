/**
 * @fileoverview About Page Client Component
 * 
 * Componente client-side da página About com animações e interatividade.
 * Implementa timeline de experiência, skills showcase e CTA sections.
 * 
 * @author Carlos Bicho
 * @version 2.0.0
 * @since 2025-01-29
 */

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Avatar } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Code2,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
} from "lucide-react";
import { variants } from "@/lib/motion-tokens";

export default function AboutClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "React/Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Language" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "PostgreSQL", level: 80, category: "Database" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "AWS", level: 70, category: "Cloud" },
  ];

  const experience = [
    {
      period: "2023 - Presente",
      role: "Senior Full-Stack Developer",
      company: "Freelancer",
      description: "Desenvolvimento de aplicações web modernas com React, Next.js e Node.js",
      technologies: ["React", "Next.js", "TypeScript", "Supabase"],
    },
    {
      period: "2021 - 2023",
      role: "Full-Stack Developer",
      company: "Tech Company",
      description: "Criação de plataformas SaaS e sistemas de gestão empresarial",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
    },
    {
      period: "2019 - 2021",
      role: "Frontend Developer",
      company: "Digital Agency",
      description: "Desenvolvimento de websites e aplicações web responsivas",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <motion.section 
        ref={ref}
        className="container mx-auto px-4 mb-20"
        variants={variants.staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Animated Badge */}
        <motion.div 
          variants={variants.staggerItem}
          className="flex justify-center mb-8"
        >
          <Badge variant="outline" className="glass px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Sobre Mim
          </Badge>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold gradient-text"
              variants={variants.slideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Desenvolvedor Full-Stack
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              variants={variants.staggerItem}
            >
              Especializado em criar experiências digitais excepcionais com tecnologias modernas. 
              Apaixonado por código limpo, performance e design centrado no utilizador.
            </motion.p>

            <motion.div 
              className="flex items-center gap-4 text-muted-foreground"
              variants={variants.staggerItem}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Portugal</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>+5 anos experiência</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={variants.staggerItem}
            >
              <MagneticButton
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors gap-2 inline-flex items-center"
                onClick={() => window.open('/cv.pdf', '_blank')}
              >
                <Download className="w-4 h-4" />
                Download CV
              </MagneticButton>
              
              <MagneticButton
                className="px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors gap-2 inline-flex items-center"
                onClick={() => window.location.href = '/contact'}
              >
                <Mail className="w-4 h-4" />
                Contactar
              </MagneticButton>
            </motion.div>
          </div>

          {/* Avatar & Stats */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={variants.staggerItem}
          >
            <div className="relative isolate">
              {/* Avatar */}
              <div className="relative z-0">
                <Avatar 
                  size="xl" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Carlos Bicho"
                  className="shadow-consistent-lg"
                />
              </div>
              
              {/* Floating Stats - Top Right */}
              <motion.div 
                className="absolute -top-4 -right-4 glass p-3 rounded-xl border z-30 shadow-consistent-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">Projetos</div>
                </div>
              </motion.div>
              
              {/* Floating Stats - Bottom Left */}
              <motion.div 
                className="absolute -bottom-4 -left-4 glass p-3 rounded-xl border z-30 shadow-consistent-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground">Anos</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section 
        className="container mx-auto px-4 mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={variants.slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Experiência Profissional
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative pl-8 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Timeline Line */}
              {index < experience.length - 1 && (
                <div className="absolute left-3 top-8 w-0.5 h-full bg-border" />
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg" />
              
              {/* Content */}
              <div className="glass p-6 rounded-xl border ml-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <Badge variant="secondary">{exp.period}</Badge>
                </div>
                
                <h4 className="text-lg text-primary font-semibold mb-2">{exp.company}</h4>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="container mx-auto px-4 mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={variants.slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Competências Técnicas
        </motion.h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="glass p-6 rounded-xl border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{skill.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {skill.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proficiência</span>
                  <span className="font-medium">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="glass p-8 rounded-2xl border max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-muted-foreground mb-6">
              Estou sempre interessado em novos projetos e oportunidades de colaboração.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors gap-2 inline-flex items-center"
                onClick={() => window.location.href = '/projects'}
              >
                <Code2 className="w-4 h-4" />
                Ver Projetos
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              
              <MagneticButton
                className="px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors gap-2 inline-flex items-center"
                onClick={() => window.open('https://linkedin.com/in/carlos-bicho', '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
