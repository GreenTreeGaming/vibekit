import Color from "color";

export function generateScale(
  base: string
) {
  const c = Color(base);

  return {
    50: c.mix(Color("#ffffff"), 0.92).hex(),
    100: c.mix(Color("#ffffff"), 0.82).hex(),
    200: c.mix(Color("#ffffff"), 0.68).hex(),
    300: c.mix(Color("#ffffff"), 0.52).hex(),
    400: c.mix(Color("#ffffff"), 0.28).hex(),

    500: c.hex(),

    600: c.mix(Color("#000000"), 0.12).hex(),
    700: c.mix(Color("#000000"), 0.28).hex(),
    800: c.mix(Color("#000000"), 0.45).hex(),
    900: c.mix(Color("#000000"), 0.62).hex(),
    950: c.mix(Color("#000000"), 0.78).hex(),
  };
}