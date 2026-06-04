"use client";

import { HexColorPicker } from "react-colorful";

interface Props {
  label: string;
  color: string;
  onChange: (
    color: string
  ) => void;
}

export function CustomColorPicker({
  label,
  color,
  onChange,
}: Props) {
  return (
    <div>
      <p className="mb-4 text-sm text-zinc-500">
        {label}
      </p>

      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-black/20
          p-4
        "
      >
        <HexColorPicker
          color={color}
          onChange={onChange}
          className="!w-full"
        />

        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-3
          "
        >
          <div
            className="
              h-10
              w-10
              rounded-xl
              border
              border-white/10
            "
            style={{
              backgroundColor:
                color,
            }}
          />

          <span className="font-mono">
            {color}
          </span>
        </div>
      </div>
    </div>
  );
}