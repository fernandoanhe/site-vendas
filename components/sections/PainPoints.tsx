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

const painCards = [
  {
    title: "Leads que somem no chat",
    text: "A mensagem chegou às 14h. Você estava atendendo. Às 16h, respondeu. A paciente já agendou na concorrente. Cada lead perdido por demora custou o mesmo que o anúncio que trouxe ele.",
  },
  {
    title: "Follow-up que ninguém faz",
    text: 'A paciente pediu informação sobre botox, você mandou o preço, ela não respondeu. Dois dias depois, ninguém lembrou de mandar um "e aí, posso te ajudar?". O lead esfriou. O investimento evaporou.',
  },
  {
    title: "Disparos que queimam o número",
    text: "Mandou promoção pra lista inteira. Metade não abriu. Um quarto reportou como spam. A Meta cortou o alcance. Agora seu número está amarelo e cada mensagem tem taxa de entrega menor. Recuperar leva semanas.",
  },
];

export default function PainPoints() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>O problema</Badge>
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
          Você investe em tráfego. Os leads chegam. E depois?
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {painCards.map((card) => (
            <motion.div
              key={card.title}
              className="rounded-r-2xl p-8"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderLeft: "3px solid var(--danger)",
              }}
              variants={fadeUp}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {card.title}
              </h3>
              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.text}
              </p>
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
          Se você se identificou com pelo menos um desses cenários, o problema
          não é falta de leads —{" "}
          <span style={{ color: "var(--text-accent)" }}>é falta de sistema.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
