"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useUtmParams } from "@/hooks/useUtmParams";
import { buildSignupUrl, trackEvent, trackPixel } from "@/lib/tracking";

const navLinks = [
  { label: "Jornada", href: "#jornada" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

function handleCtaClick() {
  trackEvent("cta_click", { location: "navbar", action: "signup" });
  trackPixel("Lead");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const utmParams = useUtmParams();
  const signupUrl = buildSignupUrl(undefined, utmParams);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className="sticky top-0 z-50 transition-[border-color] duration-300"
      style={{
        backgroundColor: "rgba(10, 10, 11, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(245, 183, 49, 0.15)" : "var(--border-default)"}`,
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 py-4"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <a
          href="#"
          className="text-xl font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Clinvex
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] transition-colors hover:text-[var(--text-accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" href={signupUrl} onClick={handleCtaClick}>
            Testar grátis
          </Button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-5 h-0.5 transition-transform"
            style={{
              backgroundColor: "var(--text-primary)",
              transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-opacity"
            style={{
              backgroundColor: "var(--text-primary)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-transform"
            style={{
              backgroundColor: "var(--text-primary)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              borderColor: "var(--border-default)",
              backgroundColor: "rgba(10, 10, 11, 0.95)",
            }}
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[15px] transition-colors hover:text-[var(--text-accent)]"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="primary" href={signupUrl} onClick={handleCtaClick}>
                Testar grátis
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
