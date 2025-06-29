export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  images?: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string; // ISO format: "2023-06-15"
  content?: string; // Markdown content for detailed view
}
