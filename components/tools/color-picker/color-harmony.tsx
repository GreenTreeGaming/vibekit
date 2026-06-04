interface Props {
  harmonies: {
    complementary: string[];
    analogous: string[];
    triadic: string[];
    splitComplementary: string[];
  };
}

export function ColorHarmony({
  harmonies,
}: Props) {
  const palettes = [
    {
      label: "Complementary",
      colors:
        harmonies.complementary,
    },
    {
      label: "Analogous",
      colors:
        harmonies.analogous,
    },
    {
      label: "Triadic",
      colors:
        harmonies.triadic,
    },
    {
      label: "Split Complementary",
      colors:
        harmonies.splitComplementary,
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-4xl font-bold">
        Color Harmonies
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {palettes.map(
          (palette) => (
            <div
              key={palette.label}
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h3 className="mb-5 text-lg font-bold">
                {palette.label}
              </h3>

              <div className="flex gap-3">
                {palette.colors.map(
                  (color) => (
                    <div
                      key={color}
                      className="flex-1"
                    >
                      <div
                        className="
                          h-24
                          rounded-2xl
                          border
                          border-white/10
                        "
                        style={{
                          backgroundColor:
                            color,
                        }}
                      />

                      <p
                        className="
                          mt-3
                          text-center
                          font-mono
                          text-xs
                          text-zinc-400
                        "
                      >
                        {color}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}