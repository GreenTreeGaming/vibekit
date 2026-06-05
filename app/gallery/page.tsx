"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Copy,
    ArrowRight,
} from "lucide-react";
import Color from "color";

import gradients from "@/app/data/gradients.json";

const colorFilters = [
    "All",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Pink",
    "White",
    "Black",
];

const colorMap = {
    All: "#FFFFFF",
    Red: "#EF4444",
    Orange: "#F97316",
    Yellow: "#EAB308",
    Green: "#22C55E",
    Blue: "#3B82F6",
    Purple: "#8B5CF6",
    Pink: "#EC4899",
    White: "#FFFFFF",
    Black: "#09090B",
};

const vibes = gradients.map((gradient, index) => {
    const scores: Record<string, number> = {
        Red: 0,
        Orange: 0,
        Yellow: 0,
        Green: 0,
        Blue: 0,
        Purple: 0,
        Pink: 0,
        White: 0,
        Black: 0,
    };

    for (const hex of gradient.colors) {
        const { h = 0, s = 0, l = 0 } =
            Color(hex).hsl().object();

        // Strong black/white detection
        if (l > 90) {
            scores.White += 5;
            continue;
        }

        if (l < 10) {
            scores.Black += 5;
            continue;
        }

        // Ignore low-saturation grays
        if (s < 15) {
            if (l > 50) {
                scores.White += 2;
            } else {
                scores.Black += 2;
            }
            continue;
        }

        // Weight by saturation
        const weight = s / 100;

        if (h < 15 || h >= 345)
            scores.Red += weight;

        else if (h < 45)
            scores.Orange += weight;

        else if (h < 70)
            scores.Yellow += weight;

        else if (h < 170)
            scores.Green += weight;

        else if (h < 250)
            scores.Blue += weight;

        else if (h < 290)
            scores.Purple += weight;

        else if (h < 345)
            scores.Pink += weight;
    }

    const dominantColor = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])[0][0];

    return {
        id: index + 1,
        name: gradient.name,
        category: "Gradient",
        dominantColor,
        colors: gradient.colors,
    };
});

