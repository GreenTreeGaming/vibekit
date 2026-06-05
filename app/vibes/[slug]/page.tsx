import gradients from "@/app/data/gradients.json";
import { notFound } from "next/navigation";

import { VibeHero } from "@/components/vibe/vibe-hero";
import { PaletteSection } from "@/components/vibe/palette-section";
import { ColorScaleSection } from "@/components/vibe/color-scale-section";
import { TokenSection } from "@/components/vibe/token-section";
import { ComponentPreviewSection } from "@/components/vibe/component-preview";
import { ExportSection } from "@/components/vibe/export-section";

import { generateScale } from "@/lib/generate-scale";

export default async function VibePage({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } =
        await params;

    const vibe = gradients.find(
        (g) =>
            g.name
                .toLowerCase()
                .replace(/\s+/g, "-") ===
            slug
    );

    if (!vibe) {
        notFound();
    }

    const primary =
  vibe.colors[0];

const secondary =
  vibe.colors[1] ??
  primary;

const accent =
  vibe.colors[2] ??
  secondary;

const primaryScale =
  generateScale(primary);

const secondaryScale =
  generateScale(secondary);

const accentScale =
  generateScale(accent);

    return (
        <main className="min-h-screen bg-black text-white">
            <VibeHero vibe={vibe} />

<PaletteSection
  primary={primaryScale}
  secondary={secondaryScale}
  accent={accentScale}
/>

<ColorScaleSection
  primary={primaryScale}
  secondary={secondaryScale}
  accent={accentScale}
/>

<TokenSection
  primary={primary}
  secondary={secondary}
  accent={accent}
/>

<ComponentPreviewSection
  primary={primary}
  secondary={secondary}
  accent={accent}
/>

<ExportSection
  primary={primary}
  secondary={secondary}
  accent={accent}
/>
        </main>
    );
}