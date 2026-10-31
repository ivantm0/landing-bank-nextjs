"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Aparece desde abajo al entrar en pantalla */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      // Mismo estado inicial en servidor y cliente; con movimiento reducido la transición es instantánea
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
