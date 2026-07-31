"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Badge from "@/components/ui/Badge";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

const steps = [
  {
    num: "01",
    title: "Captação de contatos",
    text: "Cada lead que chega do anúncio, do Instagram ou do WhatsApp entra na base já identificado, com origem e histórico completo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Fluxo de relacionamento",
    text: "Cadências automáticas mantêm a conversa viva enquanto sua equipe cuida de quem já está pronto para agendar a avaliação.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Conversão de vendas",
    text: "O scoring aponta quem está quente. Sua equipe fala primeiro com quem tem mais chance de fechar o pacote.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Retenção de clientes",
    text: "Retorno, manutenção e renovação entram em fluxos automáticos. O paciente não some depois do procedimento.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15v-3m0 0V9m0 3h3m-3 0H9" />
        <path d="M17 21H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4z" />
      </svg>
    ),
  },
];

function JornadaLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden lg:block absolute inset-x-0 top-0 h-full pointer-events-none" aria-hidden="true">
      <svg
        className="absolute"
        style={{ top: "60px", left: "0", width: "100%", height: "4px" }}
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="2" x2="1000" y2="2" stroke="var(--border-default)" strokeWidth="2" />
        <motion.line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="var(--accent-400)"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

function MobileJornadaLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="lg:hidden absolute left-8 top-0 bottom-0 pointer-events-none" aria-hidden="true">
      <svg
        className="absolute"
        style={{ left: "0", top: "0", width: "4px", height: "100%" }}
        viewBox="0 0 4 1000"
        preserveAspectRatio="none"
      >
        <line x1="2" y1="0" x2="2" y2="1000" stroke="var(--border-default)" strokeWidth="2" />
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2="1000"
          stroke="var(--accent-400)"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

export default function Jornada() {
  return (
    <section
      id="jornada"
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
          <Badge>A jornada</Badge>
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
          Como funciona a jornada automatizada com a Clinvex?
        </motion.h2>

        <div className="mt-16 relative">
          <JornadaLine />
          <MobileJornadaLine />

          <div className="grid gap-8 lg:grid-cols-4 relative pl-14 lg:pl-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative rounded-2xl border p-6 transition-[border-color,box-shadow] duration-500"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-default)",
                }}
                variants={fadeUp}
                whileInView={{
                  borderColor: "var(--border-accent)",
                  boxShadow: "0 0 24px rgba(245, 183, 49, 0.06)",
                }}
                viewport={{ once: true, margin: "-40%" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div
                  className="absolute -left-10 lg:left-auto lg:-top-10 lg:left-1/2 lg:-translate-x-1/2 w-5 h-5 rounded-full border-2"
                  style={{
                    borderColor: "var(--accent-400)",
                    backgroundColor: "var(--bg-primary)",
                  }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      backgroundColor: "rgba(245, 183, 49, 0.1)",
                      color: "var(--accent-400)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent-400)",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
