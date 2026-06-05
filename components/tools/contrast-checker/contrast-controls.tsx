import { CustomColorPicker } from "@/components/ui/custom-color-picker";

interface Props {
  foreground: string;
  background: string;
  onForegroundChange: (
    color: string
  ) => void;
  onBackgroundChange: (
    color: string
  ) => void;
  onSwap: () => void;
}

export function ContrastControls({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
  onSwap,
}: Props) {
  return (
    <div
      className="
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
    >
      <h3 className="text-2xl font-bold">
        Colors
      </h3>

      <div className="mt-8 space-y-8">
        <CustomColorPicker
          label="Foreground"
          color={foreground}
          onChange={
            onForegroundChange
          }
        />

        <CustomColorPicker
          label="Background"
          color={background}
          onChange={
            onBackgroundChange
          }
        />

        <button
          onClick={onSwap}
          className="
        w-full
        rounded-2xl
        border
        border-white/10
        py-3
        transition
        hover:bg-white/5
      "
        >
          Swap Colors
        </button>

        <div>
          <p className="mb-3 text-sm text-zinc-500">
            Quick Presets
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                name: "Dark",
                fg: "#FFFFFF",
                bg: "#111827",
              },
              {
                name: "Light",
                fg: "#111827",
                bg: "#FFFFFF",
              },
              {
                name: "Brand",
                fg: "#FFFFFF",
                bg: "#3B82F6",
              },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  onForegroundChange(
                    preset.fg
                  );
                  onBackgroundChange(
                    preset.bg
                  );
                }}
                className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          text-left
          transition-all
          hover:border-white/20
          hover:scale-[1.02]
        "
              >
                <div
                  className="h-10"
                  style={{
                    background: preset.bg,
                  }}
                />

                <div className="p-3">
                  <p className="text-sm font-medium">
                    {preset.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}