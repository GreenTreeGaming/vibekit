"use client";

import { useState } from "react";

interface Props {
  colors: string[];
  onSelect: (color: string) => void;
}

export function ColorHistory({
  colors,
  onSelect,
}: Props) {
  const [copied, setCopied] =
    useState<string | null>(null);

  const copyColor = (
    e: React.MouseEvent,
    color: string
  ) => {
    e.stopPropagation();

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
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Recent Colors
        </h2>

        <p className="mt-2 text-zinc-500">
          Quickly jump back to colors
          you've explored.
        </p>
      </div>

      <div
        className="
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          p-6
        "
      >
        {colors.length === 0 ? (
          <div
            className="
              flex
              h-32
              items-center
              justify-center
              text-zinc-500
            "
          >
            No colors explored yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  onSelect(color)
                }
                className="
                  group
                  overflow-hidden
                  rounded-3xl
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
                  className="h-24 w-full"
                  style={{
                    backgroundColor: color,
                  }}
                />

                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Color
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p
                      className="
                        font-mono
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {color}
                    </p>

                    <button
                      onClick={(e) =>
                        copyColor(
                          e,
                          color
                        )
                      }
                      className={`
                        rounded-lg
                        px-2
                        py-1
                        text-[10px]
                        transition-all

                        ${
                          copied === color
                            ? "bg-emerald-500 text-white"
                            : "bg-white/5 text-zinc-400 hover:bg-white/10"
                        }
                      `}
                    >
                      {copied === color
                        ? "Copied!"
                        : "Copy"}
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}