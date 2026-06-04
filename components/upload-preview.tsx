"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UploadPreviewProps {
  imageUrl?: string;
  onComplete?: () => void;
}

export function UploadPreview({
  imageUrl,
  onComplete,
}: UploadPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro

      gsap.from(".preview-card", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      // Scanner

      gsap.to(".scanner-line", {
        y: "100%",
        duration: 2,
        repeat: -1,
        ease: "none",
      });

      // Glow Pulse

      gsap.to(".preview-glow", {
        opacity: 0.8,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating dots

      gsap.to(".particle", {
        y: -40,
        stagger: 0.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Transition

      const timeout = setTimeout(() => {
        onComplete?.();
      }, 3500);

      return () => clearTimeout(timeout);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-40"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[140px]" />

        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-8">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            Upload Complete
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            Analyzing Screenshot
          </h2>

          <p className="mt-4 text-zinc-400">
            Extracting colors, typography,
            structure and visual identity.
          </p>
        </div>

        {/* Card */}

        <div className="preview-card relative mx-auto max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          {/* Glow */}

          <div className="preview-glow absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />

          {/* Scanner */}

          <div
            className="
              scanner-line
              absolute
              left-0
              right-0
              top-0
              h-[3px]
              bg-gradient-to-r
              from-transparent
              via-cyan-400
              to-transparent
            "
          />

          {/* Image */}

          <div className="relative aspect-video overflow-hidden rounded-[32px] border border-white/10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded Screenshot"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500">
                <div className="rounded-2xl bg-black/40 px-6 py-3 backdrop-blur-xl">
                  Screenshot Preview
                </div>
              </div>
            )}
          </div>

          {/* Status */}

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                Processing Design DNA
              </p>

              <p className="text-zinc-400">
                Detecting visual patterns...
              </p>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="particle h-3 w-3 rounded-full bg-violet-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Steps */}

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <span>Extracting Colors</span>
          <span>•</span>
          <span>Detecting Typography</span>
          <span>•</span>
          <span>Building Tokens</span>
          <span>•</span>
          <span>Generating UI</span>
        </div>
      </div>
    </section>
  );
}