"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ScoringPulse from "@/components/interactive/ScoringPulse";

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

const features = [
  {
    icon: "💬",
    title: "Chat que parece WhatsApp. Mas com superpoderes.",
    text: "Interface de chat familiar, mas com histórico completo, timeline de eventos, qualificação BANT e playbook de atendimento. Sua recepcionista nova atende como a melhor em 1 dia.",
  },
  {
    icon: "⭐",
    title: "Cada lead tem uma nota. Cada nota tem um motivo.",
    text: 'O scoring analisa 5 dimensões: engajamento, recência, frequência, perfil e intenção. O resultado é um quadrante claro: ouro (prioridade), nutrir (esquentar), resgatar (reativar) ou arquivar (desistir). Acaba o "achismo".',
    hasPulse: true,
  },
  {
    icon: "📡",
    title: "Disparos que convertem sem queimar.",
    text: "Envie para centenas de contatos com segmentação inteligente. O sistema respeita warm-up, evita contatos frios, monitora a qualidade do número em tempo real e pausa automaticamente se algo sair do padrão.",
  },
  {
    icon: "🤖",
    title: "Follow-up no automático. Resultado no previsível.",
    text: "Crie sequências de mensagens para cada momento: pós-avaliação, lembrete de retorno, reativação de paciente sumido, aniversário. A plataforma envia, você colhe.",
  },
  {
    icon: "📊",
    title: "Seus números numa tela. Sem Excel, sem achismo.",
    text: "Quantos leads chegaram? De onde vieram? Quantos viraram avaliação? Quantos fecharam pacote? Quanto o tráfego gerou de receita? Tudo em tempo real, separado por período, equipe e origem.",
  },
  {
    icon: "📋",
    title: "Ouro, quente, fria, reativação. A lista certa pro momento certo.",
    text: "O sistema segmenta seus contatos automaticamente baseado em comportamento. Promoção de botox? Mande só pra quem demonstrou interesse e está engajado. Resultado melhor, risco zero.",
  },
];

export default function Features() {
  return (
    <section
      id="funcionalidades"
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
          <Badge>Funcionalidades</Badge>
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-default)",
              }}
              variants={fadeUp}
              whileHover={{
                borderColor: "var(--border-accent)",
                boxShadow: "0 0 30px rgba(245, 183, 49, 0.05)",
              }}
            >
              <div className="text-3xl">{feature.icon}</div>

              <h3
                className="mt-4 text-lg font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {feature.title}
              </h3>

              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {feature.text}
              </p>

              {feature.hasPulse && <ScoringPulse />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
