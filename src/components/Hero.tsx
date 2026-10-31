import { BankCard } from "./ui/BankCard";
import { Icon, type IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./TiltCard";

const CHIPS: { icon: IconName; title: string; amount: string; positive: boolean; className: string; delay: string }[] = [
  { icon: "bolt", title: "Nómina recibida", amount: "+2.150,00 €", positive: true, className: "-left-6 top-6 md:-left-14", delay: "0s" },
  { icon: "piggy", title: "Hucha · Viaje a Japón", amount: "+35,00 €", positive: true, className: "-right-4 top-1/2 md:-right-10", delay: "-2s" },
  { icon: "phone", title: "Pago con el móvil", amount: "−4,20 €", positive: false, className: "-bottom-12 -left-4 md:-left-10", delay: "-4s" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="glow -top-40 left-1/4 h-[520px] w-[520px] bg-brand-2" aria-hidden="true" />
      <div className="glow top-20 -right-40 h-[420px] w-[420px] bg-violet" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pr-3 pl-1.5 text-sm text-muted backdrop-blur transition-colors hover:border-brand/50"
            >
              <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-ink">Nuevo</span>
              Cuenta remunerada al 2,5 % TAE
              <Icon name="arrow" size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 text-5xl leading-[1.02] font-extrabold tracking-tight text-balance md:text-7xl">
              La banca que <span className="text-gradient">se mueve</span> contigo
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted text-pretty md:text-xl">
              Cuenta sin comisiones, tarjeta gratis y huchas que ahorran por ti. Ábrela desde el móvil en cinco minutos.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#empezar"
              className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-brand px-7 text-lg font-bold text-ink shadow-[0_10px_40px_-10px] shadow-brand/60 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Abrir cuenta gratis
              <Icon name="arrow" className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#calculadora"
              className="inline-flex h-14 items-center rounded-2xl border border-line bg-surface/60 px-7 text-lg font-semibold backdrop-blur transition-colors hover:bg-surface-2"
            >
              Calcula tu ahorro
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {["Sin comisiones", "Tarjeta física y virtual", "Alta 100 % online"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" size={16} className="text-good" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute inset-x-6 -top-8 rotate-[-8deg] opacity-60 blur-[1px]" aria-hidden="true">
            <BankCard tier="metal" holder="Laura Martín" last4="9024" />
          </div>
          <TiltCard>
            <BankCard tier="plus" />
          </TiltCard>

          {CHIPS.map((c) => (
            <div
              key={c.title}
              className={`animate-float absolute hidden items-center gap-3 rounded-2xl border border-white/10 bg-surface/85 py-2.5 pr-4 pl-2.5 shadow-2xl backdrop-blur-xl sm:flex ${c.className}`}
              style={{ animationDelay: c.delay }}
              aria-hidden="true"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${c.positive ? "bg-good/15 text-good" : "bg-white/10 text-text"}`}>
                <Icon name={c.icon} size={18} />
              </span>
              <span className="text-sm leading-tight">
                <span className="block text-muted">{c.title}</span>
                <span className={`font-bold ${c.positive ? "text-good" : ""}`}>{c.amount}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
