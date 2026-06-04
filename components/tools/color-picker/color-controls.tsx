import "./color-picker.css";
import { CustomColorPicker } from "@/components/ui/custom-color-picker";

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
  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold">
          Color Controls
        </h3>

        <p className="mt-2 text-zinc-500">
          Pick, inspect and fine-tune colors.
        </p>
      </div>

      {/* Large Picker */}

      <CustomColorPicker
  label="Primary Color"
  color={color}
  onChange={onChange}
/>

      {/* Current Color */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-black/20
          p-4
        "
      >
        <div
          className="
            h-16
            w-16
            rounded-2xl
            border
            border-white/10
          "
          style={{
            backgroundColor: color,
          }}
        />

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Selected Color
          </p>

          <p className="mt-1 font-mono text-lg font-semibold">
            {color}
          </p>
        </div>
      </div>

      {/* Values */}

      <div className="mt-8 grid gap-4">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-4
          "
        >
          <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
            HEX
          </p>

          <p className="font-mono text-lg">
            {color}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-4
          "
        >
          <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
            RGB
          </p>

          <p className="font-mono text-lg">
            {rgb}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-4
          "
        >
          <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
            HSL
          </p>

          <p className="font-mono text-lg">
            {hsl}
          </p>
        </div>
      </div>

      {/* Quick Picks */}

      <div className="mt-8">
        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Popular Colors
        </p>

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
          ].map((preset) => (
            <button
              key={preset}
              onClick={() =>
                onChange(preset)
              }
              className="
                h-10
                w-10
                rounded-xl
                border
                border-white/10
                transition-transform
                hover:scale-110
              "
              style={{
                backgroundColor: preset,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}