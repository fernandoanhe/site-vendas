interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest ${className}`}
      style={{
        backgroundColor: "rgba(245, 183, 49, 0.1)",
        color: "var(--accent-400)",
        letterSpacing: "var(--tracking-wide)",
      }}
    >
      {children}
    </span>
  );
}
