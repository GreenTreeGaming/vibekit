"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

export function DocsOutputs() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-output='heading']",
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

      gsap.utils
        .toArray<HTMLElement>(
          "[data-output='card']"
        )
        .forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        });
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
            data-output="heading"
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            What You Get
          </p>

          <h2
            data-output="heading"
            className="
              mt-6
              text-5xl
              font-black
              md:text-7xl
            "
          >
            Everything Ready
            <br />
            To Ship
          </h2>

          <p
            data-output="heading"
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-zinc-400
            "
          >
            VibeKit doesn't just
            generate colors.

            <br />
            <br />

            It generates the actual
            assets, tokens, exports,
            and code needed to use
            those colors in production.
          </p>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              01
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Tailwind Theme
            </h3>

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/10
                bg-black/40
                p-6
                font-mono
                text-sm
                text-zinc-300
              "
            >
              <p>theme: {"{"}</p>
              <p className="ml-4">
                colors: {"{"}
              </p>
              <p className="ml-8">
                primary: {"{"}
              </p>
              <p className="ml-12">
                500: "#8B5CF6"
              </p>
              <p className="ml-8">
                {"}"}
              </p>
              <p className="ml-4">
                {"}"}
              </p>
              <p>{"}"}</p>
            </div>
          </div>

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              02
            </p>

            <h3 className="mt-4 text-4xl font-black">
              CSS Variables
            </h3>

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/10
                bg-black/40
                p-6
                font-mono
                text-sm
              "
            >
              <p>--primary-50</p>
              <p>--primary-100</p>
              <p>--primary-500</p>
              <p>--primary-900</p>
              <p>--background</p>
              <p>--foreground</p>
            </div>
          </div>

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              03
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Design Tokens
            </h3>

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/10
                bg-black/40
                p-6
                font-mono
                text-sm
              "
            >
              <p>{"{"}</p>
              <p className="ml-4">
                "primary": {"{"}
              </p>
              <p className="ml-8">
                "500": "#8B5CF6"
              </p>
              <p className="ml-4">
                {"}"}
              </p>
              <p>{"}"}</p>
            </div>
          </div>

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              04
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Gradient Exports
            </h3>

            <div
              className="
                mt-8
                h-48
                rounded-3xl
                border
                border-white/10
              "
              style={{
                background:
                  "linear-gradient(135deg,#8B5CF6,#EC4899,#06B6D4)",
              }}
            />

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-white/10
                bg-black/40
                p-4
                font-mono
                text-xs
              "
            >
              linear-gradient(...)
            </div>
          </div>

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              05
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Accessibility Report
            </h3>

            <div className="mt-8 space-y-4">
              {[
                "WCAG AA Pass",
                "Contrast Tested",
                "Semantic Colors Generated",
                "Dark Mode Ready",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-2xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-4
                    py-3
                    text-emerald-400
                  "
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div
            data-output="card"
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
            "
          >
            <p className="text-violet-400">
              06
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Figma Ready
            </h3>

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/10
                bg-black/30
                p-6
              "
            >
              <div className="space-y-3">
                <div className="rounded-xl bg-white/10 p-3">
                  Colors
                </div>

                <div className="rounded-xl bg-white/10 p-3">
                  Tokens
                </div>

                <div className="rounded-xl bg-white/10 p-3">
                  Components
                </div>

                <div className="rounded-xl bg-violet-500/20 p-3">
                  Design System
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}