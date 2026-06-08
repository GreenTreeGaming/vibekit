"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { AnimatedGradientBg } from "./animated-gradient-bg";
import { MeshPreview } from "./mesh-preview";
import { MiniColorPicker } from "@/components/ui/mini-color-picker";
import { toPng } from "html-to-image";
import Link from "next/link";

type GradientType =
  | "linear"
  | "radial"
  | "conic"
  | "mesh";

export function GradientGenerator() {
  const previewRef =
    useRef<HTMLDivElement>(null);

  const [type, setType] =
    useState<GradientType>("linear");

  const [angle, setAngle] =
    useState(135);

  const exportRef =
    useRef<HTMLDivElement>(null);

  const [colors, setColors] =
    useState<string[]>([
      "#8B5CF6",
      "#EC4899",
      "#06B6D4",
    ]);

  const [copiedItem, setCopiedItem] =
    useState<string | null>(null);

  const [exportType, setExportType] =
    useState("CSS");

  const [previewType, setPreviewType] =
    useState<
      "dashboard" |
      "landing" |
      "button" |
      "card"
    >("dashboard");

  const gradientNames = [
    "Aurora Bloom",
    "Neon Horizon",
    "Midnight Lagoon",
    "Electric Dream",
    "Cosmic Punch",
    "Liquid Sunset",
    "Hyper Violet",
    "Solar Drift",
    "Blue Mirage",
    "Prism Flow",
  ];

  const [gradientName] =
    useState(
      () =>
        gradientNames[
        Math.floor(
          Math.random() *
          gradientNames.length
        )
        ]
    );

  function Watermark() {
    return (
      <div
        className="
        absolute
        bottom-6
        left-6
        pointer-events-none
        select-none
        z-20
      "
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          Generated with
        </p>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-lg font-black text-white">
            VibeKit
          </span>

          <span className="text-white/30">
            /
          </span>

          <span className="text-sm text-white/70">
            by Sarvajith Karun
          </span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "selectedGradient"
      );

    if (!saved) return;

    try {
      const gradient =
        JSON.parse(saved);

      if (
        gradient?.colors &&
        Array.isArray(
          gradient.colors
        )
      ) {
        setColors(
          gradient.colors
        );
      }

      localStorage.removeItem(
        "selectedGradient"
      );
    } catch {
      console.error(
        "Failed to load gradient"
      );
    }
  }, []);

  const gradient =
    useMemo(() => {
      const stops =
        colors.join(", ");

      switch (type) {
        case "radial":
          return `radial-gradient(circle, ${stops})`;

        case "conic":
          return `conic-gradient(from ${angle}deg, ${stops})`;

        default:
          return `linear-gradient(${angle}deg, ${stops})`;
      }
    }, [type, angle, colors]);

  useEffect(() => {
    gsap.fromTo(
      previewRef.current,
      {
        scale: 0.97,
      },
      {
        scale: 1,
        duration: 0.8,
        ease: "power4.out",
      }
    );
  }, [gradient]);

  const randomColor = () =>
    "#" +
    Math.floor(
      Math.random() * 16777215
    )
      .toString(16)
      .padStart(6, "0");

  const randomize = () => {
    setColors([
      randomColor(),
      randomColor(),
      randomColor(),
    ]);
  };

  const cssCode = `
background: ${gradient};
`.trim();

  const tailwindCode = `
bg-[${gradient}]
`.trim();

  const exports = [
    {
      title: "CSS",
      code: cssCode,
    },
    {
      title: "Tailwind",
      code: tailwindCode,
    },
    {
      title: "CSS Variable",
      code: `:root {
  --gradient: ${cssCode.replace(
        "background: ",
        ""
      )};
}`,
    },
    {
      title: "React",
      code: `const style = {
  background: "${cssCode.replace(
        "background: ",
        ""
      )}"
};`,
    },
  ];

  const activeExport =
    exports.find(
      (e) =>
        e.title === exportType
    ) ?? exports[0];

  return (
    <section className="relative overflow-hidden py-32">
      <AnimatedGradientBg />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Hero */}

        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Gradient Generator
          </p>

          <h1 className="text-7xl font-black">
            Create Beautiful
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Gradients
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Generate modern gradients with
            production-ready exports.
          </p>
        </div>

        {/* Preview */}

        {type === "mesh" ? (
          <div
            ref={previewRef}
            className="
      relative
      overflow-hidden
      rounded-[32px]
    "
          >
            <MeshPreview colors={colors} />
            <Watermark />
          </div>
        ) : (
          <div
            ref={(el) => {
              previewRef.current = el;
              exportRef.current = el;
            }}
            className="
      relative
      h-[500px]
      rounded-[32px]
      overflow-hidden
    "
            style={{
              background: gradient,
            }}
          >
            <Watermark />
          </div>
        )}

        <div className="mt-6">
          <p className="mb-3 text-sm text-zinc-500">
            Active Palette
          </p>

          <div className="
  flex
  flex-wrap
  gap-3
