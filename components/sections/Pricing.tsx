"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ROICalculator from "@/components/interactive/ROICalculator";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

const plans = [
  {
    name: "Starter",
    slug: "starter",
    price: "R$ 197",
    period: "/mês",
    highlight: false,
    features: [
      "Até 500 contatos",
      "1.000 disparos/mês",
      "2 membros da equipe",
      "Dashboard básico",
      "Scoring de contatos",
      "Chat centralizado",
      "Suporte via chat",
    ],
  },
  {
    name: "Pro",
    slug: "pro",
    price: "R$ 397",
    period: "/mês",
    highlight: true,
    badge: "Mais popular",
    features: [
      "Até 2.000 contatos",
      "5.000 disparos/mês",
      "5 membros da equipe",
      "Dashboard completo",
      "Scoring + health score",
      "Chat + automação",
      "Listas inteligentes",
      "Suporte via chat + call",
    ],
  },
  {
    name: "Clínica+",
    slug: "clinica_plus",
    price: "R$ 697",
    period: "/mês",
    highlight: false,
    features: [
      "Contatos ilimitados",
      "Disparos ilimitados",
      "Membros ilimitados",
      "Dashboard completo + API",
      "Scoring + health score",
      "Todas as automações",
      "Listas inteligentes",
      "Suporte dedicado",
    ],
  },
];

export default function Pricing() {
  const utmParams = useUtmParams();

  return (
    <section
      id="planos"
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
          Planos da plataforma
        </motion.h2>

        {/* ROI Calculator */}
        <div className="mt-12">
          <ROICalculator />
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative rounded-2xl border p-8 flex flex-col"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: plan.highlight
                  ? "transparent"
                  : "var(--border-default)",
                backgroundClip: "padding-box",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(245, 183, 49, 0.08)"
                  : "none",
                overflow: "hidden",
              }}
              variants={{
                hidden: { opacity: 0, x: i === 0 ? -30 : i === 2 ? 30 : 0, y: i === 1 ? 24 : 0 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.6, ease, delay: i * 0.1 },
                },
              }}
              whileHover={{
                rotateX: plan.highlight ? 0 : 2,
                rotateY: plan.highlight ? 0 : (i === 0 ? 3 : -3),
                transition: { duration: 0.3 },
              }}
            >
              {/* Rotating gradient border for Pro */}
              {plan.highlight && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    padding: "1px",
                    background: "conic-gradient(from var(--border-angle, 0deg), var(--accent-400), var(--accent-500), var(--accent-400))",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "rotate-border 4s linear infinite",
                  }}
                />
              )}

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
                    color: plan.highlight ? "var(--accent-400)" : "var(--text-primary)",
                  }}
                >
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
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
                    <span className="mt-0.5 shrink-0" style={{ color: "var(--success)" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  href={buildSignupUrl(plan.slug, utmParams)}
                  className="w-full"
                  onClick={() => {
                    trackEvent("cta_click", { location: "pricing", action: "signup", plan: plan.slug });
                    trackPixel("Lead");
                  }}
                >
                  Começar teste grátis
                </Button>
              </div>

              <p className="mt-3 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                14 dias grátis · Sem cartão · Sem fidelidade
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
