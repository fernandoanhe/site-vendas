"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease },
  },
};

const columns = [
  {
    title: "Sistemas de clínica",
    subtitle: "Belle, Clinicorp...",
    variant: slideLeft,
    highlight: false,
    items: [
      { label: "Agenda, financeiro, prontuário", ok: true },
      { label: "WhatsApp é só lembrete", ok: false },
      { label: "Sem scoring de leads", ok: false },
      { label: "Sem disparos inteligentes", ok: false },
      { label: "Sem dashboard de conversão", ok: false },
    ],
  },
  {
    title: "CRMs de WhatsApp",
    subtitle: "SocialHub, Kommo...",
    variant: slideLeft,
    delay: 0.15,
    highlight: false,
    items: [
      { label: "Pipeline, chatbot, multicanal", ok: true },
      { label: "Genéricos — não entendem estética", ok: false },
      { label: "Sem jornada avaliação → pacote → retorno", ok: false },
      { label: "Sem proteção de número", ok: false },
      { label: "Sem segmentação por saúde do contato", ok: false },
    ],
  },
  {
    title: "Gestão de Leads",
    subtitle: "Nós",
    variant: slideRight,
    delay: 0.3,
    highlight: true,
    items: [
      { label: "WhatsApp como motor de vendas", ok: true },
      { label: "Scoring + health score de cada contato", ok: true },
      { label: "Disparos seguros com proteção de número", ok: true },
      { label: "Jornada completa da estética", ok: true },
      { label: "Dashboard origem → pacote fechado", ok: true },
      { label: "Feito por quem opera clínica real", ok: true },
    ],
  },
];

export default function Comparison() {
  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>Diferente de tudo que você já testou</Badge>
        </motion.div>

        <motion.h2
          className="mt-6 max-w-4xl text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.15,
          }}
          variants={fadeUp}
        >
          Sistemas de clínica fazem agenda. CRMs fazem pipeline. Nós fazemos o
          WhatsApp vender.
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <motion.div
              key={col.title}
              className="rounded-2xl border p-6 md:p-8"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: col.highlight
                  ? "var(--border-accent)"
                  : "var(--border-default)",
                boxShadow: col.highlight
                  ? "0 0 40px rgba(245, 183, 49, 0.08)"
                  : "none",
              }}
              variants={col.variant}
              transition={{
                duration: col.variant === slideRight ? 0.5 : 0.4,
                delay: col.delay ?? 0,
                ease,
              }}
            >
              <div className="mb-6">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: col.highlight
                      ? "var(--accent-400)"
                      : "var(--text-primary)",
                  }}
                >
                  {col.title}
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {col.subtitle}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{
                        color: item.ok
                          ? "var(--success)"
                          : "var(--danger)",
                      }}
                    >
                      {item.ok ? "✅" : "❌"}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-lg md:text-xl"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          variants={fadeUp}
        >
          Não é mais um sistema. É o pedaço que faltava entre o seu investimento
          em tráfego e o pacote fechado.
        </motion.p>
      </motion.div>
    </section>
  );
}
