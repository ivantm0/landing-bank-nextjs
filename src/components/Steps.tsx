import { Icon, type IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "Descarga la app", text: "Disponible para iOS y Android. También puedes empezar desde la web." },
  { icon: "user", title: "Verifica tu identidad", text: "Una foto de tu DNI y un selfie. Sin papeleo ni oficinas." },
  { icon: "sparkles", title: "Empieza a usarla", text: "Tu IBAN y tu tarjeta virtual están listos en cinco minutos." },
];

export function Steps() {
  return (
    <section className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Cómo funciona" title="Tu cuenta, lista en tres pasos" center />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative h-full rounded-3xl border border-line bg-surface p-8">
                <span className="absolute top-6 right-7 text-6xl font-extrabold text-white/5" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-ink">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
