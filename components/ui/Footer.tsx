const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Preços", href: "#precos" },
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
        className="mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <a
          href="#"
          className="text-lg font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Gestão de Leads
        </a>

        <nav aria-label="Links do rodapé" className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-[var(--text-accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          © 2026 Gestão de Leads. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
