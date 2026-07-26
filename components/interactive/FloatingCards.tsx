"use client";

import { motion, useReducedMotion } from "framer-motion";

const cardBase = {
  background: "rgba(26,26,30,0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(245,183,49,0.15)",
  borderRadius: 12,
  opacity: 0.85,
} as const;

const floatAnimation = (duration: number, delay: number) => ({
  y: [0, -8, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

export default function FloatingCards() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
      {/* Badge — top right */}
      <motion.div
        className="absolute"
        style={{
          ...cardBase,
          top: "15%",
          right: "6%",
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 0.85,
          ...(prefersReduced ? { y: 0 } : floatAnimation(7, 0)),
        }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <span style={{ color: "rgba(245,183,49,0.9)" }}>★</span>{" "}
        <span style={{ color: "rgba(245,183,49,0.9)", marginRight: 4 }}>
          OURO
        </span>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>— prioridade</span>
      </motion.div>

      {/* WhatsApp message — left side */}
      <motion.div
        className="absolute"
        style={{
          ...cardBase,
          top: "48%",
          left: "4%",
          padding: "10px 14px",
          fontSize: 13,
          maxWidth: 220,
          lineHeight: 1.4,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 0.85,
          ...(prefersReduced ? { y: 0 } : floatAnimation(8, 1.5)),
        }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span style={{ color: "rgba(255,255,255,0.8)" }}>
          Oi! Vi o anúncio de vocês 👋
        </span>
        <span
          style={{
            float: "right",
            marginTop: 4,
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          12:04{" "}
          <span style={{ color: "#34B7F1", fontSize: 12 }}>✓✓</span>
        </span>
      </motion.div>

      {/* Score card — bottom right */}
      <motion.div
        className="absolute"
        style={{
          ...cardBase,
          bottom: "18%",
          right: "5%",
          padding: "10px 16px",
          fontSize: 13,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 0.85,
          ...(prefersReduced ? { y: 0 } : floatAnimation(9, 3)),
        }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
          Maria S.{" "}
          <span
            style={{
              color: "rgba(245,183,49,0.9)",
              fontWeight: 700,
              marginLeft: 6,
            }}
          >
            Score 92
          </span>
        </div>
        <div
          style={{
            marginTop: 6,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "92%",
              height: "100%",
              borderRadius: 2,
              background:
                "linear-gradient(90deg, rgba(245,183,49,0.6), rgba(245,183,49,0.9))",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
