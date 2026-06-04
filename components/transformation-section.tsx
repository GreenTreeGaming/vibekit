"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PALETTE } from "@/constants/palette";

gsap.registerPlugin(ScrollTrigger);

const SWATCHES = [
  { key: "1", color: PALETTE.primary, shadow: "shadow-violet-500/30", pos: "absolute -left-10 -top-6" },
  { key: "2", color: PALETTE.accent, shadow: "shadow-pink-500/30", pos: "absolute -right-10 top-10" },
  { key: "3", color: PALETTE.info, shadow: "shadow-cyan-500/30", pos: "absolute -left-6 -bottom-6" },
  { key: "4", color: PALETTE.secondary, shadow: "shadow-indigo-400/30", pos: "absolute -right-6 -bottom-6" },
] as const;

const FLOAT_OFFSETS = [
  { y: -10, duration: 2.8, delay: 0 },
  { y: 10, duration: 3.2, delay: 0.4 },
  { y: -8, duration: 2.5, delay: 0.8 },
  { y: 12, duration: 3.6, delay: 1.2 },
];

export function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from("[data-anim='card']", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Float swatches — scoped inside ctx so they only target within this section
      FLOAT_OFFSETS.forEach(({ y, duration, delay }, i) => {
        gsap.to(`[data-swatch="${i + 1}"]`, {
          y,
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef); // <-- scoped to sectionRef, no global class leakage

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-7xl px-8">

        {/* Screenshot + overlaid palette swatches */}
        <div data-anim="card" className="relative mx-auto w-[900px]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500 p-[1px]">
              <div className="flex h-full items-center justify-center rounded-3xl bg-black text-zinc-400 text-xl">
                Original Screenshot
              </div>
            </div>
          </div>

          {SWATCHES.map(({ key, color, shadow, pos }) => (
            <div
              key={key}
              data-animate="swatch"
              data-swatch={key}
              className={`${pos} h-16 w-16 rounded-2xl shadow-lg ${shadow}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Analysis + Tokens */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          <div data-anim="card" className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-3 text-sm text-zinc-400">AI Style Analysis</div>
            <h3 className="text-4xl font-bold">Modern SaaS</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-300">
              {["Minimal", "Product Focused", "Trustworthy", "Enterprise"].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-xs"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div data-anim="card" className="rounded-[32px] border border-white/10 bg-black/50 p-8 backdrop-blur-xl font-code">
            <pre className="text-sm text-zinc-300">{`:root {
  --primary: ${PALETTE.primary};
  --secondary: ${PALETTE.secondary};
  --accent: ${PALETTE.accent};
}

theme: {
  colors: {
    primary: ...
  }
}`}</pre>
          </div>
        </div>

        {/* Preview output — labelled so its light-mode treatment is clear */}
        <div data-anim="card" className="mt-6 overflow-hidden rounded-[32px] border border-white/10">
          <div className="flex items-center gap-3 border-b border-black/10 bg-zinc-100 px-6 py-3">
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-700">
              Preview
            </span>
            <span className="text-xs text-zinc-500">Generated Dashboard</span>
          </div>
          <div className="bg-white p-8 text-black">
            <div className="mb-6 flex justify-between">
              <div className="text-xl font-bold">Analytics Overview</div>
              <button
                className="rounded-xl px-4 py-2 text-sm text-white"
                style={{ backgroundColor: PALETTE.primary }}
              >
                Upgrade
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-32 rounded-2xl bg-violet-100" />
              <div className="h-32 rounded-2xl bg-pink-100" />
              <div className="h-32 rounded-2xl bg-cyan-100" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}