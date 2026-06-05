"use client";

import { useState } from "react";

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

  const css =
    Object.entries(shades)
      .map(
        ([k, v]) =>
          `--primary-${k}: ${v};`
      )
      .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(css);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-4xl font-bold">
          Exports
        </h2>

        {copied && (
          <span className="text-sm text-emerald-400">
            Copied!
          </span>
        )}
      </div>

      <button
        onClick={handleCopy}
        className="
          w-full
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-zinc-950
          p-8
          text-left
          transition-all
          hover:border-white/20
          hover:bg-zinc-900
        "
      >
        <pre className="overflow-x-auto text-sm">
          {css}
        </pre>
      </button>
    </section>
  );
}