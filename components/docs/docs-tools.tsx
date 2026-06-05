"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

export function DocsTools() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(
          "[data-tool-card]"
        )
        .forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        });

      gsap.fromTo(
        "[data-tools='heading']",
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger:
              sectionRef.current,
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
      className="py-40"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <p
            data-tools="heading"
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            The Toolbox
          </p>

          <h2
            data-tools="heading"
            className="
              mt-6
              text-5xl
              font-black
              md:text-7xl
            "
          >
            Everything In One Place
          </h2>

          <p
            data-tools="heading"
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-zinc-400
            "
          >
            Most design workflows
            bounce between five
            different tools.

            <br />
            <br />

            VibeKit brings them
            together.
          </p>
        </div>

        {/* Screenshot Analyzer */}

        <div
          data-tool-card
          className="
            mt-24
            grid
            gap-12
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
              01
            </p>

            <h3 className="mt-4 text-5xl font-black">
              Screenshot
              Analyzer
            </h3>

            <p className="mt-6 text-lg text-zinc-400">
              Upload a website,
              dashboard,
              landing page,
              app, poster,
              or marketing graphic.

              <br />
              <br />

              VibeKit extracts
              dominant colors,
              identifies visual
              patterns,
              and builds the
              foundation for a
              complete design
              system.
            </p>
          </div>

          <div
            className="
              rounded-[32px]
              border
              border-white/10
              bg-black/30
              p-6
            "
          >
            <div className="h-[320px] rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500" />
          </div>
        </div>

        {/* Gradient Generator */}

        <div
          data-tool-card
          className="
            mt-10
            grid
            gap-12
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >
          <div
            className="
              order-2
              rounded-[32px]
              border
              border-white/10
              p-6
              lg:order-1
            "
          >
            <div
              className="
                h-[320px]
                rounded-2xl
              "
              style={{
                background:
                  "linear-gradient(135deg,#8B5CF6,#EC4899,#06B6D4)",
              }}
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
              02
            </p>

            <h3 className="mt-4 text-5xl font-black">
              Gradient
              Generator
            </h3>

            <p className="mt-6 text-lg text-zinc-400">
              Create linear,
              radial,
              conic,
              and mesh gradients.

              <br />
              <br />

              Export production-ready
              code for CSS,
              Tailwind,
              React,
              Figma,
              and more.
            </p>
          </div>
        </div>

        {/* Color Picker */}

        <div
          data-tool-card
          className="
            mt-10
            grid
            gap-12
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
              03
            </p>

            <h3 className="mt-4 text-5xl font-black">
              Color Picker
            </h3>

            <p className="mt-6 text-lg text-zinc-400">
              Explore colors,
              generate scales,
              discover harmonies,
              test accessibility,
              and export tokens.
            </p>
          </div>

          <div
            className="
              rounded-[32px]
              border
              border-white/10
              bg-black/30
              p-8
            "
          >
            <p className="font-mono text-4xl font-bold">
              #8B5CF6
            </p>

            <div className="mt-8 flex gap-2">
              {[
                "#EDE9FE",
                "#DDD6FE",
                "#C4B5FD",
                "#A78BFA",
                "#8B5CF6",
                "#7C3AED",
              ].map((color) => (
                <div
                  key={color}
                  className="h-24 flex-1 rounded-xl"
                  style={{
                    backgroundColor:
                      color,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contrast */}

        <div
          data-tool-card
          className="
            mt-10
            grid
            gap-12
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            p-10
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >
          <div
            className="
              order-2
              flex
              flex-col
              items-center
              justify-center
              rounded-[32px]
              border
              border-white/10
              bg-black/30
              p-10
              lg:order-1
            "
          >
            <p className="text-8xl font-black">
              7.2
            </p>

            <p className="mt-2 text-zinc-500">
              Contrast Ratio
            </p>

            <div
              className="
                mt-6
                rounded-full
                bg-emerald-500/20
                px-4
                py-2
                text-emerald-400
              "
            >
              AA PASS
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
              04
            </p>

            <h3 className="mt-4 text-5xl font-black">
              Contrast
              Checker
            </h3>

            <p className="mt-6 text-lg text-zinc-400">
              Instantly test
              accessibility against
              WCAG standards and
              understand whether
              text remains readable
              across backgrounds.
            </p>
          </div>
        </div>

        {/* Design Systems */}

        <div
          data-tool-card
          className="
            mt-10
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            p-12
            backdrop-blur-xl
          "
        >
          <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
            05
          </p>

          <h3 className="mt-4 text-center text-6xl font-black">
            Design System
            Generator
          </h3>

          <p className="mx-auto mt-6 max-w-4xl text-center text-lg text-zinc-400">
            Generate scales,
            semantic tokens,
            CSS variables,
            Tailwind themes,
            exports,
            and reusable design
            foundations from a
            single screenshot.
          </p>

          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-8 py-4">
              Screenshot
            </div>

            <div className="text-zinc-600">
              ↓
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-8 py-4">
              Palette
            </div>

            <div className="text-zinc-600">
              ↓
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 px-8 py-4">
              Tokens
            </div>

            <div className="text-zinc-600">
              ↓
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-8 py-4">
              Production Theme
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}