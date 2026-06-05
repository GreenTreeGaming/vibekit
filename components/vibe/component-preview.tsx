"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  primary: string;
  secondary: string;
  accent: string;
}

export function ComponentPreviewSection({
  primary,
  secondary,
  accent,
}: Props) {
  const ref =
    useRef<HTMLDivElement>(null);

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".preview-card",
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
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const cardBg = darkMode
    ? "bg-zinc-900"
    : "bg-white";

  const textColor = darkMode
    ? "text-white"
    : "text-black";

  const subText = darkMode
    ? "text-zinc-400"
    : "text-zinc-500";

  const border = darkMode
    ? "border-white/10"
    : "border-black/10";

  return (
    <section
      ref={ref}
      className="py-40"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 flex items-center justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Live Preview
            </p>

            <h2 className="text-6xl font-black">
              Component Preview
            </h2>
          </div>

          {/* Theme Toggle */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-2
            "
          >
            <button
              onClick={() =>
                setDarkMode(false)
              }
              className={`
                rounded-xl
                px-4
                py-2
                transition

                ${
                  !darkMode
                    ? "bg-white text-black"
                    : "text-zinc-400"
                }
              `}
            >
              Light
            </button>

            <button
              onClick={() =>
                setDarkMode(true)
              }
              className={`
                rounded-xl
                px-4
                py-2
                transition

                ${
                  darkMode
                    ? "bg-white text-black"
                    : "text-zinc-400"
                }
              `}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Grid */}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Landing Page Hero */}

          <div
            className={`
              preview-card
              overflow-hidden
              rounded-[40px]
              border
              p-12
              ${cardBg}
              ${textColor}
              ${border}
            `}
          >
            <div
              className="mb-6 h-2 w-32 rounded-full"
              style={{
                background: primary,
              }}
            />

            <h3 className="max-w-xl text-5xl font-black leading-tight">
              Build faster with
              beautiful design systems.
            </h3>

            <p
              className={`mt-6 max-w-lg ${subText}`}
            >
              Create polished products
              using reusable design
              tokens and accessible
              color systems.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                className="rounded-2xl px-6 py-3 font-semibold text-white"
                style={{
                  background: primary,
                }}
              >
                Get Started
              </button>

              <button
                className={`rounded-2xl border px-6 py-3 ${border}`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Analytics Dashboard */}

          <div
            className={`
              preview-card
              rounded-[40px]
              border
              p-8
              ${cardBg}
              ${textColor}
              ${border}
            `}
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Revenue",
                  value: "$84K",
                  color: primary,
                },
                {
                  label: "Users",
                  value: "12.4K",
                  color: secondary,
                },
                {
                  label: "Growth",
                  value: "+38%",
                  color: accent,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl p-6"
                  style={{
                    background:
                      `${item.color}20`,
                  }}
                >
                  <p
                    className={subText}
                  >
                    {item.label}
                  </p>

                  <h4 className="mt-2 text-3xl font-black">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>

            <div
              className="mt-6 h-64 rounded-3xl"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${primary},
                  ${secondary},
                  ${accent}
                )`,
              }}
            />
          </div>

          {/* Pricing */}

          <div
            className={`
              preview-card
              rounded-[40px]
              border
              p-12
              text-center
              ${cardBg}
              ${textColor}
              ${border}
            `}
          >
            <p
              className={`text-lg ${subText}`}
            >
              Pro Plan
            </p>

            <h3 className="mt-4 text-8xl font-black">
              $29
            </h3>

            <p
              className={`mt-4 ${subText}`}
            >
              Unlimited themes and
              exports.
            </p>

            <button
              className="mt-8 rounded-2xl px-8 py-4 font-bold text-white"
              style={{
                background: primary,
              }}
            >
              Upgrade Now
            </button>
          </div>

          {/* Mobile App */}

          <div
            className={`
              preview-card
              rounded-[40px]
              border
              p-10
              ${cardBg}
              ${textColor}
              ${border}
            `}
          >
            <div
              className={`
                mx-auto
                w-[320px]
                rounded-[40px]
                border
                p-6
                ${
                  darkMode
                    ? "bg-black border-white/10"
                    : "bg-zinc-100 border-black/10"
                }
              `}
            >
              <div
                className="mb-6 h-40 rounded-3xl"
                style={{
                  background: `linear-gradient(
                    135deg,
                    ${primary},
                    ${secondary}
                  )`,
                }}
              />

              <div className="space-y-4">
                <div
                  className={`h-4 w-2/3 rounded ${
                    darkMode
                      ? "bg-white/10"
                      : "bg-black/10"
                  }`}
                />

                <div
                  className={`h-4 rounded ${
                    darkMode
                      ? "bg-white/10"
                      : "bg-black/10"
                  }`}
                />

                <div
                  className={`h-4 w-3/4 rounded ${
                    darkMode
                      ? "bg-white/10"
                      : "bg-black/10"
                  }`}
                />
              </div>

              <button
                className="mt-8 w-full rounded-2xl py-4 font-bold text-white"
                style={{
                  background: primary,
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}