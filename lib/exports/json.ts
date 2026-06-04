import { DesignTheme } from "../theme";

export function generateJsonTokens(
  theme: DesignTheme
) {
  return JSON.stringify(theme, null, 2);
}