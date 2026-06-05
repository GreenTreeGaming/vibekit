"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DocsShowcase() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(
          "[data-showcase]"
        )
        .forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40"
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <p
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-violet-400
            "
          >
            Generated Themes
          </p>

          <h2
            className="
              mt-6
              text-5xl
              font-black
              md:text-7xl
            "
          >
            One Screenshot.
            <br />
            Infinite Directions.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-zinc-400
            "
          >
            The same generation engine
            can produce a fintech dashboard,
            a luxury storefront,
            a mobile app,
            or a creative portfolio.
          </p>
        </div>

        {/* SaaS */}

        <div
          data-showcase
          className="
            mt-28
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-12">
              <p className="text-zinc-500">
                Generated From
              </p>

              <p className="mt-2 text-2xl font-bold">
                Modern SaaS Inspiration
              </p>

              <h3 className="mt-8 text-5xl font-black">
                Fintech Dashboard
              </h3>

              <p className="mt-6 text-lg text-zinc-400">
                Clean layouts,
                structured hierarchy,
                accessible colors,
                and professional UI patterns.
              </p>
            </div>

            <div className="p-10">
              <div className="rounded-[32px] border border-white/10 bg-black/30 p-6">
                <div className="grid grid-cols-[90px_1fr] gap-4">
                  <div className="rounded-2xl bg-white/10" />

                  <div>
                    <div className="h-16 rounded-2xl bg-violet-500/20" />

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="h-28 rounded-2xl bg-white/10" />
                      <div className="h-28 rounded-2xl bg-white/10" />
                      <div className="h-28 rounded-2xl bg-white/10" />
                    </div>

                    <div className="mt-4 h-48 rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-showcase
          className="
            mt-10
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <div className="grid lg:grid-cols-2">
            <div className="order-2 p-10 lg:order-1">
              <div className="rounded-[32px] border border-white/10 bg-black/30 p-6">
                <div className="h-56 rounded-3xl bg-gradient-to-r from-amber-300/30 to-orange-500/30" />

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="h-40 rounded-2xl bg-white/10" />
                  <div className="h-40 rounded-2xl bg-white/10" />
                  <div className="h-40 rounded-2xl bg-white/10" />
                </div>
              </div>
            </div>

            <div className="order-1 p-12 lg:order-2">
              <p className="text-zinc-500">
                Generated From
              </p>

              <p className="mt-2 text-2xl font-bold">
                Luxury Ecommerce Inspiration
              </p>

              <h3 className="mt-8 text-5xl font-black">
                Premium Storefront
              </h3>

              <p className="mt-6 text-lg text-zinc-400">
                Elegant color palettes,
                product-focused layouts,
                premium typography,
                and refined visual hierarchy.
              </p>
            </div>
          </div>
        </div>

        <div
          data-showcase
          className="
            mt-10
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-12">
              <p className="text-zinc-500">
                Generated From
              </p>

              <p className="mt-2 text-2xl font-bold">
                Mobile Product Inspiration
              </p>

              <h3 className="mt-8 text-5xl font-black">
                Mobile Banking App
              </h3>

              <p className="mt-6 text-lg text-zinc-400">
                Touch-friendly layouts,
                clear navigation,
                strong contrast,
                and scalable design systems.
              </p>
            </div>

            <div className="flex items-center justify-center p-12">
              <div className="w-[260px] rounded-[40px] border border-white/10 bg-black/30 p-4">
                <div className="h-12 rounded-xl bg-violet-500" />

                <div className="mt-4 space-y-3">
                  <div className="h-24 rounded-xl bg-white/10" />
                  <div className="h-24 rounded-xl bg-white/10" />
                  <div className="h-24 rounded-xl bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-showcase
          className="
            mt-10
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <div className="grid lg:grid-cols-2">
            <div className="order-2 p-10 lg:order-1">
              <div className="rounded-[32px] border border-white/10 bg-black/30 p-8">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-2xl bg-white/10" />
                  <div className="h-32 rounded-2xl bg-white/10" />
                  <div className="h-32 rounded-2xl bg-white/10" />
                  <div className="h-32 rounded-2xl bg-white/10" />
                </div>
              </div>
            </div>

            <div className="order-1 p-12 lg:order-2">
              <p className="text-zinc-500">
                Generated From
              </p>

              <p className="mt-2 text-2xl font-bold">
                Creative Design Inspiration
              </p>

              <h3 className="mt-8 text-5xl font-black">
                Portfolio Experience
              </h3>

              <p className="mt-6 text-lg text-zinc-400">
                Bold gradients,
                expressive layouts,
                visual storytelling,
                and memorable branding systems.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-3xl font-bold text-zinc-300 md:text-5xl">
            Every screenshot feels different.
          </p>

          <p
            className="
              mt-6
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
            VibeKit adapts to all of them.
          </p>
        </div>
      </div>
    </section>
  );
}