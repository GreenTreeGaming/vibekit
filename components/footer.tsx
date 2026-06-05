"use client";

import Link from "next/link";

export function Footer() {
  const links = [
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Create",
      href: "/create",
    },
  ];

  const tools = [
    {
      label: "Gradient Generator",
      href: "/tools/gradient",
    },
    {
      label: "Color Picker",
      href: "/tools/color-picker",
    },
    {
      label: "Palette Extractor",
      href: "/create",
    },
    {
      label: "Contrast Checker",
      href: "/tools/contrast-checker",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_40%)]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-[180px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          py-32
        "
      >
        {/* Top */}

        <div
          className="
            flex
            flex-col
            gap-16
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* Brand */}

          <div className="max-w-xl">
            <h2
              className="
                bg-gradient-to-r
                from-violet-400
                via-fuchsia-400
                to-cyan-400
                bg-clip-text
                text-6xl
                font-black
                text-transparent
                md:text-8xl
              "
            >
              VibeKit
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-zinc-400
              "
            >
              Turn screenshots into production-ready
              design systems. Extract colors, generate
              Tailwind themes, build palettes, create
              gradients, and ship beautiful interfaces
              faster.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                "#8B5CF6",
                "#A855F7",
                "#EC4899",
                "#06B6D4",
                "#3B82F6",
              ].map((color) => (
                <div
                  key={color}
                  className="
                    h-10
                    w-10
                    rounded-full
                    border
                    border-white/10
                    shadow-lg
                  "
                  style={{
                    background: color,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Links */}

          <div
            className="
              grid
              gap-12
              sm:grid-cols-2
            "
          >
            <div>
              <p
                className="
                  mb-4
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                Navigation
              </p>

              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="
                      text-zinc-400
                      transition-colors
                      hover:text-white
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p
                className="
                  mb-4
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                Tools
              </p>

              <div className="flex flex-col gap-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.label}
                    href={tool.href}
                    className="
                      text-zinc-400
                      transition-colors
                      hover:text-white
                    "
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-16
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-zinc-500
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} VibeKit.
            Built for designers & developers.
          </p>

          <p>
            {"built by Sarvajith Kaurn :)"}
          </p>
        </div>
      </div>
    </footer>
  );
}