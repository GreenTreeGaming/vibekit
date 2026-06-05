import { DocsHero } from "@/components/docs/docs-hero";
import { DocsPhilosophy } from "@/components/docs/docs-philosophy";
import { DocsTools } from "@/components/docs/docs-tools";
import { DocsShowcase } from "@/components/docs/docs-showcase";
import { DocsOutputs } from "@/components/docs/docs-outputs";
import { DocsPipeline } from "@/components/docs/docs-pipeline";
import { DocsRoadmap } from "@/components/docs/docs-roadmap";
import { DocsCTA } from "@/components/docs/docs-cta";

export default function DocsPage() {
  return (
    <>
      <DocsHero />
      <DocsPhilosophy />
      <DocsTools />
      <DocsShowcase />
      <DocsOutputs />
      <DocsPipeline />
      <DocsRoadmap />
      <DocsCTA />
    </>
  );
}