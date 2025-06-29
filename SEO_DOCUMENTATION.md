# Documentação Completa de SEO - Portfolio Carlos Bicho

## Índice

1. Introdução
2. Estrutura Global de SEO
3. Metadados por Página
4. Schema Markup e Dados Estruturados
5. Sitemap Dinâmico
6. Robots.txt
7. Configuração de URLs
8. Páginas Client-Side e SEO
9. Impactos e Resultados Esperados
10. Manutenção e Modificações Futuras
11. Ferramentas de Monitorização

---

## Introdução

Este documento detalha todas as implementações de SEO (Search Engine Optimization) realizadas no portfolio pessoal de Carlos Bicho. O objetivo é garantir máxima visibilidade nos motores de busca, melhorar a experiência de partilha em redes sociais e estabelecer uma presença digital profissional.

### Tecnologias Utilizadas

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** + shadcn/ui para styling
- **MDX** para conteúdo de blog
- **Vercel** para deployment

---

## Estrutura Global de SEO

### Layout Principal (layout.tsx)

O layout raiz define a estrutura SEO global que é herdada por todas as páginas:

```tsx
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calosbicho.pt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carlos Bicho - Desenvolvedor Full-Stack",
    template: "%s | Carlos Bicho",
  },
  description:
    "Desenvolvedor Full-Stack especializado em React, Next.js e TypeScript...",
  keywords: ["Carlos Bicho", "Desenvolvedor", "Full-Stack", "React", "Next.js"],
  authors: [{ name: "Carlos Bicho" }],
  creator: "Carlos Bicho",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Carlos Bicho - Portfolio",
    title: "Carlos Bicho - Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack especializado em React, Next.js e TypeScript...",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Bicho - Desenvolvedor Full-Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Bicho - Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack especializado em React, Next.js e TypeScript.",
    images: ["/og-image.jpg"],
  },
};
```

#### Elementos Chave:

**`metadataBase`**

- Define a URL base para todas as páginas
- Converte URLs relativas em absolutas automaticamente
- Essencial para OpenGraph e Twitter Cards

**`title.template`**

- Template dinâmico: `"Página | Carlos Bicho"`
- Homepage usa `default`
- Mantém consistência de branding

**`robots`**

- Instruções específicas para crawlers
- `googleBot` configurações avançadas
- Permite indexação completa

**`openGraph`**

- Controla como aparece quando partilhado
- Imagens 1200x630px para qualidade ótima
- Locale `pt_PT` para audiência portuguesa

---

## Metadados por Página

### Página Inicial (page.tsx)

```tsx
export const metadata: Metadata = {
  title: "Carlos Bicho - Desenvolvedor Full-Stack | Portfolio",
  description:
    "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack especializado em React, Next.js, TypeScript e tecnologias modernas. Explore meus projetos e experiência.",
  keywords: [
    "Carlos Bicho",
    "Portfolio",
    "Desenvolvedor Full-Stack",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Frontend",
    "Backend",
    "Web Development",
    "Portugal",
  ],
  openGraph: {
    title: "Carlos Bicho - Desenvolvedor Full-Stack | Portfolio",
    description:
      "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack especializado em React, Next.js, TypeScript e tecnologias modernas.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Bicho - Portfolio Homepage",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};
```

#### Estratégia de Keywords:

- **Primárias**: Carlos Bicho, Desenvolvedor Full-Stack
- **Secundárias**: React Developer, Next.js, TypeScript
- **Long-tail**: Portfolio pessoal desenvolvedor Portugal
- **Locais**: Portugal, Portuguese developer

### Página de Contacto (layout.tsx)

```tsx
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto comigo para discutir projetos, oportunidades de trabalho ou colaborações. Desenvolvedor Full-Stack disponível para freelance.",
  keywords: [
    "Carlos Bicho contacto",
    "desenvolvedor contacto",
    "freelancer Portugal",
    "React developer contacto",
    "Next.js developer Portugal",
    "web developer freelance",
    "projeto web contacto",
  ],
  openGraph: {
    title: "Contacto | Carlos Bicho - Desenvolvedor Full-Stack",
    description:
      "Entre em contacto para discutir seu próximo projeto web. Especializado em React, Next.js e TypeScript.",
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
    "geo.region": "PT",
    "geo.placename": "Portugal",
  },
};
```

