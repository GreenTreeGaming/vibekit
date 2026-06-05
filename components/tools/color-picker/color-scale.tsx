"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Color from "color";
import { Copy } from "lucide-react";

interface Props {
  shades: Record<string, string>;
}

export function ColorScale({
  shades,
}: Props) {
  const entries = useMemo(
    () => Object.entries(shades),
    [shades]
  );

  const defaultShade =
    entries.find(
      ([step]) => step === "500"
    ) ?? entries[0];

  const [selected, setSelected] =
    useState(defaultShade);

  useEffect(() => {
    setSelected(defaultShade);
  }, [defaultShade]);

  const [step, value] = selected;

  const color = Color(value);

  const hex = color.hex();

  const rgbObject =
    color.rgb().object();

  const rgb = `rgb(${Math.round(
    rgbObject.r
  )}, ${Math.round(
    rgbObject.g
  )}, ${Math.round(
    rgbObject.b
  )})`;

  const hslObject =
    color.hsl().object();

  const hsl = `hsl(${Math.round(
    hslObject.h ?? 0
  )}, ${Math.round(
    hslObject.s ?? 0
  )}%, ${Math.round(
    hslObject.l ?? 0
  )}%)`;

  const copy = async (
    value: string
  ) => {
    await navigator.clipboard.writeText(
      value
    );
  };

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Tailwind Scale
        </h2>

        <p className="mt-2 text-muted-foreground">
          Click any shade to inspect and
          copy its values.
        </p>
      </div>

      <div className="space-y-8">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="flex h-32">
            {entries.map(
              ([shade, shadeColor]) => (
                <button
                  key={shade}
                  onClick={() =>
                    setSelected([
                      shade,
                      shadeColor,
                    ])
                  }
                  className="group relative flex-1 transition-all"
                  style={{
                    backgroundColor:
                      shadeColor,
                  }}
                >
                  {shade === step && (
                    <div className="absolute inset-0 border-2 border-zinc-300 dark:border-zinc-600" />
                  )}

                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/20 px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    {shade}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div
            className="
  h-72
  rounded-3xl
  border
  border-white/10
"
            style={{
              backgroundColor: value,
            }}
          />

          <div className="
  rounded-3xl
  border
  border-white/10
  bg-black/20
  p-6
">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Selected Shade
                </p>

                <h3 className="text-4xl font-bold">
                  {step}
                </h3>
              </div>

              <div
                className="
  h-12
  w-12
  rounded-full
  border
  border-white/10
"
                style={{
                  backgroundColor: value,
                }}
              />
            </div>

            <div className="space-y-3">
              <CopyRow
                label="HEX"
                value={hex}
                onCopy={copy}
              />

              <CopyRow
                label="RGB"
                value={rgb}
                onCopy={copy}
              />

              <CopyRow
                label="HSL"
                value={hsl}
                onCopy={copy}
              />
            </div>

            <div className="
  mt-6
  rounded-2xl
  border
  border-white/10
  bg-black/20
  p-4
">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tailwind Usage
              </p>

              <div className="space-y-2 font-mono text-sm">
                <p>
                  bg-primary-{step}
                </p>

                <p>
                  text-primary-{step}
                </p>

                <p>
                  border-primary-{step}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
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
    rounded-2xl
    border
    border-white/10
    bg-black/20
    px-4
    py-3
  "
    >
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="truncate font-mono text-sm">
          {value}
        </p>
      </div>

      <button
        onClick={() =>
          onCopy(value)
        }
        className="
  ml-4
  flex
  h-10
  w-10
  items-center
  justify-center
  rounded-xl
  border
  border-white/10
  bg-white/[0.03]
  transition-all
  hover:bg-white/[0.06]
"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}