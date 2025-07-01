"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Home,
  User,
  BookOpen,
  Mail,
  FolderOpen,
  Moon,
  Sun,
  Github,
  Linkedin,
  ArrowRight,
  Command,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: string;
  keywords?: string[];
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Comandos disponíveis
  const commands: Command[] = [
    // Navegação
    {
      id: "home",
      label: "Ir para Home",
      description: "Página principal",
      icon: Home,
      action: () => router.push("/"),
      category: "Navegação",
      keywords: ["home", "início", "principal"],
    },
    {
      id: "about",
      label: "Sobre Mim",
      description: "Conheça minha história",
      icon: User,
      action: () => router.push("/about"),
      category: "Navegação",
      keywords: ["sobre", "about", "biografia"],
    },
    {
      id: "projects",
      label: "Projetos",
      description: "Veja meus trabalhos",
      icon: FolderOpen,
      action: () => router.push("/projects"),
      category: "Navegação",
      keywords: ["projetos", "trabalhos", "portfolio"],
    },
    {
      id: "blog",
      label: "Blog",
      description: "Artigos e insights",
      icon: BookOpen,
      action: () => router.push("/blog"),
      category: "Navegação",
      keywords: ["blog", "artigos", "posts"],
    },
    {
      id: "contact",
      label: "Contacto",
      description: "Entre em contacto",
      icon: Mail,
      action: () => router.push("/contact"),
      category: "Navegação",
      keywords: ["contacto", "contato", "email"],
    },

    // Tema
    {
      id: "theme-light",
      label: "Tema Claro",
      description: "Mudar para modo claro",
      icon: Sun,
      action: () => setTheme("light"),
      category: "Tema",
      keywords: ["light", "claro", "dia"],
    },
    {
      id: "theme-dark",
      label: "Tema Escuro",
      description: "Mudar para modo escuro",
      icon: Moon,
      action: () => setTheme("dark"),
      category: "Tema",
      keywords: ["dark", "escuro", "noite"],
    },

    // Links Externos
    {
      id: "github",
      label: "GitHub",
      description: "Ver repositórios",
      icon: Github,
      action: () => window.open("https://github.com/carlosbicho", "_blank"),
      category: "Social",
      keywords: ["github", "código", "repos"],
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "Perfil profissional",
      icon: Linkedin,
      action: () =>
        window.open("https://linkedin.com/in/carlos-bicho-596b16114", "_blank"),
      category: "Social",
      keywords: ["linkedin", "perfil", "profissional"],
    },
  ];

  // Filtrar comandos baseado na busca
  const filteredCommands = commands.filter((command) => {
    const searchTerm = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchTerm) ||
      command.description?.toLowerCase().includes(searchTerm) ||
      command.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm)
      )
    );
  });

  // Agrupar comandos por categoria
  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command);
      return acc;
    },
    {} as Record<string, Command[]>
  );

  // Shortcuts de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K ou Ctrl+K para abrir
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      // ESC para fechar
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }

      // Navegação com setas
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const selectedCommand = filteredCommands[selectedIndex];
          if (selectedCommand) {
            selectedCommand.action();
            setIsOpen(false);
            setSearch("");
            setSelectedIndex(0);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Reset selection quando busca muda
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass border rounded-2xl overflow-hidden shadow-2xl">
            {/* Header com busca */}
            <div className="flex items-center gap-3 p-4 border-b border-border/50">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar comandos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                autoFocus
              />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 rounded border bg-muted/50">
                  ESC
                </kbd>
                <span>para fechar</span>
              </div>
            </div>

            {/* Lista de comandos */}
            <div className="max-h-96 overflow-y-auto p-2">
              {Object.keys(groupedCommands).length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum comando encontrado para &quot;{search}&quot;
                </div>
              ) : (
                Object.entries(groupedCommands).map(
                  ([category, categoryCommands]) => (
                    <div key={category} className="mb-4">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      <div className="space-y-1">
                        {categoryCommands.map((command) => {
                          const globalIndex = filteredCommands.indexOf(command);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = command.icon;

                          return (
                            <motion.button
                              key={command.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => {
                                command.action();
                                setIsOpen(false);
                                setSearch("");
                                setSelectedIndex(0);
                              }}
                              className={`
                              w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left
                              transition-all duration-200
                              ${
                                isSelected
                                  ? "bg-primary/10 border border-primary/20"
                                  : "hover:bg-accent/50"
                              }
                            `}
                            >
                              <Icon
                                className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                              />
                              <div className="flex-1 min-w-0">
                                <div
                                  className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
                                >
                                  {command.label}
                                </div>
                                {command.description && (
                                  <div className="text-sm text-muted-foreground truncate">
                                    {command.description}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <ArrowRight className="w-4 h-4 text-primary" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            {/* Footer com dicas */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-t border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border bg-background/50">
                    ↑↓
                  </kbd>
                  <span>navegar</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border bg-background/50">
                    Enter
                  </kbd>
                  <span>seleccionar</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>Menu de comandos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
