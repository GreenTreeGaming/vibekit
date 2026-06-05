"use client";

import { Copy } from "lucide-react";
import "./color-picker.css";
import { CustomColorPicker } from "@/components/ui/custom-color-picker";
import Color from "color";
import { useEffect, useState } from "react";

interface Props {
  color: string;
  rgb: string;
  hsl: string;
  onChange: (
    color: string
  ) => void;
}

export function ColorControls({
  color,
  rgb,
  hsl,
  onChange,
}: Props) {
  const copy = async (
    value: string
  ) => {
    await navigator.clipboard.writeText(
      value
    );
  };

  const isLight =
    Color(color).isLight();

  const textColor = isLight
    ? "#111111"
    : "#ffffff";

  const mutedText = isLight
    ? "rgba(17,17,17,0.7)"
    : "rgba(255,255,255,0.8)";

  const orbBorder = isLight
    ? "rgba(0,0,0,0.08)"
    : "rgba(255,255,255,0.12)";

  const orbBackground = isLight
    ? "rgba(0,0,0,0.05)"
    : "rgba(255,255,255,0.2)";

  const [hexInput, setHexInput] =
    useState(color);

  const [rgbInput, setRgbInput] =
    useState(rgb);

  const [hslInput, setHslInput] =
    useState(hsl);

  useEffect(() => {
    setHexInput(color);
    setRgbInput(rgb);
    setHslInput(hsl);
  }, [color, rgb, hsl]);

  const updateHex = (
    value: string
  ) => {
    setHexInput(value);

    try {
      const parsed =
        Color(value);

      onChange(
        parsed.hex()
      );
    } catch { }
  };

  const updateRgb = (
    value: string
  ) => {
    setRgbInput(value);

    try {
      const parsed =
        Color(value);

      onChange(
        parsed.hex()
      );
    } catch { }
  };

  const updateHsl = (
    value: string
  ) => {
    setHslInput(value);

    try {
      const parsed =
        Color(value);

      onChange(
        parsed.hex()
      );
    } catch { }
  };

  return (
    <div
      className="
    overflow-hidden
    rounded-[40px]
    border
    border-zinc-800
    bg-background
    shadow-[0_20px_80px_rgba(0,0,0,0.08)]
  "
    >
      {/* Hero */}

      <div
        className="relative h-64 overflow-hidden"
        style={{
          backgroundColor: color,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

        <div className="absolute left-8 top-8">
          <p
            className="text-sm font-medium"
            style={{
              color: mutedText,
            }}
          >
            Live Preview
          </p>

          <h2
            className="mt-2 text-5xl font-bold"
            style={{
              color: textColor,
            }}
          >
            {color}
          </h2>
        </div>

        <div

          className="

    absolute

    right-10

    top-1/2

    h-28

    w-28

    -translate-y-1/2

    rounded-full

    border

    backdrop-blur-xl

  "

          style={{

            borderColor: orbBorder,

            backgroundColor: orbBackground,

          }}

        />
      </div>

      <div className="p-8">
        {/* Header */}

        <div className="mb-8">
          <h3 className="text-3xl font-bold">
            Color Inspector
          </h3>

          <p className="mt-2 text-muted-foreground">
            Explore color values,
            copy formats and fine-tune
            your palette.
          </p>
        </div>

        {/* Picker */}

        <CustomColorPicker
          label="Primary Color"
          color={color}
          onChange={onChange}
        />

        {/* Values */}

        <div className="mt-8 grid gap-4">
          <EditableColorField
            label="HEX"
            value={hexInput}
            onChange={updateHex}
            onCopy={copy}
          />

          <EditableColorField
            label="RGB"
            value={rgbInput}
            onChange={updateRgb}
            onCopy={copy}
          />

          <EditableColorField
            label="HSL"
            value={hslInput}
            onChange={updateHsl}
            onCopy={copy}
          />
        </div>

        {/* Popular Colors */}

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Popular Colors
            </p>

            <span className="text-xs text-muted-foreground">
              Quick presets
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "#8B5CF6",
              "#EC4899",
              "#06B6D4",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#3B82F6",
              "#6366F1",
            ].map((preset) => {
              const active =
                preset.toLowerCase() ===
                color.toLowerCase();

              return (
                <button
                  key={preset}
                  onClick={() =>
                    onChange(preset)
                  }
                  className={`
                    relative
                    h-12
                    w-12
                    rounded-2xl
                    transition-all
                    hover:scale-110
                    ${active
                      ? "ring-4 ring-primary/20"
                      : ""
                    }
                  `}
                  style={{
                    backgroundColor:
                      preset,
                  }}
                >
                  {active && (
                    <div
                      className="
    absolute
    inset-0
    rounded-2xl
    border-2
    border-zinc-200
    dark:border-zinc-700
  "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableColorField({
  label,
  value,
  onChange,
  onCopy,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  onCopy: (
    value: string
  ) => void;
}) {
  return (
    <div
      className="
    flex
    items-center
    justify-between
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    px-5
    py-4
  "
    >
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>

        <input
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            mt-1
            w-full
            bg-transparent
            font-mono
            text-lg
            font-medium
            outline-none
          "
        />
      </div>

      <button
        onClick={() => onCopy(value)}
        className="
    ml-4
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-2xl
    border
    border-white/10
    bg-white/[0.03]
    transition-all
    hover:scale-105
    hover:bg-white/[0.06]
  "
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}