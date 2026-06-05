// components/docs/docs-cta.tsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function DocsCTA() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta='content']",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger:
              sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.to(
        "[data-cta='blob-1']",
        {
          x: 120,
          y: -80,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      gsap.to(
        "[data-cta='blob-2']",
        {
          x: -150,
          y: 120,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      gsap.to(
        "[data-cta='blob-3']",
        {
          y: -120,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        py-56
      "
    >
      {/* Background */}

      <div
        data-cta="blob-1"
        className="
          absolute
          left-[-10%]
          top-[-10%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-violet-600/20
          blur-[180px]
        "
      />

      <div
        data-cta="blob-2"
        className="
          absolute
          right-[-10%]
          top-[10%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-cyan-500/20
          blur-[180px]
        "
      />

      <div
        data-cta="blob-3"
        className="
          absolute
          bottom-[-20%]
          left-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-pink-500/20
          blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <div
          data-cta="content"
          className="
    overflow-hidden
    rounded-[48px]
    border
    border-white/10
    bg-white/[0.04]
    px-10
    py-24
    text-center
    backdrop-blur-2xl
    md:px-20
  "
        >
          <p
            className="
      text-sm
      uppercase
      tracking-[0.35em]
      text-violet-400
    "
          >
            One Last Thing
          </p>

          <h2
            className="
      mx-auto
      mt-8
      max-w-6xl
      text-6xl
      font-black
      tracking-[-0.06em]
      md:text-8xl
    "
          >
            Stop Collecting
            <br />

            <span
              className="
        bg-gradient-to-r
        from-violet-400
        via-fuchsia-400
        to-cyan-400
        bg-clip-text
        text-transparent
      "
            >
              Inspiration
            </span>
          </h2>

          <h3
            className="
      mt-6
      text-4xl
      font-black
      text-zinc-300
      md:text-6xl
    "
          >
            Start Building With It.
          </h3>

          <p
            className="
      mx-auto
      mt-12
      max-w-3xl
      text-xl
      leading-relaxed
      text-zinc-400
    "
          >
            Every designer has a folder full of
            screenshots, bookmarks, Dribbble shots,
            Pinterest boards, and random websites
            they swear they'll revisit someday.

            <br />
            <br />

            VibeKit turns those ideas into something
            you can actually use.
          </p>

          <div
            className="
      mt-16
      flex
      flex-wrap
      justify-center
      gap-4
    "
          >
            <Link
              href="/create"
              className="
        rounded-2xl
        bg-gradient-to-r
        from-violet-500
        via-fuchsia-500
        to-cyan-500
        px-8
        py-4
        text-lg
        font-semibold
        text-white
        shadow-[0_0_40px_rgba(139,92,246,0.35)]
        transition-all
        hover:scale-[1.03]
      "
            >
              Upload A Screenshot
            </Link>

            <Link
              href="/tools/gradient"
              className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-8
        py-4
        text-lg
        transition-colors
        hover:bg-white/10
      "
            >
              Explore The Toolbox
            </Link>
          </div>

          <div
            className="
      mt-24
      grid
      gap-4
      md:grid-cols-3
    "
          >
            {[
              "Found a landing page you love?",
              "Saw a dashboard with great colors?",
              "Found a brand with the perfect vibe?",
            ].map((item) => (
              <div
                key={item}
                className="
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-6
          text-zinc-300
        "
              >
                {item}
              </div>
            ))}
          </div>

          <div
            className="
      mt-20
      border-t
      border-white/10
      pt-12
    "
          >
            <p
              className="
        text-2xl
        font-bold
        text-zinc-400
        md:text-4xl
      "
            >
              See something you love.
            </p>

            <p
              className="
        mt-4
        bg-gradient-to-r
        from-violet-400
        via-fuchsia-400
        to-cyan-400
        bg-clip-text
        text-5xl
        font-black
        text-transparent
        md:text-7xl
      "
            >
              Steal the vibe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}