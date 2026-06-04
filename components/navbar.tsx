"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [toolsOpen, setToolsOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Disable parallax on mobile
    if (window.innerWidth < 768) return;

    const move = (e: MouseEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) *
        8;

      const y =
        (e.clientY / window.innerHeight - 0.5) *
        8;

      gsap.to(navRef.current, {
        x,
        y,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );
    };
  }, []);

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
      label: "Github",
      href: "https://github.com",
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
    <>
      <header className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
        <div
          ref={navRef}
          className="
            flex
            w-full
            max-w-5xl
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-black/50
            px-5
            py-3
            shadow-[0_0_50px_rgba(255,255,255,0.03)]
            backdrop-blur-2xl
          "
        >
          {/* Logo */}

          <Link
            href="/"
            className="
              bg-gradient-to-r
              from-violet-400
              to-cyan-400
              bg-clip-text
              text-lg
              font-black
              text-transparent
              transition-opacity
              hover:opacity-80
            "
          >
            VibeKit
          </Link>

          {/* Desktop Nav */}

          <nav
            onMouseLeave={() => {
              gsap.to(
                indicatorRef.current,
                {
                  opacity: 0,
                  duration: 0.25,
                }
              );
            }}
            className="
              relative
              hidden
              items-center
              gap-2
              md:flex
            "
          >
            <div
              ref={indicatorRef}
              className="
                absolute
                top-1/2
                h-9
                -translate-y-1/2
                rounded-full
                bg-white/10
                backdrop-blur-xl
                pointer-events-none
              "
              style={{
                width: 0,
                opacity: 0,
              }}
            />

            <div
              className="
    relative
    z-10
    pb-4
    -mb-4
  "
              onMouseEnter={() => {
                if (closeTimeout.current) {
                  clearTimeout(closeTimeout.current);
                }

                setToolsOpen(true);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(
                  () => {
                    setToolsOpen(false);
                  },
                  200
                );
              }}
            >
              <button
                className="
      flex
      items-center
      gap-2
      rounded-full
      px-4
      py-2
      text-sm
      text-zinc-400
      transition-colors
      hover:text-white
    "
              >
                Tools

                <span
                  className={`
        transition-transform
        ${toolsOpen ? "rotate-180" : ""}
      `}
                >
                  ▼
                </span>
              </button>

              {toolsOpen && (
                <div
                  className="
        absolute
        left-0
        top-full mt-2
        w-64
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-black/80
        p-2
        backdrop-blur-2xl
      "
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.label}
                      href={tool.href}
                      className="
            block
            rounded-2xl
            px-4
            py-3
            text-sm
            text-zinc-300
            transition
            hover:bg-white/5
            hover:text-white
          "
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={(e) => {
                  gsap.to(
                    indicatorRef.current,
                    {
                      x:
                        e.currentTarget
                          .offsetLeft,
                      width:
                        e.currentTarget
                          .offsetWidth,
                      opacity: 1,
                      duration: 0.45,
                      ease:
                        "power4.out",
                    }
                  );
                }}
                className="
                  relative
                  z-10
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  text-zinc-400
                  transition-colors
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}

          <Link
            href="/create"
            ref={buttonRef}
            onMouseMove={(e) => {
              if (
                window.innerWidth < 768
              )
                return;

              const rect =
                e.currentTarget.getBoundingClientRect();

              const x =
                e.clientX -
                rect.left -
                rect.width / 2;

              const y =
                e.clientY -
                rect.top -
                rect.height / 2;

              gsap.to(
                buttonRef.current,
                {
                  x: x * 0.25,
                  y: y * 0.25,
                  duration: 0.3,
                  ease: "power2.out",
                }
              );
            }}
            onMouseLeave={() => {
              gsap.to(
                buttonRef.current,
                {
                  x: 0,
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                }
              );
            }}
            className="
              hidden
              rounded-full
              bg-white
              px-5
              py-2.5
              text-sm
              font-medium
              text-black
              md:block
            "
          >
            Create Vibe
          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              md:hidden
            "
          >
            <div className="space-y-1">
              <div className="h-px w-4 bg-white" />
              <div className="h-px w-4 bg-white" />
              <div className="h-px w-4 bg-white" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div
          className="
            fixed
            left-4
            right-4
            top-20
            z-40
            rounded-3xl
            border
            border-white/10
            bg-black/80
            p-4
            backdrop-blur-2xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() =>
                  setMobileOpen(
                    false
                  )
                }
                className="
                  rounded-2xl
                  px-4
                  py-3
                  text-zinc-300
                  transition
                  hover:bg-white/5
                "
              >
                {link.label}
              </Link>
            ))}

            <div className="mb-2">
              <p
                className="
      px-4
      pb-2
      text-xs
      uppercase
      tracking-wider
      text-zinc-500
    "
              >
                Tools
              </p>

              {tools.map((tool) => (
                <Link
                  key={tool.label}
                  href={tool.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
        block
        rounded-2xl
        px-4
        py-3
        text-zinc-300
        transition
        hover:bg-white/5
      "
                >
                  {tool.label}
                </Link>
              ))}
            </div>

            <Link
              href="/create"
              className="
                mt-2
                rounded-2xl
                bg-white
                px-4
                py-3
                text-center
                font-medium
                text-black
              "
            >
              Create Vibe
            </Link>
          </div>
        </div>
      )}
    </>
  );
}