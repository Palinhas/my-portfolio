"use client";

import { motion } from "framer-motion";
import { variants } from "@/lib/motion-tokens";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants.pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
