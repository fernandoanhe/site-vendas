"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MouseGlow from "@/components/interactive/MouseGlow";
import DotGrid from "@/components/interactive/DotGrid";
import Particles from "@/components/interactive/Particles";
import WordReveal from "@/components/motion/WordReveal";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
};

export default function Hero() {
  const utmParams = useUtmParams();
  const signupUrl = buildSignupUrl(undefined, utmParams);

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      <DotGrid />
      <MouseGlow />
      <Particles />

      <motion.div
        className="relative z-10 mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32 text-center"
        style={{ maxWidth: "var(--max-width)" }}
        variants={stagger(0.15)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.2em] mb-6"
          style={{ color: "var(--accent-400)" }}
          variants={fadeUp}
        >
          Plataforma WhatsApp-first para clínicas de alto ticket
        </motion.p>

        <motion.h1
          className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.1,
          }}
          variants={fadeUp}
        >
          <WordReveal
            text="Gestão Comercial é Ciência de Dados"
            stagger={0.06}
            renderWord={(word, i) => {
              const goldWords = ["Ciência", "de", "Dados"];
              const isGold = goldWords.includes(word);
              if (isGold) {
                return (
                  <span className="hero-gold-text">
                    {word}
                    {i < 5 && " "}
                  </span>
                );
              }
              return (
                <>
                  {word}
                  {i < 5 && " "}
                </>
              );
            }}
          />
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
            Testar grátis por 14 dias
          </Button>
          <Button variant="secondary" href="#demo">
            Ver a plataforma por dentro ↓
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-sm"
          style={{ color: "var(--text-muted)" }}
          variants={fadeUp}
        >
          Sem cartão de crédito. Configuração em 10 minutos.
        </motion.p>

        <motion.div
          className="mt-16 flex justify-center"
          variants={fadeUp}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="var(--text-muted)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="8"
                cy="8"
                r="2"
                fill="var(--accent-400)"
                animate={{ cy: [8, 14, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
