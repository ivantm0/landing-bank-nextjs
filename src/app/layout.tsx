import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextjs-bank.netlify.app"),
  title: "Órbita · Landing de banca digital",
  description:
    "Landing de un banco digital ficticio: tarjetas, calculadora de ahorro, preguntas frecuentes y alta online. Proyecto de portfolio hecho con Next.js, Tailwind CSS y Motion.",
  openGraph: {
    title: "Órbita · Banca digital",
    description: "Cuenta sin comisiones, tarjetas y calculadora de ahorro. Proyecto de portfolio.",
    type: "website",
    locale: "es_ES",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${jakarta.variable} font-sans`}>{children}</body>
    </html>
  );
}
