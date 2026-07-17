"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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

const faqs = [
  {
    question: "Preciso trocar meu número de WhatsApp?",
    answer:
      "Não. A plataforma conecta no seu número atual via API Oficial da Meta. Você continua usando o mesmo número, com a mesma conversa, mas agora com superpoderes.",
  },
  {
    question: "Minha recepcionista vai saber usar?",
    answer:
      "Se ela sabe usar WhatsApp, sabe usar a plataforma. A interface é uma conversa de chat — não um painel complicado de CRM. O onboarding leva menos de 1 hora.",
  },
  {
    question: "Meu número pode ser bloqueado?",
    answer:
      "A plataforma foi construída pra evitar exatamente isso. O scoring classifica contatos, os disparos respeitam warm-up, e o monitoramento de qualidade Meta avisa antes de qualquer problema. Clínicas que usam a plataforma mantêm o número verde.",
  },
  {
    question: "Já tenho Belle/Clinicorp/Simples Agenda. Preciso trocar?",
    answer:
      "Não. A plataforma não substitui seu sistema de gestão — ela complementa. Seu sistema cuida da agenda e do financeiro. A plataforma cuida de transformar o WhatsApp em vendas. São camadas diferentes.",
  },
  {
    question: "Funciona com a API Oficial da Meta?",
    answer:
      "Sim, exclusivamente. Não usamos APIs não-oficiais. Isso garante estabilidade, compliance e acesso a templates aprovados pela Meta.",
  },
  {
    question: "E se eu quiser cancelar?",
    answer:
      "Cancela quando quiser. Sem fidelidade, sem multa. Seus dados ficam disponíveis pra exportação por 30 dias.",
  },
  {
    question: "Quanto tempo leva pra ver resultado?",
    answer:
      "As primeiras melhorias (tempo de resposta, organização) aparecem na primeira semana. Resultados de conversão começam a ser mensuráveis a partir de 30 dias.",
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
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
        onClick={onToggle}
      >
        <span
          className="text-base md:text-lg font-medium pr-4"
          style={{ color: "var(--text-primary)" }}
        >
          {faq.question}
        </span>
        <motion.span
          className="shrink-0 text-xl"
          style={{ color: "var(--accent-400)" }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
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
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "800px" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>Perguntas</Badge>
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
          Perguntas que toda dona de clínica faz.
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
