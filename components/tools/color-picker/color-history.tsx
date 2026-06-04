interface Props {
  colors: string[];
  onSelect: (color: string) => void;
}

export function ColorHistory({
  colors,
  onSelect,
}: Props) {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Recent Colors
        </h2>

        <p className="mt-2 text-zinc-500">
          Quickly jump back to colors you've explored.
        </p>
      </div>

      <div
        className="
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          p-6
        "
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onSelect(color)}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-black/20
                text-left
                transition-all
                hover:scale-[1.02]
                hover:border-white/20
              "
            >
              <div
                className="h-24 w-full"
                style={{
                  backgroundColor: color,
                }}
              />

              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Color
                </p>

                <p
                  className="
                    mt-1
                    font-mono
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {color}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}