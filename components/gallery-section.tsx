"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern SaaS",
    subtitle:
      "Clean product-focused UI with scalable design tokens and enterprise-grade accessibility.",
    gradient:
      "from-violet-500 via-indigo-500 to-cyan-500",
    colors: ["#8B5CF6", "#6366F1", "#06B6D4"],
    tags: [
      "Dashboard",
      "Design Tokens",
      "Space Grotesk",
      "Dark Mode",
    ],
  },

  {
    title: "Fintech",
    subtitle:
      "Trust-building interfaces optimized for dashboards and financial workflows.",
    gradient:
      "from-emerald-500 via-green-500 to-cyan-500",
    colors: ["#10B981", "#22C55E", "#06B6D4"],
    tags: [
      "Analytics",
      "Trust UI",
      "Data Dense",
      "Enterprise",
    ],
  },

  {
    title: "Luxury Ecommerce",
    subtitle:
      "Premium visual language with high-end branding and product storytelling.",
    gradient:
      "from-yellow-500 via-orange-500 to-rose-500",
    colors: ["#EAB308", "#F97316", "#FB7185"],
    tags: [
      "Luxury",
      "Editorial",
      "Shopping",
      "Premium",
    ],
  },

  {
    title: "Creator Platform",
    subtitle:
      "Bold creator-first experiences built for audience growth and engagement.",
    gradient:
      "from-pink-500 via-fuchsia-500 to-violet-500",
    colors: ["#EC4899", "#D946EF", "#8B5CF6"],
    tags: [
      "Creator",
      "Community",
      "Bold Brand",
      "Social",
    ],
  },

  {
    title: "AI Startup",
    subtitle:
      "Future-forward interfaces blending intelligence and automation.",
    gradient:
      "from-cyan-500 via-blue-500 to-indigo-500",
    colors: ["#06B6D4", "#3B82F6", "#6366F1"],
    tags: [
      "AI",
      "Automation",
      "Futuristic",
      "SaaS",
    ],
  },

  {
    title: "Portfolio",
    subtitle:
      "Minimal personal branding focused on typography and storytelling.",
    gradient:
      "from-zinc-500 via-zinc-300 to-white",
    colors: ["#71717A", "#D4D4D8", "#FFFFFF"],
    tags: [
      "Minimal",
      "Typography",
      "Personal",
      "Creative",
    ],
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Don't set up horizontal scroll on narrow viewports — use the mobile layout instead
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const track = sectionRef.current?.querySelector<HTMLElement>("[data-gallery='track']");
        if (!track) return;

        const cards = gsap.utils.toArray<HTMLElement>("[data-gallery='card']");

        const horizontalTween = gsap.to(track, {
          // Dynamic: scroll exactly as far as the track overflows the viewport
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            // Dynamic end so it works at any screen width
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true, // recalc after resize / font load
          },
        });

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left center",
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black md:h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_70%)]" />

      <div className="relative z-10 flex h-full flex-col justify-center">
        <div className="mb-8 px-12 pt-16 md:pt-0">
          <p className="mb-3 text-violet-400">Community Gallery</p>
          <h2 className="max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Thousands Of
            <br />
            Generated Vibes
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Explore themes generated from real screenshots.
          </p>
        </div>

        {/* Desktop: horizontal scroll track */}
        <div
          data-gallery="track"
          data-animate="track"
          className="hidden gap-8 pl-12 pb-16 md:flex"
        >
          {projects.map((project) => (
            <GalleryCard key={project.title} project={project} />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-8 px-6 pb-16 md:hidden">
          {projects.map((project) => (
            <GalleryCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  project,
}: {
  project: {
    title: string;
    gradient: string;
    subtitle: string;
    colors: string[];
    tags: string[];
  };
}) {
  return (
    <div data-gallery="card" className="w-full shrink-0 md:w-[580px]">
      <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className={`h-[180px] bg-gradient-to-br ${project.gradient}`} />
        <div className="p-8">
          <div className="mb-4 flex gap-2">
            {project.colors.map((color) => (
              <div
                key={color}
                className="h-6 w-6 rounded-full"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <h3 className="text-3xl font-bold">{project.title}</h3>
          <p className="mt-3 text-zinc-400">
            {project.subtitle}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs font-medium text-zinc-300"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}