"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedGradientBg() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(".gradient-blob-1", {
      x: 250,
      y: -150,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".gradient-blob-2", {
      x: -200,
      y: 180,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".gradient-blob-3", {
      y: -120,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      <div
        className="
          gradient-blob-1
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-500/20
          blur-[160px]
        "
      />

      <div
        className="
          gradient-blob-2
          absolute
          right-0
          top-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/20
          blur-[160px]
        "
      />

      <div
        className="
          gradient-blob-3
          absolute
          bottom-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-fuchsia-500/20
          blur-[160px]
        "
      />
    </div>
  );
}