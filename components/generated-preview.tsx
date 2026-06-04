"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Download,
  Sparkles,
} from "lucide-react";

interface GeneratedPreviewProps {
  onOpenProject?: () => void;
}

export function GeneratedPreview({
  onOpenProject,
}: GeneratedPreviewProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".generated-title", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".dashboard-preview", {
        opacity: 0,
        scale: 0.85,
        duration: 1.4,
        ease: "back.out(1.6)",
      });

      gsap.from(".ui-card", {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        delay: 0.5,
        duration: 0.8,
      });

      gsap.from(".export-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        delay: 1,
      });

      gsap.to(".generated-orb-1", {
        x: 150,
        y: -100,
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: "sine.inOut",
      });

      gsap.to(".generated-orb-2", {
        x: -150,
        y: 100,
        repeat: -1,
        yoyo: true,
        duration: 12,
        ease: "sine.inOut",
      });

      gsap.to(".generated-orb-3", {
        y: -120,
        repeat: -1,
        yoyo: true,
        duration: 14,
        ease: "sine.inOut",
      });

      gsap.to(".success-glow", {
        scale: 1.15,
        opacity: 0.8,
        repeat: -1,
        yoyo: true,
        duration: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-40"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="generated-orb-1 absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-violet-500/20 blur-[160px]" />

        <div className="generated-orb-2 absolute right-0 top-32 h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[160px]" />

        <div className="generated-orb-3 absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Heading */}

        <div className="mb-20 text-center">
          <div className="success-glow mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500">
            <Sparkles className="h-10 w-10" />
          </div>

          <p className="mb-4 uppercase tracking-[0.3em] text-violet-400">
            Design System Ready
          </p>

          <h1 className="generated-title text-6xl font-black tracking-tight md:text-8xl">
            Your Vibe Has
            <br />
            Been Captured
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Colors, typography, scales, tokens,
            exports and live previews are ready.
          </p>
        </div>

        {/* Dashboard */}

        <div className="dashboard-preview relative overflow-hidden rounded-[40px] border border-white/10 bg-white p-8 text-black shadow-[0_0_100px_rgba(139,92,246,0.15)]">
          
          {/* Top Bar */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                Generated Dashboard
              </h3>

              <p className="text-zinc-500">
                Powered by VibeKit
              </p>
            </div>

            <button className="rounded-xl bg-violet-500 px-4 py-2 text-white">
              Upgrade
            </button>
          </div>

          {/* Content */}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="ui-card rounded-3xl bg-violet-100 p-6">
              <div className="mb-4 h-4 w-24 rounded-full bg-violet-300" />
              <div className="h-28 rounded-2xl bg-violet-200" />
            </div>

            <div className="ui-card rounded-3xl bg-pink-100 p-6">
              <div className="mb-4 h-4 w-24 rounded-full bg-pink-300" />
              <div className="h-28 rounded-2xl bg-pink-200" />
            </div>

            <div className="ui-card rounded-3xl bg-cyan-100 p-6">
              <div className="mb-4 h-4 w-24 rounded-full bg-cyan-300" />
              <div className="h-28 rounded-2xl bg-cyan-200" />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="ui-card rounded-3xl bg-zinc-100 p-6">
              <div className="mb-4 h-4 w-32 rounded-full bg-zinc-300" />
              <div className="h-40 rounded-2xl bg-zinc-200" />
            </div>

            <div className="ui-card rounded-3xl bg-zinc-100 p-6">
              <div className="mb-4 h-4 w-28 rounded-full bg-zinc-300" />
              <div className="h-40 rounded-2xl bg-zinc-200" />
            </div>
          </div>
        </div>

        {/* Exports */}

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {[
            "Tailwind Config",
            "Design Tokens",
            "CSS Variables",
            "Dark Mode",
          ].map((item) => (
            <div
              key={item}
              className="
                ui-card
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                backdrop-blur-xl
              "
            >
              <p className="font-semibold">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenProject}
            className="
              export-btn
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-black
            "
          >
            Open Design System
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            className="
              export-btn
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-8
              py-4
              backdrop-blur-xl
            "
          >
            <Download className="h-5 w-5" />
            Export Tokens
          </button>
        </div>
      </div>
    </section>
  );
}