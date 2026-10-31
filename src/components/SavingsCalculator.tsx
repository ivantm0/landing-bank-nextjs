"use client";

import { useId, useMemo, useState } from "react";
import { formatEur, formatEurCompact, projectSavings, type YearPoint } from "@/lib/finance";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="text-lg font-bold tabular-nums">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

const W = 640;
const H = 280;
const PAD = { top: 16, right: 12, bottom: 30, left: 56 };

/** Redondea el máximo del eje para que las marcas sean cifras redondas */
const niceMax = (v: number) => {
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(v, 1)));
  return [1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10].find((s) => s * magnitude >= v)! * magnitude;
};

/** Gráfica de áreas apiladas: lo aportado y los intereses generados */
function Chart({ data }: { data: YearPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.total), 1) * 1.04);
  const x = (i: number) => PAD.left + (i / Math.max(data.length - 1, 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);
  const base = y(0);

  const area = (key: "contributed" | "total") =>
    `M${x(0)},${base} ` + data.map((d, i) => `L${x(i)},${y(d[key])}`).join(" ") + ` L${x(data.length - 1)},${base} Z`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => max * f);
  const labelEvery = Math.ceil(data.length / 8);
  const point = hover !== null ? data[hover] : null;

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (data.length - 1));
    setHover(Math.min(Math.max(i, 0), data.length - 1));
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-pan-y"
        role="img"
        aria-label={`Evolución del ahorro: ${formatEur(data.at(-1)!.total)} al cabo de ${data.length - 1} años`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="g-total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6de4e8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#6de4e8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="g-contrib" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9b7bff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#9b7bff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#1d2540" strokeDasharray="3 5" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#8f97b2">
              {formatEurCompact(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 || i === data.length - 1 ? (
            <text key={d.year} x={x(i)} y={H - 8} textAnchor="middle" fontSize="12" fill="#8f97b2">
              {d.year === 0 ? "Hoy" : `${d.year} a`}
            </text>
          ) : null,
        )}

        <path d={area("total")} fill="url(#g-total)" stroke="#6de4e8" strokeWidth="2" />
        <path d={area("contributed")} fill="url(#g-contrib)" stroke="#9b7bff" strokeWidth="2" />

        {point && hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={base} stroke="#e9edf8" strokeOpacity="0.4" />
            <circle cx={x(hover)} cy={y(point.total)} r="5" fill="#6de4e8" stroke="#05070d" strokeWidth="2" />
            <circle cx={x(hover)} cy={y(point.contributed)} r="5" fill="#9b7bff" stroke="#05070d" strokeWidth="2" />
          </g>
        )}
      </svg>

      {point && hover !== null && (
        <div
          className="pointer-events-none absolute top-2 rounded-xl border border-line bg-surface-2/95 px-3 py-2 text-sm shadow-xl backdrop-blur"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > data.length / 2 ? "-105%" : "5%"})` }}
        >
          <p className="font-bold">{point.year === 0 ? "Hoy" : `Año ${point.year}`}</p>
          <p className="text-brand">Total {formatEur(point.total)}</p>
          <p className="text-violet">Aportado {formatEur(point.contributed)}</p>
        </div>
      )}
    </div>
  );
}

export function SavingsCalculator() {
  const [initial, setInitial] = useState(2000);
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(2.5);

  const data = useMemo(() => projectSavings({ initial, monthly, years, rate }), [initial, monthly, years, rate]);
  const last = data.at(-1)!;
  const pct = (n: number) => `${n.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

  return (
    <section id="calculadora" className="relative mx-auto max-w-6xl px-5 py-28 md:py-36">
      <SectionHeading
        eyebrow="Calculadora"
        title={<>¿Cuánto podrías <span className="text-gradient">ahorrar</span>?</>}
        text="Mueve los controles y mira cómo crece tu dinero con interés compuesto en la cuenta remunerada."
      />

      <Reveal className="mt-14">
        <div className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-8 border-b border-line p-8 lg:border-r lg:border-b-0">
            <Slider label="Ahorro inicial" value={initial} min={0} max={50000} step={500} format={formatEur} onChange={setInitial} />
            <Slider label="Aportación mensual" value={monthly} min={0} max={2000} step={25} format={formatEur} onChange={setMonthly} />
            <Slider label="Plazo" value={years} min={1} max={30} step={1} format={(v) => (v === 1 ? "1 año" : `${v} años`)} onChange={setYears} />
            <Slider label="Rentabilidad (TAE)" value={rate} min={0.5} max={5} step={0.1} format={pct} onChange={setRate} />
          </div>

          <div className="p-6 md:p-8">
            <dl className="grid grid-cols-3 gap-4" aria-live="polite">
              <div>
                <dt className="text-sm text-muted">Tendrías</dt>
                <dd className="text-2xl font-extrabold tabular-nums md:text-4xl" data-testid="total">
                  {formatEur(last.total)}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <i className="h-2.5 w-2.5 rounded-sm bg-violet" /> Aportado
                </dt>
                <dd className="text-lg font-bold tabular-nums md:text-2xl" data-testid="contributed">
                  {formatEur(last.contributed)}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <i className="h-2.5 w-2.5 rounded-sm bg-brand" /> Intereses
                </dt>
                <dd className="text-lg font-bold text-brand tabular-nums md:text-2xl" data-testid="interest">
                  +{formatEur(last.interest)}
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Chart data={data} />
            </div>
            <p className="mt-4 text-xs text-muted">
              Simulación orientativa con capitalización mensual y una TAE constante. No incluye impuestos.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
