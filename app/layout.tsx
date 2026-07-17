import type { Metadata } from "next";
import { instrumentSerif, inter, jetbrainsMono } from "@/lib/fonts";
import MotionProvider from "@/components/ui/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão de Leads — WhatsApp Inteligente para Clínicas de Estética",
  description:
    "Transforme o WhatsApp da sua clínica de estética em uma máquina de conversão. Scoring de leads, disparos seguros, follow-up automático. Teste grátis 14 dias.",
  keywords:
    "gestão leads WhatsApp, clínica estética, CRM WhatsApp estética, disparo WhatsApp seguro, scoring leads",
  metadataBase: new URL("https://gestaodeleads.com.br"),
  openGraph: {
    title: "Pare de perder os leads que você pagou pra captar.",
    description:
      "A plataforma WhatsApp-first para clínicas de estética. Scoring, disparos seguros e follow-up automático.",
    type: "website",
    locale: "pt_BR",
    siteName: "Gestão de Leads",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pare de perder os leads que você pagou pra captar.",
    description:
      "A plataforma WhatsApp-first para clínicas de estética. Scoring, disparos seguros e follow-up automático.",
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
      </body>
    </html>
  );
}
