interface Props {
  foreground: string;
  background: string;
}

export function ContrastPreview({
  foreground,
  background,
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
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          Live Preview
        </h3>

        <div
          className="
      rounded-full
      border
      border-white/10
      px-4
      py-2
      text-sm
      text-zinc-400
    "
        >
          {foreground}
          {" → "}
          {background}
        </div>
      </div>

      <div
  className="
    relative
    flex
    h-[450px]
    flex-col
          items-center
          justify-center
          rounded-[28px]
          text-center
        "
        style={{
          backgroundColor:
            background,
          color: foreground,
        }}
      >
        <h2 className="text-6xl font-black">
          VibeKit
        </h2>

        <p className="mt-4 max-w-md text-lg">
          Generate complete design
          systems from screenshots.
        </p>

        <div className="mt-8 flex gap-3">
  <span
    className="rounded-full px-3 py-1 text-sm"
    style={{
      backgroundColor:
        foreground,
      color: background,
    }}
  >
    Badge
  </span>

  <span
    className="rounded-full border border-current px-3 py-1 text-sm"
  >
    Secondary
  </span>
</div>

        <button
          className="mt-8 rounded-2xl px-6 py-3"
          style={{
            backgroundColor:
              foreground,
            color: background,
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}