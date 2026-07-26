"use client";

import { motion, useReducedMotion } from "framer-motion";

const rays = [
  { angle: 18, width: 180, left: "8%", opacity: 0.14, duration: 14, delay: 0 },
  { angle: 24, width: 120, left: "25%", opacity: 0.12, duration: 16, delay: 3 },
  { angle: 15, width: 220, left: "42%", opacity: 0.18, duration: 13, delay: 1.5 },
  { angle: 28, width: 100, left: "60%", opacity: 0.10, duration: 18, delay: 5 },
  { angle: 20, width: 160, left: "78%", opacity: 0.14, duration: 15, delay: 2.5 },
];

export default function LightRays() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {rays.map((ray, i) => (
        <motion.div
          key={i}
          className="absolute -top-1/4"
          style={{
            left: ray.left,
            width: ray.width,
            height: "140%",
            background: `linear-gradient(180deg, rgba(245, 183, 49, ${ray.opacity + 0.02}) 0%, rgba(245, 183, 49, ${ray.opacity}) 40%, transparent 100%)`,
            filter: "blur(40px)",
            transform: `rotate(${ray.angle}deg)`,
            transformOrigin: "top center",
          }}
          initial={{ opacity: prefersReduced ? 0.75 : 0.5 }}
          animate={
            prefersReduced
              ? { opacity: 0.75 }
              : { opacity: [0.5, 1, 0.5] }
          }
          transition={
            prefersReduced
              ? undefined
              : {
                  duration: ray.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ray.delay,
                }
          }
        />
      ))}
    </div>
  );
}
