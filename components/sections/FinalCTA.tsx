"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto px-6 text-center"
        style={{ maxWidth: "var(--max-width)" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="mx-auto max-w-3xl text-3xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.1,
          }}
          variants={fadeUp}
        >
          Seu próximo lead já está esperando resposta.
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg md:text-xl"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
          variants={fadeUp}
        >
          Enquanto você lê isso, uma mensagem pode estar esfriando no WhatsApp
          da sua clínica. Comece a transformar conversas em pacientes agora.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Button variant="primary" href="#testar">
            Começar teste grátis
          </Button>
          <Button variant="secondary" href="#demo">
            Agendar demonstração com um especialista
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
