import Color from "color";

export function generateScale(
  color: string
) {
  const base =
    Color(color).hsl();

  const h = base.hue();
  const s = base.saturationl();

  return {
    50: Color.hsl(h, s, 98).hex(),
    100: Color.hsl(h, s, 95).hex(),
    200: Color.hsl(h, s, 88).hex(),
    300: Color.hsl(h, s, 78).hex(),
    400: Color.hsl(h, s, 65).hex(),
    500: Color(color).hex(),
    600: Color.hsl(h, s, 45).hex(),
    700: Color.hsl(h, s, 35).hex(),
    800: Color.hsl(h, s, 25).hex(),
    900: Color.hsl(h, s, 18).hex(),
    950: Color.hsl(h, s, 10).hex(),
  };
}

export function getColorFormats(
  color: string
) {
  const rgb =
    Color(color).rgb().array();

  const hsl =
    Color(color).hsl();

  const hsv =
    Color(color).hsv();

  return {
    hex: Color(color).hex(),

    rgb: `rgb(${Math.round(
      rgb[0]
    )}, ${Math.round(
      rgb[1]
    )}, ${Math.round(
      rgb[2]
    )})`,

    hsl: `hsl(${Math.round(
      hsl.hue()
    )}, ${Math.round(
      hsl.saturationl()
    )}%, ${Math.round(
      hsl.lightness()
    )}%)`,

    hsv: `hsv(${Math.round(
      hsv.hue()
    )}, ${Math.round(
      hsv.saturationv()
    )}%, ${Math.round(
      hsv.value()
    )}%)`,
  };
}

export function getContrastInfo(
  color: string
) {
  const whiteContrast =
    Color(color).contrast(
      Color("#ffffff")
    );

  const blackContrast =
    Color(color).contrast(
      Color("#000000")
    );

  return {
    whiteContrast:
      whiteContrast.toFixed(2),
    blackContrast:
      blackContrast.toFixed(2),
    whiteGrade:
      whiteContrast >= 7
        ? "AAA"
        : whiteContrast >= 4.5
          ? "AA"
          : "Fail",
    blackGrade:
      blackContrast >= 7
        ? "AAA"
        : blackContrast >= 4.5
          ? "AA"
          : "Fail",
  };
}

export function getHarmonies(
  color: string
) {
  const h =
    Color(color)
      .hsl()
      .hue();

  return {
    complementary: [
      color,
      Color.hsl(
        (h + 180) % 360,
        70,
        60
      ).hex(),
    ],

    analogous: [
      Color.hsl(
        (h - 30 + 360) % 360,
        70,
        60
      ).hex(),

      color,

      Color.hsl(
        (h + 30) % 360,
        70,
        60
      ).hex(),
    ],

    triadic: [
      color,

      Color.hsl(
        (h + 120) % 360,
        70,
        60
      ).hex(),

      Color.hsl(
        (h + 240) % 360,
        70,
        60
      ).hex(),
    ],

    splitComplementary: [
      color,

      Color.hsl(
        (h + 150) % 360,
        70,
        60
      ).hex(),

      Color.hsl(
        (h + 210) % 360,
        70,
        60
      ).hex(),
    ],
  };
}

export function getReadableTextColor(
  color: string
) {
  return Color(color).isLight()
    ? "#000000"
    : "#ffffff";
}

export function exportCssVariables(
  scale: Record<
    string,
    string
  >
) {
  return `
:root {
${Object.entries(scale)
  .map(
    ([step, value]) =>
      `  --primary-${step}: ${value};`
  )
  .join("\n")}
}
`.trim();
}

export function exportTailwind(
  scale: Record<
    string,
    string
  >
) {
  return `
colors: {
  primary: {
${Object.entries(scale)
  .map(
    ([step, value]) =>
      `    ${step}: "${value}",`
  )
  .join("\n")}
  }
}
`.trim();
}