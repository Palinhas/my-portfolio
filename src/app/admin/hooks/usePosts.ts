import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

type UsePostsOptions = {
  page?: number;
  pageSize?: number;
  published?: boolean;
  search?: string;
};

export function usePosts(options: UsePostsOptions = {}) {
  const { page = 1, pageSize = 10, published, search } = options;

  return useQuery({
    queryKey: ["posts", page, pageSize, published, search],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("id, title, slug, published, created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (typeof published === "boolean") {
        query = query.eq("published", published);
      }
      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data as Post[], count: count ?? 0 };
    },
    placeholderData: (prev) => prev, // Mantém dados anteriores durante paginação/filtros
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: PostInsert) => {
      const { error } = await supabase.from("posts").insert(post);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...update }: PostUpdate & { id: string }) => {
      const { error } = await supabase
        .from("posts")
        .update(update)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// Exportação CSV (client-side)
export function exportPostsToCSV(posts: Post[]) {
  const header = ["id", "title", "slug", "published", "created_at"];
  const rows = posts.map((p) =>
    [p.id, p.title, p.slug, p.published ? "Sim" : "Não", p.created_at].join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "posts.csv";
  a.click();
  URL.revokeObjectURL(url);
}
