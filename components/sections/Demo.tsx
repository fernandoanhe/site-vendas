"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TourInterativo from "@/components/interactive/TourInterativo";
import { submitDemoLead } from "@/server/actions/demo";
import { ease, duration, stagger } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration, ease } },
};

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Demo() {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("clinvex_demo_unlocked")) {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const result = await submitDemoLead(form);
    setLoading(false);

    if (result.ok) {
      localStorage.setItem("clinvex_demo_unlocked", "1");
      setUnlocked(true);
    } else {
      const errs = result.errors;
      if (errs) {
        const firstError = Object.values(errs).flat()[0];
        setError(firstError || "Verifique os campos.");
      }
    }
  }, []);

  return (
    <section
      id="demo"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <motion.div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <Badge>Tour guiado</Badge>
        </motion.div>

        <motion.h2
          className="mt-6 max-w-3xl text-3xl md:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: 1.15,
          }}
          variants={fadeUp}
        >
          Veja a plataforma por dentro
        </motion.h2>

        <motion.p
          className="mt-4 max-w-2xl text-lg"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
          variants={fadeUp}
        >
          Um tour guiado pelas telas reais do sistema: dashboard, chat, listas
          inteligentes, disparos e automação.
        </motion.p>

        <motion.div className="mt-12 relative" variants={fadeUp}>
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.div
                key="locked"
                className="relative rounded-2xl overflow-hidden"
                style={{ minHeight: 400 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Blurred background mockup */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    backgroundImage: `
                      linear-gradient(135deg, rgba(245,183,49,0.03) 0%, transparent 50%),
                      repeating-linear-gradient(90deg, transparent 0, transparent 200px, rgba(42,42,46,0.5) 200px, rgba(42,42,46,0.5) 201px),
                      repeating-linear-gradient(0deg, transparent 0, transparent 60px, rgba(42,42,46,0.3) 60px, rgba(42,42,46,0.3) 61px)
                    `,
                    filter: "blur(8px)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ backgroundColor: "rgba(10, 10, 11, 0.7)" }}
                />

                {/* Lock icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                {/* Form card */}
                <div className="relative z-10 flex items-center justify-center py-16 px-4">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md rounded-2xl border p-8"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      borderColor: "var(--border-default)",
                    }}
                  >
                    <h3
                      className="text-xl font-semibold mb-6"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Libere o tour completo
                    </h3>

                    <input
                      type="text"
                      name="_hp"
                      autoComplete="off"
                      tabIndex={-1}
                      className="absolute opacity-0 h-0 w-0"
                      aria-hidden="true"
                    />

                    <div className="flex flex-col gap-4">
                      <input
                        name="nome"
                        type="text"
                        required
                        placeholder="Seu nome"
                        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-[border-color] focus:border-[var(--accent-400)]"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-default)",
                        }}
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Seu melhor e-mail"
                        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-[border-color] focus:border-[var(--accent-400)]"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-default)",
                        }}
                      />
                      <input
                        name="whatsapp"
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-[border-color] focus:border-[var(--accent-400)]"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border-default)",
                        }}
                      />
                    </div>

                    {error && (
                      <p className="mt-3 text-sm" style={{ color: "var(--danger)" }}>
                        {error}
                      </p>
                    )}

                    <div className="mt-6">
                      <Button variant="primary" type="submit" className="w-full">
                        {loading ? "Liberando..." : "Liberar o tour"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease }}
              >
                <TourInterativo />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
