"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

const tourSteps = [
  { src: "/tour/01-dashboard.svg", alt: "Dashboard principal da Clinvex", label: "Dashboard — Visão geral de contatos, conversões e desempenho da equipe." },
  { src: "/tour/02-chat.svg", alt: "Chat integrado ao WhatsApp", label: "Chat — Atendimento centralizado com histórico completo e timeline." },
  { src: "/tour/03-listas.svg", alt: "Listas inteligentes de contatos", label: "Listas — Segmentação automática por scoring e engajamento." },
  { src: "/tour/04-disparos.svg", alt: "Painel de disparos de mensagens", label: "Disparos — Envios seguros com warm-up e monitoramento de qualidade." },
  { src: "/tour/05-automacao.svg", alt: "Editor de automações", label: "Automação — Sequências de follow-up e reativação automáticas." },
];

export default function TourInterativo() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : tourSteps.length - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c < tourSteps.length - 1 ? c + 1 : 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const step = tourSteps[current];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderColor: "var(--border-default)",
      }}
      role="region"
      aria-label="Tour interativo da plataforma"
    >
      {/* Progress bar */}
      <div className="h-1 w-full" style={{ backgroundColor: "var(--bg-surface)" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: "var(--accent-400)" }}
          animate={{ width: `${((current + 1) / tourSteps.length) * 100}%` }}
          transition={{ duration: 0.3, ease }}
        />
      </div>

      {/* Image area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={step.src}
            src={step.src}
            alt={step.alt}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease }}
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
          style={{
            backgroundColor: "rgba(10, 10, 11, 0.7)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-default)",
          }}
          aria-label="Tela anterior"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
          style={{
            backgroundColor: "rgba(10, 10, 11, 0.7)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-default)",
          }}
          aria-label="Próxima tela"
        >
          →
        </button>
      </div>

      {/* Legend + dots */}
      <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {step.label}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {tourSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-colors cursor-pointer"
              style={{
                backgroundColor: i === current ? "var(--accent-400)" : "var(--border-default)",
              }}
              aria-label={`Ir para tela ${i + 1}`}
              aria-current={i === current ? "step" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
