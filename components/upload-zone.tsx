"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Upload,
  Link2,
  ImageIcon,
  Sparkles,
} from "lucide-react";

interface UploadZoneProps {
  onUpload: (
    file: File,
    url: string
  ) => void;

  aiLocked: boolean;

  aiRemaining: number;

  useAI: boolean;

  onUseAIChange: (
    value: boolean
  ) => void;
}

export function UploadZone({
  onUpload,
  useAI,
  aiLocked,
  aiRemaining,
  onUseAIChange,
}: UploadZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const toggleRef =
    useRef<HTMLDivElement>(null);

  const indicatorRef =
    useRef<HTMLDivElement>(null);

  const [loadingStep, setLoadingStep] =
    useState("Preparing browser...");

  const handlePasteImage = async () => {
    try {
      const items =
        await navigator.clipboard.read();

      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob =
              await item.getType(type);

            const file = new File(
              [blob],
              "clipboard-image.png",
              { type }
            );

            const url =
              URL.createObjectURL(file);

            onUpload(file, url);

            return;
          }
        }
      }

      alert("No image found in clipboard.");
    } catch {
      alert(
        "Clipboard access denied. Try pressing Ctrl+V / Cmd+V."
      );
    }
  };

  const [showUrlInput, setShowUrlInput] =
    useState(false);

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      x: useAI ? "100%" : "0%",
      duration: 0.45,
      ease: "power3.out",
    });
  }, [useAI]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance

      gsap.from(".upload-zone", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Floating blobs

      gsap.to(".blob-1", {
        x: 120,
        y: -80,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-2", {
        x: -100,
        y: 80,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-3", {
        y: -100,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Border pulse

      gsap.to(".upload-border", {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Spotlight

      const move = (e: MouseEvent) => {
        gsap.to(".spotlight", {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });

        const x =
          (e.clientX / window.innerWidth - 0.5) * 15;

        const y =
          (e.clientY / window.innerHeight - 0.5) * 15;

        gsap.to(".upload-zone", {
          rotateY: x,
          rotateX: -y,
          transformPerspective: 1000,
          transformOrigin: "center",
          duration: 1,
        });
      };

      const paste = (e: ClipboardEvent) => {
        const file =
          e.clipboardData?.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/"))
          return;

        const url =
          URL.createObjectURL(file);

        onUpload(file, url);
      };

      window.addEventListener("paste", paste);
      window.addEventListener("mousemove", move);

      return () => {
        window.removeEventListener(
          "mousemove",
          move
        );

        window.removeEventListener(
          "paste",
          paste
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-40"
    >
      {/* Spotlight */}

      <div
        className="
          spotlight
          pointer-events-none
          fixed
          left-0
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-[140px]
        "
      />

      {/* Background Blobs */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="blob-1 absolute left-20 top-20 h-[450px] w-[450px] rounded-full bg-violet-500/15 blur-[140px]" />

        <div className="blob-2 absolute right-20 top-32 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[140px]" />

        <div className="blob-3 absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-pink-500/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8">
        {/* Heading */}

        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Extract
          </p>

          <h2 className="text-6xl font-black tracking-tight md:text-8xl">
            Upload A
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Vibe
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Drop a screenshot and VibeKit will
            generate a complete design system,
            tokens, typography, dark mode, and
            production-ready exports.
          </p>

          <div className="mt-12 flex justify-center">
            <div
              ref={toggleRef}
              className="
      relative
      w-full
      max-w-2xl
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-black/20
      p-2
      backdrop-blur-2xl
    "
            >
              {/* Sliding Background */}

              <div
                ref={indicatorRef}
                className={`
    absolute
    left-2
    top-2
    h-[calc(100%-16px)]
    w-[calc(50%-8px)]
    rounded-[24px]
    overflow-hidden
    shadow-[0_10px_50px_rgba(255,255,255,0.08)]

    ${useAI
                    ? `
        bg-gradient-to-br
        from-violet-500
        via-fuchsia-500
        to-indigo-600
      `
                    : `
        bg-white
      `
                  }
  `}
              >
                {useAI && !aiLocked && (
                  <>
                    <div
                      className="
          absolute
          inset-0
          bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.18)_50%,transparent_80%)]
          animate-[shimmer_3s_linear_infinite]
        "
                    />

                    <div
                      className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/10
          to-white/5
        "
                    />
                  </>
                )}
              </div>

              <div className="relative z-10 grid grid-cols-2">
                <button
                  onClick={() =>
                    onUseAIChange(false)
                  }
                  className="
          px-8
          py-6
          text-center
          transition-colors
        "
                >
                  <div
                    className={`text-lg font-bold transition-colors ${!useAI
                      ? "text-black"
                      : "text-zinc-400"
                      }`}
                  >
                    Fast Mode
                  </div>

                  <div
                    className={`mt-1 text-sm ${!useAI
                      ? "text-zinc-600"
                      : "text-zinc-500"
                      }`}
                  >
                    Palette extraction only
                  </div>
                </button>

                <button
                  disabled={aiLocked}
                  onClick={() =>
                    !aiLocked &&
                    onUseAIChange(true)
                  }
                  className={`
    px-8
    py-6
    text-center
    transition-colors

    ${aiLocked
                      ? "cursor-not-allowed opacity-40"
                      : ""
                    }
  `}
                >
                  <div
                    className={`text-lg font-bold transition-colors ${useAI
                      ? "text-white"
                      : "text-zinc-400"
                      }`}
                  >
                    AI Mode
                  </div>

                  <div
                    className={`mt-1 text-sm ${useAI
                      ? "text-white/75"
                      : "text-zinc-500"
                      }`}
                  >
                    Design DNA, typography &
                    style analysis
                  </div>
                </button>
              </div>
            </div>
          </div>

          {useAI && (
            <div className="mt-5 flex justify-center">
              <div
                className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-violet-500/20
    bg-gradient-to-r
    from-violet-500/10
    via-fuchsia-500/10
    to-indigo-500/10
    px-5
    py-2.5
    text-sm
    font-medium
    text-white
    backdrop-blur-xl
    shadow-[0_0_40px_rgba(139,92,246,0.15)]
  "
              >
                <Sparkles className="h-4 w-4 text-violet-300" />

                AI Design Analysis Included

                <span className="text-white/30">
                  •
                </span>

                <span className="text-violet-200">

                  {aiRemaining} remaining today

                </span>

                <span className="text-violet-200">
                  +2–5s
                </span>
              </div>
            </div>
          )}

          {aiLocked && (
            <div className="mt-5 flex justify-center">
              <div
                className="
        rounded-full
        border
        border-red-500/20
        bg-red-500/10
        px-5
        py-2.5
        text-sm
        font-medium
        text-red-300
      "
              >
                AI limit reached today.
                Fast Mode is still available.
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            if (file.size > 20 * 1024 * 1024) {
              alert("Max file size is 20MB");
              return;
            }

            const url = URL.createObjectURL(file);

            onUpload(file, url);
          }}
        />

        {/* Upload Surface */}

        <div
          className="
            upload-zone
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            p-20
            text-center
            backdrop-blur-2xl
          "
        >
          {/* Animated Border */}

          <div
            className="
              upload-border
              absolute
              inset-0
              rounded-[40px]
              border
              border-violet-400/30
            "
          />

          {/* Glow */}

          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />

          <div className="relative z-10">
            <h3 className="text-4xl font-bold">
              Drop Your Screenshot
            </h3>

            <p className="mt-4 text-zinc-400">
              Website • Dashboard • App • Landing Page
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Upload, click Paste Image, or press Cmd+V.
            </p>

            {/* Action Buttons */}

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
    flex
    items-center
    gap-3
    rounded-2xl
    bg-white
    px-6
    py-4
    font-semibold
    text-black
    transition
    hover:scale-105
  "
              >
                <Upload className="h-5 w-5" />
                Upload Image
              </button>

              <button
                onClick={handlePasteImage}
                className="
      flex
      items-center
      gap-3
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-6
      py-4
      backdrop-blur-xl
      transition
      hover:bg-white/10
    "
              >
                <ImageIcon className="h-5 w-5" />
                Paste Image
              </button>

              <button
                onClick={() => {
                  setShowUrlInput(true);

                  setTimeout(() => {
                    document
                      .getElementById("url-input")
                      ?.focus();
                  }, 0);
                }}
                className="
      flex
      items-center
      gap-3
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-6
      py-4
      backdrop-blur-xl
      transition
      hover:bg-white/10
    "
              >
                <Link2 className="h-5 w-5" />

                Analyze Website
              </button>
            </div>



            {showUrlInput && (

              <div className="mx-auto mt-8 flex max-w-xl gap-3">

                <input

                  id="url-input"

                  value={url}

                  onChange={(e) =>

                    setUrl(e.target.value)

                  }

                  onKeyDown={(e) => {

                    if (e.key === "Enter") {

                      console.log(url);

                    }

                  }}

                  placeholder="https://stripe.com"

                  className="

        flex-1

        rounded-2xl

        border

        border-white/10

        bg-white/5

        px-4

        py-3

      "

                />

                <button
                  disabled={loading || !url}
                  onClick={async () => {
                    setLoading(true);

                    setLoadingStep(
                      "Launching browser..."
                    );

                    setTimeout(() => {
                      setLoadingStep(
                        "Loading website..."
                      );
                    }, 800);

                    setTimeout(() => {
                      setLoadingStep(
                        "Triggering animations..."
                      );
                    }, 2000);

                    setTimeout(() => {
                      setLoadingStep(
                        "Capturing screenshot..."
                      );
                    }, 3500);

                    setTimeout(() => {
                      setLoadingStep(
                        "Extracting colors..."
                      );
                    }, 5000);

                    try {
                      setLoading(true);

                      setLoadingStep(
                        "Launching browser..."
                      );

                      setTimeout(() => {
                        setLoadingStep(
                          "Loading website..."
                        );
                      }, 800);

                      setTimeout(() => {
                        setLoadingStep(
                          "Triggering animations..."
                        );
                      }, 2000);

                      setTimeout(() => {
                        setLoadingStep(
                          "Capturing screenshot..."
                        );
                      }, 3500);

                      setTimeout(() => {
                        setLoadingStep(
                          "Extracting colors..."
                        );
                      }, 5000);

                      const response = await fetch(
                        "/api/screenshot",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type":
                              "application/json",
                          },
                          body: JSON.stringify({
                            url,
                          }),
                        }
                      );

                      const blob =
                        await response.blob();

                      const file = new File(
                        [blob],
                        "website.png",
                        {
                          type: "image/png",
                        }
                      );

                      const imageUrl =
                        URL.createObjectURL(blob);

                      onUpload(file, imageUrl);
                    } catch (err) {
                      console.error(err);

                      alert(
                        "Failed to analyze website."
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="
    rounded-2xl
    bg-gradient-to-r
    from-violet-500
    via-fuchsia-500
    to-cyan-500
    px-6
    py-3
    font-semibold
    text-white
    shadow-lg
    shadow-violet-500/20
    transition-all
    hover:scale-105
    hover:shadow-violet-500/40
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div
                        className="
          h-4
          w-4
          animate-spin
          rounded-full
          border-2
          border-white/30
          border-t-white
        "
                      />
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Website"
                  )}
                </button>

              </div>

            )}

            {loading && (

              <div

                className="

      mx-auto

      mt-6

      max-w-xl

      rounded-3xl

      border

      border-violet-500/20

      bg-white/5

      p-5

      backdrop-blur-xl

    "

              >

                <div className="flex items-center justify-between">

                  <p className="font-medium">

                    {loadingStep}

                  </p>

                  <Sparkles

                    className="

          h-4

          w-4

          text-violet-400

          animate-pulse

        "

                  />

                </div>

                <div

                  className="

        mt-4

        h-2

        overflow-hidden

        rounded-full

        bg-white/10

      "

                >

                  <div

                    className="

          h-full

          w-full

          animate-pulse

          rounded-full

          bg-gradient-to-r

          from-violet-500

          via-fuchsia-500

          to-cyan-500

        "

                  />

                </div>

              </div>

            )}

            {/* Footer */}

            <div className="mt-12 flex flex-wrap justify-center gap-3 text-xs text-zinc-500">
              <span>PNG</span>
              <span>•</span>
              <span>JPG</span>
              <span>•</span>
              <span>WEBP</span>
              <span>•</span>
              <span>Up to 20MB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}