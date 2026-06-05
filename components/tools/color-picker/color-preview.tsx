import Color from "color";
import { RefObject } from "react";

interface Props {
  color: string;
  previewRef: RefObject<HTMLDivElement | null>;
}

export function ColorPreview({
  color,
  previewRef,
}: Props) {
  const textColor =
    Color(color).isLight()
      ? "#000"
      : "#fff";

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
      <h3 className="mb-6 text-2xl font-bold">
        Live Preview
      </h3>

      <div
        ref={previewRef}
        className="relative h-[600px] overflow-hidden rounded-[28px] border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${color}, ${Color(
            color
          )
            .darken(0.4)
            .hex()})`,
          color: textColor,
        }}
      >
        {/* Glow */}
        <div
          className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{
            backgroundColor: color,
          }}
        />

        {/* Fake Navbar */}
        <div className="absolute left-0 top-0 flex w-full items-center justify-between px-8 py-6">
          <div className="font-bold">
            VibeKit
          </div>

          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-current opacity-50" />
            <div className="h-2 w-2 rounded-full bg-current opacity-50" />
            <div className="h-2 w-2 rounded-full bg-current opacity-50" />
          </div>
        </div>

        {/* Hero */}
        <div className="flex h-full flex-col items-center justify-center px-10 text-center">
          <h2 className="max-w-xl text-6xl font-black leading-none">
            Build beautiful
            <br />
            interfaces faster.
          </h2>

          <p className="mt-6 max-w-md opacity-80">
            Generate palettes, scales,
            gradients and design tokens
            instantly.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-2xl bg-white px-6 py-3 font-medium text-black">
              Get Started
            </button>

            <button className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur">
              Learn More
            </button>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-8 left-8 flex gap-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            Palette
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            Tokens
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            Export
          </div>
        </div>
      </div>
    </div>
  );
}