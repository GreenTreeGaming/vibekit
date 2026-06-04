interface Props {
  shades: Record<
    string,
    string
  >;
}

export function ColorScale({
  shades,
}: Props) {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-4xl font-bold">
        Tailwind Scale
      </h2>

      <div className="grid grid-cols-11 gap-3">
        {Object.entries(shades).map(
          ([step, value]) => (
            <div
              key={step}
              className="swatch"
            >
              <div
                className="h-28 rounded-2xl"
                style={{
                  backgroundColor:
                    value,
                }}
              />

              <p className="mt-2 text-center text-xs">
                {step}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}