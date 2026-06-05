"use client";

import { useState } from "react";
import type { AIAnalysis } from "@/types/ai";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface ProjectResultsProps {
  imageUrl: string;
  palette: string[];
  analysis: AIAnalysis | null;
  onReset: () => void;
}

function GeneratedDashboard({
  palette,
  theme,
}: {
  palette: string[];
  theme: "light" | "dark";
}) {
  const c1 = palette[0] ?? "#8B5CF6";
  const c2 = palette[1] ?? "#EC4899";
  const c3 = palette[2] ?? "#06B6D4";
  const c4 = palette[3] ?? "#F59E0B";
  const c5 = palette[4] ?? "#10B981";
  const c6 = palette[5] ?? "#6366F1";

  const bg =
    theme === "dark"
      ? "#09090B"
      : "#FFFFFF";

  const text =
    theme === "dark"
      ? "#FFFFFF"
      : "#000000";

  const surface =
    theme === "dark"
      ? "#18181B"
      : "#F8FAFC";

  return (
    <div
      className="overflow-hidden rounded-[32px] border border-white/10"
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      <div className="flex">
        {/* Sidebar */}

        <aside
          className="w-64 p-6"
          style={{ backgroundColor: c1 }}
        >
          <div
            className="mb-10 text-xl font-bold"
            style={{
              color:
                theme === "dark"
                  ? "#FFFFFF"
                  : "#000000",
            }}
          >
            VibeKit
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 rounded-xl bg-black/10"
              />
            ))}
          </div>
        </aside>

        {/* Main */}

        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3
                className="text-3xl font-bold"
                style={{
                  color: text,
                }}
              >
                Dashboard
              </h3>

              <p className="text-zinc-500">
                Analytics overview
              </p>
            </div>

            <button
              className="rounded-xl px-4 py-2 font-medium"
              style={{
                backgroundColor: c2,
                color: "white",
              }}
            >
              Create Report
            </button>
          </div>

          {/* Stats */}

          <div className="mb-8 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: [
                    `${c3}20`,
                    `${c4}20`,
                    `${c5}20`,
                  ][i - 1],
                }}
              >
                <p className="text-sm text-zinc-500">
                  Revenue
                </p>

                <h4
                  className="mt-2 text-3xl font-bold"
                  style={{
                    color: text,
                  }}
                >
                  $24.5k
                </h4>
              </div>
            ))}
          </div>

          {/* Chart */}

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: surface,
              border: `1px solid ${theme === "dark"
                ? "#27272A"
                : "#E4E4E7"
                }`,
            }}
          >
            <div className="mb-4 h-4 w-32 rounded-full bg-zinc-200" />

            <div className="flex h-48 items-end gap-4">
              {[40, 80, 60, 120, 90, 150].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-xl"
                    style={{
                      height,
                      backgroundColor: [
                        c1,
                        c2,
                        c3,
                        c4,
                        c5,
                        c6,
                      ][i],
                    }}
                  />
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function GeneratedLandingPage({
  palette,
  theme,
}: {
  palette: string[];
  theme: "light" | "dark";
}) {
  const c1 = palette[0] ?? "#8B5CF6";
  const c2 = palette[1] ?? "#EC4899";
  const c3 = palette[2] ?? "#06B6D4";
  const c4 = palette[3] ?? "#F59E0B";
  const c5 = palette[4] ?? "#10B981";
  const c6 = palette[5] ?? "#6366F1";

  const bg =
    theme === "dark"
      ? "#09090B"
      : "#FFFFFF";

  const text =
    theme === "dark"
      ? "#FFFFFF"
      : "#000000";

  const surface =
    theme === "dark"
      ? "#18181B"
      : "#F8FAFC";

  const placeholder =
    theme === "dark"
      ? "rgba(255,255,255,0.08)"
      : "rgba(0,0,0,0.08)";

  const muted =
    theme === "dark"
      ? "#A1A1AA"
      : "#71717A";

  return (
    <div
      className="
        overflow-hidden
        rounded-[32px]
        p-10
        transition-all
        duration-300
      "
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      <div className="mb-16 flex items-center justify-between">
        <div
          className="h-6 w-32 rounded-full"
          style={{
            backgroundColor: placeholder,
          }}
        />

        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 w-16 rounded-full"
              style={{
                backgroundColor: placeholder,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-3xl">
        <h1
          className="text-6xl font-black"
          style={{
            color: c1,
          }}
        >
          Build faster with beautiful design.
        </h1>

        <p
          className="mt-6 text-xl"
          style={{
            color: muted,
          }}
        >
          Generate complete design systems from any
          screenshot.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            className="rounded-2xl px-6 py-3 text-white"
            style={{
              backgroundColor: c2,
            }}
          >
            Get Started
          </button>

          <button
            className="rounded-2xl px-6 py-3"
            style={{
              color: text,
              border: `1px solid ${theme === "dark"
                ? "#27272A"
                : "#E4E4E7"
                }`,
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {[
          { color: c4, title: "Fast Setup" },
          { color: c5, title: "Design Tokens" },
          { color: c6, title: "Exports" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl p-6"
            style={{
              backgroundColor: surface,
              border: `1px solid ${theme === "dark"
                ? "#27272A"
                : "#E4E4E7"
                }`,
            }}
          >
            <div
              className="mb-4 h-10 w-10 rounded-xl"
              style={{
                backgroundColor: item.color,
              }}
            />

            <div
              className="h-4 w-24 rounded-full"
              style={{
                backgroundColor: placeholder,
              }}
            />

            <div
              className="mt-3 h-4 w-full rounded-full"
              style={{
                backgroundColor: placeholder,
              }}
            />

            <div
              className="mt-2 h-4 w-3/4 rounded-full"
              style={{
                backgroundColor: placeholder,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratedMobileApp({
  palette,

  theme,

}: {

  palette: string[];

  theme: "light" | "dark";

}) {
  const c1 = palette[0] ?? "#8B5CF6";
  const c2 = palette[1] ?? "#EC4899";
  const c3 = palette[2] ?? "#06B6D4";
  const c4 = palette[3] ?? "#F59E0B";
  const c5 = palette[4] ?? "#10B981";
  const c6 = palette[5] ?? "#6366F1";

  const bg =
    theme === "dark"
      ? "#09090B"
      : "#FFFFFF";

  const surface =
    theme === "dark"
      ? "#18181B"
      : "#FFFFFF";

  return (
    <div
      className="flex justify-center rounded-[32px] p-10"
      style={{
        backgroundColor: bg,
      }}
    >
      <div
        className="w-[320px] rounded-[40px] p-6"
        style={{
          backgroundColor: surface,
          border: `8px solid ${theme === "dark"
            ? "#27272A"
            : "#000000"
            }`,
        }}
      >
        <div className="mb-6 h-6 w-24 rounded-full bg-zinc-200" />

        <div
          className="h-40 rounded-3xl"
          style={{
            backgroundColor: c1,
          }}
        />

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: [
                  `${c2}20`,
                  `${c3}20`,
                  `${c4}20`,
                ][i - 1],
              }}
            >
              <div className="h-4 w-24 rounded-full bg-black/10" />
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full rounded-2xl py-3 text-white"
          style={{
            backgroundColor: c5,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function GeneratedEcommerce({
  palette,

  theme,

}: {

  palette: string[];

  theme: "light" | "dark";

}) {
  const c1 = palette[0] ?? "#8B5CF6";
  const c2 = palette[1] ?? "#EC4899";
  const c3 = palette[2] ?? "#06B6D4";
  const c4 = palette[3] ?? "#F59E0B";
  const c5 = palette[4] ?? "#10B981";
  const c6 = palette[5] ?? "#6366F1";

  const bg =
    theme === "dark"
      ? "#09090B"
      : "#FFFFFF";

  const surface =
    theme === "dark"
      ? "#18181B"
      : "#FFFFFF";

  return (
    <div
      className="rounded-[32px] p-10"
      style={{
        backgroundColor: bg,
      }}
    >
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: surface,
              border: `1px solid ${theme === "dark"
                ? "#27272A"
                : "#E4E4E7"
                }`,
            }}
            className="overflow-hidden rounded-3xl"
          >
            <div
              className="h-56"
              style={{
                backgroundColor: [
                  c1,
                  c2,
                  c3,
                ][i - 1],
              }}
            />

            <div className="p-6">
              <div className="h-5 w-32 rounded-full bg-zinc-200" />

              <div className="mt-3 h-4 w-20 rounded-full bg-zinc-100" />

              <button
                className="mt-6 w-full rounded-xl py-3 text-white"
                style={{
                  backgroundColor: [
                    c4,
                    c5,
                    c6,
                  ][i - 1],
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">
        {label}
      </span>

      <span className="font-medium text-zinc-200">
        {value}
      </span>
    </div>
  );
}

function getExportCode(
  type: string,
  palette: string[]
) {
  const c1 = palette[0] ?? "#8B5CF6";
  const c2 = palette[1] ?? "#EC4899";
  const c3 = palette[2] ?? "#06B6D4";
  const c4 = palette[3] ?? "#F59E0B";
  const c5 = palette[4] ?? "#10B981";
  const c6 = palette[5] ?? "#6366F1";

  switch (type) {
    case "tailwind":
      return `export default {
  theme: {
    extend: {
      colors: {
  primary: "${c1}",
  secondary: "${c2}",
  accent: "${c3}",
  success: "${c4}",
  warning: "${c5}",
  info: "${c6}",
},
    },
  },
};`;

    case "css":
      return `:root {
  --color-1: ${c1};
  --color-2: ${c2};
  --color-3: ${c3};
  --color-4: ${c4};
  --color-5: ${c5};
  --color-6: ${c6};

  --font-heading: "Space Grotesk";
  --font-body: "Inter";
}`;

    case "json":
      return JSON.stringify(
        {
          colors: {
            color1: c1,
            color2: c2,
            color3: c3,
            color4: c4,
            color5: c5,
            color6: c6,
          },

          typography: {
            heading: "Space Grotesk",
            body: "Inter",
          },
        },
        null,
        2
      );

    case "figma":
      return JSON.stringify(
        {
          global: {
            color1: {
              value: c1,
              type: "color",
            },
            color2: {
              value: c2,
              type: "color",
            },
            color3: {
              value: c3,
              type: "color",
            },
            color4: {
              value: c4,
              type: "color",
            },
            color5: {
              value: c5,
              type: "color",
            },
            color6: {
              value: c6,
              type: "color",
            },
          },
        },
        null,
        2
      );

    default:
      return "";
  }
}

export function ProjectResults({
  imageUrl,
  palette,
  analysis,
  onReset,
}: ProjectResultsProps) {
  const [preview, setPreview] = useState<
    "dashboard" | "landing" | "mobile" | "ecommerce"
  >("dashboard");

  const [exportType, setExportType] = useState<
    "tailwind" | "css" | "json" | "figma"
  >("tailwind");

  const exportCode = getExportCode(
    exportType,
    palette,
  );

  const [theme, setTheme] =
    useState<"light" | "dark">(
      "light"
    );

  const exportLanguage = {
    tailwind: "typescript",
    css: "css",
    json: "json",
    figma: "json",
  }[exportType];

  const [copied, setCopied] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-8 py-24">

      <section className="mb-32 text-center">
        <h1 className="text-7xl font-black">
          Your Design System
        </h1>

        <p className="mt-6 text-zinc-400">
          Generated from a single screenshot.
        </p>

        <button
          onClick={onReset}
          className="
      mt-8
      inline-flex
      items-center
      gap-3
      rounded-2xl
      bg-gradient-to-r
      from-violet-600
      via-fuchsia-500
      to-cyan-500
      px-8
      py-4
      text-lg
      font-bold
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-[0_0_50px_rgba(139,92,246,0.35)]
    "
        >
          Create Another Vibe
        </button>
      </section>

      {/* screenshot */}

      <section className="mb-32">
        <img
          src={imageUrl}
          alt=""
          className="
            w-full
            rounded-[32px]
            border
            border-white/10
          "
        />
      </section>

      {/* palette */}

      <section className="mb-32">
        <h2 className="mb-8 text-4xl font-bold">
          Extracted Palette
        </h2>

        {palette.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
            {palette.map((color) => (
              <div key={color}>
                <div
                  className="h-32 rounded-3xl"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <p className="mt-3 font-mono text-sm">
                  {color}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-lg text-zinc-400">
              None found
            </p>
          </div>
        )}
      </section>

      {analysis && (
        <section className="relative mb-32">
          {/* Glow */}

          <div
            className="
        absolute
        left-1/2
        top-0
        h-[500px]
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-violet-500/10
        blur-[140px]
      "
          />

          <div className="relative">
            <div className="mb-12 text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
                AI Powered Analysis
              </p>

              <h2 className="text-6xl font-black">
                Design DNA
              </h2>
            </div>

            {/* Main Insight */}

            <div
              className="
          rounded-[40px]
          border
          border-white/10
          bg-black/20
          p-10
          backdrop-blur-xl
        "
            >
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Summary
              </p>

              <p
                className="
            mt-6
            max-w-4xl
            text-2xl
            leading-relaxed
            text-zinc-200
          "
              >
                {analysis.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  analysis.style,
                  analysis.industry,
                  analysis.mood,
                  analysis.spacingStyle,
                ].map((item) => (
                  <span
                    key={item}
                    className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-sm
                text-zinc-300
              "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Lower Grid */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Fonts */}

              <div
                className="
            rounded-[32px]
            border
            border-white/10
            bg-black/20
            p-8
          "
              >
                <h3 className="text-xl font-bold">
                  Recommended Fonts
                </h3>

                <p className="mt-2 text-zinc-500">
                  Typography that matches the visual language
                  of this design.
                </p>

                <div className="mt-6 space-y-4">
                  {analysis.recommendedFonts.map(
                    (font) => (
                      <a
                        key={font}
                        href={`https://fonts.google.com/specimen/${encodeURIComponent(
                          font
                        ).replace(/%20/g, "+")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                    block
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    transition-all
                    hover:border-violet-500/40
                    hover:bg-violet-500/5
                  "
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {font}
                          </span>

                          <span className="text-zinc-500">
                            ↗
                          </span>
                        </div>
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Design DNA */}

              <div
                className="
            rounded-[32px]
            border
            border-white/10
            bg-black/20
            p-8
          "
              >
                <h3 className="text-xl font-bold">
                  Design Patterns
                </h3>

                <p className="mt-2 text-zinc-500">
                  Recurring visual themes identified in
                  the screenshot.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {analysis.uiPatterns.map(
                    (pattern) => (
                      <div
                        key={pattern}
                        className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-4
                    py-2
                    text-sm
                    text-zinc-300
                  "
                      >
                        ✦ {pattern}
                      </div>
                    )
                  )}
                </div>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.25em] text-zinc-500">
                    Analysis
                  </p>

                  <div className="space-y-4">
                    <AnalysisRow
                      label="Design Style"
                      value={analysis.style}
                    />

                    <AnalysisRow
                      label="Industry Match"
                      value={analysis.industry}
                    />

                    <AnalysisRow
                      label="Visual Mood"
                      value={analysis.mood}
                    />

                    <AnalysisRow
                      label="Layout Philosophy"
                      value={analysis.spacingStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* generated ui */}

      <section className="mb-32">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              Generated Preview
            </h2>
          </div>

          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
              <button
                onClick={() => setTheme("light")}
                className={`rounded-xl px-4 py-2 ${theme === "light"
                  ? "bg-white text-black"
                  : "text-zinc-400"
                  }`}
              >
                Light
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`rounded-xl px-4 py-2 ${theme === "dark"
                  ? "bg-white text-black"
                  : "text-zinc-400"
                  }`}
              >
                Dark
              </button>
            </div>

            {/* Preview Selector */}
            <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
              {[
                ["dashboard", "Dashboard"],
                ["landing", "Landing Page"],
                ["mobile", "Mobile App"],
                ["ecommerce", "Ecommerce"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPreview(key as any)}
                  className={`rounded-xl px-4 py-2 ${preview === key
                    ? "bg-white text-black"
                    : "text-zinc-400"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {preview === "dashboard" && (
          <GeneratedDashboard

            palette={palette}

            theme={theme}

          />
        )}

        {preview === "landing" && (
          <GeneratedLandingPage

            palette={palette}

            theme={theme}

          />
        )}

        {preview === "mobile" && (
          <GeneratedMobileApp

            palette={palette}

            theme={theme}

          />
        )}

        {preview === "ecommerce" && (
          <GeneratedEcommerce

            palette={palette}

            theme={theme}

          />
        )}
      </section>

      {/* exports */}

      <section>
        <h2 className="mb-8 text-4xl font-bold">
          Exports
        </h2>

        <div className="mb-6 flex gap-2">
          {[
            ["tailwind", "Tailwind"],
            ["css", "CSS"],
            ["json", "JSON"],
            ["figma", "Figma"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() =>
                setExportType(key as any)
              }
              className={`rounded-xl px-4 py-2 transition ${exportType === key
                ? "bg-white text-black"
                : "bg-white/5 text-zinc-400"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 text-xs text-zinc-500">
              {exportType}
            </span>
          </div>

          <SyntaxHighlighter
            language={exportLanguage}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              background: "transparent",
              padding: "2rem",
            }}
          >
            {exportCode}
          </SyntaxHighlighter>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(
                exportCode
              );

              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
            className={`
    rounded-xl px-4 py-2 transition

    ${copied
                ? "bg-emerald-500 text-white"
                : "bg-white text-black"
              }
  `}
          >
            {copied ? "✓ Copied!" : "Copy Code"}
          </button>

          <button
            onClick={() => {
              const blob = new Blob(
                [exportCode],
                {
                  type: "text/plain",
                }
              );

              const url =
                URL.createObjectURL(blob);

              const a =
                document.createElement("a");

              a.href = url;

              a.download =
                `${exportType}.txt`;

              a.click();

              URL.revokeObjectURL(url);
            }}
            className="rounded-xl border border-white/10 px-4 py-2"
          >
            Download
          </button>


        </div>
      </section>
    </main>
  );
}