import Color from "color";

export function getContrast(
  foreground: string,
  background: string
) {
  const ratio = Color(foreground)
    .contrast(Color(background));

  return {
    ratio: ratio.toFixed(2),

    aa: ratio >= 4.5,
    aaa: ratio >= 7,

    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
}