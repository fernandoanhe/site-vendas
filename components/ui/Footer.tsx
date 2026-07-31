const productLinks = [
  { label: "Jornada", href: "#jornada" },
  { label: "Plataforma", href: "#plataforma" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const legalLinks = [
  { label: "Termos de uso", href: "#" },
  { label: "Privacidade", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
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
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Gestão Comercial WhatsApp-First para Clínicas de Alto Ticket
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                Produto
              </p>
              <nav aria-label="Links do produto" className="flex flex-col gap-2">
                {productLinks.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--text-accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                Legal
              </p>
              <nav aria-label="Links legais" className="flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--text-accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                Contato
              </p>
              <a
                href="https://wa.me/5518997362555"
                className="text-sm transition-colors hover:text-[var(--text-accent)] flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--whatsapp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--border-default)" }}>
          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            © 2026 Clinvex. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
