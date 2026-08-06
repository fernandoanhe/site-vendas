"use client";

/**
 * Versão mobile do Ecossistema: narrativa por atos.
 * 4 cards full-width empilhados, cada um um capítulo do funil,
 * conectados por uma linha vertical dourada que se desenha com o scroll.
 */

import { useCallback, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import {
  FB,
  GLYPHS,
  GOLD,
  GREEN,
  IG,
  MODULE_ICONS,
  SUCCESS,
  TT,
  USERS_ICON,
  vflow,
  type Seg,
  useFlowEngine,
  useGlows,
  useMoney,
  Counter,
  FillIcon,
  GlowCircle,
  GlowRect,
  MoneyFloaters,
  SegmentDots,
  StrokeIcon,
} from "./EcossistemaFlowKit";

/* ── Hook por ato: motor liga quando visível, desliga ao sair ──────── */
function useActEngine(segs: Seg[], onArrive?: (node: string) => void) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.3 });
  const prefersReduced = !!useReducedMotion();
  const active = inView && !prefersReduced;
  const { glows, glow } = useGlows();

  const handleArrive = useCallback(
    (node: string) => {
      glow(node);
      onArrive?.(node);
    },
    [glow, onArrive]
  );

  const { setPathRef, setDotRef } = useFlowEngine(segs, active, handleArrive);
  return { svgRef, active, prefersReduced, glows, setPathRef, setDotRef };
}

function Tracks({
  segs,
  setPathRef,
}: {
  segs: Seg[];
  setPathRef: (id: string) => (el: SVGPathElement | null) => void;
}) {
  return (
    <>
      {segs.map((s) => (
        <path
          key={s.id}
          ref={setPathRef(s.id)}
          d={s.d}
          fill="none"
          stroke={s.width ? "var(--border-strong)" : "var(--border-default)"}
          strokeWidth={s.width ?? 1.25}
        />
      ))}
    </>
  );
}

function Dots({
  segs,
  setDotRef,
  prefersReduced,
}: {
  segs: Seg[];
  setDotRef: (id: string, i: number) => (el: SVGCircleElement | null) => void;
  prefersReduced: boolean;
}) {
  if (prefersReduced) return null;
  return (
    <>
      {segs.map((s) => (
        <SegmentDots key={`dots-${s.id}`} seg={s} setDotRef={setDotRef} withTrail />
      ))}
    </>
  );
}

/* ── Ato 1 — Captação ──────────────────────────────────────────────── */
const ACT1_SEGS: Seg[] = [
  { id: "a1-fb", d: vflow(62, 64, 146, 184), color: FB, dur: 2.6, cycle: 5.4, delay: 0.2, arriveNode: "whatsapp", trail: true },
  { id: "a1-ig", d: vflow(170, 64, 170, 168), color: IG, dur: 2.6, cycle: 5.4, delay: 2.0, arriveNode: "whatsapp", trail: true },
  { id: "a1-tt", d: vflow(278, 64, 194, 184), color: TT, dur: 2.6, cycle: 5.4, delay: 3.8, arriveNode: "whatsapp", trail: true },
];

const ACT1_NETWORKS = [
  { id: "facebook", label: "Facebook", cx: 62 },
  { id: "instagram", label: "Instagram", cx: 170 },
  { id: "tiktok", label: "TikTok", cx: 278 },
];

function Act1Scene() {
  const { svgRef, prefersReduced, glows, setPathRef, setDotRef } = useActEngine(ACT1_SEGS);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 268"
      className="w-full"
      role="img"
      aria-label="Leads de Facebook, Instagram e TikTok convergindo para o WhatsApp da clínica"
    >
      <Tracks segs={ACT1_SEGS} setPathRef={setPathRef} />
      <Dots segs={ACT1_SEGS} setDotRef={setDotRef} prefersReduced={prefersReduced} />

      {ACT1_NETWORKS.map((n) => (
        <g key={n.id}>
          <rect x={n.cx - 52} y={20} width={104} height={44} rx={10} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <FillIcon d={GLYPHS[n.id]} x={n.cx - 40} y={35} size={15} color="var(--text-secondary)" />
          <text x={n.cx - 20} y={46} fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-body)">
            {n.label}
          </text>
        </g>
      ))}

      <g>
        <circle cx={170} cy={210} r={40} fill="rgba(37, 211, 102, 0.10)" stroke={GREEN} strokeWidth="1.5" />
        <FillIcon d={GLYPHS.whatsapp} x={153} y={193} size={34} color={GREEN} />
        <GlowCircle cx={170} cy={210} r={45} on={!!glows.whatsapp} color={GREEN} />
      </g>
    </svg>
  );
}

