"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function ToolsSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".tool-node", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: "sine.inOut",
      });

      gsap.to(".aurora", {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        ".tool-node",
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-40"
    >
      {/* Aurora */}

      <div
        className="
          aurora
          absolute
          left-1/2
          top-1/2
          h-[900px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-violet-500/15
          via-fuchsia-500/15
          to-cyan-500/15
          blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Heading */}

        <div className="mb-24 text-center">
          <p
            className="
              mb-4
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            Design Toolkit
          </p>

          <h2 className="text-7xl font-black">
            VibeKit OS
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              text-zinc-400
            "
          >
            A complete toolkit for
            extracting, generating and
            refining design systems.
          </p>
        </div>

        {/* Ecosystem */}

        <div
          className="
            relative
            mx-auto
            h-[850px]
            max-w-6xl
          "
        >
          {/* Connection SVG */}

          <svg
            className="
              absolute
              inset-0
              h-full
              w-full
            "
          >
            <line
              x1="50%"
              y1="50%"
              x2="25%"
              y2="20%"
              stroke="rgba(255,255,255,0.15)"
            />

            <line
              x1="50%"
              y1="50%"
              x2="75%"
              y2="20%"
              stroke="rgba(255,255,255,0.15)"
            />

            <line
              x1="50%"
              y1="50%"
              x2="25%"
              y2="80%"
              stroke="rgba(255,255,255,0.15)"
            />

            <line
              x1="50%"
              y1="50%"
              x2="75%"
              y2="80%"
              stroke="rgba(255,255,255,0.15)"
            />
          </svg>

          {/* Center */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              w-[340px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.04]
              p-10
              backdrop-blur-2xl
            "
          >
            <p className="text-sm text-violet-400">
              Core Engine
            </p>

            <h3 className="mt-3 text-4xl font-black">
              VibeKit
            </h3>

            <p className="mt-4 text-zinc-400">
              Design systems generated
              from screenshots, palettes,
              gradients and accessibility
              tooling.
            </p>
          </div>

          {/* Screenshot Analyzer */}

          <Link
            href="/create"
            className="
              tool-node
              absolute
              left-[5%]
              top-[5%]
              w-[300px]
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="mb-4 text-violet-400">
              Screenshot Analyzer
            </div>

            <div
              className="
                flex
                h-36
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/10
                text-zinc-500
              "
            >
              Drop Screenshot
            </div>
          </Link>

          {/* Gradient */}

          <Link
            href="/tools/gradient-generator"
            className="
              tool-node
              absolute
              right-[5%]
              top-[5%]
              w-[300px]
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="mb-4 text-violet-400">
              Gradient Generator
            </div>

            <div
              className="
                h-36
                rounded-2xl
              "
              style={{
                background:
                  "linear-gradient(135deg,#8B5CF6,#EC4899,#06B6D4)",
              }}
            />
          </Link>

          {/* Color Picker */}

          <Link
            href="/tools/color-picker"
            className="
              tool-node
              absolute
              bottom-[5%]
              left-[5%]
              w-[300px]
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="mb-4 text-violet-400">
              Color Picker
            </div>

            <div className="flex gap-2">
              {[
                "#8B5CF6",
                "#EC4899",
                "#06B6D4",
                "#10B981",
              ].map((color) => (
                <div
                  key={color}
                  className="h-24 flex-1 rounded-xl"
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </Link>

          {/* Contrast */}

          <Link
            href="/tools/contrast-checker"
            className="
              tool-node
              absolute
              bottom-[5%]
              right-[5%]
              w-[300px]
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="mb-4 text-violet-400">
              Contrast Checker
            </div>

            <div className="flex gap-3">
              <div className="rounded-xl bg-white px-4 py-3 text-black">
                AA
              </div>

              <div className="rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-400">
                7.4 : 1
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}