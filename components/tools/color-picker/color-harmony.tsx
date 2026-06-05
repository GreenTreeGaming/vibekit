"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Copy } from "lucide-react";
import Color from "color";
import gsap from "gsap";

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
  const harmonyOptions =
    useMemo(
      () => [
        {
          label:
            "Complementary",
          description:
            "High contrast colors that sit opposite each other on the color wheel. Great for call-to-actions and emphasis.",
          colors:
            harmonies.complementary,
        },
        {
          label:
            "Analogous",
          description:
            "Neighboring colors that create a smooth, cohesive and natural aesthetic.",
          colors:
            harmonies.analogous,
        },
        {
          label: "Triadic",
          description:
            "Three evenly spaced colors that create a vibrant and balanced palette.",
          colors:
            harmonies.triadic,
        },
        {
          label:
            "Split Complementary",
          description:
            "A softer alternative to complementary palettes with strong contrast and more flexibility.",
          colors:
            harmonies.splitComplementary,
        },
      ],
      [harmonies]
    );

  useEffect(() => {
    setSelected(harmonyOptions[0]);
  }, [harmonyOptions]);

  const [selected, setSelected] =
    useState(harmonyOptions[0]);

  const [copied, setCopied] =
    useState<string | null>(
      null
    );

  const copy = async (
    value: string
  ) => {
    await navigator.clipboard.writeText(
      value
    );

    setCopied(value);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  const previewBackground =
    selected.colors[0];

  const heroRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.fromTo(
      heroRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      previewRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [selected]);

  const previewRef =
    useRef<HTMLDivElement>(null);

  const isLight =
    Color(
      previewBackground
    ).isLight();

  const previewText = isLight
    ? "#111827"
    : "#ffffff";

  const copyPalette =
    async () => {
      const text =
        selected.colors.join(
          "\n"
        );

      await navigator.clipboard.writeText(
        text
      );

      setCopied(
        "palette"
      );

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    };

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Color Harmonies
        </h2>

        <p className="mt-2 text-muted-foreground">
          Explore professional
          color relationships and
          discover palettes that
          work together naturally.
        </p>
      </div>

      <div className="space-y-8">
        {/* Harmony Selector */}

        <div className="
  inline-flex
  rounded-2xl
  border
  border-white/10
  bg-black/20
  p-1
">
          {harmonyOptions.map(
            (harmony) => {
              const active =
                selected.label ===
                harmony.label;

              return (
                <button
                  key={harmony.label}
                  onClick={() =>
                    setSelected(
                      harmony
                    )
                  }
                  className={`
            rounded-xl
            px-5
            py-2.5
            text-sm
            font-medium
            transition-all
            duration-300

            ${active
                      ? `
                  bg-white
                  text-black
                  shadow-[0_0_20px_rgba(255,255,255,0.15)]
                `
                      : `
                  text-muted-foreground
                  hover:text-foreground
                `
                    }
          `}
                >
                  {harmony.label}
                </button>
              );
            }
          )}
        </div>

        {/* Palette Strip */}

        <div
          ref={heroRef}
          className="
  relative
  overflow-hidden
  rounded-[40px]
  border
  border-white/10
"
        >
          <div
            className="h-64"
            style={{
              background: `linear-gradient(
        135deg,
        ${selected.colors.join(",")}
      )`,
            }}
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-8 top-8">
            <p className="text-sm font-medium text-white/80">
              Harmony
            </p>

            <h3 className="mt-2 text-5xl font-bold text-white">
              {selected.label}
            </h3>
          </div>

          <div className="absolute bottom-8 left-8 flex gap-2">
            {selected.colors.map(
              (color) => (
                <div
                  key={color}
                  className="
  h-12
  w-12
  rounded-2xl
  border
  border-white/10
"
                  style={{
                    backgroundColor:
                      color,
                  }}
                />
              )
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left */}

          <div className="
  rounded-3xl
  border
  border-white/10
  bg-black/20
  p-6
">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold">
                  {
                    selected.label
                  }
                </h3>

                <p className="mt-2 text-muted-foreground">
                  {
                    selected.description
                  }
                </p>
              </div>

              <button
                onClick={
                  copyPalette
                }
                className="
  flex
  items-center
  gap-2
  rounded-xl
  border
  border-white/10
  bg-white/[0.03]
  px-4
  py-2
  text-sm
  transition-all
  hover:bg-white/[0.06]
"
              >
                <Copy className="h-4 w-4" />

                {copied ===
                  "palette"
                  ? "Copied!"
                  : "Copy Palette"}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {selected.colors.map(
                (color) => (
                  <button
                    key={color}
                    onClick={() =>
                      copy(
                        color
                      )
                    }
                    className="
  overflow-hidden
  rounded-2xl
  border
  border-white/10
  bg-black/20
  text-left
  transition-all
  hover:scale-[1.02]
  hover:border-white/20
"
                  >
                    <div
                      className="h-24"
                      style={{
                        backgroundColor:
                          color,
                      }}
                    />

                    <div className="flex items-center justify-between p-4">
                      <span className="font-mono text-sm">
                        {copied ===
                          color
                          ? "Copied!"
                          : color}
                      </span>

                      <Copy className="h-4 w-4 opacity-60" />
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Preview */}

          <div
            ref={previewRef}
            className="
  rounded-[32px]
  border
  border-white/10
  bg-black/20
  p-6
"
          >
            <h3 className="mb-6 text-lg font-semibold">
              Component Preview
            </h3>

            <div className="
  space-y-4
  rounded-3xl
  border
  border-white/10
  bg-black/20
  p-6
">
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor:
                    selected.colors[0],
                  color: previewText,
                }}
              >
                <h4 className="text-xl font-bold">
                  Project Analytics
                </h4>

                <p className="mt-2 opacity-80">
                  Generated using this harmony.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="rounded-xl px-4 py-2 font-medium text-white"
                  style={{
                    backgroundColor:
                      selected.colors[1] ??
                      selected.colors[0],
                  }}
                >
                  Primary Action
                </button>

                <button
                  className="rounded-xl px-4 py-2"
                  style={{
                    backgroundColor:
                      selected.colors[2] ??
                      selected.colors[0],
                    color: "#fff",
                  }}
                >
                  Accent
                </button>
              </div>

              <div className="flex gap-2">
                {selected.colors.map(
                  (color) => (
                    <div
                      key={color}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{
                        backgroundColor:
                          color,
                      }}
                    >
                      Badge
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}