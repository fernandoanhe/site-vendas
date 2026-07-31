"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface DrawPathProps {
  d: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function DrawPath({
  d,
  className,
  strokeColor = "var(--accent-400)",
  strokeWidth = 2,
}: DrawPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <svg
        style={{ overflow: "visible", width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <motion.path
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          style={{ pathLength }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
