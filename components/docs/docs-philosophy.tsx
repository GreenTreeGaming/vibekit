"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
    ScrollTrigger
);

export function DocsPhilosophy() {
    const sectionRef =
        useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                "[data-philosophy='heading']",
                {
                    opacity: 0,
                    y: 80,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger:
                            sectionRef.current,
                        start: "top 70%",
                    },
                }
            );

            gsap.fromTo(
                "[data-philosophy='quote']",
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: "[data-philosophy='quote']",
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                "[data-philosophy='line']",
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger:
                            sectionRef.current,
                        start: "top 65%",
                    },
                }
            );

            gsap.fromTo(
                "[data-philosophy='card']",
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger:
                            sectionRef.current,
                        start: "top 55%",
                    },
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
        py-40
      "
        >
            <div className="mx-auto max-w-7xl px-8">
                <div className="text-center">
                    <p
                        data-philosophy="heading"
                        className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
                    >
                        Why VibeKit Exists
                    </p>

                    <h2
                        data-philosophy="heading"
                        className="
              mt-6
              text-5xl
              font-black
              md:text-7xl
            "
                    >
                        Every Design Starts
                        <br />
                        With a Feeling
                    </h2>

                    <div className="mx-auto mt-12 max-w-4xl space-y-8 text-xl leading-relaxed text-zinc-400">
                        <p data-philosophy="line">
                            Most design tools start
                            with colors.
                        </p>

                        <p data-philosophy="line">
                            Real designers usually
                            start with inspiration.
                        </p>

                        <p data-philosophy="line">
                            A landing page.
                            A dashboard.
                            A mobile app.
                            A poster.
                        </p>

                        <p data-philosophy="line">
                            Something catches your
                            attention and you think:
                        </p>

                        <p
                            data-philosophy="line"
                            className="
                text-3xl
                font-bold
                text-white
              "
                        >
                            "I want my project to
                            feel like that."
                        </p>

                        <p data-philosophy="line">
                            VibeKit was built to
                            bridge the gap between
                            inspiration and
                            implementation.
                        </p>
                    </div>
                </div>

                <div className="mt-40">
                    <div
                        data-philosophy="quote"
                        className="
      mx-auto
      max-w-5xl
      text-center
    "
                    >
                        <p
                            className="
        text-4xl
        font-black
        leading-tight
        text-zinc-700
        md:text-6xl
      "
                        >
                            Most tools give you
                        </p>

                        <p
                            className="
        mt-6
        text-6xl
        font-black
        tracking-[-0.05em]
        text-white
        md:text-8xl
      "
                        >
                            Colors.
                        </p>

                        <p
                            className="
        mt-20
        text-4xl
        font-black
        leading-tight
        text-zinc-700
        md:text-6xl
      "
                        >
                            VibeKit gives you
                        </p>

                        <p
                            className="
        mt-6
        bg-gradient-to-r
        from-violet-400
        via-fuchsia-400
        to-cyan-400
        bg-clip-text
        text-6xl
        font-black
        tracking-[-0.05em]
        text-transparent
        md:text-8xl
      "
                        >
                            Context.
                        </p>
                    </div>

                    <div
                        className="
      mx-auto
      mt-32
      max-w-6xl
      rounded-[40px]
      border
      border-white/10
      bg-white/[0.03]
      p-10
      backdrop-blur-xl
    "
                    >
                        <div className="grid gap-10 lg:grid-cols-2">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                    Traditional Workflow
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Find inspiration",
                                        "Screenshot colors",
                                        "Open color picker",
                                        "Build scales manually",
                                        "Check accessibility",
                                        "Create exports",
                                    ].map((step) => (
                                        <div
                                            key={step}
                                            className="
                rounded-2xl
                border
                border-white/5
                bg-black/20
                p-4
                text-zinc-400
              "
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
                                    VibeKit Workflow
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "Drop screenshot",
                                        "Generate design system",
                                    ].map((step) => (
                                        <div
                                            key={step}
                                            className="
                rounded-2xl
                border
                border-violet-500/20
                bg-violet-500/10
                p-4
                font-medium
              "
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}