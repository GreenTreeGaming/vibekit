"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Image Analysis",
    description:
      "VibeKit analyzes the uploaded screenshot, identifying visual regions, color density, hierarchy, and composition patterns.",
  },
  {
    number: "02",
    title: "Color Extraction",
    description:
      "Dominant colors are extracted and classified into primary, secondary, accent, and supporting palette roles.",
  },
  {
    number: "03",
    title: "Scale Generation",
    description:
      "Each color is expanded into accessible 50–950 scales suitable for production design systems.",
  },
  {
    number: "04",
    title: "Accessibility Engine",
    description:
      "Contrast ratios are validated, semantic roles are generated, and dark mode compatibility is evaluated.",
  },
  {
    number: "05",
    title: "Export Compilation",
    description:
      "Everything is assembled into Tailwind themes, CSS variables, design tokens, gradients, JSON exports, and more.",
  },
];

export function DocsPipeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial hidden state via GSAP before paint to avoid flash
    gsap.set("[data-pipeline='heading']", { opacity: 0, y: 40 });
    gsap.set("[data-pipeline='card']", { opacity: 0, y: 50 });

    const ctx = gsap.context(() => {
      gsap.to("[data-pipeline='heading']", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>("[data-pipeline='card']")
        .forEach((card, index) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40">
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <p
            data-pipeline="heading"
            className="text-sm uppercase tracking-[0.3em] text-violet-400"
          >
            Under The Hood
          </p>

          <h2
            data-pipeline="heading"
            className="mt-6 text-5xl font-black md:text-7xl"
          >
            How The Engine
            <br />
            Actually Works
          </h2>

          <p
            data-pipeline="heading"
            className="mx-auto mt-8 max-w-3xl text-xl text-zinc-400"
          >
            VibeKit does much more than extract a few colors.
            <br />
            <br />
            Behind every generated theme is a pipeline that transforms visual
            inspiration into a production-ready design system.
          </p>
        </div>

        <div className="mt-24">
          <div className="grid gap-6 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.number}
                data-pipeline="card"
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

                <p className="text-sm font-bold tracking-[0.2em] text-violet-400">
                  {step.number}
                </p>

                <h3 className="mt-4 text-3xl font-black">{step.title}</h3>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-4">
          {[
            "Image Analysis",
            "Palette Extraction",
            "Scale Generation",
            "Accessibility Checks",
            "Design Tokens",
            "Tailwind Themes",
            "CSS Variables",
            "JSON Exports",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-400"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}