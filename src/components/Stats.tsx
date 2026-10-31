"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1.2, decimals: 1, suffix: " M", label: "clientes confían en Órbita" },
  { value: 0, decimals: 0, suffix: " €", label: "de comisiones de mantenimiento" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "de valoración media en la app" },
  { value: 24, decimals: 0, suffix: "/7", label: "atención humana por chat" },
];

const fmt = (n: number, d: number) => n.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  // Siempre empieza en 0 para que el HTML del servidor y el del cliente coincidan
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setShown });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(shown, decimals)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Órbita en cifras" className="border-y border-line bg-surface/40">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="px-2 text-center md:border-l md:border-line md:first:border-0">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <Counter {...s} />
            </dd>
            <dd className="mt-2 text-sm text-muted">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
