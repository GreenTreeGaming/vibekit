"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  color: string;
  shades: Record<
    string,
    string
  >;
}

export function ColorExports({
  shades,
}: Props) {
  const [copied, setCopied] =
    useState(false);

  const [format, setFormat] =
    useState<
      "css" | "tailwind" | "json"
    >("css");

  const exports =
    useMemo(() => {
      const css =
        Object.entries(shades)
          .map(
            ([k, v]) =>
              `--primary-${k}: ${v};`
          )
          .join("\n");

      const tailwind = `primary: {
${Object.entries(shades)
          .map(
            ([k, v]) =>
              `  ${k}: "${v}",`
          )
          .join("\n")}
}`;

      const json =
        JSON.stringify(
          {
            primary:
              shades,
          },
          null,
          2
        );

      return {
        css,
        tailwind,
        json,
      };
    }, [shades]);

  const code =
    exports[format];

  const copy = async () => {
    await navigator.clipboard.writeText(
      code
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Exports
        </h2>

        <p className="mt-2 text-muted-foreground">
          Export your generated
          design system for
          development workflows.
        </p>
      </div>

      <div
        className="
    overflow-hidden
    rounded-[40px]
    border
    border-white/10
    bg-black/20
  "
      >
        {/* Header */}

        <div
          className="
    flex
    flex-wrap
    items-center
    justify-between
    gap-4
    border-b
    border-white/10
    p-6
  "
        >
          <div
            className="
    inline-flex
    rounded-2xl
    border
    border-white/10
    bg-black/20
    p-1
  "
          >
            {[
              "css",
              "tailwind",
              "json",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFormat(
                    item as
                    | "css"
                    | "tailwind"
                    | "json"
                  )
                }
                className={`
  rounded-xl
  px-4
  py-2
  text-sm
  font-medium
  transition-all
  duration-300

  ${format === item
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
                {item ===
                  "tailwind"
                  ? "Tailwind"
                  : item.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={copy}
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
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}

            {copied
              ? "Copied"
              : "Copy"}
          </button>
        </div>

        {/* Code Window */}

        <div
          className="
    bg-black/40
    backdrop-blur-sm
  "
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 text-xs text-zinc-500">
              {format}
            </span>
          </div>

          <pre
            className="
    overflow-x-auto
    p-6
    font-mono
    text-sm
    text-zinc-300
  "
          >
            <code>
              {code}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}