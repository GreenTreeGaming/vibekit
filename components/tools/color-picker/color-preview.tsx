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
        className="flex h-[600px] items-center justify-center rounded-[28px]"
        style={{
          backgroundColor: color,
          color: textColor,
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-black">
            VibeKit
          </h2>

          <button
            className="mt-6 rounded-2xl bg-black/10 px-6 py-3 backdrop-blur"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}