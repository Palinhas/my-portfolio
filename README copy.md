# 🚀 Carlos Bicho - Portfolio Professional

Portfolio pessoal desenvolvido com as mais recentes tecnologias web, focado em performance e experiência do utilizador.

## ⚡ Performance Lighthouse

- **Performance:** 99/100
- **Accessibility:** 96/100
- **Best Practices:** 100/100
- **SEO:** 100/100

## 🛠️ Stack Tecnológico Completo

### Core Framework

- **Next.js 14** - App Router com RSC (React Server Components)
- **TypeScript 5+** - Type safety e IntelliSense
- **React 18** - Concurrent features e Suspense

### Styling & UI

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **CSS Variables** - Design tokens para consistência
- **clsx** - Conditional className utilities
- **Lucide React** - Icons SVG otimizados

### Content Management ⚡ **MIGRAÇÃO EM CURSO**

- ~~**MDX** - Markdown + JSX para blog posts~~ → **Supabase PostgreSQL**
- ~~**Gray Matter** - YAML frontmatter parsing~~ → **Database Schema**
- **Reading Time** - Cálculo automático de tempo de leitura
- **Date-fns** - Manipulação de datas (lightweight)

### **🆕 Database & Backend**

- **Supabase** - PostgreSQL + Auth + Storage + Edge Functions
- **Supabase Auth** - Social login (GitHub, Google, LinkedIn)
- **Row Level Security** - Proteção de dados
- **Real-time subscriptions** - Comments e analytics live

### Performance & SEO

- **Next.js Image** - Otimização automática de imagens
- **Metadata API** - SEO dinâmico por página (agora via Supabase)
- **Font Optimization** - Local fonts com display swap
- **Code Splitting** - Lazy loading automático

### Development Tools

- **ESLint** - Linting com regras Next.js
- **Prettier** - Code formatting
- **Husky** - Git hooks (se configurado)
- **TypeScript Strict** - Maximum type safety

## 🏗️ **NOVA ARQUITETURA: Portfolio + Admin Dashboard**

### **Estrutura Isolada com Route Groups**

```
src/
├── app/
│   ├── (public)/           # 🌐 PORTFOLIO PÚBLICO
│   │   ├── layout.tsx      # Layout do portfolio
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/           # Blog dinâmico (Supabase)
│   │   ├── projects/       # Projetos
│   │   └── contact/        # Contacto
│   │
│   ├── (admin)/            # 🔒 DASHBOARD ADMINISTRATIVO
│   │   ├── layout.tsx      # Layout do admin (isolado)
│   │   ├── admin/
│   │   │   ├── page.tsx    # Dashboard overview
│   │   │   ├── blog/       # ✅ CRUD de posts
│   │   │   ├── projects/   # ✅ Gestão de projetos
│   │   │   ├── analytics/  # 📊 Métricas em tempo real
│   │   │   └── settings/   # ⚙️ Configurações
│   │   └── login/          # 🔐 Login admin
│   │
├── components/
│   ├── public/             # Componentes do portfolio
│   ├── admin/              # 🆕 Componentes do dashboard
│   └── shared/             # Componentes partilhados
└── lib/
    ├── supabase.ts         # 🆕 Cliente Supabase
    ├── auth.ts             # 🆕 Lógica de autenticação
    └── utils.ts            # Utilities
```

### **📊 Database Schema (Supabase)**

```sql
-- Posts dinâmicos (substitui MDX files)
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,          -- Markdown content
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Comments system
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analytics tracking
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🔄 **MIGRAÇÃO PLANEADA: MDX → Supabase**

### **Fase 1: Setup Supabase** ✅ **PRÓXIMO**

```bash
# 1. Criar projeto Supabase
# 2. Configurar variáveis ambiente
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 3. Instalar dependências
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

### **Fase 2: Admin Dashboard** 🔄 **EM DESENVOLVIMENTO**

- [x] Layout isolado para admin
- [ ] **CRUD de posts** com editor MDX
- [ ] **Upload de imagens** para Supabase Storage
- [ ] **Preview em tempo real** dos posts
- [ ] **Gestão de tags** e categorias
- [ ] **Analytics dashboard** com métricas

### **Fase 3: Blog Público Dinâmico** 📅 **PLANEADO**

- [ ] **Migrar blog** de MDX files → Supabase queries
- [ ] **SEO dinâmico** com metadata do database
- [ ] **Sistema de comments** com social login
- [ ] **Search functionality** nos posts
- [ ] **Related posts** baseado em tags

### **Fase 4: Features Avançadas** 🎯 **FUTURO**

