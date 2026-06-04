"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PalettePreviewProps {
  palette: string[];
  onComplete?: () => void;
}

const scale = [
  "#f5f3ff",
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  "#2e1065",
];

export function PalettePreview({
  palette,
  onComplete,
}: PalettePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".palette-title", {
        y: 80,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".scale-swatch", {
        scale: 0,
        y: 80,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(2)",
      });

      gsap.from(".accent-swatch", {
        scale: 0,
        rotation: 180,
        stagger: 0.12,
        duration: 1,
        ease: "back.out(2)",
      });

      gsap.from(".token-card", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        delay: 0.6,
      });

      gsap.to(".palette-orb-1", {
        x: 120,
        y: -60,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".palette-orb-2", {
        x: -120,
        y: 80,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const timeout = setTimeout(() => {
        onComplete?.();
      }, 7000);

      return () => clearTimeout(timeout);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-40"
    >
      {/* Background */}

      <div className="absolute inset-0">
        <div className="palette-orb-1 absolute left-20 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px]" />

        <div className="palette-orb-2 absolute right-20 bottom-20 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        {/* Heading */}

        <div className="mb-20 text-center">
          <p className="mb-4 text-violet-400 uppercase tracking-[0.3em]">
            Palette Extracted
          </p>

          <h2 className="palette-title text-6xl font-black md:text-8xl">
            We Found
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              The Vibe
            </span>
          </h2>

          <p className="mt-6 text-zinc-400">
            AI-generated design system ready.
          </p>
        </div>

        {/* Primary Scale */}

        <div className="mb-20">
          <h3 className="mb-8 text-2xl font-bold">
            Primary Scale
          </h3>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {palette.map((color) => (
              <div key={color}>
                <div
                  className="scale-swatch h-28 rounded-2xl"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <p className="mt-2 text-center text-xs text-zinc-500">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Colors */}

        <div className="mb-20">
          <h3 className="mb-8 text-2xl font-bold">
            Accent Palette
          </h3>

          <div className="flex justify-center gap-8">
            {palette.slice(0, 3).map((color) => (
              <div
                key={color}
                className="accent-swatch"
              >
                <div
                  className="h-32 w-32 rounded-full shadow-[0_0_100px_rgba(139,92,246,0.4)]"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <p className="mt-4 text-center font-mono text-sm">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tokens */}

        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              title: "Primary",
              value: palette[0] ?? "N/A",
            },
            {
              title: "Secondary",
              value: palette[1] ?? "N/A",
            },
            {
              title: "Accent",
              value: palette[2] ?? "N/A",
            },
            {
              title: "Palette Size",
              value: `${palette.length} Colors`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                token-card
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
              "
            >
              <p className="text-sm text-zinc-500">
                {item.title}
              </p>

              <h4 className="mt-3 text-xl font-bold">
                {item.value}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}