#### Porque Layout em vez de Page:

- Página de contacto usa `"use client"` para formulários
- Client Components não podem exportar `metadata`
- Layout (Server Component) resolve este problema
- Mantém SEO + interatividade

---

## Schema Markup e Dados Estruturados

### Componente Schema (schema-markup.tsx)

#### PersonSchema - Homepage

```tsx
export function PersonSchema({
  name,
  jobTitle,
  url,
  image,
  email,
  sameAs = [],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    image,
    email,
    sameAs,
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full-Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelancer",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### WebsiteSchema - Estrutura do Site

```tsx
export function WebsiteSchema({ url, name }: { url: string; name: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    description:
      "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack especializado em React, Next.js e TypeScript.",
    inLanguage: "pt-PT",
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### ProjectSchema - Para Páginas de Projetos

```tsx
export function ProjectSchema({
  name,
  description,
  url,
  image,
  dateCreated,
  author,
  technologies,
}: ProjectSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    dateCreated,
    author: {
      "@type": "Person",
      name: author,
    },
    applicationCategory: "WebApplication",
    programmingLanguage: technologies,
    operatingSystem: "Web Browser",
  };

  return (
    <Script
      id="project-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### BlogPostSchema - Para Artigos

```tsx
export function BlogPostSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Person",
      name: author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image,
        }
      : undefined,
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Benefícios do Schema Markup:

**Rich Snippets**

- Informações extra nos resultados de busca
- Estrelas, imagens, datas, preços
- CTR (Click-Through Rate) mais alto

**Knowledge Graph**

- Aparição no painel de conhecimento do Google
- Autoridade e credibilidade
- Busca por voz otimizada

**Structured Data**

- Melhor compreensão do conteúdo
- Categorização automática
- Featured snippets

---

## Sitemap Dinâmico

### Implementação (sitemap.ts)

```tsx
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getAllProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calosbicho.pt";

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Páginas de projetos
  const projects = getAllProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Páginas de blog
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
```

### Estrutura de Prioridades:

| Página             | Prioridade | Frequência     | Razão                                    |
| ------------------ | ---------- | -------------- | ---------------------------------------- |
| Homepage           | 1.0        | Weekly         | Mais importante, atualizações frequentes |
| Projetos           | 0.9        | Weekly         | Showcase principal, novos projetos       |
| Sobre/Blog         | 0.8        | Weekly/Monthly | Conteúdo importante                      |
| Projeto Individual | 0.7        | Monthly        | Conteúdo específico                      |
| Contacto           | 0.7        | Monthly        | Conversão importante                     |
| Post Individual    | 0.6        | Monthly        | Conteúdo evergreen                       |

### Vantagens:

**Automático**

- Novos projetos/posts são incluídos automaticamente
- Datas de modificação reais
- URLs sempre atualizadas

**Otimizado**

- Prioridades baseadas na importância
- Frequências realistas
- Metadata completa

**Escalável**

- Suporta crescimento de conteúdo
- Performance mantida
- Fácil manutenção

---

## Robots.txt

### Configuração (robots.txt)

```txt
User-agent: *
Allow: /

# Disallow admin or private areas
Disallow: /api/
Disallow: /_next/
Disallow: /.well-known/

# Sitemap location
Sitemap: https://calosbicho.pt/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
```

### Explicação de Cada Regra:

**`User-agent: *`**

- Aplica-se a todos os bots de busca
- Google, Bing, DuckDuckGo, etc.

**`Allow: /`**

- Permite crawling de todo o site
- Override para qualquer disallow

**`Disallow: /api/`**

- Protege endpoints de API
- Evita indexação de dados JSON
- Melhora eficiência do crawling

**`Disallow: /_next/`**

- Exclui arquivos internos do Next.js
- CSS, JS, chunks não devem ser indexados
- Reduz crawl budget waste

**`Disallow: /.well-known/`**

- Exclui arquivos de configuração
- Certificados, manifestos, etc.
- Padrão de segurança

**`Sitemap: URL`**

- Localização do sitemap XML
- Descoberta automática por bots
- Indexação mais rápida

**`Crawl-delay: 1`**

- 1 segundo entre requests
- Evita sobrecarga do servidor
- Crawling mais respeitoso

---

## Configuração de URLs

### Variáveis de Ambiente (.env.local)

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://calosbicho.pt
NEXT_PUBLIC_SITE_NAME="Carlos Bicho - Portfolio"

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Email Configuration
RESEND_API_KEY=your_resend_api_key

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

### Importância da NEXT_PUBLIC_SITE_URL:

**URLs Absolutas**

- OpenGraph precisa de URLs completas
- Twitter Cards requerem URLs absolutas
- Schema markup usa URLs como IDs únicos

**Ambientes Múltiplos**

```bash
# Desenvolvimento
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Staging
NEXT_PUBLIC_SITE_URL=https://staging.calosbicho.pt

# Produção
NEXT_PUBLIC_SITE_URL=https://calosbicho.pt
```

**Uso no Código**

```tsx
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calosbicho.pt";

// Schema markup
<PersonSchema url={siteUrl} />;

// Sitemap
url: `${baseUrl}/projects/${project.slug}`;

// OpenGraph
images: [{ url: "/og-image.jpg" }]; // Automaticamente: https://calosbicho.pt/og-image.jpg
```

---

## Páginas Client-Side e SEO

### Problema Original:

```tsx
// ❌ ERRO: Client Component não pode ter metadata
"use client";

export const metadata: Metadata = {
  /* ... */
}; // Error!

export default function ContactPage() {
  // Hooks, formulários, interatividade...
}
```

### Solução Implementada:

#### Layout de Contacto (layout.tsx)

```tsx
// ✅ Server Component - pode ter metadata
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Entre em contacto comigo para discutir projetos...",
  // ... metadados completos
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Simplesmente passa o children
}
```

#### Página de Contacto (page.tsx)

```tsx
// ✅ Client Component - focado na interatividade
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// ... outros hooks

export default function ContactPage() {
  // Formulários, validação, state management...
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    // JSX do formulário
  );
}
```

### Hierarquia Final:

```
📁 app/
├── 📄 layout.tsx          (Server) - Metadados globais
├── 📁 contact/
│   ├── 📄 layout.tsx      (Server) - Metadados específicos
│   └── 📄 page.tsx        (Client) - Funcionalidades interativas
└── 📁 projects/
    ├── 📄 layout.tsx      (Server) - Metadados específicos
    └── 📄 page.tsx        (Client/Server) - Conforme necessário
```

### Vantagens desta Abordagem:

**SEO Mantido**

- Metadados funcionam perfeitamente
- Google indexa corretamente
- Social media mostra previews

**Interatividade Preservada**

- Formulários funcionam
- Hooks React disponíveis
- Estado local mantido

**Estrutura Limpa**

- Separação clara de responsabilidades
- Escalável para novas páginas
- Fácil manutenção

**Performance**

- Server Components são otimizados
- Client Components só onde necessário
- Bundle size menor

---

## Impactos e Resultados Esperados

### Timeline de Resultados:

#### Semana 1-2: Descoberta e Indexação

- ✅ URLs aparecem no Google Search Console
- ✅ Sitemap é processado pelos motores de busca
- ✅ Structured data é reconhecida (Rich Results Test)
- ✅ Social media previews funcionam corretamente

#### Mês 1: Indexação Completa

- ✅ Todas as páginas aparecem em `site:calosbicho.pt`
- ✅ Primeiras posições para "Carlos Bicho"
- ✅ Rich snippets começam a aparecer
- ✅ Impressões aumentam no GSC

#### Mês 2-3: Melhoria de Rankings

- ✅ Top 10 para keywords principais
- ✅ Featured snippets para perguntas técnicas
- ✅ Aumento de CTR orgânico
- ✅ Mais tráfego de busca

#### Mês 3-6: Estabelecimento de Autoridade

- ✅ Top 3 para "Carlos Bicho desenvolvedor"
- ✅ Rankings para termos técnicos (React, Next.js)
- ✅ Aumento de leads qualificados
- ✅ Reconhecimento como expert

#### Mês 6-12: Autoridade Consolidada

- ✅ Featured snippets regulares
- ✅ Knowledge panel no Google
- ✅ Top 1 para nome e variações
- ✅ Tráfego orgânico sustentável

### Métricas a Monitorizar:

#### Google Search Console:

- **Impressões**: Quantas vezes aparece nos resultados
- **Clicks**: Quantas pessoas clicam
- **CTR**: Click-through rate (objetivo: >5%)
- **Posição Média**: Rankings das keywords (objetivo: <10)

#### Google Analytics:

- **Organic Traffic**: Tráfego de busca orgânica
- **Session Duration**: Tempo no site (objetivo: >2min)
- **Bounce Rate**: Taxa de rejeição (objetivo: <60%)
- **Goal Conversions**: Contactos gerados

#### Keywords Alvo:

| Keyword                           | Volume  | Dificuldade | Objetivo |
| --------------------------------- | ------- | ----------- | -------- |
| Carlos Bicho                      | 100/mês | Baixa       | Top 1    |
| Desenvolvedor Full-Stack Portugal | 200/mês | Média       | Top 5    |
| React Developer Portugal          | 150/mês | Média       | Top 10   |
| Next.js Developer                 | 300/mês | Alta        | Top 20   |
| Portfolio Desenvolvedor           | 250/mês | Baixa       | Top 3    |

---

## Manutenção e Modificações Futuras

### Adicionando Nova Página:

#### 1. Página Estática (Server Component):

```tsx
// /src/app/nova-pagina/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Página",
  description: "Descrição da nova página...",
  keywords: ["keyword1", "keyword2"],
  alternates: { canonical: "/nova-pagina" },
};

export default function NovaPagina() {
  return <div>Conteúdo...</div>;
}
```

#### 2. Página Interativa (Client Component):

```tsx
// /src/app/nova-pagina/layout.tsx (SEO)
export const metadata: Metadata = {
  /* metadados */
};

// /src/app/nova-pagina/page.tsx (Interatividade)
("use client");
export default function NovaPagina() {
  // Hooks, estado, interatividade...
}
```

#### 3. Atualizar Sitemap:

```tsx
// /src/app/sitemap.ts
const staticPages = [
  // ... páginas existentes
  {
    url: `${baseUrl}/nova-pagina`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];
```

### Adicionando Novo Projeto:

#### Automático (Recomendado):

```tsx
// /src/data/projects.ts
export const projects = [
  // ... projetos existentes
  {
    title: "Novo Projeto",
    slug: "novo-projeto",
    description: "Descrição do projeto...",
    date: "2024-01-15",
    // ... outros campos
  },
];
```

**Resultado**: Sitemap atualiza automaticamente!

#### Manual (Para casos especiais):

```tsx
// /src/app/projects/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  return {
    title: project.title,
    description: project.description,
    // ... metadados específicos
  };
}
```

### Mudança de Domínio:

#### 1. Atualizar Variável:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://novo-dominio.com
```

#### 2. Redirecionamentos 301:

```tsx
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "calosbicho.pt" }],
        destination: "https://novo-dominio.com/:path*",
        permanent: true,
      },
    ];
  },
};
```

#### 3. Google Search Console:

- Adicionar nova propriedade
- Configurar change of address
- Monitorizar transferência

### Adicionando Idiomas:

#### 1. Estrutura de Pastas:

```
📁 app/
├── 📁 [locale]/
│   ├── 📁 pt/
│   │   ├── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   └── 📁 en/
│       ├── 📄 page.tsx
│       └── 📄 layout.tsx
```

#### 2. Hreflang Tags:

```tsx
// layout.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "pt-PT": "/pt",
      "en-US": "/en",
    },
  },
};
```

#### 3. Sitemap Multi-idioma:

```tsx
// sitemap.ts
const languages = ["pt", "en"];
const pages = [];

