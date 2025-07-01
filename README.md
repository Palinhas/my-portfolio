# 🚀 Carlos Bicho - Portfolio 2025

> **Portfolio profissional de desenvolvedor full-stack com performance 100/100 no Lighthouse**

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Destaques

- 🏆 **Performance 100/100** - Lighthouse Score perfeito
- ⚡ **Next.js 15** com App Router e React 19
- 🎨 **Design System 2025** com Glassmorphism moderno
- 🌈 **OKLCH Colors** para consistência visual superior
- 📱 **Mobile-First** e totalmente responsivo
- ♿ **Acessibilidade 100/100** - WCAG 2.1 compliant
- 🔍 **SEO Perfeito** - Meta tags otimizadas em todas as páginas
- 🎭 **Framer Motion** - Animações fluidas e profissionais
- 🌙 **Dark/Light Mode** com transições suaves
- ⌨️ **Command Menu (⌘K)** - Navegação por teclado
- 🎯 **TypeScript Strict** - Type safety extrema

## 🎯 Performance Metrics

```
📊 Lighthouse Scores (Produção)
┌─────────────────┬─────────┐
│ Performance     │ 100/100 │
│ Accessibility   │ 100/100 │
│ Best Practices  │ 100/100 │
│ SEO             │ 100/100 │
└─────────────────┴─────────┘

⚡ Core Web Vitals
┌─────────────────┬─────────┐
│ First Paint     │   0.8s  │
│ LCP             │   1.2s  │
│ CLS             │   0.001 │
│ FID             │   12ms  │
└─────────────────┴─────────┘

📦 Bundle Sizes
┌─────────────────┬─────────┐
│ Homepage        │  22.2KB │
│ About           │   7.6KB │
│ Projects        │   7.0KB │
│ Blog            │   6.1KB │
│ Contact         │  31.4KB │
└─────────────────┴─────────┘
```

## 🛠️ Stack Tecnológica

### Core Framework
- **Next.js 15.3.4** - React framework de produção
- **React 19** - Biblioteca de UI com Server Components
- **TypeScript 5.3** - Type safety e developer experience

### Styling & UI
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **shadcn/ui** - Componentes modernos e acessíveis
- **Framer Motion** - Animações declarativas
- **OKLCH Colors** - Espaço de cor moderno
- **CSS Custom Properties** - Theming dinâmico

### Content & Data
- **MDX** - Markdown com componentes React
- **Gray Matter** - Frontmatter parsing
- **Date-fns** - Manipulação de datas
- **Supabase** - Backend-as-a-Service

### Developer Experience
- **ESLint** - Linting e code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript Strict** - Maximum type safety

### Performance & SEO
- **Next.js Image** - Otimização automática de imagens
- **Static Generation** - Pre-rendering para performance
- **Metadata API** - SEO otimizado
- **Sitemap Generation** - Indexação automática

## 🚀 Quick Start

```bash
# Clone o repositório
git clone https://github.com/carlosbicho/portfolio-2025.git

# Entre no diretório
cd portfolio-2025

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (pages)/           # Páginas principais
│   │   ├── about/         # Sobre mim
│   │   ├── projects/      # Portfolio de projetos
│   │   ├── blog/          # Blog técnico
│   │   └── contact/       # Contacto
│   ├── admin/             # Painel administrativo
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Homepage
├── components/            # Componentes reutilizáveis
│   ├── sections/          # Secções da homepage
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── ...
├── content/              # Conteúdo MDX
│   └── blog/            # Artigos do blog
├── lib/                 # Utilitários e configurações
│   ├── motion-tokens.ts # Sistema de animações
│   ├── mdx.ts          # Processamento MDX
│   └── utils.ts        # Utilitários gerais
└── types/              # Definições TypeScript
```

## 🎨 Design System

### Cores (OKLCH)
```css
/* Primary Colors */
--primary: oklch(50% 0.2 250);
--primary-foreground: oklch(98% 0.02 250);

/* Background System */
--background: oklch(98% 0.01 250);
--background-dark: oklch(16% 0.02 250);

/* Glassmorphism */
--glass-bg: oklch(from var(--background) l alpha / 0.8);
--glass-border: oklch(from var(--primary) l alpha / 0.2);
```

### Typography
```css
/* Fluid Typography */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
```

### Motion Tokens
```typescript
export const motionTokens = {
  durations: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  easings: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  }
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting com ESLint
npm run type-check   # Verificação TypeScript

# Análise
npm run analyze      # Análise do bundle
npm run lighthouse   # Audit Lighthouse
```

## 📈 Otimizações Implementadas

### Performance
- ✅ **Static Generation** para todas as páginas
- ✅ **Image Optimization** automática
- ✅ **Code Splitting** por rota
- ✅ **Tree Shaking** para bundle mínimo
- ✅ **Preloading** de recursos críticos

### SEO
- ✅ **Metadata dinâmica** por página
- ✅ **OpenGraph** tags completas
- ✅ **Structured Data** (JSON-LD)
- ✅ **Sitemap** automático
- ✅ **Canonical URLs**

### Acessibilidade
- ✅ **Semantic HTML** estruturado
- ✅ **ARIA labels** apropriados
- ✅ **Keyboard navigation** completa
- ✅ **Color contrast** WCAG AA
- ✅ **Screen reader** friendly

### Developer Experience
- ✅ **TypeScript strict** mode
- ✅ **ESLint** configurado
- ✅ **Hot reload** instantâneo
- ✅ **Error boundaries** implementadas
- ✅ **Git hooks** automáticos

## 🌟 Funcionalidades Especiais

### Command Menu (⌘K)
Sistema de navegação por teclado inspirado no VS Code:
- Navegação rápida entre páginas
- Mudança de tema
- Links para redes sociais
- Busca inteligente

### Magnetic Buttons
Botões com efeito magnético que seguem o cursor:
```typescript
const MagneticButton = ({ children, strength = 0.3, distance = 100 }) => {
  // Implementação com useSpring do Framer Motion
}
```

### Theme System
Sistema de temas com transições suaves:
- Light/Dark mode automático
- Persistência no localStorage
- Transições CSS customizadas
- Suporte a preferências do sistema

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático
git push origin main

# Preview deployments
git push origin feature-branch
```

### Manual
```bash
# Build de produção
npm run build

# Testar localmente
npm run start
```

## 📊 Monitoramento

### Analytics
- **Vercel Analytics** - Performance real-time
- **Google Analytics 4** - Comportamento do usuário
- **Lighthouse CI** - Monitoramento contínuo

### Error Tracking
- **Sentry** - Error monitoring
- **Console warnings** - Zero tolerância

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões são bem-vindas:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contacto

**Carlos Bicho** - Desenvolvedor Full-Stack

- 🌐 Website: [calosbicho.pt](https://calosbicho.pt)
- 💼 LinkedIn: [linkedin.com/in/carlosbicho](https://linkedin.com/in/carlosbicho)
- 📧 Email: carlos@calosbicho.pt
- 🐙 GitHub: [@carlosbicho](https://github.com/carlosbicho)

---

<div align="center">

**Feito com ❤️ em Portugal 🇵🇹**

*Portfolio que demonstra excelência técnica e atenção ao detalhe*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/carlosbicho/portfolio-2025)

</div>
