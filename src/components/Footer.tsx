import { Logo } from "./ui/Icon";
import { NAV } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <Logo className="text-2xl" />
          <p className="mt-4 text-muted">La banca digital que se mueve contigo.</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-muted">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-text">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#empezar" className="hover:text-text">
                Abrir cuenta
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted md:flex-row md:justify-between">
          <p>Órbita es un banco ficticio: proyecto de portfolio sin fines comerciales.</p>
          <p>
            Diseñado y desarrollado por{" "}
            <a href="https://ivanterol.com" className="text-text hover:text-brand">
              Iván Terol
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