/* ── Ato 2 — Central ───────────────────────────────────────────────── */
const ACT2_SEGS: Seg[] = [
  { id: "a2-wa", d: vflow(170, 104, 170, 175), color: GREEN, dur: 2.2, cycle: 3.0, delay: 0.6, arriveNode: "clinvex", trail: true, width: 3 },
];

function Act2Scene() {
  const { svgRef, active, prefersReduced, glows, setPathRef, setDotRef } = useActEngine(ACT2_SEGS);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 368"
      className="w-full"
      role="img"
      aria-label="WhatsApp alimentando a central Clinvex"
    >
      <defs>
        <radialGradient id="clx-glow-act2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
          <stop offset="70%" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      <Tracks segs={ACT2_SEGS} setPathRef={setPathRef} />
      <Dots segs={ACT2_SEGS} setDotRef={setDotRef} prefersReduced={prefersReduced} />

      <g>
        <circle cx={170} cy={60} r={40} fill="rgba(37, 211, 102, 0.10)" stroke={GREEN} strokeWidth="1.5" />
        <FillIcon d={GLYPHS.whatsapp} x={153} y={43} size={34} color={GREEN} />
      </g>

      <g>
        <motion.circle
          cx={170}
          cy={264}
          r={118}
          fill="url(#clx-glow-act2)"
          initial={false}
          animate={active ? { opacity: [0.45, 0.9, 0.45] } : { opacity: 0.5 }}
          transition={active ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        <circle cx={170} cy={264} r={88} fill="var(--bg-elevated)" stroke="var(--accent-400)" strokeWidth="2" />
        <GlowCircle cx={170} cy={264} r={94} on={!!glows.clinvex} color={GOLD} />
        <text
          x={170}
          y={275}
          textAnchor="middle"
          fontSize="30"
          fontWeight="600"
          fill="var(--accent-400)"
          fontFamily="var(--font-display)"
        >
          Clinvex
        </text>
      </g>
    </svg>
  );
}

/* ── Ato 3 — Inteligência ──────────────────────────────────────────── */
const ACT3_SEGS: Seg[] = [
  { id: "a3-listas", d: vflow(170, 100, 85, 182), color: GOLD, dur: 2.4, cycle: 4.8, delay: 0.3, arriveNode: "listas", trail: true },
  { id: "a3-ia", d: vflow(170, 100, 255, 182), color: GOLD, dur: 2.4, cycle: 4.8, delay: 1.5, arriveNode: "ia", trail: true },
  { id: "a3-disparos", d: vflow(170, 100, 61, 254), color: GOLD, dur: 2.4, cycle: 4.8, delay: 2.7, arriveNode: "disparos", trail: true },
  { id: "a3-automacoes", d: vflow(170, 100, 279, 254), color: GOLD, dur: 2.4, cycle: 4.8, delay: 3.9, arriveNode: "automacoes", trail: true },
];

const ACT3_MODULES = [
  { id: "listas", label: "Listas", x: 10, y: 182 },
  { id: "ia", label: "Inteligência Artificial", x: 180, y: 182 },
  { id: "disparos", label: "Disparos", x: 10, y: 254 },
  { id: "automacoes", label: "Automações", x: 180, y: 254 },
];

function Act3Scene() {
  const { svgRef, active, prefersReduced, glows, setPathRef, setDotRef } = useActEngine(ACT3_SEGS);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 314"
      className="w-full"
      role="img"
      aria-label="Clinvex distribuindo para Listas, Inteligência Artificial, Disparos e Automações"
    >
      <defs>
        <radialGradient id="clx-glow-act3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
          <stop offset="70%" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      <Tracks segs={ACT3_SEGS} setPathRef={setPathRef} />
      <Dots segs={ACT3_SEGS} setDotRef={setDotRef} prefersReduced={prefersReduced} />

      <g>
        <motion.circle
          cx={170}
          cy={56}
          r={60}
          fill="url(#clx-glow-act3)"
          initial={false}
          animate={active ? { opacity: [0.45, 0.9, 0.45] } : { opacity: 0.5 }}
          transition={active ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        <circle cx={170} cy={56} r={44} fill="var(--bg-elevated)" stroke="var(--accent-400)" strokeWidth="2" />
        <text
          x={170}
          y={62}
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="var(--accent-400)"
          fontFamily="var(--font-display)"
        >
          Clinvex
        </text>
      </g>

      {ACT3_MODULES.map((m) => (
        <g key={m.id}>
          <rect x={m.x} y={m.y} width={150} height={48} rx={10} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <StrokeIcon x={m.x + 13} y={m.y + 16} size={15}>
            {MODULE_ICONS[m.id]}
          </StrokeIcon>
          <text x={m.x + 34} y={m.y + 28} fontSize="11.5" fill="var(--text-secondary)" fontFamily="var(--font-body)">
            {m.label}
          </text>
          <GlowRect x={m.x} y={m.y} w={150} h={48} on={!!glows[m.id]} />
        </g>
      ))}
    </svg>
  );
}

