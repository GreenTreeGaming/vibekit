"use client";

import { useState } from "react";

import { RecentVibes } from "@/components/recent-vibes";
import { UploadZone } from "@/components/upload-zone";
import { UploadPreview } from "@/components/upload-preview";
import { AnalysisLoader } from "@/components/analysis-loader";
import { ProjectResults } from "@/components/project-results";

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

  const [palette, setPalette] = useState<string[]>([]);
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {stage === "upload" && (
        <>
          <RecentVibes />

          <UploadZone
            onUpload={(file, url) => {
              setImageFile(file);
              setImageUrl(url);
              setStage("preview");
            }}
          />
        </>
      )}

      {stage === "preview" && imageUrl && (
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
            if (!imageFile) return;

            const formData = new FormData();

            formData.append(
              "file",
              imageFile
            );

            const res = await fetch(
              "/api/extract",
              {
                method: "POST",
                body: formData,
              }
            );

            if (!res.ok) {
              console.error(await res.text());
              return;
            }

            const data = await res.json();

            console.log(data);

            setPalette(data.colors);

            setStage("generated");
          }}
        />
      )}

      {stage === "generated" &&
        imageUrl && (
          <ProjectResults
            imageUrl={imageUrl}
            palette={palette}
            onReset={() => {
              setImageFile(null);
              setImageUrl(null);
              setPalette([]);
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