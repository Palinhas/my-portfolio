"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  PenTool,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { variants } from "@/lib/motion-tokens";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { PostMeta } from "@/lib/mdx";

interface BlogPageClientProps {
  posts: PostMeta[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
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
        <h1>Blog Carlos Bicho - Artigos Desenvolvimento Web</h1>
        <p>
          Artigos sobre React, Next.js, TypeScript, desenvolvimento web e
          tecnologias modernas. Tutoriais, insights e experiências reais de
          desenvolvimento em Portugal.
        </p>
        {posts.map((post) => (
          <div key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <p>Tags: {post.tags.join(", ")}</p>
            <p>Data: {new Date(post.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
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
                Conhecimento • Partilhado
              </span>
            </motion.div>

            <h1 className="text-fluid-3xl font-bold mb-6 gradient-text">
              Blog & Insights
            </h1>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Artigos sobre desenvolvimento web, tecnologias modernas,
              experiências pessoais e tudo o que aprendo no meu dia-a-dia como
              desenvolvedor.
            </p>
          </motion.div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="glass border max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full glass border flex items-center justify-center">
                    <PenTool className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-fluid-xl font-semibold mb-2">
                    Artigos em Preparação
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Novos artigos estão sendo escritos e serão publicados em
                    breve. Fique atento às atualizações!
                  </p>
                  <MagneticButton
                    strength={0.4}
                    distance={40}
                    className="px-6 py-3 rounded-full gradient-primary text-white font-medium"
                  >
                    <Link href="/contact">Sugerir Tópico</Link>
                  </MagneticButton>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              variants={variants.staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid gap-8"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={variants.staggerItem}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Card className="overflow-hidden glass border hover:shadow-xl transition-all duration-500">
                      <CardHeader className="space-y-4">
                        {/* Header Info */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-fluid-xl mb-2 group-hover:text-primary transition-colors leading-tight">
                              {post.title}
                            </CardTitle>
                            {post.excerpt && (
                              <CardDescription className="text-fluid-base leading-relaxed">
                                {post.excerpt}
                              </CardDescription>
                            )}
                          </div>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDistance(new Date(post.date), new Date(), {
                                addSuffix: true,
                                locale: pt,
                              })}
                            </span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>Artigo</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="hover:bg-primary/10 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Read More Button */}
                        <div className="pt-4 border-t">
                          <MagneticButton
                            strength={0.3}
                            distance={30}
                            className="btn-ghost-consistent px-4 py-2 rounded-lg font-medium"
                          >
                            <span className="flex items-center gap-2">
                              <span>Ler Artigo</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </MagneticButton>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA Section */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-16"
            >
              <Card className="glass border max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-fluid-xl font-semibold mb-4 gradient-text">
                    Gostou do Conteúdo?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Se tem alguma dúvida, sugestão de tópico ou quer discutir
                    sobre desenvolvimento, não hesite em entrar em contacto.
                  </p>
                  <MagneticButton
                    strength={0.4}
                    distance={40}
                    className="px-6 py-3 rounded-full gradient-primary text-white font-medium"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      <span>Entrar em Contacto</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
