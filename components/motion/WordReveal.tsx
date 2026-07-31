"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

interface WordRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  renderWord?: (word: string, index: number) => React.ReactNode;
}

export default function WordReveal({
  text,
  className,
  stagger = 0.06,
  renderWord,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease },
            },
          }}
        >
          {renderWord ? renderWord(word, i) : word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </motion.span>
  );
}
