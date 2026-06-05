"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

export function DocsRoadmap() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-roadmap='heading']",
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
            start: "top 75%",
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>(
          "[data-roadmap='step']"
        )
        .forEach(
          (step, index) => {
            gsap.fromTo(
              step,
              {
                opacity: 0,
                y: 100,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                delay:
                  index * 0.05,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: step,
                  start:
                    "top 85%",
                },
              }
            );
          }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const roadmap = [
    {
      year: "Today",
      title:
        "Screenshot Analysis",
      description:
        "Extract palettes, generate scales, create gradients, test accessibility, and export production-ready themes.",
    },
    {
      year: "Next",
      title:
        "AI Style Analysis",
      description:
        "Understand the visual personality of a design. Modern SaaS. Luxury Ecommerce. Fintech. Editorial. Minimalist.",
    },
    {
      year: "Soon",
      title:
        "URL Analysis",
      description:
        "Paste a website URL and instantly generate a design system without taking a screenshot.",
    },
    {
      year: "Future",
      title:
        "Figma Integration",
      description:
        "Push generated themes directly into design files and component libraries.",
    },
    {
      year: "Vision",
      title:
        "Steal This Vibe",
      description:
        "Turn any design inspiration into a complete production-ready design system with a single click.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        py-40
      "
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <p
            data-roadmap="heading"
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            The Future
          </p>

          <h2
            data-roadmap="heading"
            className="
              mt-6
              text-5xl
              font-black
              md:text-7xl
            "
          >
            Where VibeKit
            <br />
            Is Heading
          </h2>

          <p
            data-roadmap="heading"
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-zinc-400
            "
          >
            The current platform is
            only the beginning.
          </p>
        </div>

        <div
          className="
            relative
            mx-auto
            mt-24
            max-w-5xl
          "
        >
          {/* Vertical Line */}

          <div
            className="
              absolute
              left-[31px]
              top-0
              bottom-0
              w-px
              bg-white/10
            "
          />

          <div className="space-y-16">
            {roadmap.map(
              (item) => (
                <div
                  key={item.title}
                  data-roadmap="step"
                  className="
                    flex
                    gap-8
                  "
                >
                  <div
                    className="
                      relative
                      h-16
                      w-16
                      shrink-0
                      rounded-full
                      border
                      border-violet-500/20
                      bg-violet-500/10
                    "
                  />

                  <div
                    className="
                      flex-1
                      rounded-[32px]
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-8
                      backdrop-blur-xl
                    "
                  >
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-violet-400
                      "
                    >
                      {item.year}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-3xl
                        font-black
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-zinc-400
                        leading-relaxed
                      "
                    >
                      {
                        item.description
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="
            mt-32
            text-center
          "
        >
          <p
            className="
              text-3xl
              font-bold
              text-zinc-300
            "
          >
            The goal isn't to generate
            colors.
          </p>

          <p
            className="
              mt-6
              bg-gradient-to-r
              from-violet-400
              via-fuchsia-400
              to-cyan-400
              bg-clip-text
              text-5xl
              font-black
              text-transparent
              md:text-7xl
            "
          >
            It's to capture taste.
          </p>
        </div>
      </div>
    </section>
  );
}