const PATHS = {
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M18 6 6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6 9 17l-5-5",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9z",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  piggy: "M19 10c0-3.3-3.1-6-7-6S5 6.7 5 10c0 1.6.7 3 1.9 4.1L6 18h3l.6-1.6c.8.2 1.6.3 2.4.3s1.6-.1 2.4-.3L15 18h3l-.9-3.9A5.6 5.6 0 0 0 19 10zM15 9h.01M3 9.5h2",
  shield: "M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10zM9 12l2 2 4-4",
  percent: "M19 5 5 19M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
  sparkles: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  plus: "M12 5v14M5 12h14",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Logotipo de Órbita: un planeta con su anillo */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6de4e8" />
            <stop offset="1" stopColor="#4f8dff" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="9" fill="url(#orb)" />
        <ellipse cx="16" cy="16" rx="15" ry="5.5" fill="none" stroke="#9b7bff" strokeWidth="2" transform="rotate(-25 16 16)" />
      </svg>
      órbita
    </span>
  );
}
