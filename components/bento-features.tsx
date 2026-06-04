"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR_SCALE } from "@/constants/palette";

gsap.registerPlugin(ScrollTrigger);

function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-xs">
        ✓
      </span>
      {label}
    </div>
  );
}

export function BentoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-bento='card']", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-bento='grid']",
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-violet-400">Everything Included</p>
          <h2 className="text-5xl font-black tracking-tight md:text-7xl">
            More Than
            <br />
            Just A Palette
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            VibeKit generates complete production-ready design systems
            from a single screenshot.
          </p>
        </div>

        {/*
          auto-rows-[280px]: fixed row height.
          The "Live UI Previews" card uses md:row-span-2 (560px total).
          On small screens (<md) row-span collapses — the card height
          falls back to a single 280px row, which is fine since the
          preview grid inside is compact enough to fit.
        */}
        <div
          data-bento="grid"
          className="grid auto-rows-[280px] gap-6 md:grid-cols-3"
        >

          {/* Color System — spans 2 cols */}
          <div
            data-bento="card"
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-2"
          >
            <h3 className="mb-3 text-3xl font-bold">Accessible Color Systems</h3>
            <p className="text-zinc-400">Generate complete 50–950 scales.</p>
            <div className="mt-8 flex gap-2">
              {COLOR_SCALE.map((color) => (
                <div
                  key={color}
                  className="h-20 flex-1 rounded-xl"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div
            data-bento="card"
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-2xl font-bold">Style Analysis</h3>
            <div className="space-y-3">
              {["Modern SaaS", "Trustworthy", "Minimal", "Product Focused"].map((tag) => (
                <CheckItem key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Live UI Previews — 2 cols × 2 rows */}
          <div
            data-bento="card"
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 md:col-span-2 md:row-span-2"
          >
            <h3 className="mb-6 text-3xl font-bold">Live UI Previews</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { border: "border-violet-500/10", bg: "bg-violet-500/10", bar: "bg-violet-400/30", block1: "bg-violet-500/20", block2: "bg-violet-500/15" },
                { border: "border-pink-500/10", bg: "bg-pink-500/10", bar: "bg-pink-400/30", block1: "bg-pink-500/20", block2: "bg-pink-500/15" },
                { border: "border-cyan-500/10", bg: "bg-cyan-500/10", bar: "bg-cyan-400/30", block1: "bg-cyan-500/20", block2: "bg-cyan-500/15" },
              ].map(({ border, bg, bar, block1, block2 }, i) => (
                <div key={i} className={`rounded-2xl border ${border} ${bg} p-4`}>
                  <div className={`mb-3 h-3 w-20 rounded-full ${bar}`} />
                  <div className="space-y-2">
                    <div className={`h-8 rounded-lg ${block1}`} />
                    <div className={`h-16 rounded-lg ${block2}`} />
                    <div className={`h-6 w-2/3 rounded-lg ${block1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exports */}
          <div
            data-bento="card"
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-2xl font-bold">Exports</h3>
            <div className="space-y-3 text-zinc-400">
              {["Tailwind", "CSS Variables", "JSON Tokens", "Figma Tokens"].map((item) => (
                <div key={item} className="text-sm">{item}</div>
              ))}
            </div>
          </div>

          {/* Dark Mode */}
          <div
            data-bento="card"
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-2xl font-bold">Dark Mode</h3>
            <div className="h-32 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700" />
          </div>

          {/* Typography — spans 2 cols */}
          <div
            data-bento="card"
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-2"
          >
            <h3 className="mb-6 text-3xl font-bold">Typography Pairing</h3>
            <div className="space-y-2">
              <div className="text-5xl font-black">Space Grotesk</div>
              <div className="text-zinc-400">Inter · IBM Plex Mono</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}