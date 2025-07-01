"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { DataTable } from "../components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useDebounce } from "../hooks/useDebounce";
import { toast } from "sonner";

// ===== TIPOS =====
type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
};

// ===== ANIMAÇÕES =====
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ===== DADOS MOCK =====
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Como criar um blog profissional com Next.js e Supabase",
    slug: "blog-nextjs-supabase",
    published: true,
    created_at: "2025-06-30T10:00:00Z",
  },
  {
    id: "2",
    title: "Dicas para evoluir na carreira de programador",
    slug: "dicas-carreira-programador",
    published: true,
    created_at: "2025-06-30T08:00:00Z",
  },
  {
    id: "3",
    title: "Guia completo de TypeScript para iniciantes",
    slug: "guia-typescript-iniciantes",
    published: false,
    created_at: "2025-06-29T15:30:00Z",
  },
];

export default function AdminPostsPage() {
  // ===== ESTADOS =====
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ← Começa loading
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ===== DEBOUNCE =====
  const debouncedSearch = useDebounce(search, 300);

  // ===== SIMULAR CARREGAMENTO DE DADOS =====
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);

      // Simula delay de API (2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // "Carrega" os dados mock
      setPosts(mockPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []); // Executa só uma vez no mount

  // ===== FILTROS COMPUTADOS =====
  const filteredPosts = useMemo(() => {
    if (isLoading) return []; // ← Retorna array vazio durante loading

    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        statusFilter === "todos" ||
        (statusFilter === "published" && post.published) ||
        (statusFilter === "draft" && !post.published);

      return matchesSearch && matchesStatus;
    });
  }, [posts, debouncedSearch, statusFilter, isLoading]);

  // ===== HANDLERS =====
  const deletePost = async (id: string) => {
    setIsLoading(true);

    // Simula delete API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove post do estado
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setIsLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    toast.success("Post removido com sucesso!");
  };

  const handleExportData = () => {
    // Lógica para exportar dados
    toast.success("Dados exportados!");
  };

  // ===== COLUNAS DA TABELA =====
  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Eye className="h-3 w-3" />0 visualizações
          </div>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-2 py-1 rounded">
          {row.original.slug}
        </code>
      ),
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.published ? "default" : "secondary"}
          className={`text-xs font-medium ${
            row.original.published
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
          }`}
        >
          {row.original.published ? "Publicado" : "Rascunho"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Criado em",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.created_at).toLocaleDateString("pt-PT")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Editar"
                asChild
                disabled={isLoading} // ← Disable durante loading
              >
                <Link href={`/admin/blog/edit/${row.original.id}`}>
                  <Edit className="w-4 h-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Editar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Apagar"
                disabled={isLoading} // ← Disable durante loading
                onClick={() => handleDeletePost(row.original.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Apagar</TooltipContent>
          </Tooltip>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ===== HEADER ===== */}
      <motion.div variants={cardVariants}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Posts
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Gestão de artigos e conteúdo do blog
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button asChild disabled={isLoading}>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Post
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== FILTROS E AÇÕES ===== */}
      <motion.div variants={cardVariants}>
        <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por título..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={isLoading} // ← Disable durante loading
                />
              </div>

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                disabled={isLoading} // ← Disable durante loading
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                disabled={isLoading} // ← Disable durante loading
              >
                <Download className="h-4 w-4 mr-2" />
                {isLoading ? "Exportando..." : "Exportar"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== TABELA SEM CARD WRAPPER ===== */}
      <motion.div variants={cardVariants}>
        <DataTable
          columns={columns}
          data={filteredPosts}
          totalCount={filteredPosts.length}
          page={page}
          pageSize={pageSize}
          isLoading={isLoading}
          enableSelection={true}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          emptyMessage={
            isLoading ? "Carregando posts..." : "Nenhum post encontrado."
          }
        />
      </motion.div>
    </motion.div>
  );
}
