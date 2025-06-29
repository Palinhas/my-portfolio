import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "Meu site de portfólio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS.",
    slug: "portfolio-website",
    coverImage: "/images/projects/portfolio-cover.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: true,
    date: "2023-06-15",
    content: `
# Meu Portfolio Website

Este é o código-fonte do meu website de portfólio pessoal, onde mostro meus projetos e habilidades.

## Tecnologias Utilizadas

- **Next.js** - Framework React para renderização híbrida
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/UI** - Componentes reutilizáveis
    `,
  },
  // Adicione mais projetos aqui
];

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((project) =>
    project.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
