"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Upload,
  Sparkles,
  Palette,
  Download,
} from "lucide-react";

export function HowItWorksSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".workflow-step",
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.to(".workflow-orb", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".workflow-line",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-40"
    >
      {/* Background */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[1000px]
          w-[1000px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-violet-500/10
          via-fuchsia-500/10
          to-cyan-500/10
          blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <p
            className="
              mb-4
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            How It Works
          </p>

          <h2 className="text-7xl font-black">
            One Screenshot.
            <br />
            Complete Design System.
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              text-zinc-400
            "
          >
            Watch your design get
            transformed into production-ready
            tokens, palettes and exports.
          </p>
        </div>

        <div
          className="
            relative
            flex
            flex-col
            gap-16
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Step 1 */}

          <div className="workflow-step relative">
            <div
              className="
                absolute
                -top-10
                text-8xl
                font-black
                text-white/5
              "
            >
              01
            </div>

            <div
              className="
                workflow-orb
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-violet-500
                to-fuchsia-500
              "
            >
              <Upload className="h-10 w-10" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Upload
            </h3>

            <p className="mt-3 text-zinc-400">
              Drop any screenshot,
              dashboard, landing page,
              poster or app.
            </p>
          </div>

          <div
            className="
              workflow-line
              hidden
              h-[2px]
              flex-1
              origin-left
              bg-gradient-to-r
              from-violet-500
              to-fuchsia-500
              lg:block
            "
          />

          {/* Step 2 */}

          <div className="workflow-step relative">
            <div
              className="
                absolute
                -top-10
                text-8xl
                font-black
                text-white/5
              "
            >
              02
            </div>

            <div
              className="
                workflow-orb
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-fuchsia-500
                to-pink-500
              "
            >
              <Sparkles className="h-10 w-10" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Analyze
            </h3>

            <p className="mt-3 text-zinc-400">
              AI extracts colors,
              gradients and visual DNA.
            </p>
          </div>

          <div
            className="
              workflow-line
              hidden
              h-[2px]
              flex-1
              origin-left
              bg-gradient-to-r
              from-fuchsia-500
              to-cyan-500
              lg:block
            "
          />

          {/* Step 3 */}

          <div className="workflow-step relative">
            <div
              className="
                absolute
                -top-10
                text-8xl
                font-black
                text-white/5
              "
            >
              03
            </div>

            <div
              className="
                workflow-orb
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500
                to-blue-500
              "
            >
              <Palette className="h-10 w-10" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Generate
            </h3>

            <p className="mt-3 text-zinc-400">
              Build scales, palettes,
              previews and design tokens.
            </p>
          </div>

          <div
            className="
              workflow-line
              hidden
              h-[2px]
              flex-1
              origin-left
              bg-gradient-to-r
              from-cyan-500
              to-emerald-500
              lg:block
            "
          />

          {/* Step 4 */}

          <div className="workflow-step relative">
            <div
              className="
                absolute
                -top-10
                text-8xl
                font-black
                text-white/5
              "
            >
              04
            </div>

            <div
              className="
                workflow-orb
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-emerald-500
                to-green-500
              "
            >
              <Download className="h-10 w-10" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Export
            </h3>

            <p className="mt-3 text-zinc-400">
              Tailwind, CSS variables,
              JSON tokens and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}