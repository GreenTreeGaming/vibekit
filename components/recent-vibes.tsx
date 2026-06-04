"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const vibes = [
  {
    name: "Modern SaaS",
    gradient: "from-violet-500 via-indigo-500 to-cyan-500",
    dots: ["bg-violet-500", "bg-indigo-500", "bg-cyan-500"],
  },
  {
    name: "Fintech",
    gradient: "from-emerald-500 via-green-500 to-cyan-500",
    dots: ["bg-emerald-500", "bg-green-500", "bg-cyan-500"],
  },
  {
    name: "Luxury",
    gradient: "from-yellow-500 via-orange-500 to-rose-500",
    dots: ["bg-yellow-500", "bg-orange-500", "bg-rose-500"],
  },
  {
    name: "Creator",
    gradient: "from-pink-500 via-fuchsia-500 to-violet-500",
    dots: ["bg-pink-500", "bg-fuchsia-500", "bg-violet-500"],
  },
  {
    name: "AI Startup",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    dots: ["bg-cyan-500", "bg-blue-500", "bg-indigo-500"],
  },
];

export function RecentVibes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vibe-card", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.utils
        .toArray<HTMLElement>(".vibe-card")
        .forEach((card, index) => {
          gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

      gsap.to(".scroll-arrow", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });

      const move = (e: MouseEvent) => {
        const x =
          (e.clientX / window.innerWidth - 0.5) * 40;

        const y =
          (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".vibes-track", {
          x,
          y,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", move);

      return () => {
        window.removeEventListener("mousemove", move);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Inspiration
          </p>

          <h2 className="text-5xl font-black tracking-tight md:text-7xl">
            Recent Vibes
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Explore screenshots transformed into complete
            design systems.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Scroll
              </span>

              <svg
                className="scroll-arrow mt-2 h-4 w-4 text-zinc-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cards */}

        <div className="vibes-track flex justify-center gap-6 px-8">
          {vibes.map((vibe) => (
            <div
              key={vibe.name}
              className="
                vibe-card
                group
                relative
                h-[320px]
                w-[280px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
              "
            >
              {/* Gradient Preview */}

              <div
                className={`h-[180px] bg-gradient-to-br ${vibe.gradient}`}
              />

              {/* Glow */}

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              >
                <div className="absolute inset-0 bg-white/[0.03]" />
              </div>

              {/* Content */}

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {vibe.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Generated from a real screenshot.
                </p>

                <div className="mt-5 flex gap-2">
                  {vibe.dots.map((dot) => (
                    <div
                      key={dot}
                      className={`h-3.5 w-3.5 rounded-full ${dot} shadow-[0_0_12px_currentColor]`}
                    />
                  ))}
                </div>
              </div>

              {/* Hover Lift */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-[32px]
                  ring-1
                  ring-white/0
                  transition-all
                  duration-500
                  group-hover:ring-white/20
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}