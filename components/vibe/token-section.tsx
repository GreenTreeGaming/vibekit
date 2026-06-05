"use client";

interface Props {
  primary: string;
  secondary: string;
  accent: string;
}

export function TokenSection({
  primary,
  secondary,
  accent,
}: Props) {
  const tokens = {
  "--primary": primary,

  "--secondary": secondary,

  "--accent": accent,

  "--background": "#09090B",

  "--foreground": "#FAFAFA",
};

  return (
    <section className="py-40">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 text-6xl font-black">
          Design Tokens
        </h2>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950">
          {Object.entries(tokens).map(
            ([name, value]) => (
              <div
                key={name}
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/5
                  px-8
                  py-6
                "
              >
                <span className="font-mono text-cyan-400">
                  {name}
                </span>

                <span className="font-mono text-zinc-300">
                  {value}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}