"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { ColorControls } from "./color-controls";
import { ColorPreview } from "./color-preview";
import { ColorScale } from "./color-scale";
import { ColorHarmony } from "./color-harmony";
import { ColorExports } from "./color-exports";
import { ColorHistory } from "./color-history";

import {
  generateScale,
  getColorFormats,
  getContrastInfo,
  getHarmonies,
} from "./utils";

export function ColorPicker() {
  const previewRef =
    useRef<HTMLDivElement>(null);

  const historyTimeout =
    useRef<NodeJS.Timeout | null>(
      null
    );

  const [color, setColor] =
    useState("#8B5CF6");

  const [history, setHistory] =
    useState<string[]>([
      "#8B5CF6",
    ]);

  useEffect(() => {
    gsap.fromTo(
      previewRef.current,
      {
        scale: 0.96,
        opacity: 0.8,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      }
    );
  }, [color]);

  const formats =
    useMemo(
      () =>
        getColorFormats(
          color
        ),
      [color]
    );

  const shades =
    useMemo(
      () =>
        generateScale(
          color
        ),
      [color]
    );

  const harmonies =
    useMemo(
      () =>
        getHarmonies(
          color
        ),
      [color]
    );

  const contrast =
    useMemo(
      () =>
        getContrastInfo(
          color
        ),
      [color]
    );

  const updateColor = (
    value: string
  ) => {
    setColor(value);

    if (historyTimeout.current) {
      clearTimeout(
        historyTimeout.current
      );
    }

    historyTimeout.current =
      setTimeout(() => {
        setHistory((prev) =>
          [
            value,
            ...prev.filter(
              (c) =>
                c.toLowerCase() !==
                value.toLowerCase()
            ),
          ].slice(0, 8)
        );
      }, 400);
  };

  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-8">
        {/* Hero */}

        <div className="mb-16 text-center">
          <p
            className="
              mb-4
              text-sm
              font-medium
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            Color Picker
          </p>

          <h1 className="text-7xl font-black">
            Explore
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
              Colors
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
            Professional color
            exploration,
            accessibility,
            harmonies,
            scales and exports.
          </p>
        </div>

        {/* Main */}

        <div className="grid gap-8 lg:grid-cols-2">
          <ColorControls
            color={color}
            rgb={formats.rgb}
            hsl={formats.hsl}
            onChange={updateColor}
          />

          <ColorPreview
            color={color}
            previewRef={
              previewRef
            }
          />
        </div>

        {/* Scale */}

        <ColorScale
          shades={shades}
        />

        {/* Harmonies */}

        <ColorHarmony
          harmonies={
            harmonies
          }
        />

        {/* Contrast */}

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-4xl font-bold">
              Accessibility
            </h2>

            <p className="mt-2 text-muted-foreground">
              Instantly see how your color
              performs against WCAG
              accessibility standards.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Preview */}

            <div
  className="
    overflow-hidden
    rounded-[40px]
    border
    border-white/10
    bg-black/20
  "
>
              <div
                className="p-10"
                style={{
                  backgroundColor: color,
                }}
              >
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-medium text-white/70">
                      White Text Preview
                    </p>

                    <h3 className="text-5xl font-black text-white">
                      Aa
                    </h3>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-black/60">
                      Black Text Preview
                    </p>

                    <h3 className="text-5xl font-black text-black">
                      Aa
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Scores */}

            <div className="space-y-5">
              <ContrastCard
                title="White Text"
                ratio={`${contrast.whiteContrast}:1`}
                grade={
                  contrast.whiteGrade
                }
                passed={
                  contrast.whiteGrade.includes(
                    "AA"
                  ) ||
                  contrast.whiteGrade.includes(
                    "AAA"
                  )
                }
              />

              <ContrastCard
                title="Black Text"
                ratio={`${contrast.blackContrast}:1`}
                grade={
                  contrast.blackGrade
                }
                passed={
                  contrast.blackGrade.includes(
                    "AA"
                  ) ||
                  contrast.blackGrade.includes(
                    "AAA"
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* Exports */}

        <ColorExports
          color={color}
          shades={shades}
        />

        {/* History */}

        <ColorHistory
          colors={history}
          onSelect={
            updateColor
          }
        />
      </div>
    </section>
  );
}

function ContrastCard({
  title,
  ratio,
  grade,
  passed,
}: {
  title: string;
  ratio: string;
  grade: string;
  passed: boolean;
}) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/10
        bg-black/20
        p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-medium">
          {title}
        </p>

        <div
          className={`
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold

            ${
              passed
                ? `
                  border-emerald-500/20
                  bg-emerald-500/15
                  text-emerald-400
                `
                : `
                  border-red-500/20
                  bg-red-500/15
                  text-red-400
                `
            }
          `}
        >
          {passed
            ? "PASS"
            : "FAIL"}
        </div>
      </div>

      <h3 className="text-5xl font-black">
        {ratio}
      </h3>

      <p className="mt-3 text-zinc-500">
        {grade}
      </p>
    </div>
  );
}