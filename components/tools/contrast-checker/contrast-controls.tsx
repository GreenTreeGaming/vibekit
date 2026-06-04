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
  </div>
</div>
  );
}