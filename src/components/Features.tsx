import { Icon, type IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

const SMALL: { icon: IconName; title: string; text: string }[] = [
  { icon: "percent", title: "Cero comisiones", text: "Sin mantenimiento, sin emisión de tarjeta y transferencias SEPA gratis." },
  { icon: "card", title: "Tarjeta virtual al instante", text: "Empieza a pagar con el móvil antes de que te llegue la física." },
  { icon: "globe", title: "Paga en cualquier divisa", text: "Tipo de cambio real y sin recargos en más de 150 monedas." },
  { icon: "chat", title: "Personas, no robots", text: "Te atiende un equipo real por chat, a cualquier hora." },
];

export function Features() {
  return (
    <section id="ventajas" className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
      <SectionHeading
        eyebrow="Ventajas"
        title={
          <>
            Todo lo que esperas de tu banco, <span className="text-gradient">sin lo que te sobra</span>
          </>
        }
        text="Diseñado desde cero para el móvil: rápido, transparente y sin letra pequeña."
      />

      <div className="mt-16 grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
        {/* Pagos instantáneos */}
        <Reveal className="md:col-span-4">
          <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-8">
            <div className="glow -top-20 -right-20 h-64 w-64 bg-brand-2" aria-hidden="true" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand">
              <Icon name="bolt" />
            </span>
            <h3 className="mt-6 text-2xl font-bold">Envía dinero en segundos</h3>
            <p className="mt-2 max-w-md text-muted">Transferencias inmediatas a cualquier banco europeo y pagos entre amigos con solo su número de teléfono.</p>
            <div className="mt-8 flex flex-col gap-2 sm:max-w-sm" aria-hidden="true">
              {[
                ["Carlos R.", "Cena del viernes", "+18,50 €"],
                ["Marta G.", "Regalo de cumpleaños", "+10,00 €"],
              ].map(([name, concept, amount]) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2/80 p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-violet/20 text-sm font-bold text-violet">{name[0]}</span>
                  <span className="flex-1 text-sm">
                    <span className="block font-semibold">{name}</span>
                    <span className="text-muted">{concept}</span>
                  </span>
                  <span className="font-bold text-good">{amount}</span>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Huchas */}
        <Reveal className="md:col-span-2" delay={0.05}>
          <article className="h-full rounded-3xl border border-line bg-surface p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/15 text-violet">
              <Icon name="piggy" />
            </span>
            <h3 className="mt-6 text-2xl font-bold">Huchas automáticas</h3>
            <p className="mt-2 text-muted">Redondea cada compra y aparta la diferencia sin pensarlo.</p>
            <div className="mt-8" aria-hidden="true">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Viaje a Japón</span>
                <span className="text-muted">1.420 € / 2.000 €</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
                <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-violet to-brand" />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Seguridad */}
        <Reveal className="md:col-span-2" delay={0.1}>
          <article className="h-full rounded-3xl border border-line bg-surface p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-good/15 text-good">
              <Icon name="shield" />
            </span>
            <h3 className="mt-6 text-2xl font-bold">Seguridad de verdad</h3>
            <p className="mt-2 text-muted">Biometría, bloqueo de tarjeta con un toque y avisos en tiempo real de cada movimiento.</p>
          </article>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-4">
          {SMALL.map((f, i) => (
            <Reveal key={f.title} delay={0.1 + i * 0.04}>
              <article className="h-full rounded-3xl border border-line bg-surface p-6">
                <Icon name={f.icon} className="text-brand" />
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
