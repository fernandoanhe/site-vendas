"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export default function ROICalculator() {
  const [leads, setLeads] = useState(80);
  const [valorAvaliacao, setValorAvaliacao] = useState(300);
  const [leadsPerdidos, setLeadsPerdidos] = useState(15);

  const perdaMensal = valorAvaliacao * leadsPerdidos;

  return (
    <motion.div
      className="rounded-2xl border p-5 md:p-8 lg:p-10"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderColor: "var(--border-default)",
      }}
      variants={fadeUp}
    >
      <h3
        className="text-xl md:text-2xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Descubra quanto sua clínica perde sem um sistema.
      </h3>

      <div className="mt-8 flex flex-col gap-8">
        {/* Slider: Leads/mês */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Quantos leads chegam por mês no seu WhatsApp?
            </label>
            <span
              className="text-sm font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-400)",
              }}
            >
              {leads}
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full accent-[#F5B731] cursor-pointer"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            <span>20</span>
            <span>500</span>
          </div>
        </div>

        {/* Slider: Valor/avaliação */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Quanto vale uma avaliação agendada pra você?
            </label>
            <span
              className="text-sm font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-400)",
              }}
            >
              {formatCurrency(valorAvaliacao)}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={valorAvaliacao}
            onChange={(e) => setValorAvaliacao(Number(e.target.value))}
            className="w-full accent-[#F5B731] cursor-pointer"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            <span>R$100</span>
            <span>R$1.000</span>
          </div>
        </div>

        {/* Slider: Leads perdidos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Quantos leads você acha que perde por mês?
            </label>
            <span
              className="text-sm font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-400)",
              }}
            >
              {leadsPerdidos}
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={leadsPerdidos}
            onChange={(e) => setLeadsPerdidos(Number(e.target.value))}
            className="w-full accent-[#F5B731] cursor-pointer"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            <span>5</span>
            <span>50</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className="mt-10 rounded-xl p-6 text-center"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        <p
          className="text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Você está deixando
        </p>
        <p
          className="text-4xl md:text-5xl font-bold mt-2 tabular-nums"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent-400)",
          }}
        >
          {formatCurrency(perdaMensal)}
        </p>
        <p
          className="text-lg mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          na mesa todo mês.
        </p>
        <p
          className="text-sm mt-3"
          style={{ color: "var(--text-muted)" }}
        >
          Com a plataforma, clínicas recuperam em média 60-70% desses leads.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Button variant="primary" href="#testar">
          Quero parar de perder →
        </Button>
      </div>
    </motion.div>
  );
}
