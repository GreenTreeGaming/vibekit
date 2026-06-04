"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-40">
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-violet-500/10
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-5xl px-8 text-center">
        <h2 className="text-7xl font-black">
          Ready To Build
          <br />
          Your Next Design System?
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400">
          Generate palettes, gradients,
          accessibility reports and
          production-ready design tokens
          in seconds.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/create"
            className="
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-cyan-500
              px-8
              py-4
              font-semibold
              text-white
              shadow-[0_0_40px_rgba(99,102,241,0.35)]
              transition-all
              hover:scale-[1.03]
            "
          >
            Create Design System
          </Link>

          <Link
            href="/tools/color-picker"
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-8
              py-4
              transition-colors
              hover:bg-white/10
            "
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </section>
  );
}