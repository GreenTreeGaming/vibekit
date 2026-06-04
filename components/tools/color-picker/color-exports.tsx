interface Props {
  color: string;
  shades: Record<
    string,
    string
  >;
}

export function ColorExports({
  shades,
}: Props) {
  const css =
    Object.entries(shades)
      .map(
        ([k, v]) =>
          `--primary-${k}: ${v};`
      )
      .join("\n");

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-4xl font-bold">
        Exports
      </h2>

      <pre className="overflow-x-auto rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-sm">
        {css}
      </pre>
    </section>
  );
}