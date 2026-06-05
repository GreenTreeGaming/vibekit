"use client";

import { Copy } from "lucide-react";

interface Props {
  primary: string;
  secondary: string;
  accent: string;
}

export function ExportSection({
  primary,
  secondary,
  accent,
}: Props) {
  const tailwindConfig = `
export const theme = {
  colors: {
    primary: "${primary}",
    secondary: "${secondary}",
    accent: "${accent}",
    background: "#09090B",
    foreground: "#FAFAFA",
  },
};
`;

  return (
    <section className="pb-40">
      <div className="mx-auto max-w-7xl px-8">
        <div
          className="
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-zinc-950
          "
        >
          <div className="border-b border-white/10 p-8">
            <h2 className="text-5xl font-black">
              Export
            </h2>

            <p className="mt-3 text-zinc-400">
              Ready for production.
            </p>
          </div>

          <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                Tailwind Config
              </h3>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    tailwindConfig
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-black
                "
              >
                <Copy size={16} />
                Copy
              </button>
            </div>

            <pre
              className="
                overflow-x-auto
                rounded-2xl
                bg-black/40
                p-6
                text-sm
              "
            >
              {tailwindConfig}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}