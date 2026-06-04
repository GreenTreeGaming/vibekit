"use client";

import { useState } from "react";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface ProjectResultsProps {
  imageUrl: string;
  palette: string[];
}

function GeneratedDashboard({
  palette,
}: {
  palette: string[];
}) {
  const primary = palette[0] ?? "#8B5CF6";

  const secondary = palette[1] ?? "#EC4899";

  const accent = palette[2] ?? "#06B6D4";

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white">
      <div className="flex">
        {/* Sidebar */}

        <aside
          className="w-64 p-6"
          style={{ backgroundColor: primary }}
        >
          <div className="mb-10 text-xl font-bold text-black">
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
              <h3 className="text-3xl font-bold text-black">
                Dashboard
              </h3>

              <p className="text-zinc-500">
                Analytics overview
              </p>
            </div>

            <button
              className="rounded-xl px-4 py-2 font-medium"
              style={{
                backgroundColor: secondary,
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
                  backgroundColor: `${accent}20`,
                }}
              >
                <p className="text-sm text-zinc-500">
                  Revenue
                </p>

                <h4 className="mt-2 text-3xl font-bold text-black">
                  $24.5k
                </h4>
              </div>
            ))}
          </div>

          {/* Chart */}

          <div className="rounded-3xl border border-zinc-200 p-6">
            <div className="mb-4 h-4 w-32 rounded-full bg-zinc-200" />

            <div className="flex h-48 items-end gap-4">
              {[40, 80, 60, 120, 90, 150].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-xl"
                    style={{
                      height,
                      backgroundColor:
                        i % 2 === 0
                          ? primary
                          : secondary,
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
}: {
  palette: string[];
}) {
  const primary = palette[0] ?? "#8B5CF6";
  const secondary = palette[1] ?? "#EC4899";
  const accent = palette[2] ?? "#06B6D4";

  return (
    <div className="overflow-hidden rounded-[32px] bg-white p-10">
      <div className="mb-16 flex items-center justify-between">
        <div className="h-6 w-32 rounded-full bg-zinc-200" />

        <div className="flex gap-4">
          <div className="h-4 w-16 rounded-full bg-zinc-200" />
          <div className="h-4 w-16 rounded-full bg-zinc-200" />
          <div className="h-4 w-16 rounded-full bg-zinc-200" />
        </div>
      </div>

      <div className="max-w-3xl">
        <h1
          className="text-6xl font-black"
          style={{ color: primary }}
        >
          Build faster with beautiful design.
        </h1>

        <p className="mt-6 text-xl text-zinc-500">
          Generate complete design systems from any
          screenshot.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            className="rounded-2xl px-6 py-3 text-white"
            style={{
              backgroundColor: secondary,
            }}
          >
            Get Started
          </button>

          <button className="rounded-2xl border border-zinc-200 px-6 py-3 text-black">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl p-6"
            style={{
              backgroundColor: `${accent}20`,
            }}
          >
            <div className="mb-4 h-10 w-10 rounded-xl bg-black/10" />

            <div className="h-4 w-24 rounded-full bg-black/10" />

            <div className="mt-3 h-4 w-full rounded-full bg-black/5" />

            <div className="mt-2 h-4 w-3/4 rounded-full bg-black/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratedMobileApp({
  palette,
}: {
  palette: string[];
}) {
  const primary = palette[0] ?? "#8B5CF6";

  const secondary = palette[1] ?? "#EC4899";

  return (
    <div className="flex justify-center rounded-[32px] bg-white p-10">
      <div className="w-[320px] rounded-[40px] border-8 border-black bg-white p-6">
        <div className="mb-6 h-6 w-24 rounded-full bg-zinc-200" />

        <div
          className="h-40 rounded-3xl"
          style={{
            backgroundColor: primary,
          }}
        />

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: `${secondary}20`,
              }}
            >
              <div className="h-4 w-24 rounded-full bg-black/10" />
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full rounded-2xl py-3 text-white"
          style={{
            backgroundColor: secondary,
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
}: {
  palette: string[];
}) {
  const primary = palette[0] ?? "#8B5CF6";

  const secondary = palette[1] ?? "#EC4899";

  return (
    <div className="rounded-[32px] bg-white p-10">
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-zinc-200"
          >
            <div
              className="h-56"
              style={{
                backgroundColor: primary,
              }}
            />

            <div className="p-6">
              <div className="h-5 w-32 rounded-full bg-zinc-200" />

              <div className="mt-3 h-4 w-20 rounded-full bg-zinc-100" />

              <button
                className="mt-6 w-full rounded-xl py-3 text-white"
                style={{
                  backgroundColor: secondary,
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

function AnalysisCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <h3 className="mt-3 text-xl font-bold">
        {value}
      </h3>
    </div>
  );
}

function getExportCode(
  type: string,
  palette: string[]
) {
  const primary = palette[0] ?? "#8B5CF6";
  const secondary = palette[1] ?? "#EC4899";
  const accent = palette[2] ?? "#06B6D4";

  switch (type) {
    case "tailwind":
      return `export default {
  theme: {
    extend: {
      colors: {
        primary: "${primary}",
        secondary: "${secondary}",
        accent: "${accent}",
      },
    },
  },
};`;

    case "css":
      return `:root {
  --primary: ${primary};
  --secondary: ${secondary};
  --accent: ${accent};

  --font-heading: "Space Grotesk";
  --font-body: "Inter";
}`;

    case "json":
      return JSON.stringify(
        {
          colors: {
            primary,
            secondary,
            accent,
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
            primary: {
              value: primary,
              type: "color",
            },

            secondary: {
              value: secondary,
              type: "color",
            },

            accent: {
              value: accent,
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
      </section>

      {/* generated ui */}

      <section className="mb-32">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-bold">
            Generated Preview
          </h2>

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
                className={`rounded-xl px-4 py-2 text-sm transition ${preview === key
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {preview === "dashboard" && (
          <GeneratedDashboard palette={palette} />
        )}

        {preview === "landing" && (
          <GeneratedLandingPage palette={palette} />
        )}

        {preview === "mobile" && (
          <GeneratedMobileApp palette={palette} />
        )}

        {preview === "ecommerce" && (
          <GeneratedEcommerce palette={palette} />
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