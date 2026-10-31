"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/** Inclina el contenido en 3D siguiendo el puntero, con un reflejo de luz */
export function TiltCard({ children, max = 14 }: { children: ReactNode; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.28), transparent 50%)`;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[22px] mix-blend-overlay" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}