- [ ] **Newsletter integration** com Supabase Edge Functions
- [ ] **Social media auto-sharing** quando publicar posts
- [ ] **Analytics avançadas** (reading completion, engagement)
- [ ] **Content scheduling** para posts futuros

## 🚀 **Vantagens da Nova Arquitetura**

### **🎯 Para Objetivos Profissionais:**

- ✅ **Portfolio dinâmico** sem deploys constantes
- ✅ **Admin dashboard profissional** mostra full-stack skills
- ✅ **Social login** demonstra integração com APIs
- ✅ **Real-time features** (comments, analytics)
- ✅ **Escalabilidade** para blog ativo

### **💰 Custo-Benefício:**

- ✅ **Supabase Free:** 500MB + 2GB bandwidth
- ✅ **Vercel Free:** 100GB bandwidth
- ✅ **Zero custos** para começar
- ✅ **Escalável** quando ganhar tráfego

### **🔧 Tecnicamente:**

- ✅ **Mesma stack** (Next.js + TypeScript)
- ✅ **Performance mantida** (99/100 Lighthouse)
- ✅ **SEO preservado** com metadata dinâmica
- ✅ **Deploy único** para portfolio + admin

## 🎨 Efeitos e Animações por Página

### 🏠 Homepage (`/`)

```tsx
// Efeitos implementados:
- **Hero Section:** Fade-in progressivo com delay
- **Cards de Projetos:** Hover effects com transform scale
- **Skills Grid:** Animação de entrada em cascata
- **Call-to-Action:** Pulse effect no botão principal
- **Scroll Reveal:** Elementos aparecem ao fazer scroll
```

### 📝 Blog Listing (`/blog`) ⚡ **MIGRAÇÃO PARA SUPABASE**

```tsx
// Efeitos implementados + novos:
- **Post Cards:** Hover com elevação (shadow + transform)
- **Filter Tags:** Active state com background transition
- 🆕 **Real-time views:** Counter atualizado automaticamente
- 🆕 **Loading States:** Skeleton placeholders para dados dinâmicos
- 🆕 **Search Animation:** Input com resultados em tempo real
```

### 📖 Blog Post (`/blog/[slug]`) ⚡ **DINÂMICO COM SUPABASE**

```tsx
// Efeitos implementados + novos:
- **Reading Progress:** Barra de progresso no topo
- **Table of Contents:** Sticky sidebar com highlight
- **Code Blocks:** Syntax highlighting + copy button
- 🆕 **Comments Section:** Real-time com social login
- 🆕 **View Counter:** Incrementa automaticamente
- 🆕 **Share Buttons:** Share count real-time
- 🆕 **Related Posts:** Baseado em tags do database
```

### 🔒 Admin Dashboard (`/admin`) 🆕 **NOVO**

```tsx
// Efeitos do painel administrativo:
- **Dashboard Cards:** Animated statistics
- **Table Interactions:** Row hover + selection
- **Form Validation:** Real-time feedback
- **Save States:** Loading spinners + success animations
- **Modal Transitions:** Smooth open/close
- **Drag & Drop:** Para reordenar posts/projetos
```

### 💼 Projetos/Portfolio

```tsx
// Efeitos implementados:
- **Project Gallery:** Masonry layout com lazy loading
- **Filter Animation:** Smooth transitions entre categorias
- **Modal/Lightbox:** Overlay com backdrop blur
- **Tech Stack Badges:** Hover tooltips
- **GitHub Integration:** Live stats fetching
```

### 📞 Contacto

```tsx
// Efeitos implementados:
- **Form Validation:** Real-time feedback
- **Success Animation:** Checkmark com scale effect
- **Input Focus:** Label floating animation
- **Send Button:** Loading spinner + disabled state
- **Social Links:** Bounce effect on hover
```

## ⚡ Micro-Interações Globais

### Navigation

```css
/* Efeitos do Header/Navigation */
.nav-link {
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: hsl(var(--primary));
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

### Dark Mode Toggle

```tsx
// Smooth transition entre themes
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease;
}

