import type { Metadata } from "next";
import { instrumentSerif, inter, jetbrainsMono } from "@/lib/fonts";
import MotionProvider from "@/components/ui/MotionProvider";
import Analytics from "@/components/analytics/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinvex — Gestão Comercial WhatsApp-First para Clínicas de Alto Ticket",
  description:
    "O primeiro instrumento de precisão para triagem e conversão via WhatsApp desenhado para clínicas de alto ticket. Scoring, disparos seguros, follow-up automático. Teste grátis 14 dias.",
  keywords:
    "gestão comercial WhatsApp, clínica estética, Clinvex, CRM WhatsApp estética, disparo WhatsApp seguro, scoring contatos",
  metadataBase: new URL("https://clinvex.com.br"),
  openGraph: {
    title: "Clinvex — Gestão Comercial é Ciência de Dados",
    description:
      "O primeiro instrumento de precisão para triagem e conversão via WhatsApp desenhado para clínicas de alto ticket.",
    type: "website",
    locale: "pt_BR",
    siteName: "Clinvex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinvex — Gestão Comercial é Ciência de Dados",
    description:
      "O primeiro instrumento de precisão para triagem e conversão via WhatsApp desenhado para clínicas de alto ticket.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
