import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comunidade Petrópolis — Demonstração",
  description: "Uma rede privada de confiança para famílias, alunos e ex-alunos do Colégio Petrópolis.",
  openGraph: {
    title: "Comunidade Petrópolis",
    description: "Confiança que aproxima. Negócios que fortalecem.",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Comunidade Petrópolis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comunidade Petrópolis",
    description: "Confiança que aproxima. Negócios que fortalecem.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