languages.forEach((lang) => {
  staticPages.forEach((page) => {
    pages.push({
      url: `${baseUrl}/${lang}${page.path}`,
      lastModified: page.lastModified,
      // ...
    });
  });
});
```

---

## Ferramentas de Monitorização

### Google Search Console

**Configuração Inicial:**

1. Adicionar propriedade: `https://calosbicho.pt`
2. Verificar propriedade (DNS ou HTML)
3. Submeter sitemap: `/sitemap.xml`
4. Configurar geographic target: Portugal

**Relatórios Importantes:**

- **Performance**: Keywords, clicks, impressões
- **Coverage**: Páginas indexadas/erro
- **Sitemaps**: Status do sitemap
- **Manual Actions**: Penalizações

**URLs de Teste:**

- GSC: `https://search.google.com/search-console`
- Inspection Tool: Testar URLs individuais
- Performance Report: Analisar keywords

### Rich Results Test

**Teste de Schema Markup:**

```bash
# URL de teste
https://search.google.com/test/rich-results

# Testar URLs:
https://calosbicho.pt/
https://calosbicho.pt/projects/nome-projeto
https://calosbicho.pt/blog/nome-post
```

**O que Verificar:**

- ✅ PersonSchema válido
- ✅ WebsiteSchema sem erros
- ✅ ProjectSchema reconhecido
- ✅ BlogPostSchema completo

