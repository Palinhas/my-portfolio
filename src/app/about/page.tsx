import { Metadata } from "next";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "Sobre Mim",
  description:
    "Conheça Carlos Bicho, desenvolvedor Full-Stack com mais de 8 anos de experiência. Especializado em React, Next.js, TypeScript e tecnologias modernas para criar experiências web que fazem a diferença.",
  keywords: [
    "Carlos Bicho sobre",
    "desenvolvedor Full-Stack",
    "experiência programação",
    "React developer Portugal",
    "Next.js especialista",
    "TypeScript developer",
    "desenvolvimento web Portugal",
    "programador 8 anos experiência",
    "full-stack engineer",
    "web development expert",
  ],
  openGraph: {
    title: "Sobre Mim | Carlos Bicho - Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor apaixonado por tecnologia com mais de 8 anos de experiência em React, Next.js e TypeScript. Conheça minha história e experiência profissional.",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre Carlos Bicho - Desenvolvedor Full-Stack",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
  other: {
    "article:author": "Carlos Bicho",
    "article:section": "About",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
