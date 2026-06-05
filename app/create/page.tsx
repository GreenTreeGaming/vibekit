"use client";

import { useEffect, useRef, useState } from "react";

import { RecentVibes } from "@/components/recent-vibes";
import { UploadZone } from "@/components/upload-zone";
import { UploadPreview } from "@/components/upload-preview";
import { AnalysisLoader } from "@/components/analysis-loader";
import { ProjectResults } from "@/components/project-results";

import type { AIAnalysis } from "@/types/ai";

async function fileToBase64(
  file: File
) {
  return new Promise<string>(
    (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () =>
        resolve(
          reader.result as string
        );

      reader.onerror = reject;

      reader.readAsDataURL(file);
    }
  );
}

type Stage =
  | "upload"
  | "preview"
  | "analysis"
  | "generated";

export default function CreatePage() {
  const [stage, setStage] =
    useState<Stage>("upload");

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [palette, setPalette] =
    useState<string[]>([]);

  const [useAI, setUseAI] =
    useState(true);

  const [aiLocked, setAiLocked] =
    useState(false);

  const [analysis, setAnalysis] =
    useState<AIAnalysis | null>(
      null
    );

  const [aiRemaining, setAiRemaining] =
    useState<number>(5);

  const generationStarted =
    useRef(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "vibekit-ai-remaining"
      );

    if (saved) {
      setAiRemaining(Number(saved));
    }
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {stage === "upload" && (
        <>
          <RecentVibes />

          <UploadZone

            useAI={useAI}

            aiLocked={aiLocked}

            aiRemaining={aiRemaining}

            onUseAIChange={setUseAI}
            onUpload={(file, url) => {
              setImageFile(file);
              setImageUrl(url);
              setStage("preview");
            }}
          />
        </>
      )}

      {stage === "preview" &&
        imageUrl && (
          <UploadPreview
            imageUrl={imageUrl}
            onComplete={() => {
              setStage("analysis");
            }}
          />
        )}

      {stage === "analysis" && (
        <AnalysisLoader
          onComplete={async () => {
            if (generationStarted.current)
              return;

            generationStarted.current = true;

            if (!imageFile) return;

            try {
              const formData =
                new FormData();

              formData.append(
                "file",
                imageFile
              );

              const imageBase64 =
                useAI
                  ? await fileToBase64(
                    imageFile
                  )
                  : null;

              console.log(
                "🚀 GENERATION STARTED"
              );

              const palettePromise =
                fetch(
                  "/api/extract",
                  {
                    method: "POST",
                    body: formData,
                  }
                );

              const analysisPromise =
                useAI &&
                  imageBase64
                  ? fetch(
                    "/api/analyze",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify(
                        {
                          image:
                            imageBase64,
                        }
                      ),
                    }
                  )
                  : null;

              const paletteRes =
                await palettePromise;

              const analysisRes =
                analysisPromise
                  ? await analysisPromise
                  : null;

              // Palette

              if (!paletteRes.ok) {
                console.error(
                  await paletteRes.text()
                );
                return;
              }

              const paletteData =
                await paletteRes.json();

              setPalette(
                paletteData.colors
              );

              // AI Analysis

              if (
                useAI &&
                analysisRes
              ) {
                if (analysisRes.status === 429) {
                  setAiLocked(true);

                  alert(
                    "AI analysis limit reached for today. Fast Mode is still available."
                  );

                  setAnalysis(null);
                } else if (analysisRes.ok) {
                  const analysisData =
                    await analysisRes.json();

                  console.log(
                    "AI Analysis:",
                    analysisData
                  );

                  setAnalysis(
                    analysisData
                  );

                  const remaining =
                    analysisData.usage?.remaining ?? 0;

                  setAiRemaining(remaining);

                  setAiLocked(remaining <= 0);

                  localStorage.setItem(
                    "vibekit-ai-remaining",
                    String(remaining)
                  );
                } else {
                  console.error(
                    await analysisRes.text()
                  );

                  setAnalysis(null);
                }
              } else {
                setAnalysis(null);
              }

              setStage("generated");
            } catch (error) {
              console.error(
                "Generation failed:",
                error
              );
            }
          }}
        />
      )}

      {stage === "generated" &&
        imageUrl && (
          <ProjectResults
            imageUrl={imageUrl}
            palette={palette}
            analysis={analysis}
            onReset={() => {
              setImageFile(null);
              setImageUrl(null);
              setPalette([]);
              setAnalysis(null);

              generationStarted.current = false;

              setUseAI(true);

              setStage("upload");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        )}
    </main>
  );
}