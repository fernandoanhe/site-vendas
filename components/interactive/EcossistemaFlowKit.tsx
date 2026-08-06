"use client";

/**
 * Kit compartilhado da animação do Ecossistema:
 * motor de partículas, ícones, átomos visuais e clímax (contador + cifrões).
 * Usado por EcossistemaSVG (desktop) e EcossistemaMobile (atos).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

/* ── Cores ─────────────────────────────────────────────────────────── */
export const GOLD = "#F5B731";
export const GREEN = "#25D366";
export const SUCCESS = "#34D399";
export const FB = "#1877F2";
export const IG = "#E1306C";
export const TT = "#F5F5F3";

/* ── Glifos (simple-icons, fill) ───────────────────────────────────── */
export const GLYPHS: Record<string, string> = {
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  tiktok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
};

/* ── Ícones lucide (stroke) ────────────────────────────────────────── */
export const MODULE_ICONS: Record<string, React.ReactNode> = {
  listas: (
    <>
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </>
  ),
  ia: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </>
  ),
  disparos: (
    <>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </>
  ),
  automacoes: (
    <>
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </>
  ),
};

export const USERS_ICON = (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

/* ── Geometria ─────────────────────────────────────────────────────── */
/** Curva horizontal esquerda → direita */
export const flow = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = x1 + (x2 - x1) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};

/** Curva vertical cima → baixo */
export const vflow = (x1: number, y1: number, x2: number, y2: number) => {
  const my = y1 + (y2 - y1) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
};

export type Seg = {
  id: string;
  d: string;
  color: string;
  dur: number;
  cycle: number;
  delay: number;
  arriveNode?: string;
  trail?: boolean;
  width?: number;
};

export const BASE_TOTAL = 47350;
const INCREMENTS = [280, 450, 190, 520, 340, 230, 610, 370];

/* ── Motor de partículas ───────────────────────────────────────────── */
function placeDot(
  el: SVGCircleElement | null,
  path: SVGPathElement,
  len: number,
  p: number,
  baseOpacity: number
) {
  if (!el) return;
  if (p < 0 || p > 1) {
    el.setAttribute("opacity", "0");
    return;
  }
  const pt = path.getPointAtLength(p * len);
  el.setAttribute("cx", String(pt.x));
  el.setAttribute("cy", String(pt.y));
  const edge = Math.min(p / 0.08, (1 - p) / 0.08, 1);
  el.setAttribute("opacity", String(Math.max(0, edge) * baseOpacity));
}

export function useFlowEngine(segs: Seg[], active: boolean, onArrive: (node: string) => void) {
  const pathRefs = useRef(new Map<string, SVGPathElement>());
  const dotRefs = useRef(new Map<string, (SVGCircleElement | null)[]>());
  const lens = useRef(new Map<string, number>());
  const arrived = useRef(new Map<string, boolean>());

  useAnimationFrame((t) => {
    if (!active) return;
    const sec = t / 1000;
    for (const s of segs) {
      const path = pathRefs.current.get(s.id);
      if (!path) continue;
      let len = lens.current.get(s.id);
      if (len === undefined) {
        try {
          len = path.getTotalLength();
        } catch {
          len = 0;
        }
        if (!len) continue;
        lens.current.set(s.id, len);
      }
      if (!arrived.current.has(s.id)) arrived.current.set(s.id, true);
      const lt = (((sec - s.delay) % s.cycle) + s.cycle) % s.cycle;
      const dots = dotRefs.current.get(s.id);
      if (!dots) continue;
      if (lt <= s.dur) {
        arrived.current.set(s.id, false);
        const p = lt / s.dur;
        placeDot(dots[0], path, len, p, 1);
        placeDot(dots[1], path, len, p - 0.05, 0.45);
        placeDot(dots[2], path, len, p - 0.1, 0.22);
      } else {
        if (!arrived.current.get(s.id)) {
          arrived.current.set(s.id, true);
          if (s.arriveNode) onArrive(s.arriveNode);
        }
        for (const d of dots) d?.setAttribute("opacity", "0");
      }
    }
  });

  const setPathRef = useCallback(
    (id: string) => (el: SVGPathElement | null) => {
      if (el) pathRefs.current.set(id, el);
    },
    []
  );
  const setDotRef = useCallback(
    (id: string, i: number) => (el: SVGCircleElement | null) => {
      const arr = dotRefs.current.get(id) ?? [];
      arr[i] = el;
      dotRefs.current.set(id, arr);
    },
    []
  );
  return { setPathRef, setDotRef };
}

