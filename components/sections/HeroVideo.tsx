"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  if (isInView && videoRef.current?.paused) {
    videoRef.current.play().catch(() => {});
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg-primary)",
        padding: "5rem 0",
      }}
    >
      <div
        className="mx-auto w-full px-4 sm:px-6"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <div
          className="hero-video-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div className="hero-video-left" />

          <div
            className="hero-video-right"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease }}
              style={{
                maxWidth: "500px",
                width: "100%",
                borderRadius: "16px",
                border: "1px solid rgba(245, 183, 49, 0.15)",
                boxShadow: "0 0 30px rgba(245, 183, 49, 0.06)",
                overflow: "hidden",
              }}
            >
              <video
                ref={videoRef}
                src="/hero-animation.mp4"
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
