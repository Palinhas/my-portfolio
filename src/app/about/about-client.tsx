"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Code,
  Coffee,
  Music,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { variants, scrollVariants } from "@/lib/motion-tokens";

export default function AboutPageClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const experienceRef = useRef(null);
  const experienceInView = useInView(experienceRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <div className="relative min-h-screen">
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-accent/5" />
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

      {/* SEO Content - Visible to search engines */}
      <div className="sr-only">
        <h1>Carlos Bicho - Desenvolvedor Full-Stack</h1>
        <p>
          Desenvolvedor com mais de 8 anos de experiência especializado em
          React, Next.js, TypeScript e tecnologias modernas. Localizado em
          Portugal, crio experiências web que fazem a diferença com foco na
          performance e experiência do utilizador.
        </p>
        <h2>Experiência Profissional</h2>
        <h3>Senior Full-Stack Developer</h3>
        <p>
          Tech Company, 2022 - Presente. Liderança de desenvolvimento de
          aplicações web complexas, mentoria de developers juniores e
          implementação de arquiteturas escaláveis.
        </p>
        <h3>
          Tecnologias: React, Next.js, TypeScript, Node.js, PostgreSQL,
          Supabase, Prisma, Docker, Vercel
        </h3>
        <h2>Interesses Pessoais</h2>
        <p>
          Café de especialidade, música e fotografia alimentam minha
          criatividade como desenvolvedor.
        </p>
      </div>

      {/* Hero Section */}
      <motion.section
        ref={ref}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={scrollVariants.slideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12"
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
                Sobre • Portfolio 2025
              </span>
            </motion.div>

            <h1 className="text-fluid-3xl font-bold mb-6 gradient-text">
              Sobre Mim
            </h1>
            <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Desenvolvedor apaixonado por tecnologia, sempre em busca de
              soluções elegantes para problemas complexos. Aqui está a minha
              história.
            </p>
          </motion.div>

          {/* Imagem e Bio Principal */}
          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
          >
            <motion.div variants={variants.staggerItem}>
              <Avatar
                size="xl"
                className="mx-auto md:mx-0"
                alt="Carlos Bicho - Foto profissional temporária"
              />
            </motion.div>

            <motion.div variants={variants.staggerItem} className="space-y-6">
              <h2 className="text-fluid-2xl font-bold">Carlos Bicho</h2>
              <p className="text-fluid-lg text-muted-foreground leading-relaxed">
                Comecei a programar há mais de 8 anos e desde então tenho-me
                dedicado a criar experiências web que fazem a diferença.
                Especializo-me em tecnologias modernas como React, Next.js e
                TypeScript, sempre com foco na performance e experiência do
                utilizador.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full glass border">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Portugal</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full glass border">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>8+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full glass border">
                  <Code className="w-4 h-4 text-primary" />
                  <span>Full-Stack Developer</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experiência */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={experienceRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-2xl font-bold mb-6 gradient-text">
              Experiência Profissional
            </h2>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={variants.staggerItem}>
              <Card className="glass border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-fluid-lg">
                        Senior Full-Stack Developer
                      </CardTitle>
                      <CardDescription className="text-fluid-base">
                        Tech Company • 2022 - Presente
                      </CardDescription>
                    </div>
                    <Badge
                      variant="default"
                      className="bg-gradient-primary text-white"
                    >
                      Atual
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-fluid-base">
                    Lidero o desenvolvimento de aplicações web complexas,
                    mentorizo developers juniores e implemento arquiteturas
                    escaláveis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "PostgreSQL",
                    ].map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.staggerItem}>
              <Card className="glass border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-fluid-lg">
                    Frontend Developer
                  </CardTitle>
                  <CardDescription className="text-fluid-base">
                    Startup • 2020 - 2022
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-fluid-base">
                    Desenvolvi interfaces modernas e responsivas, implementei
                    design systems e otimizei performance de aplicações.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Vue.js", "Tailwind CSS", "JavaScript"].map(
                      (tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="hover:bg-primary/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.staggerItem}>
              <Card className="glass border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-fluid-lg">
                    Junior Developer
                  </CardTitle>
                  <CardDescription className="text-fluid-base">
                    Agência Digital • 2018 - 2020
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-fluid-base">
                    Primeiros passos no desenvolvimento web, criação de sites
                    responsivos e aprendizagem de boas práticas de código.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "JavaScript", "WordPress"].map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills técnicas */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-2xl font-bold mb-6 gradient-text">
              Competências Técnicas
            </h2>
            <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologias e ferramentas que utilizo no meu dia a dia para criar
              soluções eficientes e escaláveis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass border hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-fluid-lg">Frontend</CardTitle>
                <CardDescription className="text-fluid-base">
                  Tecnologias para interfaces modernas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "React", level: "Avançado" },
                    { name: "Next.js", level: "Avançado" },
                    { name: "TypeScript", level: "Avançado" },
                    { name: "Tailwind CSS", level: "Avançado" },
                    { name: "Vue.js", level: "Intermédio" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-fluid-base">{skill.name}</span>
                      <Badge
                        variant={
                          skill.level === "Avançado" ? "default" : "secondary"
                        }
                        className={
                          skill.level === "Avançado"
                            ? "bg-gradient-primary text-white"
                            : ""
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-fluid-lg">Backend</CardTitle>
                <CardDescription className="text-fluid-base">
                  Tecnologias para APIs e bases de dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Node.js", level: "Avançado" },
                    { name: "PostgreSQL", level: "Avançado" },
                    { name: "Supabase", level: "Avançado" },
                    { name: "Prisma", level: "Intermédio" },
                    { name: "Docker", level: "Intermédio" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-fluid-base">{skill.name}</span>
                      <Badge
                        variant={
                          skill.level === "Avançado" ? "default" : "secondary"
                        }
                        className={
                          skill.level === "Avançado"
                            ? "bg-gradient-primary text-white"
                            : ""
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interesses */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-2xl font-bold mb-6 gradient-text">
              Quando Não Estou a Programar
            </h2>
            <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
              Acredito que um bom desenvolvedor tem interesses diversificados
              que alimentam a criatividade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Coffee,
                title: "Café de Especialidade",
                description:
                  "Explorar diferentes métodos de extração e origins",
              },
              {
                icon: Music,
                title: "Música",
                description: "Desde jazz clássico a electronic music moderna",
              },
              {
                icon: Camera,
                title: "Fotografia",
                description: "Capturar momentos e paisagens únicas",
              },
            ].map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="glass border hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="pt-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full glass border flex items-center justify-center"
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h3 className="text-fluid-lg font-semibold mb-2">
                        {interest.title}
                      </h3>
                      <p className="text-fluid-base text-muted-foreground">
                        {interest.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass border rounded-2xl p-8"
          >
            <h2 className="text-fluid-2xl font-bold mb-4 gradient-text">
              Vamos Trabalhar Juntos?
            </h2>
            <p className="text-fluid-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Está à procura de um desenvolvedor apaixonado e dedicado para o
              seu próximo projeto? Adoraria ouvir as suas ideias!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                strength={0.4}
                distance={60}
                className="group relative overflow-hidden px-8 py-4 rounded-full gradient-primary text-white font-medium shadow-consistent-lg hover:shadow-glow"
              >
                <Link
                  href="/contact"
                  className="relative z-10 flex items-center gap-2"
                >
                  <span>Entrar em Contacto</span>
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
                className="px-8 py-4 rounded-full btn-outline-consistent shadow-consistent-sm hover:shadow-consistent-md transition-all duration-300"
              >
                <Link href="/projects">Ver Projetos</Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