/* ── Clímax: contador + cifrões ────────────────────────────────────── */
export function useMoney(active: boolean) {
  const [total, setTotal] = useState(BASE_TOTAL);
  const [floaters, setFloaters] = useState<{ id: number; dx: number }[]>([]);
  const idRef = useRef(0);
  const timeouts = useRef<number[]>([]);

  // Reinicia discretamente quando a seção sai do viewport
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) {
      setTotal(BASE_TOTAL);
      setFloaters([]);
    }
  }

  useEffect(() => {
    const list = timeouts.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  const onSale = useCallback(() => {
    const id = idRef.current++;
    setTotal((t) => t + INCREMENTS[id % INCREMENTS.length]);
    setFloaters((f) => (f.length >= 3 ? f : [...f, { id, dx: ((id % 3) - 1) * 16 }]));
    timeouts.current.push(
      window.setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1250)
    );
  }, []);

  return { total, floaters, onSale };
}

export function useGlows() {
  const [glows, setGlows] = useState<Record<string, boolean>>({});
  const timeouts = useRef<number[]>([]);
  useEffect(() => {
    const list = timeouts.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);
  const glow = useCallback((id: string) => {
    setGlows((g) => ({ ...g, [id]: true }));
    timeouts.current.push(
      window.setTimeout(() => setGlows((g) => ({ ...g, [id]: false })), 350)
    );
  }, []);
  return { glows, glow };
}

/* ── Átomos visuais ────────────────────────────────────────────────── */
export function StrokeIcon({
  children,
  x,
  y,
  size = 16,
  color = "var(--accent-400)",
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  size?: number;
  color?: string;
}) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

export function FillIcon({
  d,
  x,
  y,
  size = 16,
  color,
}: {
  d: string;
  x: number;
  y: number;
  size?: number;
  color: string;
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size / 24})`}>
      <path d={d} fill={color} />
    </g>
  );
}

export function GlowRect({
  x,
  y,
  w,
  h,
  on,
  color = "var(--accent-400)",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  on: boolean;
  color?: string;
}) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={10}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      pointerEvents="none"
      initial={false}
      animate={{ opacity: on ? 0.9 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export function GlowCircle({
  cx,
  cy,
  r,
  on,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  on: boolean;
  color: string;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      pointerEvents="none"
      initial={false}
      animate={{ opacity: on ? 0.8 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export function SegmentDots({
  seg,
  setDotRef,
  withTrail,
}: {
  seg: Seg;
  setDotRef: (id: string, i: number) => (el: SVGCircleElement | null) => void;
  withTrail: boolean;
}) {
  return (
    <g>
      {withTrail && <circle ref={setDotRef(seg.id, 2)} r={1.7} fill={seg.color} opacity="0" />}
      {withTrail && <circle ref={setDotRef(seg.id, 1)} r={2.6} fill={seg.color} opacity="0" />}
      <circle ref={setDotRef(seg.id, 0)} r={4} fill={seg.color} opacity="0" />
    </g>
  );
}

export function MoneyFloaters({
  floaters,
  cx,
  y,
}: {
  floaters: { id: number; dx: number }[];
  cx: number;
  y: number;
}) {
  return (
    <>
      {floaters.map((f) => (
        <motion.text
          key={f.id}
          x={cx + f.dx}
          y={y}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={SUCCESS}
          fontFamily="var(--font-mono)"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: -40 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          R$
        </motion.text>
      ))}
    </>
  );
}

export function Counter({
  total,
  cx,
  y,
  valueSize = 17,
}: {
  total: number;
  cx: number;
  y: number;
  valueSize?: number;
}) {
  return (
    <g>
      <text
        x={cx}
        y={y}
        textAnchor="middle"
        fontSize={valueSize}
        fontWeight="700"
        fill={SUCCESS}
        fontFamily="var(--font-mono)"
      >
        R$ {total.toLocaleString("pt-BR")}
      </text>
      <text
        x={cx}
        y={y + 20}
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--text-muted)"
        fontFamily="var(--font-body)"
      >
        em pacotes fechados
      </text>
    </g>
  );
}
