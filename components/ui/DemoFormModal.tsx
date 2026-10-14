"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DemoFormModal({ open, onClose }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeClinica, setNomeClinica] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function resetForm() {
    setNome("");
    setEmail("");
    setTelefone("");
    setNomeClinica("");
    setMensagem("");
    setErro(null);
    setSucesso(false);
  }

  function handleClose() {
    if (sucesso) resetForm();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          nome_clinica: nomeClinica,
          mensagem,
        }),
      });
      const data = (await res.json()) as { ok: boolean; erro?: string };
      if (!data.ok) {
        setErro(data.erro ?? "Erro ao enviar. Tente novamente.");
        setEnviando(false);
        return;
      }
      setSucesso(true);
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    }
    setEnviando(false);
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors " +
    "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)] " +
    "placeholder:text-[var(--text-muted)] focus:border-[var(--accent-400)]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xl leading-none"
            >
              ✕
            </button>

            {sucesso ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">✓</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Recebemos seu pedido!
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Entraremos em contato em até 24h.
                </p>
                <Button variant="primary" onClick={handleClose}>
                  Fechar
                </Button>
              </div>
            ) : (
              <>
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  Solicitar demonstração
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Preencha seus dados e entraremos em contato em até 24h.
                </p>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome *"
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email *"
                    className={inputClass}
                  />
                  <input
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="WhatsApp *"
                    className={inputClass}
                  />
                  <input
                    value={nomeClinica}
                    onChange={(e) => setNomeClinica(e.target.value)}
                    placeholder="Nome da clínica"
                    className={inputClass}
                  />
                  <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Mensagem (opcional)"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  {erro && (
                    <p
                      className="text-sm px-1"
                      style={{ color: "var(--danger)" }}
                    >
                      {erro}
                    </p>
                  )}

                  <Button variant="primary" type="submit">
                    {enviando ? "Enviando…" : "Solicitar demonstração"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
