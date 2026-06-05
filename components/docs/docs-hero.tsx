"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function DocsHero() {
    const sectionRef =
        useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            gsap.fromTo(
                "[data-docs='pipeline-step']",
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: "[data-docs='card']",
                        start: "top 75%",
                    },
                }
            );

            tl.fromTo(
                "[data-docs='eyebrow']",
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                }
            )
                .fromTo(
                    "[data-docs='title']",
                    {
                        opacity: 0,
                        y: 120,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                    },
                    "-=0.2"
                )
                .fromTo(
                    "[data-docs='copy']",
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                    },
                    "-=0.7"
                )
                .fromTo(
                    "[data-docs='card']",
                    {
                        opacity: 0,
                        scale: 0.92,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "back.out(1.5)",
                    },
                    "-=0.5"
                );

            gsap.to(
                "[data-docs='blob-1']",
                {
                    x: 120,
                    y: -80,
                    duration: 14,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );

            gsap.to(
                "[data-docs='blob-2']",
                {
                    x: -150,
                    y: 100,
                    duration: 18,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );

            gsap.to(
                "[data-docs='gradient-text']",
                {
                    backgroundPosition:
                        "200% center",
                    duration: 6,
                    repeat: -1,
                    ease: "none",
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
        pt-40
        pb-32
      "
        >
            {/* Background Blobs */}

            <div
                data-docs="blob-1"
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
                data-docs="blob-2"
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

            <div className="relative z-10 mx-auto max-w-7xl px-8">
                <div className="text-center">
                    <h1
                        data-docs="title"
                        className="
              mx-auto
              max-w-6xl
              text-6xl
              font-black
              tracking-[-0.06em]
              md:text-8xl
              lg:text-9xl
            "
                    >
                        The Design System
                        <br />

                        <span
                            data-docs="gradient-text"
                            className="
                bg-gradient-to-r
                from-violet-400
                via-pink-400
                to-cyan-400
                bg-[length:200%_auto]
                bg-clip-text
                text-transparent
              "
                        >
                            Behind VibeKit
                        </span>
                    </h1>

                    <p
                        data-docs="copy"
                        className="
              mx-auto
              mt-10
              max-w-4xl
              text-xl
              leading-relaxed
              text-zinc-400
            "
                    >
                        VibeKit started with a
                        simple idea:
                        designers rarely want
                        random colors.
                        They want to understand
                        why a design feels good,
                        how its colors work
                        together,
                        and how to recreate that
                        feeling in their own
                        products.
                    </p>

                    <p
                        data-docs="copy"
                        className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-relaxed
              text-zinc-500
            "
                    >
                        Instead of manually
                        sampling colors,
                        building scales,
                        checking accessibility,
                        and creating exports,
                        VibeKit turns visual
                        inspiration into a
                        complete design system
                        in seconds.
                    </p>
                </div>

                <div
                    data-docs="card"
                    className="
    mx-auto
    mt-28
    max-w-6xl
  "
                >
                    <div
                        className="
      relative
      overflow-hidden
      rounded-[40px]
      border
      border-white/10
      bg-white/[0.03]
      p-10
      backdrop-blur-xl
    "
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />

                        <div className="relative z-10">
                            <p
                                className="
          text-center
          text-sm
          uppercase
          tracking-[0.3em]
          text-zinc-500
        "
                            >
                                What Happens Inside VibeKit
                            </p>

                            <div
                                className="
          mt-14
          flex
          flex-col
          items-center
          gap-8
          lg:flex-row
          lg:justify-center
        "
                            >
                                {/* Screenshot */}

                                <div
                                    className="
            w-full
            max-w-[260px]
            rounded-3xl
            border
            border-white/10
            bg-black/30
            p-6
          "
                                >
                                    <div
                                        className="
              h-40
              rounded-2xl
              bg-gradient-to-br
              from-violet-500
              via-fuchsia-500
              to-cyan-500
            "
                                    />

                                    <p className="mt-4 text-center text-zinc-400">
                                        Screenshot
                                    </p>
                                </div>

                                {/* Arrow */}

                                <div
                                    className="
            text-5xl
            font-black
            text-zinc-700
          "
                                >
                                    →
                                </div>

                                {/* Palette */}

                                <div
                                    className="
            w-full
            max-w-[260px]
            rounded-3xl
            border
            border-white/10
            bg-black/30
            p-6
          "
                                >
                                    <div className="flex gap-2">
                                        {[
                                            "#8B5CF6",
                                            "#EC4899",
                                            "#06B6D4",
                                            "#10B981",
                                        ].map((color) => (
                                            <div
                                                key={color}
                                                className="
                  h-16
                  flex-1
                  rounded-xl
                "
                                                style={{
                                                    backgroundColor:
                                                        color,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <p className="mt-4 text-center text-zinc-400">
                                        Palette
                                    </p>
                                </div>

                                {/* Arrow */}

                                <div
                                    className="
            text-5xl
            font-black
            text-zinc-700
          "
                                >
                                    →
                                </div>

                                {/* System */}

                                <div
                                    className="
            w-full
            max-w-[260px]
            rounded-3xl
            border
            border-white/10
            bg-black/30
            p-6
          "
                                >
                                    <div className="space-y-2">
                                        <div className="h-3 rounded bg-violet-500" />
                                        <div className="h-3 rounded bg-violet-400" />
                                        <div className="h-3 rounded bg-violet-300" />
                                        <div className="h-3 rounded bg-violet-200" />
                                    </div>

                                    <p className="mt-4 text-center text-zinc-400">
                                        Design System
                                    </p>
                                </div>
                            </div>

                            <p
                                className="
          mx-auto
          mt-12
          max-w-3xl
          text-center
          text-lg
          text-zinc-400
        "
                            >
                                Upload something that inspires you.
                                VibeKit analyzes it, extracts its visual language,
                                and turns it into something you can actually build with.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}