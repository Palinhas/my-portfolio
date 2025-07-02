"use client";

import { motion } from "framer-motion";
import { animationPresets } from "@/lib/motion-tokens";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={animationPresets.pageEnter.initial}
      animate={animationPresets.pageEnter.animate}
      transition={animationPresets.pageEnter.transition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
