"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Copy, Plus, Trash2 } from "lucide-react";
import { AnimatedGradientBg } from "./animated-gradient-bg";
import { MeshPreview } from "./mesh-preview";
import { MiniColorPicker } from "@/components/ui/mini-color-picker";
import { toPng } from "html-to-image";

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

  const [copied, setCopied] =
    useState(false);

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

            <div className="mb-8 flex gap-2">
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
                    rounded-2xl
                    px-4
                    py-2
                    capitalize
                    transition

                    ${type === item
                      ? "bg-white text-black"
                      : "bg-white/5 text-zinc-400"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
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
          </div>

          {/* Export */}

          <div
            className="
    rounded-[32px]
    border
    border-white/10
    bg-zinc-950
    overflow-hidden
    h-[900px]
    flex
    flex-col
  "
          >
            <div className="border-b border-white/10 p-6 shrink-0">
              <h3 className="text-2xl font-bold">
                Export
              </h3>
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
              {[
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
                  title: "SCSS Variable",
                  code: `$gradient: ${cssCode.replace(
                    "background: ",
                    ""
                  )};`,
                },
                {
                  title: "React Inline Style",
                  code: `const style = {
  background: "${cssCode.replace(
                    "background: ",
                    ""
                  )}"
};`,
                },
                {
                  title: "SVG",
                  code: `<svg width="400" height="400">
  <defs>
    <linearGradient id="gradient">
      <stop offset="0%" stop-color="${colors[0]}" />
      <stop offset="50%" stop-color="${colors[1]}" />
      <stop offset="100%" stop-color="${colors[2]}" />
    </linearGradient>
  </defs>

  <rect
    width="100%"
    height="100%"
    fill="url(#gradient)"
  />
</svg>`,
                },
                {
                  title: "Figma Token JSON",
                  code: JSON.stringify(
                    {
                      gradient: {
                        value: cssCode.replace(
                          "background: ",
                          ""
                        ),
                        type: "color",
                      },
                    },
                    null,
                    2
                  ),
                },
                {
                  title: "Framer Motion",
                  code: `<motion.div
  style={{
    background:
      "${cssCode.replace(
                    "background: ",
                    ""
                  )}"
  }}
/>`,
                },
                {
                  title: "Chakra UI",
                  code: `<Box
  bgGradient="${cssCode
                      .replace(
                        "background: linear-gradient(",
                        ""
                      )
                      .replace(");", "")}"
/>`,
                },
                {
                  title: "MUI sx",
                  code: `<Box
  sx={{
    background:
      "${cssCode.replace(
                    "background: ",
                    ""
                  )}"
  }}
/>`,
                },
              ].map((item) => (
                <div key={item.title}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                      {item.title}
                    </p>

                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            item.code
                          );

                          setCopiedItem(item.title);

                          setTimeout(() => {
                            setCopiedItem(null);
                          }, 2000);
                        } catch (err) {
                          console.error(
                            "Clipboard failed",
                            err
                          );
                        }

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
              transition-all

              ${copiedItem === item.title
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-white/10 hover:bg-white/5"
                        }
            `}
                    >
                      {copiedItem === item.title
                        ? "Copied!"
                        : "Copy"}
                    </button>
                  </div>

                  <pre
                    className="
            overflow-x-auto
            rounded-2xl
            bg-black/40
            p-4
            text-sm
          "
                  >
                    {item.code}
                  </pre>
                </div>
              ))}

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