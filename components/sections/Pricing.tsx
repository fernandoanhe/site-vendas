"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ROICalculator from "@/components/interactive/ROICalculator";

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

const plans = [
  {
    name: "Starter",
    price: "R$ 197",
    period: "/mês",
    highlight: false,
    features: [
      "Até 500 contatos gerenciados",
      "1.000 disparos/mês",
      "3 sequências de automação",
      "Dashboard básico",
      "Scoring de leads",
      "Suporte via chat",
    ],
  },
  {
    name: "Pro",
    price: "R$ 397",
    period: "/mês",
    highlight: true,
    badge: "Mais popular",
    features: [
      "Até 2.000 contatos gerenciados",
      "5.000 disparos/mês",
      "Automações ilimitadas",
      "Dashboard completo",
      "Scoring de leads",
      "Health score de contatos",
      "Suporte via chat + call",
    ],
  },
  {
    name: "Clínica+",
    price: "R$ 697",
    period: "/mês",
    highlight: false,
    features: [
      "Contatos ilimitados",
      "Disparos ilimitados",
      "Automações ilimitadas",
      "Dashboard completo + API",
      "Scoring de leads",
      "Health score de contatos",
      "Suporte dedicado",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="precos"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-primary)" }}
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
          <Badge>Investimento</Badge>
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
          Quanto custa perder 5 leads por mês?
        </motion.h2>

        <motion.p
          className="mt-4 max-w-2xl text-lg"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
          variants={fadeUp}
        >
          Se cada avaliação agendada vale R$300-500 e você perde pelo menos 5
          leads por mês por demora ou falta de follow-up — são R$1.500 a R$2.500
          evaporando. A plataforma se paga no primeiro lead salvo.
        </motion.p>

        {/* ROI Calculator */}
        <div className="mt-12">
          <ROICalculator />
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className="relative rounded-2xl border p-8 flex flex-col"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: plan.highlight
                  ? "var(--border-accent)"
                  : "var(--border-default)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(245, 183, 49, 0.08)"
                  : "none",
              }}
              variants={fadeUp}
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--accent-400)",
                    color: "var(--bg-primary)",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: plan.highlight
                      ? "var(--accent-400)"
                      : "var(--text-primary)",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--success)" }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  href="#testar"
                  className="w-full"
                >
                  Começar teste grátis
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
          variants={fadeUp}
        >
          Sem fidelidade. Cancele quando quiser. Sem taxa de setup.
        </motion.p>
      </motion.div>
    </section>
  );
}
