"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const items = [
  { icon: "⭐", label: "Scoring Inteligente" },
  { icon: "💬", label: "Chat WhatsApp" },
  { icon: "📊", label: "Dashboard Completo" },
  { icon: "🛡️", label: "Proteção de Número" },
];

export default function FeatureStrip() {
  return (
    <section
      style={{
        padding: "3rem 0",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {items.map((item) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3"
              variants={fadeUp}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(245, 183, 49, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
