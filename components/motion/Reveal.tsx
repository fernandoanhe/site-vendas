"use client";

import { motion } from "framer-motion";
import { ease, duration } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  direction = "up",
  once = true,
}: RevealProps) {
  const offset = 24;
  const axis = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  };

  const container = stagger
    ? {
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }
    : undefined;

  const item = {
    hidden: { opacity: 0, ...axis[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease, delay: stagger ? 0 : delay },
    },
  };

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-80px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const offset = 24;
  const axis = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...axis[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
