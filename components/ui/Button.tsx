"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  variant = "primary",
  children,
  href,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl px-8 py-3.5 text-base transition-colors cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[var(--accent-400)] text-[var(--bg-primary)] hover:bg-[var(--accent-500)]",
    secondary:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--border-accent)] hover:text-[var(--text-accent)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
