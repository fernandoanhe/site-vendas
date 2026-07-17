"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const steps = [
  {
    number: "01",
    title: "Lead chega, sistema organiza",
    text: "Cada mensagem que chega no WhatsApp da clínica é capturada, identificada e organizada automaticamente. Nome, origem, interesse, horário — tudo registrado. Zero chance de perder no chat.",
    icon: "📥",
  },
  {
    number: "02",
    title: "Scoring classifica a prioridade",
    text: "Cada lead recebe uma pontuação baseada no comportamento: respondeu rápido? Clicou no link? Abriu a mensagem? Seu time sabe exatamente quem atender primeiro e quem precisa de mais aquecimento.",
    icon: "⭐",
  },
  {
    number: "03",
    title: "Automação cuida do follow-up",
    text: "O lead não respondeu em 24h? A plataforma envia uma mensagem personalizada. Ficou 7 dias sem interação? Entra na sequência de reativação. Você para de depender da memória da recepcionista.",
    icon: "🤖",
  },
  {
    number: "04",
    title: "Disparo seguro, lista inteligente",
    text: "Quer comunicar uma promoção? O sistema monta listas por perfil: contatos quentes, ouro, quase lá, reativação. E nunca dispara pra quem pode reportar spam. Seu número fica verde.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>A plataforma</Badge>
        </motion.div>

        <motion.h2
          className="mt-6 max-w-3xl text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.15,
          }}
          variants={fadeUp}
        >
          Do anúncio ao pacote fechado, sem sair do WhatsApp.
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <motion.div key={step.number} className="relative" variants={fadeUp}>
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-400)",
                  }}
                >
                  {step.number}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--border-default)" }}
                />
              </div>

              <div className="mt-5 text-3xl">{step.icon}</div>

              <h3
                className="mt-4 text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {step.title}
              </h3>

              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
