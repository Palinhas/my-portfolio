"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  Sparkles,
  Clock,
  CheckCircle,
  MessageSquare,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { variants } from "@/lib/motion-tokens";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Limite de mensagens excedido. Tente novamente mais tarde."
          );
        } else {
          throw new Error(result.error || "Falha ao enviar");
        }
      }

      toast.success("Mensagem enviada com sucesso! Obrigado pelo contacto.");

      if (result.remaining !== undefined && result.remaining <= 2) {
        toast.info(`Você tem ${result.remaining} mensagens restantes hoje.`);
      }

      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Desenvolvimento Web",
    "E-commerce",
    "Aplicações SaaS",
    "APIs REST",
    "Consultoria Técnica",
    "Code Review",
    "Mentorship",
  ];

  const faqs = [
    {
      question: "Qual é o seu processo de trabalho?",
      answer:
        "Começo sempre com uma conversa para entender os objetivos. Depois crio um plano detalhado, protótipos, e desenvolvo com feedback constante.",
      icon: MessageSquare,
    },
    {
      question: "Quanto tempo demora um projeto?",
      answer:
        "Depende da complexidade. Sites simples: 2-4 semanas. Aplicações complexas: 2-6 meses. Discutimos prazos detalhados na proposta.",
      icon: Clock,
    },
    {
      question: "Trabalha com que tecnologias?",
      answer:
        "Especializado em React, Next.js, TypeScript, Node.js, e bases de dados modernas. Sempre escolho a melhor stack para cada projeto.",
      icon: Zap,
    },
    {
      question: "Oferece suporte pós-lançamento?",
      answer:
        "Sim! Incluo sempre um período de suporte gratuito e ofereço planos de manutenção contínua para quem precisar.",
      icon: CheckCircle,
    },
  ];

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
        <h1>Contacto Carlos Bicho - Desenvolvedor Full-Stack Portugal</h1>
        <p>
          Entre em contacto para colaborações, projetos web, consultoria
          React/Next.js. Disponível para freelance, desenvolvimento de
          aplicações e soluções digitais.
        </p>
        <p>Email: carlosserranobicho@gmail.com | Localização: Portugal</p>
        <p>
          Serviços: Desenvolvimento Web, E-commerce, SaaS, APIs, Consultoria
          Técnica
        </p>
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
                Disponível • Resposta 24h
              </span>
            </motion.div>

            <h1 className="text-fluid-3xl font-bold mb-6 gradient-text">
              Vamos Trabalhar Juntos
            </h1>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tem um projeto em mente? Gostaria de colaborar? Ou simplesmente
              quer trocar ideias? Estou sempre disponível para conversas
              interessantes e novos desafios.
            </p>
          </motion.div>

          {/* Contact Form & Info */}
          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-12 mb-20"
          >
            {/* Contact Form */}
            <motion.div variants={variants.staggerItem}>
              <Card className="glass border hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-fluid-xl gradient-text">
                    Enviar Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Nome *
                        </label>
                        <Input
                          id="name"
                          placeholder="João Silva"
                          {...register("name")}
                          className={`glass border transition-all duration-300 ${
                            errors.name
                              ? "border-red-500"
                              : "focus:border-primary/50"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="joao@exemplo.com"
                          {...register("email")}
                          className={`glass border transition-all duration-300 ${
                            errors.email
                              ? "border-red-500"
                              : "focus:border-primary/50"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Assunto *
                      </label>
                      <Input
                        id="subject"
                        placeholder="Proposta de projeto / Colaboração / Outro"
                        {...register("subject")}
                        className={`glass border transition-all duration-300 ${
                          errors.subject
                            ? "border-red-500"
                            : "focus:border-primary/50"
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Mensagem *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Conte-me sobre o seu projeto ou ideia..."
                        rows={6}
                        {...register("message")}
                        className={`glass border transition-all duration-300 resize-none ${
                          errors.message
                            ? "border-red-500"
                            : "focus:border-primary/50"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <MagneticButton
                      strength={0.4}
                      distance={40}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white font-medium py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>A enviar...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Enviar Mensagem</span>
                          </>
                        )}
                      </div>
                    </MagneticButton>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={variants.staggerItem} className="space-y-6">
              <Card className="glass border hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-fluid-xl">
                    Informações de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full glass border flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">
                        carlosserranobicho@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full glass border flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Localização</p>
                      <p className="text-muted-foreground">Portugal</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full glass border flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Disponibilidade</p>
                      <p className="text-muted-foreground">
                        Segunda a Sexta, 9h-18h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle>Tipo de Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="hover:bg-primary/10 transition-colors"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle>Tempo de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Normalmente respondo a emails em{" "}
                    <strong>24-48 horas</strong>. Para projetos urgentes,
                    mencione no assunto.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-fluid-2xl font-bold mb-6 gradient-text">
              Perguntas Frequentes
            </h2>
            <p className="text-fluid-base text-muted-foreground max-w-2xl mx-auto">
              Respostas às questões mais comuns sobre como trabalho e os meus
              serviços.
            </p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={variants.staggerItem}
                whileHover={{
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="h-full glass border hover:shadow-xl transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full glass border flex items-center justify-center">
                        <faq.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-fluid-lg">
                        {faq.question}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
