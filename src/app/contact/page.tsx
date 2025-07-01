import { Metadata } from "next";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto com Carlos Bicho para colaborações, projetos de desenvolvimento web, consultoria em React, Next.js e TypeScript. Disponível para freelance e oportunidades profissionais em Portugal.",
  keywords: [
    "contacto Carlos Bicho",
    "desenvolvedor Portugal",
    "freelance React developer",
    "Next.js consultoria",
    "TypeScript especialista",
    "colaborações web development",
    "projetos Portugal",
    "full-stack developer hire",
    "contacto programador",
    "desenvolvimento web Portugal",
  ],
  openGraph: {
    title: "Contacto | Carlos Bicho - Desenvolvedor Full-Stack",
    description:
      "Pronto para o seu próximo projeto? Entre em contacto para colaborações em desenvolvimento web, React, Next.js e soluções digitais inovadoras.",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto - Carlos Bicho",
      },
    ],
  },
  alternates: {
    canonical: "/contact",
  },
  other: {
    "article:author": "Carlos Bicho",
    "article:section": "Contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
