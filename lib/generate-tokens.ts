export function generateTokens(
  palette: string[]
) {
  return {
    primary: palette[0],
    secondary: palette[1],
    accent: palette[2],
  };
}