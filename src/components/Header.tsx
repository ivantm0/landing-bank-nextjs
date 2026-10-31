"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV } from "@/lib/nav";
import { Icon, Logo } from "./ui/Icon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const first = document.getElementById(NAV[0].id);
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      // Por encima de la primera sección enlazada no hay ninguna activa
      if (first && window.scrollY + window.innerHeight / 2 < first.offsetTop) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resalta en el menú la sección que se está viendo
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/80 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a href="#contenido" className="fixed -top-20 left-4 z-[60] rounded-lg bg-brand px-4 py-2 font-bold text-ink focus:top-4">
        Saltar al contenido
      </a>
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5" aria-label="Principal">
        <a href="#inicio" aria-label="Órbita, inicio">
          <Logo className="text-2xl" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === id ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/8" transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#empezar"
            className="hidden rounded-full bg-text px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            Abrir cuenta
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-18 bottom-0 bg-ink/95 px-5 pt-6 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-4 text-2xl font-bold hover:bg-white/5">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#empezar"
              onClick={() => setOpen(false)}
              className="mt-6 flex h-14 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-ink"
            >
              Abrir cuenta gratis
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
