/**
 * @fileoverview Motion Tokens System
 * 
 * Sistema unificado de animações e transições para o portfolio.
 * Define tokens reutilizáveis para durações, easings, springs e variants.
 * Garante consistência visual em todas as animações do projeto.
 * 
 * @author Carlos Bicho
 * @version 2.0.0
 * @since 2025-01-29
 * 
 * @example
 * ```tsx
 * import { motionTokens, variants } from '@/lib/motion-tokens'
 * 
 * // Usar duração padronizada
 * transition={{ duration: motionTokens.durations.normal }}
 * 
 * // Usar variant pré-construída
 * <motion.div variants={variants.staggerContainer}>
 * ```
 */

import type { Variants, Transition, Spring } from "framer-motion";

// ===== TIPOS TYPESCRIPT =====

/**
 * Configuração de duração para animações
 * Baseado em Material Design e Apple HIG
 */
export interface DurationTokens {
  /** Animações muito rápidas (0.15s) - micro-interactions */
  fast: number;
  /** Animações normais (0.3s) - padrão para a maioria dos casos */
  normal: number;
  /** Animações lentas (0.5s) - transições importantes */
  slow: number;
  /** Animações muito lentas (0.8s) - entrada de páginas */
  slower: number;
}

/**
 * Curvas de easing personalizadas
 * Baseado em easings.net e design systems modernos
 */
export interface EasingTokens {
  /** Easing suave para transições naturais */
  smooth: [number, number, number, number];
  /** Easing com bounce para elementos lúdicos */
  bounce: [number, number, number, number];
  /** Easing com spring para elementos interativos */
  spring: [number, number, number, number];
  /** Easing sharp para elementos que entram/saem */
  sharp: [number, number, number, number];
}

/**
 * Configurações de spring para física realista
 */
export interface SpringTokens {
  /** Spring suave para elementos delicados */
  gentle: Spring;
  /** Spring wobbly para elementos lúdicos */
  wobbly: Spring;
  /** Spring rígido para elementos responsivos */
  stiff: Spring;
  /** Spring muito rígido para snapping */
  snap: Spring;
}

/**
 * Sistema completo de motion tokens
 */
export interface MotionTokens {
  durations: DurationTokens;
  easings: EasingTokens;
  springs: SpringTokens;
}

// ===== IMPLEMENTAÇÃO DOS TOKENS =====

/**
 * Durações padronizadas para animações
 * 
 * Baseado em pesquisas de UX que mostram:
 * - < 0.1s: Imperceptível
 * - 0.1-0.2s: Instantâneo
 * - 0.2-0.5s: Rápido mas perceptível
 * - 0.5-1s: Lento mas aceitável
 * - > 1s: Muito lento (evitar)
 */
export const durations: DurationTokens = {
  fast: 0.15,    // Hover states, micro-interactions
  normal: 0.3,   // Botões, cards, modais
  slow: 0.5,     // Page transitions, large elements
  slower: 0.8,   // Complex animations, page loads
} as const;

/**
 * Curvas de easing para diferentes tipos de movimento
 * 
 * ## Smooth (ease-out-quart)
 * Movimento natural que desacelera suavemente.
 * Ideal para: elementos que entram, hover states
 * 
 * ## Bounce (back-out)
 * Movimento com pequeno overshoot no final.
 * Ideal para: botões, elementos lúdicos
 * 
 * ## Spring (ease-out-back)
 * Movimento que simula mola física.
 * Ideal para: elementos interativos, feedback
 * 
 * ## Sharp (ease-in-out-quart)
 * Movimento rápido no meio, suave nas pontas.
 * Ideal para: elementos que saem, transições de página
 */
export const easings: EasingTokens = {
  smooth: [0.25, 0.1, 0.25, 1],      // ease-out-quart
  bounce: [0.68, -0.55, 0.265, 1.55], // back-out
  spring: [0.175, 0.885, 0.32, 1.275], // ease-out-back
  sharp: [0.4, 0, 0.2, 1],           // ease-in-out-quart
} as const;

/**
 * Configurações de spring para física realista
 * 
 * ## Parâmetros:
 * - **stiffness**: Rigidez da mola (maior = mais rápido)
 * - **damping**: Amortecimento (maior = menos oscilação)
 * - **mass**: Massa do objeto (maior = mais inércia)
 * 
 * ## Casos de uso:
 * - **gentle**: Elementos delicados, text animations
 * - **wobbly**: Elementos lúdicos, success states
 * - **stiff**: Elementos responsivos, drag & drop
 * - **snap**: Elementos que "encaixam", toggles
 */
export const springs: SpringTokens = {
  gentle: { 
    stiffness: 120, 
    damping: 14,
    mass: 1
  },
  wobbly: { 
    stiffness: 180, 
    damping: 12,
    mass: 1
  },
  stiff: { 
    stiffness: 210, 
    damping: 20,
    mass: 1
  },
  snap: { 
    stiffness: 400, 
    damping: 25,
    mass: 1
  },
} as const;

/**
 * Objeto principal com todos os motion tokens
 * 
 * @example
 * ```tsx
 * // Usar duração
 * transition={{ duration: motionTokens.durations.normal }}
 * 
 * // Usar easing
 * transition={{ ease: motionTokens.easings.smooth }}
 * 
 * // Usar spring
 * transition={motionTokens.springs.gentle}
 * ```
 */