### Social Media Debuggers

#### Facebook Sharing Debugger:

```bash
https://developers.facebook.com/tools/debug/

# Testar:
- OpenGraph tags
- Image resolution
- Description length
```

#### Twitter Card Validator:

```bash
https://cards-dev.twitter.com/validator

# Verificar:
- Card type
- Image format
- Title/description
```

#### LinkedIn Post Inspector:

```bash
https://www.linkedin.com/post-inspector/

# Validar:
- Professional presentation
- Logo/image quality
- Company information
```

### PageSpeed Insights

**Core Web Vitals:**

```bash
https://pagespeed.web.dev/

# Métricas:
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1
```

**SEO Score:**

- Meta descriptions: ✅
- Title tags: ✅
- Crawlable links: ✅
- Image alt text: ✅

### Analytics Setup

#### Google Analytics 4:

```tsx
// /src/app/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
    </html>
  );
}
```

#### Eventos Personalizados:

```tsx
// Contact form submission
gtag("event", "contact_form_submit", {
  event_category: "engagement",
  event_label: "contact_page",
});

// Project view
gtag("event", "project_view", {
  event_category: "engagement",
  event_label: project.title,
});
```

### Monitorização Automatizada

#### GitHub Actions (Opcional):

```yaml
# .github/workflows/seo-check.yml
name: SEO Health Check
on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 9 AM

jobs:
  seo-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://calosbicho.pt
            https://calosbicho.pt/contact
            https://calosbicho.pt/projects
```

