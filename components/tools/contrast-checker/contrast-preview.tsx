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
      <h3 className="mb-6 text-2xl font-bold">
        Live Preview
      </h3>

      <div
        className="
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