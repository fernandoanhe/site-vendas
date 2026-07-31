"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Badge from "@/components/ui/Badge";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

const vantagens = [
  {
    title: "Produção de listas inteligentes",
    text: "A base se segmenta sozinha em ouro, quente, quase lá, fria e reativação, com health score de 5 dimensões por contato. Você fala com quem tem chance real de responder — não com a lista inteira.",
    visual: "quadrants",
  },
  {
    title: "Mantém a saúde da conta e evita bloqueios",
    text: "Monitoramento contínuo da qualidade do número na Meta, ritmo de envio controlado e pausa automática quando o risco sobe. Seu WhatsApp não fica amarelo no meio de uma campanha.",
    visual: "gauge",
  },
  {
    title: "Chat e chat automatizado",
    text: "Atendimento centralizado com janela de 24h, envio de imagem, PDF e áudio. Regras de resposta automática por palavra-chave, primeiro contato e fora do horário.",
    visual: "chat",
  },
  {
    title: "Automação dos envios de mensagem",
    text: "Sequências de follow-up que continuam sozinhas: quem não respondeu, quem sumiu depois da avaliação, quem está na hora do retorno.",
    visual: "timeline",
  },
  {
    title: "API Oficial",
    text: "Operação 100% na API Oficial da Meta. Sem gambiarra e sem risco de banimento por uso de API não oficial, com templates aprovados e métricas reais de entrega.",
    visual: "shield",
  },
];

function VisualQuadrants() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto">
      {["Ouro", "Quente", "Fria", "Reativação"].map((label, i) => (
        <motion.div
          key={label}
          className="rounded-xl p-4 text-center text-sm font-medium"
          style={{
            backgroundColor: "var(--bg-surface)",
            color: i === 0 ? "var(--accent-400)" : "var(--text-secondary)",
            border: i === 0 ? "1px solid var(--accent-400)" : "1px solid var(--border-default)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function VisualGauge() {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="200" height="120" viewBox="0 0 200 120" aria-label="Medidor de qualidade do número">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-default)" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--success)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
        />
        <text x="100" y="95" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)" fontFamily="var(--font-mono)">VERDE</text>
      </svg>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>Qualidade do número estável</p>
    </div>
  );
}

function VisualChat() {
  const msgs = [
    { from: "patient", text: "Oi! Vi o anúncio 😊" },
    { from: "clinic", text: "Olá! Temos horários essa semana. Quer agendar sua avaliação?" },
    { from: "patient", text: "Quero sim! Pode ser quinta?" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          className="rounded-xl px-3 py-2 text-sm max-w-[80%]"
          style={{
            backgroundColor: m.from === "clinic" ? "var(--bg-surface)" : "rgba(37, 211, 102, 0.15)",
            color: "var(--text-primary)",
            alignSelf: m.from === "clinic" ? "flex-start" : "flex-end",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.3, duration: 0.4 }}
        >
          {m.text}
        </motion.div>
      ))}
    </div>
  );
}

function VisualTimeline() {
  const items = ["Dia 0: Boas-vindas", "Dia 2: Follow-up", "Dia 5: Oferta", "Dia 14: Reativação"];
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: "var(--accent-400)" }} />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

function VisualShield() {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.svg
        width="80"
        height="96"
        viewBox="0 0 24 28"
        fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        aria-label="Selo API Oficial Meta"
      >
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="rgba(245,183,49,0.1)" stroke="var(--accent-400)" strokeWidth="1.5" />
        <path d="M9 14l2 2 4-4" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      <span
        className="text-xs font-medium px-3 py-1 rounded-full"
        style={{ backgroundColor: "rgba(245,183,49,0.1)", color: "var(--accent-400)" }}
      >
        Meta Business API
      </span>
    </div>
  );
}

const visuals: Record<string, React.FC> = {
  quadrants: VisualQuadrants,
  gauge: VisualGauge,
  chat: VisualChat,
  timeline: VisualTimeline,
  shield: VisualShield,
};

function MobileVantagens() {
  return (
    <div className="lg:hidden flex flex-col gap-12">
      {vantagens.map((v, i) => {
        const Visual = visuals[v.visual];
        return (
          <motion.div
            key={i}
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-default)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "var(--font-mono)", color: "var(--accent-400)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
              {v.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {v.text}
            </p>
            <div className="mt-6">
              <Visual />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function DesktopVantagens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="hidden lg:block relative" style={{ height: `${vantagens.length * 100}vh` }}>
      <div className="sticky top-24 flex gap-12" style={{ height: "calc(100vh - 8rem)" }}>
        {/* Left: progress indicator + text */}
        <div className="flex gap-6 w-1/2">
          {/* Progress bar */}
          <div className="relative w-1 shrink-0" style={{ backgroundColor: "var(--border-default)" }}>
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                backgroundColor: "var(--accent-400)",
                scaleY: scrollYProgress,
                height: "100%",
              }}
            />
          </div>

          {/* Text items */}
          <div className="flex flex-col justify-between py-4">
            {vantagens.map((v, i) => {
              const start = i / vantagens.length;
              const end = (i + 1) / vantagens.length;
              return (
                <VantagemText
                  key={i}
                  vantagem={v}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>
        </div>

        {/* Right: visual */}
        <div className="w-1/2 flex items-center justify-center">
          {vantagens.map((v, i) => {
            const Visual = visuals[v.visual];
            const start = i / vantagens.length;
            const end = (i + 1) / vantagens.length;
            return (
              <VantagemVisual
                key={i}
                Visual={Visual}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VantagemText({
  vantagem,
  index,
  scrollYProgress,
  start,
  end,
}: {
  vantagem: (typeof vantagens)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3]);
  return (
    <motion.div style={{ opacity }}>
      <span
        className="text-sm font-bold"
        style={{ fontFamily: "var(--font-mono)", color: "var(--accent-400)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-1 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
        {vantagem.title}
      </h3>
      <p className="mt-2 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {vantagem.text}
      </p>
    </motion.div>
  );
}

function VantagemVisual({
  Visual,
  scrollYProgress,
  start,
  end,
}: {
  Visual: React.FC;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [30, 0, 0, -30]);
  return (
    <motion.div className="absolute" style={{ opacity, y }}>
      <Visual />
    </motion.div>
  );
}

export default function Vantagens() {
  return (
    <section
      id="vantagens"
      className="py-20 md:py-32 lg:py-0"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: "var(--max-width)" }}>
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="pb-12 lg:pb-16 lg:pt-32"
        >
          <motion.div variants={fadeUp}>
            <Badge>Vantagens</Badge>
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
            Tudo que o WhatsApp da sua clínica precisa. Nada que ele não precisa.
          </motion.h2>
        </motion.div>

        <MobileVantagens />
        <DesktopVantagens />
      </div>
    </section>
  );
}
