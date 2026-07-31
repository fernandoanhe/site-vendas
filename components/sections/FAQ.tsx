"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

const faqs = [
  {
    question: "Preciso trocar o número de WhatsApp da clínica?",
    answer: "Não. A Clinvex conecta no seu número atual via API Oficial da Meta. Você mantém o mesmo número, as mesmas conversas, e ganha controle total sobre disparos, scoring e automação.",
  },
  {
    question: "Funciona com a API Oficial da Meta? Como é a migração?",
    answer: "Sim, a Clinvex opera exclusivamente na API Oficial. A migração é feita pela nossa equipe em menos de 48h, sem interrupção no atendimento. Não usamos APIs não-oficiais.",
  },
  {
    question: "Minha equipe consegue atender junto comigo?",
    answer: "Sim. O chat centralizado permite múltiplos atendentes simultâneos, cada um com login próprio. A interface é tão simples quanto o WhatsApp — onboarding em menos de 1 hora.",
  },
  {
    question: "E se meu número já estiver com qualidade amarela?",
    answer: "A Clinvex monitora a qualidade em tempo real e reduz o ritmo de envio automaticamente. Clínicas que chegam com número amarelo costumam recuperar para verde em 2 a 3 semanas com a gestão da plataforma.",
  },
  {
    question: "Consigo importar minha base atual de contatos?",
    answer: "Sim. Você pode importar via planilha CSV ou Excel. O sistema identifica duplicatas, valida números e já aplica a primeira rodada de scoring nos contatos importados.",
  },
  {
    question: "Quanto tempo leva para configurar tudo?",
    answer: "A configuração básica leva cerca de 10 minutos. A migração completa com API Oficial, importação de base e primeiras automações fica pronta em até 48 horas com apoio do nosso time.",
  },
  {
    question: "Tem fidelidade ou multa para cancelar?",
    answer: "Nenhuma. Sem fidelidade, sem multa, sem taxa de cancelamento. Seus dados ficam disponíveis para exportação por 30 dias após o cancelamento.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border-b"
      style={{ borderColor: "var(--border-default)" }}
      variants={fadeUp}
    >
      <button
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-base md:text-lg font-medium pr-4"
          style={{ color: "var(--text-primary)" }}
        >
          {faq.question}
        </span>
        <motion.span
          className="shrink-0 w-6 h-6 flex items-center justify-center"
          style={{ color: "var(--accent-400)" }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p
              className="pb-6 text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "800px" }}
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>FAQ</Badge>
        </motion.div>

        <motion.h2
          className="mt-6 text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.15,
          }}
          variants={fadeUp}
        >
          Perguntas que toda clínica faz
        </motion.h2>

        <div className="mt-12">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
