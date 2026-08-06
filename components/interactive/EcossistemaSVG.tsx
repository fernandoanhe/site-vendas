"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import EcossistemaMobile from "./EcossistemaMobile";
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
  flow,
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

/* ── Desktop: fluxo horizontal do funil ────────────────────────────── */
const DESKTOP_SEGS: Seg[] = [
  { id: "fb", d: flow(158, 110, 268, 216), color: FB, dur: 3.4, cycle: 6.8, delay: 0.2, arriveNode: "whatsapp", trail: true },
  { id: "ig", d: flow(158, 230, 266, 230), color: IG, dur: 3.4, cycle: 6.8, delay: 2.5, arriveNode: "whatsapp", trail: true },
  { id: "tt", d: flow(158, 350, 268, 244), color: TT, dur: 3.4, cycle: 6.8, delay: 4.7, arriveNode: "whatsapp", trail: true },
  { id: "wa", d: flow(334, 230, 458, 230), color: GREEN, dur: 2.6, cycle: 3.4, delay: 1.2, arriveNode: "clinvex", trail: true, width: 2.5 },
  { id: "cl-listas", d: flow(582, 230, 648, 75), color: GOLD, dur: 3.2, cycle: 6.4, delay: 0.8, arriveNode: "listas", trail: true },
  { id: "cl-ia", d: flow(582, 230, 648, 178), color: GOLD, dur: 3.2, cycle: 6.4, delay: 2.4, arriveNode: "ia", trail: true },
  { id: "cl-disparos", d: flow(582, 230, 648, 282), color: GOLD, dur: 3.2, cycle: 6.4, delay: 4.0, arriveNode: "disparos", trail: true },
  { id: "cl-automacoes", d: flow(582, 230, 648, 385), color: GOLD, dur: 3.2, cycle: 6.4, delay: 5.6, arriveNode: "automacoes", trail: true },
  { id: "disp-cli", d: flow(832, 282, 892, 218), color: GOLD, dur: 3.0, cycle: 6.4, delay: 0.4, arriveNode: "clientes", trail: true },
  { id: "auto-cli", d: flow(832, 385, 892, 238), color: GOLD, dur: 3.0, cycle: 6.4, delay: 3.6, arriveNode: "clientes", trail: true },
];

const NETWORKS = [
  { id: "facebook", label: "Facebook", y: 110 },
  { id: "instagram", label: "Instagram", y: 230 },
  { id: "tiktok", label: "TikTok", y: 350 },
];

const MODULES = [
  { id: "listas", label: "Listas", y: 75 },
  { id: "ia", label: "Inteligência Artificial", y: 178 },
  { id: "disparos", label: "Disparos", y: 282 },
  { id: "automacoes", label: "Automações", y: 385 },
];

function DesktopFlow({ prefersReduced }: { prefersReduced: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.25 });
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

  const { setPathRef, setDotRef } = useFlowEngine(DESKTOP_SEGS, active, onArrive);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 430"
      className="w-full"
      role="img"
      aria-label="Fluxo Clinvex: leads de Facebook, Instagram e TikTok chegam pelo WhatsApp, passam pela Clinvex, alimentam Listas, Inteligência Artificial, Disparos e Automações, e viram clientes com pacotes fechados"
    >
      <defs>
        <radialGradient id="clx-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
          <stop offset="70%" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Trilhas */}
      {DESKTOP_SEGS.map((s) => (
        <path
          key={s.id}
          ref={setPathRef(s.id)}
          d={s.d}
          fill="none"
          stroke={s.width ? "var(--border-strong)" : "var(--border-default)"}
          strokeWidth={s.width ?? 1.25}
        />
      ))}

      {/* Partículas */}
      {!prefersReduced &&
        DESKTOP_SEGS.map((s) => <SegmentDots key={`dots-${s.id}`} seg={s} setDotRef={setDotRef} withTrail />)}

      {/* Col 1 — Redes sociais */}
      {NETWORKS.map((n) => (
        <g key={n.id}>
          <rect x={26} y={n.y - 21} width={132} height={42} rx={10} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <FillIcon d={GLYPHS[n.id]} x={42} y={n.y - 8} size={16} color="var(--text-secondary)" />
          <text x={66} y={n.y + 4} fontSize="12" fill="var(--text-secondary)" fontFamily="var(--font-body)">
            {n.label}
          </text>
        </g>
      ))}

      {/* Col 2 — WhatsApp */}
      <g>
        <circle cx={300} cy={230} r={34} fill="rgba(37, 211, 102, 0.10)" stroke={GREEN} strokeWidth="1.5" />
        <FillIcon d={GLYPHS.whatsapp} x={285} y={215} size={30} color={GREEN} />
        <GlowCircle cx={300} cy={230} r={38} on={!!glows.whatsapp} color={GREEN} />
      </g>

      {/* Col 3 — Clinvex */}
      <g>
        <motion.circle
          cx={520}
          cy={230}
          r={86}
          fill="url(#clx-glow)"
          initial={false}
          animate={active ? { opacity: [0.45, 0.9, 0.45] } : { opacity: 0.5 }}
          transition={active ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        <circle cx={520} cy={230} r={60} fill="var(--bg-elevated)" stroke="var(--accent-400)" strokeWidth="2" />
        <GlowCircle cx={520} cy={230} r={65} on={!!glows.clinvex} color={GOLD} />
        <text
          x={520}
          y={238}
          textAnchor="middle"
          fontSize="23"
          fontWeight="600"
          fill="var(--accent-400)"
          fontFamily="var(--font-display)"
        >
          Clinvex
        </text>
      </g>

      {/* Col 4 — Módulos */}
      {MODULES.map((m) => (
        <g key={m.id}>
          <rect x={648} y={m.y - 21} width={184} height={42} rx={10} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <StrokeIcon x={664} y={m.y - 8} size={16}>
            {MODULE_ICONS[m.id]}
          </StrokeIcon>
          <text x={690} y={m.y + 4} fontSize="12" fill="var(--text-secondary)" fontFamily="var(--font-body)">
            {m.label}
          </text>
          <GlowRect x={648} y={m.y - 21} w={184} h={42} on={!!glows[m.id]} />
        </g>
      ))}

      {/* Col 5 — Clientes */}
      <g>
        <circle cx={928} cy={225} r={36} fill="var(--bg-elevated)" stroke={SUCCESS} strokeWidth="1.5" />
        <StrokeIcon x={913} y={210} size={30} color={SUCCESS}>
          {USERS_ICON}
        </StrokeIcon>
        <GlowCircle cx={928} cy={225} r={41} on={!!glows.clientes} color={SUCCESS} />
        {!prefersReduced && <MoneyFloaters floaters={floaters} cx={928} y={180} />}
        <Counter total={total} cx={928} y={302} />
      </g>
    </svg>
  );
}

/* ── Breakpoint: garante que só UMA versão monta os motores ────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function EcossistemaSVG() {
  const prefersReduced = !!useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="hidden md:block">
        {isMobile !== true && <DesktopFlow prefersReduced={prefersReduced} />}
      </div>
      <div className="md:hidden">{isMobile === true && <EcossistemaMobile />}</div>
    </div>
  );
}
