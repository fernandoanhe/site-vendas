"use client";

import { useRef, useEffect, useCallback } from "react";

export default function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !video.duration) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    if (sectionHeight <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
    video.currentTime = progress * video.duration;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg-primary)",
        minHeight: "150vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
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
              <div
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
                  playsInline
                  preload="auto"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
