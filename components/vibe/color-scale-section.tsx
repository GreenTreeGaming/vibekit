"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {

  primary: Record<number, string>;

  secondary: Record<number, string>;

  accent: Record<number, string>;

}

export function ColorScaleSection({

  primary,

  secondary,

  accent,

}: Props) {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  function ScaleCard({
    title,
    scale,
  }: {
    title: string;
    scale: Record<number, string>;
  }) {
    return (
      <div
        className="
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/5
      "
      >
        <div className="border-b border-white/10 px-8 py-6">
          <h3 className="text-2xl font-bold">
            {title}
          </h3>
        </div>

        {Object.entries(scale).map(
          ([step, color]) => (
            <div
              key={step}
              className="
              scale-row
              flex
              items-center
              gap-6
              border-b
              border-white/5
              px-8
              py-6
            "
            >
              <div
                className="
                h-16
                w-16
                rounded-2xl
                border
                border-white/10
              "
                style={{
                  backgroundColor: color,
                }}
              />

              <div className="w-20">
                <span
                  className="
                  text-xl
                  font-bold
                "
                >
                  {step}
                </span>
              </div>

              <div
                className="
                flex-1
                font-mono
                text-zinc-300
              "
              >
                {color}
              </div>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    color
                  )
                }
                className="
                rounded-xl
                border
                border-white/10
                px-4
                py-2
                text-sm
                transition
                hover:bg-white/10
              "
              >
                Copy
              </button>
            </div>
          )
        )}
      </div>
    );
  }

  useEffect(() => {
    gsap.fromTo(
      ".scale-row",
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger:
            sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20">
          <p
            className="
              mb-4
              text-sm
              uppercase
              tracking-[0.3em]
              text-cyan-400
            "
          >
            Tailwind Scale
          </p>

          <h2
            className="
              text-6xl
              font-black
            "
          >
            50 → 950
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-zinc-400
            "
          >
            Accessible color scale
            generated automatically
            from the primary vibe.
          </p>
        </div>

        <div
          className="
    grid
    gap-8
    lg:grid-cols-3
  "
        >
          <ScaleCard
            title="Primary"
            scale={primary}
          />

          <ScaleCard
            title="Secondary"
            scale={secondary}
          />

          <ScaleCard
            title="Accent"
            scale={accent}
          />
        </div>
      </div>
    </section>
  );
}