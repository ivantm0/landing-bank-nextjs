import { SectionHeading } from "./ui/Section";

// Banco ficticio: opiniones de ejemplo para el diseño
const QUOTES = [
  { name: "Lucía Fernández", role: "Diseñadora freelance", text: "Separar lo de Hacienda en una hucha automática me ha quitado un dolor de cabeza cada trimestre." },
  { name: "Javier Ortega", role: "Estudiante de Erasmus", text: "Pago en zlotys sin comisiones y veo cada gasto al momento en el móvil." },
  { name: "Ana Belén Ruiz", role: "Enfermera", text: "Bloqueé la tarjeta en un segundo cuando la perdí. Al día siguiente ya tenía la nueva." },
  { name: "Marcos Gil", role: "Desarrollador", text: "La app es rapidísima y las transferencias llegan al instante. Así debería ser todo." },
  { name: "Sara Domínguez", role: "Profesora", text: "Me encanta ver cuánto llevo ahorrado para el viaje de verano sin tener que hacer cuentas." },
  { name: "Pablo Herrera", role: "Fotógrafo", text: "El chat de soporte me contestó un domingo por la noche. Una persona, no un robot." },
];

function Quote({ q }: { q: (typeof QUOTES)[number] }) {
  const initials = q.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <figure className="w-[340px] shrink-0 rounded-3xl border border-line bg-surface p-6">
      <blockquote className="text-pretty">«{q.text}»</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-violet text-sm font-bold text-ink">
          {initials}
        </span>
        <span className="text-sm">
          <span className="block font-semibold">{q.name}</span>
          <span className="text-muted">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rows = [QUOTES.slice(0, 3), QUOTES.slice(3)];
  return (
    <section className="py-28 md:py-36" aria-labelledby="opiniones">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Opiniones" title={<span id="opiniones">Lo que cuentan quienes ya están dentro</span>} center />
      </div>
      <div className="mt-14 flex flex-col gap-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            {/* La lista se duplica para que el desplazamiento sea continuo */}
            <div
              className="animate-marquee flex w-max gap-5 pr-5 group-hover:[animation-play-state:paused]"
              style={{ animationDirection: r ? "reverse" : "normal" }}
            >
              {[...row, ...row, ...row, ...row].map((q, i) => (
                <div key={i} aria-hidden={i >= row.length || undefined}>
                  <Quote q={q} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
