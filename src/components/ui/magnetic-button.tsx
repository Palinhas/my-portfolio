/**
 * @fileoverview Magnetic Button Component
 * 
 * Implementa um botão com efeito magnético que segue o cursor do mouse.
 * Utiliza física realista com springs do Framer Motion para suavidade.
 * 
 * @author Carlos Bicho
 * @version 2.0.0
 * @since 2025-01-29
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Propriedades do componente MagneticButton
 * 
 * @interface MagneticButtonProps
 */
interface MagneticButtonProps {
  /** Conteúdo do botão (texto, ícones, etc.) */
  children: React.ReactNode;
  
  /** 
   * Força do efeito magnético (0-1)
   * @default 0.3
   * @example
   * strength={0.5} // Efeito médio
   * strength={0.8} // Efeito forte
   */
  strength?: number;
  
  /** 
   * Distância de ativação em pixels
   * @default 100
   * @example
   * distance={150} // Ativa a 150px do centro
   */
  distance?: number;
  
  /** Classes CSS adicionais */
  className?: string;
  
  /** Propriedades HTML do button */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * MagneticButton - Botão com efeito magnético avançado
 * 
 * Este componente cria um botão que "atrai" o cursor quando está próximo,
 * simulando um campo magnético com física realista.
 * 
 * ## Funcionalidades
 * - ✅ Efeito magnético suave com springs
 * - ✅ Configurável (força e distância)
 * - ✅ Performance otimizada
 * - ✅ Acessibilidade mantida
 * - ✅ TypeScript strict
 * 
 * ## Algoritmo do Efeito Magnético
 * 1. Detecta posição do mouse globalmente
 * 2. Calcula distância do centro do botão
 * 3. Se dentro da zona de ativação:
 *    - Calcula força baseada na distância
 *    - Aplica transformação X/Y proporcional
 * 4. Usa springs para suavizar movimento
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <MagneticButton>
 *   <Button>Clique aqui</Button>
 * </MagneticButton>
 * 
 * // Configuração avançada
 * <MagneticButton 
 *   strength={0.5} 
 *   distance={150}
 *   className="custom-class"
 * >
 *   <Button variant="outline">Botão Magnético</Button>
 * </MagneticButton>
 * ```
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element - Botão com efeito magnético
 */
export function MagneticButton({
  children,
  strength = 0.3,
  distance = 100,
  className,
  type = "button",
  disabled = false,
  onClick,
  ...buttonProps
}: MagneticButtonProps) {
  // ===== REFS E STATE =====
  
  /** Referência para o elemento DOM do botão */
  const ref = useRef<HTMLButtonElement>(null);
  
  /** Estado da posição do mouse relativa ao botão (para debugging/analytics futuro) */
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  
  /** Estado se o mouse está na zona de ativação */
  const [isHovered, setIsHovered] = useState(false);

  // ===== SPRINGS PARA ANIMAÇÃO SUAVE =====
  
  /** 
   * Configuração dos springs para movimento suave
   * - damping: Controla a "fricção" (maior = menos oscilação)
   * - stiffness: Controla a "rigidez" (maior = mais rápido)
   */
  const springConfig = { damping: 20, stiffness: 300 };
  
  /** Spring para movimento horizontal */
  const x = useSpring(0, springConfig);
  
  /** Spring para movimento vertical */
  const y = useSpring(0, springConfig);

  // ===== LÓGICA DO EFEITO MAGNÉTICO =====
  
  useEffect(() => {
    /**
     * Handler para movimento do mouse
     * 
     * Algoritmo:
     * 1. Obtém posição e dimensões do botão
     * 2. Calcula centro do botão
     * 3. Calcula distância do mouse ao centro
     * 4. Se dentro da zona de ativação:
     *    - Calcula força baseada na distância
     *    - Aplica transformação proporcional
     * 5. Atualiza springs para movimento suave
     * 
     * @param e - Evento de movimento do mouse
     */
    const handleMouseMove = (e: MouseEvent) => {
      // Verificação de segurança - elemento existe?
      if (!ref.current) return;

      // 1. Obter dimensões e posição do botão
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 2. Calcular distância do mouse ao centro
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      // 3. Verificar se está na zona de ativação
      if (distanceFromCenter < distance) {
        // DENTRO DA ZONA - Aplicar efeito magnético
        setIsHovered(true);
        
        // Calcular força (mais próximo = mais forte)
        const force = (distance - distanceFromCenter) / distance;
        
        // Aplicar transformação com força e strength
        x.set(deltaX * strength * force);
        y.set(deltaY * strength * force);
        
        // Atualizar posição para debugging/analytics
        setMousePosition({ x: deltaX, y: deltaY });
      } else {
        // FORA DA ZONA - Resetar posição
        setIsHovered(false);
        x.set(0);
        y.set(0);
        setMousePosition({ x: 0, y: 0 });
      }
    };

    // Adicionar listener global de mouse
    document.addEventListener("mousemove", handleMouseMove);
    
    // Cleanup - remover listener quando componente desmonta
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, strength, distance]); // Dependências do effect

  // ===== RENDER =====
  
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ 
        x, // Spring horizontal
        y  // Spring vertical
      }}
      className={cn(
        // Classes base do botão
        "relative inline-flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        
        // Estados condicionais
        isHovered && "shadow-consistent-glow", // Glow quando ativo
        disabled && "opacity-50 cursor-not-allowed", // Estado desabilitado
        
        // Classes customizadas
        className
      )}
      // Animações adicionais do Framer Motion
      whileHover={{ scale: 1.05 }} // Escala no hover
      whileTap={{ scale: 0.95 }}   // Escala no click
      // Transição suave para escala
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...buttonProps}
    >
      {/* Container do conteúdo */}
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
      
      {/* Efeito de glow (opcional) */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-lg blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

/**
 * Hook personalizado para usar o MagneticButton
 * 
 * @example
 * ```tsx
 * const { magneticProps, isActive } = useMagneticButton({
 *   strength: 0.4,
 *   distance: 120
 * });
 * ```
 */
export function useMagneticButton(options?: Partial<MagneticButtonProps>) {
  // Implementação futura do hook
  return {
    magneticProps: options,
    isActive: false
  };
}

// ===== EXPORTS ADICIONAIS =====

/** Tipo para configuração do efeito magnético */
export type MagneticConfig = Pick<MagneticButtonProps, 'strength' | 'distance'>;

/** Configurações pré-definidas para diferentes casos de uso */
export const magneticPresets = {
  /** Efeito sutil para botões secundários */
  subtle: { strength: 0.2, distance: 80 } as MagneticConfig,
  
  /** Efeito padrão para botões primários */
  default: { strength: 0.3, distance: 100 } as MagneticConfig,
  
  /** Efeito intenso para CTAs importantes */
  intense: { strength: 0.5, distance: 150 } as MagneticConfig,
  
  /** Efeito dramático para elementos especiais */
  dramatic: { strength: 0.8, distance: 200 } as MagneticConfig,
} as const;