#### Uptime Monitoring:

- **UptimeRobot**: Monitorização gratuita
- **Pingdom**: Alertas de downtime
- **StatusCake**: Performance monitoring

---

## Conclusão

Esta implementação de SEO fornece uma base sólida para:

✅ **Descoberta**: Sitemap automático e robots.txt otimizado  
✅ **Indexação**: Metadados completos e structured data  
✅ **Rankings**: Keywords estratégicas e conteúdo otimizado  
✅ **Conversões**: Páginas de contacto SEO-friendly  
✅ **Monitorização**: Ferramentas de acompanhamento  
✅ **Escalabilidade**: Sistema automático e sustentável

O sistema é **mantido automaticamente** e **escala conforme** o conteúdo cresce, garantindo visibilidade contínua nos motores de busca e presença digital profissional.

### Próximos Passos Recomendados:

1. **Imagens OpenGraph**: Criar imagens personalizadas 1200x630px
2. **Google My Business**: Perfil local para SEO português
3. **Backlinks**: Estratégia de link building
4. **Content Marketing**: Blog posts regulares
5. **Analytics Avançado**: Conversion tracking
6. **Performance**: Core Web Vitals optimization

---

**Documento criado em**: Janeiro 2024  
**Versão**: 1.0  
**Autor**: Documentação do projeto Portfolio Carlos Bicho  
**Tecnologia**: Next.js 14 + TypeScript + Tailwind CSS

```markdown

```
