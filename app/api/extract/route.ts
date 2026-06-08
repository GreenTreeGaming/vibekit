import { NextResponse } from "next/server";
import sharp from "sharp";
import Color from "color";

interface Candidate {
  hex: string;
  count: number;
  saturation: number;
  lightness: number;
  score: number;
}

function colorDistance(
  a: string,
  b: string
) {
  const c1 = Color(a);
  const c2 = Color(b);

  return Math.sqrt(
    Math.pow(c1.red() - c2.red(), 2) +
    Math.pow(
      c1.green() - c2.green(),
      2
    ) +
    Math.pow(
      c1.blue() - c2.blue(),
      2
    )
  );
}

function firstDistinct(
  colors: Candidate[],
  existing: string[],
  minDistance = 60
) {
  return colors.find((c) =>
    existing.every(
      (e) =>
        colorDistance(c.hex, e) >
        minDistance
    )
  );
}

export async function POST(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const file = formData.get(
      "file"
    ) as File | null;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    try {
      await sharp(buffer).metadata();
    } catch {
      return NextResponse.json(
        {
          error:
            "Uploaded file is not a valid image",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      info,
    } = await sharp(buffer)
      .resize({
        width: 600,
        withoutEnlargement: true,
      })
      .raw()
      .ensureAlpha()
      .toBuffer({
        resolveWithObject: true,
      });

    const colorMap =
      new Map<string, number>();

    for (
      let i = 0;
      i < data.length;
      i += info.channels
    ) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 128) continue;

      const qr =
        Math.round(r / 12) * 12;

      const qg =
        Math.round(g / 12) * 12;

      const qb =
        Math.round(b / 12) * 12;

      const hex = Color({
        r: qr,
        g: qg,
        b: qb,
      }).hex();

      colorMap.set(
        hex,
        (colorMap.get(hex) ?? 0) + 1
      );
    }

    const candidates: Candidate[] =
      [...colorMap.entries()]
        .map(
          ([hex, count]) => {
            const color =
              Color(hex);

            const saturation =
              color.saturationl();

            const lightness =
              color.lightness();

            const score =
              count *
              (1 + saturation / 35);

            return {
              hex,
              count,
              saturation,
              lightness,
              score,
            };
          }
        )
        .sort(
          (a, b) =>
            b.score - a.score
        );

    /*
 * BRAND COLORS
 */

    const brandColors = candidates.filter(
      (c) =>
        c.saturation > 20 &&
        c.lightness > 20 &&
        c.lightness < 85
    )
      .sort(
        (a, b) =>
          b.score - a.score
      );

    const primaryCandidates =
      brandColors
        .filter(
          (c) =>
            c.saturation > 35 &&
            c.lightness > 15 &&
            c.lightness < 75
        )
        .sort((a, b) => {
          const aWeight =
            a.score *
            (1 + a.saturation / 100);

          const bWeight =
            b.score *
            (1 + b.saturation / 100);

          return bWeight - aWeight;
        });

    const primary =
      primaryCandidates[0] ??
      brandColors[0];

    if (!primary) {
      throw new Error(
        "Could not determine primary color"
      );
    }

    /*
     * SECONDARY + ACCENT
     * Use actual image colors.
     */

    const colorCandidates =
      brandColors.filter(
        (c) =>
          c.lightness < 75 &&
          c.saturation > 15
      );

    const secondary =
      firstDistinct(
        colorCandidates,
        [primary.hex],
        80
      )?.hex ??
      Color(primary.hex)
        .rotate(25)
        .hex();

    const accent =
      firstDistinct(
        colorCandidates,
        [primary.hex, secondary],
        80
      )?.hex ??
      Color(primary.hex)
        .rotate(-35)
        .hex();

    /*
     * BACKGROUND COLORS
     */

    const lightColors = candidates
      .filter(
        (c) =>
          c.lightness > 75
      )
      .sort(
        (a, b) =>
          b.count - a.count
      );

    const sortedLightColors =
      lightColors.sort(
        (a, b) =>
          b.lightness - a.lightness
      );

    const background =
      sortedLightColors[0]?.hex ??
      "#FFFFFF";

    const surface =
      firstDistinct(
        sortedLightColors,
        [background],
        15
      )?.hex ??
      Color(background)
        .darken(0.06)
        .hex();

    /*
     * TEXT COLORS
     */

    const darkColors = candidates
      .filter(
        (c) =>
          c.lightness < 35
      )
      .sort(
        (a, b) =>
          b.count - a.count
      );

    const text =
      darkColors
        .filter(
          (c) =>
            c.saturation < 20
        )
        .sort(
          (a, b) =>
            a.lightness - b.lightness
        )[0]?.hex ??
      "#111827";

    /*
     * FINAL DESIGN SYSTEM
     */

    const semantic = {
      primary: primary.hex,
      secondary,
      accent,
      background,
      surface,
      text,
    };

    return NextResponse.json({
      palette: brandColors
        .slice(0, 8)
        .map((c) => c.hex),

      semantic,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to extract palette",
      },
      {
        status: 500,
      }
    );
  }
}