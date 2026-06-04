"use client";

import { useMemo, useState } from "react";

import { ContrastControls } from "./contrast-controls";
import { ContrastPreview } from "./contrast-preview";

import {
  getContrast,
} from "./contrast-utils";

export function ContrastChecker() {
  const [
    foreground,
    setForeground,
  ] = useState("#FFFFFF");

  const [
    background,
    setBackground,
  ] = useState("#3B82F6");

  const contrast =
    useMemo(
      () =>
        getContrast(
          foreground,
          background
        ),
      [foreground, background]
    );

  const swapColors = () => {
    setForeground(background);
    setBackground(foreground);
  };

  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-8">
        {/* Hero */}

        <div className="mb-16 text-center">
          <p
            className="
              mb-4
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            Contrast Checker
          </p>

          <h1 className="text-7xl font-black">
            Check
            <span
              className="
                bg-gradient-to-r
                from-violet-400
                via-fuchsia-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Accessibility
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-zinc-400
            "
          >
            Test WCAG contrast ratios
            between foreground and
            background colors.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ContrastControls
            foreground={
              foreground
            }
            background={
              background
            }
            onForegroundChange={
              setForeground
            }
            onBackgroundChange={
              setBackground
            }
            onSwap={swapColors}
          />

          <ContrastPreview
            foreground={
              foreground
            }
            background={
              background
            }
          />
        </div>

        {/* Results */}

        <section className="mt-16">
          <h2 className="mb-8 text-4xl font-bold">
            Results
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >
              <p className="text-zinc-500">
                Contrast Ratio
              </p>

              <h3 className="mt-3 text-6xl font-black">
                {
                  contrast.ratio
                }
                :1
              </h3>
            </div>

            <div
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >
              <p className="text-zinc-500">
                WCAG Compliance
              </p>

              <div className="mt-4 space-y-2">
                <div>
                  AA Normal:{" "}
                  {contrast.aa
                    ? "✅"
                    : "❌"}
                </div>

                <div>
                  AAA Normal:{" "}
                  {contrast.aaa
                    ? "✅"
                    : "❌"}
                </div>

                <div>
                  AA Large:{" "}
                  {contrast.aaLarge
                    ? "✅"
                    : "❌"}
                </div>

                <div>
                  AAA Large:{" "}
                  {contrast.aaaLarge
                    ? "✅"
                    : "❌"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}

        <section className="mt-16">
          <h2 className="mb-8 text-4xl font-bold">
            Real UI Preview
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Dashboard Card */}

            <div
              className="
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
      "
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              <div className="border-b border-white/10 p-6">
                <h3 className="text-xl font-bold">
                  Analytics Dashboard
                </h3>

                <p className="mt-2 opacity-70">
                  Testing real UI hierarchy.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-6">
                {[24.5, 18.2, 92].map(
                  (value, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 p-4"
                    >
                      <p className="text-xs opacity-60">
                        Metric
                      </p>

                      <h4 className="mt-2 text-3xl font-black">
                        {value}
                      </h4>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Landing Page */}

            <div
              className="
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        p-8
      "
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              <div className="max-w-md">
                <h3 className="text-4xl font-black leading-tight">
                  Build faster with better design.
                </h3>

                <p className="mt-4 opacity-75">
                  This preview lets you see
                  whether headings, body text,
                  buttons and spacing remain
                  readable.
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    className="
              rounded-2xl
              px-5
              py-3
              font-medium
            "
                    style={{
                      backgroundColor:
                        foreground,
                      color: background,
                    }}
                  >
                    Get Started
                  </button>

                  <button
                    className="
              rounded-2xl
              border
              border-white/20
              px-5
              py-3
            "
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Form Example */}

            <div
              className="
        rounded-[32px]
        border
        border-white/10
        p-8
      "
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              <h3 className="text-2xl font-bold">
                Contact Form
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/15 p-3 opacity-80">
                  Your Name
                </div>

                <div className="rounded-xl border border-white/15 p-3 opacity-80">
                  Email Address
                </div>

                <div className="h-28 rounded-xl border border-white/15 p-3 opacity-80">
                  Message
                </div>

                <button
                  className="
            rounded-xl
            px-5
            py-3
            font-medium
          "
                  style={{
                    backgroundColor:
                      foreground,
                    color: background,
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Data Table */}

            <div
              className="
        rounded-[32px]
        border
        border-white/10
        p-6
      "
              style={{
                backgroundColor: background,
                color: foreground,
              }}
            >
              <h3 className="mb-6 text-2xl font-bold">
                Data Table
              </h3>

              <div className="space-y-3">
                {[
                  "Revenue",
                  "Users",
                  "Conversions",
                ].map((item) => (
                  <div
                    key={item}
                    className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-white/10
              px-4
              py-3
            "
                  >
                    <span>{item}</span>

                    <span className="font-bold">
                      24.5k
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}