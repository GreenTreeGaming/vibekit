"use client";

import { useEffect, useMemo } from "react";
import gsap from "gsap";

interface MeshPreviewProps {
  colors: string[];
}

export function MeshPreview({
  colors,
}: MeshPreviewProps) {
  const blobs = useMemo(() => {
    return colors.map(
      (_, index) => ({
        id: `mesh-${index}`,

        x:
          10 +
          Math.random() * 80,

        y:
          10 +
          Math.random() * 80,

        size:
          550 +
          Math.random() * 250,
      })
    );
  }, [colors]);

  useEffect(() => {
    blobs.forEach(
      (blob) => {
        gsap.to(
          `.${blob.id}`,
          {
            x: gsap.utils.random(
              -180,
              180
            ),

            y: gsap.utils.random(
              -180,
              180
            ),

            duration:
              gsap.utils.random(
                10,
                20
              ),

            repeat: -1,

            yoyo: true,

            ease:
              "sine.inOut",
          }
        );
      }
    );

    return () => {
      gsap.killTweensOf(
        ".mesh-blob"
      );
    };
  }, [blobs]);

  return (
    <div
      className="
        relative
        h-[500px]
        overflow-hidden
        rounded-[32px]
        bg-black
      "
    >
      {/* Ambient Background */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background: `radial-gradient(
            circle at center,
            ${
              colors[0] ??
              "#8B5CF6"
            }20,
            #000000
          )`,
        }}
      />

      {/* Mesh Blobs */}

      {blobs.map(
        (blob, index) => (
          <div
            key={blob.id}
            className={`
              mesh-blob
              ${blob.id}
              absolute
              rounded-full
              opacity-80
              mix-blend-screen
            `}
            style={{
              backgroundColor:
                colors[index],

              width:
                blob.size,

              height:
                blob.size,

              left: `${blob.x}%`,

              top: `${blob.y}%`,

              filter:
                "blur(160px)",

              transform:
                "translate(-50%, -50%)",
            }}
          />
        )
      )}

      {/* Extra Glow Layer */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/5
          via-transparent
          to-transparent
        "
      />
    </div>
  );
}