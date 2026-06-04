import { Hero } from "@/components/hero";
import { ToolsSection } from "@/components/tools-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { TransformationSection } from "@/components/transformation-section";
import { BentoFeatures } from "@/components/bento-features";
import { GallerySection } from "@/components/gallery-section";
import { ExportShowcase } from "@/components/export-showcase";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />

      <ToolsSection />

      <HowItWorksSection />

      <TransformationSection />

      <BentoFeatures />

      <GallerySection />

      <ExportShowcase />

      <FAQSection />

      <CTASection />
    </main>
  );
}