"use client";

import { motion, useReducedMotion } from "framer-motion";

const sources = [
  { label: "Meta Ads", x: 60, y: 100 },
  { label: "Instagram", x: 60, y: 200 },
  { label: "WhatsApp", x: 60, y: 300 },
];

const satellites = [
  { label: "Scoring", x: 620, y: 60 },
  { label: "Listas", x: 680, y: 140 },
  { label: "Chat", x: 680, y: 220 },
  { label: "Disparos", x: 680, y: 300 },
  { label: "Automação", x: 620, y: 380 },
];

const coreX = 370;
const coreY = 200;

function Pulse({ x1, y1, x2, y2, delay, prefersReduced }: { x1: number; y1: number; x2: number; y2: number; delay: number; prefersReduced: boolean }) {
  if (prefersReduced) return null;
  return (
    <motion.circle
      r="4"
      fill="var(--accent-400)"
      opacity={0.6}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "linear",
      }}
    />
  );
}

function DesktopView({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <svg viewBox="0 0 740 420" className="w-full hidden md:block" aria-label="Ecossistema Clinvex: fontes de tráfego conectadas ao núcleo central que alimenta cinco ferramentas">
      {/* Connection lines from sources to core */}
      {sources.map((s) => (
        <line key={s.label} x1={s.x + 40} y1={s.y} x2={coreX} y2={coreY} stroke="var(--border-default)" strokeWidth="1" />
      ))}
      {/* Connection lines from core to satellites */}
      {satellites.map((s) => (
        <line key={s.label} x1={coreX} y1={coreY} x2={s.x - 30} y2={s.y} stroke="var(--border-default)" strokeWidth="1" />
      ))}

      {/* Pulses from sources */}
      {sources.map((s, i) => (
        <Pulse key={`p-${s.label}`} x1={s.x + 40} y1={s.y} x2={coreX} y2={coreY} delay={i * 0.8} prefersReduced={prefersReduced} />
      ))}
      {/* Pulses to satellites */}
      {satellites.map((s, i) => (
        <Pulse key={`ps-${s.label}`} x1={coreX} y1={coreY} x2={s.x - 30} y2={s.y} delay={i * 0.8 + 0.5} prefersReduced={prefersReduced} />
      ))}

      {/* Source nodes */}
      {sources.map((s) => (
        <g key={s.label}>
          <rect x={s.x - 40} y={s.y - 18} width="80" height="36" rx="8" fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <text x={s.x} y={s.y + 5} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-body)">{s.label}</text>
        </g>
      ))}

      {/* Core node */}
      <circle cx={coreX} cy={coreY} r="42" fill="var(--bg-elevated)" stroke="var(--accent-400)" strokeWidth="2" />
      <text x={coreX} y={coreY + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent-400)" fontFamily="var(--font-display)">Clinvex</text>

      {/* Satellite nodes */}
      {satellites.map((s, i) => (
        <motion.g
          key={s.label}
          animate={prefersReduced ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={s.x - 38} y={s.y - 16} width="76" height="32" rx="8" fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-body)">{s.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function MobileView({ prefersReduced }: { prefersReduced: boolean }) {
  const items = [
    { label: "Meta Ads", y: 30 },
    { label: "Instagram", y: 90 },
    { label: "WhatsApp", y: 150 },
    { label: "Clinvex", y: 240, isCore: true },
    { label: "Scoring", y: 330 },
    { label: "Listas", y: 390 },
    { label: "Chat", y: 450 },
    { label: "Disparos", y: 510 },
    { label: "Automação", y: 570 },
  ];
  const cx = 150;

  return (
    <svg viewBox="0 0 300 620" className="w-full md:hidden" aria-label="Ecossistema Clinvex: fontes de tráfego conectadas ao núcleo central que alimenta cinco ferramentas">
      {/* Vertical line */}
      <line x1={cx} y1={30} x2={cx} y2={570} stroke="var(--border-default)" strokeWidth="1" />
      {!prefersReduced && (
        <motion.circle
          r="4"
          fill="var(--accent-400)"
          opacity={0.6}
          animate={{ cx: [cx, cx], cy: [30, 570], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
        />
      )}

      {items.map((item) => (
        <g key={item.label}>
          {item.isCore ? (
            <>
              <circle cx={cx} cy={item.y} r="30" fill="var(--bg-elevated)" stroke="var(--accent-400)" strokeWidth="2" />
              <text x={cx} y={item.y + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent-400)" fontFamily="var(--font-display)">{item.label}</text>
            </>
          ) : (
            <>
              <rect x={cx - 50} y={item.y - 16} width="100" height="32" rx="8" fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth="1" />
              <text x={cx} y={item.y + 4} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-body)">{item.label}</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function EcossistemaSVG() {
  const prefersReduced = !!useReducedMotion();
  return (
    <div className="max-w-3xl mx-auto">
      <DesktopView prefersReduced={prefersReduced} />
      <MobileView prefersReduced={prefersReduced} />
    </div>
  );
}
