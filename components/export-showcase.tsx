"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PALETTE, EXPORT_TYPES } from "@/constants/palette";

gsap.registerPlugin(ScrollTrigger);

// Each export card gets a distinct gradient direction so they don't all look identical
const GRADIENT_DIRECTIONS = [
  "from-violet-500 to-cyan-500",
  "from-pink-500 to-violet-500",
  "from-cyan-500 to-emerald-500",
  "from-orange-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-emerald-500 to-cyan-500",
] as const;

export function ExportShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-export='title']", {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from("[data-export='code-line']", {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: "[data-export='code-panel']",
          start: "top 75%",
        },
      });

      gsap.from("[data-export='card']", {
        opacity: 0,
        y: 80,
        stagger: 0.12,
        duration: 1,
        scrollTrigger: {
          trigger: "[data-export='grid']",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40">
      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-20 text-center">
          <p className="mb-4 text-cyan-400">Production Ready</p>
          <h2
            data-export="title"
            className="text-5xl font-black tracking-tight md:text-7xl"
          >
            Export To
            <br />
            Anything
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            From Tailwind configs to CSS variables, VibeKit generates
            everything developers need.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">

          {/* Code Window */}
          <div
            data-export="code-panel"
            className="overflow-hidden rounded-[32px] border border-white/10 bg-black/60 backdrop-blur-xl self-start"
          >
            <div className="border-b border-white/10 p-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>

            <div className="space-y-2 p-8 font-code text-sm">
              <p data-export="code-line" className="text-zinc-500">// tailwind.config.ts</p>
              <p data-export="code-line">export default {"{"}</p>
              <p data-export="code-line" className="pl-4">theme: {"{"}</p>
              <p data-export="code-line" className="pl-8">colors: {"{"}</p>
              <p data-export="code-line" className="pl-12" style={{ color: PALETTE.primary }}>
                primary: "{PALETTE.primary}",
              </p>
              <p data-export="code-line" className="pl-12" style={{ color: PALETTE.accent }}>
                accent: "{PALETTE.accent}",
              </p>
              <p data-export="code-line" className="pl-12" style={{ color: PALETTE.info }}>
                info: "{PALETTE.info}",
              </p>
              <p data-export="code-line" className="pl-8">{"}"}</p>
              <p data-export="code-line" className="pl-4">{"}"}</p>
              <p data-export="code-line">{"}"}</p>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p data-export="code-line" className="text-zinc-500">// CSS Variables</p>
                {Object.entries(PALETTE).map(([key, val]) => (
                  <p key={key} data-export="code-line">
                    --{key}: {val};
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Export Type Cards — 2×3 grid so height matches the code panel */}
          <div data-export="grid" className="grid grid-cols-2 gap-4 self-start">
            {EXPORT_TYPES.map(({ label, description }, i) => (
              <div
                key={label}
                data-export="card"
                className="rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div
                  className={`mb-3 h-8 w-8 rounded-lg bg-gradient-to-br ${GRADIENT_DIRECTIONS[i]}`}
                />
                <h3 className="text-sm font-bold">{label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}