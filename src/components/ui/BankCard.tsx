export type CardTier = "esencial" | "plus" | "metal";

const STYLES: Record<CardTier, { bg: string; label: string; text: string }> = {
  esencial: {
    bg: "linear-gradient(135deg, #6de4e8 0%, #4f8dff 100%)",
    label: "Esencial",
    text: "#06202a",
  },
  plus: {
    bg: "linear-gradient(135deg, #9b7bff 0%, #4f8dff 55%, #6de4e8 120%)",
    label: "Plus",
    text: "#ffffff",
  },
  metal: {
    bg: "linear-gradient(135deg, #2a2f3d 0%, #11131a 45%, #3a3f50 100%)",
    label: "Metal",
    text: "#e9edf8",
  },
};

/** Tarjeta dibujada solo con CSS y SVG */
export function BankCard({
  tier = "esencial",
  holder = "Laura Martín",
  last4 = "4821",
  className = "",
}: {
  tier?: CardTier;
  holder?: string;
  last4?: string;
  className?: string;
}) {
  const s = STYLES[tier];
  return (
    <div
      className={`relative aspect-[1.586] w-full overflow-hidden rounded-[22px] p-[7%] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10 ${className}`}
      style={{ background: s.bg, color: s.text }}
      role="img"
      aria-label={`Tarjeta Órbita ${s.label}`}
    >
      {/* Brillo y textura */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(255_255_255/0.35),transparent_45%)]" />
      {tier === "metal" && (
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(115deg,transparent_0_3px,rgb(255_255_255/0.05)_3px_4px)]" />
      )}

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-lg font-extrabold tracking-tight">órbita</span>
          <span className="rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase opacity-80">
            {s.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Chip */}
          <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden="true">
            <rect x="1" y="1" width="42" height="32" rx="6" fill="#e8c77a" stroke="#b8954a" />
            <path d="M1 12h14M1 22h14M29 12h14M29 22h14M15 1v32M29 1v32" stroke="#b8954a" />
          </svg>
          {/* Sin contacto */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="opacity-80">
            <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M15.5 2.5a13 13 0 0 1 0 19" />
          </svg>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[clamp(13px,1.6vw,19px)] tracking-[0.18em] opacity-90">•••• •••• •••• {last4}</p>
            <p className="mt-1 text-xs font-semibold tracking-wider uppercase opacity-75">{holder}</p>
          </div>
          {/* Red de pago genérica */}
          <span className="flex" aria-hidden="true">
            <span className="h-7 w-7 rounded-full bg-[#ff5f45]/90" />
            <span className="-ml-3 h-7 w-7 rounded-full bg-[#ffb545]/90 mix-blend-screen" />
          </span>
        </div>
      </div>
    </div>
  );
}