export default function GalleryPage() {
    const [search, setSearch] =
        useState("");

    const [selectedColor, setSelectedColor] =
        useState("All");

    const [visibleCount, setVisibleCount] =
        useState(20);

    const router = useRouter();

    const loaderRef =
        useRef<HTMLDivElement>(null);

    const filteredVibes = vibes.filter(
        (vibe) => {
            const matchesSearch =
                vibe.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesColor =
                selectedColor === "All" ||
                vibe.dominantColor === selectedColor;

            return (
                matchesSearch &&
                matchesColor
            );
        }
    );

    const visibleVibes =
        filteredVibes.slice(
            0,
            visibleCount
        );

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (
                        entry.isIntersecting &&
                        visibleCount <
                        filteredVibes.length
                    ) {
                        setVisibleCount(
                            (prev) => prev + 20
                        );
                    }
                },
                {
                    threshold: 0.1,
                }
            );

        if (loaderRef.current) {
            observer.observe(
                loaderRef.current
            );
        }

        return () => {
            observer.disconnect();
        };
    }, [
        visibleCount,
        filteredVibes.length,
    ]);

    useEffect(() => {
        setVisibleCount(20);
    }, [search, selectedColor]);

    const [copiedId, setCopiedId] =
        useState<number | null>(null);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-7xl px-8 pt-32 pb-20">
                {/* Hero */}

                <div className="mb-16 text-center">
                    <h1 className="text-7xl font-black">
                        Explore Vibes
                    </h1>

                    <p className="mt-6 text-lg text-zinc-400">
                        Browse thousands of gradients,
                        palettes, and design systems.
                    </p>
                </div>

                {/* Search */}

                <div className="mx-auto mb-12 max-w-2xl">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
                        />

                        <input
                            placeholder="Search vibes..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                w-full
                rounded-3xl
                border
                border-white/10
                bg-white/5
                py-4
                pl-14
                pr-4
                outline-none
                transition
                focus:border-white/20
              "
                        />
                    </div>
                </div>

                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {colorFilters.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`
        flex items-center gap-2
        rounded-full
        px-4 py-2
        text-sm
        transition

        ${selectedColor === color
                                    ? "bg-white text-black"
                                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                                }
      `}
                        >
                            <div
                                className="h-4 w-4 rounded-md border border-black/10"
                                style={{
                                    background:
                                        color === "All"
                                            ? `conic-gradient(
            from 0deg,
            #ff0000,
            #ff7f00,
            #ffff00,
            #00ff00,
            #00ffff,
            #0000ff,
            #8b5cf6,
            #ff00ff,
            #ff0000
          )`
                                            : colorMap[
                                            color as keyof typeof colorMap
                                            ],
                                }}
                            />

                            {color}
                        </button>
                    ))}
                </div>

                {/* Gallery */}

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {visibleVibes.map((vibe) => (
                        <div
                            key={vibe.id}
                            className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                transition-all
                hover:-translate-y-1
                hover:border-white/20
              "
                        >
                            {/* Gradient */}

                            <div
                                className="relative h-64"
                                style={{
                                    background: `linear-gradient(
  135deg,
  ${vibe.colors.join(", ")}
)`,
                                }}
                            >
                                <div
                                    className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    gap-3
                    bg-black/60
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                                >
                                    <button
                                        onClick={() => {
                                            localStorage.setItem(
                                                "selectedGradient",
                                                JSON.stringify(vibe)
                                            );

                                            router.push("/tools/gradient");
                                        }}
                                        className="
    rounded-xl
    bg-white
    px-4
    py-2
    font-medium
    text-black
  "
                                    >
                                        Use This Vibe
                                    </button>

                                    <button
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(
                                                vibe.colors.join(", ")
                                            );

                                            setCopiedId(vibe.id);

                                            setTimeout(() => {
                                                setCopiedId(null);
                                            }, 2000);
                                        }}
                                        className={`
    rounded-xl
    border
    border-white/20
    px-3
    py-3
    transition

    ${copiedId === vibe.id
                                                ? "bg-emerald-500 text-white"
                                                : "bg-white/10"
                                            }
  `}
                                    >
                                        {copiedId === vibe.id ? (
                                            <span className="text-xs font-medium">
                                                Copied!
                                            </span>
                                        ) : (
                                            <Copy size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Content */}

                            <div className="p-6">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-xl font-bold">
                                        {vibe.name}
                                    </h3>

                                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                                        {vibe.category}
                                    </span>
                                </div>

                                <div className="mb-5 flex gap-2">
                                    {vibe.colors.map((color) => (
                                        <div
                                            key={`${vibe.id}-${color}`}
                                            className="h-10 w-10 rounded-full border border-white/10"
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        localStorage.setItem(
                                            "selectedGradient",
                                            JSON.stringify(vibe)
                                        );

                                        const slug =
                                            vibe.name
                                                .toLowerCase()
                                                .replace(/\s+/g, "-");

                                        router.push(`/vibes/${slug}`);
                                    }}
                                    className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    border
    border-white/10
    bg-white/5
    py-3
    transition
    hover:bg-white/10
  "
                                >
                                    View Design System
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount <
                    filteredVibes.length && (
                        <div
                            ref={loaderRef}
                            className="
      py-20
      text-center
    "
                        >
                            <div
                                className="
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        border-white/10
        bg-white/5
        px-6
        py-3
        text-zinc-400
      "
                            >
                                <div
                                    className="
          h-4
          w-4
          animate-spin
          rounded-full
          border-2
          border-zinc-600
          border-t-white
        "
                                />

                                Loading more vibes...
                            </div>
                        </div>
                    )}
            </div>
        </main>
    );
}