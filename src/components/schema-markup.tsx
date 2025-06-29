import Script from "next/script";

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}

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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

interface ProjectSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  author: string;
  technologies: string[];
}

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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}

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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
