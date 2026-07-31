"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import EcossistemaSVG from "@/components/interactive/EcossistemaSVG";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

export default function Ecossistema() {
  return (
    <section
      id="plataforma"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>Ecossistema</Badge>
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
          Todas as ferramentas de Gestão Comercial de clínicas em um só lugar
        </motion.h2>

        <motion.p
          className="mt-4 max-w-2xl text-lg"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
          variants={fadeUp}
        >
          Do anúncio ao pacote fechado, sem sair do WhatsApp.
        </motion.p>

        <motion.div className="mt-16" variants={fadeUp}>
          <EcossistemaSVG />
        </motion.div>
      </motion.div>
    </section>
  );
}