/* ── Ato 4 — Resultado ─────────────────────────────────────────────── */
const ACT4_SEGS: Seg[] = [
  { id: "a4-disparos", d: vflow(85, 62, 148, 158), color: GOLD, dur: 2.4, cycle: 5.0, delay: 0.4, arriveNode: "clientes", trail: true },
  { id: "a4-automacoes", d: vflow(255, 62, 192, 158), color: GOLD, dur: 2.4, cycle: 5.0, delay: 2.9, arriveNode: "clientes", trail: true },
];

const ACT4_SOURCES = [
  { id: "disparos", label: "Disparos", x: 10 },
  { id: "automacoes", label: "Automações", x: 180 },
];

function Act4Scene() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.3 });
  const prefersReduced = !!useReducedMotion();
  const active = inView && !prefersReduced;
  const { glows, glow } = useGlows();
  const { total, floaters, onSale } = useMoney(active);

  const onArrive = useCallback(
    (node: string) => {
      glow(node);
      if (node === "clientes") onSale();
    },
    [glow, onSale]
  );

  const { setPathRef, setDotRef } = useFlowEngine(ACT4_SEGS, active, onArrive);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 340 308"
      className="w-full"
      role="img"
      aria-label="Disparos e Automações convertendo leads em clientes com pacotes fechados"
    >
      <Tracks segs={ACT4_SEGS} setPathRef={setPathRef} />
      <Dots segs={ACT4_SEGS} setDotRef={setDotRef} prefersReduced={prefersReduced} />

      {ACT4_SOURCES.map((m) => (
        <g key={m.id}>
          <rect x={m.x} y={18} width={150} height={44} rx={10} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <StrokeIcon x={m.x + 13} y={25} size={15}>
            {MODULE_ICONS[m.id]}
          </StrokeIcon>
          <text x={m.x + 34} y={44} fontSize="11.5" fill="var(--text-secondary)" fontFamily="var(--font-body)">
            {m.label}
          </text>
        </g>
      ))}

      <g>
        <circle cx={170} cy={196} r={44} fill="var(--bg-elevated)" stroke={SUCCESS} strokeWidth="1.5" />
        <StrokeIcon x={153} y={179} size={34} color={SUCCESS}>
          {USERS_ICON}
        </StrokeIcon>
        <GlowCircle cx={170} cy={196} r={49} on={!!glows.clientes} color={SUCCESS} />
        {!prefersReduced && <MoneyFloaters floaters={floaters} cx={170} y={142} />}
        <Counter total={total} cx={170} y={278} valueSize={16} />
      </g>
    </svg>
  );
}

/* ── Linha conectora (desenha com o scroll, como na Jornada) ───────── */
function ActsSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const prefersReduced = !!useReducedMotion();

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 2 1000"
        preserveAspectRatio="none"
      >
        <line x1="1" y1="0" x2="1" y2="1000" stroke="var(--border-default)" strokeWidth="2" />
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="1000"
          stroke="var(--accent-400)"
          strokeWidth="2"
          style={{ pathLength: prefersReduced ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}

/* ── Composição ────────────────────────────────────────────────────── */
const ACTS = [
  {
    num: "01",
    title: "Captação",
    caption: "Todo lead das redes cai no WhatsApp da clínica.",
    Scene: Act1Scene,
  },
  {
    num: "02",
    title: "Central",
    caption: "A Clinvex organiza, pontua e assume a conversa.",
    Scene: Act2Scene,
  },
  {
    num: "03",
    title: "Inteligência",
    caption: "Listas inteligentes, IA, disparos e automações trabalham juntos.",
    Scene: Act3Scene,
  },
  {
    num: "04",
    title: "Resultado",
    caption: "Mensagem certa, na hora certa, virando pacote fechado.",
    Scene: Act4Scene,
  },
];

export default function EcossistemaMobile() {
  return (
    <div className="relative flex flex-col gap-12">
      <ActsSpine />
      {ACTS.map(({ num, title, caption, Scene }) => (
        <Reveal key={num} className="relative z-10">
          <div
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent-400)" }}
              >
                {num}
              </span>
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                {title}
              </h3>
            </div>
            <Scene />
            <p
              className="mt-4 text-sm text-center leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {caption}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
