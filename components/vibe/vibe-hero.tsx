"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useRouter } from "next/navigation";

import { useState } from "react";

interface Vibe {
  name: string;
  colors: string[];
}

interface Props {
  vibe: Vibe;
}

export function VibeHero({
  vibe,
}: Props) {
  const heroRef =
    useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const subtitleRef =
    useRef<HTMLParagraphElement>(null);

  const chipsRef =
    useRef<HTMLDivElement>(null);

  const buttonsRef =
    useRef<HTMLDivElement>(null);

  const [exported, setExported] =
    useState(false);

  const handleUseVibe = () => {
    setLoading(true);

    localStorage.setItem(
      "selectedGradient",
      JSON.stringify(vibe)
    );

    router.push("/tools/gradient");
  };

  const handleExportTokens = () => {
    const tokens = {
      "--primary":
        vibe.colors[0],

      "--secondary":
        vibe.colors[1] ??
        vibe.colors[0],

      "--accent":
        vibe.colors[2] ??
        vibe.colors[1] ??
        vibe.colors[0],

      "--background":
        "#09090B",

      "--foreground":
        "#FAFAFA",
    };

    const blob = new Blob(
      [
        JSON.stringify(
          tokens,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = `${vibe.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-tokens.json`;

    a.click();

    URL.revokeObjectURL(url);

    setExported(true);

    setTimeout(
      () => setExported(false),
      2000
    );
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      {
        scale: 1.08,
      },
      {
        scale: 1,
        duration: 2,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      },
      "-=1.5"
    );

    tl.fromTo(
      subtitleRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      "-=0.6"
    );

    tl.fromTo(
      chipsRef.current?.children || [],
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
      },
      "-=0.5"
    );

    tl.fromTo(
      buttonsRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.3"
    );
  }, []);

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Background */}

      <div
        ref={heroRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg,
            ${vibe.colors.join(", ")}
          )`,
        }}
      />

      {/* Blur Layer */}

      <div
        className="
          absolute
          inset-0
          bg-black/30
          backdrop-blur-[120px]
        "
      />

      {/* Floating Orbs */}

      {vibe.colors.map(
        (color, index) => (
          <div
            key={index}
            className="
              absolute
              rounded-full
              blur-[120px]
            "
            style={{
              backgroundColor: color,
              width: 400,
              height: 400,
              top: `${20 + index * 15}%`,
              left: `${10 + index * 25}%`,
              opacity: 0.35,
            }}
          />
        )
      )}

      {/* Content */}

      <div
        className="
          relative
          z-20
          mx-auto
          max-w-6xl
          px-8
          text-center
        "
      >
        <p
          className="
            mb-4
            text-sm
            font-medium
            uppercase
            tracking-[0.4em]
            text-white/60
          "
        >
          Generated Design System
        </p>

        <h1
          ref={titleRef}
          className="
            text-7xl
            font-black
            md:text-9xl
          "
        >
          {vibe.name}
        </h1>

        <p
          ref={subtitleRef}
          className="
            mx-auto
            mt-8
            max-w-2xl
            text-xl
            text-white/70
          "
        >
          Complete palette, tokens,
          previews, exports, and UI
          system generated from this
          gradient.
        </p>

        {/* Palette */}

        <div
          ref={chipsRef}
          className="
            mt-10
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          {vibe.colors.map((color) => (
            <div
              key={color}
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/10
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <div
                className="
                  h-5
                  w-5
                  rounded-full
                "
                style={{
                  backgroundColor: color,
                }}
              />

              {color}
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div
          ref={buttonsRef}
          className="
            mt-12
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          <button
            onClick={handleUseVibe}
            disabled={loading}
            className="
    rounded-2xl
    bg-white
    px-8
    py-4
    font-semibold
    text-black
    transition
    hover:scale-105
    disabled:opacity-70
  "
          >
            {loading
              ? "Loading..."
              : "Use This Vibe"}
          </button>

          <button
            onClick={handleExportTokens}
            className="
    rounded-2xl
    border
    border-white/20
    bg-white/10
    px-8
    py-4
    backdrop-blur-xl
  "
          >
            {exported
              ? "Downloaded!"
              : "Export Tokens"}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}

      <div
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          text-sm
          tracking-widest
          text-white/40
        "
      >
        SCROLL
      </div>
    </section>
  );
}