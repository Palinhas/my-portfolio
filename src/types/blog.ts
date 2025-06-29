import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// Tipo alias para limpeza
export type SerializedMDX = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

export interface BlogPost {
  title: string;
  date: string;
  excerpt?: string; // ← TORNAR OPCIONAL
  tags: string[];
  slug: string;
  readingTime: number;
  mdxSource: SerializedMDX;
  content: string;
}
