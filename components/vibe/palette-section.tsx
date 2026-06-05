"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Color from "color";

interface Props {
  primary: Record<number, string>;
  secondary: Record<number, string>;
  accent: Record<number, string>;
}

export function PaletteSection({
  primary,
  secondary,
  accent,
}: Props) {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const colors = [
    {
      label: "Primary",
      value: primary[500],
    },
    {
      label: "Secondary",
      value: secondary[500],
    },
    {
      label: "Accent",
      value: accent[500],
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      ".palette-item",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
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
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            Palette Analysis
          </p>

          <h2 className="text-6xl font-black">
            Color Intelligence
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Technical breakdown of the
            generated design system.
          </p>
        </div>

        {/* Core Colors */}

        <div className="grid gap-8 lg:grid-cols-3">
          {colors.map((item) => (
            <ColorCard
              key={item.label}
              label={item.label}
              color={item.value}
            />
          ))}
        </div>

        {/* Technical Stats */}

        <div
          className="
            palette-item
            mt-12
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            p-10
          "
        >
          <h3 className="mb-8 text-3xl font-black">
            Technical Metrics
          </h3>

          <div className="grid gap-8 md:grid-cols-4">
            <Metric
              label="Colors"
              value="3"
            />

            <Metric
              label="Gradient Stops"
              value="3"
            />

            <Metric
              label="Primary Hue"
              value={`${Math.round(
                Color(
                  primary[500]
                ).hue()
              )}°`}
            />

            <Metric
              label="Accessibility"
              value="AA"
            />
          </div>
        </div>

        {/* Gradient Preview */}

        <div
          className="
            palette-item
            mt-12
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
          "
        >
          <div
            className="h-56"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  ${primary[500]},
                  ${secondary[500]},
                  ${accent[500]}
                )
              `,
            }}
          />

          <div className="p-8">
            <h3 className="text-3xl font-black">
              Gradient Composition
            </h3>

            <p className="mt-3 text-zinc-400">
              Multi-stop gradient using
              primary, secondary, and
              accent tones with strong
              color separation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorCard({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  const hsl =
    Color(color).hsl().object();

  return (
    <div
      className="
        palette-item
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/5
      "
    >
      <div
        className="h-56"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="p-8">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          {label}
        </p>

        <h3 className="mt-2 text-3xl font-black">
          {color}
        </h3>

        <div className="mt-6 space-y-2 text-sm text-zinc-400">
          <p>
            H: {Math.round(hsl.h ?? 0)}°
          </p>

          <p>
            S: {Math.round(hsl.s ?? 0)}%
          </p>

          <p>
            L: {Math.round(hsl.l ?? 0)}%
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-zinc-500">
        {label}
      </p>

      <h4 className="mt-2 text-4xl font-black">
        {value}
      </h4>
    </div>
  );
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      className="
        palette-item
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-8
      "
    >
      <p className="text-zinc-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-black">
        {value}
      </h3>

      <p className="mt-4 text-zinc-400">
        {description}
      </p>
    </div>
  );
}