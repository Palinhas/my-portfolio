"use client";

import { motion, Variants } from "framer-motion"; // ← Adiciona Variants import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FolderOpen,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ===== DADOS MOCK =====
// Em produção estes dados viriam de APIs
const dashboardStats = {
  posts: {
    total: 12,
    published: 8,
    drafts: 4,
    thisMonth: 3,
  },
  projects: {
    total: 6,
    featured: 4,
    thisMonth: 1,
  },
  analytics: {
    totalViews: 2847,
    monthlyViews: 432,
    uniqueVisitors: 1203,
    bounceRate: 34,
  },
};

const recentActivity = [
  {
    id: 1,
    type: "post",
    title: "Como criar um blog profissional com Next.js",
    action: "Publicado",
    time: "2 horas atrás",
    icon: FileText,
  },
  {
    id: 2,
    type: "project",
    title: "Portfolio Website v2",
    action: "Atualizado",
    time: "1 dia atrás",
    icon: FolderOpen,
  },
  {
    id: 3,
    type: "analytics",
    title: "Relatório mensal de analytics",
    action: "Gerado",
    time: "3 dias atrás",
    icon: BarChart3,
  },
];

// ===== ANIMAÇÕES COM TIPOS CORRETOS =====
const containerVariants: Variants = {
  // ← Tipo específico
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
  // ← Tipo específico
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // ← String predefinida (não array)
    },
  },
};

// ===== COMPONENTE PRINCIPAL =====
export default function AdminDashboard() {
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
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Bem-vindo de volta! Aqui está o resumo da tua atividade.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Post
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="outline" asChild>
                <Link href="/admin/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== STATS GRID ===== */}
      <motion.div
        variants={cardVariants}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Posts Stats */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.posts.total}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">
                +{dashboardStats.posts.thisMonth} este mês
              </span>
            </div>
            <div className="mt-3 text-xs">
              <span className="text-green-600 font-medium">
                {dashboardStats.posts.published} publicados
              </span>
              {" • "}
              <span className="text-orange-600 font-medium">
                {dashboardStats.posts.drafts} rascunhos
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Projects Stats */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projetos
            </CardTitle>
            <FolderOpen className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.projects.total}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">
                +{dashboardStats.projects.thisMonth} este mês
              </span>
            </div>
            <div className="mt-3 text-xs">
              <span className="text-blue-600 font-medium">
                {dashboardStats.projects.featured} em destaque
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Stats */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visualizações
            </CardTitle>
            <Eye className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.analytics.totalViews.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">
                +{dashboardStats.analytics.monthlyViews} este mês
              </span>
            </div>
            <div className="mt-3 text-xs">
              <span className="text-blue-600 font-medium">
                {dashboardStats.analytics.uniqueVisitors.toLocaleString()}{" "}
                visitantes únicos
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Rejeição
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.analytics.bounceRate}%
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">
                -2% vs mês anterior
              </span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Excelente performance
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== RECENT ACTIVITY & QUICK LINKS ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div variants={cardVariants}>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="font-medium text-green-600">
                          {activity.action}
                        </span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/admin/activity">
                    Ver toda a atividade
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={cardVariants}>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Links Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <Link href="/admin/blog">
                      <FileText className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Gestão de Posts</div>
                        <div className="text-xs text-muted-foreground">
                          Criar, editar e gerir artigos
                        </div>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <Link href="/admin/projects">
                      <FolderOpen className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Portfolio</div>
                        <div className="text-xs text-muted-foreground">
                          Gerir projetos e trabalhos
                        </div>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <Link href="/admin/analytics">
                      <BarChart3 className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Analytics</div>
                        <div className="text-xs text-muted-foreground">
                          Estatísticas e relatórios
                        </div>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <Link href="/admin/settings">
                      <Calendar className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Configurações</div>
                        <div className="text-xs text-muted-foreground">
                          Preferências e definições
                        </div>
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
