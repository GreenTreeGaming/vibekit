"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PALETTE, PALETTE_HEX } from "@/constants/palette";
import Link from "next/link";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero='title']",
        { opacity: 0, y: 120 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          "[data-hero='copy']",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.8"
        )
        .fromTo(
          "[data-hero='button']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='card']",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
          "-=0.5"
        );

      gsap.fromTo(
        "[data-hero='swatch']",
        { scale: 0, y: 80, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, stagger: 0.08, delay: 1.2, ease: "back.out(2)", duration: 0.6 }
      );

      gsap.fromTo(
        "[data-hero='token']",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, delay: 1.5, duration: 0.5 }
      );

      // Blobs
      gsap.to("[data-animate='blob'][data-blob='1']", {
        x: 120, y: -100, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to("[data-animate='blob'][data-blob='2']", {
        x: -150, y: 120, duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to("[data-animate='blob'][data-blob='3']", {
        y: -120, duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Scanner sweeps top to bottom and loops cleanly
      gsap.fromTo(
        "[data-hero='scanner']",
        { y: "-100%" },
        { y: "100%", duration: 2.2, repeat: -1, ease: "none" }
      );

      // Gradient text shimmer
      gsap.to("[data-hero='gradient-text']", {
        backgroundPosition: "200% center",
        duration: 6,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    // Mouse parallax — perspective is on cardWrapRef
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(cardRef.current, {
        rotateY: x * 0.2,
        rotateX: -y * 0.2,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to("[data-hero='spotlight']", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Spotlight — absolute within hero, not fixed */}
      <div
        data-hero="spotlight"
        className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[140px]"
      />

      {/* Blobs */}
      <div
        data-animate="blob"
        data-blob="1"
        className="absolute left-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-violet-600/20 blur-[180px]"
      />
      <div
        data-animate="blob"
        data-blob="2"
        className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-cyan-500/20 blur-[180px]"
      />
      <div
        data-animate="blob"
        data-blob="3"
        className="absolute bottom-[-20%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[180px]"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-8 pt-32 text-center">
        <h1
          data-hero="title"
          className="max-w-6xl text-6xl font-black tracking-[-0.06em] md:text-8xl lg:text-9xl"
        >
          Build Better
          <span
            data-hero="gradient-text"
            className="
      bg-gradient-to-r
      from-violet-400
      via-pink-400
      to-cyan-400
      bg-[length:200%_auto]
      bg-clip-text
      text-transparent
    "
          >
            {" "}Design Systems
          </span>
        </h1>

        <p
          data-hero="copy"
          className="mt-8 max-w-4xl text-xl text-zinc-400"
        >
          Extract palettes from screenshots,
          generate gradients, explore colors,
          test accessibility, and export
          production-ready design tokens.
        </p>

        <p
          data-hero="copy"
          className="mt-8 max-w-3xl text-xl text-zinc-400"
        >
          Upload a website, dashboard, app, poster, or landing page.
          VibeKit extracts colors, typography, tokens, gradients, and
          visual identity.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/create"
            data-hero="button"
            className="
    rounded-2xl
    bg-gradient-to-r
    from-violet-500
    to-cyan-500
    px-8
    py-4
    font-semibold
    text-white
    shadow-[0_0_40px_rgba(99,102,241,0.35)]
    transition-all
    hover:scale-[1.03]
  "
          >
            Create Design System
          </Link>
          <button
            data-hero="button"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition-colors hover:bg-white/10"
          >
            Watch Demo
          </button>
        </div>

        {/* Perspective wrapper so rotateX/Y are visible */}
        <div
          ref={cardWrapRef}
          data-hero="card"
          className="mt-24 w-full max-w-6xl"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={cardRef}
            data-animate="card"
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl"
          >
            {/* Scanner sweeps inside overflow-hidden card */}
            <div
              data-hero="scanner"
              className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />

            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left */}

              <div className="border-r border-white/10 p-8">
                <div
                  className="
        flex
        aspect-video
        flex-col
        justify-between
        rounded-3xl
        border
        border-white/10
        bg-black/40
        p-6
      "
                >
                  <div>
                    <p className="text-sm text-zinc-500">
                      Screenshot Analyzer
                    </p>

                    <div
                      className="
            mt-4
            flex
            h-56
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
                  </div>

                  <div>
                    <p className="mb-3 text-sm text-zinc-500">
                      Extracted Palette
                    </p>

                    <div className="flex gap-2">
                      {PALETTE_HEX.map((color) => (
                        <div
                          key={color}
                          data-hero="swatch"
                          className="h-12 w-12 rounded-xl"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="space-y-4 p-8">
                <div
                  className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
      "
                >
                  <p className="text-sm text-zinc-500">
                    Gradient Generator
                  </p>

                  <div
                    className="mt-3 h-20 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg,#8B5CF6,#EC4899,#06B6D4)",
                    }}
                  />
                </div>

                <div
                  className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
      "
                >
                  <p className="text-sm text-zinc-500">
                    Color Picker
                  </p>

                  <div className="mt-3 flex gap-2">
                    {PALETTE_HEX.slice(0, 4).map(
                      (color) => (
                        <div
                          key={color}
                          className="h-10 flex-1 rounded-lg"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div
                  className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
      "
                >
                  <p className="text-sm text-zinc-500">
                    Contrast Checker
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="rounded-lg bg-white px-3 py-2 text-black">
                      AA
                    </div>

                    <div className="rounded-lg bg-emerald-500/20 px-3 py-2 text-emerald-400">
                      7.2:1
                    </div>
                  </div>
                </div>

                <div
                  className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
        text-left
        font-mono
        text-xs
      "
                >
                  {Object.entries(PALETTE)
                    .slice(0, 4)
                    .map(([key, val]) => (
                      <p
                        key={key}
                        data-hero="token"
                      >
                        --{key}: {val};
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}