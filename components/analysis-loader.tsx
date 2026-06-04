"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Sparkles } from "lucide-react";

interface AnalysisLoaderProps {
  onComplete?: () => void;
}

const steps = [
  "Extracting Colors",
  "Generating Color Scales",
  "Analyzing Style Patterns",
  "Detecting Typography",
  "Building Design Tokens",
  "Generating UI Preview",
];

export function AnalysisLoader({
  onComplete,
}: AnalysisLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".analysis-card", {
        opacity: 0,
        scale: 0.95,
        y: 60,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(".progress-fill", {
        width: "100%",
        duration: 6,
        ease: "none",
      });

      gsap.to(".orb-1", {
        x: 100,
        y: -50,
        repeat: -1,
        yoyo: true,
        duration: 8,
        ease: "sine.inOut",
      });

      gsap.to(".orb-2", {
        x: -100,
        y: 50,
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: "sine.inOut",
      });

      gsap.to(".pulse-icon", {
        scale: 1.15,
        repeat: -1,
        yoyo: true,
        duration: 1,
      });

      gsap.from(".log-line", {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.5,
      });
    }, containerRef);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete?.();
          }, 1200);

          return prev;
        }

        return prev + 1;
      });
    }, 850);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-40"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="orb-1 absolute left-20 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[150px]" />

        <div className="orb-2 absolute bottom-20 right-20 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-8">
        {/* Heading */}

        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            AI Processing
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            Building Your
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Design System
            </span>
          </h2>

          <p className="mt-4 text-zinc-400">
            Reverse engineering visual identity.
          </p>
        </div>

        {/* Main Card */}

        <div className="analysis-card rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          
          {/* Progress */}

          <div className="mb-10">
            <div className="mb-3 flex justify-between text-sm text-zinc-400">
              <span>Analysis Progress</span>

              <span>
                {Math.round(
                  ((activeStep + 1) / steps.length) * 100
                )}
                %
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div className="progress-fill h-full w-0 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500" />
            </div>
          </div>

          {/* Steps */}

          <div className="space-y-4">
            {steps.map((step, index) => {
              const completed = index <= activeStep;

              return (
                <div
                  key={step}
                  className={`
                    flex items-center gap-4 rounded-2xl p-4 transition-all
                    ${
                      completed
                        ? "bg-white/5"
                        : "opacity-40"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-xl
                      ${
                        completed
                          ? "bg-violet-500"
                          : "bg-white/5"
                      }
                    `}
                  >
                    {completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>

                  <span className="font-medium">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Terminal */}

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/50 p-6 font-mono text-sm">
            <div className="mb-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="space-y-2 text-zinc-400">
              <p className="log-line">
                &gt; Loading screenshot...
              </p>

              <p className="log-line">
                &gt; Extracting dominant palette...
              </p>

              <p className="log-line">
                &gt; Detecting typography hierarchy...
              </p>

              <p className="log-line">
                &gt; Building Tailwind tokens...
              </p>

              <p className="log-line text-cyan-400">
                &gt; Ready for preview.
              </p>
            </div>
          </div>

          {/* Floating Status */}

          <div className="mt-10 flex items-center justify-center gap-3 text-violet-400">
            <Sparkles className="pulse-icon h-5 w-5" />

            <span>
              AI is constructing your design DNA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}