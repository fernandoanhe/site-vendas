"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        padding: "4rem 0",
      }}
    >
      {/* Top fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10"
        style={{
          height: "80px",
          background:
            "linear-gradient(to bottom, var(--bg-primary), transparent)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "80px",
          background:
            "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />

      <motion.div
        ref={containerRef}
        className="relative z-0 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "900px" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(245, 183, 49, 0.15)",
            boxShadow: "0 0 40px rgba(245, 183, 49, 0.08)",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            src="/hero-animation.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
