import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-brand uppercase">{eyebrow}</p>
      <h2 className="text-4xl font-extrabold tracking-tight text-balance md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg text-muted text-pretty">{text}</p>}
    </Reveal>
  );
}
