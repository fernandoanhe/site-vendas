"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const events = [
  { label: "Mensagem lida", points: "+5" },
  { label: "Clicou no link", points: "+8" },
  { label: "Respondeu em 2min", points: "+12" },
];

function useCounter(target: number, isInView: boolean, skipAnimation: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (skipAnimation) {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, skipAnimation, duration]);

  return value;
}

export default function ScoringPulse() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const score = useCounter(92, isInView, !!prefersReduced);

  return (
    <div
      ref={ref}
      className="mt-6 rounded-xl p-5 overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--success)" }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Maria Santos
          </span>
        </div>
        <span
          className="text-2xl font-bold tabular-nums"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent-400)",
          }}
        >
          {score}
        </span>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-accent)" }}
          initial={prefersReduced ? { width: "92%" } : { width: "0%" }}
          animate={isInView ? { width: "92%" } : { width: "0%" }}
          transition={{ duration: prefersReduced ? 0 : 1.5, ease }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {events.map((event, i) => (
          <motion.div
            key={event.label}
            className="flex items-center justify-between text-sm"
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: prefersReduced ? 0 : 0.8 + i * 0.25, duration: prefersReduced ? 0 : 0.4, ease }}
          >
            <span style={{ color: "var(--text-secondary)" }}>
              {event.label}
            </span>
            <span
              className="font-medium"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--success)",
              }}
            >
              {event.points}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        style={{
          backgroundColor: "rgba(245, 183, 49, 0.15)",
          color: "var(--accent-400)",
        }}
        initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: prefersReduced ? 0 : 1.6, duration: prefersReduced ? 0 : 0.6 }}
      >
        <span>&#9733;</span> OURO — prioridade máxima
      </motion.div>
    </div>
  );
}
