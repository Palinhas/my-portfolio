"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Heart,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const footerLinks = {
  navegacao: [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/about" },
    { name: "Projetos", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contact" },
  ],
  recursos: [
    { name: "Currículo", href: "/cv.pdf", external: true },
    { name: "Portfolio", href: "/projects" },
    { name: "Artigos", href: "/blog" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/carlosbicho",
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/carlosbicho",
    icon: Linkedin,
    color: "hover:text-blue-600",
  },
  {
    name: "Email",
    href: "mailto:carlos@calosbicho.pt",
    icon: Mail,
    color: "hover:text-red-500",
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t bg-background mt-16"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1: Informações Pessoais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                CB
              </div>
              <div>
                <h3 className="font-semibold">Carlos Bicho</h3>
                <p className="text-sm text-muted-foreground">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Porto, Portugal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Criando experiências web modernas e performantes com as melhores
              tecnologias.
            </p>
          </motion.div>

          {/* Coluna 2: Navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Navegação</h4>
            <ul className="space-y-2">
              {footerLinks.navegacao.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 3: Recursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      <span>{link.name}</span>
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 4: Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Conecta-te comigo</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className={`h-10 w-10 ${social.color}`}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Sempre disponível para novos projetos e colaborações.
            </p>
          </motion.div>
        </div>

        {/* Linha divisória */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 border-t"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-col items-center justify-between space-y-4 text-sm text-muted-foreground md:flex-row md:space-y-0"
        >
          <div className="flex items-center space-x-1">
            <span>
              © {new Date().getFullYear()} Carlos Bicho. Todos os direitos
              reservados.
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Feito com</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>e</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              Next.js
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
