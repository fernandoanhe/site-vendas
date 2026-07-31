"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MouseGlow from "@/components/interactive/MouseGlow";
import DotGrid from "@/components/interactive/DotGrid";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const headlineStagger = {
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
    transition: { duration: 0.6, ease },
  },
};

export default function Hero() {
  const utmParams = useUtmParams();
  const signupUrl = buildSignupUrl(undefined, utmParams);

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      <DotGrid />

      {/* Mouse follow glow */}
      <MouseGlow />

      <motion.div
        className="relative z-10 mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center"
        style={{ maxWidth: "var(--max-width)" }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.1,
          }}
          variants={headlineStagger}
        >
          <motion.span className="block" variants={fadeUp}>
            Atendimento é
          </motion.span>
          <motion.span
            className="block"
            style={{ color: "var(--accent-400)" }}
            variants={fadeUp}
          >
            Ciência de Dados.
          </motion.span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            letterSpacing: "var(--tracking-normal)",
          }}
          variants={fadeUp}
        >
          O primeiro instrumento de precisão para triagem e conversão via
          WhatsApp desenhado para clínicas de alto ticket.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Button
            variant="primary"
            href={signupUrl}
            onClick={() => {
              trackEvent("cta_click", { location: "hero", action: "signup" });
              trackPixel("Lead");
            }}
          >
            Testar grátis
          </Button>
          <Button variant="secondary" href="#como-funciona">
            A experiência ↓
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-sm"
          style={{ color: "var(--text-muted)" }}
          variants={fadeUp}
        >
          Grátis por 14 dias. Sem cartão. Sem compromisso.
        </motion.p>
      </motion.div>
    </section>
  );
}
