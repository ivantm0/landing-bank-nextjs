export interface SavingsInput {
  initial: number;
  monthly: number;
  years: number;
  /** Tasa anual equivalente en %, p. ej. 2.5 */
  rate: number;
}

export interface YearPoint {
  year: number;
  contributed: number;
  interest: number;
  total: number;
}

/**
 * Proyección año a año con capitalización mensual.
 * La TAE se convierte a tipo mensual equivalente: (1 + TAE)^(1/12) − 1.
 */
export function projectSavings({ initial, monthly, years, rate }: SavingsInput): YearPoint[] {
  const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
  let balance = initial;
  let contributed = initial;
  const points: YearPoint[] = [{ year: 0, contributed, interest: 0, total: balance }];

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthly;
    contributed += monthly;
    if (month % 12 === 0) {
      points.push({ year: month / 12, contributed, interest: balance - contributed, total: balance });
    }
  }
  return points;
}

const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: "always",
} as unknown as Intl.NumberFormatOptions);

const oneDecimal = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 });

export const formatEur = (n: number) => eur.format(Math.round(n));

/**
 * "850 €", "12,5 mil €", "1,2 M €". No se usa `notation: "compact"` porque Node y
 * el navegador traen datos de ICU distintos y el HTML del servidor no coincidiría.
 */
export const formatEurCompact = (n: number) =>
  n >= 1e6 ? `${oneDecimal.format(n / 1e6)} M €` : n >= 1e3 ? `${oneDecimal.format(n / 1e3)} mil €` : `${Math.round(n)} €`;