export const motionTokens: MotionTokens = {
  durations,
  easings,
  springs,
} as const;

// ===== VARIANTS PRÉ-CONSTRUÍDAS =====

/**
 * Variants para containers com stagger effect
 * 
 * Anima filhos em sequência com delay entre eles.
 * Cria efeito de "cascata" elegante.
 * 
 * @example
 * ```tsx
 * <motion.div
 *   variants={variants.staggerContainer}
 *   initial="hidden"
 *   animate="visible"
 * >
 *   <motion.div variants={variants.staggerItem}>Item 1</motion.div>
 *   <motion.div variants={variants.staggerItem}>Item 2</motion.div>
 * </motion.div>
 * ```
 */
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,    // Delay entre filhos
      delayChildren: 0.2,      // Delay inicial
      duration: durations.normal,
      ease: easings.smooth
    }
  }
};

/**
 * Variants para itens individuais em stagger
 * 
 * Movimento suave de baixo para cima com fade.
 * Funciona perfeitamente com staggerContainer.
 */
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth
    }
  }
};

/**
 * Variants para fade simples
 * 
 * Entrada/saída com apenas opacity.
 * Ideal para overlays, modais, tooltips.
 */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: durations.fast,
      ease: easings.smooth
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.sharp
    }
  }
};

/**
 * Variants para slide vertical
 * 
 * Movimento de baixo para cima.
 * Ideal para cards, sections, content blocks.
 */
export const slideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth
    }
  }
};

/**
 * Variants para slide horizontal
 * 
 * Movimento da esquerda para direita.
 * Ideal para navigation, sidebars, panels.
 */
export const slideRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth
    }
  }
};

/**
 * Variants para scale animation
 * 
 * Entrada com escala crescente.
 * Ideal para modais, popups, notifications.
 */
export const scale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", ...springs.gentle }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: durations.fast,
      ease: easings.sharp
    }
  }
};

/**
 * Variants para bounce animation
 * 
 * Entrada com efeito de bounce.
 * Ideal para success states, CTAs, elementos lúdicos.
 */
export const bounce: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", ...springs.wobbly }
  }
};

/**
 * Variants para rotação
 * 
 * Entrada com rotação suave.
 * Ideal para ícones, badges, elementos decorativos.
 */
export const rotate: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -180 
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: durations.slow,
      ease: easings.spring
    }
  }
};

/**
 * Objeto com todas as variants disponíveis
 * 
 * @example
 * ```tsx
 * import { variants } from '@/lib/motion-tokens'
 * 
 * <motion.div variants={variants.slideUp}>
 *   Content
 * </motion.div>
 * ```
 */
export const variants = {
  staggerContainer,
  staggerItem,
  fade,
  slideUp,
  slideRight,
  scale,
  bounce,
  rotate,
} as const;

// ===== UTILITY FUNCTIONS =====

/**
 * Cria uma transição customizada combinando tokens
 * 
 * @param duration - Duração da animação
 * @param easing - Curva de easing
 * @returns Objeto de transição do Framer Motion
 * 
 * @example
 * ```tsx
 * const customTransition = createTransition(
 *   motionTokens.durations.slow,
 *   motionTokens.easings.bounce
 * )
 * 
 * <motion.div transition={customTransition}>
 * ```
 */
export function createTransition(
  duration: number,
  easing: [number, number, number, number]
): Transition {
  return {
    duration,
    ease: easing
  };
}

/**
 * Cria um stagger personalizado
 * 
 * @param childrenDelay - Delay entre filhos
 * @param initialDelay - Delay inicial
 * @returns Configuração de stagger
 * 
 * @example
 * ```tsx
 * const customStagger = createStagger(0.05, 0.1)
 * 
 * <motion.div
 *   animate={{ opacity: 1 }}
 *   transition={customStagger}
 * >
 * ```
 */
export function createStagger(
  childrenDelay: number = 0.1,
  initialDelay: number = 0
): Transition {
  return {
    staggerChildren: childrenDelay,
    delayChildren: initialDelay
  };
}

/**
 * Utilitário para animações baseadas em scroll
 * 
 * @param offset - Offset para trigger da animação
 * @returns Configuração para useInView
 * 
 * @example
 * ```tsx
 * const controls = useAnimation()
 * const [ref, inView] = useInView(scrollAnimation())
 * 
 * useEffect(() => {
 *   if (inView) controls.start("visible")
 * }, [controls, inView])
 * ```
 */
export function scrollAnimation(offset: string = "-100px") {
  return {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: offset
  };
}

// ===== PRESETS PARA CASOS COMUNS =====

/**
 * Presets para animações comuns no portfolio
 * 
 * Combinações testadas e otimizadas para casos específicos.
 */
export const animationPresets = {
  /** Entrada de página principal */
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: durations.normal,
      ease: easings.smooth
    }
  },

  /** Hover de card/botão */
  cardHover: {
    whileHover: { 
      scale: 1.02,
      y: -2
    },
    transition: springs.gentle
  },

  /** Loading spinner */
  spinner: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  },

  /** Success notification */
  success: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", ...springs.wobbly }
  }
} as const;

// ===== EXPORTS =====

export default motionTokens;

/**
 * Type helpers para TypeScript
 */
export type MotionVariant = keyof typeof variants;
export type AnimationPreset = keyof typeof animationPresets;
