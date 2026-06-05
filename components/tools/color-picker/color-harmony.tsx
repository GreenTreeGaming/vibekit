"use client";

import { useState } from "react";

interface Props {
  harmonies: {
    complementary: string[];
    analogous: string[];
    triadic: string[];
    splitComplementary: string[];
  };
}

export function ColorHarmony({
  harmonies,
}: Props) {
  const [copied, setCopied] =
    useState<string | null>(null);

  const palettes = [
    {
      label: "Complementary",
      colors:
        harmonies.complementary,
    },
    {
      label: "Analogous",
      colors:
        harmonies.analogous,
    },
    {
      label: "Triadic",
      colors:
        harmonies.triadic,
    },
    {
      label: "Split Complementary",
      colors:
        harmonies.splitComplementary,
    },
  ];

  const copyColor = (
    color: string
  ) => {
    navigator.clipboard.writeText(
      color
    );

    setCopied(color);

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-4xl font-bold">
        Color Harmonies
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {palettes.map(
          (palette) => (
            <div
              key={palette.label}
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h3 className="mb-5 text-lg font-bold">
                {palette.label}
              </h3>

              <div className="flex gap-3">
                {palette.colors.map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() =>
                        copyColor(color)
                      }
                      className="
                        flex-1
                        transition-transform
                        hover:scale-105
                      "
                    >
                      <div
                        className="
                          h-24
                          rounded-2xl
                          border
                          border-white/10
                          transition-all
                        "
                        style={{
                          backgroundColor:
                            color,
                        }}
                      />

                      <p
                        className="
                          mt-3
                          text-center
                          font-mono
                          text-xs
                        "
                      >
                        {copied === color
                          ? "Copied!"
                          : color}
                      </p>
                    </button>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}