">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  navigator.clipboard.writeText(
                    color
                  )
                }
                className="
          flex-1
          overflow-hidden
          rounded-2xl
          border
          border-white/10
        "
              >
                <div
                  className="h-20"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <div className="bg-black/40 p-3">
                  <p className="font-mono text-xs">
                    {color}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/gallery"
          className="
    mt-6
    flex
    items-center
    justify-between
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    px-6
    py-5
    transition-all
    hover:border-white/20
    hover:bg-white/[0.07]
  "
        >
          <div>
            <p className="text-lg font-bold">
              Explore Community Gradients
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Browse, remix and save
              beautiful gradients.
            </p>
          </div>

          <span className="text-2xl">
            →
          </span>
        </Link>

        <div
  className="
    mt-8
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
>
  <div className="mb-6 flex items-center justify-between">
    <h3 className="text-2xl font-bold">
      Live UI Preview
    </h3>

    <div className="inline-flex rounded-2xl border border-white/10 bg-zinc-900 p-1">
      {[
        "dashboard",
        "landing",
        "button",
        "card",
      ].map((item) => (
        <button
          key={item}
          onClick={() =>
            setPreviewType(
              item as any
            )
          }
          className={`
            rounded-xl
            px-4
            py-2
            text-sm
            capitalize

            ${
              previewType === item
                ? "bg-white text-black"
                : "text-zinc-400"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {previewType ===
    "dashboard" && (
    <div className="rounded-3xl border border-white/10 p-6">
      <div
        className="h-14 rounded-2xl"
        style={{
          background: gradient,
        }}
      />

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="h-32 rounded-2xl bg-white/5" />
        <div className="h-32 rounded-2xl bg-white/5" />
        <div className="h-32 rounded-2xl bg-white/5" />
      </div>
    </div>
  )}

  {previewType ===
    "landing" && (
    <div className="rounded-3xl border border-white/10 p-10 text-center">
      <div
        className="mx-auto h-24 w-24 rounded-full"
        style={{
          background: gradient,
        }}
      />

      <h2 className="mt-6 text-4xl font-black">
        Build Faster
      </h2>

      <p className="mt-3 text-zinc-500">
        Example landing page hero.
      </p>

      <button
        className="mt-6 rounded-2xl px-6 py-3 font-semibold"
        style={{
          background: gradient,
        }}
      >
        Get Started
      </button>
    </div>
  )}

  {previewType ===
    "button" && (
    <div className="flex items-center justify-center rounded-3xl border border-white/10 p-16">
      <button
        className="rounded-2xl px-10 py-5 text-lg font-bold text-white shadow-2xl"
        style={{
          background: gradient,
        }}
      >
        Launch Project
      </button>
    </div>
  )}

  {previewType ===
    "card" && (
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/30 p-6">
      <div
        className="h-40 rounded-2xl"
        style={{
          background: gradient,
        }}
      />

      <h3 className="mt-5 text-2xl font-bold">
        Aurora Card
      </h3>

      <p className="mt-2 text-zinc-500">
        See how your gradient behaves
        in a real UI card component.
      </p>

      <button
        className="mt-6 rounded-xl px-5 py-3 font-medium text-white"
        style={{
          background: gradient,
        }}
      >
        View Details
      </button>
    </div>
  )}
</div>

          {/* Presets */}
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                Popular Presets
              </h3>

              <Link
                href="/gallery"
                className="text-sm text-zinc-400 hover:text-white"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Aurora",
                  colors: [
                    "#8B5CF6",
                    "#EC4899",
                    "#06B6D4",
                  ],
                },
                {
                  name: "Sunset",
                  colors: [
                    "#FF6B6B",
                    "#FF8E53",
                    "#FFD166",
                  ],
                },
                {
                  name: "Ocean",
                  colors: [
                    "#2563EB",
                    "#06B6D4",
                    "#14B8A6",
                  ],
                },
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() =>
                    setColors(
                      preset.colors
                    )
                  }
                  className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          text-left
          transition-all
          hover:scale-[1.02]
          hover:border-white/20
        "
                >
                  <div
                    className="h-28"
                    style={{
                      background: `linear-gradient(
              135deg,
              ${preset.colors.join(",")}
            )`,
                    }}
                  />

                  <div className="p-4">
                    <p className="font-semibold">
                      {preset.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Left */}

            <div
              className="
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              p-8
            "
            >
              <h3 className="mb-6 text-2xl font-bold">
                Controls
              </h3>

              {/* Type */}

              <div className="mb-8">
                <div className="inline-flex rounded-2xl border border-white/10 bg-zinc-900 p-1">
                  {[
                    "linear",
                    "radial",
                    "conic",
                    "mesh",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setType(
                          item as GradientType
                        )
                      }
                      className={`
          rounded-xl
          px-5
          py-2.5
          text-sm
          font-medium
          capitalize
          transition-all
          duration-300

          ${type === item
                          ? `
                bg-white
                text-black
                shadow-[0_0_20px_rgba(255,255,255,0.15)]
              `
                          : `
                text-zinc-400
                hover:text-white
              `
                        }
        `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Angle */}

              {(type === "linear" ||
                type === "conic") && (
                  <>
                    <div className="mb-2 flex justify-between">
                      <span>Angle</span>

                      <span>
                        {angle}°
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={angle}
                      onChange={(e) =>
                        setAngle(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="mb-8 w-full"
                    />
                  </>
                )}

              {/* Colors */}

              <div className="space-y-4">
                {colors.map(
                  (color, index) => (
                    <div
                      key={index}
                      className="
          rounded-3xl
          border
          border-white/10
          bg-black/20
          p-4
        "
                    >
                      <MiniColorPicker
                        label={`Color ${index + 1}`}
                        color={color}
                        onChange={(value) => {
                          const next = [...colors];

                          next[index] = value;

                          setColors(next);
                        }}
                      />

                      {colors.length > 2 && (
                        <button
                          onClick={() =>
                            setColors(
                              colors.filter(
                                (_, i) =>
                                  i !== index
                              )
                            )
                          }
                          className="
              mt-4
              flex
              items-center
              gap-2
              text-sm
              text-red-400
            "
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove Color
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    setColors([
                      ...colors,
                      randomColor(),
                    ])
                  }
                  className="
      flex
      items-center
      gap-2
      rounded-2xl
      bg-white/5
      px-4
      py-3
    "
                >
                  <Plus className="h-4 w-4" />
                  Add Color
                </button>

                <button
                  onClick={randomize}
                  className="
      flex
      items-center
      gap-2
      rounded-2xl
      bg-gradient-to-r
      from-violet-500
      via-fuchsia-500
      to-cyan-500
      px-4
      py-3
    "
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Vibe
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <StatCard
                  label="Colors"
                  value={colors.length}
                />

                <StatCard
                  label="Angle"
                  value={`${angle}°`}
                />

                <StatCard
                  label="Type"
                  value={type}
                />
              </div>
            </div>

            {/* Export */}

            <div
              className="
    rounded-[32px]
    border
    border-white/10
    bg-zinc-950
    overflow-hidden
    min-h-[500px]
    flex
    flex-col
  "
            >
              <div className="border-b border-white/10 p-6">
                <h3 className="text-2xl font-bold">
                  Export
                </h3>

                <div className="mt-4 inline-flex rounded-2xl border border-white/10 bg-zinc-900 p-1">
                  {exports.map((item) => (
                    <button
                      key={item.title}
                      onClick={() =>
                        setExportType(
                          item.title
                        )
                      }
                      className={`
          rounded-xl
          px-4
          py-2
          text-sm
          transition-all

          ${exportType ===
                          item.title
                          ? "bg-white text-black"
                          : "text-zinc-400"
                        }
        `}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="
      flex-1
      min-h-0
      overflow-y-auto
      p-6
      space-y-8
    "
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                      {activeExport.title}
                    </p>

                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          activeExport.code
                        );

                        setCopiedItem(
                          activeExport.title
                        );

                        setTimeout(() => {
                          setCopiedItem(null);
                        }, 2000);
                      }}
                      className={`
        rounded-xl
        border
        px-3
        py-1.5
        text-xs

        ${copiedItem ===
                          activeExport.title
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-white/10"
                        }
      `}
                    >
                      {copiedItem ===
                        activeExport.title
                        ? "Copied!"
                        : "Copy"}
                    </button>
                  </div>

                  <pre
                    className="
      overflow-x-auto
      rounded-2xl
      bg-black/40
      p-6
      text-sm
    "
                  >
                    {activeExport.code}
                  </pre>
                </div>

                <div className="sticky bottom-0 pt-4">
                  <button
                    onClick={async () => {
                      if (!exportRef.current)
                        return;

                      const dataUrl =
                        await toPng(exportRef.current);

                      const link =
                        document.createElement("a");

                      link.download =
                        "gradient.png";

                      link.href = dataUrl;

                      link.click();
                    }}
                    className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-white
          px-5
          py-3
          font-medium
          text-black
          transition-all
          hover:scale-[1.02]
        "
                  >
                    Download PNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-4
      "
    >
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}