// Icon rotation animation
.theme-icon {
  transform-origin: center;
  transition: transform 0.5s ease;
}
```

### Scroll Effects

```tsx
// Header que desaparece/aparece no scroll
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  };
}, [lastScrollY]);
```

## 🔧 Tecnologias de Desenvolvimento Avançadas

### Build & Bundling

```javascript
// next.config.js otimizations
const nextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
    serverComponentsExternalPackages: ["mdx-bundler"],
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["your-supabase-project.supabase.co"], // 🆕 Supabase Storage
  },

  // Webpack customizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.vendor = {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
      };
    }
    return config;
  },
};
```

### Performance Monitoring

```tsx
// Web Vitals tracking + Supabase Analytics
export function reportWebVitals(metric) {
  console.log(metric);

  // 🆕 Send to Supabase for custom analytics
  supabase.from("performance_metrics").insert({
    name: metric.name,
    value: metric.value,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  if (metric.name === "FCP") {
    // First Contentful Paint
  }
  if (metric.name === "LCP") {
    // Largest Contentful Paint
  }
  if (metric.name === "CLS") {
    // Cumulative Layout Shift
  }
}
```

### SEO Advanced ⚡ **AGORA DINÂMICO**

```tsx
// Dynamic metadata generation from Supabase
export async function generateMetadata({ params }) {
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_image, tags, published_at")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  return {
    title: `${post.title} | Carlos Bicho`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover_image],
      type: "article",
      publishedTime: post.published_at,
      authors: ["Carlos Bicho"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover_image],
    },
    alternates: {
      canonical: `https://calosbicho.pt/blog/${params.slug}`,
    },
  };
}
```

## 📊 Analytics & Monitoring

### Performance Tracking

- **Core Web Vitals:** FCP, LCP, CLS, FID
- **Bundle Analysis:** Webpack bundle analyzer
- **Lighthouse CI:** Automated performance testing
- **Real User Monitoring:** Performance API
- 🆕 **Supabase Analytics:** Custom metrics e user behavior

### User Analytics ⚡ **REAL-TIME**

- 🆕 **Page Views:** Tracking em tempo real no Supabase
- 🆕 **User Engagement:** Reading completion, comment interactions
- 🆕 **Post Performance:** Views, shares, reading time por post
- 🆕 **Admin Dashboard:** Métricas visualizadas em charts

## 🚀 Features Implementadas

### ✅ Concluídas

- [x] **Homepage responsiva** com animações
- [x] **Sistema de blog** com MDX (a migrar para Supabase)
- [x] **Dark mode** com persistência
- [x] **SEO otimizado** para todas as páginas
- [x] **Performance 99/100** no Lighthouse
- [x] **Acessibilidade** WCAG compliant
- [x] **Typography scale** consistente
- [x] **Mobile-first** responsive design

### 🔄 Em Desenvolvimento **MIGRAÇÃO SUPABASE**

- [x] **Database schema** definido
- [ ] **Admin dashboard** para gestão de conteúdo ⚡ **PRÓXIMO**
- [ ] **Blog dinâmico** com Supabase queries
- [ ] **Comments system** com social login
- [ ] **Search functionality** em posts
- [ ] **Upload de imagens** para Supabase Storage
- [ ] **Analytics dashboard** em tempo real

### 🎯 Roadmap Futuro

- [ ] **Newsletter integration** com Edge Functions
- [ ] **Social media auto-posting** quando publicar
- [ ] **Content scheduling** para posts futuros
- [ ] **PWA implementation** com service workers
- [ ] **Internationalization** (PT/EN)
- [ ] **Performance monitoring** dashboard

---

## 🎯 **OBJETIVOS PROFISSIONAIS**

Este portfolio foi desenhado para:

✅ **Demonstrar expertise técnica** com stack moderna  
✅ **Conseguir melhores oportunidades** de emprego  
✅ **Partilhar conhecimento** através de blog ativo  
✅ **Mostrar evolução** de ABAP OO → Full Stack React  
✅ **Networking profissional** com social features

**Target:** Posições Full Stack / Frontend React com salário superior

---

## 💡 Notas de Desenvolvimento

### Lessons Learned

- **Lighthouse optimization:** Reduzir unused JavaScript foi crucial
- **Image optimization:** AVIF format deu 30% de redução no bundle
- **Font loading:** Local fonts melhoraram FCP em 200ms
- **Code splitting:** Dynamic imports reduziram First Load JS
- 🆕 **Supabase migration:** Dados dinâmicos sem perder performance

### Best Practices Aplicadas

- **Component composition** over inheritance
- **Custom hooks** para lógica reutilizável
- **TypeScript strict mode** para type safety
- **Error boundaries** para error handling
- **Accessibility first** development approach
- 🆕 **Route groups** para separação clean de código
- 🆕 **Database-first design** com Supabase RLS

---

**Evoluindo constantemente - Portfolio + Admin Dashboard + Blog Dinâmico ❤️ por Carlos Bicho**

**🚀 Próximo: Setup Supabase + Admin Dashboard CRUD**
