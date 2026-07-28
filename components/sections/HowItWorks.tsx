"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";

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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    title: "Captação inteligente",
    text: "Leads chegam pelo WhatsApp e são organizados automaticamente. Nome, origem, interesse — tudo registrado sem perder nada no chat.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Scoring e qualificação",
    text: "Cada lead recebe um score baseado em engajamento real. Você sabe quem é ouro, quem precisa de aquecimento e quem é prioridade.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Follow-up automático",
    text: "Sequências inteligentes nutrem o lead até a avaliação. Sem depender da memória da recepcionista.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    title: "Conversão e retenção",
    text: "Do pacote fechado ao retorno, o sistema acompanha a jornada completa. Reativação automática de pacientes sumidos.",
  },
];

export default function HowItWorks() {
  const utmParams = useUtmParams();
  const signupUrl = buildSignupUrl(undefined, utmParams);

  return (
    <section
      id="como-funciona"
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
          <Badge>A plataforma</Badge>
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
          Do anúncio ao pacote fechado, sem sair do WhatsApp.
        </motion.h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <motion.div
              key={step.title}
              className="group"
              variants={cardVariants}
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "16px",
                padding: "2rem",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                y: -4,
                borderColor: "var(--border-accent)",
                boxShadow: "0 8px 32px rgba(245, 183, 49, 0.08)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(245, 183, 49, 0.1)",
                  color: "var(--accent-400)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {step.icon}
              </div>

              <h3
                className="mt-5 font-semibold"
                style={{
                  fontSize: "20px",
                  color: "var(--text-primary)",
                }}
              >
                {step.title}
              </h3>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                }}
              >
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-14 text-center" variants={fadeUp}>
          <Button
            variant="primary"
            href={signupUrl}
            onClick={() => {
              trackEvent("cta_click", { location: "how_it_works", action: "signup" });
              trackPixel("Lead");
            }}
          >
            Quero começar agora
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
