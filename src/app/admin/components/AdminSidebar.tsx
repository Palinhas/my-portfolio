"use client";

import { useState } from "react";
import React from 'react'; // ← Para React.useEffect se não tens
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ===== TIPOS =====
interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  children?: NavigationItem[];
}

interface AdminSidebarProps {
  className?: string;
}

// ===== DADOS DE NAVEGAÇÃO =====
const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    badge: "12",
    children: [
      { label: "Todos os Posts", href: "/admin/blog", icon: FileText },
      { label: "Novo Post", href: "/admin/blog/new", icon: FileText },
      { label: "Categorias", href: "/admin/blog/categories", icon: FileText },
      { label: "Tags", href: "/admin/blog/tags", icon: FileText },
    ],
  },
  {
    label: "Projetos",
    href: "/admin/projects",
    icon: FolderOpen,
    badge: "6",
    children: [
      { label: "Todos os Projetos", href: "/admin/projects", icon: FolderOpen },
      { label: "Novo Projeto", href: "/admin/projects/new", icon: FolderOpen },
      {
        label: "Tecnologias",
        href: "/admin/projects/technologies",
        icon: FolderOpen,
      },
    ],
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    children: [
      { label: "Visão Geral", href: "/admin/analytics", icon: BarChart3 },
      { label: "Tráfego", href: "/admin/analytics/traffic", icon: BarChart3 },
      {
        label: "Conversões",
        href: "/admin/analytics/conversions",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Configurações",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { label: "Geral", href: "/admin/settings", icon: Settings },
      { label: "SEO", href: "/admin/settings/seo", icon: Settings },
      {
        label: "Integrações",
        href: "/admin/settings/integrations",
        icon: Settings,
      },
    ],
  },
];

// ===== ANIMAÇÕES =====
const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const overlayVariants: Variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// ===== COMPONENTE PRINCIPAL =====
export default function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // ===== FIX: State para desktop/mobile =====
  const [isDesktop, setIsDesktop] = useState(false);

  // ===== useEffect para detectar screen size APÓS hydration =====
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Primeira verificação
    checkScreenSize();
    
    // Listener para resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ===== HANDLERS =====
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavigationItem): boolean => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleNavigate = () => {
    setIsOpen(false);
  };

  // ===== COMPONENTE DE ITEM DE NAVEGAÇÃO =====
  const NavigationItem = ({
    item,
    index = 0,
    isChild = false,
  }: {
    item: NavigationItem;
    index?: number;
    isChild?: boolean;
  }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.href);
    const parentActive = isParentActive(item);

    if (hasChildren) {
      return (
        <motion.div
          custom={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between px-3 py-2 h-auto font-medium transition-all duration-200",
              parentActive
                ? "bg-primary/10 text-primary hover:bg-primary/15"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              isChild && "pl-8 text-sm"
            )}
            onClick={() => toggleExpanded(item.label)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-md font-medium">
                  {item.badge}
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-3 space-y-1"
              >
                {item.children?.map((child, childIndex) => (
                  <NavigationItem
                    key={child.href}
                    item={child}
                    index={childIndex}
                    isChild
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    return (
      <motion.div
        custom={index}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant={active ? "default" : "ghost"}
          className={cn(
            "w-full justify-start px-3 py-2 h-auto font-medium transition-all duration-200",
            active
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
            isChild && "pl-8 text-sm"
          )}
          asChild
          onClick={handleNavigate}
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
            {item.badge && !active && (
              <span className="ml-auto bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-md font-medium">
                {item.badge}
              </span>
            )}
          </Link>
        </Button>
      </motion.div>
    );
  };

  return (
    <>
      {/* ===== MOBILE TOGGLE BUTTON ===== */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* ===== MOBILE OVERLAY ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ===== SIDEBAR - FIX ===== */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={
          // ===== AGORA USA O STATE EM VEZ DE window =====
          isDesktop ? "open" : (isOpen ? "open" : "closed")
        }
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-background border-r shadow-xl",
          "lg:relative lg:translate-x-0 lg:shadow-sm lg:z-auto",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* ===== NAVIGATION ===== */}
          <nav className="flex-1 p-4 pt-16 lg:pt-6 overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <NavigationItem key={item.label} item={item} index={index} />
              ))}
            </div>
          </nav>

          {/* ===== FOOTER ===== */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
              size="sm"
              asChild
            >
              <Link href="/">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Voltar ao Portfolio
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
