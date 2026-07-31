"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

function useCounter(target: number, isInView: boolean, skipAnimation: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (skipAnimation) {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, skipAnimation, duration]);

  return value;
}

const metrics = [
  {
    target: 47,
    suffix: "s",
    prefix: "",
    label: "Tempo médio de resposta",
    sublabel: "antes: 18 minutos",
  },
  {
    target: 71,
    suffix: "%",
    prefix: "-",
    label: "Leads perdidos por esquecimento",
    sublabel: "queda comprovada",
  },
  {
    target: 38,
    suffix: "%",
    prefix: "+",
    label: "Taxa de conversão lead → avaliação",
    sublabel: "melhoria média",
  },
];

function MetricCard({
  metric,
  isInView,
  prefersReduced,
}: {
  metric: (typeof metrics)[0];
  isInView: boolean;
  prefersReduced: boolean;
}) {
  const count = useCounter(metric.target, isInView, prefersReduced);

  return (
    <motion.div
      className="rounded-2xl border p-8 text-center"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-default)",
      }}
      variants={fadeUp}
    >
      <div
        className="text-5xl md:text-6xl font-bold tabular-nums"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--accent-400)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>
      <p
        className="mt-3 text-base font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {metric.label}
      </p>
      <p
        className="mt-1 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        {metric.sublabel}
      </p>
    </motion.div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = !!useReducedMotion();

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <motion.div
        ref={ref}
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>Resultados</Badge>
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
          Números de quem já usa.
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              isInView={isInView}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 rounded-2xl border p-8 md:p-10"
          style={{
            backgroundColor: "var(--bg-elevated)",
            borderColor: "var(--border-default)",
          }}
          variants={fadeUp}
        >
          <div
            className="text-4xl mb-4"
            style={{ color: "var(--accent-400)", opacity: 0.4 }}
          >
            &ldquo;
          </div>
          <blockquote
            className="text-lg md:text-xl leading-relaxed italic"
            style={{ color: "var(--text-primary)" }}
          >
            Antes eu perdia leads todo dia. Agora sei exatamente quem está
            quente, quem precisa de follow-up e quem é prioridade. Minha
            recepcionista adora porque é simples.
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{
                backgroundColor: "var(--accent-900)",
                color: "var(--accent-400)",
              }}
            >
              DC
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Dra. Camila
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Clínica Essence — São Paulo, SP
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
