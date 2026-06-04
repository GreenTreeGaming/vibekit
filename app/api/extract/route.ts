import { NextResponse } from "next/server";
import sharp from "sharp";
import Color from "color";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get(
      "file"
    ) as File | null;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const {
      data,
      info,
    } = await sharp(buffer)
      .resize({
        width: 400,
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

      /*
       * Quantize colors
       * Reduces noise massively
       */

      const qr =
        Math.round(r / 16) * 16;

      const qg =
        Math.round(g / 16) * 16;

      const qb =
        Math.round(b / 16) * 16;

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

    const colors = [...colorMap.entries()]
      .sort(
        (a, b) => b[1] - a[1]
      )
      .map(([hex]) => hex)
      .filter((hex) => {
        const color =
          Color(hex);

        const saturation =
          color.saturationl();

        const luminosity =
          color.luminosity();

        /*
         * Remove near whites
         */

        if (luminosity > 0.96)
          return false;

        /*
         * Remove near blacks
         */

        if (luminosity < 0.04)
          return false;

        /*
         * Remove boring grays
         */

        if (saturation < 8)
          return false;

        return true;
      })
      .slice(0, 6);

    return NextResponse.json({
      colors,
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