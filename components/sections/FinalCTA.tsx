"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

function CoolingTimer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReduced) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isInView, prefersReduced]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <motion.div
      ref={ref}
      className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 mb-8"
      style={{
        backgroundColor: "rgba(37, 211, 102, 0.08)",
        border: "1px solid rgba(37, 211, 102, 0.2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
    >
      <span style={{ color: "var(--whatsapp)" }}>💬</span>
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
        esfriando há{" "}
        <span
          className="font-bold tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--whatsapp)" }}
        >
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
      </span>
    </motion.div>
  );
}

export default function FinalCTA() {
  const utmParams = useUtmParams();
  const signupUrl = buildSignupUrl(undefined, utmParams);
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Pulsing glow behind CTA */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,183,49,0.08) 0%, transparent 70%)",
        }}
        animate={prefersReduced ? {} : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={prefersReduced ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 mx-auto px-6 text-center flex flex-col items-center"
        style={{ maxWidth: "var(--max-width)" }}
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <CoolingTimer />
        </motion.div>

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
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
          variants={fadeUp}
        >
          Enquanto você lê isso, uma mensagem pode estar esfriando no WhatsApp
          da sua clínica. Comece a transformar conversas em pacientes agora.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Button
            variant="primary"
            href={signupUrl}
            onClick={() => {
              trackEvent("cta_click", { location: "final", action: "signup" });
              trackPixel("Lead");
            }}
          >
            Começar teste grátis
          </Button>
          <Button variant="secondary" href="#demo">
            Ver a plataforma por dentro
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
