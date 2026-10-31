"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

type Errors = Partial<Record<"name" | "email" | "terms", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  if (name.length < 2) errors.name = "Escribe tu nombre";
  if (!email) errors.email = "Necesitamos tu email";
  else if (!EMAIL.test(email)) errors.email = "Ese email no parece válido";
  if (!data.get("terms")) errors.terms = "Tienes que aceptar las condiciones";
  return errors;
}

export function Signup() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    // Lleva el foco al primer campo con error (el DOM aún no tiene aria-invalid actualizado)
    const first = (["name", "email", "terms"] as const).find((k) => found[k]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    // Demo: no se envía nada, solo se simula la respuesta del servidor
    await new Promise((r) => setTimeout(r, 900));
    setName(String(data.get("name")).trim().split(" ")[0]);
    setStatus("done");
  }

  const field =
    "h-14 w-full rounded-2xl border bg-ink/60 px-5 text-lg outline-none transition-colors placeholder:text-muted/70 focus:border-brand";

  return (
    <section id="empezar" className="px-5 py-20">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-surface-2 to-surface p-8 md:p-14">
          <div className="glow -top-24 -right-24 h-80 w-80 bg-brand" aria-hidden="true" />
          <div className="glow -bottom-32 -left-24 h-80 w-80 bg-violet" aria-hidden="true" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Abre tu cuenta hoy</h2>
              <p className="mt-4 text-lg text-muted">Déjanos tu email y te enviamos el enlace para empezar desde el móvil. Gratis y sin compromiso.</p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-good/30 bg-good/10 p-8 text-center"
                  role="status"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-good text-ink">
                    <Icon name="check" size={28} />
                  </span>
                  <p className="mt-4 text-2xl font-bold">¡Listo, {name}!</p>
                  <p className="mt-2 text-muted">Te hemos enviado un email para continuar. (Es una demo: no se ha enviado nada).</p>
                  <button type="button" className="mt-6 font-semibold text-brand underline-offset-4 hover:underline" onClick={() => setStatus("idle")}>
                    Volver al formulario
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.97 }} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="su-name" className="sr-only">
                      Nombre
                    </label>
                    <input
                      id="su-name"
                      name="name"
                      autoComplete="given-name"
                      placeholder="Tu nombre"
                      aria-invalid={!!errors.name}
                      aria-describedby="su-name-error"
                      className={`${field} ${errors.name ? "border-bad" : "border-line"}`}
                    />
                    <p id="su-name-error" className="mt-1.5 min-h-5 text-sm text-bad">{errors.name}</p>
                  </div>
                  <div>
                    <label htmlFor="su-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="su-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="tu@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby="su-email-error"
                      className={`${field} ${errors.email ? "border-bad" : "border-line"}`}
                    />
                    <p id="su-email-error" className="mt-1.5 min-h-5 text-sm text-bad">{errors.email}</p>
                  </div>
                  <div>
                    <label className="flex items-start gap-3 text-sm text-muted">
                      <input
                        type="checkbox"
                        name="terms"
                        aria-invalid={!!errors.terms}
                        aria-describedby="su-terms-error"
                        className="mt-0.5 h-5 w-5 accent-[#6de4e8]"
                      />
                      Acepto las condiciones y la política de privacidad.
                    </label>
                    <p id="su-terms-error" className="mt-1.5 min-h-5 text-sm text-bad">{errors.terms}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand text-lg font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink border-t-transparent" aria-hidden="true" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Empezar <Icon name="arrow" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
