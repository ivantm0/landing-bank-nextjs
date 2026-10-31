import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

const FAQ = [
  {
    q: "¿De verdad no hay comisiones?",
    a: "La cuenta Esencial no tiene comisiones de mantenimiento ni de emisión de tarjeta, y las transferencias SEPA son gratuitas. Solo pagas si eliges un plan Plus o Metal.",
  },
  {
    q: "¿Mi dinero está protegido?",
    a: "En un banco real, los depósitos estarían cubiertos por el Fondo de Garantía de Depósitos hasta 100.000 € por titular. Órbita es un proyecto de portfolio y no gestiona dinero real.",
  },
  {
    q: "¿Cuánto se tarda en abrir la cuenta?",
    a: "Unos cinco minutos desde el móvil: datos personales, foto del documento de identidad y un selfie para verificar que eres tú.",
  },
  {
    q: "¿Puedo usar la tarjeta en el extranjero?",
    a: "Sí, en más de 150 divisas con el tipo de cambio real. En el plan Esencial tienes dos retiradas gratis al mes en cajeros; en Plus y Metal, ilimitadas.",
  },
  {
    q: "¿Cómo funcionan las huchas?",
    a: "Creas una meta, eliges cuánto apartar y cada cuánto, y opcionalmente activas el redondeo de cada compra. Puedes sacar el dinero cuando quieras.",
  },
  {
    q: "¿Puedo cambiar o cancelar mi plan?",
    a: "Cuando quieras y sin permanencia. El cambio se aplica al momento y solo se cobra la parte proporcional del mes.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-12 px-5 py-28 md:py-36 lg:grid-cols-[1fr_1.4fr]">
      <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" text="¿No encuentras lo que buscas? Escríbenos por el chat de la app." />
      <div className="flex flex-col gap-3">
        {FAQ.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.03}>
            <details name="faq" className="group rounded-2xl border border-line bg-surface open:bg-surface-2/60">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-semibold">
                {item.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
                  <Icon name="plus" size={16} />
                </span>
              </summary>
              <p className="px-5 pb-5 text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
