"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { BankCard, type CardTier } from "./ui/BankCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

const PLANS: { id: CardTier; name: string; price: string; tagline: string; perks: string[]; cashback: string }[] = [
  {
    id: "esencial",
    name: "Esencial",
    price: "0 €",
    tagline: "Todo lo básico, gratis para siempre.",
    cashback: "—",
    perks: ["Cuenta y tarjeta sin comisiones", "Pagos con el móvil", "2 retiradas gratis al mes en cajeros", "Huchas automáticas"],
  },
  {
    id: "plus",
    name: "Plus",
    price: "4,99 €",
    tagline: "Para quien viaja y quiere más control.",
    cashback: "0,5 %",
    perks: ["Todo lo de Esencial", "Retiradas ilimitadas en todo el mundo", "Seguro de viaje y de compras", "Tarjetas virtuales desechables"],
  },
  {
    id: "metal",
    name: "Metal",
    price: "12,99 €",
    tagline: "Tarjeta de metal y beneficios premium.",
    cashback: "1 %",
    perks: ["Todo lo de Plus", "Tarjeta de acero de 18 g", "Acceso a salas VIP en aeropuertos", "Gestor personal por chat"],
  },
];

export function CardPicker() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const plan = PLANS[selected];

  // Patrón de pestañas accesible: flechas, Inicio y Fin mueven el foco
  function onKey(e: KeyboardEvent) {
    const last = PLANS.length - 1;
    const next =
      e.key === "ArrowRight" ? (selected === last ? 0 : selected + 1)
      : e.key === "ArrowLeft" ? (selected === 0 ? last : selected - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="tarjetas" className="relative overflow-hidden py-28 md:py-36">
      <div className="glow top-1/3 -left-40 h-[460px] w-[460px] bg-brand" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tarjetas"
          title={<>Elige la tarjeta que <span className="text-gradient">encaja contigo</span></>}
          text="Cambia de plan cuando quieras, sin permanencia."
        />

        <Reveal className="mt-12">
          <div role="tablist" aria-label="Planes" className="inline-flex rounded-2xl border border-line bg-surface p-1.5" onKeyDown={onKey}>
            {PLANS.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={i === selected}
                aria-controls={`panel-${p.id}`}
                tabIndex={i === selected ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`relative rounded-xl px-5 py-2.5 font-semibold transition-colors ${i === selected ? "text-ink" : "text-muted hover:text-text"}`}
              >
                {i === selected && (
                  <motion.span layoutId="plan-pill" className="absolute inset-0 rounded-xl bg-text" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{p.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${plan.id}`}
          aria-labelledby={`tab-${plan.id}`}
          className="mt-10 grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="relative mx-auto w-full max-w-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, rotateY: -35, x: -40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 35, x: 40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1000 }}
              >
                <BankCard tier={plan.id} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-3xl border border-line bg-surface/80 p-8 backdrop-blur">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-extrabold">Órbita {plan.name}</h3>
                <p className="mt-1 text-muted">{plan.tagline}</p>
              </div>
              <p className="text-right">
                <span className="text-4xl font-extrabold" data-testid="plan-price">{plan.price}</span>
                <span className="text-muted"> /mes</span>
              </p>
            </div>
            <ul className="mt-8 grid gap-3">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-good/15 text-good">
                    <Icon name="check" size={14} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
              <span className="text-muted">Cashback en compras</span>
              <span className="font-bold">{plan.cashback}</span>
            </div>
            <a
              href="#empezar"
              className="mt-6 flex h-13 items-center justify-center rounded-2xl bg-brand font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95"
            >
              Quiero la {plan.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
