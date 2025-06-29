import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto comigo para discutir projetos, oportunidades de trabalho ou colaborações.",
  keywords: ["Contacto", "Email", "Freelancer", "Projetos", "Carlos Bicho"],
  openGraph: {
    title: "Contacto | Carlos Bicho",
    description:
      "Entre em contacto comigo para discutir projetos, oportunidades de trabalho ou colaborações.",
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
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
