"use client";

import AdminSidebar from "./components/AdminSidebar";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "./components/ui/tooltip"; // ← ADICIONAR
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ===== QUERY CLIENT =====
  // Cria instância do QueryClient apenas uma vez por layout
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configurações optimizadas para admin dashboard
            staleTime: 1000 * 60 * 5, // 5 minutos - dados ficam fresh
            gcTime: 1000 * 60 * 10, // 10 minutos - garbage collection
            retry: 2, // Retry em caso de erro
            refetchOnWindowFocus: false, // Não refetch ao voltar à tab
            refetchOnMount: true, // Refetch ao montar componente
          },
          mutations: {
            // Configurações para mutations (create, update, delete)
            retry: 1, // Retry uma vez se falhar
          },
        },
      })
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ===== PROVIDERS STACK ===== */}
      {/* React Query Provider - dados server state */}
      <QueryClientProvider client={queryClient}>
        {/* Tooltip Provider - tooltips globais para admin */}
        <TooltipProvider delayDuration={300} skipDelayDuration={100}>
          <div className="flex">
            {/* ===== SIDEBAR COMPONENT ===== */}
            <AdminSidebar />

            {/* ===== MAIN CONTENT ===== */}
            <main className="flex-1 lg:ml-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="container mx-auto px-4 py-6 lg:py-8"
              >
                {children}
              </motion.div>
            </main>
          </div>

          {/* ===== REACT QUERY DEVTOOLS ===== */}
          {/* Configuração optimizada para admin dashboard */}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools
              initialIsOpen={false} // Fechado por padrão
              position="bottom" // Panel na parte inferior
              buttonPosition="bottom-right" // Botão no canto inferior direito
            />
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}
